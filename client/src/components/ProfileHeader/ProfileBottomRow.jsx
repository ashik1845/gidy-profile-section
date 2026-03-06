import leagueImg from "../../assets/league-image.png";

function ProfileBottomRow({ profile, onDownloadResume }) {
  return (
    <div className="bottom-row">

      <div className="contact-section">

        <div className="contact-row">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="mail-icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Mail">
              <path d="M19.435,4.065H4.565a2.5,2.5,0,0,0-2.5,2.5v10.87a2.5,2.5,0,0,0,2.5,2.5h14.87a2.5,2.5,0,0,0,2.5-2.5V6.565A2.5,2.5,0,0,0,19.435,4.065Zm-14.87,1h14.87a1.489,1.489,0,0,1,1.49,1.39c-2.47,1.32-4.95,2.63-7.43,3.95a6.172,6.172,0,0,1-1.06.53,2.083,2.083,0,0,1-1.67-.39c-1.42-.75-2.84-1.51-4.25-2.26-1.14-.6-2.3-1.21-3.44-1.82A1.491,1.491,0,0,1,4.565,5.065Zm16.37,12.37a1.5,1.5,0,0,1-1.5,1.5H4.565a1.5,1.5,0,0,1-1.5-1.5V7.6c2.36,1.24,4.71,2.5,7.07,3.75a5.622,5.622,0,0,0,1.35.6,2.872,2.872,0,0,0,2-.41c1.45-.76,2.89-1.53,4.34-2.29,1.04-.56,2.07-1.1,3.11-1.65Z"></path>
            </g>
          </svg>

          <span className="email">{profile.email}</span>
        </div>

        {profile.resume && (
         
            <button className="resume-btn" onClick={onDownloadResume}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="download-icon"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4l-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"></path>
              </svg>
              <span>Download Resume</span>
            </button>
        )}

      </div>

      <div className="league-section">

        <div className="league-card">

          <img
            src={leagueImg}
            alt="league"
            className="league-icon"
          />

          <div className="league-info">

            <div className="league-item">
              <span className="label">League</span>
              <span className="value">Bronze</span>
            </div>

            <div className="league-item">
              <span className="label">Rank</span>
              <span className="value">30</span>
            </div>

            <div className="league-item">
              <span className="label">Points</span>
              <span className="value">100</span>
            </div>

          </div>

        </div>

        <div className="rewards-link">
          <span>View My Rewards</span>
          <svg
            className="reward-arrow-icon"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
          </svg>
        </div>

      </div>

    </div>
  );
}

export default ProfileBottomRow;
