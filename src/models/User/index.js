const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { sign } = require('jsonwebtoken');
const { jwtsecret } = require('../../config');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  designation: {
    type: String,
  },
  is_admin: {
    type: Boolean,
  },
  is_premium: {
    type: Boolean,
  },
  //@Brainz added image
  image: {
    type:String,
  },
  imageId: {
    type: String,
  },
  // @raji worked here
  liked_story: [
    {
      story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    },
  ],
  bookmarks: [
    {
      story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    },
  ],
  // End of work
  password: {
    type: String,
    required: true
  },
  display_picture: {
    type: String
  }

}, { timestamps: true });

userSchema.methods.generateJWT = function generate() {
  return sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    jwtsecret,
    {
      expiresIn: '24h',
    },
  );
};

module.exports = mongoose.model('User', userSchema);
