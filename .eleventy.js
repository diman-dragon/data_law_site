module.exports = function(eleventyConfig) {
  
  // Копируем статику напрямую в public
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Явно указываем копирование JS, чтобы база layla-db.json была доступна
  eleventyConfig.addPassthroughCopy("src/js");

  // Следим за изменениями в JSON и CSS, чтобы сайт обновлялся сам
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");

  return {
    // Указываем Nunjucks как основной движок для HTML и Markdown
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      // Если у тебя есть папка для макетов (layout), укажи её, 
      // иначе Eleventy ищет их внутри _includes
      layouts: "_includes" 
    }
  };
};