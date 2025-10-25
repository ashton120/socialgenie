const users = new Map();

function getUser(userId) {
  if (!users.has(userId)) {
    users.set(userId, { id: userId, usage: 0, isPremium: false });
  }
  return users.get(userId);
}

function incrementUsage(userId) {
  const user = getUser(userId);
  user.usage += 1;
  return user;
}

module.exports = { getUser, incrementUsage };