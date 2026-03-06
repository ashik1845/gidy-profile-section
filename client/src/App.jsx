import { useEffect, useState, useRef } from "react";
import API from "./api";
import "./App.css";

import { usePublicView } from "./context/PublicViewContext";
import ProfileHeader from "./components/ProfileHeader";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import CertificationSection from "./components/CertificationSection";
import ProfileCompletion from "./components/ProfileCompletion";
import AIAnalyzer from "./components/AIAnalyzer";

function App() {
  const { isPublic } = usePublicView();

  const skillsRef     = useRef();
  const experienceRef = useRef();
  const educationRef  = useRef();
  const certRef       = useRef();
  const profileRef    = useRef();

  const [profile, setProfile]       = useState(null);
  const [completion, setCompletion] = useState(0);

  const careerGoal = null;

  const handleTaskClick = (key) => {
    if (key === "skills")         skillsRef.current?.openModal();
    if (key === "experience")     experienceRef.current?.openModal();
    if (key === "education")      educationRef.current?.openModal();
    if (key === "certifications") certRef.current?.openModal();
    if (key === "bio")            profileRef.current?.openModal();
  };

const fetchProfile = async () => {
  try {
    const res = await API.get("/");
    setProfile(res.data.profile);
    setCompletion(res.data.completion);
  } catch (err) {
    setTimeout(fetchProfile, 5000);
  }
};

  useEffect(() => { fetchProfile(); }, []);

 if (!profile) return (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: "12px" }}>
    <div style={{ fontSize: "14px", color: "#6b7280" }}>Loading profile...</div>
    <div style={{ fontSize: "12px", color: "#9ca3af" }}>This may take up to 30 seconds on first load</div>
  </div>
);

  return (
    <div className="page">
      <div className="content">

        <ProfileHeader
          ref={profileRef}
          profile={profile}
          refresh={fetchProfile}
        />

        {/*  Career car*/}
        <div className="career-card">
          {isPublic ? (
            careerGoal ? (
              <div className="career-text">
                <h3>{careerGoal.title}</h3>
                <p>{careerGoal.description}</p>
              </div>
            ) : (
              <p className="career-empty">Career goals have not been added yet.</p>
            )
          ) : (
            <>
              <div className="career-text">
                <h3>Tell us where you want to go</h3>
                <p>
                  Add your career goals and what inspires you. This helps us tailor
                  recommendations, learning paths, and opportunities just for you.
                </p>
              </div>
              <button className="primary-btn">✨ Add your career goals</button>
            </>
          )}
        </div>

        <div className="grid-layout">
          <div className="left-column">
            {!isPublic && (
              <ProfileCompletion
                profile={profile}
                completion={completion}
                onTaskClick={handleTaskClick}
              />
            )}
            <SkillsSection ref={skillsRef} profile={profile} refresh={fetchProfile} />
          </div>

          <div className="right-column">
            <ExperienceSection    ref={experienceRef} profile={profile} refresh={fetchProfile} />
            <EducationSection     ref={educationRef}  profile={profile} refresh={fetchProfile} />
            <CertificationSection ref={certRef}       profile={profile} refresh={fetchProfile} />
          </div>
        </div>

      </div>

      {!isPublic && <AIAnalyzer />}
    </div>
  );
}

export default App;