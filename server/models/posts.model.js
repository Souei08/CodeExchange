import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new Schema(
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
    comments: [commentSchema],
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
