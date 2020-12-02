import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../shared/blog-post';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  private _posts$: Observable<BlogPost[]>;
  private _postsSub: Subscription;
  private BATCH_SIZE: number = 3;
  private _lastPost?: BlogPost;

  loading: boolean = true;
  finished: boolean = false;
  posts: BlogPost[] = [];

  constructor(private postService: PostService, private title: Title) {
    this._posts$ = new Observable<BlogPost[]>();
    this._postsSub = new Subscription();
  }

  ngOnInit(): void {
    this.title.setTitle("[DEMO] Maxim's Blog");
    this.getBlogPosts();
  }

  ngOnDestroy(): void {
    if (this._postsSub) this._postsSub.unsubscribe();
  }

  getBlogPosts(): void {
    this.loading = true;
    this._posts$ = this.postService.getPosts(this.BATCH_SIZE, this._lastPost);

    // Subscribe changes to posts in database
    if (this._postsSub) this._postsSub.unsubscribe(); // Unsubscribe the previous query subscriptions
    this._postsSub = this._posts$.subscribe( (posts) => {
      this.loading = false;
      this.finished = posts.length < this.BATCH_SIZE; // If the # of posts from query is less than the batch size, then there are no more posts after this.
      this._lastPost = posts[posts.length - 1];
      this.posts = this.posts.concat(posts); // Adds posts from newest query to the posts array
    });
  }
}
