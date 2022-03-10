const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/api").post(function (req, res) {
  console.log("request body", JSON.stringify(req.body, null, 2));
  res.status(200).send(req.body || {});
});

const PORT = 3006;

app.use(express.static("public"));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
