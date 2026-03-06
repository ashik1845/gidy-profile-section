import { useState, forwardRef, useImperativeHandle } from "react";
import API from "../api";
import Modal from "./Modal";
import { usePublicView } from "../context/PublicViewContext";
import "../styles/ProfileSection.css";
import "../styles/SkillsSection.css";

const SkillsSection = forwardRef(function SkillsSection({ profile, refresh }, ref) {
  const { isPublic } = usePublicView();

  const [open, setOpen]         = useState(false);
  const [skills, setSkills]     = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setSkills(profile.skills || []);
      setOpen(true);
    }
  }));

  const openModal = () => {
    setSkills(profile.skills || []);
    setOpen(true);
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills([...skills, trimmed]);
    setNewSkill("");
  };

  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); }
  };

  const saveSkills = async () => {
    await API.put("/skills", { skills });
    setOpen(false);
    refresh();
  };

  return (
    <div className="card">

      {/* ── Header ── */}
      <div className="section-header">
        <p>Skills</p>
        {/* ✅ hide add button in public view */}
        {!isPublic && (
          <button className="add-btn" onClick={openModal}>
            <svg viewBox="0 0 512 512" className="add-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"/>
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 176v160m80-80H176"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Skill chips ── */}
      {profile.skills?.length > 0 ? (
        <div className="skills-chip-wrap">
          {profile.skills.map((skill, i) => (
            <span key={i} className="skills-chip">{skill}</span>
          ))}
        </div>
      ) : (
        <div className="empty-state">🚀 Add Your Skills!</div>
      )}

      {/* ── Modal ── */}
      {open && (
        <Modal onClose={() => setOpen(false)} className="skills-modal">
          <h3 className="modal-title">Skills</h3>
          <div className="modal-body">
            <div className="skills-tag-input">
              {skills.map((skill, i) => (
                <span key={i} className="skills-tag">
                  {skill}
                  <button className="skills-tag-remove" onClick={() => removeSkill(i)}>
                    <svg viewBox="0 0 24 24" className="skills-remove-icon" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                    </svg>
                  </button>
                </span>
              ))}
              <input
                className="skills-tag-field"
                type="text"
                placeholder="Skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={() => setOpen(false)}>CANCEL</button>
            <button className="update-btn" onClick={saveSkills}>ADD</button>
          </div>
        </Modal>
      )}

    </div>
  );
});

export default SkillsSection;