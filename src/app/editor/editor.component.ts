import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{

  editForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
      publish_post: false
    });
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

  previewPost() {
    // Render markdown to HTML and display in modal
  }

  saveChanges() {
    // write back to database
  }

}
