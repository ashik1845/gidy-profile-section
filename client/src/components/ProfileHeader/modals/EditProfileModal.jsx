import { useState, useEffect } from "react";
import Modal from "../../Modal";

function EditProfileModal({ profile, open, onClose, onSave }) {
  const [form, setForm] = useState(profile);
  const [resumeFile, setResumeFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

useEffect(() => {
  setForm(profile);
}, [profile]);

  if (!open) return null;

  return (
    <Modal onClose={onClose}>

      <div className="modal-body">

        {/* Avatar */}
        <div className="avatar-edit-container">
          <img
            src={avatarPreview ? avatarPreview : profile.avatar ? profile.avatar : "/avatar.png"}
            className="avatar-preview"
          />

          <label className="avatar-edit-btn">
            <svg
              viewBox="0 0 24 24"
              className="edit-icon"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
            </svg>

            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                setAvatarFile(file);
                setAvatarPreview(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>

        <label>First Name *</label>
        <input
          value={form.firstName || ""}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <label>Last Name *</label>
        <input
          value={form.lastName || ""}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <label>Email ID *</label>
        <input
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Location</label>
        <input
          value={form.location || ""}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <label>
          Bio
          <span className="bio-info">
            max character (500 - {(form.bio?.length || 0)})
          </span>
        </label>

        <textarea
          value={form.bio || ""}
          maxLength={500}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

    <label className="resume-upload">
  <input
    type="file"
    hidden
    accept=".pdf,.doc,.docx"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) setResumeFile(file);
    }}
  />
  
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="upload-icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
      d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"/>
    <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
      d="M320 255.79l-64-64-64 64m64 192.42V207.79"/>
  </svg>

  <span className="resume-upload-label">
    {resumeFile ? resumeFile.name : "UPLOAD RESUME"}
  </span>
</label>
      </div>

      {/* FOOTER */}
      <div className="modal-footer">
        <button className="cancel-btn" onClick={onClose}>
          CANCEL
        </button>
        <button className="update-btn" onClick={() => onSave(form, resumeFile, avatarFile)}>
          UPDATE
        </button>
      </div>

    </Modal>
  );
}

export default EditProfileModal;
