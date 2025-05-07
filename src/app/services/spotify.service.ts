import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA21rQ8b2F4plWm1aO6lCWGdqKOILr7iEITxHZTYNfxXqROwSYBECVMcirP1yJUQ6LH569HRnjxwHzoukCdrfgdENHjHTZnDYnmvSQUP_Gz1VspTJWPYrvGgw_6xhSAzsDL99AfgfsN6486TMAejAgNLGnUqiat7CVYE4LuyCRUHqoERuqan38lUeRQvbVA_T2SkmnzdvgadXFM0tBKi79p-MxaLDuRYU2jpGTgArzOnCnVeBONxaBnMdHkJ6_MaNx4nNQvHfpCi92QmlSTlswiwltYzUvo0o0IplrxL00MTuS9MBZtbC70KHls32On'
    });

    return this.http.get(url, { headers });

  }


  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( (data: any)  => data['albums'].items ));

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( (data: any) => data['artists'].items));

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items));

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( (data: any) => data['tracks']));

  }

}
