import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from '../blog-post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _dateOrder: firebase.firestore.OrderByDirection = "desc";

  constructor(private firestore: AngularFirestore) { }

  // Gets blog post using id
  getPost(id: string, callback: (value: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => void): Subscription {
    const doc = this.firestore.doc("posts/" + id);
    const subscription = doc.get().subscribe(callback);
    
    return subscription;
  }

  getPostsBatch(batchSize: number, after?: BlogPost): Observable<BlogPost[]> {
    const collection = this.firestore.collection("posts", ref => {
      if (after) return ref.orderBy("date", this._dateOrder).limit(batchSize).startAfter(after["date"]);
      return ref.orderBy("date", this._dateOrder).limit(batchSize);
    });
    
    return collection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as BlogPost;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  setDirection(direction: firebase.firestore.OrderByDirection) {
    this._dateOrder = direction;
  }
}
