const kickUser = async (room, userId) => {
  room.users.filter(user => user.userId !== userId);
  let isSave = false;
  room.save((err) => {
    if (err) isSave = false;;
    isSave = true;
  });
  return isSave
}

export default kickUser;