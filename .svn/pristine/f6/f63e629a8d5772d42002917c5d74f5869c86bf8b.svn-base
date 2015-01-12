jingo.declare(
{
    require: 
    [
        "shared.view.mediator.ShellMediator"
    ],
    name: 'shared.controller.PrepViewCommand',
    as: function() 
    {

        shared.controller.PrepViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.PrepViewCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.PrepViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.PrepViewCommand.prototype.constructor = shared.controller.PrepViewCommand;

        shared.controller.PrepViewCommand.prototype.execute = function(notification)
        {
            console.log("shared.controller.PrepViewCommand executed");
    
            var shellMediator = new shared.view.mediator.ShellMediator(document.getElementById('shell'));
            this.facade.registerMediator(shellMediator);
        }
        
    }
});


