import { TUserInviteList } from "../types/user.types";
import { IMessage } from "./message.interfaces";
import { IRoom } from "./room.interfaces";

export interface IUser {
  rooms: IRoom[],
  inviteList: TUserInviteList[],
  selectedRoomID: null | string,
  directoryIsOpen: Boolean,
  userName: string | null,
  userID: string | null,
  isCreateRoomModalShow: Boolean,
  messages: IMessage[],
}