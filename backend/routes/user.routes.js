//backend/routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const multer = require('multer');
const path = require('path');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// router.post("/register", userController.register); // Moved to auth
// router.post("/login", userController.login); // Moved to auth
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/:id/profile", userController.getProfile);
// router.put("/:id/profile", userController.updateProfile); // Not implemented yet
router.put("/:id/elo", userController.updateElo);
router.post("/:id/avatar", upload.single('avatar'), userController.uploadAvatar);

module.exports = router;

