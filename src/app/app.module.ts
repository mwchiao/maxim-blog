import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { PostComponent } from './post/post.component';
import { SidedoorComponent } from './sidedoor/sidedoor.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    PostComponent,
    SidedoorComponent,
    HomeComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
