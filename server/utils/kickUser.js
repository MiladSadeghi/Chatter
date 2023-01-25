const kickUser = async (room, userId) => {
  room.users.filter(user => user.userId !== userId);
  room.save((err) => {
    if (err) return false;
    return true;
  });
}

export default kickUser;