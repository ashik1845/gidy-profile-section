import { useState } from "react";
import Modal from "../../Modal";

function AddSocialModal({ profile, open, onClose, onAdd }) {
  const [socialForm, setSocialForm] = useState({ platform: "", url: "" });
  const [socialError, setSocialError] = useState("");

  const SOCIAL_PATTERNS = {
    instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
    github:    /^https?:\/\/(www\.)?github\.com\/.+/i,
    linkedin:  /^https?:\/\/(www\.)?linkedin\.com\/.+/i,
  };

  const handleAdd = async () => {
    const { platform, url } = socialForm;
    if (!platform) return setSocialError("Please select a platform.");
    if (!SOCIAL_PATTERNS[platform]?.test(url)) {
      return setSocialError(`Enter a valid ${platform} URL.`);
    }
    await onAdd(socialForm);
    setSocialForm({ platform: "", url: "" });
    setSocialError("");
  };

  if (!open) return null;

  return (
    <Modal onClose={() => { onClose(); setSocialError(""); }}>
      <h3 className="modal-title">Add Socials</h3>
      <div className="modal-body">
        <label>Social Media *</label>
        <div className="custom-select">
          <select
            value={socialForm.platform}
            onChange={(e) => {
              setSocialForm({ ...socialForm, platform: e.target.value });
              setSocialError("");
            }}
          >
            <option value="" disabled>Select platform</option>
            {["instagram", "github", "linkedin"].map((p) => {
              const alreadyAdded = profile.socials?.some(s => s.platform === p);
              return (
                <option key={p} value={p} disabled={alreadyAdded}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              );
            })}
          </select>

          <svg viewBox="0 0 24 24" className="select-arrow">
            <path d="M7 10l5 5 5-5"></path>
          </svg>
        </div>

        <label>Link *</label>
        <input
          type="text"
          placeholder={
            socialForm.platform === "instagram" ? "https://instagram.com/username" :
            socialForm.platform === "github"    ? "https://github.com/username" :
            socialForm.platform === "linkedin"  ? "https://linkedin.com/in/username" :
            "https://"
          }
          value={socialForm.url}
          onChange={(e) => { setSocialForm({ ...socialForm, url: e.target.value }); setSocialError(""); }}
        />

        {socialError && (
          <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px" }}>
            {socialError}
          </p>
        )}
      </div>
      <div className="modal-footer">
        <button className="cancel-btn" onClick={() => { onClose(); setSocialError(""); }}>
          CANCEL
        </button>
        <button className="update-btn" onClick={handleAdd}>
          ADD
        </button>
      </div>
    </Modal>
  );
}

export default AddSocialModal;
