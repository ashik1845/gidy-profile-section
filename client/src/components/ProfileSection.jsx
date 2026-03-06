import { useState, forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import API from "../api";
import Modal from "./Modal";
import { usePublicView } from "../context/PublicViewContext";
import "../styles/ProfileSection.css";

const ProfileSection = forwardRef(function ProfileSection({
  title,
  items = [],
  apiPath,
  refresh,
  icon,
  iconClass = "",
  emptyText,
  renderItem,
  renderFields,
  deleteLabel,
  deleteTitle,
  CustomItemRenderer = null,
}, ref) {
  const { isPublic } = usePublicView();

  const [menuOpen, setMenuOpen]     = useState(null);
  const [editOpen, setEditOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected]     = useState(null);
  const [form, setForm]             = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setSelected(null);
      setForm({});
      setEditOpen(true);
    }
  }));

  const openAdd = () => { setSelected(null); setForm({}); setEditOpen(true); };
  const openEdit = (item) => { setSelected(item); setForm(item); setEditOpen(true); setMenuOpen(null); };
  const openDelete = (item) => { setSelected(item); setDeleteOpen(true); setMenuOpen(null); };

  const saveItem = async () => {
    if (selected) await API.put(`${apiPath}/${selected._id}`, form);
    else await API.post(apiPath, form);
    setEditOpen(false);
    refresh();
  };

  const deleteItem = async () => {
    await API.delete(`${apiPath}/${selected._id}`);
    setDeleteOpen(false);
    refresh();
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const AddIcon = () => (
    <svg viewBox="0 0 512 512" className="add-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"/>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 176v160m80-80H176"/>
    </svg>
  );

  const DotsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="grey" className="dots-icon">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  );

  const EditIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="menu-icons" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </svg>
  );

  const TrashIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="menu-icons delete-icon" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0V0z"/>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
  );

  return (
    <div className="card">

      {/* ── Header ── */}
      <div className="section-header">
        <p>{title}</p>
        {/* ✅ hide add button in public view */}
        {!isPublic && (
          <button className="add-btn" onClick={openAdd}>
            <AddIcon />
          </button>
        )}
      </div>

      {/* ── Item list ── */}
      {items.length > 0 ? (
        items.map((item) => {
          if (CustomItemRenderer) {
            return (
              <CustomItemRenderer
                key={item._id}
                cert={item}
                formatDate={formatDate}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            );
          }
          const { primary, secondary, dates } = renderItem(item, formatDate);
          return (
            <div key={item._id} className="profile-common-item">
              <div className="profile-common-left">
                <div className={`profile-common-icon${iconClass ? ` ${iconClass}` : ""}`}>{icon}</div>
                <div className="profile-common-details">
                  <p className="profile-common-role">{primary}</p>
                  <p className="profile-common-company">{secondary}</p>
                  <p className="profile-common-dates">{dates}</p>
                </div>
              </div>

              {/* ✅ hide 3-dot menu in public view */}
              {!isPublic && (
                <div className="profile-common-menu-wrap" ref={menuOpen === item._id ? menuRef : null}>
                  <div className="profile-common-menu" onClick={() => setMenuOpen(item._id)}>
                    <DotsIcon />
                  </div>
                  {menuOpen === item._id && (
                    <div className="profile-common-dropdown">
                      <div className="profile-common-dropdown-item" onClick={() => openEdit(item)}>
                        <EditIcon /> Edit {title.toLowerCase()}
                      </div>
                      <div className="profile-common-dropdown-item delete" onClick={() => openDelete(item)}>
                        <TrashIcon /> Delete
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="empty-state">{emptyText}</div>
      )}

      {/* ── Add / Edit Modal ── */}
      {editOpen && (
        <Modal onClose={() => setEditOpen(false)}>
          <h3 className="modal-title">{selected ? `Update ${title}` : `Add ${title}`}</h3>
          <div className="modal-body">{renderFields(form, setForm)}</div>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={() => setEditOpen(false)}>CANCEL</button>
            <button className="update-btn" onClick={saveItem}>{selected ? "UPDATE" : "ADD"}</button>
          </div>
        </Modal>
      )}

      {/* ── Delete Modal ── */}
      {deleteOpen && (
        <Modal onClose={() => setDeleteOpen(false)}>
          <h3 className="modal-title">{deleteTitle}</h3>
          <p style={{ marginTop: "10px", color: "rgb(128,128,128)" }}>
            Are you sure you want to delete{" "}
            <span style={{ color: "#111827", fontWeight: "600" }}>{deleteLabel(selected)}</span>{" "}
            {title.toLowerCase()}?
          </p>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={() => setDeleteOpen(false)}>CANCEL</button>
            <button style={{ background: "rgb(253,135,136)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }} onClick={deleteItem}>DELETE</button>
          </div>
        </Modal>
      )}

    </div>
  );
});

export default ProfileSection;