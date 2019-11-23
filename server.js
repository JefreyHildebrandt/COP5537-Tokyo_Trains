const express = require("express")
const path = require("path");

let  app = express()

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => res.sendFile('index.html'));
app.listen(process.env.PORT || 5000,  () => console.log("Started on port " + (process.env.PORT || 5000)));