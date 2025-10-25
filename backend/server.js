require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getUser, incrementUsage } = require('./db');

const instagram = require('./modules/instagram');
const tiktok = require('./modules/tiktok');
const linkedin = require('./modules/linkedin');
const twitter = require('./modules/twitter');

const app = express();
app.use(cors());
app.use(express.json());

const FREE_LIMIT = 3;

app.post('/generate', (req, res) => {
  const { platform, input, tone = 'default' } = req.body;
  const userId = req.headers['x-user-id'] || 'anon_' + Date.now().toString(36);

  if (!input || input.trim().length < 5) {
    return res.status(400).json({ error: 'Input too short. Please describe your idea (5+ chars).' });
  }

  const user = getUser(userId);
  if (user.usage >= FREE_LIMIT && !user.isPremium) {
    return res.status(429).json({
      error: 'Free limit reached (3 uses/day).',
      upgrade: true
    });
  }

  let result;
  try {
    switch (platform.toLowerCase()) {
      case 'instagram': result = instagram.generate(input, tone); break;
      case 'tiktok': result = tiktok.generate(input, tone); break;
      case 'linkedin': result = linkedin.generate(input, tone); break;
      case 'twitter': result = twitter.generate(input, tone); break;
      default: return res.status(400).json({ error: 'Unsupported platform' });
    }

    incrementUsage(userId);
    res.json({ ...result, usage: user.usage + 1, limit: FREE_LIMIT });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Generation failed. Try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ SocialGenie backend running on port ${PORT}`);
});