jingo.declare(
{
    require:
    [
        "shared.model.BaseSNRProxy",
        "shared.model.ProgramBrief",
        "shared.model.SearchResult",
        "shared.model.SearchSuggestion",
        "shared.model.Tastee"
    ],
    name: 'shared.model.remote.RemoteSNRProxy',
    as: function() 
    {
        shared.model.SNRProxy = function()
        {
            shared.model.BaseSNRProxy.apply(this, [shared.model.SNRProxy.NAME]);
        }

        shared.model.SNRProxy.prototype = new shared.model.BaseSNRProxy;
        shared.model.SNRProxy.prototype.parent = shared.model.BaseSNRProxy.prototype;
        shared.model.SNRProxy.prototype.constructor = shared.model.SNRProxy;

        shared.model.SNRProxy.NAME = "SNRProxy";
        
        shared.model.SNRProxy.CONTENT_TYPE_VALUES =
        {
            TV_AND_MOVIE: 0,
            TV_ONLY: 1,
            MOVIE_ONLY: 2
        };
        
        shared.model.SNRProxy.SEED_LIST_SOURCE_FULL_URL = "http://dev-g.ceidd.net/frigg/v1.1/collection/ondemand/browse/cosmo;vsid=15;offset=0;sort=popularity;lineupid=12;locale=en-US;count=50;loctime=1356424374;supercat=-2;cat=-3;hemca=33199?reply=json";
        shared.model.SNRProxy.SEED_LIST_SOURCE_URL = "/collection/ondemand/browse/cosmo;vsid=15;offset=0;sort=popularity;lineupid=12;locale=en-US;count=50;loctime=1356424374;supercat=-2;cat=-3;hemca=33199";
        
        shared.model.SNRProxy.FRIGG_PROXY_ROOT = "/frigg";
        shared.model.SNRProxy.FRIGG_REMOTE_ROOT = "http://dev-g.ceidd.net/frigg/v1.1";
        
        shared.model.SNRProxy.DRAUGEN_PROXY_ROOT = "/draugen";
        shared.model.SNRProxy.DRAUGEN_REMOTE_ROOT = "http://dev-g.ceidd.net/draugen/v1.1";
        
        shared.model.SNRProxy.RCS_PROXY_ROOT = "/rcs";
        shared.model.SNRProxy.RCS_REMOTE_ROOT = "http://api.rovicorp.com";
        shared.model.SNRProxy.RCS_FOR_YOU_SOURCE_URL = "/snrpreview/v2.1/video/foryou";
        shared.model.SNRProxy.RCS_EVENT_BASE_URL = "/snrpreview/v2.1/video/";
        shared.model.SNRProxy.RCS_SEARCH_SUGGESTIONS_URL = "/search/v2/video/autocomplete";
        shared.model.SNRProxy.RCS_VIDEO_INFO_BASE_URL = "/data/v1/video/info";
        shared.model.SNRProxy.RCS_SEARCH_URL = '/search/v2.1/video/search';
        shared.model.SNRProxy.RCS_SIMILAR_CONTENT_URL = '/recs/v2.1/video/similar';
        shared.model.SNRProxy.RCS_USER_TASTE_PROFILE_URL = '/snrpreview/v2.1/video/profilevector';
        shared.model.SNRProxy.RCS_ITEM_TASTE_PROFILE_URL = '/snrpreview/v2.1/video/itemvector';
        
        shared.model.SNRProxy.RECOMMENDATIONS_COUNT = 20;
        shared.model.SNRProxy.IMAGE_HEIGHT_MAX = 400;
        shared.model.SNRProxy.IMAGE_HEIGHT_MIN = 200;
        shared.model.SNRProxy.LARGE_PROG_IMAGE_HEIGHT_MAX = 400;
        shared.model.SNRProxy.LARGE_PROG_IMAGE_HEIGHT_MIN = 200;
        shared.model.SNRProxy.SEARCH_SUGGESTIONS_COUNT = 10;
        shared.model.SNRProxy.SEARCH_RESULTS_COUNT = 10;
        shared.model.SNRProxy.SIMILAR_CONTENT_COUNT = 20;
        shared.model.SNRProxy.USER_TASTE_PROFILE_COUNT = 30;
        shared.model.SNRProxy.ITEM_TASTE_PROFILE_COUNT = 30;
              
        shared.model.SNRProxy.RCS_OVERVIEW_IMAGE_FORMAT_ID = 40;
        shared.model.SNRProxy.RCS_RECOMMENDATIONS_IMAGE_FORMAT_ID = 90;
        shared.model.SNRProxy.REC_SEARCH_RESULTS_IMAGE_FORMAT_ID = 90;
        
        shared.model.SNRProxy.CONTENT_TYPES = shared.model.SNRProxy.CONTENT_TYPE_VALUES.TV_AND_MOVIE;
        
        shared.model.SNRProxy.Security_RCS_AutoCompleteAPI = 
        {
            accessKey: '7eb6ezqj3tggb6gn2bwc2pz4',
            sharedSecred: 'VwUNPMxQGE',

            generateHash: function () 
            {
                var time = (((new Date()).getTime()) / 1000) | 0;
                return MD5(this.accessKey + this.sharedSecred + time);
            }
        };

        shared.model.SNRProxy.Security_RCS_MetadataAPI = 
        {
            accessKey: '7eb6ezqj3tggb6gn2bwc2pz4',
            sharedSecred: 'VwUNPMxQGE',

            generateHash: function () 
            {
                var time = (((new Date()).getTime()) / 1000) | 0;
                return MD5(this.accessKey + this.sharedSecred + time);
            }
        };

        shared.model.SNRProxy.prototype._runningRequests = 0;
        
        shared.model.SNRProxy.prototype._initInternal = function(finishedCallback)
        {
            if (DEVICE_MODE_ENABLED)
            {
                var initContentTypes = Relegate.create(this, this._initValueFromSettings, "rcs_content_types", "shared.model.SNRProxy.CONTENT_TYPES", shared.model.SNRProxy.CONTENT_TYPE_VALUES.TV_AND_MOVIE, function(value) {  shared.model.SNRProxy.CONTENT_TYPES = value; }, finishedCallback, this);
                var initRecommendationsCount = Relegate.create(this, this._initValueFromSettings, "rcs_num_recs", "shared.model.SNRProxy.RECOMMENDATIONS_COUNT", 20, function(value) {  shared.model.SNRProxy.RECOMMENDATIONS_COUNT = value; }, initContentTypes, this);
                var initUserTasteProfileCount = Relegate.create(this, this._initValueFromSettings, "rcs_num_user_taste_profiles", "shared.model.SNRProxy.USER_TASTE_PROFILE_COUNT", 30, function(value) {  shared.model.SNRProxy.USER_TASTE_PROFILE_COUNT = value; }, initRecommendationsCount, this);
                var initItemTasteProfileCount = Relegate.create(this, this._initValueFromSettings, "rcs_num_item_taste_profiles", "shared.model.SNRProxy.ITEM_TASTE_PROFILE_COUNT", 30, function(value) {  shared.model.SNRProxy.ITEM_TASTE_PROFILE_COUNT = value; }, initUserTasteProfileCount, this);
                var initSimilarCount = Relegate.create(this, this._initValueFromSettings, "rcs_num_similar", "shared.model.SNRProxy.SIMILAR_CONTENT_COUNT", 20, function(value) {  shared.model.SNRProxy.SIMILAR_CONTENT_COUNT = value; }, initItemTasteProfileCount, this);
                var initSearchSuggestionsCount = Relegate.create(this, this._initValueFromSettings, "rcs_num_search_suggestions", "shared.model.SNRProxy.SEARCH_SUGGESTIONS_COUNT", 10, function(value) {  shared.model.SNRProxy.SEARCH_SUGGESTIONS_COUNT = value; }, initSimilarCount, this);
                var initSearchResultsCount = Relegate.create(this, this._initValueFromSettings, "rcs_num_search_results", "shared.model.SNRProxy.SEARCH_RESULTS_COUNT", 10, function(value) {  shared.model.SNRProxy.SEARCH_RESULTS_COUNT = value; }, initSearchSuggestionsCount, this);
                var initContentPreferenceEventCount = Relegate.create(this, this._initValueFromSettings, "rcs_num_content_preference_events", "shared.model.BaseSNRProxy.CONTENT_PREFERENCE_EVENT_LIST_MAX_SIZE", 20, function(value) {  shared.model.BaseSNRProxy.CONTENT_PREFERENCE_EVENT_LIST_MAX_SIZE = value; }, initSearchResultsCount, this);
                    
                initContentPreferenceEventCount();
            }
            else
            {
                finishedCallback();
            }
        }
        
        shared.model.SNRProxy.prototype._initValueFromSettings = function(settingID, settingName, defaultValue, prepValueCallback, finishedCallback)
        {
            console.log("shared.model.SNRProxy.prototype._initValueFromSettings(" + settingName + "): Processing...");
            //get num of recs
            window.plugins.ApplicationPreferences.getAsNumber(
                settingID,
                function(val) 
                {
                    console.log("shared.model.SNRProxy.prototype._initValueFromSettings(" + settingName + ") = " + val);
                    prepValueCallback(val);
                    finishedCallback();
                },
                function() 
                {
                    alert("Unable to get value for setting (" + settingName + ").  Make sure the value is present in the Settings application.  Defaulting to " + defaultValue + "."); 
                    prepValueCallback(defaultValue);
                    finishedCallback();
                });
        }
        
        shared.model.SNRProxy.prototype._shouldAllowTVContent = function()
        {
            return (shared.model.SNRProxy.CONTENT_TYPES == shared.model.SNRProxy.CONTENT_TYPE_VALUES.TV_AND_MOVIE) ||
                (shared.model.SNRProxy.CONTENT_TYPES == shared.model.SNRProxy.CONTENT_TYPE_VALUES.TV_ONLY)
        }
        
        shared.model.SNRProxy.prototype._shouldAllowMovieContent = function()
        {
            return (shared.model.SNRProxy.CONTENT_TYPES == shared.model.SNRProxy.CONTENT_TYPE_VALUES.TV_AND_MOVIE) ||
                (shared.model.SNRProxy.CONTENT_TYPES == shared.model.SNRProxy.CONTENT_TYPE_VALUES.MOVIE_ONLY)
        }
        
        shared.model.SNRProxy.prototype.getProfileSeedTitles = function(successCallback, errorCallback)
        {
            //Return a hardcoded list of titles that the user will use to build a profile.
            var testData = new Array();
            
            this._addProgramBrief(testData, "19574020", shared.model.ProgramBrief.MOVIE, "Fast & Furious 6", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CinemaSource/Fast%20%26%20Furious%206/_derived_jpg_q90_240x320_m0/119301R1_CR.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "6747122", shared.model.ProgramBrief.TVSERIES, "Mad Med", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/AMC/Mad%20Men/_derived_jpg_q90_240x320_m0/MadMen-Season6-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "19924216", shared.model.ProgramBrief.MOVIE, "The Great Gatsby", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Warner%20Brothers%20Distribution/Movies/The%20Great%20Gatsby/_derived_jpg_q90_240x320_m0/GreatGatsby-poster-art.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "18722067", shared.model.ProgramBrief.MOVIE, "Oz The Great and Powerful", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CinemaSource/Oz%20The%20Great%20and%20Powerful%20%20An%20IMAX%203D%20Experience/_derived_jpg_q90_240x320_m0/154346R1.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "11279768", shared.model.ProgramBrief.TVSERIES, "Modern Family", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/ABC/Modern%20Family/Season%20Four/_derived_jpg_q90_240x320_m0/modern-family-season-four-vertical-showcard.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "4183597", shared.model.ProgramBrief.MOVIE, "Shrek 2", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CinemaSource/Shrek%202/_derived_jpg_q90_240x320_m0/041648H1.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "18882920", shared.model.ProgramBrief.TVSERIES, "The Voice", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/NBC/The%20Voice/Season%204/Showcard/_derived_jpg_q90_240x320_m0/VSC_TheVoice_S4.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "17350841", shared.model.ProgramBrief.TVSERIES, "Game of Thrones", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/HBO/Game%20of%20Thrones/_derived_jpg_q90_240x320_m0/GameofThrones-Season3-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "11715567", shared.model.ProgramBrief.TVSERIES, "Pawn Stars", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/History%20Channel/Pawn%20Stars/_derived_jpg_q90_240x320_m0/PawnStars-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "8147354", shared.model.ProgramBrief.MOVIE, "Vicky Cristina Barcelona", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/iNDEMAND/Vicky%20Cristina%20Barcelona/_derived_jpg_q90_240x320_m0/vickycristinabarcelona_posterart.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "18214869", shared.model.ProgramBrief.TVSERIES, "Downtown Abbey", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/UK/ITV/ITV1/Downton%20Abbey/_derived_jpg_q90_240x320_m0/DOWNTON_ABBEY_FULL_GROUP_F.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "19917429", shared.model.ProgramBrief.MOVIE, "The Twilight Saga: Breaking Dawn - Part 2", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Summit%20Ent/Movies/Twilight%20Saga%20Breaking%20Dawn%20Part%202/_derived_jpg_q90_240x320_m0/PosterARt.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "3899770", shared.model.ProgramBrief.TVSERIES, "Arrested Development", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/G4/Arrested%20Development/_derived_jpg_q90_240x320_m0/ArrestedDevelopment-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "1237220", shared.model.ProgramBrief.MOVIE, "The Shawshank Redemption", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Warner%20Brothers%20Distribution/Movies/The%20Shawshank%20Redemption/_derived_jpg_q90_240x320_m0/TheShawshankRedemption-BoxArt.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "18734135", shared.model.ProgramBrief.MOVIE, "Bridesmaids", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/HBO/Movies/Bridesmaids/_derived_jpg_q90_240x320_m0/Bridesmaids-PosterArt.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "3220060", shared.model.ProgramBrief.MOVIE, "Memento", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Sony%20Pictures/Memento/_derived_jpg_q90_240x320_m0/momen_kat_1_h.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "9877225", shared.model.ProgramBrief.TVSERIES, "Toddlers and Tiaras", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/TLC/Toddlers%20and%20Tiaras/_derived_jpg_q90_240x320_m0/toddlerstiarasverticalshowcard.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "6718065", shared.model.ProgramBrief.TVSERIES, "The Big Bang Theory", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CBS/Big%20Bang%20Theory/_derived_jpg_q90_240x320_m0/BigBangTheory-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "1221375", shared.model.ProgramBrief.MOVIE, "Cinema Paradiso", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Lionsgate/Movies/Cinema%20Paradiso/_derived_jpg_q90_240x320_m0/cinemaParadiso.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "20197874", shared.model.ProgramBrief.TVSERIES, "Veep", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/HBO/Veep/_derived_jpg_q90_240x320_m0/Veep-Season2-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "4656397", shared.model.ProgramBrief.TVSERIES, "So You Think You Can Dance", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Fox/So%20You%20Think%20You%20Can%20Dance/Season%2010/_derived_jpg_q90_240x320_m0/SYTYCD_s10_34SC.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "3680893", shared.model.ProgramBrief.TVSERIES, "The Bachelorette", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/ABC/The%20Bachelorette/Ninth%20Season/_derived_jpg_q90_240x320_m0/season-nine-bachelorette-vertical-showcard.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "19223", shared.model.ProgramBrief.MOVIE, "The Shining", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/AMG%20Images%20EU/Shining%2c%20the/_derived_jpg_q90_240x320_m0/t03248spsik.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "20562589", shared.model.ProgramBrief.TVSERIES, "Chicago Fire", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/NBC/Chicago%20Fire/Season%201/Showcard/_derived_jpg_q90_240x320_m0/VSC_ChicagoFire.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "20026406", shared.model.ProgramBrief.MOVIE, "Silver Linings Playbook", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Starz/Silver%20Linings%20Playbook/_derived_jpg_q90_240x320_m0/SilverLiningsPlaybook-PosterArt.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "4213370", shared.model.ProgramBrief.MOVIE, "The Notebook", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CinemaSource/The%20Notebook/_derived_jpg_q90_240x320_m0/042445H1_CR.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "20586870", shared.model.ProgramBrief.TVSERIES, "The Following", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Fox/The%20Following/Season%201/Showcards/_derived_jpg_q90_240x320_m0/TF_3X4_SC.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "1217773", shared.model.ProgramBrief.MOVIE, "Platoon", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/20th%20Century%20Fox/Platoon/_derived_jpg_q90_240x320_m0/Platoon-PosterArt.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "18285485", shared.model.ProgramBrief.TVSERIES, "The Real Housewives of Beverly Hills", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Bravo/The%20Real%20Housewives%20of%20Beverly%20Hills/Season%202/Showcard/_derived_jpg_q90_240x320_m0/VSC_RHBevHills_S2.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "502438", shared.model.ProgramBrief.MOVIE, "Easy Rider", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Sony%20Pictures/Easy%20Rider/_derived_jpg_q90_240x320_m0/ezrid_katos_4_h.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "7221538", shared.model.ProgramBrief.TVSERIES, "Breaking Bad", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/AMC/Breaking%20Bad/_derived_jpg_q90_240x320_m0/BreakingBad-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "20092333", shared.model.ProgramBrief.MOVIE, "Evil Dead", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Sony%20Pictures/Evil%20Dead/_derived_jpg_q90_240x320_m0/evil-dead-poster-art.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "19294473", shared.model.ProgramBrief.TVSERIES, "Homeland", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Showtime/Homeland/_derived_jpg_q90_240x320_m0/Homeland-ShowcardVertical1.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "20329834", shared.model.ProgramBrief.MOVIE, "Les Misérables", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Universal%20Studios%20Home%20Ent/Les%20Miserables/_derived_jpg_q90_240x320_m0/BoxArt.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "25938", shared.model.ProgramBrief.MOVIE, "Trainspotting", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Lionsgate/Movies/Trainspotting/_derived_jpg_q90_240x320_m0/trainspotting_boxart.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "12057824", shared.model.ProgramBrief.TVSERIES, "Sparticus", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Starz/Series/Spartacus%20War%20of%20the%20Damned/_derived_jpg_q90_240x320_m0/SpartacusWaroftheDamned-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "2113155", shared.model.ProgramBrief.MOVIE, "The Matrix", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Warner%20Brothers%20Distribution/Movies/The%20Matrix/_derived_jpg_q90_240x320_m0/098710-036C_CR.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "1229109", shared.model.ProgramBrief.MOVIE, "Schindler's List", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Universal%20Studios%20Home%20Ent/Schindler's%20List/_derived_jpg_q90_240x320_m0/025192386626_DVD_WS_2D_CLR.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "16504753", shared.model.ProgramBrief.TVSERIES, "Mike and Molly", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CBS/Mike%20%26%20Molly/_derived_jpg_q90_240x320_m0/MikeandMolly-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "223006", shared.model.ProgramBrief.MOVIE, "Breakfast at Tiffany's", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CinemaSource/Breakfast%20at%20Tiffany's/006790r1.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "21394939", shared.model.ProgramBrief.TVSERIES, "The House of Cards", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Sony%20Pictures%20Television/House%20of%20Cards/_derived_jpg_q90_240x320_m0/HouseofCards-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "11384449", shared.model.ProgramBrief.TVSERIES, "The Good Wife", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CBS/The%20Good%20Wife/_derived_jpg_q90_240x320_m0/TheGoodWife-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "19447", shared.model.ProgramBrief.MOVIE, "A Clockwork Orange", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Warner%20Brothers%20Distribution/Movies/A%20Clockwork%20Orange/_derived_jpg_q90_240x320_m0/21150PPV1SHT.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "5194102", shared.model.ProgramBrief.TVSERIES, "Top Chef", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Bravo/Top%20Chef/_derived_jpg_q90_240x320_m0/NUP_135056_show.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "27503", shared.model.ProgramBrief.MOVIE, "Citizen Kane", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Warner%20Brothers%20Distribution/Movies/Citizen%20Kane/_derived_jpg_q90_240x320_m0/13051R-001C.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "7983784", shared.model.ProgramBrief.TVSERIES, "True Blood", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/HBO/True%20Blood/_derived_jpg_q90_240x320_m0/TrueBlood-Season6-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "5126", shared.model.ProgramBrief.MOVIE, "Alien", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/20th%20Century%20Fox/Alien/_derived_jpg_q90_240x320_m0/Alien-Poster.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "5601454", shared.model.ProgramBrief.TVSERIES, "Americas Got Talent", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/NBC/America's%20Got%20Talent/Season%208/Showcard/_derived_jpg_q90_240x320_m0/AGT_s8_1536x2048.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "4054587", shared.model.ProgramBrief.MOVIE, "City of God", null, null, null, null, null, "http://cps-static.rovicorp.com/1/adg/cov150/drt300/t391/t39148p3rdb.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "11389255", shared.model.ProgramBrief.TVSERIES, "The Middle", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/ABC/The%20Middle/_derived_jpg_q90_240x320_m0/themiddleverticalshowcard.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "4621119", shared.model.ProgramBrief.TVSERIES, "Dancing With the Stars", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/ABC/Dancing%20with%20the%20Stars/_derived_jpg_q90_240x320_m0/dancingwiththestarsverticalshowcard.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "3248", shared.model.ProgramBrief.MOVIE, "Pretty Woman", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Disney/Pretty%20Woman/_derived_jpg_q90_240x320_m0/amz_PrettyWoman_kaTT_r1_c.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "95863", shared.model.ProgramBrief.MOVIE, "The Last Picture Show", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Sony%20Pictures/The%20Last%20Picture%20Show/_derived_jpg_q90_240x320_m0/lpics_katos_2_h_CR.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "3899277", shared.model.ProgramBrief.TVSERIES, "Two and a Half Men", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CBS/Two%20and%20a%20Half%20Men/_derived_jpg_q90_240x320_m0/TwoandaHalfMen-ShowcardVerticalSeason9.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "8904814", shared.model.ProgramBrief.MOVIE, "Avatar", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/20th%20Century%20Fox/Avatar/_derived_jpg_q90_240x320_m0/Avatar-PosterArt.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "20595402", shared.model.ProgramBrief.TVSERIES, "Hannibal", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/NBC/Hannibal/Season%201/Showcard/_derived_jpg_q90_240x320_m0/VSC_Hannibal.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "3497327", shared.model.ProgramBrief.TVSERIES, "American Idol", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Fox/American%20Idol/Season%2012/_derived_jpg_q90_240x320_m0/AmId_S12_3X4SC.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "1219796", shared.model.ProgramBrief.MOVIE, "When Harry Met Sally", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/CinemaSource/When%20Harry%20Met%20Sally/_derived_jpg_q90_0x200_m0/014255r1.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "18416338", shared.model.ProgramBrief.TVSERIES, "American Restoration", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/History%20Channel/American%20Restoration/_derived_jpg_q90_240x320_m0/AmericanRestoration-Season3-ShowcardVertical.jpg?partner=allrovi.com", null);
            this._addProgramBrief(testData, "1224010", shared.model.ProgramBrief.MOVIE, "The Life of Brian", null, null, null, null, null, "http://cps-static.rovicorp.com/2/Open/Image%20Entertainment/Monty%20Python's%20Life%20of%20Brian/_derived_jpg_q90_240x320_m0/MontyPythonsLifeofBrian-PosterArt.jpg?partner=allrovi.com", null);
            
            successCallback(testData);
        }

        shared.model.SNRProxy.prototype._addProgramBrief = function(
            dataSet,
            id,
            type,
            title,
            synopsis,
            genre,
            year,
            runtime,
            qualityRating,
            programIconImgSrc,
            largeProgramImage)
        {
            var allowAddition = 
                ((type == shared.model.ProgramBrief.MOVIE) && this._shouldAllowMovieContent()) ||
                ((type == shared.model.ProgramBrief.TVSERIES) && this._shouldAllowTVContent());
            
            if (allowAddition)
            {
                dataSet.push(new shared.model.ProgramBrief(
                    id,
                    type,
                    title,
                    synopsis,
                    genre,
                    year,
                    runtime,
                    qualityRating,
                    programIconImgSrc,
                    largeProgramImage,
                    this._retrieveContentPreferenceState(id)));
            }
        }
        
        shared.model.SNRProxy.prototype.like = function(user, programId, programBrief, successCallback, errorCallback)
        {
            if (!isEmptyString(programId))
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        if (programBrief)
                        {
                            programBrief.preferenceState = ContentPreferenceStateConstants.PREFERENCE_STATE_LIKE;
                        }
                        
                        this._storeContentPreferenceState(programId, ContentPreferenceStateConstants.PREFERENCE_STATE_LIKE);
                        this._storeContentPreferenceEvent(programBrief);
                    
                        successCallback();
                    },
                    this);
        
                this._callRCSProgramEvent(user, programId, "like", onSuccess, errorCallback);
            }
        }

        shared.model.SNRProxy.prototype.dislike = function(user, programId, programBrief, successCallback, errorCallback)
        {
            if (!isEmptyString(programId))
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        if (programBrief)
                        {
                            programBrief.preferenceState = ContentPreferenceStateConstants.PREFERENCE_STATE_DISLIKE;
                        }
                        
                        this._storeContentPreferenceState(programId, ContentPreferenceStateConstants.PREFERENCE_STATE_DISLIKE);
                        this._storeContentPreferenceEvent(programBrief);
                    
                        successCallback();
                    },
                    this);
        
                this._callRCSProgramEvent(user, programId, "dislike", onSuccess, errorCallback);
            }
        }
        
        shared.model.SNRProxy.prototype._callRCSProgramEvent = function(
            user, 
            programId, 
            eventType,
            successCallback, 
            errorCallback)
        {
            if (!user)
            {
                successCallback();
            }
            else
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        successCallback();
                    },
                    this);
                
                var onError = Relegate.create(
                    this,
                    function(result)
                    {
                        errorCallback(result);
                    },
                    this);
                
                this._performRCSServiceCall(
                    shared.model.SNRProxy.RCS_EVENT_BASE_URL + eventType,
                    {
                        userid: user.id,
                        cosmoprogramid: programId,
                        format: "json"
                    },
                    shared.model.SNRProxy.Security_RCS_MetadataAPI,
                    onSuccess, 
                    onError);
            }
        }
        
        shared.model.SNRProxy.prototype._unwrapForYouListItem = function(object)
        {
            var id = (object.id || "");
            var type = (object.type == "movie") ? shared.model.ProgramBrief.MOVIE : shared.model.ProgramBrief.TVSERIES;
            
            var entity = (object.video) ? object.video : object.movie;
            
            var title = ((entity && entity.masterTitle) || (entity && entity.title) || "Error: title unknown");
            var synopsis = "";  // TODO:  Implement this???
            var genre = "";  // TODO:  Implement this???
            var year = "";  // TODO:  Implement this???
            var runtime = 0;  // TODO:  Implement this???
            var qualityRating = 0;  // TODO:  Implement this???
            var programIconImgSrc = this._determineEntityIconImage(entity, type);
            var largeProgramImage = this._determineEntityLargeImage(entity, type);
            
            return new shared.model.ProgramBrief(
                id,
                type,
                title,
                synopsis,
                genre,
                year,
                runtime,
                qualityRating,
                programIconImgSrc,
                largeProgramImage,
                this._retrieveContentPreferenceState(id));
        }

        shared.model.SNRProxy.prototype.getRecommendations = function(user, successCallback, errorCallback)
        {
            if (!user)
            {
                successCallback(new Array());
            }
            else
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        var contentData = new Array();
                    
                        if (result.forYouResponse)
                        {
                            contentData = $.map(result.forYouResponse.results || [], Relegate.create(this, this._unwrapForYouListItem, this));
                        }
                        
                        this._flagNewContentRecommendations(contentData);
                        this._storeCurrentContentRecommendations(contentData);
                    
                        successCallback(contentData);
                    },
                    this);
                
                var onError = Relegate.create(
                    this,
                    function(result)
                    {
                        errorCallback(result);
                    },
                    this);
                    
                var entityTypes = [];
                if (this._shouldAllowTVContent())
                {
                    entityTypes.push("tvseries");
                }
                if (this._shouldAllowMovieContent())
                {
                    entityTypes.push("movie");
                }
                
                this._performRCSServiceCall(
                    shared.model.SNRProxy.RCS_FOR_YOU_SOURCE_URL,
                    {
                        userid: user.id,
                        entitytype: entityTypes,
                        size: shared.model.SNRProxy.RECOMMENDATIONS_COUNT,
                        include: "images",
                        format: "json",
                        formatid: shared.model.SNRProxy.RCS_RECOMMENDATIONS_IMAGE_FORMAT_ID
                    },
                    shared.model.SNRProxy.Security_RCS_MetadataAPI,
                    onSuccess, 
                    onError);
            }
        }
        
        shared.model.SNRProxy.prototype._unwrapSearchSuggestionListItem = function(object)
        {
            return new shared.model.SearchSuggestion(object || "");
        }
        
        shared.model.SNRProxy.prototype.getSearchSuggestions = function(queryStr, successCallback, errorCallback)
        {
            if (isEmptyString(queryStr))
            {
                successCallback(new Array());
            }
            else
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        var contentData = new Array();
                    
                        if (result.autocompleteResponse)
                        {
                            contentData = $.map(result.autocompleteResponse.results || [], this._unwrapSearchSuggestionListItem);
                        }
                    
                        successCallback(contentData);
                    },
                    this);
                
                var onError = Relegate.create(
                    this,
                    function(result)
                    {
                        errorCallback(result);
                    },
                    this);
                    
                var entityTypes = [];
                if (this._shouldAllowTVContent())
                {
                    entityTypes.push("tvseries");
                }
                if (this._shouldAllowMovieContent())
                {
                    entityTypes.push("movie");
                }
                
                this._performRCSServiceCall(
                    shared.model.SNRProxy.RCS_SEARCH_SUGGESTIONS_URL,
                    {
                        entitytype: entityTypes,
                        query: queryStr,
                        size: shared.model.SNRProxy.SEARCH_SUGGESTIONS_COUNT,
                        format: "json"
                    },
                    shared.model.SNRProxy.Security_RCS_AutoCompleteAPI,
                    onSuccess, 
                    onError);
            }
        }
              
        
        shared.model.SNRProxy.prototype._unwrapSearchResultsListItem = function(object)
        {
            var id = (object.id || "");
            var type = (object.type == "movie") ? shared.model.SearchResult.MOVIE : shared.model.SearchResult.TVSERIES;
            
            var entity = (object.video) ? object.video : object.movie;
            
            var title = ((entity && entity.masterTitle) || (entity && entity.title) || "Error: title unknown");
            var programIconImgSrc = this._determineEntityIconImage(entity, type);
            var releaseYear = (entity.releaseYear || "");
            var genre = (entity.subcategory || "");
              
              
            var result = new shared.model.SearchResult(
                id,
                type,
                title,
                programIconImgSrc,
                releaseYear,
                genre,
                this._retrieveContentPreferenceState(id));
            
            result.director = this._determineDirectorValue(entity);
            result.cast = this._determineCastValue(entity, 2);
            return result;
        }

        shared.model.SNRProxy.prototype.search = function(queryStr, successCallback, errorCallback)
        {
            if (isEmptyString(queryStr))
            {
                successCallback(new Array());
            }
            else
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        var contentData = new Array();
                    
                        if (result.searchResponse)
                        {
                            contentData = $.map(result.searchResponse.results || [], Relegate.create(this, this._unwrapSearchResultsListItem, this));
                        }
                    
                        successCallback(contentData);
                    },
                    this);
                
                var onError = Relegate.create(
                    this,
                    function(result)
                    {
                        errorCallback(result);
                    },
                    this); 
                    
                var entityTypes = [];
                if (this._shouldAllowTVContent())
                {
                    entityTypes.push("tvseries");
                }
                if (this._shouldAllowMovieContent())
                {
                    entityTypes.push("movie");
                }
                
                this._performRCSServiceCall(
                    shared.model.SNRProxy.RCS_SEARCH_URL,
                    {
                        entitytype: entityTypes,
                        query: queryStr,
                        size: shared.model.SNRProxy.SEARCH_RESULTS_COUNT,
                        include: "images,cast,crew",
                        format: "json",
                        formatid: shared.model.SNRProxy.REC_SEARCH_RESULTS_IMAGE_FORMAT_ID
                    },
                    shared.model.SNRProxy.Security_RCS_MetadataAPI,
                    onSuccess, 
                    onError);
            }
        }
        
        shared.model.SNRProxy.prototype._unwrapSimilarContentListItem = function(object)
        {
            var id = (object.id || "");
            var type = (object.type == "movie") ? shared.model.ProgramBrief.MOVIE : shared.model.ProgramBrief.TVSERIES;
            
            var entity = (object.video) ? object.video : object.movie;
            
            var title = ((entity && entity.masterTitle) || (entity && entity.title) || "Error: title unknown");
            var synopsis = "";  // TODO:  Implement this???
            var genre = "";  // TODO:  Implement this???
            var year = "";  // TODO:  Implement this???
            var runtime = 0;  // TODO:  Implement this???
            var qualityRating = 0;  // TODO:  Implement this???
            var programIconImgSrc = this._determineEntityIconImage(entity, type);
            var largeProgramImage = this._determineEntityLargeImage(entity, type);
            
            return new shared.model.ProgramBrief(
                id,
                type,
                title,
                synopsis,
                genre,
                year,
                runtime,
                qualityRating,
                programIconImgSrc,
                largeProgramImage,
                this._retrieveContentPreferenceState(id));
        }

        shared.model.SNRProxy.prototype.getSimilarContent = function(programId, successCallback, errorCallback)
        {
            if (isEmptyString(programId))
            {
                successCallback(new Array());
            }
            else
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        var contentData = new Array();
                    
                        if (result.similarResponse)
                        {
                            contentData = $.map(result.similarResponse.results || [], Relegate.create(this, this._unwrapSimilarContentListItem, this));
                        }
                    
                        successCallback(contentData);
                    },
                    this);
                
                var onError = Relegate.create(
                    this,
                    function(result)
                    {
                        errorCallback(result);
                    },
                    this);
                    
                var entityTypes = [];
                if (this._shouldAllowTVContent())
                {
                    entityTypes.push("tvseries");
                }
                if (this._shouldAllowMovieContent())
                {
                    entityTypes.push("movie");
                }
                
                this._performRCSServiceCall(
                    shared.model.SNRProxy.RCS_SIMILAR_CONTENT_URL,
                    {
                        cosmoprogramid: programId,
                        entitytype: entityTypes,
                        size: shared.model.SNRProxy.SIMILAR_CONTENT_COUNT,
                        include: "images",
                        format: "json",
                        formatid: shared.model.SNRProxy.RCS_RECOMMENDATIONS_IMAGE_FORMAT_ID
                    },
                    shared.model.SNRProxy.Security_RCS_MetadataAPI,
                    onSuccess, 
                    onError);
            }
        }
        
        shared.model.SNRProxy.prototype._unwrapTasteeListItem = function(object)
        {
            var category = shared.model.Tastee.CATEGORY_TYPE.UNKNOWN;
            var name = "";
            var score = 0;

            var fullName = object.name;
            if (fullName)
            {
                var delimiter = (fullName.indexOf("::") > -1) ? "::" : ":";
                var values = fullName.split(delimiter);
                if (values.length > 1)
                {
                    var categoryValue = values[0].trim().toLowerCase();
                    if (categoryValue == "genre")
                    {
                        category = shared.model.Tastee.CATEGORY_TYPE.GENRE;
                    }
                    else if (categoryValue == "subject")
                    {
                        category = shared.model.Tastee.CATEGORY_TYPE.SUBJECT;
                    }
                    else if (categoryValue == "style")
                    {
                        category = shared.model.Tastee.CATEGORY_TYPE.STYLE;
                    }
                    else if (categoryValue == "theme")
                    {
                        category = shared.model.Tastee.CATEGORY_TYPE.THEME;
                    }
                    else if (categoryValue == "quality")
                    {
                        category = shared.model.Tastee.CATEGORY_TYPE.QUALITY;
                    }
                    else if (categoryValue == "mood")
                    {
                        category = shared.model.Tastee.CATEGORY_TYPE.MOOD;
                    }
                    else if (categoryValue == "misc.")
                    {
                        category = shared.model.Tastee.CATEGORY_TYPE.MISC;
                    }
                    
                    name = values[1].trim();
                }
                else
                {
                    name = values[0].trim();
                }
            }

            //score = (object.score) ? object.score.toFixed(4) : 0;
            score = (object.score) ? object.score : 0;
            
            return new shared.model.Tastee(fullName, category, name, score);
        }

        shared.model.SNRProxy.prototype.getUserTasteProfile = function(user, successCallback, errorCallback)
        {
            if (!user)
            {
                successCallback(new Array());
            }
            else
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        var contentData = new Array();
                    
                        if (result.ProfileVectorResponse)
                        {
                            contentData = $.map(result.ProfileVectorResponse.results || [], Relegate.create(this, this._unwrapTasteeListItem, this));
                        }
                    
                        successCallback(contentData);
                    },
                    this);
                
                var onError = Relegate.create(
                    this,
                    function(result)
                    {
                        errorCallback(result);
                    },
                    this);
                
                this._performRCSServiceCall(
                    shared.model.SNRProxy.RCS_USER_TASTE_PROFILE_URL,
                    {
                        userid: user.id,
                        size: shared.model.SNRProxy.USER_TASTE_PROFILE_COUNT,
                        format: "json"
                    },
                    shared.model.SNRProxy.Security_RCS_MetadataAPI,
                    onSuccess, 
                    onError);
            }
        }

        shared.model.SNRProxy.prototype.getItemTasteProfile = function(programId, successCallback, errorCallback)
        {
            if (isEmptyString(programId))
            {
                successCallback(new Array());
            }
            else
            {
                var onSuccess = Relegate.create(
                    this,
                    function(result)
                    {
                        var contentData = new Array();
                    
                        if (result.ItemVectorResponse)
                        {
                            contentData = $.map(result.ItemVectorResponse.results || [], Relegate.create(this, this._unwrapTasteeListItem, this));
                        }
                    
                        successCallback(contentData);
                    },
                    this);
                
                var onError = Relegate.create(
                    this,
                    function(result)
                    {
                        errorCallback(result);
                    },
                    this);
                
                this._performRCSServiceCall(
                    shared.model.SNRProxy.RCS_ITEM_TASTE_PROFILE_URL,
                    {
                        cosmoprogramid: programId,
                        size: shared.model.SNRProxy.ITEM_TASTE_PROFILE_COUNT,
                        format: "json"
                    },
                    shared.model.SNRProxy.Security_RCS_MetadataAPI,
                    onSuccess, 
                    onError);
            }
        }
              
        shared.model.SNRProxy.prototype._determineEntityLargeImage = function(entity, entityType)
        {
            var retImage = null;

            if (entity && entity.images && entity.images.length > 0)
            {
                if (entityType == shared.model.ProgramBrief.TVSERIES)
                {
                    // For tv series, the best images come up near the end of the image list, so use those.
                    for (var i = (entity.images.length - 1); i >= 0; i--)
                    {
                        retImage = this._evaluateEntityImage(entity.images[i], shared.model.SNRProxy.LARGE_PROG_IMAGE_HEIGHT_MAX, shared.model.SNRProxy.LARGE_PROG_IMAGE_HEIGHT_MIN);
                        if (retImage) break;
                    }
                }
                else
                {
                    for (var i = 0; i < entity.images.length; i++)
                    {
                        retImage = this._evaluateEntityImage(entity.images[i], shared.model.SNRProxy.LARGE_PROG_IMAGE_HEIGHT_MAX, shared.model.SNRProxy.LARGE_PROG_IMAGE_HEIGHT_MIN);
                        if (retImage) break;
                    }
                }

                //just get first if none
                if (isEmptyString(retImage))
                {
                    retImage = entity.images[0].url;
                }
            }

            return retImage;
        }
        
        shared.model.SNRProxy.prototype._determineEntityIconImage = function(entity, entityType)
        {
            var programIconImgSrc = null;
            
            if (entity && entity.images && entity.images.length > 0) 
            {
                if (entityType == shared.model.ProgramBrief.TVSERIES)
                {
                    // For tv series, the best images come up near the end of the image list, so use those.
                    for (var i = (entity.images.length - 1); i >= 0; i--)
                    {
                        programIconImgSrc = this._evaluateEntityImage(entity.images[i], shared.model.SNRProxy.IMAGE_HEIGHT_MAX, shared.model.SNRProxy.IMAGE_HEIGHT_MIN);
                        if (programIconImgSrc) break;
                    }
                }
                else
                {
                    for (var i = 0; i < entity.images.length; i++)
                    {
                        programIconImgSrc = this._evaluateEntityImage(entity.images[i], shared.model.SNRProxy.IMAGE_HEIGHT_MAX, shared.model.SNRProxy.IMAGE_HEIGHT_MIN);
                        if (programIconImgSrc) break;
                    }
                }
                
                //  If we can't find an appropriate image, use whatever is available, to help avoid empty tiles.
                if (isEmptyString(programIconImgSrc))
                {
                    programIconImgSrc = entity.images[0].url;
                }
            }
            
            return programIconImgSrc;
        }
              
        shared.model.SNRProxy.prototype._evaluateEntityImage = function(entityImage, maxSize, minSize)
        {
            var retImage = null;
            
            if (entityImage.height <= maxSize && entityImage.height >= minSize)
            {
                retImage = entityImage.url;
            }
            
            return retImage;
        }

        shared.model.SNRProxy.prototype._performFriggServiceCall = function(
            url,
            data,
            successCallback, 
            errorCallback) 
        {
            this._performServiceCall(
                url,
                shared.model.SNRProxy.FRIGG_PROXY_ROOT,
                shared.model.SNRProxy.FRIGG_REMOTE_ROOT,
                data,
                successCallback, 
                errorCallback);
        }

        shared.model.SNRProxy.prototype._performDraugenServiceCall = function(
            url,
            data,
            successCallback, 
            errorCallback) 
        {
            this._performServiceCall(
                url,
                shared.model.SNRProxy.DRAUGEN_PROXY_ROOT,
                shared.model.SNRProxy.DRAUGEN_REMOTE_ROOT,
                data,
                successCallback, 
                errorCallback);
        }

        shared.model.SNRProxy.prototype._performRCSServiceCall = function(
            url,
            data, 
            securityObj, 
            successCallback, 
            errorCallback) 
        {
            if (successCallback || errorCallback) 
            { 
                data.apikey = securityObj.accessKey; 
            }
            data.sig = securityObj.generateHash();
            
            this._performServiceCall(
                url,
                shared.model.SNRProxy.RCS_PROXY_ROOT,
                shared.model.SNRProxy.RCS_REMOTE_ROOT,
                data, 
                successCallback, 
                errorCallback);
        }

        shared.model.SNRProxy.prototype._performServiceCall = function(
            url,
            proxyURLRoot,
            remoteURLRoot,
            data, 
            successCallback, 
            errorCallback) 
        {
            this._runningRequests++;
            
            var proxyURL = proxyURLRoot + url;
            var remoteURL = remoteURLRoot + url;
            var fullRemoteURL = remoteURLRoot + url + "?" + $.param(data, true);
            console.log("REMOTE CALL STARTING: \"" + fullRemoteURL + "\"");
            
            var onServiceCallSuccess = Relegate.create(
                this,
                function(result) 
                {
                    this._runningRequests--;
                    console.log("REMOTE CALL SUCCESS: \"" + fullRemoteURL + "\"");
                    successCallback(result);
                },
                this);
                
            var onServiceCallError = Relegate.create(
                this,
                function(xhr) 
                {
                    this._runningRequests--;
                    console.log("REMOTE CALL FAILURE: \"" + fullRemoteURL + "\"; message = " + xhr.responseText);
                    errorCallback($.parseJSON(xhr.responseText));
                },
                this);
            
            $.ajax(
                (DEVICE_MODE_ENABLED) ? remoteURL : proxyURL, 
                {
                    traditional: true,
                    data: data,
                    success: onServiceCallSuccess,
                    error: onServiceCallError
                });
        }
              
        shared.model.SNRProxy.prototype._determineDirectorValue = function(object)
        {
              var retVal = null;
              var crewArr = (object.crew || []);
              if (crewArr && crewArr.length > 0)
              {
                //grab director
                for (var i = 0; i < crewArr.length; i++)
                {
                    if (crewArr[i].role && (crewArr[i].role.toLowerCase() == "director"))
                    {
                        retVal = crewArr[i].name;
                        return retVal;
                    }
                }
                if (retVal == null)
                    return crewArr[0].name;
              }
        }
              
        shared.model.SNRProxy.prototype._determineCastValue = function(object, size)
        {
              var castArr = (object.cast || []);
              var retVal = '';
              if (castArr && castArr.length > 0)
              {
                //grab top three cast members
                for (var i = 0; i < castArr.length && i <= (size - 1); i++)
                {
                    retVal += castArr[i].name;
                    if ((size >= 2) && (i <= (size - 2)))
                        retVal += ', ';
                }
              }
              return retVal;
        }
              
        shared.model.SNRProxy.prototype._unwrapEntity = function(object)
        {
              var id = (object.ids.cosmoId || "");
              var type = (object.programType == "Movie") ? shared.model.ProgramBrief.MOVIE : shared.model.ProgramBrief.TVSERIES;
              
              var title = (object.masterTitle || "Error: title unknown");
              var synopsis = (object.synopsis.synopsis || "");  // TODO:  Implement this???
              var genre = (object.subcategory || "");  // TODO:  Implement this???
              var year = (object.releaseYear || "");  // TODO:  Implement this???
              var runtime = (object.duration || 0);  // TODO:  Implement this???
              var qualityRating = 0;  // TODO:  Implement this???
              var programIconImgSrc = null;
              var largeProgramImage = this._determineEntityLargeImage(object, type);
              
              var progBrief = new shared.model.ProgramBrief(
                                                   id,
                                                   type,
                                                   title,
                                                   synopsis,
                                                   genre,
                                                   year,
                                                   runtime,
                                                   qualityRating,
                                                   programIconImgSrc,
                                                   largeProgramImage,
                                                   this._retrieveContentPreferenceState(id));
              
              progBrief.director = this._determineDirectorValue(object);
              progBrief.cast = this._determineCastValue(object, 3);
              
              return progBrief;
        }
              
        shared.model.SNRProxy.prototype.getEntityInfo = function(entityId, successCallback, errorCallback)
        {
              
              var onSuccess = Relegate.create(
                                              this,
                                              function(result)
                                              {
                                                var contentData = null;
                                              
                                                if (result.video)
                                                {
                                                    contentData = Relegate.create(this, this._unwrapEntity, this)(result.video);
                                                }
                                              
                                                successCallback(contentData);
                                              },
                                              this);
              
              var onError = Relegate.create(
                                            this,
                                            function(result)
                                            {
                                                errorCallback(result);
                                            },
                                            this);
              
            this._performRCSServiceCall(
                                    shared.model.SNRProxy.RCS_VIDEO_INFO_BASE_URL,
                                    {
                                        cosmoid: entityId,
                                        include: "images,cast,crew,synopsis",
                                        formatid: "40",
                                        format: "json",
                                        country: "US",
                                        language: "en"
                                    },
                                    shared.model.SNRProxy.Security_RCS_MetadataAPI,
                                    onSuccess, 
                                    onError);
              
        }
    
    }
});