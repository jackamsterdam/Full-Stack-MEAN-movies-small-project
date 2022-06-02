import { CinemaModel } from "./cinema.model"

export class MovieModel {
    _id: string 
    name: string
    duration: number
    date: Date
    cinemaId: string 
    cinema: CinemaModel
}