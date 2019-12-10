import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddSongComponent } from './add-song/add-song.component';
import {  LoginComponent } from './login/login.component';
import {  PlaylistComponent } from './playlist/playlist.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'songs', component: SongsComponent},
  { path: 'songs/:id/review', component: ReviewsComponent},
  { path: 'songs/addSong', component: AddSongComponent},
  { path: 'login', component: LoginComponent},
  { path: 'playlist', component: PlaylistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
