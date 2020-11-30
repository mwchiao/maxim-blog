import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../shared/blog-post';
import { PostService } from '../shared/services/post.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  private _post$: Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>;
  private _postSub: Subscription;
  private _post: BlogPost = new BlogPost();
  
  private _selectedId: string = "";
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title,
    private toast: ToastService,
    private posts: PostService
  ) {
    this._post$ = new Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>();
    this._postSub = new Subscription();
  }

  ngOnInit(): void {
    this._selectedId = this.route.snapshot.paramMap.get("id") || "";
    this._post$ = this.posts.getPost(this._selectedId);
    this._post$.subscribe(post => {
      if (post.exists) {
        this._post = post.data() as BlogPost;
        this.title.setTitle(this._post.title + " | Maxim's Blog");
      }
      else {
        this.router.navigate(["/404"]);
        this.toast.displayMessage("Post not found", "error");
      };
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this._postSub) this._postSub.unsubscribe();
  }

  get post(): BlogPost {
    return this._post;
  }

}
