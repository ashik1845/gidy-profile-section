import "../styles/Profilecompletion.css";

const TASKS = [
  {
    key: "bio",
    emoji: "✍️",
    label: "Complete Your Bio",
    points: "+20%",
    desc: "Tell us about yourself in a few words!",
  },
  {
    key: "skills",
    emoji: "🎯",
    label: "Add Your Skills",
    points: "+20%",
    desc: "Show what you're best at! More skills make your profile stronger.",
  },
  {
    key: "experience",
    emoji: "💼",
    label: "Add Your Experience",
    points: "+20%",
    desc: "Showcase your work history and professional background.",
  },
  {
    key: "education",
    emoji: "🎓",
    label: "Add Your Education",
    points: "+20%",
    desc: "Highlight your academic achievements and qualifications.",
  },
  {
    key: "certifications",
    emoji: "📜",
    label: "Upload Your Certificates",
    points: "+20%",
    desc: "Boost your profile with relevant certifications and training.",
  },
];

function isTaskDone(profile, key) {
  if (!profile) return false;

  // Bio = all basic info fields filled
  if (key === "bio") {
    return Boolean(
      profile.firstName &&
      profile.lastName &&
      profile.email &&
      profile.location &&
      profile.bio
    );
  }

  const val = profile[key];
  return Array.isArray(val) ? val.length > 0 : Boolean(val);
}

export default function ProfileCompletion({ profile, completion, onTaskClick }) {
if (completion >= 100) {
  return (
    <div className="card profile-complete">
      <div className="profile-complete-done">
        <div className="done-text">
          <h4>🎓 Profile Completed</h4>
          <p>Mission complete! Profile at 100% and you're good to go!</p>
        </div>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="completion-tick-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M362.6 192.9L345 174.8c-.7-.8-1.8-1.2-2.8-1.2-1.1 0-2.1.4-2.8 1.2l-122 122.9-44.4-44.4c-.8-.8-1.8-1.2-2.8-1.2-1 0-2 .4-2.8 1.2l-17.8 17.8c-1.6 1.6-1.6 4.1 0 5.7l56 56c3.6 3.6 8 5.7 11.7 5.7 5.3 0 9.9-3.9 11.6-5.5h.1l133.7-134.4c1.4-1.7 1.4-4.2-.1-5.7z"/>
          <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"/>
        </svg>
      </div>
    </div>
  );
}

  const pendingTasks = TASKS.filter((t) => !isTaskDone(profile, t.key));

  return (
    <div className="card profile-complete">
      <div className="profile-complete-header">
        <h4>🎓 Level Up Profile</h4>
        <p>Just a few clicks away from awesomeness, complete your profile!</p>
      </div>

      <div className="progress-label">Progress: {completion}%</div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${completion}%` }} />
      </div>

      <div className="completion-tasks">
        {pendingTasks.map((task) => (
          <div
            key={task.key}
            className="completion-task"
            onClick={() => onTaskClick?.(task.key)}
          >
            <div className="task-info">
              <div className="task-title">
                 {task.label} {task.emoji} {" "}
                <span className="task-points">({task.points})</span>
              </div>
              <div className="task-desc">{task.desc}</div>
            </div>
            <div className="task-action">
              <svg viewBox="0 0 512 512"  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" />
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
        d="M256 176v160m80-80H176" />
    </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}