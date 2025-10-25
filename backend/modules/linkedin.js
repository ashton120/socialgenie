const { extractCategory } = require('../services/rules');

const HASHTAGS = {
  business: ['#Leadership', '#Entrepreneurship', '#Business', '#Career', '#Success', '#Professional'],
  tech: ['#Tech', '#Innovation', '#AI', '#SoftwareEngineering', '#Developer', '#DigitalTransformation'],
  general: ['#CareerAdvice', '#PersonalBranding', '#Networking', '#GrowthMindset']
};

function generate(input, tone = 'professional') {
  const category = extractCategory(input);
  const tags = HASHTAGS[category] || HASHTAGS.general;
  const hashtags = tags.slice(0, 5).join(' ');

  const headlines = {
    professional: `How I ${input} — and what it taught me`,
    insight: `Most people get ${input} wrong. Here’s the truth.`,
    value: `3 lessons from ${input} that changed my career`
  };

  return {
    platform: 'linkedin',
    headline: headlines[tone] || headlines.professional,
    hashtags
  };
}

module.exports = { generate };