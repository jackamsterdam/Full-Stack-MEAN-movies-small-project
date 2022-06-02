import { Document, model, Schema } from "mongoose";
import { CinemaModel } from "./cinema-model";

//1. Model interface describing the data in the model:
export interface IMovieModel extends Document {
    name: string
    duration: number
    date: Date
    cinemaId: Schema.Types.ObjectId
}

//2. Model Schema describing validation, constraints and more:
const MovieSchema = new Schema<IMovieModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true

    }, 
    duration: {
        type: Number,
        required: [true, "Duration price"],
        min: [0, "Duration can't be negative"],
        max: [1000, "Duration can't exceed 1000"]

    },
    date: {
        type: Date,
        required: [true, "Missing date"],
    },
    cinemaId: Schema.Types.ObjectId

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
})

//Virtual Fields: 
MovieSchema.virtual('cinema', {
    ref: CinemaModel,
    localField: 'cinemaId',
    foreignField: '_id',
    justOne: true

})

//3. Model Class - this is the final model class:
export const MovieModel = model<IMovieModel>('MovieModel', MovieSchema, 'movies')

