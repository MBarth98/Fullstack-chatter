
export interface FirebaseConfig
{
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

export class ConfigLoader
{
    static config: FirebaseConfig | undefined = undefined;
    
    static loadConfig()
    {
        this.config = 
        {
            apiKey: "AIzaSyBBg0j9feuQqU-PJ3N5zuI513Ea3KRwd5U",
            authDomain: "fullstack-easv.firebaseapp.com",
            databaseURL: "https://fullstack-easv-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "fullstack-easv",
            storageBucket: "fullstack-easv.appspot.com",
            messagingSenderId: "70841133684",
            appId: "1:70841133684:web:fb2ed6e1e2761d01b4bf21",
            measurementId: "G-YB5ML0MX07"
        };
    }
}