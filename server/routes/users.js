import express from "express";
import multer from "multer";
import path from "path";
import {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  getOneUser,
  updateUserProfile,
} from "../controller/users.controller.js";

import authenticatedMiddleware from "../middleware/authenticated.middleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/profiles");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);

    cb(null, filename + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/create", registerUser);

router.get("/:userId", authenticatedMiddleware.verifyToken, getOneUser);
router.put("/update/:userId", authenticatedMiddleware.verifyToken, updateUser);
router.post(
  "/updateProfilePicture/:userId",
  upload.single("profilePicture"),
  authenticatedMiddleware.verifyToken,
  updateUserProfile
);

export default router;
