import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
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

const Posts = mongoose.model("Posts", commentSchema);

export default Posts;
