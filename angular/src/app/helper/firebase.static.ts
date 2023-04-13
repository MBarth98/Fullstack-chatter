import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ConfigLoader } from "../types/FirebaseConfig";

export class Firebase
{
    private static initialized: boolean = false;

    private static app : firebase.app.App;
    private static firestore: firebase.firestore.Firestore;
    
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