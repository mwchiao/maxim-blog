import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Output("post.delete") deletePost: EventEmitter<string> = new EventEmitter();

  visible: boolean = false;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  confirmDelete() {
    this.deletePost.emit("id");
    this.close();
  }

}
