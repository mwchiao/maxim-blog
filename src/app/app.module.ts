import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { PostComponent } from './post/post.component';
import { SidedoorComponent } from './sidedoor/sidedoor.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { UserService } from './user.service';
import { ToastService } from './toast.service';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MarkdownPipe } from './markdown.pipe';
import { AutosizeModule } from 'ngx-autosize';
import { ToastMessagesComponent } from './toast-messages/toast-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    PostComponent,
    SidedoorComponent,
    HomeComponent,
    ConfirmationModalComponent,
    MarkdownPipe,
    ToastMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AutosizeModule
  ],
  providers: [UserService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
