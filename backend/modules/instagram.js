const { extractCategory } = require('../services/rules');

const HASHTAGS = {
  fitness: ['#fitness', '#gym', '#workout', '#fitfam', '#healthylifestyle', '#motivation', '#gymlife', '#fitspo'],
  food: ['#foodie', '#foodporn', '#delicious', '#homecooking', '#foodphotography', '#yum', '#instafood', '#recipe'],
  business: ['#entrepreneur', '#business', '#success', '#hustle', '#smallbusiness', '#ceo', '#startup', '#mindset'],
  travel: ['#travel', '#wanderlust', '#adventure', '#explore', '#travelgram', '#vacation', '#nature', '#passportready'],
  tech: ['#coding', '#developer', '#tech', '#programming', '#webdev', '#software', '#100DaysOfCode', '#techlife'],
  general: ['#love', '#instagood', '#photooftheday', '#beautiful', '#happy', '#cute', '#tbt', '#followme']
};

function generate(input, tone = 'vibrant') {
  const category = extractCategory(input);
  const tags = HASHTAGS[category] || HASHTAGS.general;
  const hashtags = tags.slice(0, 10).join(' ');

  const captions = {
    vibrant: `✨ ${input} ✨\n\nDrop a ❤️ if you agree!`,
    inspirational: `Never stop believing. ${input} 💪\n\n#Motivation`,
    casual: `Just sharing this because… ${input} 😌`
  };

  return {
    platform: 'instagram',
    caption: captions[tone] || captions.vibrant,
    hashtags
  };
}

module.exports = { generate };