export interface IMessage {
  _id: string,
  message: string,
  senderID: string,
  senderName: string,
  roomID: string,
  createdAt: Date,
  updateAt: Date,
}