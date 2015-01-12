jingo.declare(
{
    require: [],
    name: 'shared.view.component.UIComponent',
    as: function() 
    {

        shared.view.component.UIComponent = function(divElem)
        {
            this.divElem = divElem;
            this.eventDispatcher = new EventDispatcher();
        }
        
        shared.view.component.UIComponent.prototype = {};
        shared.view.component.UIComponent.prototype.parent = Object.prototype;
        shared.view.component.UIComponent.prototype.constructor = shared.view.component.UIComponent;

        shared.view.component.UIComponent.prototype.dispatchEvent = function(eventType/*String*/, args/*Object*/)
        {
            var event = new EventS(eventType, this, args);
            this.eventDispatcher.dispatchEvent(event);
        }

        shared.view.component.UIComponent.prototype.addEventListener = function(eventType, listener)
        {
            this.eventDispatcher.addEventListener(eventType, listener);
        }

        shared.view.component.UIComponent.prototype.removeEventListener = function(eventType, listener)
        {
            this.eventDispatcher.removeEventListener(eventType, listener);
        }
        
    }
});
