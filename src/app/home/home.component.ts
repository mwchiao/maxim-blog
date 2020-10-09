import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { BlogPost } from '../blog-post';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(ConfirmationModalComponent)
  private _modal: ConfirmationModalComponent;

  private _sub: Subscription;

  canEdit: boolean;

  posts: Observable<BlogPost[]>;

  constructor(private firestore: AngularFirestore, private auth: AuthService) { }

  ngOnInit(): void {
    this._sub = this.auth.loginEmitter.subscribe( value =>  this.canEdit = value);

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

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  showModal(id: string) {
    this._modal.selectedId = id;
    this._modal.show();
  }

  onDelete(id: string) {
    this.firestore.doc("posts/" + id).delete();
  }
}
