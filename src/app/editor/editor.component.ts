import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, Subscription } from 'rxjs'
import { BlogPost } from '../blog-post';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{

  editForm: FormGroup;
  selectedId: string;

  private _doc: AngularFirestoreDocument;
  private _subscription: Subscription;
  private _post$: Observable<BlogPost>;
  private _postData: BlogPost;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      short_description: ['', [
        Validators.required
      ]],
      body: ['', [
        Validators.required
      ]],
      published: false
    });

    this.selectedId = this.route.snapshot.paramMap.get("id");

    if (this.selectedId != "new") { // Not a new post
      this._loadData();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe if the subscription exists
    if (this._subscription) this._subscription.unsubscribe();
  }

  get title() {
    return this.editForm.get("title");
  }

  get short_description() {
    return this.editForm.get("short_description");
  }

  get body() {
    return this.editForm.get("body");
  }

  get publish_post() {
    return this.editForm.get("publish_post");
  }

  private _loadData() {
    // Grab existing data from db
    // if post is not in database redirect to new post screen
    this._doc = this.firestore.doc("posts/" + this.selectedId);
    this._post$ = this._doc.snapshotChanges().pipe(map(actions => {
      const data = actions.payload.data() as BlogPost;
      const id = actions.payload.id;
      return { id, ...data };
    }));

    // if document does not exist, show an error and redirect

    this._subscription = this._post$.subscribe( data => {
      this.editForm.patchValue({
        title: data.title,
        short_description: data.short_description,
        body: data.body,
        published: data.published
      });
      this._postData = data;
    });
  }

  previewPost() {
    // Render markdown to HTML and display in modal
  }

  saveChanges() {
    // write back to database
    let post = this.editForm.value as BlogPost;
    if (this.selectedId == 'new' && this.editForm.valid) {
      // Write new post to database
      if (post.published) post.date = new Date(); // Add current time

      this.firestore.collection<BlogPost>("posts").add(post);
    }
    else {
      // Update existing
      
      // Posts that are saved but not published do not have a date field assigned. The field is set upon publication. If a post is unpublished and republished, the initial publish date is used
      if (this._postData.date) post.date = this._postData.date;
      else post.date = new Date(); // Saved draft now marked as public.
      this._doc.update(post);
    }

    this.router.navigate([""]);
  }
}
