jingo.declare(
{
    require: 
    [
        "doppleganger.view.component.DGSideNavigation",
        "doppleganger.view.mediator.DGSideNavigationMediator",
        "doppleganger.view.component.DGRecommendationsPage",
        "doppleganger.view.mediator.DGRecommendationsPageMediator"
    ],
    name: 'doppleganger.controller.DGPrepViewCommand',
    as: function() 
    {

        doppleganger.controller.DGPrepViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        doppleganger.controller.DGPrepViewCommand.prototype = new puremvc.SimpleCommand;
        doppleganger.controller.DGPrepViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        doppleganger.controller.DGPrepViewCommand.prototype.constructor = doppleganger.controller.DGPrepViewCommand;

        doppleganger.controller.DGPrepViewCommand.prototype.execute = function(notification)
        {
            console.log("doppleganger.controller.DGPrepViewCommand executed");
              
              var sideNavigation = new doppleganger.view.component.DGSideNavigation(document.getElementById('sideNavigation'));
              var sideNavigationMediator = new doppleganger.view.mediator.DGSideNavigationMediator(sideNavigation);
              this.facade.registerMediator(sideNavigationMediator);
    
            var recommendationsPage = new doppleganger.view.component.DGRecommendationsPage(document.getElementById('recommendationsPage'));
            var recommendationsPageMediator = new doppleganger.view.mediator.DGRecommendationsPageMediator(recommendationsPage);
            this.facade.registerMediator(recommendationsPageMediator);
    
        }
        
    }
});


