const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String, required: true },
  notes: String,
  interests: [],
  inspirations: [],
  processes: [],
  links: [],
  images: []
}, {
  timestamps: true,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;