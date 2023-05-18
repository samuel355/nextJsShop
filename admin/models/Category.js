const { Schema, models, model, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
    name: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId}
})

export const Category = models.category||model('category', CategorySchema);