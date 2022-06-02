import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaModel } from 'src/app/models/cinema.model';
import { MovieModel } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
 cinemas: CinemaModel[]
 movie = new MovieModel()
  constructor(private notify: NotifyService, private moviesService: MoviesService, private router: Router) { }

  async ngOnInit(){
    try {
      this.cinemas = await this.moviesService.getAllCinemas()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  
  async add() {
    try {
      await this.moviesService.addMovie(this.movie)
      this.notify.success('Movie has been added')
      this.router.navigateByUrl('/movie-list')
    } catch (err: any) {
      this.notify.error(err)
    }
  }

}
