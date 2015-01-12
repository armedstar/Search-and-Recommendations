jingo.declare(
{
    require: 
    [
        "shared.view.component.BasePage"
    ],
    name: 'doppleganger.view.component.DGRecommendationsPage',
    as: function()
    {
        doppleganger.view.component.DGRecommendationsPage = function(divElem)
        {
            shared.view.component.BasePage.apply(this, [divElem]);
              this._isScrolling = false;
              this._isHistoryScrolling = false;
             this.divElem.addEventListener("touchstart", Relegate.create(this, this.onOverallTouch), false);
              
              this.centerSectionTitle = document.getElementById('centerSectionTitle');
              this.profileSeedVideoList = document.getElementById('profileSeedVideoList');
              this.profileSeedVideoListWrapper = document.getElementById('profileSeedVideoList_wrapper');
              this.recommendationsGridSection = document.getElementById('recommendationsGridContent');
              this.recommendationsVideoList = document.getElementById('recommendationsVideoList');
              this.recommendationsVideoListWrapper = document.getElementById('recommendationsVideoList_wrapper');
              this.profileVisualizationSection = document.getElementById('profileVisualizationContent');
              this.searchButton = document.getElementById('searchButton');
              this.searchInputField = document.getElementById('searchText');
              this.secretInputField = document.getElementById('secretInputField');
              this.searchArea = document.getElementById('searchArea');
              this.personalHistoryVideoList = document.getElementById('personalHistoryVideoList');
              this.personalHistoryVideoListWrapper = document.getElementById('personalHistoryVideoList_wrapper');

              this.searchResultsList = document.getElementById('searchResultsList');
              this.searchResultsListWrapper = document.getElementById('searchResultsList_wrapper');
              this.searchScrollList = new iScroll('searchResultsList', { hScroll : false, vScroll : true });
              
              this.onTileSelectedHandler = Relegate.create(this, this.onTileSelected);
              this.onHistoryTileSelectedHandler = Relegate.create(this, this.onHistoryTileSelected);
              
              this.profileVisualizationChart = document.getElementById('profileVisualizationChart');
              this.profileVisualizationChartWrapper = document.getElementById('profileVisualizationChart_wrapper');
              
              //search area
              this._searchAreaActive = false;
              $(this.searchButton).on('tap', Relegate.create(this, this.onSearchButtonClick));
              $(this.secretInputField).keyup(Relegate.create(this, this.onSecretInputFieldKeyUp));
              $(this.searchInputField).on('tap', Relegate.create(this, this.onSearchInputFieldClick));
              this.onSearchAreaClosedHandler = Relegate.create(this, this.onSearchAreaClosed);
              this.onSearchAreaOpenedHandler = Relegate.create(this, this.onSearchAreaOpened);
              this._searchResultItemTemplate = _.template($('#searchResult-template').html());
              
              //program info overlay
              this._infoOverlayActive = false;
              this.programInfoDialog = document.getElementById('programInfoDialog');
              this.programInfoDialog_closeButton = document.getElementById('programInfoDialog_closeButton');
              this.onProgramInfoDialogOpenedHandler = Relegate.create(this, this.onProgramInfoDialogOpened);
              this.onProgramInfoDialogClosedHandler = Relegate.create(this, this.onProgramInfoDialogClosed);
              $(this.programInfoDialog_closeButton).on('tap', Relegate.create(this, this.onProgramInfoDialogCloseButtonClick));
              
              
              $('.actionable').on('touchstart', function(event) { $(this).addClass('on');});
              $('.actionable').on('touchend', function(event) { $(this).removeClass('on');});
        }

        doppleganger.view.component.DGRecommendationsPage.prototype = new shared.view.component.BasePage;
        doppleganger.view.component.DGRecommendationsPage.prototype.parent = shared.view.component.BasePage.prototype;
        doppleganger.view.component.DGRecommendationsPage.prototype.constructor = doppleganger.view.component.DGRecommendationsPage;
              
        doppleganger.view.component.DGRecommendationsPage.THUMBS_UP = "thumbsUp";
        doppleganger.view.component.DGRecommendationsPage.THUMBS_DOWN = "thumbsDown";
        doppleganger.view.component.DGRecommendationsPage.SEARCH_INPUT_CHANGED = "searchInputChanged";
        doppleganger.view.component.DGRecommendationsPage.SEARCH_WITH_QUERY = "searchWithQuery";
        doppleganger.view.component.DGRecommendationsPage.TILE_SELECTED = "tileSelected";
        doppleganger.view.component.DGRecommendationsPage.HISTORY_TILE_SELECTED = "historyTileSelected";
        
        doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_WIDTH = 300;
        doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_HEIGHT = 300;
        doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_BAR_MAX_NAME_LENGTH = 17;
        
        doppleganger.view.component.DGRecommendationsPage.VIEW_MODE =
        {
            MODE_RECOMMENDATIONS: 0,
            MODE_HISTORY: 1
        };
        
        doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE =
        {
            MODE_GRID: 0,
            MODE_PROFILE: 1
        };
              
        doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_IMAGE = "images/pages/doppleganger/recommendations/placeholder_movie.png";
        doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_LARGE_IMAGE = "images/pages/doppleganger/recommendations/placeholder_lrg_movie.png";
        
        doppleganger.view.component.DGRecommendationsPage.prototype.viewMode = doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_RECOMMENDATIONS;
        doppleganger.view.component.DGRecommendationsPage.prototype.visualizationMode = doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID;
              
        doppleganger.view.component.DGRecommendationsPage.prototype._doPageEnter = function(data)
        {
            var refreshPage = data.refreshPage;
            
            if (refreshPage && this._searchAreaActive)
            {
                this._searchAreaActive = false;
                this.closeSearchArea();
            }
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype._refreshTitle = function()
        {
            var titleText = "";
            
            if (this.viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_RECOMMENDATIONS)
            {
                if (this.visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
                {
                    titleText = "RECOMMENDATIONS";
                }
                else if (this.visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
                {
                    titleText = "TASTE PROFILE";
                }
            }
            else if (this.viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY)
            {
                if (this.visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID)
                {
                    titleText = "SIMILAR";
                }
                else if (this.visualizationMode == doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE)
                {
                    titleText = "TASTE PROFILE COMPARISON";
                }
            }
            
            $(this.centerSectionTitle).text(titleText);
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype.onProgramInfoDialogCloseButtonClick = function()
        {
            $(this.programInfoDialog).hide(500, this.onProgramInfoDialogClosedHandler);
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.showProfileVisualization = function()
        {
            $(this.recommendationsGridSection).hide();
            $(this.profileVisualizationSection).show();
            
            this.visualizationMode = doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_PROFILE;
            
            this._refreshTitle();
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.showRecommendationsGrid = function()
        {                
            $(this.profileVisualizationSection).hide();
            $(this.recommendationsGridSection).show();
            
            this.visualizationMode = doppleganger.view.component.DGRecommendationsPage.VISUALIZATION_MODE.MODE_GRID;

            this._refreshTitle();
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onSearchInputFieldClick = function()
        {
              $(this.secretInputField).focus();
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onSecretInputFieldKeyUp = function(event)
        {
              if (event.keyCode == 13) {
                $(this.secretInputField).blur();
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.SEARCH_WITH_QUERY, { queryStr:  $(this.secretInputField).val() });
              }
              else
              {
                var curText = $(this.secretInputField).val();
                $(this.searchInputField).html(curText + '_');
              
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.SEARCH_INPUT_CHANGED, {value : curText});
              }
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onSearchButtonClick = function()
        {
              this._searchAreaActive = !this._searchAreaActive;
              if (this._searchAreaActive)
                this.openSearchArea();
              else
                this.closeSearchArea();
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onOverallTouch = function(event)
        {
              if (event.touches.length == 1)
              {
                if (!this._infoOverlayActive && this._searchAreaActive && !isTouchWithinElement(event.touches[0].screenX, event.touches[0].screenY, this.searchArea))
                {
                    this._searchAreaActive = false;
                    this.closeSearchArea();
                }
              }
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onProgramInfoDialogClosed = function()
        {
              this._infoOverlayActive = false;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.showHistory = function(show)
        {
            if (show)
            {
                if (this._searchAreaActive)
                {
                    this._searchAreaActive = false;
                    this.closeSearchArea();
                }
                $(this.divElem).animate({ top: '-=300'}, 500);
                this.viewMode = doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY;
            }
            else
            {
                $(this.divElem).animate({ top: '+=300'}, 500);
                this.viewMode = doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_RECOMMENDATIONS;
            }
            
            this._refreshTitle();
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype.openSearchArea = function()
        {
              $(this.searchArea).show();
              $(this.searchButton).addClass('active');
              $(this.searchArea).animate({ left: '-=269' }, 500, this.onSearchAreaOpenedHandler);
              $(this.searchButton).animate( {left: '-=269' }, 500);
              $(this.searchInputField).html('_');
              $(this.secretInputField).focus();
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.closeSearchArea = function()
        {
            $(this.secretInputField).blur();
            this.clearSearchAreaContent();
            $(this.searchButton).removeClass('active');
              $(this.searchButton).animate({ left: '+=269' }, 500);
            $(this.searchArea).animate({left: '+=269'}, 500, this.onSearchAreaClosedHandler);
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onSearchAreaOpened = function()
        {
              this._searchAreaActive = true;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onSearchAreaClosed = function()
        {
              $(this.secretInputField).blur();
              $(this.searchArea).hide();
              this._searchAreaActive = false;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.clearSearchAreaContent = function()
        {
              $(this.secretInputField).val('');
              $(this.searchInputField).empty();
              $(this.searchResultsListWrapper).empty();
        }

        doppleganger.view.component.DGRecommendationsPage.prototype.showSearchSuggestions = function(suggestions)
        {
              
            $(this.searchResultsListWrapper).empty();
              

            if (suggestions)
            {
              for (var i = 0; i < suggestions.length; i++)
              {
                var suggestionDiv = $('<div class="searchSuggestionItem"></div>');
                $(suggestionDiv).html(suggestions[i].queryText);
                $(suggestionDiv).on('tap', Relegate.create(this, this.onSearchSuggestionClick));
                $(suggestionDiv).on('touchstart', function(event) { $(this).addClass('on');});
                $(suggestionDiv).on('touchend', function(event) { $(this).removeClass('on');});
                $(this.searchResultsListWrapper).append(suggestionDiv);
              }
            }
              
              $(this.searchResultsListWrapper).css('height', (suggestions.length * 68 + 28) + "px");
              this.searchScrollList.refresh();
               
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.showSearchResults = function(results)
        {
              
            $(this.searchResultsListWrapper).empty();

            if (results)
            {
                var top = 0;
                for (var i = 0; i < results.length; i++)
                {
                    var result = results[i];

                    var infoStr = '';
                    if (result.releaseYear) infoStr += result.releaseYear + '<br>';
                    infoStr += '<span style="color: #4C4C4C;">Genre: </span>';
                    if (result.genre) infoStr += result.genre;
                    infoStr += '<br/><span style="color: #4C4C4C;">Director: </span>' + result.director + '<br/>';
                    infoStr += '<span style="color: #4C4C4C;">Cast: </span>' + result.cast + '<br/>';

                    var model = 
                    {
                        programId: result.id,
                        title: result.title,
                        programIconImgSrc: result.programIconImgSrc,
                        info: infoStr,
                        preferenceState: result.preferenceState
                    };

                    var resultDiv = $('<div class="searchResultItem"></div>');
                    $(resultDiv).css('top', top + "px");
                    $(resultDiv).html(this._searchResultItemTemplate(model));
                    
                    var overlayDiv = $(resultDiv).find("#" + result.id + "_searchOverlay");
                    if (result.preferenceState == ContentPreferenceStateConstants.PREFERENCE_STATE_LIKE)
                    {
                        overlayDiv.append('<img style="position:absolute;width:80px;height:120px;" src="images/pages/doppleganger/recommendations/thumbs_up_sml_overlay.png" />');
                    }
                    else if (result.preferenceState == ContentPreferenceStateConstants.PREFERENCE_STATE_DISLIKE)
                    {
                        overlayDiv.append('<img style="position:absolute;width:80px;height:120px;" src="images/pages/doppleganger/recommendations/thumbs_down_sml_overlay.png" />');
                    }

                    $(this.searchResultsListWrapper).append(resultDiv);
                    
                    var searchMediaDiv = $(resultDiv).find('.searchMedia');
                    searchMediaDiv.get(0).programBrief = 
                        new shared.model.ProgramBrief(     
                            result.id,
                            result.type,
                            result.title,
                            null,
                            null,
                            null,
                            null,
                            null,
                            result.programIconImgSrc,
                            null,
                            result.preferenceState);
                    searchMediaDiv.mousedown(Relegate.create(this, this.onTileMouseDown));
                    searchMediaDiv.on('tap', this.onTileSelectedHandler);
                    top += 164;
                }
            }

            $(this.searchResultsListWrapper).css('height', (results.length * 164 + 100) + "px");
            this.searchScrollList.refresh();

              $( ".searchMedia" ).draggable({ containment: "parent", axis: "y", revert: true, start: Relegate.create(this, this.onStartDraggingSearchTile), stop: Relegate.create(this, this.onStopDraggingSearchTile) });
               
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onSearchSuggestionClick = function(event)
        {
              var suggestionDiv = event.target;
              var searchQuery = $(suggestionDiv).html();
              $(this.secretInputField).val(searchQuery);
              $(this.searchInputField).html(searchQuery + "_");
              $(this.secretInputField).blur();
              this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.SEARCH_WITH_QUERY, { queryStr: searchQuery });
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.createProfileSeedTile = function(programBrief)
        {
            var tileDiv = jQuery('<div class="draggable"></div>');

            var upDownDiv = jQuery('<img style="position:absolute;top:26px;" src="images/pages/doppleganger/recommendations/poster_bg_up_down.png"/>');
            $(tileDiv).append(upDownDiv);

            var tileImage = 
                (isEmptyString(programBrief.programIconImgSrc)) ?
                    doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_IMAGE : 
                    programBrief.programIconImgSrc;


            var mediaDiv = jQuery('<div id="' + programBrief.id + '" class="media" style="position:absolute;top:26px;z-index:99;"></div>');
            mediaDiv.get(0).programBrief = programBrief;
            
            var onErrorHandler = function() 
                { 
                    this.src = doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_IMAGE;
                    var parentNode = $(this.parentNode);
                    parentNode.children('.programTitleOverlay').show();
                };
            var imageElement = jQuery('<img src="' + tileImage + '" />');
            imageElement.on("error", onErrorHandler);
            $(mediaDiv).append(imageElement);
            
            $(mediaDiv).append('<div class="programTitleOverlay" style="' + ((isEmptyString(programBrief.programIconImgSrc)) ? 'display:inline-block' : 'display:none') + '">' + programBrief.title + '</div>');

            var overlayDiv = jQuery('<div id="' + programBrief.id + '_overlay" style="position:absolute;top:26px;z-index:999;"></div>');
            if (programBrief.preferenceState == ContentPreferenceStateConstants.PREFERENCE_STATE_LIKE)
            {
                overlayDiv.append('<img style="position:absolute;top:-26px;" src="images/pages/doppleganger/recommendations/thumbs_up_overlay.png" />');
            }
            else if (programBrief.preferenceState == ContentPreferenceStateConstants.PREFERENCE_STATE_DISLIKE)
            {
                overlayDiv.append('<img style="position:absolute;top:-26px;" src="images/pages/doppleganger/recommendations/thumbs_down_overlay.png" />');
            }

            mediaDiv.append(overlayDiv);

            $(mediaDiv).mousedown(Relegate.create(this, this.onTileMouseDown));
            $(mediaDiv).on('tap', this.onTileSelectedHandler);
            $(tileDiv).append(mediaDiv);

            return tileDiv;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.createRecommendationsTile = function(programBrief, tileDiv, position)
        {
            var tileImage =
                (isEmptyString(programBrief.programIconImgSrc)) ? 
                    doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_IMAGE : 
                    programBrief.programIconImgSrc;

            var mediaDiv = jQuery('<div id="' + programBrief.id + '" class="recTile_' + position + ' media"></div>');

            var onErrorHandler = function() 
                { 
                    this.src = doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_IMAGE;
                    var parentNode = $(this.parentNode);
                    parentNode.children('.programTitleOverlay').show();
                };
            var imageElement = jQuery('<img src="' + tileImage + '" />');
            imageElement.error(onErrorHandler);
            $(mediaDiv).append(imageElement);
            
            $(mediaDiv).append('<div class="programTitleOverlay" style="' + ((isEmptyString(programBrief.programIconImgSrc)) ? 'display:inline-block' : 'display:none') + '">' + programBrief.title + '</div>');
            
            var overlayDiv = jQuery('<div id="' + programBrief.id + '_overlay" style="z-index:999;"></div>');
            if (SHOW_NEW_RECOMMENDATIONS_FLAG && programBrief.isNew)
            {
                overlayDiv.append('<img style="position:absolute;width:100px;height:150px;" src="images/pages/doppleganger/recommendations/new_overlay.png" />');
            }

            mediaDiv.append(overlayDiv);

            $(tileDiv).append(mediaDiv);
            $(mediaDiv).on('tap', this.onTileSelectedHandler);
            return tileDiv;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.showProgramInfoDialog = function(programBrief)
        {
              if (programBrief)
              {
                var tileImage =
                    (isEmptyString(programBrief.largeProgramImage)) ?
                    doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_LARGE_IMAGE :
                    programBrief.largeProgramImage;
                       
                $('#programInfoDialog_title').html(programBrief.title);    
                    
                var onErrorHandler = function() 
                    { 
                        this.src = doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_LARGE_IMAGE;
                        var parentNode = $(this.parentNode);
                        parentNode.children('.large_programTitleOverlay').show();
                    };
                var imageElement = jQuery('<img src="' + tileImage + '" />');
                imageElement.error(onErrorHandler);
                
                var programBoxArtElement = $('#programInfoDialog_programBoxArt');
                programBoxArtElement.html("");
                programBoxArtElement.append(imageElement);
                programBoxArtElement.append('<div class="large_programTitleOverlay" style="' + ((isEmptyString(programBrief.largeProgramImage)) ? 'display:inline-block' : 'display:none') + '">' + programBrief.title + '</div>');
              
                var runtimeYearRating = '';
                if (programBrief.runtime) runtimeYearRating += programBrief.runtime + 'min / ';
                if (programBrief.year) runtimeYearRating += programBrief.year; //+ ' / ';
                //if (programBrief.parentalRating) runtimeYearRating += programBrief.parentalRating;
                $('#programInfoDialog_runtimeYearRating').html(runtimeYearRating);
              
                var synopsis = programBrief.synopsis;
              
                $('#programInfoDialog_synopsis').html(programBrief.synopsis);
              
                var genreCastCrew = '';
                if (programBrief.genre) genreCastCrew += '<span style="color: #4C4C4C;">Genre:</span> ' + programBrief.genre + '<br>';
                if (programBrief.director) genreCastCrew += '<span style="color: #4C4C4C;">Director:</span> ' + programBrief.director + '<br>';
                if (programBrief.cast) genreCastCrew += '<span style="color: #4C4C4C;">Cast:</span> ' + programBrief.cast + '<br>';
              
                $('#programInfoDialog_castCrew').html(genreCastCrew);
              
                $(this.programInfoDialog).show(500, this.onProgramInfoDialogOpenedHandler);
              }
        }
              
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onTileSelected = function(event)
        {
              if (!this._infoOverlayActive) {
                var selTile = event.currentTarget;
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.TILE_SELECTED, { id: selTile.id });
              }
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onProgramInfoDialogOpened = function()
        {
              this._infoOverlayActive = true;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onTileMouseDown = function(event)
        {
              //prevent double event propagation on device.
              event.stopPropagation();
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype.onScrollStart = function(args)
        {
              this._isScrolling = true;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onScrollComplete = function(args)
        {
              this._isScrolling = false;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onStartDraggingSearchTile = function(event, ui)
        {
              this.searchScrollList.disable();
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onStopDraggingSearchTile = function(event, ui)
        {
            var yPos = ui.position.top;
            var tileId = ui.helper[0].id;
            var programBrief = ui.helper[0].programBrief;
            
            console.log('Tile: ' + tileId + " " + yPos);

            if (yPos <= 0)
            {
                //thumbs up
                $('#' + tileId + '_searchOverlay').empty();
                $('#' + tileId + '_searchOverlay').append('<img style="position:absolute;width:80px;height:120px;" src="images/pages/doppleganger/recommendations/thumbs_up_sml_overlay.png" />');
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.THUMBS_UP, { programId: tileId, programBrief: programBrief });
            }

            if (yPos >= 40)
            {
                //thumbs down
                $('#' + tileId + '_searchOverlay').empty();
                $('#' + tileId + '_searchOverlay').append('<img style="position:absolute;width:80px;height:120px;" src="images/pages/doppleganger/recommendations/thumbs_down_sml_overlay.png" />');
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.THUMBS_DOWN, { programId: tileId, programBrief: programBrief });
            }

            this.searchScrollList.enable();
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onStopDraggingSeedTile = function(event, ui)
        {
            var yPos = ui.position.top;
            var xPos = ui.position.left;
              
            var tileId = ui.helper[0].id;
            var programBrief = ui.helper[0].programBrief;

            if ((yPos <= 0) && (Math.abs(xPos) <= 7))  //JA: adding allowance of horizontal movement...a little more forgiving.
            {
                //thumbs up
                $('#' + tileId + '_overlay').empty();
                $('#' + tileId + '_overlay').append('<img style="position:absolute;top:-26px;" src="images/pages/doppleganger/recommendations/thumbs_up_overlay.png" />');
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.THUMBS_UP, { programId: tileId, programBrief: programBrief });
            }
          
            if ((yPos >= 52) && (Math.abs(xPos) <= 7))
            {
                //thumbs down
                $('#' + tileId + '_overlay').empty();
                $('#' + tileId + '_overlay').append('<img style="position:absolute;top:-26px;" src="images/pages/doppleganger/recommendations/thumbs_down_overlay.png" />');
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.THUMBS_DOWN, { programId: tileId, programBrief: programBrief });
            } 
        }
              
              
        doppleganger.view.component.DGRecommendationsPage.prototype.setRecommendedTitles = function(recsData)
        {
              $(this.recommendationsVideoListWrapper).empty();
              $(this.recommendationsVideoList).iosSlider('destroy');
              if (recsData)
              {
                var recTileDiv = null;
                for (var i = 0; i < recsData.length; i++)
                {
                    var progBrief = recsData[i];
                    if ((i % 2) == 0)
                    {
                        //even, start new col
                        recTileDiv = jQuery('<div class="recommendationsTile"></div>');
                        $(this.recommendationsVideoListWrapper).append(recTileDiv);
                        this.createRecommendationsTile(progBrief, recTileDiv, "top");
                    }
                    else
                    {
                        //odd, add to existing col
                        this.createRecommendationsTile(progBrief, recTileDiv, "bottom");
                    }
                    
                }
              }
              
              
                $(this.recommendationsVideoList).iosSlider({
                                        desktopClickDrag: true,
                                        snapToChildren: true,
                                        });
              
        }
              
              
        doppleganger.view.component.DGRecommendationsPage.prototype.setSeedTitles = function(seedData)
        {
            $(this.profileSeedVideoListWrapper).empty();
            $(this.profileSeedVideoList).iosSlider('destroy');
            if (seedData)
            {
                for (var i = 0; i < seedData.length; i++)
                {
                    var progBrief = seedData[i];
                    $(this.profileSeedVideoListWrapper).append(this.createProfileSeedTile(progBrief));
                }
            }

            $(this.profileSeedVideoList).iosSlider(
                {
                    desktopClickDrag: true,
                    snapToChildren: true,
                    onSlideStart: Relegate.create(this, this.onScrollStart),
                    onSlideComplete: Relegate.create(this, this.onScrollComplete)
                });

            $( ".media" ).draggable({ containment: "parent", axis: "y", revert: true, stop: Relegate.create(this, this.onStopDraggingSeedTile) });
            
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype.setSimilarContent = function(similarData)
        {
            $(this.recommendationsVideoListWrapper).empty();
            $(this.recommendationsVideoList).iosSlider('destroy');
            if (similarData)
            {
                var recTileDiv = null;
                for (var i = 0; i < similarData.length; i++)
                {
                    var progBrief = similarData[i];
                    if ((i % 2) == 0)
                    {
                        //even, start new col
                        recTileDiv = jQuery('<div class="recommendationsTile"></div>');
                        $(this.recommendationsVideoListWrapper).append(recTileDiv);
                        this.createRecommendationsTile(progBrief, recTileDiv, "top");
                    }
                    else
                    {
                        //odd, add to existing col
                        this.createRecommendationsTile(progBrief, recTileDiv, "bottom");
                    }
                }
            }

            $(this.recommendationsVideoList).iosSlider({
                desktopClickDrag: true,
                snapToChildren: true,
                });
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.setTasteProfiles = function(userProfileData, itemProfileData)
        {
            $(this.profileVisualizationChartWrapper).empty();
            $(this.profileVisualizationChart).iosSlider('destroy');
            
            var tasteProfileGraphsDiv = jQuery('<div id="profileVisualizationContent_tasteProfileGraphs"></div>');
            $(this.profileVisualizationChartWrapper).append(tasteProfileGraphsDiv);
            
            this.tasteProfileGraphs = d3.select("#profileVisualizationContent_tasteProfileGraphs");
            
            var tasteeData = new Array();
            var tasteeKeys = {};
            var currentCategory = -1;
            var scoreRangeObj = 
                { 
                    minUserTasteScore: -1, 
                    maxUserTasteScore: 0, 
                    minItemTasteScore: -1, 
                    maxItemTasteScore: 0 
                };
            
            var addedTasteeBars = this._processProfileData(
                userProfileData, 
                itemProfileData, 
                shared.model.Tastee.CATEGORY_TYPE.GENRE, 
                scoreRangeObj, 
                tasteeKeys, 
                tasteeData);
            
            addedTasteeBars = this._processProfileData(
                userProfileData, 
                itemProfileData, 
                shared.model.Tastee.CATEGORY_TYPE.SUBJECT, 
                scoreRangeObj, 
                tasteeKeys, 
                tasteeData);
            
            addedTasteeBars = this._processProfileData(
                userProfileData, 
                itemProfileData, 
                shared.model.Tastee.CATEGORY_TYPE.STYLE, 
                scoreRangeObj, 
                tasteeKeys, 
                tasteeData);
              
            addedTasteeBars = this._processProfileData(
                userProfileData, 
                itemProfileData, 
                shared.model.Tastee.CATEGORY_TYPE.THEME, 
                scoreRangeObj, 
                tasteeKeys, 
                tasteeData);
            
            addedTasteeBars = this._processProfileData(
                userProfileData, 
                itemProfileData, 
                shared.model.Tastee.CATEGORY_TYPE.QUALITY, 
                scoreRangeObj, 
                tasteeKeys, 
                tasteeData);
            
            addedTasteeBars = this._processProfileData(
                userProfileData, 
                itemProfileData, 
                shared.model.Tastee.CATEGORY_TYPE.MOOD, 
                scoreRangeObj, 
                tasteeKeys, 
                tasteeData);
            
            addedTasteeBars = this._processProfileData(
                userProfileData, 
                itemProfileData, 
                shared.model.Tastee.CATEGORY_TYPE.MISC, 
                scoreRangeObj, 
                tasteeKeys, 
                tasteeData);
                
            var maxUserTasteScore = scoreRangeObj.maxUserTasteScore;
            var minUserTasteScore = scoreRangeObj.minUserTasteScore;
            var minItemTasteScore = scoreRangeObj.minItemTasteScore;
            var maxItemTasteScore = scoreRangeObj.maxItemTasteScore;
            
            
            //adding bars denoting tastee categories
            this.tasteProfileGraphs.selectAll("#tasteeCategoryNames")
                .data(tasteeData)
                .enter()
                .append("p")
                .attr("id", "tasteeCategoryNames")
                .style(
                    "left", 
                    function(tasteeDataSet, i)
                    {
                        return ((i * (doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_WIDTH - 264)) + 12) + "px";
                    })
                .style(
                    "bottom", 
                    function(tasteeDataSet, i)
                    {
                        return doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_HEIGHT - 513 + "px";
                    })
                .attr(
                    "class", 
                    Relegate.create(
                        this, 
                        function(tasteeDataKey)
                        {   
                            var tasteeCategory = (tasteeDataKey && tasteeKeys[tasteeDataKey]) ? tasteeKeys[tasteeDataKey].tasteeCategory : null;
                            var styleClass = (tasteeCategory) ? tasteeCategory.styleClass : "";
                            return styleClass;
                        },
                        this))
                .append("p")
                .attr("id", "tasteeCategoryNameText")
                .text(
                    function(tasteeDataKey)
                    {
                        var tasteeCategory = (tasteeDataKey && tasteeKeys[tasteeDataKey]) ? tasteeKeys[tasteeDataKey].tasteeCategory : null;
                        var name = (tasteeCategory) ? tasteeCategory.categoryName : "";
                        return name;
                    });
                
            //adding bars based on user taste data
            this.tasteProfileGraphs.selectAll("#userTasteProfileData")
                .data(tasteeData)
                .enter()
                .append("div")
                .attr("id", "userTasteProfileData")
                .attr(
                    "class", 
                    Relegate.create(
                        this, 
                        function(tasteeDataKey)
                        {   
                            var tastee = (tasteeDataKey && tasteeKeys[tasteeDataKey]) ? tasteeKeys[tasteeDataKey].userTastee : null;
                            return this._formatUserProfileBarClass(tastee);
                        },
                        this))
                .style(
                    "left", 
                    function(tasteeDataSet, i)
                    {
                        return i * (doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_WIDTH - 264) + "px";
                    })
                .style(
                    "bottom", 
                    function(tasteeDataSet, i)
                    {
                        return doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_HEIGHT - 520 + "px";
                    })
                .style(
                    "height", 
                    Relegate.create(
                        this, 
                        function(tasteeDataKey)
                        {
                            var tastee = (tasteeDataKey && tasteeKeys[tasteeDataKey]) ? tasteeKeys[tasteeDataKey].userTastee : null;
                            return this._determineProfileBarHeight(((tastee) ? tastee.score : 0), maxUserTasteScore, minUserTasteScore);
                        },
                        this));
                    
            //adding bars based on item taste data
            this.tasteProfileGraphs.selectAll("#itemTasteProfileData")
                .data(tasteeData)
                .enter()
                .append("div")
                .attr("id", "itemTasteProfileData")
                .attr(
                    "class", 
                    Relegate.create(
                        this, 
                        function(tasteeDataKey)
                        {   
                            var tastee = (tasteeDataKey && tasteeKeys[tasteeDataKey]) ? tasteeKeys[tasteeDataKey].itemTastee : null;
                            return this._formatItemProfileBarClass(tastee);
                        },
                        this))
                .style(
                    "left", 
                    function(tasteeDataSet, i)
                    {
                        return ((i * (doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_WIDTH - 264)) + 12) + "px";
                    })
                .style(
                    "bottom", 
                    function(tasteeDataSet, i)
                    {
                        return doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_HEIGHT - 520 + "px";
                    })
                .style(
                    "height", 
                    Relegate.create(
                        this, 
                        function(tasteeDataKey)
                        {
                            var tastee = (tasteeDataKey && tasteeKeys[tasteeDataKey]) ? tasteeKeys[tasteeDataKey].itemTastee : null;
                            return this._determineProfileBarHeight(((tastee) ? tastee.score : 0), maxItemTasteScore, minItemTasteScore);
                        },
                        this));
                    
            this.tasteProfileGraphs.selectAll("#tasteeNames")
                .data(tasteeData)
                .enter()
                .append("p")
                .attr("id", "tasteeNames")
                .style(
                    "left", 
                    function(tasteeDataSet, i)
                    {
                        return i * (doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_WIDTH - 264) + "px";
                    })
                .style(
                    "top", 
                    function(tasteeDataSet, i)
                    {
                        return doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_GRAPH_HEIGHT - 110 + "px";
                    })
                .append("p")
                .attr("id", "tasteeNameText")
                .text(
                    function(tasteeDataKey)
                    {
                        var tastee = 
                            (tasteeDataKey && tasteeKeys[tasteeDataKey]) ? 
                                (tasteeKeys[tasteeDataKey].userTastee || tasteeKeys[tasteeDataKey].itemTastee) : 
                                null;
                        var name = (tastee) ? tastee.name : "";
                        if (name.length > doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_BAR_MAX_NAME_LENGTH)
                        {
                            name = name.substring(0, (doppleganger.view.component.DGRecommendationsPage.TASTE_PROFILE_BAR_MAX_NAME_LENGTH - 3)) + "...";
                        }
                        return name;
                    });
              
              //HACK (JA):  Adding a shim for each tastee to allow for full scrolling of profile graphs div.
              //This is some issue with D3 and iosScroller.  Need to break this down and fix properly.
              
              for (var i = 0; i < tasteeData.length; i++)
              {
                var shimDiv = jQuery('<div class="visualizationShim"></div>');
                $(this.profileVisualizationChartWrapper).append(shimDiv);
              }
              
            $(this.profileVisualizationChart).iosSlider(
                {
                    desktopClickDrag: true,
                    snapToChildren: false
                });
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype._addTasteeCategoryBarData = function(
                category, 
                tasteeKeys,
                tasteeData)
        {    
            if (category != shared.model.Tastee.CATEGORY_TYPE.UNKNOWN)
            {
                if (category == shared.model.Tastee.CATEGORY_TYPE.GENRE)
                {
                    categoryKey = "tasteeCategoryBarData_genre";
                    tasteeCategoryObj = { categoryName: "GENRE", styleClass: "tasteeCategoryBarData_genre" };
                }
                else if (category == shared.model.Tastee.CATEGORY_TYPE.SUBJECT)
                {
                    categoryKey = "tasteeCategoryBarData_subject";
                    tasteeCategoryObj = { categoryName: "SUBJECT", styleClass: "tasteeCategoryBarData_subject" };
                }
                else if (category == shared.model.Tastee.CATEGORY_TYPE.STYLE)
                {
                    categoryKey = "tasteeCategoryBarData_style";
                    tasteeCategoryObj = { categoryName: "STYLE", styleClass: "tasteeCategoryBarData_style" };
                }
                else if (category == shared.model.Tastee.CATEGORY_TYPE.THEME)
                {
                    categoryKey = "tasteeCategoryBarData_theme";
                    tasteeCategoryObj = { categoryName: "THEME", styleClass: "tasteeCategoryBarData_theme" };
                }
                else if (category == shared.model.Tastee.CATEGORY_TYPE.QUALITY)
                {
                    categoryKey = "tasteeCategoryBarData_quality";
                    tasteeCategoryObj = { categoryName: "QUALITY", styleClass: "tasteeCategoryBarData_quality" };
                }
                else if (category == shared.model.Tastee.CATEGORY_TYPE.MOOD)
                {
                    categoryKey = "tasteeCategoryBarData_mood";
                    tasteeCategoryObj = { categoryName: "MOOD", styleClass: "tasteeCategoryBarData_mood" };
                }
                else if (category == shared.model.Tastee.CATEGORY_TYPE.MISC)
                {
                    categoryKey = "tasteeCategoryBarData_misc";
                    tasteeCategoryObj = { categoryName: "MISC.", styleClass: "tasteeCategoryBarData_misc" };
                }
                
                if (categoryKey && tasteeCategoryObj)
                {
                    tasteeData.push(categoryKey);
                    tasteeKeys[categoryKey] = 
                    { 
                        userTastee: null,
                        itemTastee: null,
                        tasteeCategory: tasteeCategoryObj
                    };
                }
            }
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype._processProfileData = function(
                userProfileData,
                itemProfileData,
                currentCategory, 
                scoreRangeObject,
                tasteeKeys,
                tasteeData)
        {
            var addedTasteeBars = false;
            
            for (var i = 0; (userProfileData) && (i < userProfileData.length); i++)
            {
                var tastee = userProfileData[i];
                if (
                    (tastee.category != shared.model.Tastee.CATEGORY_TYPE.UNKNOWN) && 
                    !isEmptyString(tastee.name))
                {
                    if (!tasteeKeys[tastee.fullName])
                    {
                        if ((currentCategory > 0) && (currentCategory == tastee.category))
                        {
                            if (!addedTasteeBars)
                            {
                                this._addTasteeCategoryBarData(currentCategory, tasteeKeys, tasteeData);
                            }
                        
                            addedTasteeBars = true;
                            
                            tasteeData.push(tastee.fullName);
                            
                            if (tastee.score > scoreRangeObject.maxUserTasteScore)
                            {
                                scoreRangeObject.maxUserTasteScore = tastee.score;
                            }
                            if ((scoreRangeObject.minUserTasteScore < 0) || (tastee.score < scoreRangeObject.minUserTasteScore))
                            {
                                scoreRangeObject.minUserTasteScore = tastee.score;
                            }
                            
                            tasteeKeys[tastee.fullName] = 
                                { 
                                    userTastee: tastee,
                                    itemTastee: null,
                                    tasteeCategory: null
                                };
                        }
                    }
                }
            }
            
            for (var i = 0; (itemProfileData) && (i < itemProfileData.length); i++)
            {
                var tastee = itemProfileData[i];
                if (
                    (tastee.category != shared.model.Tastee.CATEGORY_TYPE.UNKNOWN) && 
                    !isEmptyString(tastee.name))
                {
                    var tasteeDataSet = tasteeKeys[tastee.fullName];
                   
                    if (!tasteeDataSet)
                    {
                        if ((currentCategory > 0) && (currentCategory == tastee.category))
                        {
                            if (!addedTasteeBars)
                            {
                                this._addTasteeCategoryBarData(currentCategory, tasteeKeys, tasteeData);
                            }
                            
                            addedTasteeBars = true;
                            
                            tasteeData.push(tastee.fullName);
                            
                            if (tastee.score > scoreRangeObject.maxItemTasteScore)
                            {
                                scoreRangeObject.maxItemTasteScore = tastee.score;
                            }
                            if ((scoreRangeObject.minItemTasteScore < 0) || (tastee.score < scoreRangeObject.minItemTasteScore))
                            {
                                scoreRangeObject.minItemTasteScore = tastee.score;
                            }
                            
                            tasteeKeys[tastee.fullName] = 
                                { 
                                    userTastee: null,
                                    itemTastee: tastee,
                                    tasteeCategory: null
                                };
                        }
                    }
                    else
                    {   
                        if (tastee.score > scoreRangeObject.maxItemTasteScore)
                        {
                            scoreRangeObject.maxItemTasteScore = tastee.score;
                        }
                        if ((scoreRangeObject.minItemTasteScore < 0) || (tastee.score < scoreRangeObject.minItemTasteScore))
                        {
                            scoreRangeObject.minItemTasteScore = tastee.score;
                        }
                        
                        tasteeDataSet.itemTastee = tastee;
                    }
                }
            }
            
            return addedTasteeBars;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype._determineProfileBarHeight = function(tasteeScore, maxScore, minScore)
        {   
            var normalizedScore = tasteeScore;
            
            if (normalizedScore > 0 && maxScore > 0 && minScore > 0)
            {
                var scoreRange = maxScore - minScore;
                var distanceFromMin = (normalizedScore - minScore);
                normalizedScore = distanceFromMin / scoreRange;
            }
            
            var graphBarHeight = (normalizedScore * 211);
            if (tasteeScore > 0)
            {
                //  give visual baseline for the items at the bottom of the range
                graphBarHeight += 10;
            }
            
            return graphBarHeight + "px";
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype._formatUserProfileBarClass = function(tastee)
        {
            var tasteeClasses = "tasteeGraphBar_user";
                    
            if (tastee)
            {
                if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.GENRE)
                {
                    tasteeClasses += " tasteeGraphBar_genre";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.SUBJECT)
                {
                    tasteeClasses += " tasteeGraphBar_subject";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.STYLE)
                {
                    tasteeClasses += " tasteeGraphBar_style";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.THEME)
                {
                    tasteeClasses += " tasteeGraphBar_theme";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.QUALITY)
                {
                    tasteeClasses += " tasteeGraphBar_quality";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.MOOD)
                {
                    tasteeClasses += " tasteeGraphBar_mood";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.MISC)
                {
                    tasteeClasses += " tasteeGraphBar_misc";
                }
                
                if (this.viewMode == doppleganger.view.component.DGRecommendationsPage.VIEW_MODE.MODE_HISTORY)
                {
                    tasteeClasses += " tasteeGraphBar_background";
                }
            }
            
            return tasteeClasses;
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype._formatItemProfileBarClass = function(tastee)
        {
            var tasteeClasses = "tasteeGraphBar_item";
                    
            if (tastee)
            {
                if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.GENRE)
                {
                    tasteeClasses += " tasteeGraphBar_genre";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.SUBJECT)
                {
                    tasteeClasses += " tasteeGraphBar_subject";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.STYLE)
                {
                    tasteeClasses += " tasteeGraphBar_style";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.THEME)
                {
                    tasteeClasses += " tasteeGraphBar_theme";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.QUALITY)
                {
                    tasteeClasses += " tasteeGraphBar_quality";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.MOOD)
                {
                    tasteeClasses += " tasteeGraphBar_mood";
                }
                else if (tastee.category == shared.model.Tastee.CATEGORY_TYPE.MISC)
                {
                    tasteeClasses += " tasteeGraphBar_misc";
                }
            }
            
            return tasteeClasses;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype._createPersonalHistoryTile = function(programBrief)
        {
            var tileDiv = jQuery('<div class="draggable"></div>');
            //var tileDiv = jQuery('<div></div>');

            var tileImage = 
                (isEmptyString(programBrief.programIconImgSrc)) ?
                    doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_IMAGE : 
                    programBrief.programIconImgSrc;

            var mediaDiv = jQuery('<div id="' + programBrief.id + '" class="historyMedia" style="position:absolute;top:26px;z-index:99;"></div>');
            
            var onErrorHandler = function() 
                { 
                    this.src = doppleganger.view.component.DGRecommendationsPage.PLACEHOLDER_IMAGE;
                    var parentNode = $(this.parentNode);
                    parentNode.children('.programTitleOverlay').show();
                };
            var imageElement = jQuery('<img src="' + tileImage + '" />');
            imageElement.error(onErrorHandler);
            $(mediaDiv).append(imageElement);
            
            $(mediaDiv).append('<div class="programTitleOverlay" style="' + ((isEmptyString(programBrief.programIconImgSrc)) ? 'display:inline-block' : 'display:none') + '">' + programBrief.title + '</div>');
            
            var overlayDiv = jQuery('<div id="history_' + programBrief.id + '_overlay" style="position:absolute;top:26px;z-index:999;"></div>');
            if (programBrief.preferenceState == ContentPreferenceStateConstants.PREFERENCE_STATE_LIKE)
            {
                overlayDiv.append('<img style="position:absolute;top:-26px;" src="images/pages/doppleganger/recommendations/thumbs_up_overlay.png" />');
            }
            else if (programBrief.preferenceState == ContentPreferenceStateConstants.PREFERENCE_STATE_DISLIKE)
            {
                overlayDiv.append('<img style="position:absolute;top:-26px;" src="images/pages/doppleganger/recommendations/thumbs_down_overlay.png" />');
            }

            mediaDiv.append(overlayDiv);

            $(mediaDiv).mousedown(Relegate.create(this, this.onTileMouseDown));
            $(mediaDiv).on('tap', this.onHistoryTileSelectedHandler);
            $(tileDiv).append(mediaDiv);

            return tileDiv;
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype.setHistoryTitles = function(historyData)
        {
            $(this.personalHistoryVideoListWrapper).empty();
            $(this.personalHistoryVideoList).iosSlider('destroy');
            if (historyData)
            {
                for (var i = 0; i < historyData.length; i++)
                {
                    var progBrief = historyData[i];
                    $(this.personalHistoryVideoListWrapper).append(this._createPersonalHistoryTile(progBrief));
                }
            }

            $(this.personalHistoryVideoList).iosSlider(
                {
                    desktopClickDrag: true,
                    snapToChildren: true,
                    onSlideStart: Relegate.create(this, this.onHistoryScrollStart),
                    onSlideComplete: Relegate.create(this, this.onHistoryScrollComplete)
                });
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype.onHistoryScrollStart = function(args)
        {
              this._isHistoryScrolling = true;
        }
              
        doppleganger.view.component.DGRecommendationsPage.prototype.onHistoryScrollComplete = function(args)
        {
              this._isHistoryScrolling = false;
        }
        
        doppleganger.view.component.DGRecommendationsPage.prototype.onHistoryTileSelected = function(event)
        {
            if (!this._infoOverlayActive) 
            {
                var selTile = event.currentTarget;
                $('.historyItemSelected').remove();
                $(selTile).append('<div class="historyItemSelected"></div>');
                this.dispatchEvent(doppleganger.view.component.DGRecommendationsPage.HISTORY_TILE_SELECTED, { id: selTile.id });
            }
        }
        
    }
});