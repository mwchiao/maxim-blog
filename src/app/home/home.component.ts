import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
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
  private _dateOrder: firebase.firestore.OrderByDirection = "desc";
  private _descDates: boolean = true;
  loading: boolean = true;
  posts: BlogPost[] = [];

  constructor(private firestore: AngularFirestore, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Maxim's Blog");

    this.getBlogPosts();
  }

  ngOnDestroy(): void {
    if (this._postsSub) this._postsSub.unsubscribe();
  }

  private getBlogPosts(): void {
    // Maps collection to BlogPosts
    this._posts$ = this.firestore.collection("posts", ref => ref.orderBy("date", this._dateOrder)).snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as BlogPost;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));

    // Subscribe changes to posts in database
    this._postsSub = this._posts$.subscribe( (posts) => {
      this.loading = false;
      this.posts = posts;
    });
  }

  setDateOrder(descDates: boolean): void {
    this._descDates = descDates;
    if (this._descDates) this._dateOrder = "desc" as firebase.firestore.OrderByDirection;
    else this._dateOrder = "asc" as firebase.firestore.OrderByDirection;

    // Maybe I should reorder my posts client-side
    this.getBlogPosts();
  }

  get descDates(): boolean {
    return this._descDates;
  }
}
