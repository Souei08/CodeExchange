import express from "express";
import multer from "multer";
import {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
} from "../controller/users.controller.js";

import authenticatedMiddleware from "../middleware/authenticated.middleware.js";

const storage = multer.diskStorage({
  destination: "../assets/images/profile",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/create", registerUser);
router.put(
  "/update/:userId",
  upload.single("profileImage"),
  authenticatedMiddleware.verifyToken,
  updateUser
);

export default router;
