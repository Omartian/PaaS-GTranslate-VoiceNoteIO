const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 8080

app.use(bodyParser.json());
var cors = require('cors')

app.use(cors())

const {Translate} = require('@google-cloud/translate').v2;

const TOKEN_ARG = 2;
const tokenPath = process.argv[TOKEN_ARG];
process.env.GOOGLE_APPLICATION_CREDENTIALS = tokenPath;

const translate = new Translate();

app.post('/translate', async (req, res) => {
    let [translations] = await translate.translate(req.body.text, req.body.target);
    res.send(translations);
})

app.get('/', (req, res) => {
  res.send('PaaS para el servicio de traducción de la aplicación VoiceNoteIO')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
