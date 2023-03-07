import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import connectMetamaskRoutes from "./routes/connectMetamaskRoutes.js";
import userRoutes from "./routes/userPairRoutes.js";
import unPairUserRouter from "./routes/unPairUserRouter.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api/connect", connectMetamaskRoutes);
app.use("/api/pair", userRoutes);
app.use("/api/unpair", unPairUserRouter);

 
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
