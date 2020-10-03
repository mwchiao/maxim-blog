import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { SidedoorComponent } from './sidedoor/sidedoor.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "post", component: PostComponent },
  { path: "sidedoor", component: SidedoorComponent },
  { path: "edit", component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
