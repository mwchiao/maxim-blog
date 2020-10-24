import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPost } from '../blog-post';
import { ToastService } from '../toast.service';

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
    private firestore: AngularFirestore,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this._post = {
      title: "", 
      short_description: "", 
      body: "", 
      published: true,
      date: null,
      categories: null
    };

    this.selectedId = this.route.snapshot.paramMap.get("id");

    // Gets selected blog post
    this._doc = this.firestore.doc("posts/" + this.selectedId);

    // Maps to BlogPost
    this._postSub = this._doc.get().subscribe( post => {
      if (post.exists) this._post = post.data() as BlogPost;
      else {
        this.router.navigate(["/404"]);
        this.toast.displayMessage("Post not found", "error");
      };
      this.loading = false;
      this.title.setTitle(this._post.title + " | Maxim's Blog");
    });
  }

  ngOnDestroy(): void {
    this._postSub.unsubscribe();
  }

  get post(): BlogPost {
    return this._post;
  }

}
