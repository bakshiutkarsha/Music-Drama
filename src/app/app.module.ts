import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './home/home.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddSongComponent } from './add-song/add-song.component';
// import { ModalComponent } from './modal/modal.component';
import { ModalModule } from './modal/modal.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';

//I keep the new line
@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    HomeComponent,
    ReviewsComponent,
    AddSongComponent,
    LoginComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    UsersComponent
    // ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ModalModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
