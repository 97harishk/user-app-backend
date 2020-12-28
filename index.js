const express = require('express');

const app = express();
const PORT = 8888;

const bodyParser = require('body-parser');
const cors  = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = require('./config/mongoose')
app.use(express.urlencoded());

app.use('/', require('./routes'))
app.listen(PORT, (err) =>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`Yup, express server is running on port: ${PORT}`)
})