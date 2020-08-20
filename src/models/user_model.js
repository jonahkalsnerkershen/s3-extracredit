import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  username: { type: String, unique: true },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// UserSchema.virtual('score').get(function scoreCalc() {
//   return this.upvotes - this.downvotes;
// });

UserSchema.pre('save', function comparePassword(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  console.log(`in backend, next value is ${next}`);
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  // TODO: do stuff here
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  // overwrite plain text password with encrypted password
  user.password = hash;
  return next();

  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (err, comparisonResult) => {
    if (err) return callback(err);
    else {
      console.log('no errors in comparing ');
      return callback(null, comparisonResult);
    }
  });
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

// create PostModel class from schema

export default UserModel;
