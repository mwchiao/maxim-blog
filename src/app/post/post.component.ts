import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { BlogPost } from '../blog-post'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @ViewChild(ConfirmationModalComponent)
  private _modal: ConfirmationModalComponent;

  private _doc: AngularFirestoreDocument;
  post: Observable<BlogPost>;

  canEdit: boolean = true;
  selectedId: string;

  private _sub: Subscription;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private auth: AuthService) { }

  ngOnInit(): void {
    this._sub = this.auth.loginEmitter.subscribe( value => this.canEdit = value);

    this.selectedId = this.route.snapshot.paramMap.get("id");

    // Gets document
    this._doc = this.firestore.doc("posts/" + this.selectedId);

    // Maps to BlogPost
    this.post = this._doc.snapshotChanges().pipe(map( actions => {
      const data = actions.payload.data() as BlogPost;
      const id = actions.payload.id;
      return { id, ...data };
    }));
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  showModal(id: string): void {
    this._modal.selectedId = id;
    this._modal.show();
  }

  onDelete(id: string): void {
    this._doc.delete();
  }

}
