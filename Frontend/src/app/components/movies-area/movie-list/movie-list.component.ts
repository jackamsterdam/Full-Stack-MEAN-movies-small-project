import { Component, OnInit } from '@angular/core';
import { CinemaModel } from 'src/app/models/cinema.model';
import { MovieModel } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  cinemas: CinemaModel[]
  movies: MovieModel[]
  constructor(private notify: NotifyService, private moviesService: MoviesService) { }

  async ngOnInit(){
    try {
      this.cinemas = await this.moviesService.getAllCinemas()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async getMovies(event: Event) {
    try {
      const cinemaId = (event.target as HTMLSelectElement).value
      this.movies = await this.moviesService.getMoviesByCinema(cinemaId)
    } catch (err: any) {
      this.notify.error(err)
    }

  }


  async deleteThisMovie(_id: string) {
    try {
      const ok = confirm('Are you sure?')
      if (!ok) return 
      await this.moviesService.deleteMovie(_id)
      this.notify.success('Movie has been deleted')
      const indexToDelete = this.movies.findIndex(m => m._id === _id)
      this.movies.splice(indexToDelete, 1)
    } catch (err: any) {
      this.notify.error(err)
    }
  }


}
