import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../../API/api";
import { useToast } from "../Base/BaseToast";

const emptyProfile = {
  name: "",
  email: "",
  password: "",
  avatar: "",
  company_name: "",
  location: "",
  phone: "",
};

const Profile = () => {
  const { showSuccess, showError } = useToast();
  const [profile, setProfile] = useState(emptyProfile);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const initials = useMemo(() => {
    const name = profile.name.trim();
    if (!name) return "U";
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [profile.name]);

  const joinedDate = useMemo(() => {
    if (!profile.created_at) return "-";
    return new Date(profile.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [profile.created_at]);

  const completeness = useMemo(() => {
    const fields = [
      profile.name,
      profile.email,
      profile.avatar,
      profile.company_name,
      profile.location,
      profile.phone,
    ];
    const filled = fields.filter((f) => f && String(f).trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  }, [profile]);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("tokenPet");
        setUserId(token || "");

        if (!token) {
          showError("No authentication token found. Please log in again.");
          setProfile(emptyProfile);
          return;
        }

        const userData = await fetchUserProfile();

        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          password: "",
          avatar: userData.avatar || "",
          company_name: userData.company_name || "",
          location: userData.location || "",
          phone: userData.phone || "",
          created_at: userData.created_at || "",
          role_id: userData.role_id,
          id: userData.id,
        });
      } catch (error) {
        showError("Failed to load profile. " + error.message);
        setProfile(emptyProfile);
      } finally {
        setLoading(false);
        setTimeout(() => setMounted(true), 50);
      }
    };

    loadProfile();
  }, [showError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Please choose an image file.");
      event.target.value = "";
      return;
    }

    setAvatarLoading(true);
    try {
      const avatarDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Failed to read image file"));
        reader.readAsDataURL(file);
      });

      setProfile((prev) => ({ ...prev, avatar: avatarDataUrl }));
      showSuccess("Avatar updated locally. Save profile to keep it.");
    } catch (error) {
      showError("Could not load avatar image.");
    } finally {
      setAvatarLoading(false);
      event.target.value = "";
    }
  };

  const handleRemoveAvatar = () => {
    setProfile((prev) => ({ ...prev, avatar: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextName = profile.name.trim();
    const nextEmail = profile.email.trim().toLowerCase();
    const nextPassword = profile.password.trim();

    if (!nextName || !nextEmail) {
      showError("Name and email are required.");
      return;
    }

    if (!nextEmail.includes("@")) {
      showError("Please enter a valid email address.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateUserProfile({
        name: nextName,
        email: nextEmail,
        ...(nextPassword && { password: nextPassword }),
        avatar: profile.avatar,
        company_name: profile.company_name,
        location: profile.location,
        phone: profile.phone,
      });

      if (!updated) {
        showError("Could not update your profile.");
        return;
      }

      showSuccess("Profile updated successfully.");
    } catch (error) {
      showError("Failed to save profile changes: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "grid",
          minHeight: "60vh",
          placeItems: "center",
          borderRadius: "1.5rem",
          border: "1px solid #e0f2fe",
          background: "#fff",
          padding: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "3px solid #e0f2fe",
              borderTopColor: "#0d9488",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}>Loading profile…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: .6; }
          100% { transform: scale(1.35); opacity: 0;  }
        }

        .profile-root * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

        /* card entrance */
        .card-1 { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) .05s both; }
        .card-2 { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) .15s both; }
        .card-3 { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) .25s both; }
        .stat-1 { animation: scaleIn .45s cubic-bezier(.22,1,.36,1) .3s  both; }
        .stat-2 { animation: scaleIn .45s cubic-bezier(.22,1,.36,1) .38s both; }
        .stat-3 { animation: scaleIn .45s cubic-bezier(.22,1,.36,1) .46s both; }

        /* field focus */
        .profile-input {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 0.875rem;
          font-family: inherit;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .profile-input:focus {
          border-color: #0d9488;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(13,148,136,.12);
        }
        .profile-input::placeholder { color: #94a3b8; }

        /* avatar hover ring */
        .avatar-wrap:hover .avatar-pulse { opacity: 1; }
        .avatar-pulse {
          position: absolute; inset: -5px;
          border-radius: inherit;
          border: 2px solid rgba(13,148,136,.35);
          opacity: 0;
          transition: opacity .25s;
        }

        /* save button */
        .btn-save {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 12px; padding: 10px 22px;
          font-size: .875rem; font-weight: 700;
          color: #fff; background: #0d9488;
          border: none; cursor: pointer;
          transition: background .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 4px 14px rgba(13,148,136,.28);
        }
        .btn-save:hover:not(:disabled) { background: #0f766e; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(13,148,136,.35); }
        .btn-save:active:not(:disabled) { transform: translateY(0); }
        .btn-save:disabled { background: #99d6d1; cursor: not-allowed; box-shadow: none; }

        /* ghost button */
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          border-radius: 10px; padding: 8px 14px;
          font-size: .8125rem; font-weight: 600;
          color: #475569; background: transparent;
          border: 1.5px solid #e2e8f0; cursor: pointer;
          transition: background .15s, border-color .15s;
        }
        .btn-ghost:hover { background: #f1f5f9; border-color: #cbd5e1; }

        /* progress bar */
        .progress-bar-track {
          height: 6px; border-radius: 99px; background: #e2e8f0; overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #0d9488, #06b6d4);
          transition: width 1s cubic-bezier(.22,1,.36,1);
        }

        /* info chip */
        .info-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 13px; border-radius: 10px;
          background: #f8fafc; border: 1px solid #e2e8f0;
          font-size: .8125rem; color: #475569;
          transition: background .15s;
        }
        .info-chip i { color: #0d9488; font-size: 0.875rem; flex-shrink: 0; }

        /* section label */
        .section-label {
          font-size: .6875rem; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase; color: #0d9488;
        }
      `}</style>

      <div className="profile-root" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* ── MAIN CARD ─────────────────────────────────────────── */}
        <div
          className="card-1"
          style={{
            borderRadius: "1.5rem",
            border: "1px solid #e0f2fe",
            background: "linear-gradient(135deg,#fff 60%,#f0fdfa 100%)",
            boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(13,148,136,.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "clamp(280px,38%,360px) 1fr",
              gap: "0",
            }}
          >
            {/* LEFT PANEL */}
            <div
              style={{
                padding: "2rem",
                borderRight: "1px solid #e0f2fe",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Avatar + name */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                <div
                  className="avatar-wrap"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <div
                    style={{
                      width: 96, height: 96,
                      borderRadius: "28px",
                      overflow: "hidden",
                      background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                      display: "grid", placeItems: "center",
                      fontSize: "1.75rem", fontWeight: 800, color: "#fff",
                      boxShadow: "0 6px 20px rgba(13,148,136,.30)",
                    }}
                  >
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.name || "Avatar"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="avatar-pulse" style={{ position: "absolute", inset: "-5px", borderRadius: "32px", border: "2px solid rgba(13,148,136,.35)", opacity: 0, transition: "opacity .25s" }} />

                  {/* camera badge */}
                  <label
                    style={{
                      position: "absolute", bottom: -6, right: -6,
                      width: 30, height: 30, borderRadius: "50%",
                      background: "#fff", border: "1.5px solid #e0f2fe",
                      display: "grid", placeItems: "center",
                      cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,.1)",
                      transition: "background .15s",
                    }}
                    title="Change avatar"
                  >
                    <i className={`bi ${avatarLoading ? "bi-hourglass-split" : "bi-camera-fill"}`} style={{ color: "#0d9488", fontSize: ".8rem" }} />
                    <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                  </label>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}>
                    {profile.name || "User"}
                  </h2>
                  <p style={{ margin: "2px 0 0", fontSize: ".8125rem", color: "#64748b" }}>{profile.email}</p>
                  {profile.role_id && (
                    <span
                      style={{
                        display: "inline-block", marginTop: 6,
                        fontSize: ".75rem", fontWeight: 700, color: "#0d9488",
                        background: "#f0fdfa", border: "1px solid #99f6e4",
                        borderRadius: "99px", padding: "2px 10px",
                      }}
                    >
                      Role #{profile.role_id}
                    </span>
                  )}
                </div>
              </div>

              {/* Info chips */}
              <div style={{ display: "flex", flexDirection: "column", gap: ".625rem" }}>
                {[
                  { icon: "bi-person-badge", label: `ID: ${profile.id || "-"}` },
                  { icon: "bi-calendar3", label: `Joined: ${joinedDate}` },
                  { icon: "bi-building", label: profile.company_name || "No company" },
                  { icon: "bi-geo-alt", label: profile.location || "No location" },
                  { icon: "bi-telephone", label: profile.phone || "No phone" },
                ].map((item) => (
                  <div key={item.icon} className="info-chip">
                    <i className={`bi ${item.icon}`} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Avatar actions */}
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                <button className="btn-ghost" onClick={handleRemoveAvatar}>
                  <i className="bi bi-trash3" /> Remove
                </button>
                <label className="btn-ghost" style={{ cursor: "pointer" }}>
                  <i className={`bi ${avatarLoading ? "bi-hourglass-split" : "bi-upload"}`} />
                  {avatarLoading ? "Loading…" : "Upload"}
                  <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                </label>
              </div>
            </div>

            {/* RIGHT PANEL — FORM */}
            <form
              onSubmit={handleSubmit}
              style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <div>
                <p className="section-label">Profile Settings</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.125rem", fontWeight: 800, color: "#0f172a" }}>
                  Edit Personal Details
                </h3>
              </div>

              {/* Row 1: name + email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: ".8125rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Full Name
                  </label>
                  <input className="profile-input" type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Enter your name" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".8125rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input className="profile-input" type="email" name="email" value={profile.email} onChange={handleChange} placeholder="name@example.com" />
                </div>
              </div>

              {/* Row 2: phone + company */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: ".8125rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Phone
                  </label>
                  <input className="profile-input" type="tel" name="phone" value={profile.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".8125rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Company
                  </label>
                  <input className="profile-input" type="text" name="company_name" value={profile.company_name} onChange={handleChange} placeholder="Your company" />
                </div>
              </div>

              {/* Row 3: location + password */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: ".8125rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    Location
                  </label>
                  <input className="profile-input" type="text" name="location" value={profile.location} onChange={handleChange} placeholder="City, Country" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".8125rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                    New Password
                  </label>
                  <input className="profile-input" type="password" name="password" value={profile.password} onChange={handleChange} placeholder="Leave blank to keep current" />
                </div>
              </div>

              {/* Profile completeness */}
              <div style={{ background: "#f8fafc", borderRadius: 14, padding: "14px 16px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: ".8125rem", fontWeight: 600, color: "#475569" }}>Profile Completeness</span>
                  <span style={{ fontSize: ".875rem", fontWeight: 800, color: "#0d9488" }}>{completeness}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${completeness}%` }} />
                </div>
                {completeness < 100 && (
                  <p style={{ margin: "8px 0 0", fontSize: ".75rem", color: "#94a3b8" }}>
                    Fill in company, location, and phone to complete your profile.
                  </p>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? (
                    <>
                      <span
                        style={{
                          width: 14, height: 14,
                          border: "2px solid rgba(255,255,255,.4)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "spin .7s linear infinite",
                          flexShrink: 0,
                        }}
                      />
                      Saving…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── STAT CARDS ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
          {[
            {
              cls: "stat-1",
              icon: "bi-shield-check",
              label: "Account Status",
              value: "Active",
              valueColor: "#059669",
              sub: profile.email_verified_at ? "Email verified" : "Email not verified",
            },
            {
              cls: "stat-2",
              icon: "bi-pencil-square",
              label: "Editable Fields",
              value: "6",
              sub: "Name · Email · Phone · Company · Location · Password",
            },
            {
              cls: "stat-3",
              icon: "bi-lightning-charge",
              label: "Quick Actions",
              isActions: true,
            },
          ].map((item) => (
            <div
              key={item.label}
              className={item.cls}
              style={{
                borderRadius: "1.25rem",
                border: "1px solid #e0f2fe",
                background: "#fff",
                padding: "1.25rem 1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,.05)",
                display: "flex",
                flexDirection: "column",
                gap: ".625rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: "#f0fdfa", border: "1px solid #99f6e4",
                    display: "grid", placeItems: "center",
                  }}
                >
                  <i className={`bi ${item.icon}`} style={{ color: "#0d9488", fontSize: ".875rem" }} />
                </span>
                <span style={{ fontSize: ".8125rem", fontWeight: 600, color: "#64748b" }}>{item.label}</span>
              </div>

              {item.isActions ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: 2 }}>
                  <Link
                    to="/DashboardView"
                    style={{
                      borderRadius: "99px", padding: "5px 14px",
                      fontSize: ".8125rem", fontWeight: 700,
                      color: "#0d9488", background: "#f0fdfa",
                      border: "1px solid #99f6e4",
                      textDecoration: "none", transition: "background .15s",
                    }}
                  >
                    Overview
                  </Link>
                  <Link
                    to="/DashboardView/tableview"
                    style={{
                      borderRadius: "99px", padding: "5px 14px",
                      fontSize: ".8125rem", fontWeight: 700,
                      color: "#0891b2", background: "#ecfeff",
                      border: "1px solid #a5f3fc",
                      textDecoration: "none", transition: "background .15s",
                    }}
                  >
                    Users
                  </Link>
                </div>
              ) : (
                <>
                  <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: item.valueColor || "#0f172a" }}>
                    {item.value}
                  </p>
                  <p style={{ margin: 0, fontSize: ".75rem", color: "#94a3b8" }}>{item.sub}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;