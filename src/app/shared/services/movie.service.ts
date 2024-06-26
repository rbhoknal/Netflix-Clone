import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTYyMTdmMjdmOWYxMjE5Mzg0ZmIxOGJlZmI5NGQzYyIsInN1YiI6IjY2NmVkMTdmNjQ4MmMwYzgzNjkzMDdhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d1OatmIZTnwozH-MDwcx_TYqiuIQsPvPfA6M-tgUZ8U'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }

  getMovieDetails(data: any) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${data}`, options)
  }

  getMovieVideo(data: any) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${data}/videos`, options)
  }

  getMovieCast(data: any) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${data}/credits`, options)
  }
}
