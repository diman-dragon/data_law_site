module.exports = function(eleventyConfig) {
  
  // Копируем статику напрямую в public
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Следим за изменениями
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");

  return {
    // ВАЖНО: Префикс пути для GitHub Pages (название твоего репозитория)
    pathPrefix: "/data_law_site/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_includes" 
    }
  };
};