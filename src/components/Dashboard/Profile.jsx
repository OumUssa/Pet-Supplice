import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../../store/RegisterStore";
import { useToast } from "../Base/BaseToast";

const emptyProfile = {
  name: "",
  email: "",
  password: "",
  avatar: "",
};

const Profile = () => {
  const { showSuccess, showError } = useToast();
  const [profile, setProfile] = useState(emptyProfile);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const initials = useMemo(() => {
    const name = profile.name.trim();
    if (!name) return "U";

    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [profile.name]);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const loggedId = localStorage.getItem("tokenPet");
        setUserId(loggedId || "");

        const users = (await userStore.getUser()) || [];
        const currentUser = users.find((user) => user.id === loggedId);

        if (!currentUser) {
          setProfile(emptyProfile);
          return;
        }

        setProfile({
          name: currentUser.name || "",
          email: currentUser.email || "",
          password: currentUser.password || "",
          avatar: currentUser.avatar || "",
        });
      } catch (error) {
        console.error(error);
        showError("Failed to load profile.");
      } finally {
        setLoading(false);
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
      console.error(error);
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

    if (!userId || !nextName || !nextEmail || !nextPassword) {
      showError("Please fill in all profile fields.");
      return;
    }

    if (!nextEmail.includes("@")) {
      showError("Please enter a valid email address.");
      return;
    }

    setSaving(true);
    try {
      const updated = await userStore.updateUser(userId, {
        name: nextName,
        email: nextEmail,
        password: nextPassword,
        avatar: profile.avatar,
      });

      if (!updated) {
        showError("Could not update your profile.");
        return;
      }

      showSuccess("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      showError("Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-cyan-100 bg-linear-to-br from-white via-cyan-50/50 to-teal-50 shadow-sm">
        <div className="grid gap-6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-7">
          <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <div className="grid h-20 w-20 overflow-hidden rounded-3xl border border-cyan-100 bg-teal-600 text-2xl font-black text-white shadow-md shadow-teal-600/20">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name || "Profile avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center bg-linear-to-br from-teal-600 to-cyan-500">
                      {initials}
                    </span>
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-cyan-100 bg-white text-cyan-700 shadow-sm transition hover:bg-cyan-50">
                  <i
                    className={`bi ${avatarLoading ? "bi-hourglass-split" : "bi-camera-fill"} text-sm`}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-teal-700">
                  Your Profile
                </p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  {profile.name || "User Profile"}
                </h2>
                <p className="text-sm text-slate-500">{profile.email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Account ID
                </p>
                <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                  {userId || "-"}
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-700">
                  Active
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50">
                <i className="bi bi-trash3" />
                Remove Avatar
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50">
                <i
                  className={`bi ${avatarLoading ? "bi-hourglass-split" : "bi-upload"}`}
                />
                {avatarLoading ? "Uploading..." : "Upload New Avatar"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
              Keep your profile details up to date so your account stays easy to
              manage from the dashboard.
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.18em] text-teal-700">
                Profile Settings
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                Edit Personal Details
              </h3>
            </div>

            <div className="space-y-4 text-slate-700">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cyan-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cyan-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-cyan-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  placeholder="Enter a new password"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Avatar Preview
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-slate-50 p-3">
                  <div className="grid h-14 w-14 overflow-hidden rounded-2xl bg-teal-600 text-lg font-black text-white">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="Avatar preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="grid h-full w-full place-items-center bg-linear-to-br from-teal-600 to-cyan-500">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {profile.avatar
                        ? "Custom avatar selected"
                        : "Initials avatar"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Use the camera button to upload a photo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-cyan-100 pt-5">
              <p className="text-sm text-slate-500">
                Clean, private profile editing for the signed-in user.
              </p>
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition ${
                  saving
                    ? "cursor-not-allowed bg-teal-400"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}>
                <i className="bi bi-check2-circle" />
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Profile Completeness</p>
          <p className="mt-1 text-3xl font-black text-slate-900">100%</p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Editable Fields</p>
          <p className="mt-1 text-3xl font-black text-slate-900">3</p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Quick Actions</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              to="/DashboardView"
              className="rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100">
              Overview
            </Link>
            <Link
              to="/DashboardView/tableview"
              className="rounded-full bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100">
              Users
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
