import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createRoutes } from './routes';

// Basic Configuration
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded());

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, 'public');

app.use(express.static(viewsPath));
app.use(express.static(publicPath));

createRoutes(app);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
