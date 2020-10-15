import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { BlogPost } from '../blog-post';
import { UserService } from '../user.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @ViewChild(ConfirmationModalComponent)
  private _modal: ConfirmationModalComponent;
  
  private _doc: AngularFirestoreDocument;
  private _post: BlogPost = {title: "", short_description: "", body: "", published: false, date: null};
  private _loginSub: Subscription;
  private _postSub: Subscription;

  canEdit: boolean = true;
  selectedId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private auth: UserService, private toast: ToastService) { }

  ngOnInit(): void {
    this._loginSub = this.auth.loginEmitter.subscribe( value => this.canEdit = value);

    this.selectedId = this.route.snapshot.paramMap.get("id");

    // Gets selected blog post
    this._doc = this.firestore.doc("posts/" + this.selectedId);

    // Maps to BlogPost
    this._postSub = this._doc.get().subscribe( post => {
      if (post.exists) this._post = post.data() as BlogPost;
      else this.toast.displayMessage("Post not found", "error");
    });
  }

  ngOnDestroy(): void {
    this._loginSub.unsubscribe();
    this._postSub.unsubscribe();
  }

  showModal(id: string): void {
    this._modal.selectedId = id;
    this._modal.show();
  }

  onDelete(id: string): void {
    this._doc.delete();
  }

  get post(): BlogPost {
    return this._post;
  }

}
