import express from 'express'
import { meta } from './metadata.js';
import fs from 'fs/promises';

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
  fs.readdir("./public/music").then(aud => {
    const promises = aud.map(data => meta(data));
    return Promise.all(promises);
  }).then(allData => {
      res.render('index', {
         lister : allData
      });
  });
});

app.listen(PORT, () => { console.log("Started...") })
