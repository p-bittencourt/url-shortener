import { Application } from 'express';

export const createRoutes = (app: Application) => {
  app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

  // Your first API endpoint
  app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
  });
};
