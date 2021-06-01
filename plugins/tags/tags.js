/* Tag Collection *************************************************************
 *
 * TODO:
 * - Lägg till lista med ignorerade filer och mappar
 * - Lägg till lista med ignorerade taggar
 * - Generera lista/logga med inlägg utan taggar
 *   - Skriv ut i konsolen
 *****************************************************************************/

/*const _getAllTags = (eleventyConfig) => {
    return 
}*/

const _getOpacity = (percentage) => {
    if (percentage <= 30) {
        return 50;
    } else if ( percentage > 30 && percentage < 80 ) {
        return percentage + 20;
    } else if ( percentage >= 80 ) {
        return 100;
    }
}

const _getTagList = (collection) => {
    let _tag = '';
    let _tags = {};

    // Iterate the tags on each page
    collection.getAll().forEach((object, index, array) => {
        if(typeof object.data.tags !== 'undefined') {
            for (tag in object.data.tags)  {
                
                _tag = String(object.data.tags[tag]);

                if(_tag in _tags) {
                    _tags[ _tag ] += 1;
                } else {
                    _tags[ _tag ] = 1;
                }
            }
        }
    });

    return _tags;
}

/** _getTagListSpecial ********************************************************
 * TODO: 
 * Set ut som "getAll()" inte existerar när collection matas till Shortcode.
 * Det bör gå att skapa en generisk funktion som kollar efter "getAll()" och
 * sedan avgör vilken "getTagList" funktion som bör anropas.
 *****************************************************************************/
 
const _getTagListSpecial = (collection) => {
    let _tag = '';
    let _tags = {};

    // Iterate over all the pages
    // TODO: maybe skip pages at certain locations?
    for (page in collection.all) {
        //console.log(collection.all[page].data.tags)
        for ( tag in collection.all[page].data.tags ) {
            
            // Fetch tag XXX on page
            _tag = String(collection.all[page].data.tags[tag]);

            // Increase count for tag XXX or create new entry
            if(_tag in _tags) {
                _tags[ _tag ] += 1;
            } else {
                _tags[ _tag ] = 1;
            }
        }
        
    }

    return _tags;
}

const _getTagListTotal = (tagList) => {
    let total = 0;
    
    for (tag in tagList) {
        total += tagList[tag];
    }
    
    return total;
}

exports.tags = (eleventyConfig, settings) => {
    
    // Creating "custom" in global to make things possible
    // This is a hack to make "collection" available to the TagCloud shortcode

    eleventyConfig.custom = {};
    
    // !!!Must come first!!! This is a hake that makes collection available
    eleventyConfig.addCollection("tagList", function(collection) {
        let _tag = '';
        let _tags = {};
        let _tagTotal = 0;

        //!!! Hack !!!
        eleventyConfig.custom.collection = collection;

        collection.getAll().forEach((object, index, array) => {
            if(typeof object.data.tags !== 'undefined') {
                for (tag in object.data.tags)  {
                    
                    _tag = String(object.data.tags[tag]);

                    if(_tag in _tags) {
                        _tags[ _tag ] += 1;
                    } else {
                        _tags[ _tag ] = 1;
                    }
                }
                _tagTotal ++;
            }
            // TODO: I probably need to create a checker that ensure all files got tags
            //else { 
                //console.log("Index= "+index+" =====================================");
                //console.log("N/A");
            //}
        });

        eleventyConfig.custom.tagList = _tags;
        eleventyConfig.custom.tagTotal = _tagTotal;

        console.log("Index= Result ================================");
        console.log(_tags);
        return _tags;
    });

    eleventyConfig.addShortcode("tagCloud", function() {
        console.log('Hello from Tag Cloud Shortcode');
        const _tagList = eleventyConfig.custom.tagList;
        let _percentage = 0;
        
        let output = "<div id='TagCloud'>";
        for (tag in _tagList)
        {
            _percentage = _tagList[tag] / eleventyConfig.custom.tagTotal * 100;
            output += "<div class='tag Opacity" + _getOpacity(_percentage) + "'>";
            output += String(tag) + "=" + String( _percentage );
            output += "</div>";
        }
        output += "</div>";

        return output;
    });

    /** {% tagCloud2 collections %} *******************************************
     * Denna shortcode tar collections och spottar ur sig en lista med alla
     * taggar som används på inlägg och sidor. De tilldelas även en klass 
     * baserat på hur många 5-tal det finns.
     **************************************************************************/

    eleventyConfig.addShortcode("tagCloud2", function(collection) {

        let output = "";
        let _femtal  = 0;
    
        // Get list of tags from collections
        const _tagList = _getTagListSpecial(collection);
        const _tagTotal = _getTagListTotal(_tagList);

        console.log(_tagTotal);

        // Iterate over the list of found tags
        for (tag in _tagList) {
            _femtal = (_tagList[tag] / 5) - ((_tagList[tag] / 5) % 1)
            console.log("Tag=" +tag+ " Percentage=" + _femtal)

            output += "<div class='tag x" + _femtal + "'>";
            output += String(tag);
            output += "</div>";
        }

        return output;
    });
}