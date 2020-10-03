import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent)
  private _modal: ConfirmationModalComponent;

  canEdit: boolean = true;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  showModal() {
    this._modal.show();
  }

  onDelete(id: string) {
    console.log("Deleting post: " + id);
  }

}
