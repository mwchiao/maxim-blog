import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent)
  private _modal: ConfirmationModalComponent;

  canEdit: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showModal() {
    this._modal.show();
  }

  onDelete(id: string) {
    console.log(id);
  }

}
