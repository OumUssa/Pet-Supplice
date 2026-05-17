const USERS_KEY = "petstore_users";

const defaultAdminUser = {
  id: "u-admin",
  name: "Admin User",
  email: "admin@petstore.com",
  password: "admin123",
  avatar: "",
  role: "admin",
};

const defaultUsers = [
  defaultAdminUser,
  {
    id: "u-1",
    name: "Demo User",
    email: "demo@petstore.com",
    password: "123456",
    avatar: "",
    role: "user",
  },
];

function safeParse(value, fallback) {
  try {
    return JSON.parse(value ?? "");
  } catch {
    return fallback;
  }
}

function readUsers() {
  const stored = safeParse(localStorage.getItem(USERS_KEY), null);

  if (Array.isArray(stored) && stored.length > 0) {
    const hasAdmin = stored.some(
      (user) =>
        (user.email || "").trim().toLowerCase() === defaultAdminUser.email,
    );

    if (hasAdmin) {
      return stored;
    }

    const restored = [defaultAdminUser, ...stored];
    writeUsers(restored);
    return restored;
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return [...defaultUsers];
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const userStore = {
  getUser: async () => {
    return readUsers();
  },

  createUser: async (user) => {
    const users = readUsers();
    const email = (user?.email || "").trim().toLowerCase();

    if (!email) {
      return null;
    }

    const exists = users.some((u) => u.email.toLowerCase() === email);
    if (exists) {
      return null;
    }

    const newUser = {
      id: `u-${Date.now()}`,
      name: user?.name || "",
      email,
      password: user?.password || "",
      avatar: user?.avatar || "",
      role: user?.role || "user",
    };

    const updated = [...users, newUser];
    writeUsers(updated);
    return [newUser];
  },

  resetPassword: async (email, newPassword) => {
    const users = readUsers();
    const targetEmail = (email || "").trim().toLowerCase();
    const index = users.findIndex((u) => u.email.toLowerCase() === targetEmail);

    if (index === -1) {
      return null;
    }

    users[index] = {
      ...users[index],
      password: newPassword,
    };

    writeUsers(users);
    return [users[index]];
  },

  updateUser: async (id, payload) => {
    const users = readUsers();
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    const nextName = (payload?.name || "").trim();
    const nextEmail = (payload?.email || "").trim().toLowerCase();
    const nextPassword = (payload?.password || "").trim();

    if (!nextName || !nextEmail || !nextPassword) {
      return null;
    }

    const duplicate = users.some(
      (user) => user.id !== id && user.email.toLowerCase() === nextEmail,
    );

    if (duplicate) {
      return null;
    }

    const updatedUser = {
      ...users[index],
      name: nextName,
      email: nextEmail,
      password: nextPassword,
      avatar: payload?.avatar ?? users[index].avatar ?? "",
      role: users[index].role || "user",
    };

    users[index] = updatedUser;
    writeUsers(users);
    return [updatedUser];
  },

  deleteUser: async (id) => {
    const users = readUsers();
    const updatedUsers = users.filter((user) => user.id !== id);

    if (updatedUsers.length === users.length) {
      return false;
    }

    writeUsers(updatedUsers);
    return true;
  },
};
