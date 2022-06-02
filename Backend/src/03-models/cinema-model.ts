import { Document, model, Schema } from "mongoose";

//1. Interface describing Cinema:
export interface ICinemaModel extends Document {
    name: string
}

//2. Schema describing Cinema:
const CinemaSchema = new Schema<ICinemaModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
})

// 3. Cinema Model:
export const CinemaModel = model<ICinemaModel>('CinemaModel', CinemaSchema, 'cinemas')