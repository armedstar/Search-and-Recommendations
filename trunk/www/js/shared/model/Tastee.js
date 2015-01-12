jingo.declare(
{
    require: 
    [
    ],
    name: 'shared.model.Tastee',
    as: function() 
    {

        shared.model.Tastee = function(fullName, category, name, score)
        {
            this.fullName = fullName;
            this.category = category;
            this.name = name;
            this.score = score;
        }
        
        shared.model.Tastee.prototype = {};
        shared.model.Tastee.prototype.parent = Object.prototype;
        shared.model.Tastee.prototype.constructor = shared.model.Tastee;
        
        shared.model.Tastee.CATEGORY_TYPE =
        {
            UNKNOWN: 0,
            GENRE: 1,
            SUBJECT: 2,
            STYLE: 3,
            THEME: 4,
            QUALITY: 5,
            MOOD: 6,
            MISC: 7
        };

        shared.model.Tastee.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});
