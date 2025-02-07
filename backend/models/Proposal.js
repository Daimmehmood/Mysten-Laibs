const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  creator_wallet: {
    type: String,
    required: true
  },
  profilePicture: {
    url: String,
    publicId: String
  },
  paymentTxHash: {
    type: String
  },
  votes: [{
    wallet: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Proposal', proposalSchema);
