import { Injectable } from '@angular/core';
import { DocumentReference, Firebase, CollectionReference, ConversationConverter } from '../helper/firebase.static';

import { Message } from '../types/Message';
import { Conversation } from '../types/Conversation';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  database: CollectionReference;

  constructor() {
    this.database = Firebase.storage.collection("conversations");
  }

  async createConversation(conversation: Conversation) {
    return await this.database.add({}).then((doc) => {
      conversation.id = doc.id;
      this.database.doc(conversation.id).withConverter(new ConversationConverter).set(conversation, { merge: true });
      return conversation;
    });
  }

  async sendMessage(conversation_id: string, message: Message) {

    // add message to storage
    // add message reference to conversation

    await this.database.doc(conversation_id).collection("messages").doc(message.id).set({
      message: message.message,
      sender: message.sender,
      timestamp: message.timestamp
    });
  }

  async getConversation(conversation_id: string) {
    let query;
    query = this.database.doc(conversation_id);
    query.withConverter(new ConversationConverter(true));
    return (await query.get()).data() as Conversation;
  }

  async getConversations(user_id: string) {
    let user_ref = Firebase.storage.collection("users").doc(user_id);
    let query = this.database.where("members", "array-contains", user_ref);

    let conversations = await query.withConverter(new ConversationConverter()).get();
    return conversations.docs.map((doc) => doc.data());
  }
}

