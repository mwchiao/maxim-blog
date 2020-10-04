import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { SidedoorComponent } from './sidedoor/sidedoor.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "post", component: PostComponent },
  { path: "sidedoor", component: SidedoorComponent },
  { path: "editor", component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
