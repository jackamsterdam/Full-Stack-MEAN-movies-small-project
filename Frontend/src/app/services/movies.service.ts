import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CinemaModel } from '../models/cinema.model';
import { MovieModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  async getAllCinemas(): Promise<CinemaModel[]> {
      const cinemas = await firstValueFrom(this.http.get<CinemaModel[]>(environment.cinemasUrl))
    return cinemas
}


  async getMoviesByCinema(movieId: string): Promise<MovieModel[]> {
    const movies = await firstValueFrom(this.http.get<MovieModel[]>(environment.moviesByCinemaUrl + movieId))
    return movies 
}

  async addMovie(movie: MovieModel): Promise<MovieModel> {
    const addedMovie = await firstValueFrom(this.http.post<MovieModel>(environment.moviesUrl, movie))
    return addedMovie
}

  async deleteMovie(_id: string):Promise<void> {
    await firstValueFrom(this.http.delete(environment.moviesUrl + _id))

}
}
