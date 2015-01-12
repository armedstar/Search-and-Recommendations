jingo.declare(
{
    require:
    [
        "shared.view.component.UIComponent"
    ],
    name: 'doppleganger.view.component.DGSideNavigation',
    as: function()
    {

        doppleganger.view.component.DGSideNavigation = function(divElem)
        {
            shared.view.component.UIComponent.apply(this, arguments);
            
            if (this.divElem)
            {
                this.gridButton = document.getElementById('gridButton')
                this.barGraphButton = document.getElementById('barGraphButton');
                this.openCloseToggleButton = document.getElementById('openCloseViewToggle');
                this.resetButton = document.getElementById('resetButton');
                this.refreshButton = document.getElementById('refreshButton');

                $(this.gridButton).on('tap', Relegate.create(this, this.onGridButtonClicked));
                $(this.barGraphButton).on('tap', Relegate.create(this, this.onBarGraphButtonClicked));
                $(this.openCloseToggleButton).on('tap', Relegate.create(this, this.onOpenCloseToggleClicked));
                $(this.resetButton).on('touchstart', Relegate.create(this, this.onResetButtonMouseDown));
                $(this.resetButton).on('touchmove', Relegate.create(this, this.onResetButtonTouchMove));
                $(this.resetButton).on('touchend', Relegate.create(this, this.onResetButtonMouseLeave));
                $(this.refreshButton).on('tap', Relegate.create(this, this.onRefreshButtonClicked));
                this._showingHistory = false;
            }
        }

        doppleganger.view.component.DGSideNavigation.prototype = new shared.view.component.UIComponent;
        doppleganger.view.component.DGSideNavigation.prototype.parent = shared.view.component.UIComponent.prototype;
        doppleganger.view.component.DGSideNavigation.prototype.constructor = doppleganger.view.component.DGSideNavigation;
        doppleganger.view.component.DGSideNavigation.prototype._showingHistory = false;
        
        doppleganger.view.component.DGSideNavigation.GRID_CLICKED = "gridClicked";
        doppleganger.view.component.DGSideNavigation.BAR_GRAPH_CLICKED = "barGraphClicked";
        doppleganger.view.component.DGSideNavigation.OPEN_CLOSE_CLICKED = "openCloseClicked";
        doppleganger.view.component.DGSideNavigation.REFRESH_CLICKED = "refreshClicked";
        doppleganger.view.component.DGSideNavigation.RESET_TRIGGERED = "resetTriggered";
        
        doppleganger.view.component.DGSideNavigation.RESET_REQUIRED_HOLD_TIME = 1000;
        
        doppleganger.view.component.DGSideNavigation.prototype._resetTimer = null;

        doppleganger.view.component.DGSideNavigation.prototype.onGridButtonClicked = function()
        {
            this.dispatchEvent(doppleganger.view.component.DGSideNavigation.GRID_CLICKED);
        }

        doppleganger.view.component.DGSideNavigation.prototype.onBarGraphButtonClicked = function()
        {
            this.dispatchEvent(doppleganger.view.component.DGSideNavigation.BAR_GRAPH_CLICKED);
        }

        doppleganger.view.component.DGSideNavigation.prototype.onRefreshButtonClicked = function()
        {
            this.dispatchEvent(doppleganger.view.component.DGSideNavigation.REFRESH_CLICKED);
        }

        doppleganger.view.component.DGSideNavigation.prototype.onOpenCloseToggleClicked = function()
        {
            this.dispatchEvent(doppleganger.view.component.DGSideNavigation.OPEN_CLOSE_CLICKED, {show: !this._showingHistory });
        }
              
        doppleganger.view.component.DGSideNavigation.prototype.toggleHistory = function(showHistoryView)
        {
            if (showHistoryView && !this._showingHistory)
            {
                console.log('switching to open');
                this._showingHistory = true;
                $(this.openCloseToggleButton).removeClass('closed').addClass('open');
            }
            else if (!showHistoryView && this._showingHistory)
            {
                this._showingHistory = false;
                $(this.openCloseToggleButton).removeClass('open').addClass('closed');
            }
        }

        doppleganger.view.component.DGSideNavigation.prototype.onResetButtonMouseDown = function()
        {
            this._startResetTimer();
        }

        doppleganger.view.component.DGSideNavigation.prototype._startResetTimer = function()
        {
            this._resetTimer = 
                window.setTimeout(
                    Relegate.create(this, this.onResetTimerCompleted, this), 
                    doppleganger.view.component.DGSideNavigation.RESET_REQUIRED_HOLD_TIME);
        }

        doppleganger.view.component.DGSideNavigation.prototype._stopResetTimer = function()
        {
            window.clearTimeout(this._resetTimer);
            this._resetTimer = null;
        }

        doppleganger.view.component.DGSideNavigation.prototype.onResetButtonTouchMove = function(event)
        {
            if (this._resetTimer)
            {
                if (event.originalEvent.touches.length == 1)
                {
                    if (
                        this.resetButton && 
                        !isTouchWithinElement(
                            event.originalEvent.touches[0].screenX, 
                            event.originalEvent.touches[0].screenY, 
                            this.resetButton))
                    {
                        this._stopResetTimer();
                        console.log("RESET CANCELED: Mouse left control");
                    }
                }
            }
        }

        doppleganger.view.component.DGSideNavigation.prototype.onResetButtonMouseLeave = function()
        {
            if (this._resetTimer)
            {
                this._stopResetTimer();
                console.log("RESET CANCELED: Mouse left control");
            }
        }

        doppleganger.view.component.DGSideNavigation.prototype.onResetButtonMouseUp = function()
        {
            if (this._resetTimer)
            {
                this._stopResetTimer();
                console.log("RESET CANCELED: Hold time less than threshold (" + doppleganger.view.component.DGSideNavigation.RESET_REQUIRED_HOLD_TIME + "ms)");
            }
        }

        doppleganger.view.component.DGSideNavigation.prototype.onResetTimerCompleted = function()
        {
            this._stopResetTimer();
            console.log("RESET TRIGGERED");
            this.dispatchEvent(doppleganger.view.component.DGSideNavigation.RESET_TRIGGERED);
        }

        doppleganger.view.component.DGSideNavigation.prototype.setActiveState = function(state)
        {
            if (state == AppConstants.RECS_SHOW_GRID)
            {
                $(this.gridButton).removeClass('active').addClass('active');
                $(this.barGraphButton).removeClass('active');
                $(this.resetButton).removeClass('active');
            }
            else if (state == AppConstants.RECS_SHOW_PROFILE)
            {
                $(this.barGraphButton).removeClass('active').addClass('active');
                $(this.gridButton).removeClass('active');
                $(this.resetButton).removeClass('active');
            }
        }

    }
});
