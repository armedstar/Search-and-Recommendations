jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "doppleganger.view.component.DGRecommendationsPage",
        "shared.model.SNRProxy"
    ],
    name: 'doppleganger.view.mediator.DGRecommendationsPageMediator',
    as: function() 
    {
    
        doppleganger.view.mediator.DGRecommendationsPageMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [doppleganger.view.mediator.DGRecommendationsPageMediator.NAME, viewComponent]);
            this.getView().addEventListener(doppleganger.view.component.DGRecommendationsPage.THUMBS_UP, Relegate.create(this, this.onThumbsUpTitle));
            this.getView().addEventListener(doppleganger.view.component.DGRecommendationsPage.THUMBS_DOWN, Relegate.create(this, this.onThumbsDownTitle));
            this.getView().addEventListener(doppleganger.view.component.DGRecommendationsPage.SEARCH_INPUT_CHANGED, Relegate.create(this, this.onSearchInputValChanged));
            this.getView().addEventListener(doppleganger.view.component.DGRecommendationsPage.SEARCH_WITH_QUERY, Relegate.create(this, this.onSearchQuery));
            this.getView().addEventListener(doppleganger.view.component.DGRecommendationsPage.TILE_SELECTED, Relegate.create(this, this.onTileSelected));
            this.getView().addEventListener(doppleganger.view.component.DGRecommendationsPage.HISTORY_TILE_SELECTED, Relegate.create(this, this.onHistoryTileSelected));
        }

        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype = new shared.view.mediator.BasePageMediator;
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.constructor = doppleganger.view.mediator.DGRecommendationsPageMediator;
        
        doppleganger.view.mediator.DGRecommendationsPageMediator.NAME = "doppleganger.view.mediator.DGRecommendationsPageMediator";
        
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype._currentSelectedHistoryProgramID = null;
        
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.getName = function()
        {
            return doppleganger.view.mediator.DGRecommendationsPageMediator.NAME;
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.refreshView = function()
        {
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            if (this.getView().viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY)
            {
              if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
              {
                if (this._currentSelectedHistoryProgramID)
                {
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_TOP);
                    snrProxy.getSimilarContent(
                                         this._currentSelectedHistoryProgramID,
                                         Relegate.create(this, this.onSimilarContentReceived),
                                         Relegate.create(this, this.onSimilarContentError));
                }
                else
                {
                    this.getView().setSimilarContent(new Array());
                }
              }
              else if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
              {
                this.facade.showProgressSpinner(ApplicationFacade.SPINNER_TOP);
                this.updateTasteProfiles();
              }
            }
            else
            {
              if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
              {
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_BOTTOM);
                    var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
                    snrProxy.getRecommendations(this.facade.getCurrentUser(), Relegate.create(this, this.onRecommendationsReceived), Relegate.create(this, this.onRecommendationsError));
              }
              else if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
              {
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_BOTTOM);
                    this.updateTasteProfiles();
              }
            }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.showHistory = function(show)
        {
            if (show && this.getView().viewMode != doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY)
            {
                this.getView().showHistory(show);
                
                if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
                {
                    this.getView().setSimilarContent(new Array());
                }
                else if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
                {
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_TOP);
                    this.updateTasteProfiles();
                }
                
                this._refreshContentPreferenceEventList();
            }
            else if (!show && this.getView().viewMode != doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_RECOMMENDATIONS)
            {
                this._currentSelectedHistoryProgramID = null;
                
                this.getView().showHistory(show);
            
                this.facade.showProgressSpinner(ApplicationFacade.SPINNER_BOTTOM);
                var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
                if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
                {
                    snrProxy.getRecommendations(this.facade.getCurrentUser(), Relegate.create(this, this.onRecommendationsReceived), Relegate.create(this, this.onRecommendationsError));
                }
                else if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
                {
                    this.updateTasteProfiles();
                }                
            }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onHistoryTileSelected = function(event)
        {
            this._currentSelectedHistoryProgramID = event.args.id;
            
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
            {
                if (snrProxy)
                {
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_TOP);
                    snrProxy.getSimilarContent(
                        this._currentSelectedHistoryProgramID, 
                        Relegate.create(this, this.onSimilarContentReceived), 
                        Relegate.create(this, this.onSimilarContentError));
                }
            }
            else if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
            {
                if (snrProxy)
                {
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_TOP);
                    this.updateTasteProfiles();
                }
            }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSimilarContentReceived = function(similarData)
        {
            this.facade.hideProgressSpinner();
            this.getView().setSimilarContent(similarData);
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSimilarContentError = function(err)
        {
            this.facade.hideProgressSpinner();
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onTileSelected = function(event)
        {
              var progId = event.args.id;
              var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
              if (snrProxy)
              {
                this.facade.showProgressSpinner(ApplicationFacade.SPINNER_CENTER);
                snrProxy.getEntityInfo(progId, Relegate.create(this, this.onEntityInfoReceived), Relegate.create(this, this.onEntityInfoErr));
              }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onEntityInfoErr = function()
        {
              this.facade.hideProgressSpinner();
        }
    
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onEntityInfoReceived = function(programBrief)
        {
              this.getView().showProgramInfoDialog(programBrief);
              this.facade.hideProgressSpinner();
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSearchInputValChanged = function(event)
        {
              var curText = event.args.value;
              var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
              if (snrProxy)
              {
                snrProxy.getSearchSuggestions(curText, Relegate.create(this, this.onSearchSuggestionsReceived), function() {});
              }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSearchQuery = function(event)
        {
              var query = event.args.queryStr;
              var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
              if (snrProxy)
              {
                this.facade.showProgressSpinner(ApplicationFacade.SPINNER_SEARCH);
                snrProxy.search(query, Relegate.create(this, this.onSearchResultsReceived), Relegate.create(this, this.onSearchError));
              }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSearchResultsReceived = function(results)
        {
              this.facade.hideProgressSpinner();
              this.getView().showSearchResults(results);
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSearchError = function(err)
        {
              this.facade.hideProgressSpinner();
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSearchSuggestionsReceived = function(suggestions)
        {
              this.getView().showSearchSuggestions(suggestions);
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onThumbsUpTitle = function(event)
        {
            var progId = event.args.programId;
            var programBrief = event.args.programBrief;
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            if (snrProxy)
            {
                this.facade.showProgressSpinner(ApplicationFacade.SPINNER_BOTTOM);
                snrProxy.like(this.facade.getCurrentUser(), progId, programBrief, Relegate.create(this, this.onLikeOrDislikeTitleHandler), function() {});
            }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onLikeOrDislikeTitleHandler = function()
        {
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            if (snrProxy)
            {
                if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
                {
                    snrProxy.getRecommendations(this.facade.getCurrentUser(), Relegate.create(this, this.onRecommendationsReceived), Relegate.create(this, this.onRecommendationsError));
                }
                else if (this.getView().visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
                {
                    this.updateTasteProfiles();
                }
            }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onRecommendationsError = function(err)
        {
            this.facade.hideProgressSpinner();
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onRecommendationsReceived = function(recsData)
        {
            this.facade.hideProgressSpinner();
            this.getView().setRecommendedTitles(recsData);
        }
        
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.updateTasteProfiles = function()
        {
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            
            var successCallback = 
                Relegate.create(
                    this, 
                    function(userProfileData)
                    {
                        if (
                            (this.getView().viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY) &&
                            (this._currentSelectedHistoryProgramID))
                        {
                            snrProxy.getItemTasteProfile(
                                this._currentSelectedHistoryProgramID, 
                                Relegate.create(this, this.onTasteProfilesReceived, userProfileData), 
                                Relegate.create(this, this.onTasteProfilesError));
                        }
                        else
                        {
                            this.onTasteProfilesReceived(null, userProfileData);
                        }
                    },
                    this);
                    
            snrProxy.getUserTasteProfile(
                this.facade.getCurrentUser(), 
                successCallback, 
                Relegate.create(this, this.onUserTasteProfileError));   
        }        
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onTasteProfilesError = function(err)
        {
            this.facade.hideProgressSpinner();
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onTasteProfilesReceived = function(itemProfileData, userProfileData)
        {
            this.facade.hideProgressSpinner();
            this.getView().setTasteProfiles(userProfileData, itemProfileData);
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onThumbsDownTitle = function(event)
        {
            var progId = event.args.programId;
            var programBrief = event.args.programBrief;
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            if (snrProxy)
            {
                this.facade.showProgressSpinner(ApplicationFacade.SPINNER_BOTTOM);
                snrProxy.dislike(this.facade.getCurrentUser(), progId, programBrief, Relegate.create(this, this.onLikeOrDislikeTitleHandler), function() {});
            }
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSeedTitlesReceived = function(seedData)
        {
            console.log("Received Profile Seed titles: " + seedData);
            //this.facade.hideProgressSpinner();
            this.getView().setSeedTitles(seedData);
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onSeedTitlesError = function(err)
        {
            //this.facade.hideProgressSpinner();
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype._refreshContentPreferenceEventList = function()
        {
            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            this.getView().setHistoryTitles(snrProxy.getContentPreferenceEventList());
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onContentPreferenceEventListReceived = function(eventList)
        {
            console.log("Received content preference event list: " + eventList);
            //this.facade.hideProgressSpinner();
            this.getView().setHistoryTitles(eventList);
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.onContentPreferenceEventListError = function(err)
        {
            //this.facade.hideProgressSpinner();
        }
              
        doppleganger.view.mediator.DGRecommendationsPageMediator.prototype.showPage = function(data)
        {
            this.parent.showPage.call(this, data);
            var refreshPage = data.refreshPage;

            var snrProxy = this.facade.retrieveProxy(shared.model.SNRProxy.NAME);
            snrProxy.getProfileSeedTitles(Relegate.create(this, this.onSeedTitlesReceived, this), Relegate.create(this, this.onSeedTitlesError));

            if (this.getView().viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_RECOMMENDATIONS)
            {
                this._currentSelectedHistoryProgramID = null;
            }

            if (data.subViewToShow == AppConstants.RECS_SHOW_GRID)
            {
                if (snrProxy && refreshPage)
                {
                    if (this.getView().viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_RECOMMENDATIONS)
                    {
                        this.facade.showProgressSpinner(ApplicationFacade.SPINNER_BOTTOM);
                        snrProxy.getRecommendations(this.facade.getCurrentUser(), Relegate.create(this, this.onRecommendationsReceived), Relegate.create(this, this.onRecommendationsError));
                    }
                    else if (this.getView().viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY)
                    {
                        if (this._currentSelectedHistoryProgramID)
                        {
                            this.facade.showProgressSpinner(ApplicationFacade.SPINNER_TOP);
                            snrProxy.getSimilarContent(
                                this._currentSelectedHistoryProgramID, 
                                Relegate.create(this, this.onSimilarContentReceived), 
                                Relegate.create(this, this.onSimilarContentError));
                        }
                    }
                }
                this.getView().showRecommendationsGrid();
            }
            else if (data.subViewToShow == AppConstants.RECS_SHOW_PROFILE)
            {
                if (this.getView().viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY)
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_TOP);
                else
                    this.facade.showProgressSpinner(ApplicationFacade.SPINNER_BOTTOM);
              
                if (snrProxy && refreshPage)
                {
                    this.updateTasteProfiles();
                }
                this.getView().showProfileVisualization();
            }
            else if (data.subViewToShow == AppConstants.RECS_SHOW_HISTORY)
            {
                this.showHistory(data.showView);
            }
        }
    }
});

