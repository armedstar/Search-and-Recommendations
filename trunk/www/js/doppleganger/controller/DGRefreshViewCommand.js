jingo.declare(
{
    require:
    [
        "doppleganger.view.mediator.DGRecommendationsPageMediator"
    ],
    name: 'doppleganger.controller.DGRefreshViewCommand',
    as: function()
    {

        doppleganger.controller.DGRefreshViewCommand = function()
        {
            puremvc.SimpleCommand.apply(this, arguments);
        }

        doppleganger.controller.DGRefreshViewCommand.prototype = new puremvc.SimpleCommand;
        doppleganger.controller.DGRefreshViewCommand.prototype.parent = puremvc.SimpleCommand.prototype;
        doppleganger.controller.DGRefreshViewCommand.prototype.constructor = doppleganger.controller.DGRefreshViewCommand;

        doppleganger.controller.DGRefreshViewCommand.prototype.execute = function(notification)
        {
            if (notification.getBody())
            {
                var recsMediator = this.facade.retrieveMediator(doppleganger.view.mediator.DGRecommendationsPageMediator.NAME);
                recsMediator.refreshView();
            }
        }

    }
});