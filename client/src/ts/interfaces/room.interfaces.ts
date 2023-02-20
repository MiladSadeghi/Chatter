import { TRoomBlackList, TRoomInviteList, TRoomUser } from "../types/room.types";
import { IMessage } from "./message.interfaces";

export interface IRoom {
  blackList: TRoomBlackList[],
  inviteList: TRoomInviteList[],
  name: string,
  _id: string,
  users: TRoomUser[],
  messages: IMessage[]
}