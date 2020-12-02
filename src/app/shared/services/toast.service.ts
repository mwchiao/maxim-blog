import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class ToastMessage {
  content: string;
  style: string;
  dismissed: boolean = false;

  constructor(content: string, style?: string) {
    this.content = content;
    this.style = style || 'success';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  readonly messagesEmitter: Subject<ToastMessage> = new Subject();

  constructor() { }

  displayMessage(content: string, style?: string): void {
    const message = new ToastMessage(content, style);
    this.messagesEmitter.next(message);
  }
}
