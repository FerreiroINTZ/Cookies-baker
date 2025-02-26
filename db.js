const db = require("mongoose");

db.connect("mongodb://localhost:27017/cookies")
  .then((x) => console.log("Conexao feita!"))
  .catch((err) => console.log("Erro ao cenectar!"));

const cookiesSchema = new db.Schema({
  cookie: String,
  name: {type: "String", default: ''},
  date: { type: Date, default: Date.now },
});

const cookiesModel = db.model("Cookies", cookiesSchema)

module.exports = cookiesModel;