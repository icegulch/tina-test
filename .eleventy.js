const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
require("dotenv").config();
const isProduction = process.env.ELEVENTY_ENV === `production`;
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addGlobalData('env', process.env);

  eleventyConfig.addFilter("pluck", function (arr, value, attr) {
    return arr.filter((item) => item.data[attr] === value);
  });

  eleventyConfig.addFilter("pick", function (arr, value, attr) {
    return arr.filter((item) => item[attr] === value);
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // configure markdown-it (and set it as your markdown processor for consistency)
  const md = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true,
  });
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addFilter('markdownify', str => md.render(str));

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });


  // Minify HTML Output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( isProduction && outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
