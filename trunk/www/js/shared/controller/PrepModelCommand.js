jingo.declare(
{
    require: 
    [],
    name: 'shared.controller.PrepModelCommand',
    as: function() 
    {

        shared.controller.PrepModelCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.PrepModelCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.PrepModelCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.PrepModelCommand.prototype.constructor = shared.controller.PrepModelCommand;
        
        shared.controller.PrepModelCommand.prototype.execute = function(notification)
        {
            console.log("PrepModel executed");
        }
        
    }
});

