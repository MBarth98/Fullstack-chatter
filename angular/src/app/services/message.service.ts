import { Injectable } from '@angular/core';
import { Firebase, CollectionReference, ConversationConverter, FieldValue, MessageConverter } from '../helper/firebase.static';
import { Message } from '../types/Message';
import { Conversation } from '../types/Conversation';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  database_conversation: CollectionReference;
  database_message: CollectionReference;
  
  constructor() {
    this.database_conversation = Firebase.storage.collection("conversations");
    this.database_message = Firebase.storage.collection("messages");
  }
  
  async createConversation(conversation: Conversation) {
    return await this.database_conversation.add({}).then((doc) => {
      conversation.id = doc.id;
      this.database_conversation.doc(conversation.id).withConverter(new ConversationConverter).set(conversation, { merge: true });
      return conversation;
    });
  }
  
  async sendMessage(conversation_id: string, message: Message) {
    return await this.database_message.add({}).then((doc) => {
      message.id = doc.id;
      this.database_message.doc(message.id).withConverter(new MessageConverter).set(message, { merge: true });
      this.database_conversation.doc(conversation_id).update({
        messages: Firebase.union(Firebase.storage.doc("messages/" + message.id))
      });
      return message;
    });
  }
  
  async getConversation(conversation_id: string) {
    let query;
    query = this.database_conversation.doc(conversation_id);
    let conversations = await query.withConverter(new ConversationConverter(true)).get();
    return conversations.data();
  }
  
  async getConversations(user_id: string) {
    let user_ref = Firebase.storage.collection("users").doc(user_id);
    let query = this.database_conversation.where("members", "array-contains", user_ref);
    
    let conversations = await query.withConverter(new ConversationConverter()).get();
    return conversations.docs.map((doc) => doc.data());
  }
}

