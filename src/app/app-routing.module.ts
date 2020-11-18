import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { 
    path: "", 
    component: HomeComponent },
  { 
    path: "post/:id", 
    component: PostComponent
  },
  {
    path:"404",
    component: NotFoundComponent
  },
  { 
    path: "**", 
    redirectTo: "404",
    pathMatch: "full"
  } // Replace with page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
