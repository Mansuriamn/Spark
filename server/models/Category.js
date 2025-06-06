import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
  // add more fields if needed
});

const Category = mongoose.model('Category', categorySchema);

export default Category;