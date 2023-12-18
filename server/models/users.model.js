import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    profileImage: String,
    bio: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

const Users = mongoose.model("Users", userSchema);

export default Users;
