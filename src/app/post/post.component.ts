import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPost } from '../shared/blog-post';
import { PostService } from '../shared/services/post.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {  
  private _doc: AngularFirestoreDocument;
  private _post: BlogPost;
  private _postSub: Subscription;
  
  selectedId: string;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title,
    private toast: ToastService,
    private posts: PostService
  ) { }

  ngOnInit(): void {
    this._post = new BlogPost();

    this.selectedId = this.route.snapshot.paramMap.get("id");

    this._postSub = this.posts.getPost(this.selectedId, post => {
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
    this._postSub.unsubscribe();
  }

  get post(): BlogPost {
    return this._post;
  }

}
