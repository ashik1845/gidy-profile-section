

function ProfileAvatar({ profile }) {
  return (
    <>
      <img
        src={profile.avatar ? profile.avatar : "/avatar.png"}
        alt="avatar"
        className="avatar"
      />

      <div className="name-location">
        <p className="user-name">
          {profile.firstName} {profile.lastName}
          <span className="user-role">( Final-Year Student )</span>
        </p>
        <p className="location">{profile.location}</p>
      </div>
    </>
  );
}

export default ProfileAvatar;
