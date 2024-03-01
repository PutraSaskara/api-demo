const fs = require("fs");
const Portfolio = require("../models/PortfolioModel.js");

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findAll();
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error getting portfolios:", error.message);
    res.status(500).json({ error: "Could not retrieve portfolios" });
  }
};

exports.createPortoWithImage = async (req, res) => {
  try {
    // Access form-data fields
    const { title, description, keywords, github, domain } = req.body;

    // Check if a file is uploaded
    if (!req.file) {
      throw new Error("No image uploaded");
    }

    // Generate the image URL
    const imageUrl = "http://localhost:5000/uploads/" + req.file.filename;

    // Create user record with image name and URL
    const newPorto = await Portfolio.create({
      title,
      description,
      domain,
      github,
      keywords,
      image: req.file.filename, // Save the image name to your user model
      imageUrl: imageUrl, // Save the image URL to your user model
    });

    res.status(201).json(newPorto);
  } catch (error) {
    console.error("Error creating porto with image:", error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.getPortoById = async (req, res) => {
    try {
      // Extract user id from request parameters
      const { id } = req.params;
  
      // Find the user by id
      const porto = await Portfolio.findByPk(id);
  
      // If user does not exist, return 404 Not Found
      if (!porto) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
  
      // Return the user details
      res.status(200).json(porto);
    } catch (error) {
      console.error("Error getting portfolio by ID:", error.message);
      res.status(500).json({ error: "Could not retrieve portfolio" });
    }
  };

exports.updatePorto = async (req, res) => {
  try {
    // Extract user id from request parameters
    const { id } = req.params;

    // Find the user by id
    let portfolio = await Portfolio.findByPk(id);

    // If user does not exist, return 404 Not Found
    if (!portfolio) {
      return res.status(404).json({ error: "portfolio not found" });
    }

    // Access form-data fields
    const { title, description, keywords, github, domain } = req.body;

    // Check if a file is uploaded
    let imageUrl = portfolio.imageUrl; // Preserve existing image URL by default
    let imageName = portfolio.image; // Preserve existing image name by default

    if (req.file) {
      // If a new file is uploaded, delete the old image file if it exists
      if (portfolio.image) {
        const oldImagePath = `public/uploads/${portfolio.image}`;
        fs.unlink(oldImagePath, (error) => {
          if (error) {
            console.error("Error deleting old image:", error);
          } else {
            console.log("Old image deleted successfully");
          }
        });
      }

      // Update image URL and image name with new file data
      imageUrl = "http://localhost:5000/uploads/" + req.file.filename;
      imageName = req.file.filename;
    }

    // Update user record with new details
    await portfolio.update({
      title,
      description,
      keywords,
      github,
      domain,
      image: imageName,
      imageUrl: imageUrl,
    });

    // Return updated user details
    portfolio = await Portfolio.findByPk(id); // Fetch updated user details
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error updating portfolio:", error.message);
    res.status(400).json({ error: "Could not update portfolio" });
  }
};

exports.deletePorto = async (req, res) => {
    try {
      // Extract user id from request parameters
      const { id } = req.params;
  
      // Find the user by id
      const porto = await Portfolio.findByPk(id);
  
      // If Portfolio does not exist, return 404 Not Found
      if (!porto) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
  
      // Delete the Portfolio's image file if it exists
      if (porto.image) {
        const imagePath = `public/uploads/${porto.image}`;
        fs.unlink(imagePath, (error) => {
          if (error) {
            console.error("Error deleting image:", error);
          } else {
            console.log("Image deleted successfully");
          }
        });
      }
  
      // Delete the Portfolio from the database
      await porto.destroy();
  
      // Return success message
      res
        .status(200)
        .json({ message: "Portfolio and associated image deleted successfully" });
    } catch (error) {
      console.error("Error deleting Portfolio:", error.message);
      res.status(500).json({ error: "Could not delete Portfolio and image" });
    }
  };
