const Profile = require("../models/profile");

// ── Helpers ──────────────────────────────────────────────
const calculateCompletion = (profile) => {
  let completion = 0;
  if (profile.firstName && profile.lastName && profile.email && profile.location && profile.bio) completion += 20;
  if (profile.skills?.length > 0)        completion += 20;
  if (profile.experience?.length > 0)    completion += 20;
  if (profile.education?.length > 0)     completion += 20;
  if (profile.certifications?.length > 0) completion += 20;
  return completion;
};

// ── Profile ───────────────────────────────────────────────
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json({ profile, completion: calculateCompletion(profile) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ profile, completion: calculateCompletion(profile) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Avatar & Resume uploads ───────────────────────────────
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile({});
    profile.resume = req.file.path;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Resume upload failed" });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile({});
    profile.avatar = req.file.path;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Avatar upload failed" });
  }
};

// ── Socials ───────────────────────────────────────────────
exports.addOrReplaceSocial = async (req, res) => {
  try {
    const { platform, url } = req.body;
    const profile = await Profile.findOne();
    const existing = profile.socials.find(s => s.platform === platform);
    if (existing) existing.url = url;
    else profile.socials.push({ platform, url });
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSocial = async (req, res) => {
  try {
    const { url } = req.body;
    const profile = await Profile.findOne();
    const social = profile.socials.find(s => s.platform === req.params.platform);
    if (!social) return res.status(404).json({ message: "Social not found" });
    social.url = url;
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSocial = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.socials = profile.socials.filter(s => s.platform !== req.params.platform);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Skills ────────────────────────────────────────────────
exports.updateSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.skills = req.body.skills;
    await profile.save();
    res.json({ profile, completion: calculateCompletion(profile) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Experience ────────────────────────────────────────────
exports.addExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.experience.push(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    const experience = profile.experience.id(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    Object.assign(experience, req.body);
    await profile.save();
    res.json({ profile, completion: calculateCompletion(profile) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.experience = profile.experience.filter(e => e._id.toString() !== req.params.id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Education ─────────────────────────────────────────────
exports.addEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.education.push(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    const education = profile.education.id(req.params.id);
    if (!education) return res.status(404).json({ message: "Education not found" });
    Object.assign(education, req.body);
    await profile.save();
    res.json({ profile, completion: calculateCompletion(profile) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.education = profile.education.filter(e => e._id.toString() !== req.params.id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Certifications ────────────────────────────────────────
exports.addCertification = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.certifications.push(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCertification = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    const cert = profile.certifications.id(req.params.id);
    if (!cert) return res.status(404).json({ message: "Certification not found" });
    Object.assign(cert, req.body);
    await profile.save();
    res.json({ profile, completion: calculateCompletion(profile) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.certifications = profile.certifications.filter(c => c._id.toString() !== req.params.id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── AI Analyze ────────────────────────────────────────────
exports.aiAnalyze = async (req, res) => {
  try {
    const { targetRole } = req.body;
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const profileData = {
      name: `${profile.firstName} ${profile.lastName}`,
      bio: profile.bio || "Not provided",
      skills: profile.skills || [],
      experience: profile.experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.current ? "Present" : e.endDate})`),
      education: profile.education.map(e => `${e.degree} in ${e.field} from ${e.college}`),
      certifications: profile.certifications.map(c => `${c.name} by ${c.provider}`),
    };

    const prompt = `
You are a career advisor for software developers.

Analyze the following developer profile for the role: ${targetRole}.

Profile:
Name: ${profileData.name}
Bio: ${profileData.bio}
Skills: ${profileData.skills.join(", ") || "None listed"}
Experience: ${profileData.experience.join(" | ") || "None listed"}
Education: ${profileData.education.join(" | ") || "None listed"}
Certifications: ${profileData.certifications.join(" | ") || "None listed"}

Tasks:
1. Give a profile score out of 100 for this role.
2. List 3 strengths in the profile.
3. Suggest 5 improvements to better match the role.
4. Suggest 3 skills the user should learn or add.

Return ONLY a valid JSON object in this exact format with no extra text or markdown:
{
  "score": number,
  "strengths": ["string", "string", "string"],
  "improvements": ["string", "string", "string", "string", "string"],
  "recommended_skills": ["string", "string", "string"]
}
`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const geminiData = await geminiRes.json();

    if (geminiRes.status !== 200) {
      return res.status(502).json({ error: geminiData.error?.message || "Gemini API error" });
    }

    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return res.status(500).json({ error: "No response from Gemini" });

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);

    res.json(result);
  } catch (err) {
    console.error("AI Analyze error:", err);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
};