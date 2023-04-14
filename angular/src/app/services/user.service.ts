import { Injectable} from "@angular/core";
import { User } from "../types/User";
import { CollectionReference, Firebase, UserConverter } from "../helper/firebase.static";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  database : CollectionReference;

  constructor() {
    this.database = Firebase.storage.collection("users");
  }
  
  async addUser(name: string, email: string) {
    await this.database.doc().withConverter(new UserConverter).set(new User(name, email, []));
  }

  async getUser(email: string) {
    let users = await this.database.where("email", "==", email).withConverter(new UserConverter).get();
    if (users.size == 0) {
      return null;
    }
    return users.docs[0].data();
  }

  async addFriend(src_email: string, target_email: string) {
      var src = await this.getUser(src_email);
      var target = await this.getUser(target_email);

      if (src == null || target == null) {
        return;
      }

      src.friends.push(target);
      target.friends.push(src);

      this.database.doc(src.id).withConverter(new UserConverter).set(src, {merge: true});
      this.database.doc(target.id).withConverter(new UserConverter).set(target, {merge: true});
  }

  async getUsers() {
    let users = await this.database.withConverter(new UserConverter).get();
    return users.docs.map((doc) => doc.data());
  }
}