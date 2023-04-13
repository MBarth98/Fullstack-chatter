import { Injectable} from "@angular/core";
import { User } from "../types/User";
import { Firebase } from "../helper/firebase.static";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  database; // firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    this.database = Firebase.storage.collection("users");
  }
  
  async addUser(name: string, email: string) {
    await this.database.doc().set({
      name: name,
      email: email,
      friends: []
    });
  }

  async getUser(email: string) {
    let users = await this.database.where("email", "==", email).get();
    if (users.size == 0) {
      return null;
    }
    var user = users.docs[0].data() as User;
    user.id = users.docs[0].id;
    return user;
  }

  async addFriend(src_email: string, target_email: string) {
      var src = await this.getUser(src_email);
      var target = await this.getUser(target_email);

      if (src == null || target == null) {
        return;
      }

      src.friends.push(target);
      target.friends.push(src);
      await this.database.doc(src.id).update({
        friends: src.friends.map((friend) => {
          return friend.id;
        })
      });

      await this.database.doc(target.id).update({
        friends: target.friends.map((friend) => {
          return friend.id;
        })
      });
  }

  async getUsers() {
    let users = await this.database.get();
    return users.docs.map((doc) => {
      var user = doc.data() as User;
      user.id = doc.id;
      return user;
    });
  }

  async getFriends(user: User) {
    var friends: User[] = [];
    user.friends.forEach(async element => {
      friends.push(await this.database.doc(element.id).get().then((doc) => {
        var user = doc.data() as User;
        user.id = doc.id;
        return user;
      })); 
    });

    return friends;
  }

}