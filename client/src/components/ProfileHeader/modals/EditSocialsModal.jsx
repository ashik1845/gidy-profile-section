import API from "../../../api";
import Modal from "../../Modal";
import EditSocialRow from "../EditSocialRow";

const SOCIAL_PATTERNS = {
  instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
  github:    /^https?:\/\/(www\.)?github\.com\/.+/i,
  linkedin:  /^https?:\/\/(www\.)?linkedin\.com\/.+/i,
};

function EditSocialsModal({ profile, open, onClose, refresh }) {
  if (!open) return null;

  return (
    <Modal onClose={onClose} className="edit-socials-modal">
      <h3 className="modal-title">Edit Socials</h3>
      <div className="modal-body">
        {profile.socials.map((s) => (
          <EditSocialRow
            key={s.platform}
            social={s}
            patterns={SOCIAL_PATTERNS}
            onSave={async (platform, url) => {
              await API.put(`/socials/${platform}`, { url });
              refresh();
            }}
            onDelete={async (platform) => {
              await API.delete(`/socials/${platform}`);
              refresh();
            }}
          />
        ))}
      </div>
      <div className="modal-footer">
        <button className="cancel-btn" onClick={onClose}>CANCEL</button>
        <button className="update-btn" onClick={onClose}>DONE</button>
      </div>
    </Modal>
  );
}

export default EditSocialsModal;
