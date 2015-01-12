jingo.declare(
{
    require: 
    [
        "shared.constants",
        "shared.model.AuthenticationProxy",
        "doppleganger.view.mediator.DGRecommendationsPageMediator",
        "doppleganger.view.mediator.DGSideNavigationMediator"
    ],
    name: 'doppleganger.controller.DGResetSystemCommand',
    as: function() 
    {

        doppleganger.controller.DGResetSystemCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        doppleganger.controller.DGResetSystemCommand.prototype = new puremvc.SimpleCommand;
        doppleganger.controller.DGResetSystemCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        doppleganger.controller.DGResetSystemCommand.prototype.constructor = doppleganger.controller.DGResetSystemCommand;

        doppleganger.controller.DGResetSystemCommand.prototype.execute = function(notification)
        {
            console.log("doppleganger.controller.DGResetSystemCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            var authProxy = this.facade.retrieveProxy(shared.model.AuthenticationProxy.NAME);
            authProxy.resetCurrentUser();
            
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            snrProxy.resetCurrentUserData();
            
            var sideNavMediator = this.facade.retrieveMediator(doppleganger.view.mediator.DGSideNavigationMediator.NAME);
            var recsMediator = this.facade.retrieveMediator(doppleganger.view.mediator.DGRecommendationsPageMediator.NAME);
            sideNavMediator.toggleHistory(false);
            recsMediator.showHistory(false);
                
            this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser(), subViewToShow: AppConstants.RECS_SHOW_GRID });
        }
        
    }
});
