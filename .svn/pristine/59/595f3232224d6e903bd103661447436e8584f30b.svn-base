jingo.declare(
{
    require: [],
    name: 'shared.model.SearchResult',
    as: function() 
    {

        shared.model.SearchResult = function(
            id,
            type,
            title,
            programIconImgSrc,
            releaseYear,
            genre,
            preferenceState)
        {
            this.id = id;
            this.type = type;
            this.title = title;
            this.releaseYear = releaseYear;
            this.genre = genre;
            this.programIconImgSrc = programIconImgSrc;
            this.preferenceState = (preferenceState || ContentPreferenceStateConstants.PREFERENCE_STATE_UNKNOWN);
        }

        shared.model.SearchResult.prototype = {};
        shared.model.SearchResult.prototype.parent = Object.prototype;
        shared.model.SearchResult.prototype.constructor = shared.model.SearchResult;
        shared.model.SearchResult.prototype.director = null;
        shared.model.SearchResult.prototype.cast = null;

        shared.model.SearchResult.MOVIE = "movie";
        shared.model.SearchResult.TVSERIES = "tvSeries";

        shared.model.SearchResult.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});