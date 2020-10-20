import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from '../blog-post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  private _posts$: Observable<BlogPost[]>;
  private _postsSub: Subscription;
  loading: boolean = true;
  posts: BlogPost[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    // Maps collection to BlogPosts
    // TODO: Configure query so unpublished posts do not show by default
    this._posts$ = this.firestore.collection("posts", ref => ref.orderBy("date", "desc")).snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as BlogPost;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    this._postsSub = this._posts$.subscribe( (posts) => {
      this.loading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this._postsSub) this._postsSub.unsubscribe();
  }
}
