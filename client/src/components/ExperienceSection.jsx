import ProfileSection from "./ProfileSection";
import { forwardRef } from "react";  
import "../styles/ProfileSection.css";

const ExperienceIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"
    className="profile-common-svg" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

const renderItem = (exp, formatDate) => ({
  primary: exp.role,
  secondary: `${exp.company}${exp.location ? `, ${exp.location}` : ""}`,
  dates: `Started: ${formatDate(exp.startDate)} - Ended: ${exp.endDate ? formatDate(exp.endDate) : "Present"}`,
});

const renderFields = (form, setForm) => (
  <>
    <label>Role *</label>
    <input type="text" value={form.role || ""}
      onChange={(e) => setForm({ ...form, role: e.target.value })} />

    <label>Company Name *</label>
    <input type="text" value={form.company || ""}
      onChange={(e) => setForm({ ...form, company: e.target.value })} />

    <label>Location</label>
    <input type="text" value={form.location || ""}
      onChange={(e) => setForm({ ...form, location: e.target.value })} />

    <label>Date of joining</label>
    <input type="date" value={form.startDate || ""}
      onChange={(e) => setForm({ ...form, startDate: e.target.value })} />

    <label>Date of leaving</label>
    <input type="date" value={form.endDate || ""} disabled={form.current}
      onChange={(e) => setForm({ ...form, endDate: e.target.value })} />

    <div className="checkbox-row">
      <input type="checkbox" checked={form.current || false}
        onChange={(e) => setForm({ ...form, current: e.target.checked })} />
      <span>Currently working in this role</span>
    </div>
  </>
);

const ExperienceSection = forwardRef(function ExperienceSection({ profile, refresh }, ref) {
  return (
    <ProfileSection
    ref={ref}   
      title="Experience"
      items={profile.experience || []}
      apiPath="/experience"
      refresh={refresh}
      icon={<ExperienceIcon />}
      emptyText="✍️ Add Your Experiences!"
      renderItem={renderItem}
      renderFields={renderFields}
      deleteLabel={(item) => item?.company}
      deleteTitle="Delete Experience"
    />
  );
});

export default ExperienceSection;