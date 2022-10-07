import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  searchClicked:boolean = false;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }
  handleSelect(choice){
    this.searchCategory = choice;
    this.searchClicked = false;
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then(
      (response) => {
        this.resources = response;
        //for (let i=0; i<this.resources.length; i++){
        //    console.log(this.resources[i]);
        //}
      }
    ).then(res => this.searchClicked = true)
    .catch(err => console.log(err));
  }
  
  
}
