import { useState } from "react";

function EditSocialRow({ social, patterns, onSave, onDelete }) {
  const [url, setUrl] = useState(social.url);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!patterns[social.platform]?.test(url)) {
      return setError(`Enter a valid ${social.platform} URL.`);
    }
    await onSave(social.platform, url);
    setError("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const label = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);

  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* Label */}
        <span style={{ fontSize: "12px",fontWeight:"600", color: "rgb(128, 128, 128)", minWidth: "75px", textAlign: "right", flexShrink: 0 }}>
          {label} :
        </span>

        {/* Input — takes all remaining space */}
        <input
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(""); setSaved(false); }}
          style={{
            flex: 1,
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "13px",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {/* ✅ tick */}
        <svg
          onClick={handleSave}
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ width: "13px", height: "13px", color: "#22c55e", cursor: "pointer", flexShrink: 0 }}
        >
          <polyline points="20 6 9 17 4 12"/>
        </svg>

        {/* 🗑 delete */}
        <svg
          onClick={() => onDelete(social.platform)}
          viewBox="0 0 24 24" fill="currentColor"
          style={{ width: "13px", height: "13px", color: "rgb(253,135,136)", cursor: "pointer", flexShrink: 0 }}
        >
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/>
        </svg>

      </div>
      {error && <p style={{ color: "#ef4444", fontSize: "11px", margin: "4px 0 0 87px" }}>{error}</p>}
    </div>
  );
}

export default EditSocialRow;
