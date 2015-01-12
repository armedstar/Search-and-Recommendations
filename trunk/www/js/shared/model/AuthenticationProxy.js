jingo.declare(
{
    require: 
    [
        "shared.model.User"
    ],
    name: 'shared.model.AuthenticationProxy',
    as: function() 
    {

        shared.model.AuthenticationProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.AuthenticationProxy.NAME, new Array()]);
        }

        shared.model.AuthenticationProxy.prototype = new puremvc.Proxy;
        shared.model.AuthenticationProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.AuthenticationProxy.prototype.constructor = shared.model.AuthenticationProxy;
        
        shared.model.AuthenticationProxy.NAME = "AuthenticationProxy";
        
        shared.model.AuthenticationProxy.prototype._initialized = null;
        shared.model.AuthenticationProxy.prototype.currentUser = null;
        
        shared.model.AuthenticationProxy.prototype.init = function(finishedCallback)
        {
            if (!this._initialized)
            {
                this._initialized = true;
                this._prepareCurrentUser(finishedCallback);
            }
            else
            {
                finishedCallback();
            }
        }
        
        shared.model.AuthenticationProxy.prototype._prepareCurrentUser = function(callback)
        {
            if (this.currentUser == null)
            {
                if (DEVICE_MODE_ENABLED)
                {
                    var onError = Relegate.create(
                        this,
                        function(callback)
                        {
                            alert('Unable to get RCS user id.  Make sure the value is present in the Settings application.');
                            this._constructCurrentUser(null, callback);
                        },
                        callback);
                    
                    window.plugins.ApplicationPreferences.get(
                        'rcs_user_id', 
                        Relegate.create(this, this._getUserIdHandler, callback), 
                        onError);
                }
                else
                {  
                    this._getUserIdHandler(null, callback);
                }
            }
            else
            {
                callback(this.currentUser);
            }
        }

        shared.model.AuthenticationProxy.prototype._getUserIdHandler = function(userId, callback)
        {
            this.currentUser = this._constructUser(userId);
            callback(this.currentUser);
        }
        
        shared.model.AuthenticationProxy.prototype.getCurrentUser = function()
        {
            return this.currentUser;
        }
        
        shared.model.AuthenticationProxy.prototype.resetCurrentUser = function()
        {
            this.currentUser = this._constructUser(null);
        }

        shared.model.AuthenticationProxy.prototype._createNewUserId = function()
        {
            return createRandomUUID().substr(0, 8);
        }

        shared.model.AuthenticationProxy.prototype._constructUser = function(userId)
        {
            if (isEmptyString(userId))
            {
                userId = this._createNewUserId();
                if (DEVICE_MODE_ENABLED)
                {
                    window.plugins.ApplicationPreferences.set(
                        'rcs_user_id', 
                        userId,
                        function() { console.log("shared.model.AuthenticationProxy:  New RCS user id saved: userId = " + userId) }, 
                        function() { console.log("shared.model.AuthenticationProxy:  Failed to save new RCS user id: " + userId) });
                }
            }
            else
            {
                console.log("shared.model.AuthenticationProxy:  Using existing RCS user id: userId = " + userId);
            }
        
            return new shared.model.User(userId);
        }
        
    }
});

