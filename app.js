require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors")

const routes = require("./src/routes");

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));





const api = process.env.API_URL;

// app.get(`${api}/products`, (req, res) => {
//   res.send("helloAPI !");
// });
app.get(`/`, (req, res) => {
  res.send("helloAPI !");
});

// Use the router for your API routes
app.use(process.env.API_URL, routes);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop'
})
.then(() => {
    console.log('Database connections is ready')
})
.catch((err) => {
    console.log(err)
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
