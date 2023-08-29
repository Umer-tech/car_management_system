const db = require("./models/index");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");
const car = require("./routes/car");
const rental = require("./routes/rental");
const express = require("express");
const app = express();

//Syncing Database
(async () => {
  await db.sequelize.sync();
})();

app.use(express.json());
app.use("/api/signUp", signUp);
app.use("/api/signIn", signIn);
app.use("/api/car", car);
app.use("/api/rental", rental);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
