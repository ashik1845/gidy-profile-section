import { useState } from "react";
import API from "../api";
import "../styles/AIAnalyzer.css";
import { useModal } from "../context/ModalContext";

const ROLES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Mobile Developer",
  "UI/UX Designer",
];

function ScoreRing({ score }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="score-ring-wrap">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="score-number" style={{ color }}>
        {score}<span>/100</span>
      </div>
    </div>
  );
}

function AIAnalyzer() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { anyModalOpen } = useModal();

  const activeRole = targetRole === "custom" ? customRole : targetRole;

  const handleAnalyze = async () => {
    if (!activeRole.trim()) return setError("Please select or enter a target role.");
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await API.post("/ai-analyze", { targetRole: activeRole });
      setResult(res.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPopupOpen(false);
    setResult(null);
    setTargetRole("");
    setCustomRole("");
    setError("");
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      {!anyModalOpen && (
      <button className="ai-fab" onClick={() => setPopupOpen(true)} title="AI Profile Analyzer">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
        <span className="ai-fab-label">AI Analyze</span>
      </button>
       )}

      {/* ── Backdrop + Popup ── */}
      {popupOpen && (
        <div className="ai-backdrop" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
          <div className="ai-popup">

            {/* Popup Header */}
            <div className="ai-popup-header">
              <div className="ai-title-row">
                <span className="ai-sparkle">✨</span>
                <h3 className="ai-title">AI Profile Analyzer</h3>
              </div>
              <button className="ai-close-btn" onClick={handleClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <p className="ai-subtitle">Select a target role and let AI score your profile and suggest improvements.</p>

        
            <div className="ai-popup-body">

              {/* Role Selector */}
              <div className="ai-role-section">
                <label className="ai-label">Target Role</label>
                <div className="role-chips">
                  {ROLES.map((role) => (
                    <button
                      key={role}
                      className={`role-chip ${targetRole === role ? "active" : ""}`}
                      onClick={() => { setTargetRole(role); setCustomRole(""); setResult(null); }}
                    >
                      {role}
                    </button>
                  ))}
                  <button
                    className={`role-chip ${targetRole === "custom" ? "active" : ""}`}
                    onClick={() => setTargetRole("custom")}
                  >
                    + Custom
                  </button>
                </div>

                {targetRole === "custom" && (
                  <input
                    className="custom-role-input"
                    placeholder="e.g. Cloud Architect"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                )}
              </div>

              {error && <p className="ai-error">{error}</p>}

              {/* Analyze Button */}
              <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
                {loading ? (
                  <span className="ai-loading">
                    <span className="spinner" /> Analyzing...
                  </span>
                ) : (
                  "Analyze My Profile"
                )}
              </button>

              {/* Results */}
              {result && (
                <div className="ai-results">

                  <div className="result-score-section">
                    <ScoreRing score={result.score} />
                    <div className="score-label">
                      <p className="score-role">Match score for</p>
                      <p className="score-role-name">{activeRole}</p>
                    </div>
                  </div>

                  <div className="result-grid">

                    <div className="result-block strengths">
                      <h4>💪 Strengths</h4>
                      <ul>
                        {result.strengths.map((s, i) => (
                          <li key={i}>{s.replace(/\*\*/g, "")}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="result-block improvements">
                      <h4>🚀 Improvements</h4>
                      <ul>
                        {result.improvements.map((s, i) => (
                          <li key={i}>{s.replace(/\*\*/g, "")}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="result-block skills">
                      <h4>🎯 Skills to Add</h4>
                      <div className="skill-tags">
                        {result.recommended_skills.map((s, i) => (
                          <span key={i} className="skill-tag">
                            {s.replace(/\*\*/g, "").split(":")[0].trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAnalyzer;