import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";
import { connection } from "mongoose";
import connectDB from "./config/DBConn";
import { logger } from "./middleware/logEvents";

dotenv.config();
const PORT = process.env.PORT || 9000;
const app = express();

connectDB();

app.use(logger)
app.use(credentials);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

//routes


// routes need to jwt verify

connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

