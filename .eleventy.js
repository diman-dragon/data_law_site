module.exports = function(eleventyConfig) {
  
  // Копируем статику напрямую в public
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Явно указываем копирование JS
  eleventyConfig.addPassthroughCopy("src/js");

  // Следим за изменениями
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");

  return {
    // ВАЖНО: Это название твоего репозитория на GitHub
    // Если репозиторий называется linguadeck_ai, оставь так. 
    // Если просто data_law_site — замени.
    pathPrefix: "/linguadeck_ai/", 

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