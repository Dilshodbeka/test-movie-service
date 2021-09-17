const express = require("express");
const jwt_decode = require("jwt-decode");
const axios = require("axios");
const Datastore = require("nedb"),
  db = new Datastore({ filename: "./database", autoload: true });
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

db.loadDatabase();
const api_key = process.env.API_KEY;

const createDate = new Date();
const createMonth = createDate.getMonth();
let numberMonth = [].map((month) => month == createMonth);

app.post("/movies", async (req, res) => {
  const { title } = req.body;
  let movieWebPage = `http://www.omdbapi.com/?t=${title}&apikey=${api_key}`;
  const token = req.headers.authorization;
  const decoded = jwt_decode(token);
  if (!title) {
    return res.status(400).json({ error: "invalid movie body" });
  }

  const movieTitlesHEre = await axios
    .get(movieWebPage)
    .then((response) => {
      const data = response.data;
      const movieData = {
        Title: data.Title,
        Released: data.Released,
        Genre: data.Genre,
        Director: data.Director,
      };
      if (decoded.role === "basic" && numberMonth.length < 5) {
        numberMonth.push(createMonth);
        return movieData;
      } else if (decoded.role == "premium") {
        return movieData;
      }
      return "Your role is basic. Please, change Premium";
    })
    .catch((err) => {
      return res.status(400).json({ err, message: err.message });
    });

  db.insert(movieTitlesHEre, (err, yourRole) => {
    if (err) {
      response.end();
      return;
    }
    return res.status(200).json({ yourRole });
  });
});

app.get("/movies", (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    db.find({}, (err, response) => {
      if (err) {
        response.end();
        return;
      }
      res.json(response);
    });
  }
  return "You are not authorized. PLease Login";
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
