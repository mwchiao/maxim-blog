import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { ToastService } from './shared/services/toast.service';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ToastMessagesComponent } from './ui/toast-messages/toast-messages.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { MarkdownModule } from 'ngx-markdown';
import { FooterComponent } from './footer/footer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HomeComponent,
    ToastMessagesComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MarkdownModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
