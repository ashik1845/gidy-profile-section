import { useState, forwardRef, useImperativeHandle } from "react";
import API from "../../api";
import { usePublicView } from "../../context/PublicViewContext";
import ProfileAvatar from "./ProfileAvatar";
import ProfileSocialIcons from "./ProfileSocialIcons";
import ProfileKebabMenu from "./ProfileKebabMenu";
import ProfileBottomRow from "./ProfileBottomRow";
import EditProfileModal from "./modals/EditProfileModal";
import AddSocialModal from "./modals/AddSocialModal";
import EditSocialsModal from "./modals/EditSocialsModal";
import "../../styles/ProfileHeader.css";
import "../../styles/PublicView.css";

const ProfileHeader = forwardRef(function ProfileHeader({ profile, refresh }, ref) {
  const { isPublic, togglePublic } = usePublicView();

  const [open, setOpen]                     = useState(false);
  const [socialOpen, setSocialOpen]         = useState(false);
  const [editSocialOpen, setEditSocialOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true),
  }));

  const handleSave = async (form, resumeFile, avatarFile) => {
    await API.put("/", form);
    if (resumeFile) {
      const data = new FormData();
      data.append("resume", resumeFile);
      await API.post("/upload-resume", data);
    }
    if (avatarFile) {
      const data = new FormData();
      data.append("avatar", avatarFile);
      await API.post("/upload-avatar", data);
    }
    setOpen(false);
    refresh();
  };

  const handleAddSocial = async (socialForm) => {
    await API.put("/socials", socialForm);
    setSocialOpen(false);
    refresh();
  };

  const handleDownloadResume = async () => {
    const response = await fetch(`https://gidy-profile-section.onrender.com/${profile.resume}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* ✅ no public-header class — same card always */}
      <div className="profile-header-card">

        <div className="header-row">
          <ProfileAvatar profile={profile} />

          <div className="social-kebab-wrap" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
            <ProfileSocialIcons socials={profile.socials} />

            {/* Toggle — always visible, left of kebab */}
            <button
              className={`public-toggle-btn ${isPublic ? "active" : ""}`}
              onClick={togglePublic}
              title={isPublic ? "Switch to Edit View" : "Switch to Public View"}
            >
              {isPublic ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5"/>
                    <polyline points="17 3 21 3 21 7"/>
                    <line x1="21" y1="3" x2="9" y2="15"/>
                  </svg>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </>
              )}
            </button>

            {!isPublic && (
              <ProfileKebabMenu
                profile={profile}
                onEditProfile={() => setOpen(true)}
                onAddSocial={() => setSocialOpen(true)}
                onEditSocial={() => setEditSocialOpen(true)}
              />
            )}
          </div>
        </div>

        <p className="bio">{profile.bio}</p>

        <ProfileBottomRow
          profile={profile}
          onDownloadResume={handleDownloadResume}
        />

      </div>

      {!isPublic && (
        <>
          <EditProfileModal profile={profile} open={open} onClose={() => setOpen(false)} onSave={handleSave} />
          <AddSocialModal profile={profile} open={socialOpen} onClose={() => setSocialOpen(false)} onAdd={handleAddSocial} />
          <EditSocialsModal profile={profile} open={editSocialOpen} onClose={() => setEditSocialOpen(false)} refresh={refresh} />
        </>
      )}
    </>
  );
});

export default ProfileHeader;