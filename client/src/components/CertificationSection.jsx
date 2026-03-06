import { useState, forwardRef } from "react";
import ProfileSection from "./ProfileSection";
import { usePublicView } from "../context/PublicViewContext";
import "../styles/ProfileSection.css";

const CertificationIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" className="profile-common-svg--certificate" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M246,128a54,54,0,1,0-92,38.32V224a6,6,0,0,0,8.68,5.37L192,214.71l29.32,14.66A6,6,0,0,0,224,230a5.93,5.93,0,0,0,3.15-.9A6,6,0,0,0,230,224V166.32A53.83,53.83,0,0,0,246,128Zm-96,0a42,42,0,1,1,42,42A42,42,0,0,1,150,128Zm68,86.29-23.32-11.66a6,6,0,0,0-5.36,0L166,214.29v-39a53.87,53.87,0,0,0,52,0ZM134,192a6,6,0,0,1-6,6H40a14,14,0,0,1-14-14V56A14,14,0,0,1,40,42H216a14,14,0,0,1,14,14,6,6,0,0,1-12,0,2,2,0,0,0-2-2H40a2,2,0,0,0-2,2V184a2,2,0,0,0,2,2h88A6,6,0,0,1,134,192Zm-16-56a6,6,0,0,1-6,6H72a6,6,0,0,1,0-12h40A6,6,0,0,1,118,136Zm0-32a6,6,0,0,1-6,6H72a6,6,0,0,1,0-12h40A6,6,0,0,1,118,104Z"/>
  </svg>
);

const renderItem = (cert, formatDate) => ({
  primary: cert.name,
  secondary: cert.provider,
  description: cert.description || "",
  certId: cert.certId || "",
  certUrl: cert.certUrl || "",
  issuedDate: formatDate(cert.issuedDate),
  expiryDate: cert.expiryDate ? formatDate(cert.expiryDate) : null,
});

const renderFields = (form, setForm) => {
  const descLength = (form.description || "").length;
  const maxDesc = 200;
  return (
    <>
      <label>Certification *</label>
      <input type="text" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <label>Provider *</label>
      <input type="text" value={form.provider || ""} onChange={(e) => setForm({ ...form, provider: e.target.value })} />

      <label>Certificate Url</label>
      <input type="text" value={form.certUrl || ""} onChange={(e) => setForm({ ...form, certUrl: e.target.value })} />

      <label>Certificate ID</label>
      <input type="text" value={form.certId || ""} onChange={(e) => setForm({ ...form, certId: e.target.value })} />

      <label>Issued Date</label>
      <input type="date" value={form.issuedDate || ""} onChange={(e) => setForm({ ...form, issuedDate: e.target.value })} />

      <label>Expiry Date</label>
      <input type="date" value={form.expiryDate || ""} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />

      <label>
        Description{" "}
        <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>
          max character ({maxDesc} - {descLength})
        </span>
      </label>
      <textarea value={form.description || ""} maxLength={maxDesc} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })} />
    </>
  );
};

/* ── Custom cert item — uses context to hide edit menu ── */
const CertItem = ({ cert, formatDate, onEdit, onDelete }) => {
  const { isPublic } = usePublicView();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="profile-common-item" style={{ position: "relative" }}>

      <div className="profile-common-left">
        <div className="profile-common-icon profile-common-icon--cert">
          <CertificationIcon />
        </div>
        <div className="profile-common-details">
          <p className="profile-common-role">{cert.name}</p>
          <p className="profile-common-company">{cert.provider}</p>
          {cert.description && <p className="profile-common-dates">{cert.description}</p>}
          <p className="profile-common-dates" style={{ marginTop: "3px" }}>
            {cert.certId && <span>ID NO: {cert.certId}&nbsp;&nbsp;</span>}
            {cert.certUrl && (
              <a href={cert.certUrl} target="_blank" rel="noreferrer" style={{ color: "#4285f4", textDecoration: "none", fontSize: "12px" }}>
                Certificate Link
              </a>
            )}
          </p>
          <p className="profile-common-dates">
            {cert.issuedDate && `Provided on: ${formatDate(cert.issuedDate)}`}
            {cert.issuedDate && cert.expiryDate && " | "}
            {cert.expiryDate && `Valid till: ${formatDate(cert.expiryDate)}`}
          </p>
        </div>
      </div>

      {/* ✅ hide 3-dot menu in public view */}
      {!isPublic && (
        <>
          <div className="profile-common-menu" onClick={() => setMenuOpen((v) => !v)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="grey" className="dots-icon">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          {menuOpen && (
            <div className="profile-common-dropdown">
              <div className="profile-common-dropdown-item" onClick={() => { onEdit(cert); setMenuOpen(false); }}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="menu-icons" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="m15 5 4 4"/>
                </svg>
                Edit certification
              </div>
              <div className="profile-common-dropdown-item delete" onClick={() => { onDelete(cert); setMenuOpen(false); }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="menu-icons delete-icon" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0V0z"/>
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                Delete
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CertificationSection = forwardRef(function CertificationSection({ profile, refresh }, ref) {
  return (
    <ProfileSection
      ref={ref}
      title="Certification"
      items={profile.certifications || []}
      apiPath="/certification"
      refresh={refresh}
      icon={<CertificationIcon />}
      iconClass="profile-common-icon--cert"
      emptyText="🔓 Add Your Certifications!"
      renderItem={renderItem}
      renderFields={renderFields}
      deleteLabel={(item) => item?.name}
      deleteTitle="Delete Certification"
      CustomItemRenderer={CertItem}
    />
  );
});

export default CertificationSection;