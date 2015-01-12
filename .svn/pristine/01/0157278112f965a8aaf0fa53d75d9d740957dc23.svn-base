jingo.declare(
{
    require: 
    [
        "doppleganger.view.mediator.DGRecommendationsPageMediator",
        "doppleganger.view.mediator.DGSideNavigationMediator"
    ],
    name: 'doppleganger.controller.DGDisplayRecommendationsCommand',
    as: function() 
    {

        doppleganger.controller.DGDisplayRecommendationsCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }
    
        doppleganger.controller.DGDisplayRecommendationsCommand.prototype = new puremvc.SimpleCommand;
        doppleganger.controller.DGDisplayRecommendationsCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        doppleganger.controller.DGDisplayRecommendationsCommand.prototype.constructor = doppleganger.controller.DGDisplayRecommendationsCommand;

        doppleganger.controller.DGDisplayRecommendationsCommand.prototype.execute = function(notification)
        {
            console.log("doppleganger.controller.DGDisplayRecommendationsCommand executed");
            console.log("Notification body: " + notification.getBody());
    
            if (notification.getBody())
            {
                var user = notification.getBody().user;
                var refreshPage = (notification.getBody().refreshPage) ? notification.getBody().refreshPage : true;
              
                var subViewToShow = (notification.getBody().subViewToShow) ? notification.getBody().subViewToShow : AppConstants.RECS_SHOW_GRID;
                var showView = notification.getBody().showView;
        
                var recsMediator = this.facade.retrieveMediator(doppleganger.view.mediator.DGRecommendationsPageMediator.NAME);
                var sideNavMediator = this.facade.retrieveMediator(doppleganger.view.mediator.DGSideNavigationMediator.NAME);
              
                sideNavMediator.setActiveState(subViewToShow);
              
                this.sendNotification(
                    AppConstants.SHOW_PAGE, 
                    {
                        pageMediator: recsMediator, 
                        userData: user, 
                        pageData: null,
                        refreshPage: refreshPage,
                        subViewToShow : subViewToShow,
                        showView : showView
                    });
            }
        }
        
    }
});
