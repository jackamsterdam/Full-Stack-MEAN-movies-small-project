import { Component, EventEmitter, Input, Output} from '@angular/core';
import { MovieModel } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input()
  movie: MovieModel

  @Output()
  deleteMe = new EventEmitter<string>()


  deleteMovie(_id: string) {
   this.deleteMe.emit(_id)
  }

}
