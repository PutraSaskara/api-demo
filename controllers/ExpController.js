const Exp = require("../models/ExpModel.js");

// Get all experiences
exports.getExps = async (req, res) => {
    try {
        const experiences = await Exp.findAll();
        res.status(200).json(experiences);
    } catch (error) {
        console.error("Error getting experiences:", error.message);
        res.status(500).json({ error: "Could not retrieve experiences" });
    }
};

// Get experience by ID
exports.getExpById = async (req, res) => {
    try {
        const experience = await Exp.findByPk(req.params.id);
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" });
        }
        res.status(200).json(experience);
    } catch (error) {
        console.error("Error getting experience by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve experience" });
    }
};

// Create a new experience
exports.createExp = async (req, res) => {
    try {
        await Exp.create(req.body);
        res.status(201).json({ message: "Experience created successfully" });
    } catch (error) {
        console.error("Error creating experience:", error.message);
        res.status(400).json({ error: "Could not create experience" });
    }
};

// Update an existing experience
exports.updateExp = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Exp.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "Experience not found" });
        }
        res.status(200).json({ message: "Experience updated successfully" });
    } catch (error) {
        console.error("Error updating experience:", error.message);
        res.status(400).json({ error: "Could not update experience" });
    }
};

// Delete an experience
exports.deleteExp = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Exp.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "Experience not found" });
        }
        res.status(200).json({ message: "Experience deleted successfully" });
    } catch (error) {
        console.error("Error deleting experience:", error.message);
        res.status(500).json({ error: "Could not delete experience" });
    }
};
