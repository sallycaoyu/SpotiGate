import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    // return Promise.resolve();
    return this.http.get(this.expressBaseUrl+endpoint)
                    .toPromise()
                    .then((response: any) => {
                      return response;
                    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    //return null;
    var endpoint = '/search/' + encodeURIComponent(category) + '/' + encodeURIComponent(resource);
    return this.sendRequestToExpress(endpoint).then((data) => {
        return data[category+'s']['items'].map((d)=>{
          if (category == 'artist'){
            return new ArtistData(d);
          }
          else if (category == 'album'){
            return new AlbumData(d);
          }
          else{
            return new TrackData(d);
          }
        });
      }
    );
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var endpoint = '/artist/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    var endpoint = '/artist-related-artists/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data['artists'].map((d)=>{
        return new ArtistData(d);
      });
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var endpoint = '/artist-top-tracks/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data['tracks'].map((d)=>{
        return new TrackData(d);
      });
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var endpoint = '/artist-albums/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return data['items'].map((d)=>{
        return new AlbumData(d);
      });
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var endpoint = '/album/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    var endpoint = '/album-tracks/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((data)=>{
      return data['items'].map((d)=>{
        return new TrackData(d);
      })
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    var endpoint = '/track/' + encodeURIComponent(trackId);
    return this.sendRequestToExpress(endpoint).then((data)=>{
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    var endpoint = '/track-audio-features/' + encodeURIComponent(trackId);
    return this.sendRequestToExpress(endpoint).then((data)=>{
      return Object.keys(data).filter((k)=>{
            return TrackFeature.FeatureTypes.includes(k);
        }).map((k)=>{
            var feature = new TrackFeature(k, data[k]);
            feature.id = trackId;
            return feature;
        });
    });
  }
}
