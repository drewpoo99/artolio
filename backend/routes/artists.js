const router = require('express').Router();
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
  Artist.find()
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const notes = req.body.notes;
  const interests = req.body.interests;
  const inspirations = req.body.inspirtations;
  const processes = req.body.processes;
  const links = req.body.links;
  const images = req.body.images;

  const newArtist = new Artist({
    name,
    notes,
    interests,
    inspirations,
    interests,
    processes,
    links,
    images
  });

  newArtist.save()
  .then(() => res.json('Artist added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Artist.findById(req.params.id)
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Artist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Artist.findById(req.params.id)
    .then(artist => {
      artist.name = req.body.name;
      artist.notes = req.body.notes;
      artist.interests.push(req.body.interests);
      artist.inspirations.push(req.body.inspirations);
      artist.processes.push(req.body.processes);
      artist.links.push(req.body.links);
      artist.images.push(req.body.images);

      Artist.save()
        .then(() => res.json('Artist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;