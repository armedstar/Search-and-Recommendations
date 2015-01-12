jingo.declare(
{
    require: 
    [
        
    ],
    name: 'shared.view.mediator.ShellMediator',
    as: function() 
    {
    
        shared.view.mediator.ShellMediator = function(viewComponent)
        {
            puremvc.Mediator.apply(this, [shared.view.mediator.ShellMediator.NAME, viewComponent]);
            this.pageStack = new Array();
        }

        shared.view.mediator.ShellMediator.prototype = new puremvc.Mediator;
        shared.view.mediator.ShellMediator.prototype.parent = puremvc.Mediator.prototype;
        shared.view.mediator.ShellMediator.prototype.constructor = shared.view.mediator.ShellMediator;

        shared.view.mediator.ShellMediator.NAME = "ShellMediator";

        shared.view.mediator.ShellMediator.prototype.getView = function()
        {
            return this.viewComponent;
        }

        shared.view.mediator.ShellMediator.prototype.listNotificationInterests = function()
        {
            return [AppConstants.SHOW_PAGE];
        }

        shared.view.mediator.ShellMediator.prototype.getCurrentPage = function()
        {
            if (this.pageStack && this.pageStack.length > 0)
            {
                return this.pageStack[this.pageStack.length - 1];
            }
            else
                return undefined;
        }

        shared.view.mediator.ShellMediator.prototype.hide = function()
        {
            this.getView().hide();
        }

        shared.view.mediator.ShellMediator.prototype.show = function()
        {
            this.getView().show();
        }

        shared.view.mediator.ShellMediator.prototype.popPage = function(refreshUserData)
        {
            var curPage = this.pageStack.pop();
            if (curPage && curPage.mediator)
                curPage.mediator.hidePage();
    
            var newPage = this.getCurrentPage();
            if (newPage && newPage.mediator)
            {
                var userData = (refreshUserData) ? this.facade.getCurrentUser() : newPage.userData;
                newPage.mediator.showPage({ userData: userData, pageData: newPage.pageData, refreshPage: newPage.refreshPage });
            }
        }

        shared.view.mediator.ShellMediator.prototype.clearAllPages = function()
        {
            var curPage = this.getCurrentPage();
            if (curPage && curPage.mediator)
                curPage.mediator.hidePage();
    
            this.pageStack = new Array();
        }

        shared.view.mediator.ShellMediator.prototype.handleNotification = function(notification)
        {
            switch(notification.getName())
            {
                case AppConstants.SHOW_PAGE:
                    var curPage = this.getCurrentPage();
            
                    var newPageMediator = notification.getBody().pageMediator;
                    var newUserData = notification.getBody().userData;
                    var newPageData = notification.getBody().pageData;
                    var refreshPage = notification.getBody().refreshPage;
                    var subViewToShow = notification.getBody().subViewToShow;
            
                    this.pageStack.push({ mediator: newPageMediator, userData: newUserData, pageData: newPageData, refreshPage: refreshPage, subViewToShow: subViewToShow });
            
                    if (curPage)
                    {
                        if (newPageMediator != curPage.mediator) 
                        {
                            curPage.mediator.hidePage();
                        }
                        newPageMediator.showPage({ userData: newUserData, pageData: newPageData, refreshPage: refreshPage, subViewToShow: subViewToShow });
                    }
                    else
                    {
                        newPageMediator.showPage({ userData: newUserData, pageData: newPageData, refreshPage: refreshPage, subViewToShow: subViewToShow });
                    }
            
                    break;
            }
        }
        
    }
});

