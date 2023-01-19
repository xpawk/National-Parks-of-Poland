const express = require("express");
const path = require("path");
const cors = require("cors");

const getParkData = require("./fetchingData");

app = express();
app.use(cors());
app.use(
  "/static",
  express.static(path.resolve(__dirname, "front_end", "static"))
);
app.get("/parks.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "parks.json"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front_end", "index.html"));
});

getParkData().then(() => {
  app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
});
