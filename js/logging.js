var LOGGING = (function() {

    var storage = [];
    var rating = 0;

    function getLogTemplate() {
        return {
            timestamp: 0,
            term: "",
            interactions: { }
        }
    }

    var activeSearch = getLogTemplate();

    return {
        logNewSearch: function(term) {
            storage.push(activeSearch);
            activeSearch = getLogTemplate();
            activeSearch.timestamp = new Date().getTime();
            activeSearch.term = term;
        },
        /*
            mode is one of ["selection" | "deselection" | "include" | "exclude" | "move"]
         */
        logInteraction: function(facetName, mode) {
            if(!activeSearch.interactions[mode]) {
                activeSearch.interactions[mode] = {};
            }
            if(!activeSearch.interactions[mode][facetName]) {
                activeSearch.interactions[mode][facetName] = 1;
            } else {
                activeSearch.interactions[mode][facetName] += 1;
            }
        },
        logRating: function(score) {
            if(score == 1) {
                // positive rating
                rating = 1;
            } else if(score == 2) {
                // negative rating
                rating = -1;
            } else {
                // no rating
                rating = 0;
            }
        },
        getRating: function() {
            return rating;
        }
    }
})();