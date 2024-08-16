import express from 'express'
import { meta } from './metadata.js';
import fs from 'fs/promises';

const PORT = process.env.PORT || 3000
const app = express()
var counter = 0;
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
console.log(counter);
counter += 1;
app.listen(PORT, () => { console.log("Started...") })
