const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/profileController");

// ── Multer setup ──────────────────────────────────────────
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isPDF = file.mimetype === "application/pdf";
    return {
      folder: "gidy-profile",
      allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
      resource_type: isPDF ? "raw" : "image",
      type: "upload", 
      public_id: Date.now() + "-" + file.originalname.replace(/\s+/g, "_"),
    };
  },
});

const upload = multer({ storage });

// ── Profile ───────────────────────────────────────────────
router.get("/", controller.getProfile);
router.put("/", controller.updateProfile);

// ── Uploads ───────────────────────────────────────────────
router.post("/upload-resume", upload.single("resume"), controller.uploadResume);
router.post("/upload-avatar", upload.single("avatar"), controller.uploadAvatar);

// ── Socials ───────────────────────────────────────────────
router.put("/socials", controller.addOrReplaceSocial);
router.put("/socials/:platform", controller.updateSocial);
router.delete("/socials/:platform", controller.deleteSocial);

// ── Skills ────────────────────────────────────────────────
router.put("/skills", controller.updateSkills);

// ── Experience ────────────────────────────────────────────
router.post("/experience", controller.addExperience);
router.put("/experience/:id", controller.updateExperience);
router.delete("/experience/:id", controller.deleteExperience);

// ── Education ─────────────────────────────────────────────
router.post("/education", controller.addEducation);
router.put("/education/:id", controller.updateEducation);
router.delete("/education/:id", controller.deleteEducation);

// ── Certifications ────────────────────────────────────────
router.post("/certification", controller.addCertification);
router.put("/certification/:id", controller.updateCertification);
router.delete("/certification/:id", controller.deleteCertification);

// ── AI Analyze ────────────────────────────────────────────
router.post("/ai-analyze", controller.aiAnalyze);

module.exports = router;