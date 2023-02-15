import { TRoomUser } from "../types/room.types";
import { IMessage } from "./message.interfaces";

export interface IRoom {
  blackList: Array<string>,
  inviteList: Array<string>,
  name: string,
  _id: string,
  users: TRoomUser[],
  messages: IMessage[]
}