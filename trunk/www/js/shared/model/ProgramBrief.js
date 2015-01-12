jingo.declare(
{
    require: [],
    name: 'shared.model.ProgramBrief',
    as: function() 
    {

        shared.model.ProgramBrief = function(
            id,
            type,
            title,
            synopsis,
            genre,
            year,
            runtime,
            qualityRating,
            programIconImgSrc,
            largeProgramImage,
            preferenceState,
            isNew)
        {
            this.id = id;
            this.type = type;
            this.title = title;
            this.synopsis = synopsis;
            this.genre = genre;
            this.year = year;
            this.runtime = runtime;
            this.qualityRating = qualityRating;
            this.programIconImgSrc = programIconImgSrc;
            this.largeProgramImage = largeProgramImage;
            this.preferenceState = (preferenceState || ContentPreferenceStateConstants.PREFERENCE_STATE_UNKNOWN);
            this.isNew = (isNew || false);
        }

        shared.model.ProgramBrief.prototype = {};
        shared.model.ProgramBrief.prototype.parent = Object.prototype;
        shared.model.ProgramBrief.prototype.constructor = shared.model.ProgramBrief;
              
        shared.model.ProgramBrief.prototype.cast = null;
        shared.model.ProgramBrief.prototype.director = null;

        shared.model.ProgramBrief.MOVIE = "movie";
        shared.model.ProgramBrief.TVSERIES = "tvSeries";

        shared.model.ProgramBrief.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});