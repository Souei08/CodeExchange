import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    hashtags: {
      type: [String],
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
      },
    ],
    images: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
