import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field

const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  coverUrl: String,
  author: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

PostSchema.virtual('score').get(function scoreCalc() {
  return this.upvotes - this.downvotes;
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

// create PostModel class from schema

export default PostModel;
