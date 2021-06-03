const tagsPlugin = require('./plugins/tags/tags')
//const tagCloudShortcodePlugin = require('./plugins/tags/TagCloudShortcode')

module.exports = function(eleventyConfig)
{
    /** 11ty Plugins **********************************************************
     * Vi lägger till/aktiverar olika plugins
     *************************************************************************/

     eleventyConfig.addPlugin(tagsPlugin.tags, {
        "maxTags" : 20
    });
    
    /** 11ty Copy *************************************************************
     * Copies all of the content in these development folders to the distribution 
     * folder.
     *************************************************************************/
    
     eleventyConfig.addPassthroughCopy('./_site/assets');
     eleventyConfig.addPassthroughCopy('./_site/data');

    /** SASS (SCSS) ***********************************************************
     * SASS is thirdparty, this makes 11ty watch for changes in build content
     * when "serving" the website. We build resulting CSS straight into "_site"
     * folder structure.
     * Gret Guide: https://dev.to/jkc_codes/using-sass-with-eleventy-21le
     *************************************************************************/

    return {
        pathPrefix: "/blog/",
        dir: {
            includes: "includes",
            //data:     "_site/data",
            input:    "_site",
            output:   "dist"
        },
        templateFormats: ["html", "liquid", "njk", "md"],
        htmlTemplateEngine: "njk",
    };
}