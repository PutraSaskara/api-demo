const cloudinary = require('cloudinary').v2;
const User = require('../models/UserModel.js');

// Configure Cloudinary with your credentials
cloudinary.config({ 
  cloud_name: 'dalvkfb1d', 
  api_key: '158613853343135', 
  api_secret: 'jQhlPWXjoZEy0NfJa5Z87p4-DnM' 
});

// Function to upload an image to Cloudinary
// async function uploadImageToCloudinary(imageData) {
//   try {
//     const result = await cloudinary.uploader.upload(imageData, {
//       upload_preset: 'sas', // Specify your Cloudinary upload preset   name here
//     });
//     console.log('Image uploaded to Cloudinary:', result);
//     return result;
//   } catch (error) {
//     console.error('Error uploading image to Cloudinary:', error); 
//     throw error;
//   }
// }

async function uploadImageToCloudinary(imageData) {
  try {
    const result = await cloudinary.uploader.upload(imageData, {
      upload_preset: 'sas', // Specify your Cloudinary upload preset name here
    });

    // Log Cloudinary public ID and secure URL
    console.log('Image uploaded to Cloudinary:', result.public_id);
    console.log('Secure URL:', result.secure_url);

    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
}


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
    const { id } = req.params;
    const blog = await User.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error getting blog by ID:", error.message);
    res.status(500).json({ error: "Could not retrieve blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = await User.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    const { source, author, title, description, content, keywords } = req.body;
    let imageUrl = blog.imageUrl;
    let imageName = blog.image;

    if (req.file) {
      // Delete old image from Cloudinary
      if (imageName) {
        try {
          await cloudinary.uploader.destroy(blog.image);
          console.log('Old image deleted from Cloudinary');
        } catch (error) {
          console.error('Error deleting old image from Cloudinary:', error.message);
          // Handle error (e.g., log it, return error response)
        }
      }

      // Upload new image to Cloudinary
      const result = await uploadImageToCloudinary(req.file.path);
      imageUrl = result.secure_url;
      imageName = result.public_id;
    }

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

    blog = await User.findByPk(id);
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(400).json({ error: "Could not update blog" });
  }
};



exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await User.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "User not found" });
    }
    if (blog.image) {
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(blog.image);
    }
    await blog.destroy();
    res.status(200).json({ message: "User and associated image deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Could not delete user and image" });
  }
};

exports.createBlogWithImage = async (req, res) => {
  try {
    const { source, author, title, description, content, keywords } = req.body;
    if (!req.file) {
      throw new Error("No image uploaded");
    }
    const result = await uploadImageToCloudinary(req.file.path);

    // Log Cloudinary public ID and secure URL
    console.log('Image uploaded to Cloudinary from uploadimage:', result.public_id);
    console.log('Secure URL upload image:', result.secure_url);

    const imageUrl = result.secure_url;
    const imageName = result.public_id;
    const newUser = await User.create({
      source,
      author,
      title,
      description,
      content,
      keywords,
      image: imageName,
      imageUrl: imageUrl,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user with image:", error.message);
    res.status(400).json({ error: error.message });
  }
};

