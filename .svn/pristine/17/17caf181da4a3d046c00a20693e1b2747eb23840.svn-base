jingo.declare(
{
    require:
    [],
    name: 'shared.model.BaseSNRProxy',
    as: function() 
    {
        shared.model.BaseSNRProxy = function(proxyName)
        {
            puremvc.Proxy.apply(this, [proxyName, new Array()]);
        }

        shared.model.BaseSNRProxy.prototype = new puremvc.Proxy;
        shared.model.BaseSNRProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.BaseSNRProxy.prototype.constructor = shared.model.BaseSNRProxy;
        
        shared.model.BaseSNRProxy.CONTENT_PREFERENCE_EVENT_LIST_MAX_SIZE = 20;
        
        shared.model.BaseSNRProxy.prototype._previousContentRecomendations = {};
        shared.model.BaseSNRProxy.prototype._contentPreferenceEventList = [];
        shared.model.BaseSNRProxy.prototype._contentPreferences = {};
        
        shared.model.BaseSNRProxy.prototype._initialized = null;
        
        shared.model.BaseSNRProxy.prototype.init = function(finishedCallback)
        {
            if (!this._initialized)
            {
                this._initialized = true;
                this._initInternal(finishedCallback);
            }
            else
            {
                finishedCallback();
            }
        }
        
        shared.model.AuthenticationProxy.prototype._initInternal = function(finishedCallback)
        {
            finishedCallback();
        }
        
        shared.model.BaseSNRProxy.prototype.resetCurrentUserData = function()
        {
            // Clear all data retained in association of the current user.
            this._previousContentRecomendations = {};
            this._contentPreferences = {};
            this._contentPreferenceEventList = [];
        }
        
        shared.model.BaseSNRProxy.prototype._storeCurrentContentRecommendations = function(contentList)
        {
            this._previousContentRecomendations = {};
            
            if (contentList)
            {
                for (var i = 0; i < contentList.length; i++)
                {
                    var programBrief = contentList[i];
                    if (programBrief && !isEmptyString(programBrief.id))
                    {
                        this._previousContentRecomendations[programBrief.id] = true;
                    }
                }
            }
        }
        
        shared.model.BaseSNRProxy.prototype._flagNewContentRecommendations = function(contentList)
        {
            if (contentList)
            {
                for (var i = 0; i < contentList.length; i++)
                {
                    var programBrief = contentList[i];
                    if (programBrief && !isEmptyString(programBrief.id))
                    {
                        programBrief.isNew = (this._previousContentRecomendations[programBrief.id] == null);
                    }
                }
            }
        }
        
        shared.model.BaseSNRProxy.prototype._storeContentPreferenceEvent = function(programBrief)
        {
            if (programBrief)
            {
                // TODO: Handle the case where the list gets too large (limit the size)
            
                var programBriefCopy = 
                    new shared.model.ProgramBrief(     
                        programBrief.id,
                        programBrief.type,
                        programBrief.title,
                        null,
                        null,
                        null,
                        null,
                        null,
                        programBrief.programIconImgSrc,
                        null,
                        programBrief.preferenceState);
                this._contentPreferenceEventList.unshift(programBriefCopy);
                
                if (this._contentPreferenceEventList.length > shared.model.BaseSNRProxy.CONTENT_PREFERENCE_EVENT_LIST_MAX_SIZE)
                {
                    // Remove one from the end
                    this._contentPreferenceEventList.pop();
                }
            }
        }
        
        shared.model.BaseSNRProxy.prototype.getContentPreferenceEventList = function()
        {
            return this._contentPreferenceEventList;
        }
        
        shared.model.BaseSNRProxy.prototype._storeContentPreferenceState = function(programId, preferenceState)
        {
            if (!isEmptyString(programId))
            {
                this._contentPreferences[programId] = (preferenceState || ContentPreferenceStateConstants.PREFERENCE_STATE_UNKNOWN);
            }
        }
        
        shared.model.BaseSNRProxy.prototype._retrieveContentPreferenceState = function(programId)
        {
            if (!isEmptyString(programId))
            {
                return (this._contentPreferences[programId] || ContentPreferenceStateConstants.PREFERENCE_STATE_UNKNOWN);
            }
        }
    
    }
});