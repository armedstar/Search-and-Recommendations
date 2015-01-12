jingo.declare(
{
    require: 
    [
        'shared.constants',
        'shared.model.AuthenticationProxy',
        'shared.model.SNRProxy',
        'doppleganger.controller.DGStartupCommand'
    ],
    name: 'doppleganger.DGApp',
    as: function() 
    {

        ApplicationFacade = function(key)
        {
            puremvc.Facade.apply(this, arguments);
            this.familyId = null;
        }
    
        ApplicationFacade.prototype = new puremvc.Facade;
        ApplicationFacade.prototype.parent = puremvc.Facade.prototype;
        ApplicationFacade.prototype.constructor = ApplicationFacade;

        ApplicationFacade.APP_NAME = "DOPPLEGANGER";
        ApplicationFacade.SPINNER_TOP = "top";
        ApplicationFacade.SPINNER_BOTTOM = "bottom";
        ApplicationFacade.SPINNER_CENTER = "center";
        ApplicationFacade.SPINNER_SEARCH = "search";

        ApplicationFacade.prototype.familyId = null;

        ApplicationFacade.getInstance = function(key)
        {
            if (!puremvc.Facade.hasCore(key))
            {
                new ApplicationFacade(key);
            }
            var retVal = puremvc.Facade.getInstance(key);
            return retVal;
        }

        ApplicationFacade.prototype.startup = function()
        {
            var onInitFinished = Relegate.create(
                this,
                function() 
                {
                    this.sendNotification(AppConstants.STARTUP);
                },
                this);
        
            // Initialize pre-startup proxies
            this.registerProxy(new shared.model.AuthenticationProxy());
            var authProxy = this.retrieveProxy(shared.model.AuthenticationProxy.NAME);
            
            this.registerProxy(new shared.model.SNRProxy());
            var snrProxy = this.retrieveProxy(shared.model.SNRProxy.NAME);
            
            var initSNRProxy = Relegate.create(this, function() { snrProxy.init(onInitFinished); }, this);
            var initAuthProxy = Relegate.create(this, function() { authProxy.init(initSNRProxy); }, this);
            
            initAuthProxy();
        }

        ApplicationFacade.prototype.initializeController = function()
        {
            puremvc.Facade.prototype.initializeController.call(this);
            this.registerCommand(AppConstants.STARTUP, doppleganger.controller.DGStartupCommand);
        }

        ApplicationFacade.prototype.getCurrentUser = function()
        {
            var user = null;
    
            var authProxy = this.retrieveProxy(shared.model.AuthenticationProxy.NAME);
            if (authProxy)
            {
                user = authProxy.getCurrentUser();
            }
            return user;
        }
              
              
        ApplicationFacade.prototype.hideProgressSpinner = function()
        {
              $('#progressSpinner').hide();
              $('#progressSpinner').activity(false);
        }
              
        ApplicationFacade.prototype.showProgressSpinner = function(position)
        {
              switch(position)
              {
                case ApplicationFacade.SPINNER_TOP:
                    $('#progressSpinner').css('top', '30%');
                    $('#progressSpinner').css('left', '50%');
                    break;
                case ApplicationFacade.SPINNER_BOTTOM:
                    $('#progressSpinner').css('top', '70%');
                    $('#progressSpinner').css('left', '50%');
                    break;
                case ApplicationFacade.SPINNER_SEARCH:
                    $('#progressSpinner').css('top', '50%');
                    $('#progressSpinner').css('left', '80%');
                    break;
                case ApplicationFacade.SPINNER_CENTER:
                default:
                    $('#progressSpinner').css('top', '50%');
                    $('#progressSpinner').css('left', '50%');
                    break;
              }
              
              $('#progressSpinner').show();
              $('#progressSpinner').activity();
        }
        
    }
});