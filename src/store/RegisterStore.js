const USERS_KEY = "petstore_users";

const defaultUsers = [
  {
    id: "u-1",
    name: "Demo User",
    email: "demo@petstore.com",
    password: "123456",
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
    return stored;
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
};
