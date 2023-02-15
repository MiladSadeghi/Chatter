export interface IMessage {
  _id: string,
  message: string,
  sender: string,
  roomID: string,
  createdAt: Date,
  updateAt: Date
}