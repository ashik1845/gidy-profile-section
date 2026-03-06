import { useState, useEffect } from "react";

function ProfileKebabMenu({ profile, onEditProfile, onAddSocial, onEditSocial }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".kebab-menu-wrap")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div className="kebab-menu-wrap" style={{ position: "relative", marginLeft: "auto" }}>
        <div className="kebab" onClick={() => setMenuOpen((v) => !v)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="grey" className="dots-icon">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>

        {menuOpen && (
          <div className="profile-common-dropdown">
            <div className="profile-common-dropdown-item" onClick={() => { onEditProfile(); setMenuOpen(false); }}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="menu-icons dots" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"/></svg>
              Edit Profile
            </div>

            <div className="profile-common-dropdown-item" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setMenuOpen(false);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="menu-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4v4c-6.575 1.028-9.02 6.788-10 12c-.037.206 5.384-5.962 10-6v4l8-7-8-7z"/></svg>
              Share Profile
            </div>

            <div className="profile-common-dropdown-item" onClick={() => { onAddSocial(); setMenuOpen(false); }}>
              <svg className="menu-icons" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Add Socials
            </div>

            {profile.socials?.length > 0 && (
              <div className="profile-common-dropdown-item" onClick={() => { onEditSocial(); setMenuOpen(false); }}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="menu-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z"></path><path d="M8.503 11.589v1.398h1.398l3.87-3.864-1.399-1.398zm5.927-3.125-1.398-1.398 1.067-1.067 1.398 1.398z"></path></svg>
                Edit Socials
              </div>
            )}

            <div className="profile-common-dropdown-item">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="menu-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M439 32v165h18V32h-18zm-18 12.99L327.6 80l93.4 35V44.99zM165.9 103c-5 0-10.2 2.3-15.3 7-6.2 5.8-11.5 15.1-13.8 26.3-2.3 11.3-1 22 2.5 29.7 3.5 7.8 8.6 12.3 14.6 13.5 6 1.3 12.4-.9 18.7-6.6 6.1-5.8 11.5-15.1 13.8-26.4 2.2-11.3.9-22-2.5-29.7-3.5-7.8-8.6-12.2-14.6-13.5-1.1-.2-2.3-.3-3.4-.3zm-38.4 78.5c-3.4 1.2-6.9 2.5-10.7 4.1-24.85 15.7-42.2 31.2-59.84 55.7-11.19 15.5-11.74 42-12.58 61.5l20.8 9.2c.87-27.8.36-39.3 13.27-55.3 9.83-12.2 19.33-25 37.55-28.9 1.6 28.9-2.6 73.7-14 119.6 20.5 2.8 37.6-.7 57-6.3 50.7-25.3 74.1-3.8 109.3 45.7l20.5-32.1c-24.6-28.9-48.5-75.1-117.2-57.3 5-27.3 5.6-45.4 8.6-72.6.6-12 .8-23.9 1.1-35.7-8.9 6.8-19.9 10.4-31 8.1-9.5-2-17.3-7.9-22.8-15.7zm144.2 7.3c-18.2 17.8-22.2 31-50.2 38.4l-22.5-24c-.4 12.8-.8 25.9-1.9 39.2 9.5 8.7 19.2 15.7 22.7 14.6 31.3-9.4 40.3-20.3 61.4-41.9l-9.5-26.3zM409 215v96h-96v96h-96v78.1c102.3.2 167.8 1.1 270 1.8V215h-78zM140.7 363.9c-13.6 2.5-27.8 3.3-43.44.9-10.89 37.5-26.76 74.3-48.51 102.5l38.63 15.3c27.02-37.9 36.82-70.6 53.32-118.7z"/></svg>
              Career Vision
            </div>

            <div className="profile-common-dropdown-item">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="menu-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"/></svg>
              Settings
            </div>
          </div>
        )}
      </div>

      {copied && (
        <p style={{ fontSize: "12px", color: "#22c55e", textAlign: "right", margin: "4px 8px 0 0" }}>
          Profile URL copied!
        </p>
      )}
    </>
  );
}

export default ProfileKebabMenu;
