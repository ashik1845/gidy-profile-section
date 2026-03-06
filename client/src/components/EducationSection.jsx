import ProfileSection from "./ProfileSection";
import { forwardRef } from "react";
import "../styles/ProfileSection.css";

const EducationIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
    strokeLinecap="round" strokeLinejoin="round"
    className="profile-common-svg--edu" height="1em" width="1em"
    xmlns="http://www.w3.org/2000/svg">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
    <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
  </svg>
);

const renderItem = (edu, formatDate) => ({
  primary: `${edu.degree}${edu.field ? ` - ${edu.field}` : ""}`,
  secondary: `${edu.college}${edu.location ? `, ${edu.location}` : ""}`,
  dates: `${formatDate(edu.startDate)} — ${edu.endDate ? formatDate(edu.endDate) : "Present"}`,
});

const renderFields = (form, setForm) => (
  <>
    <label>College *</label>
    <input type="text" value={form.college || ""}
      onChange={(e) => setForm({ ...form, college: e.target.value })} />

    <label>Degree *</label>
    <input type="text" value={form.degree || ""}
      onChange={(e) => setForm({ ...form, degree: e.target.value })} />

    <label>Field of Study *</label>
    <input type="text" value={form.field || ""}
      onChange={(e) => setForm({ ...form, field: e.target.value })} />

    <label>Location *</label>
    <input type="text" value={form.location || ""}
      onChange={(e) => setForm({ ...form, location: e.target.value })} />

    <label>Date of joining *</label>
    <input type="date" value={form.startDate || ""}
      onChange={(e) => setForm({ ...form, startDate: e.target.value })} />

    <div className="checkbox-row">
      <input type="checkbox" checked={form.current || false}
        onChange={(e) => setForm({ ...form, current: e.target.checked })} />
      <span>Currently studying here / not completed</span>
    </div>

    <div style={{ textAlign: "center", margin: "10px 0", fontSize: "12px", color: "#888" }}>
      OR
    </div>

    <label>Date of completion *</label>
    <input type="date" disabled={form.current} value={form.endDate || ""}
      onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
  </>
);
const EducationSection = forwardRef(function EducationSection({ profile, refresh }, ref) {
  return (
    <ProfileSection
      ref={ref}              // ✅ forward ref
      title="Education"
      items={profile.education || []}
      apiPath="/education"
      refresh={refresh}
      icon={<EducationIcon />}
      iconClass="profile-common-icon--edu"
      emptyText="🎓 Add Your Education!"
      renderItem={renderItem}
      renderFields={renderFields}
      deleteLabel={(item) => item?.college}
      deleteTitle="Delete Education"
    />
  );
});

export default EducationSection;
