import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authMiddleware from "./middleware/authenticated.middleware.js";

dotenv.config();

const mongoAtlasURI = process.env.MONGODB_ATLAS;

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use(express.static("assets/profiles"));
app.use("/posts", authMiddleware.verifyToken, postRoutes);
app.use("/users", userRoutes);
app.get("/checkToken", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized: Token expired" });
      } else {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }
    }

    // Token is valid
    res.json({ message: "Token is valid", decoded });
  });
});

const CONNECTION_URL = mongoAtlasURI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
