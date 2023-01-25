import RoomModel from "../model/roomModel.js";

const isOwner = (params) => {
  return async (req, res, next) => {
    const { body, userID } = req;
    switch (params) {
      case "delete":
        if (!body.roomID || !userID) return res.status(406).json({ status: "error", message: "something missed!" })
        break;
      case "edit-room-name":
        if (!body.roomID || !body.newRoomName || !userID) return res.status(406).json({ status: "error", message: "something missed!" })
        break;
    }
    const room = await RoomModel.findById({ _id: body.roomID });

    if (!room) return res.status(404).json({ status: "error", message: "not found!" });
    let isUserOwner = false;
    room.users.forEach(user => {
      if (user.role === "1769" && userID === user.userId) {
        isUserOwner = true;
      }
    })
    if (!isUserOwner) return res.status(403).json({ status: "error", message: "you are not the owner." })
    req.room = room;
    next();
  }
}

const isModerator = (params) => {
  return async (req, res, next) => {
    const { body, userID } = req;

    switch (params) {
      case "invite-list":
        if (!body.invitedUserId || !userID || !body.roomID) return res.status(406).json({ status: "error", message: "something missed!" })
        break;
      case "black-list":
        if (!body.bannedUserId || !userID || !body.roomID) return res.status(406).json({ status: "error", message: "something missed!" })
        break;
    }

    const room = await RoomModel.findById({ _id: body.roomID });

    if (!room) return res.status(404).json({ status: "error", message: "not found!" });
    let isUserModerator = false;
    room.users.forEach(user => {
      if ((user.role === "1769" || user.role === "2561") && userID === user.userId) {
        isUserModerator = true;
      }
    })
    if (!isUserModerator) return res.status(403).json({ status: "error", message: "you are not the owner." });
    req.room = room;
    next();
  }
}

export { isOwner, isModerator };