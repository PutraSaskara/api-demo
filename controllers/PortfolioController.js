const cloudinary = require('cloudinary').v2;
const Portfolio = require("../models/PortfolioModel.js");

// Configure Cloudinary with your credentials
cloudinary.config({ 
  cloud_name: 'dalvkfb1d', 
  api_key: '158613853343135', 
  api_secret: 'jQhlPWXjoZEy0NfJa5Z87p4-DnM' 
});

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

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findAll();
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error getting portfolios:", error.message);
    res.status(500).json({ error: "Could not retrieve portfolios" });
  }
};

exports.getPortoById = async (req, res) => {
  try {
    const { id } = req.params;
    const porto = await Portfolio.findByPk(id);
    if (!porto) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    res.status(200).json(porto);
  } catch (error) {
    console.error("Error getting portfolio by ID:", error.message);
    res.status(500).json({ error: "Could not retrieve portfolio" });
  }
};

exports.updatePorto = async (req, res) => {
  try {
    const { id } = req.params;
    let portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    const { title, description, keywords, github, domain } = req.body;
    let imageUrl = portfolio.imageUrl;
    let imageName = portfolio.image;

    if (req.file) {
      // Delete old image from Cloudinary
      if (imageName) {
        try {
          await cloudinary.uploader.destroy(portfolio.image);
          console.log('Old image deleted from Cloudinary');
        } catch (error) {
          console.error('Error deleting old image from Cloudinary:', error.message);
        }
      }

      // Upload new image to Cloudinary
      const result = await uploadImageToCloudinary(req.file.path);
      imageUrl = result.secure_url;
      imageName = result.public_id;
    }

    await portfolio.update({
      title,
      description,
      keywords,
      github,
      domain,
      image: imageName,
      imageUrl: imageUrl,
    });

    portfolio = await Portfolio.findByPk(id);
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error updating portfolio:", error.message);
    res.status(400).json({ error: "Could not update portfolio" });
  }
};

exports.deletePorto = async (req, res) => {
  try {
    const { id } = req.params;
    const porto = await Portfolio.findByPk(id);
    if (!porto) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    if (porto.image) {
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(porto.image);
    }
    await porto.destroy();
    res.status(200).json({ message: "Portfolio and associated image deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio:", error.message);
    res.status(500).json({ error: "Could not delete portfolio and image" });
  }
};

exports.createPortoWithImage = async (req, res) => {
  try {
    const { title, description, keywords, github, domain } = req.body;
    if (!req.file) {
      throw new Error("No image uploaded");
    }
    const result = await uploadImageToCloudinary(req.file.path);

    // Log Cloudinary public ID and secure URL
    console.log('Image uploaded to Cloudinary from uploadimage:', result.public_id);
    console.log('Secure URL upload image:', result.secure_url);

    const imageUrl = result.secure_url;
    const imageName = result.public_id;
    const newPorto = await Portfolio.create({
      title,
      description,
      domain,
      github,
      keywords,
      image: imageName,
      imageUrl: imageUrl,
    });
    res.status(201).json(newPorto);
  } catch (error) {
    console.error("Error creating portfolio with image:", error.message);
    res.status(400).json({ error: error.message });
  }
};
