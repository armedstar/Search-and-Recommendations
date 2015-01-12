jingo.declare(
{
    require: 
    [
    ],
    name: 'shared.model.User',
    as: function() 
    {

        shared.model.User = function(id)
        {
            this.id = id;
        }
        
        shared.model.User.prototype = {};
        shared.model.User.prototype.parent = Object.prototype;
        shared.model.User.prototype.constructor = shared.model.User;

        shared.model.User.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});
