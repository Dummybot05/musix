import path from 'path'
import express from 'express'
import { meta } from './metadata.js';
import fs from 'fs/promises';

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.set('view engine', 'ejs')

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get('/', async(req, res) => {
  fs.readdir("./public/music").then(aud => {
    shuffleArray(aud);
    const promises = aud.map(data => meta(data));
    return Promise.all(promises);
  }).then(allData => {
      let currM = req.query.song
      res.render('index', {
         lister : allData
      });
  });
});

app.listen(PORT, () => { console.log("Started...") })
