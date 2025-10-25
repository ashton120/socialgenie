const { extractCategory } = require('../services/rules');

const HASHTAGS = {
  tech: ['#AI', '#Tech', '#WebDev', '#Programming'],
  business: ['#Startup', '#Entrepreneur', '#Business'],
  general: ['#Twitter', '#Viral', '#Trending']
};

function generate(input, tone = 'punchy') {
  const category = extractCategory(input);
  const tags = HASHTAGS[category] || HASHTAGS.general;
  const hashtags = tags.slice(0, 2).join(' ');

  const tweets = {
    punchy: `Stop doing ${input} the hard way.\n\nThere’s a better path. ${hashtags}`,
    bold: `Hot take: ${input} is broken.\n\nHere’s how to fix it. ${hashtags}`,
    simple: `${input} doesn’t have to be complicated.\n\n${hashtags}`
  };

  return {
    platform: 'twitter',
    tweet: tweets[tone] || tweets.punchy,
    hashtags
  };
}

module.exports = { generate };