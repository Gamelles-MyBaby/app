//backend/routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Seules les images (jpeg, jpg, png) sont autorisées."));
    }
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

