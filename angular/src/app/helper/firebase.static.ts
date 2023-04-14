import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ConfigLoader } from "../types/FirebaseConfig";
import { User } from '../types/User';
import { Conversation } from '../types/Conversation';
import { Message } from '../types/Message';

export type DocumentReference = firebase.firestore.DocumentReference;
export type DocumentData = firebase.firestore.DocumentData;
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type CollectionReference = firebase.firestore.CollectionReference;
export type Query = firebase.firestore.Query;
export type DataConverter<T> = firebase.firestore.FirestoreDataConverter<T>;

export type FieldValue = firebase.firestore.FieldValue;

export class Firebase
{
    private static initialized: boolean = false;
    
    private static app : firebase.app.App;
    private static firestore: firebase.firestore.Firestore;

    static union(data: DocumentData) : FieldValue {
        if (!Firebase.initialized) {
            new Firebase();
        }

        return firebase.firestore.FieldValue.arrayUnion(data);
    }

    constructor() {
        if (!Firebase.initialized) {
            if (ConfigLoader.config == undefined) {
                ConfigLoader.loadConfig();
            }
            Firebase.app = firebase.initializeApp(ConfigLoader.config as object);
            Firebase.firestore = firebase.firestore();
            Firebase.initialized = true;
        }
    }

    public static get storage() {
        if (!Firebase.initialized) {
            new Firebase();
        }

        return Firebase.firestore;
    }

    public static get application() {
        if (!Firebase.initialized) {
            new Firebase();
        }

        return Firebase.app;
    }
}

export class MessageConverter implements DataConverter<Message>
{
    toFirestore(modelObject: Message): firebase.firestore.DocumentData
    {
        return {
            id: modelObject.id,
            message: modelObject.message,
            sender: Firebase.storage.doc("users/" + modelObject.sender.id),
            timestamp: firebase.firestore.Timestamp.fromDate(new Date(Date.now()))
        };
    }

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, options: firebase.firestore.SnapshotOptions): Message {
        let sender_ref = (snapshot.data() as any).sender as DocumentReference;
        let message = Message.create();
        message.id = snapshot.id;
        message.message = (snapshot.data() as any).message as string;
        sender_ref.withConverter(new UserConverter).get().then((doc) => {
            let user = doc.data();
            if (user != undefined)
            {
                message.sender = user;
            }
        });
        let timestamp = (snapshot.data() as any).timestamp as firebase.firestore.Timestamp;
        message.timestamp = new Date(timestamp.toMillis());
        return message;
    }
}

export class ConversationConverter implements DataConverter<Conversation>
{
    includeMessages: boolean = false;
    toFirestore(modelObject: Conversation): firebase.firestore.DocumentData
    {
        return {
            id: modelObject.id,
            name: modelObject.name,
            members: modelObject.members.map((member) => {
                return Firebase.storage.doc("users/" + member.id);
            }),
            messages: modelObject.messages.map((message) => {
                return Firebase.storage.doc("messages/" + message.id);
            })
        };
    }

    constructor(populate_messages = false) {
        this.includeMessages = populate_messages;
    }

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, options: firebase.firestore.SnapshotOptions): Conversation {
        let member_refs = (snapshot.data() as any).members as DocumentReference[];
        let message_refs = (snapshot.data() as any).messages as DocumentReference[];

        let conversation = Conversation.create();
        conversation.id = snapshot.id;
        conversation.name = (snapshot.data() as any).name;
        member_refs.forEach((member_ref) => {            
            member_ref.withConverter(new UserConverter(false)).get().then((member_snapshot) => {
                let data = member_snapshot.data();
                if (data !== undefined )
                {
                    conversation.members.push(data);
                }
            });
        });
        if (this.includeMessages)
        {
            // todo: implement message converter
            message_refs.forEach((message_ref) => {
                message_ref.withConverter(new MessageConverter).get().then((message_snapshot) => {
                    let data = message_snapshot.data();
                    if (data !== undefined)
                    {
                        conversation.messages.push(data);
                    }
                });
            });
        }
        return conversation;
    }
}

export class UserConverter implements DataConverter<User> 
{
    includeFriends: boolean = true;
    toFirestore(modelObject: User): firebase.firestore.DocumentData
    {
        return {
            name: modelObject.name,
            email: modelObject.email,
            friends: modelObject.friends.map((friend) => {
                return Firebase.storage.doc("users/" + friend.id);
            }
        )};
    }

    constructor(populate_friends = true) {
        this.includeFriends = populate_friends;
    }

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, options: firebase.firestore.SnapshotOptions): User {
        let friends = (snapshot.data() as any).friends as DocumentReference[];

        let user = User.create();
        user.id = snapshot.id;
        user.name = (snapshot.data() as any).name;
        user.email = (snapshot.data() as any).email;

        if (this.includeFriends) {
            friends.forEach((friend) => {
                friend.withConverter(new UserConverter(false)).get().then((doc) => {
                    let data = doc.data();
                    if (data !== undefined)
                    {
                        user.friends.push(data);
                    }
                });
            });
        }
        return user;
    }
} 