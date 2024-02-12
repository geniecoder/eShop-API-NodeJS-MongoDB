const Review = require('../models/review');

const ReviewController = {
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getReviewById: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) throw Error('Review not found');
      res.json(review);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createReview: async (req, res) => {
    const review = new Review(req.body);
    try {
      const newReview = await review.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedReview) throw Error('Review not found');
      res.json(updatedReview);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview) throw Error('Review not found');
      res.json(deletedReview);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = ReviewController;