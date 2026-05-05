module.exports = function(eleventyConfig) {
  
  // --- 1. ПРЯМОЕ КОПИРОВАНИЕ СТАТИКИ ---
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  // --- 2. МОДУЛЬНЫЕ КОМПОНЕНТЫ (HEADER) ---
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/header/header.css": "css/header.css" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/header/header.js": "js/header.js" 
  });

  // --- 3. МОДУЛЬНЫЕ КОМПОНЕНТЫ (FOOTER) ---
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/footer/footer.css": "css/footer.css" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/footer/footer.js": "js/footer.js" 
  });

  // --- 4. МОДУЛЬНЫЕ КОМПОНЕНТЫ (LAYLA WIDGET) ---
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/layla-widget/layla-widget.css": "css/layla-widget.css" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/layla-widget/layla-window.css": "css/layla-window.css" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/layla-widget/layla-messages.css": "css/layla-messages.css" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/layla-widget/layla-input.css": "css/layla-input.css" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "src/_includes/components/layla-widget/layla-widget.js": "js/layla-widget.js" 
  });

  // --- 5. ДАННЫЕ ДЛЯ БРАУЗЕРА ---
  eleventyConfig.addPassthroughCopy({ "src/_data/layla-db.json": "data/layla-db.json" });

  // --- 6. СЛЕЖЕНИЕ ЗА ИЗМЕНЕНИЯМИ ---
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/_includes/components/");
  eleventyConfig.addWatchTarget("./src/_data/");

  // --- 7. НАСТРОЙКИ ДВИЖКА ---
  return {
    pathPrefix: "/data_law_site/",   // ← GitHub Pages: github.io/data_law_site/
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
