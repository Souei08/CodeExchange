import Posts from "../models/posts.model.js";

export const getPosts = async (req, res) => {
  try {
    const getPosts = await Posts.find();

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
    const posts = await Posts.findById(postId);

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOwnerPost = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    const getPosts = await Posts.find({ owner: ownerId });

    res.status(200).json(getPosts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
