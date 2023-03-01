import { TRoomInviteList } from "../types/room.types";
import { IRoom } from "./room.interfaces";

export interface IUser {
  rooms: IRoom[],
  inviteList: TRoomInviteList[],
  selectedRoomID: null | string,
  directoryIsOpen: Boolean,
  userName: string | null,
  userID: string | null,
  isCreateRoomModalShow: Boolean
}