import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { BlogPost } from '../blog-post'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent)
  private _modal: ConfirmationModalComponent;

  private _doc: AngularFirestoreDocument;
  post: Observable<BlogPost>;

  canEdit: boolean = true;
  selectedId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
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

  showModal(id: string) {
    this._modal.selectedId = id;
    this._modal.show();
  }

  onDelete(id: string) {
    this._doc.delete();
  }

}
