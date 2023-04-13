import { Injectable } from '@angular/core';
import { Firebase } from '../helper/firebase.static';

import { Message } from '../types/Message';
import { Conversation } from '../types/Conversation';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  database;

  constructor() {
    this.database = Firebase.storage.collection("conversations");
  }

  async createConversation(conversation: Conversation) {
    await this.database.doc(conversation.id).set({
      name: conversation.name,
      members: conversation.members
    });
  }

  async sendMessage(conversation_id: string, message: Message) {
    await this.database.doc(conversation_id).collection("messages").doc(message.id).set({
      message: message.message,
      sender: message.sender,
      timestamp: message.timestamp
    });
  }
  
  async getMessages(conversation_id: string) {
    let messages = await this.database.doc(conversation_id).collection("messages").get();
    let result : Message[] = [];
    messages.forEach((message) => {
      let data = message.data() as Message;
      data.id = message.id;
      result.push(data);
    });
    return result;
  }

  async getConversation(conversation_id: string) {
    let conversation = await this.database.doc(conversation_id).get();
    let data = conversation.data() as Conversation;
    data.id = conversation.id;
    return data;
  }

  async getConversations(user_id: string) {
    let conversations = await this.database.where("members", "array-contains", user_id).get();
    let result : Conversation[] = [];
    conversations.forEach((conversation) => {
      let data = conversation.data() as Conversation;
      data.id = conversation.id;
      result.push(data);
    });
    return result;
  }
}
