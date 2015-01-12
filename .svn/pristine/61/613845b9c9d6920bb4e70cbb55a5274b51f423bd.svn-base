jingo.declare(
{
    require: 
    [
        "shared.view.component.BasePage"
    ],
    name: 'shared.view.mediator.BasePageMediator',
    as: function() 
    {

        shared.view.mediator.BasePageMediator = function(mediatorName, viewComponent)
        {
            puremvc.Mediator.apply(this, [mediatorName, viewComponent]);
        }

        shared.view.mediator.BasePageMediator.prototype = new puremvc.Mediator;
        shared.view.mediator.BasePageMediator.prototype.parent = puremvc.Mediator.prototype;
        shared.view.mediator.BasePageMediator.prototype.constructor = shared.view.mediator.BasePageMediator;

        shared.view.mediator.BasePageMediator.prototype.getView = function()
        {
            return this.viewComponent;
        }

        shared.view.mediator.BasePageMediator.prototype.getName = function()
        {
            //to be overridden
            return null;
        }

        shared.view.mediator.BasePageMediator.prototype.showPage = function(data)
        {
            this.contextData = this._formatData(data);
            this.getView().onPageEnter(this.contextData);
            this.getView().show();
        }

        shared.view.mediator.BasePageMediator.prototype._formatData = function(data)
        {
            //to be overriden
            return data;
        }

        shared.view.mediator.BasePageMediator.prototype.hidePage = function()
        {
            this.getView().onPageExit();
            this.getView().hide();
        }

        shared.view.mediator.BasePageMediator.prototype.refresh = function()
        {
            this.hidePage();
            this.showPage(this.contextData);
        }
        
    }
});