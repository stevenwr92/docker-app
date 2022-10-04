const slugify = require("slugify");

function convertToSlug(text) {
  const slug = text.toLowerCase();
  return slugify(slug);
}

module.exports = { convertToSlug };
