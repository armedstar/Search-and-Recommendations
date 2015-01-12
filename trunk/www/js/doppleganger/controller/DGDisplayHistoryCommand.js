jingo.declare(
              {
              require:
              [
               "doppleganger.view.mediator.DGRecommendationsPageMediator",
               "doppleganger.view.mediator.DGSideNavigationMediator"
               ],
              name: 'doppleganger.controller.DGDisplayHistoryCommand',
              as: function()
              {
              
                doppleganger.controller.DGDisplayHistoryCommand = function()
                {
                    puremvc.SimpleCommand.apply(this, arguments);
                }
              
              doppleganger.controller.DGDisplayHistoryCommand.prototype = new puremvc.SimpleCommand;
              doppleganger.controller.DGDisplayHistoryCommand.prototype.parent = puremvc.SimpleCommand.prototype;
              doppleganger.controller.DGDisplayHistoryCommand.prototype.constructor = doppleganger.controller.DGDisplayHistoryCommand;
              
              
              doppleganger.controller.DGDisplayHistoryCommand.prototype.execute = function(notification)
              {
                if (notification.getBody())
                {
                    var showHistory = notification.getBody().showView;
                    var recsMediator = this.facade.retrieveMediator(doppleganger.view.mediator.DGRecommendationsPageMediator.NAME);
                    var sideNavMediator = this.facade.retrieveMediator(doppleganger.view.mediator.DGSideNavigationMediator.NAME);
              
                    sideNavMediator.toggleHistory(showHistory);
                    recsMediator.showHistory(showHistory);
                }
              }
                
              }
});