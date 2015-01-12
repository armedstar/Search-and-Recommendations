jingo.declare(
{
    require: 
    [
        "shared.controller.PrepControllerCommand",
        "doppleganger.controller.DGPrepControllerCommand",
        "shared.controller.PrepModelCommand",
        "doppleganger.controller.DGPrepModelCommand",
        "shared.controller.PrepViewCommand",
        "doppleganger.controller.DGPrepViewCommand",
        "shared.controller.GotoInitialScreenCommand"
    ],
    name: 'doppleganger.controller.DGStartupCommand',
    as: function() 
    {

        doppleganger.controller.DGStartupCommand = function()
        {
            puremvc.MacroCommand.apply(this, arguments);
        }
        
        doppleganger.controller.DGStartupCommand.prototype = new puremvc.MacroCommand;
        doppleganger.controller.DGStartupCommand.prototype.parent = puremvc.MacroCommand.prototype;
        doppleganger.controller.DGStartupCommand.prototype.constructor = doppleganger.controller.DGStartupCommand;

        doppleganger.controller.DGStartupCommand.prototype.initializeMacroCommand = function()
        {
            this.addSubCommand(shared.controller.PrepControllerCommand);
            this.addSubCommand(doppleganger.controller.DGPrepControllerCommand);
            this.addSubCommand(shared.controller.PrepModelCommand);
            this.addSubCommand(doppleganger.controller.DGPrepModelCommand);
            this.addSubCommand(shared.controller.PrepViewCommand);
            this.addSubCommand(doppleganger.controller.DGPrepViewCommand);
            this.addSubCommand(shared.controller.GotoInitialScreenCommand);
        }
        
    }
});

