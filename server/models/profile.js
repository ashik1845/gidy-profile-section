const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  current: Boolean
});

const educationSchema = new mongoose.Schema({
  college: String,
  degree: String,
  field: String,
  location: String,
  startDate: String,
  endDate: String,
  current: Boolean
});

const certificationSchema = new mongoose.Schema({
  name: String,
  provider: String,
  certId: String,     
  certUrl: String,    
  issuedDate: String,
  expiryDate: String,
  description: String
});

const socialSchema = new mongoose.Schema({
  platform: { type: String, enum: ["instagram", "github", "linkedin"] },
  url: String,
});

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  location: String,
  bio: String,
  avatar: String,
  resume: String,

  skills: [String],
  experience: [experienceSchema],
  education: [educationSchema],
  certifications: [certificationSchema],
  socials: [socialSchema]
});

module.exports = mongoose.model("Profile", profileSchema);