import { CinemaModel, ICinemaModel } from "../03-models/cinema-model"
import ErrorModel from "../03-models/error-model"
import { IMovieModel, MovieModel } from "../03-models/movie-model"

async function getAllCinemas(): Promise<ICinemaModel[]> {
    return CinemaModel.find().exec()
}

async function getMoviesByCinema(cinemaId: string): Promise<IMovieModel[]> {
    return MovieModel.find({ cinemaId }).populate('cinema').exec()
}

async function addMovie(movie: IMovieModel): Promise<IMovieModel> {
    const errors = movie.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)
    return movie.save()
}

async function deleteMovie(_id: string):Promise<void> {
    const deletedMovie = await MovieModel.findByIdAndDelete(_id).exec()
    if (!deletedMovie) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
}


export default {
    getAllCinemas,
    getMoviesByCinema,
    addMovie,
    deleteMovie
}