import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
  room?: string;
  to?: string;
  from: string;
  content: string;
  timestamp: number;
}

const MessageSchema = new Schema<IMessage>({
  room: { type: String, required: false },
  to: { type: String, required: false },
  from: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Number, default: Date.now },
});

export const Message = model<IMessage>('Message', MessageSchema);