const { extractCategory } = require('../services/rules');

const HASHTAGS = {
  fitness: ['#fyp', '#fitness', '#gym', '#workout', '#fitcheck', '#gymlife', '#foryou'],
  food: ['#fyp', '#foodtok', '#recipe', '#cooking', '#easyrecipe', '#foodie', '#foryou'],
  business: ['#fyp', '#entrepreneur', '#smallbusiness', '#hustle', '#money', '#business', '#foryou'],
  travel: ['#fyp', '#travel', '#adventure', '#wanderlust', '#explore', '#foryou'],
  tech: ['#fyp', '#coding', '#developer', '#tech', '#programming', '#learnontiktok', '#foryou'],
  general: ['#fyp', '#viral', '#trending', '#foryou', '#xyzbca']
};

function generate(input, tone = 'fun') {
  const category = extractCategory(input);
  const tags = HASHTAGS[category] || HASHTAGS.general;
  const hashtags = tags.slice(0, 8).join(' ');

  const captions = {
    fun: `You won’t believe what happened next! ${input} 👀🔥`,
    engaging: `Wait for it… ${input} 😳\n\nDrop a 💯 if you’re shocked!`,
    educational: `Here’s how to ${input} in 30 seconds ⏱️ (save this!)`
  };

  return {
    platform: 'tiktok',
    caption: captions[tone] || captions.fun,
    hashtags
  };
}

module.exports = { generate };