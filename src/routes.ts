import { Application, Request, Response } from 'express';

interface shortUrlInterface {
  original_url: string;
  short_url: number;
}

const urls: shortUrlInterface[] = [];

export const createRoutes = (app: Application) => {
  app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

  app.get('/api/shorturl/:shorturl', function (req: Request, res: Response) {});

  app.post('/api/shorturl', function (req: Request, res: Response) {
    const url = req.body.url;
    const content: shortUrlInterface = {
      original_url: url,
      short_url: urls.length + 1,
    };
    urls.push(content);
    res.json(content);
  });
};
