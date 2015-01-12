jingo.declare(
    {
    require:
    [
        "shared.constants",
        "shared.view.mediator.BasePageMediator",
        "doppleganger.view.component.DGSideNavigation"
    ],
    name: 'doppleganger.view.mediator.DGSideNavigationMediator',
    as: function()
    {

        doppleganger.view.mediator.DGSideNavigationMediator = function(viewComponent)
        {
        shared.view.mediator.BasePageMediator.apply(this, [doppleganger.view.mediator.DGSideNavigationMediator.NAME, viewComponent]);

            if (this.getView())
            {
                this.getView().addEventListener(doppleganger.view.component.DGSideNavigation.GRID_CLICKED, Relegate.create(this, this.onGridButtonClicked));
                this.getView().addEventListener(doppleganger.view.component.DGSideNavigation.BAR_GRAPH_CLICKED, Relegate.create(this, this.onBarGraphClicked));
                this.getView().addEventListener(doppleganger.view.component.DGSideNavigation.RESET_TRIGGERED, Relegate.create(this, this.onResetTriggered));
                this.getView().addEventListener(doppleganger.view.component.DGSideNavigation.REFRESH_CLICKED, Relegate.create(this, this.onRefreshClicked));
                this.getView().addEventListener(doppleganger.view.component.DGSideNavigation.OPEN_CLOSE_CLICKED, Relegate.create(this, this.onOpenCloseViewClicked));
            }
        }

        doppleganger.view.mediator.DGSideNavigationMediator.prototype = new shared.view.mediator.BasePageMediator;
        doppleganger.view.mediator.DGSideNavigationMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        doppleganger.view.mediator.DGSideNavigationMediator.prototype.constructor = doppleganger.view.mediator.DGSideNavigationMediator;

        doppleganger.view.mediator.DGSideNavigationMediator.NAME = "doppleganger.view.mediator.DGSideNavigationMediator";

        doppleganger.view.mediator.DGSideNavigationMediator.prototype.getName = function()
        {
            return doppleganger.view.mediator.DGSideNavigationMediator.NAME;
        }

        doppleganger.view.mediator.DGSideNavigationMediator.prototype.onGridButtonClicked = function()
        {
            console.log('Loading Grid view of recommendations.');
            this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser(), subViewToShow: AppConstants.RECS_SHOW_GRID, refreshPage: true });
        }

        doppleganger.view.mediator.DGSideNavigationMediator.prototype.onBarGraphClicked = function()
        {
            console.log('Loading bar graph view of personal profile.');
            this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser(), subViewToShow: AppConstants.RECS_SHOW_PROFILE, refreshPage: true });
        }

        doppleganger.view.mediator.DGSideNavigationMediator.prototype.onOpenCloseViewClicked = function(event)
        {
              var showView = event.args.show;
              this.sendNotification(AppConstants.DISPLAY_HISTORY, {showView : showView});
        }

        doppleganger.view.mediator.DGSideNavigationMediator.prototype.onRefreshClicked = function()
        {
            console.log('Refreshing view.');
            this.sendNotification(AppConstants.REFRESH_VIEW, { refreshPage: false });
        }
              
        doppleganger.view.mediator.DGSideNavigationMediator.prototype.toggleHistory = function(showHistoryView)
        {
            this.getView().toggleHistory(showHistoryView);
        }

        doppleganger.view.mediator.DGSideNavigationMediator.prototype.onResetTriggered = function()
        {
            this.sendNotification(AppConstants.RESET_SYSTEM, {});
        }

        doppleganger.view.mediator.DGSideNavigationMediator.prototype.setActiveState = function(state)
        {
            this.getView().setActiveState(state);
        }

    }
});