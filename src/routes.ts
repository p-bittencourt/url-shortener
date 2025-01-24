import { Application, Request, Response } from 'express';
import dns from 'node:dns';

interface shortUrlInterface {
  original_url: string;
  short_url: number;
}

interface errorOutput {
  error: string;
}

const urls: shortUrlInterface[] = [];

export const createRoutes = (app: Application) => {
  app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

  app.get('/api/shorturl/:shorturl', function (req: Request, res: Response) {
    const short_url = parseInt(req.params.shorturl);
    const url = urls.filter((url) => url.short_url === short_url);
    if (url.length > 0) {
      res.redirect(url[0].original_url);
    } else {
      res.json({ error: 'short url not found' });
    }
  });

  app.post('/api/shorturl', function (req: Request, res: Response) {
    const url = req.body.url;
    const domain = getDomain(url);

    if (!domain) {
      res.json({ error: 'invalid url' });
      return;
    }

    let content: shortUrlInterface | errorOutput;
    dns.lookup(domain, (err) => {
      if (err) {
        content = { error: 'invalid url' };
        res.json(content);
      } else {
        content = {
          original_url: url,
          short_url: urls.length + 1,
        };
        urls.push(content);
        res.json(content);
      }
    });
  });
};

function getDomain(urlString: string) {
  try {
    const url = new URL(urlString);
    let hostname = url.hostname;

    if (hostname.startsWith('www.')) {
      hostname = hostname.slice(4);
    }

    return hostname;
  } catch {
    return null;
  }
}
