import { Injectable } from '@angular/core';
import { Firebase, CollectionReference, ConversationConverter, MessageConverter } from '../helper/firebase.static';
import { Message } from '../types/Message';
import { Conversation } from '../types/Conversation';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    database_conversation: CollectionReference;
    
    constructor() {
        this.database_conversation = Firebase.storage.collection("conversations");
    }
    
    async createConversation(conversation: Conversation) {
        return await this.database_conversation.add({}).then((doc) => {
            conversation.id = doc.id;
            let query = this.database_conversation.doc(conversation.id);
            query.withConverter(new ConversationConverter).set(conversation, { merge: true });
            return conversation;
        });
    }
    
    async sendMessage(conversation_id: string, message: Message) {
        let message_collection = this.database_conversation.doc(conversation_id).collection("messages");
        
        return await message_collection.add({}).then((doc) => {
            message.id = doc.id;
            message_collection.doc(doc.id).withConverter(new MessageConverter).set(message, { merge: true });
        });
    }
    
    async getMessagesBetween(conversation_id: string, after: Date | null = null, before: Date | null = null, limit: number = 50) {
        let query = this.database_conversation.doc(conversation_id).collection("messages");
        if (after != null) query.where("timestamp", ">", after);
        if (before != null) query.where("timestamp", "<", before);
        query.orderBy("timestamp", "asc").limitToLast(limit);
        let messages = await query.withConverter(new MessageConverter).get();
        return messages.docs.map((doc) => doc.data());
    }
    
    async getMessagesAfter(conversation_id: string, after: Message, limit: number = 50) {
        let query = this.database_conversation.doc(conversation_id).collection("messages");
        query.where("timestamp", ">", after.timestamp);
        query.orderBy("timestamp", "asc").limitToLast(limit);
        let messages = await query.withConverter(new MessageConverter).get();
        return messages.docs.map((doc) => doc.data());
    }
    
    async getMessagesRecent(conversation_id: string, limit: number = 50) {
        let query = this.database_conversation.doc(conversation_id).collection("messages");
        query.orderBy("timestamp", "asc").limitToLast(limit);
        let messages = await query.withConverter(new MessageConverter).get();
        return messages.docs.map((doc) => doc.data());
    }
    
    async getConversation(conversation_id: string) {
        let query = this.database_conversation.doc(conversation_id);
        let result = query.withConverter(new ConversationConverter).get();
        
        return await result.then((doc) => {
            let data = doc.data();
            this.getMessagesRecent(conversation_id).then((messages) => {
                data!.messages = messages.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);});
                return data;
            }
        );
    };
        
    async getConversations(user_id: string) {
        let user_ref = Firebase.storage.collection("users").doc(user_id);
        let query = this.database_conversation.where("members", "array-contains", user_ref);
        
        let conversations = await query.withConverter(new ConversationConverter).get();
        return conversations.docs.map((doc) => doc.data());
    }
}
    
    