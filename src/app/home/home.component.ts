import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { BlogPost } from '../blog-post'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent)
  private _modal: ConfirmationModalComponent;

  canEdit: boolean = true;

  posts: Observable<BlogPost[]>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    // Maps collection to BlogPosts
    // TODO: Configure query so unpublished posts do not show by default
    this.posts = this.firestore.collection("posts", ref => ref.orderBy("date", "desc")).snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as BlogPost;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  showModal(id: string) {
    this._modal.selectedId = id;
    this._modal.show();
  }

  onDelete(id: string) {
    this.firestore.doc("posts/" + id).delete();
  }
}
