jingo.declare(
{
    require: 
    [
        "shared.view.component.UIComponent"
    ],
    name: 'shared.view.component.BasePage',
    as: function() 
    {

        shared.view.component.BasePage = function(divElem)
        {
            shared.view.component.UIComponent.apply(this, arguments);
        }

        shared.view.component.BasePage.prototype = new shared.view.component.UIComponent;
        shared.view.component.BasePage.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.BasePage.prototype.constructor = shared.view.component.BasePage;

        shared.view.component.BasePage.prototype.setBackgroundImage = function(backgroundImageSrc)
        {
            $('body').css('backgroundImage','url(' + backgroundImageSrc + ')');
        }

        shared.view.component.BasePage.prototype.onPageEnter = function(data)
        {
            //any initialization code
    
            this._doPageEnter(data);
        }

        shared.view.component.BasePage.prototype.onPageExit = function()
        {
            this._doPageExit();
        }

        shared.view.component.BasePage.prototype._doPageEnter = function(data)
        {
            //to be overridden
        }

        shared.view.component.BasePage.prototype._doPageExit = function()
        {
            //to be overridden
        }

        shared.view.component.BasePage.prototype.hide = function()
        {
            $(this.divElem).hide();
        }

        shared.view.component.BasePage.prototype.show = function()
        {
              console.log('SHOWING PAGE');
            $(this.divElem).show();
        }
    
    }
});

