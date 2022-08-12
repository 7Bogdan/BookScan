import { regExp } from "./config/filter";
import { storageConfig, fileFilter,sumQuantity } from "./config/config";

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbClient;

app.use(express.static(__dirname + "/public"));
app.use(
  multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata")
);

mongoClient.connect(function (err, client) {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db("texts").collection("text");
  app.listen(3030, function () {
    console.log("Сервер ожидает подключения...");
  });
});

app.post("/upload", function (req, res, next) {
  let filedata = req.file;
  let collection = req.app.locals.collection;
  fs.readFile(__dirname + "/uploads/text.txt", "utf8", (e, data) => {
    if (e) throw e;
    let text = regExp(data);
    collection.drop();
    collection.insertMany(text);
  });

  if (!filedata) res.send("Ошибка при загрузке файла");
  else res.redirect("http://localhost:3000");
});



app.get("/results", async function (req, res) {
  let collection = req.app.locals.collection;
  let data = {};

  let words = await collection
    .aggregate(sumQuantity)
    .toArray()
    .then((word) => (data.words = word))
    .catch((err) => console.log(err));

  let topTen = await collection
    .find({})
    .sort({ quantity: -1 })
    .limit(10)
    .toArray()
    .then((top) => (data.topTen = top))
    .catch((err) => console.log(err));

  res.send(data);
  collection.drop();
});

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
