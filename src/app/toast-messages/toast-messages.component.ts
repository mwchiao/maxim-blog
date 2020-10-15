import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage, ToastService } from '../toast.service';

@Component({
  selector: 'toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.css']
})
export class ToastMessagesComponent implements OnInit, OnDestroy {
  private _toastSub: Subscription;
  messages: ToastMessage[];
  
  constructor(private toast: ToastService) { }

  ngOnInit(): void {
    this.messages = [];
    this._toastSub = this.toast.messagesEmitter
                      .subscribe( message => this.messages.unshift(message) );
  }

  ngOnDestroy(): void {
    this._toastSub.unsubscribe();
  }

  dismiss(index: number): void {
    this.messages.splice(index, 1);
  }
}
