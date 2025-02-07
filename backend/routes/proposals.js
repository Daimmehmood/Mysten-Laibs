const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Proposal = require('../models/Proposal');

// Configure Cloudinary
console.log('Configuring Cloudinary with:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: '***' // Don't log the actual secret
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Create a new proposal
router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    console.log('Received request body:', {
      ...req.body,
      profilePicture: req.file ? 'File present' : 'No file'
    });

    const { name, twitter, website, description, creator_wallet } = req.body;
    
    // Validate required fields
    if (!name || !twitter || !creator_wallet || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'twitter', 'creator_wallet', 'description'],
        received: { name, twitter, creator_wallet, description }
      });
    }
    
    let profilePicture = null;
    
    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        console.log('Processing file for Cloudinary upload...');
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        
        console.log('Initiating Cloudinary upload...');
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: 'proposals',
          resource_type: 'auto'
        });
        console.log('Cloudinary upload successful:', uploadResponse.secure_url);
        
        profilePicture = {
          url: uploadResponse.secure_url,
          publicId: uploadResponse.public_id
        };
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error details:', cloudinaryError);
        return res.status(500).json({ 
          message: 'Error uploading image to Cloudinary',
          error: cloudinaryError.message,
          details: cloudinaryError
        });
      }
    }

    const proposalData = {
      name,
      twitter,
      website: website || '',
      description,
      creator_wallet,
      profilePicture
    };

    console.log('Creating new proposal with data:', proposalData);

    const proposal = new Proposal(proposalData);

    console.log('Saving proposal to MongoDB...');
    await proposal.save();
    console.log('Proposal saved successfully');
    res.status(201).json(proposal);
  } catch (error) {
    console.error('Error creating proposal:', error);
    res.status(500).json({ 
      message: 'Error creating proposal', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all proposals
router.get('/', async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ 
      message: 'Error fetching proposals', 
      error: error.message 
    });
  }
});

module.exports = router;
