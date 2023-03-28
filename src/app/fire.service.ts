import {Injectable} from "@angular/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


import * as secret from "../../secret.js";
import Transaction = firebase.firestore.Transaction;

@Injectable({
  providedIn: 'root'
})
export class FireService {
  mockDocument = {
    timestamp: new Date(),
    message: "hello world",
    someNumber: 42
  }
  app;
  firestore: firebase.firestore.Firestore;

  constructor() {
    this.app = firebase.initializeApp(secret.firebaseConfig)
    this.firestore = firebase.firestore();
  }

  async ex1() {
    return await this.firestore
      .collection('myCollection')
      .add(this.mockDocument); //auto generates an ID
    //Or call collection().doc('some id you assign youself').set(doc);
  }

  async ex2() {
    //Here I show several ways of taking data from a query
    const exercise2WithGet = await this.firestore
      .collection('myCollection')
      .get();
    console.log(exercise2WithGet.docs) //here's the actual data using .get()
    await this.firestore
      .collection('myCollection')
      .onSnapshot(snapshot => {
        console.log(snapshot.docs) //here's the actual data using snapshot
      });
    return exercise2WithGet;
  }

  async ex3() {
    return this.firestore
      .collection('myCollection')
      .doc('ID OF DOCUMENT HERE');
  }

  async ex4() {
    return this.firestore
      .collection('myCollection')
      .where('someNumber', '>', '12');
  }

  async ex5() {
    return this.firestore
      .collection('myCollection')
      .doc('ID OF DOCUMENT HERE')
      .collection('you dawg i heard you like collections')
      .doc('so I put a collection')
      .collection('Inside your collection')
      .doc('some ID');
  }

  async ex6() {
    return this.firestore
      .collection('myCollection')
      .where('someNumber', '>', '12')
      .orderBy('someNumber');
  }

  async ex7() {
    await this.firestore
      .collection('myCollection')
      .doc('some ID')
      .set({
        someNumber: 99
      });
  }

  async ex8() {
    return this.firestore
      .collection('myCollection')
      .doc('some ID')
      .set({
        someNewField: "hey"
      }); //yes, it's the same query as exercise 7
  }


  async ex9() {
    const someDocumentToDelete = (await (await this.ex1()).get()).id;
    this.firestore
      .collection('myCollection')
      .doc(someDocumentToDelete)
      .delete().then(async onSccessfullDelete => {
      await this.firestore.collection('myCollection')
        .doc(someDocumentToDelete)
        .set({
          data: "bla bla"
        });
    })
  }

  async ex10() {
    const docs = (await this.firestore
      .collection('myCollection')
      .where('timestamp', '<', new Date())
      .get()).docs;
    docs.forEach(doc => {
      this.firestore
        .collection('myCollection')
        .doc(doc.id)
        .delete()
    })
  }


  async ex11() {
    (await this.firestore
      .collection('myCollection')
      .get())
      .docChanges().forEach(change => {
      if (change.type == 'added') {
        //append
      } else if (change.type == 'removed') {
        //filter
      } else if (change.type == 'modified') {
        //edit doc
      }
    })  //The answer here is just to call docChanges(), and then choose what to do when douments change
  }


  async ex12() {
    const someDocToStartAfter = await this.firestore.collection('myCollection')
      .orderBy('timestamp').limit(1).get(); //this is just to find a document if there is any in firestore

    return this.firestore
      .collection('myCollection')
      .orderBy('timestamp')
      .startAfter((someDocToStartAfter.docs[0])//always pick document references to start after
      ).limit(20 //results per page
      );
  }

  async ex13() {
    return this.firestore
      .collectionGroup('myCollection')
      .where('someProp', '==', 'something');
    //this is going to ask you if you want an index(in the console), just accept the offer
  }




  async ex14() {
    return this.firestore.runTransaction(async (transaction) => {
      const someReference = (await (await this.ex3()).get()).ref;
      return transaction.get(someReference).then((document) => {
        if (!document.exists) {
          throw "Err";
        }
        transaction.update(someReference, {someProperty: "someValue"});
      });
    })
  }

  async ex15() {
    //See the video or combine the take-aways from other exercises into one big query
  }

  async ex16And17() {
    //have fun
  }

}
