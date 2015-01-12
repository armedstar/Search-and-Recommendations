jingo.declare(
{
    require: 
    [
        "shared.constants"
    ],
    name: 'shared.controller.PrepControllerCommand',
    as: function() 
    {

        shared.controller.PrepControllerCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.PrepControllerCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.PrepControllerCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.PrepControllerCommand.prototype.constructor = shared.controller.PrepControllerCommand;

        shared.controller.PrepControllerCommand.prototype.execute = function(notification)
        {
            console.log("PrepController executed");
        }
        
    }
});


