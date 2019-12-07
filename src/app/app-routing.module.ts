import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { ReviewsComponent } from './reviews/reviews.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'songs', component: SongsComponent},
  { path: 'songs/:id/review', component: ReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
