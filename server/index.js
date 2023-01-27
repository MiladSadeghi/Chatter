import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";
import { logger } from "./middleware/logEvents.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";


dotenv.config();
const app = express();

app.use(logger)
app.use(credentials);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
app.use("/api", userRoutes)

// routes need to jwt verify

app.use("/api", roomRoutes);
app.use("/api", messageRoutes)

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
