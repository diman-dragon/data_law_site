module.exports = function(eleventyConfig) {
  
  // Копируем статику напрямую в public
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Следим за изменениями в JS и CSS
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");

  // УМНЫЙ ПРЕФИКС: 
  // Если запущена команда --serve (локально), префикс будет пустой "".
  // При обычной сборке (на GitHub) добавится имя репозитория.
  const isProd = process.env.NODE_ENV === "production" || !process.argv.includes("--serve");
  const pathPrefix = isProd ? "/data_law_site/" : "/";

  return {
    pathPrefix: pathPrefix,

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