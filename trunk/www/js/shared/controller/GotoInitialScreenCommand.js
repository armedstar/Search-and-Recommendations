jingo.declare(
{
    require: 
    [
        //"shared.model.User"
    ],
    name: 'shared.controller.GotoInitialScreenCommand',
    as: function() 
    {

        shared.controller.GotoInitialScreenCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        shared.controller.GotoInitialScreenCommand.prototype = new puremvc.SimpleCommand;
        shared.controller.GotoInitialScreenCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        shared.controller.GotoInitialScreenCommand.prototype.constructor = shared.controller.GotoInitialScreenCommand;

        shared.controller.GotoInitialScreenCommand.prototype.execute = function(notification)
        {
              this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser(), subViewToShow: AppConstants.RECS_SHOW_GRID });
        }
        
    }
});