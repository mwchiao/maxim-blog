import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BlogPost } from '../blog-post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _dateOrder: firebase.firestore.OrderByDirection = "desc";

  constructor(private firestore: AngularFirestore) { }

  // Gets blog post using id
  getPost(id: string): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.firestore.doc("posts/" + id).get();
  }

  // Get mulitple posts
  getPosts(batchSize: number, after?: BlogPost): Observable<BlogPost[]> {
    const collection = this.firestore.collection<BlogPost>("posts", ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.orderBy("date", this._dateOrder);
      if (batchSize) query = query.limit(batchSize);
      if (after) query = query.startAfter(after["date"]);
      return query;
    });
    return collection.valueChanges({idField: "id"});
  }

  // Get all posts with tag
  getPostsWithTag(tag: string): Observable<BlogPost[]> {
    const collection = this.firestore.collection<BlogPost>("posts", ref => {
      return ref.orderBy("date", this._dateOrder)
                .where("categories", "array-contains-any", [tag]);
    });

    return collection.valueChanges({idField: "id"});
  }
}
