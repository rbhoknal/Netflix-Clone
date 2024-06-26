import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cast, MovieDetailsResult } from 'src/app/shared/models/movie-details-result.interface';
import { MovieService } from 'src/app/shared/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { LABELS } from './movie-details.constant';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  getMovieDetailResult: MovieDetailsResult;
  getMovieVideoResult: String = '';
  getMovieCastResult: Cast[] = [];
  labels = LABELS;
  getParamId: String | null = '';

  constructor(private movieService: MovieService, private router: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
      // get ID from params
      this.getParamId = this.router.snapshot.paramMap.get('id');
      
      if(!!this.getParamId) {
        this.getMovie(this.getParamId);
        this.getVideo(this.getParamId);
        this.getMovieCast(this.getParamId);
      }
  }

  getMovie(id: String): void{
    this.movieService.getMovieDetails(id).subscribe(async (res) => { 
      this.getMovieDetailResult = await res;

    // update Title
    this.title.setTitle(`${this.getMovieDetailResult?.original_title} | ${this.getMovieDetailResult?.tagline}`
    );
  });
  }

  getVideo(id: String): void {
    this.movieService.getMovieVideo(id).subscribe((res) => {
      res.results.forEach((element: any) => {
        if (element.type == this.labels.TRAILER) {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

  getMovieCast(id: String): void {
    this.movieService.getMovieCast(id).subscribe((res) => {
      this.getMovieCastResult = res.cast;
    });
  }

}
