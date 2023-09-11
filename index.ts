import env from 'dotenv';
import { PORT } from './utils/config';
import signUp from "./routes/signUp";
import signIn from "./routes/signIn";
import car from "./routes/car";
import rental from "./routes/rental";
import express from "express";
import sequelize from "./models";


const app = express();
env.config();

//Syncing Database
(async () => {
  await sequelize.sync({alter: true});
})();

app.use (express.json());
app.use("/api/signUp", signUp);
app.use("/api/signIn", signIn);
app.use("/api/car", car);
app.use("/api/rental", rental);
const port = PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
