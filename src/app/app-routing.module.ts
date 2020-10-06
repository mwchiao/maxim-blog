import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { SidedoorComponent } from './sidedoor/sidedoor.component';
import { AdminGuard } from './admin.guard'

const routes: Routes = [
  { path: "", component: HomeComponent },
  { 
    path: "post/:id", 
    component: PostComponent
  },
  { path: "sidedoor", component: SidedoorComponent },
  { 
    path: "editor/:id", 
    component: EditorComponent,
    canActivate: [AdminGuard]
  },
  { path: "**", redirectTo: "", pathMatch: "full" } // Replace with page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
