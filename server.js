const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
// On some panels, process.env.PORT is a named pipe or a specific port
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(`> Starting SYLARA app in ${process.env.NODE_ENV || 'development'} mode...`);

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    })
    .once('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Application failed to prepare:', err);
    process.exit(1);
  });
