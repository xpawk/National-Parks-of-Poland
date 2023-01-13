const cheerio = require('cheerio');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const cors = require("cors");
require('./fetchingData');



app = express();
app.use(cors());
app.use("/static", express.static(path.resolve(__dirname, "front_end", "static")))
app.get("/*" , (req, res) => {
res.sendFile(path.resolve(__dirname ,"front_end", "index.html"));
});
app.listen(process.env.PORT || 3000, () => console.log("Server running..."))