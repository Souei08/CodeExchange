import Posts from "../models/posts.model.js";

export const getPosts = async (req, res) => {
  try {
    const getPosts = await Posts.find()
      .populate("owner")
      .populate("comments.user");

    res.status(200).json(getPosts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  const { description, hashtags, owner } = req.body;

  const newProduct = new Posts({
    description,
    hashtags,
    owner,
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await Posts.findOne({ _id: id });

    if (foundUser || foundUser.length == 0) {
      const response = await foundUser.deleteOne({ _id: id });
      res.status(202).json(response);
    } else {
      res.status(404).json({ message: `User not found.` });
    }
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedItem = await Posts.findByIdAndUpdate(itemId, updatedData, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOnePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const posts = await Posts.findById(postId)
      .populate("owner")
      .populate("comments.user");

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOwnerPost = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    const getPosts = await Posts.find({ owner: ownerId }).populate("owner");

    res.status(200).json(getPosts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Posts.findById(postId);

    const alreadyLikedIndex = post.likes.findIndex(
      (like) => like.user.toString() === userId
    );

    if (alreadyLikedIndex !== -1) {
      post.likes.splice(alreadyLikedIndex, 1);
      await post.save();
      return res.json({ message: "Post unliked successfully" });
    } else {
      post.likes.push({ user: userId });
      await post.save();
      return res.json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const commentPost = async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;

  try {
    const post = await Posts.findById(postId);

    const newComment = {
      user: userId,
      comment,
    };

    post.comments.push(newComment);

    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Posts.findById(postId);

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id == commentId
    );

    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);

      await post.save();

      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchPost = async (req, res) => {
  const { value } = req.params;

  try {
    if (value === null || value.length !== 0) {
      const postsQuery = {
        $or: [
          { description: { $regex: value, $options: "i" } },
          { hashtags: { $regex: value, $options: "i" } },
          { "comments.comment": { $regex: value, $options: "i" } },
          { "owner.firstName": { $regex: value, $options: "i" } },
          { "owner.lastName": { $regex: value, $options: "i" } },
          { "owner.username": { $regex: value, $options: "i" } },
          { "owner.email": { $regex: value, $options: "i" } },
        ],
      };

      const postsResult = await Posts.find(postsQuery);

      const populatedResult = await Posts.populate(postsResult, [
        { path: "owner" },
        { path: "comments.user" },
      ]);

      res.status(200).json(populatedResult);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
