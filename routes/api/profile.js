const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.get('/me', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({
         user: req.user.id,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
         return res
            .status(400)
            .json({ msg: 'There is no profile for this user' });
      }

      res.json(profile);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

// @route       POST api/profile
// @desc        Create or update a user profile
// @access      Private

router.post(
   '/',
   [
      auth,
      [
         check('status', 'Status is required').not().isEmpty(),
         check('skills', 'Tech stack is required').not().isEmpty(),
      ],
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const {
         company,
         website,
         location,
         bio,
         status,
         githubusername,
         skills,
         youtube,
         facebook,
         twitter,
         instagram,
         linkedin,
      } = req.body;

      // Build profile object
      const profileFields = {
         user: req.user.id,
         company,
         location,
         website:
            website && website !== ''
               ? normalize(website, { forceHttps: true })
               : '',
         bio,
         skills: Array.isArray(skills)
            ? skills
            : skills.split(',').map((skill) => ' ' + skill.trim()),
         status,
         githubusername,
      };

      // Build social object
      const socialfields = { youtube, twitter, instagram, linkedin, facebook };

      for (const [key, value] of Object.entries(socialfields)) {
         if (value && value.length > 0)
            socialfields[key] = normalize(value, { forceHttps: true });
      }
      profileFields.social = socialfields;
      try {
         // Using upsert option (creates new doc if no match is found):
         let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
         );
         res.json(profile);
      } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
      }
   }
);

// @route       GET api/profile
// @desc        Get all profiles
// @access      Public
router.get('/', async (req, res) => {
   try {
      const profiles = await Profile.find().populate('user', [
         'name',
         'avatar',
      ]);
      res.send(profiles);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

// @route       GET api/profile/user/:user_id
// @desc        Get profile by user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
   try {
      const profile = await Profile.findOne({
         user: req.params.user_id,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
         return res.status(400).json({ msg: 'Profile not found!' });
      }

      res.send(profile);
   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(400).json({ msg: 'Profile not found!' });
      }

      res.status(500).send('Server Error');
   }
});

// @route       DELETE api/profile
// @desc        Delete profile, user & posts
// @access      Private
router.delete('/', auth, async (req, res) => {
   try {
      // Remove users posts
      await Post.deleteMany({ user: req.user.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });

      //Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: 'User successfully removed' });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

// @route       PUT api/profile/experience
// @desc        Add experience to a users profile
// @access      Private

router.put(
   '/experience',
   [
      auth,
      [
         check('title', 'Title is required').not().isEmpty(),
         check('company', 'Company is required').not().isEmpty(),
         check('from', 'Please enter a "from" date').not().isEmpty(),
      ],
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const {
         title,
         company,
         location,
         from,
         to,
         current,
         description,
      } = req.body;

      const newExperience = {
         title,
         company,
         location,
         from,
         to,
         current,
         description,
      };

      try {
         const profile = await Profile.findOne({ user: req.user.id });

         profile.experience.unshift(newExperience);
         await profile.save();

         res.json(profile);
      } catch (err) {
         console.error(err);
         res.status(500).send('Server Error');
      }
   }
);

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete experience from user profile
// @access      Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get the remove index
      const removeIndex = profile.experience
         .map((item) => item.id)
         .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});

// @route       PUT api/profile/education
// @desc        Add education to a users profile
// @access      Private

router.put(
   '/education',
   [
      auth,
      [
         check('school', 'School is required').not().isEmpty(),
         check('degree', 'Degree is required').not().isEmpty(),
         check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
         check('from', 'Please enter a "from" date').not().isEmpty(),
      ],
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description,
      } = req.body;

      const newEducation = {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description,
      };

      try {
         const profile = await Profile.findOne({ user: req.user.id });

         profile.education.unshift(newEducation);
         await profile.save();

         res.json(profile);
      } catch (err) {
         console.error(err);
         res.status(500).send('Server Error');
      }
   }
);

// @route       DELETE api/profile/education/:edu_id
// @desc        Delete education from user profile
// @access      Private

router.delete('/education/:edu_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Get the remove index
      const removeIndex = profile.education
         .map((item) => item.id)
         .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

// @route       GET api/profile/github/:username
// @desc        Get user repositories from GitHub
// @access      Private

router.get('/github/:username', async (req, res) => {
   try {
      const uri = encodeURI(
         `https://api.github.com/users/${req.params.username}/repos?per_page=6&sort=created:asc`
      );
      const headers = {
         'user-agent': 'node.js',
         Authorization: `token ${config.get('githubToken')}`,
      };

      const githubResponse = await axios.get(uri, { headers });
      return res.json(githubResponse.data);
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});

module.exports = router;
