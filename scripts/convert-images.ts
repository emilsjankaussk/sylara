import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcDir = "/Users/emils/sylara_migration/sylara.eu/cdn/shop/files";
const destDir = "/Users/emils/sylara_migration/sylara-app/public/assets/images";

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const imageMap = new Map<string, { name: string, width: number }>();

for (const file of files) {
  const baseName = file.split("?")[0];
  const widthMatch = file.match(/width=(\d+)/);
  const width = widthMatch ? parseInt(widthMatch[1]) : 0;
  
  if (!imageMap.has(baseName) || (imageMap.get(baseName)?.width || 0) < width) {
    imageMap.set(baseName, { name: file, width });
  }
}

async function convert() {
  console.log(`Found ${imageMap.size} unique images to convert.`);
  for (const [baseName, info] of Array.from(imageMap.entries())) {
    const srcPath = path.join(srcDir, info.name);
    // Remove query params and other stuff from baseName for safe filename
    const cleanBaseName = baseName.split("/").pop() || baseName;
    const destName = cleanBaseName.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const destPath = path.join(destDir, destName);
    
    if (fs.existsSync(destPath)) continue;

    console.log(`Converting ${info.name} (${info.width}px) to ${destName}`);
    try {
      await sharp(srcPath).toFormat("webp").toFile(destPath);
    } catch (err) {
      console.error(`Failed to convert ${info.name}:`, err);
    }
  }
}

convert();
