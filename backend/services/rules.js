function extractCategory(text) {
  const lower = text.toLowerCase();
  if (lower.includes('fitness') || lower.includes('gym') || lower.includes('workout')) return 'fitness';
  if (lower.includes('food') || lower.includes('recipe') || lower.includes('cook')) return 'food';
  if (lower.includes('business') || lower.includes('startup') || lower.includes('money')) return 'business';
  if (lower.includes('travel') || lower.includes('adventure')) return 'travel';
  if (lower.includes('tech') || lower.includes('coding') || lower.includes('developer')) return 'tech';
  return 'general';
}

module.exports = { extractCategory };