jingo.declare(
{
    require: 
    [
        "doppleganger.controller.DGDisplayRecommendationsCommand",
        "doppleganger.controller.DGDisplayHistoryCommand",
        "doppleganger.controller.DGRefreshViewCommand",
        "doppleganger.controller.DGResetSystemCommand"
    ],
    name: 'doppleganger.controller.DGPrepControllerCommand',
    as: function() 
    {

        doppleganger.controller.DGPrepControllerCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
        
        doppleganger.controller.DGPrepControllerCommand.prototype = new puremvc.SimpleCommand;
        doppleganger.controller.DGPrepControllerCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        doppleganger.controller.DGPrepControllerCommand.prototype.constructor = doppleganger.controller.DGPrepControllerCommand;

        doppleganger.controller.DGPrepControllerCommand.prototype.execute = function(notification)
        {
            console.log("doppleganger.controller.DGPrepControllerCommand executed");
    
            this.facade.registerCommand(AppConstants.DISPLAY_RECOMMENDATIONS, doppleganger.controller.DGDisplayRecommendationsCommand);
            this.facade.registerCommand(AppConstants.DISPLAY_HISTORY, doppleganger.controller.DGDisplayHistoryCommand);
            this.facade.registerCommand(AppConstants.REFRESH_VIEW, doppleganger.controller.DGRefreshViewCommand);
            this.facade.registerCommand(AppConstants.RESET_SYSTEM, doppleganger.controller.DGResetSystemCommand);
        }
        
    }
});


