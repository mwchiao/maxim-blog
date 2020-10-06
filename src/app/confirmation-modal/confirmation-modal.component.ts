import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Output("post.delete") emitter: EventEmitter<string> = new EventEmitter();

  visible: boolean = false;
  selectedId: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  confirmDelete() {
    this.emitter.emit(this.selectedId);
    this.router.navigate([""])
    this.close();
  }
}
