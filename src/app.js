const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

const publicDir = express.static(path.join(__dirname, "../public"));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(publicDir);

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "You must provide a search term!",
    });
  }

  geocode(req.query.adress, (error, { lat, long } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    } else {
      forecast(
        lat,
        long,
        (error, { current_temp, feelslike_temp, description, location }) => {
          if (error) {
            return console.log(error);
          } else {
            res.send({
              forecast:
                "It is " +
                description +
                " in " +
                location +
                " with a temprature of " +
                current_temp +
                " and it feels like " +
                feelslike_temp,
              location: location,
              adress: req.query.adress,
            });
          }
        }
      );
    }
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("server is up and running on localhost:" + port);
});
