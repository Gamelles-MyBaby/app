const userService = require("../services/user.service");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getProfile(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Register and Login moved to auth.controller.js

exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateElo = async (req, res) => {
    try {
        const { newElo, isWin } = req.body;
        const updatedUser = await userService.updateElo(req.params.id, newElo, isWin);
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Aucun fichier n'a été uploadé." });
        }

        const userId = req.params.id;
        const photoPath = `/uploads/avatars/${req.file.filename}`;

        const updatedUser = await userService.updateProfilePicture(userId, photoPath);
        res.json({
            message: "Photo de profil mise à jour avec succès",
            photo_profil: photoPath,
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
