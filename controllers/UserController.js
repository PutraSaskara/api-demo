const fs = require("fs");
const User = require("../models/UserModel.js");

exports.getBlogs = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting blogs:", error.message);
    res.status(500).json({ error: "Could not retrieve blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    // Extract user id from request parameters
    const { id } = req.params;

    // Find the user by id
    const blog = await User.findByPk(id);

    // If user does not exist, return 404 Not Found
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Return the user details
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error getting blog by ID:", error.message);
    res.status(500).json({ error: "Could not retrieve blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    // Extract user id from request parameters
    const { id } = req.params;

    // Find the user by id
    let blog = await User.findByPk(id);

    // If user does not exist, return 404 Not Found
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Access form-data fields
    const { source, author, title, description, content, keywords } = req.body;

    // Check if a file is uploaded
    let imageUrl = blog.imageUrl; // Preserve existing image URL by default
    let imageName = blog.image; // Preserve existing image name by default

    if (req.file) {
      // If a new file is uploaded, delete the old image file if it exists
      if (blog.image) {
        const oldImagePath = `public/${blog.image}`;
        fs.unlink(oldImagePath, (error) => {
          if (error) {
            console.error("Error deleting old image:", error);
          } else {
            console.log("Old image deleted successfully");
          }
        });
      }

      // Update image URL and image name with new file data
      imageUrl = "https://sas-api.vercel.app/" + req.file.filename;
      imageName = req.file.filename;
    }

    // Update user record with new details
    await blog.update({
      source,
      author,
      title,
      description,
      content,
      keywords,
      image: imageName,
      imageUrl: imageUrl,
    });

    // Return updated user details
    blog = await User.findByPk(id); // Fetch updated user details
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(400).json({ error: "Could not update user" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    // Extract user id from request parameters
    const { id } = req.params;

    // Find the user by id
    const blog = await User.findByPk(id);

    // If user does not exist, return 404 Not Found
    if (!blog) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user's image file if it exists
    if (blog.image) {
      const imagePath = `public/${blog.image}`;
      fs.unlink(imagePath, (error) => {
        if (error) {
          console.error("Error deleting image:", error);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }

    // Delete the user from the database
    await blog.destroy();

    // Return success message
    res
      .status(200)
      .json({ message: "User and associated image deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Could not delete user and image" });
  }
};

exports.createBlogWithImage = async (req, res) => {
  try {
    // Access form-data fields
    const { source, author, title, description, content, keywords } = req.body;

    // Check if a file is uploaded
    if (!req.file) {
      throw new Error("No image uploaded");
    }

    // Generate the image URL
    const imageUrl = "https://sas-api.vercel.app/" + req.file.filename;

    // Create user record with image name and URL
    const newUser = await User.create({
      source,
      author,
      title,
      description,
      content,
      keywords,
      image: req.file.filename, // Save the image name to your user model
      imageUrl: imageUrl, // Save the image URL to your user model
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user with image:", error.message);
    res.status(400).json({ error: error.message });
  }
};
