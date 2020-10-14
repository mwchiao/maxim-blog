import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Subscription } from 'rxjs'
import { BlogPost } from '../blog-post';

@Component({
  selector: 'app-edit',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{
  private _doc: AngularFirestoreDocument;
  private _subscription: Subscription;
  private _postData: BlogPost;
  private _paramsSub: Subscription;

  hidePreview: boolean = true;
  editForm: FormGroup;
  selectedId: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      short_description: ['', [Validators.required]],
      body: ['', [Validators.required]],
      published: false
    });

    this.selectedId = this.route.snapshot.paramMap.get("id");
    // Listens for param changes. This is important when it goes from editing a post to new post
    this._paramsSub = this.route.params.subscribe( params => {
      this.selectedId = params.id;
      if (this.selectedId != "new") this._loadData(); // Not a new post
      else this.editForm.reset(); // Reset form if it is a new post
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe if the subscription exists
    if (this._subscription) this._subscription.unsubscribe();
    if (this._paramsSub) this._paramsSub.unsubscribe();
  }

  get title(): AbstractControl {
    return this.editForm.get("title");
  }

  get short_description(): AbstractControl {
    return this.editForm.get("short_description");
  }

  get body(): AbstractControl {
    return this.editForm.get("body");
  }

  get published(): AbstractControl {
    return this.editForm.get("published");
  }

  private _loadData(): void {
    // Grab existing data from db
    // if post is not in database redirect to new post screen
    this._doc = this.firestore.doc("posts/" + this.selectedId);

    this._subscription = this._doc.get().subscribe( post => {
      if (post.exists) {
        this._postData = post.data() as BlogPost;

        // Autofill form with existing data
        this.editForm.patchValue({
          title: this._postData.title,
          short_description: this._postData.short_description,
          body: this._postData.body,
          published: this._postData.published
        });
      }
      else alert("post does not exists");
    });
  }

  previewPost(): void {
    this.hidePreview = !this.hidePreview;
  }

  saveChanges(): void {
    // write back to database
    let post = this.editForm.value as BlogPost;
    if (this.selectedId == 'new' && this.editForm.valid) {
      // Write new post to database
      post.date = post.published ? new Date() : null;

      this.firestore.collection<BlogPost>("posts").add(post).then( doc => {
        this.selectedId = doc.id;
        this.router.navigate(["/post", this.selectedId]);
      });
    }
    else {
      // Update existing
      // Posts that are saved but not published do not have a date field assigned. The field is set upon publication. If a post is unpublished and republished, the initial publish date is used
      if (this._postData.date) post.date = this._postData.date;
      else post.date = new Date(); // Saved draft now marked as public.
      this._doc.update(post).then(() => {
        this.router.navigate(["/post", this.selectedId]);
      });
    }
  }
}
