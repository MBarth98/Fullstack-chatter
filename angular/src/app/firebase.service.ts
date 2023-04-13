import {Injectable} from "@angular/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export class User {
  id: string = "";
  name: string;
  email: string;
  friends: User[];

  constructor(name: string, email: string, friends: User[]) {
    this.name = name;
    this.email = email;
    this.friends = friends;
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBBg0j9feuQqU-PJ3N5zuI513Ea3KRwd5U",
  authDomain: "fullstack-easv.firebaseapp.com",
  databaseURL: "https://fullstack-easv-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fullstack-easv",
  storageBucket: "fullstack-easv.appspot.com",
  messagingSenderId: "70841133684",
  appId: "1:70841133684:web:fb2ed6e1e2761d01b4bf21",
  measurementId: "G-YB5ML0MX07"
};
@Injectable({
  providedIn: 'root'
})
export class FireService {
  app : firebase.app.App;
  firestore: firebase.firestore.Firestore;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.firestore = firebase.firestore();
  }

  async getUser(id: string) {
    let doc = await this.firestore.collection("users").doc(id).get();
    return doc;
  }

  async addUser(name: string, email: string) {
    await this.firestore.collection("users").doc().set({
      name: name,
      email: email,
      friends: []
    });
  }

  async findUserByEmail(email: string) {
    let users = await this.firestore.collection("users").where("email", "==", email).get();
    if (users.size == 0) {
      return null;
    }
    var user = users.docs[0].data() as User;
    user.id = users.docs[0].id;
    return user;
  }

  async addFriend(src_email: string, target_email: string) {
      var src = await this.findUserByEmail(src_email);
      var target = await this.findUserByEmail(target_email);

      if (src == null || target == null) {
        return;
      }

      src.friends.push(target);
      target.friends.push(src);
      await this.firestore.collection("users").doc(src.id).update({
        friends: src.friends.map((friend) => {
          return friend.id;
        })
      });

      await this.firestore.collection("users").doc(target.id).update({
        friends: target.friends.map((friend) => {
          return friend.id;
        })
      });
  }

  async getUsers() {
    let users = await this.firestore.collection("users").get();
    return users.docs.map((doc) => {
      var user = doc.data() as User;
      user.id = doc.id;
      return user;
    });
  }

  async getFriends(user: User) {
    var friends: User[] = [];
    user.friends.forEach(async element => {
      friends.push(await this.firestore.collection("users").doc(element.id).get().then((doc) => {
        return doc.data() as User;
      })); 
    });

    return friends;
  }


  async ex3() {

  }

  async ex4() {

  }

  async ex5() {

  }

  async ex6() {

  }

  async ex7() {

  }

  async ex8() {

  }


  async ex9() {

  }

  async ex10() {

  }


  async ex11() {

  }


  async ex12() {

  }

  async ex13() {
 
  }

  async ex14() {

  }

  async ex15() {

  }

  async ex16And17() {

  }

}