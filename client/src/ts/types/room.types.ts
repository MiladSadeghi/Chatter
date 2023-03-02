export type TRoomUser = {
  userId: string,
  role: "1769" | "2561" | "7610",
  userName: string
}

export type TRoomInviteList = {
  _id: string,
  name: string
}

export type TRoomSearchUser = {
  _id: string,
  userName: string
}

export type TRoomBlackList = TRoomInviteList;
