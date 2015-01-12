function ApplicationPreferences() 
{
}

ApplicationPreferences.prototype.get = function(key, success, fail) 
{
    var args = {};
    args.key = key;
    cordova.exec(success, fail, "ApplicationPreferences", "getSetting", [args]);
};

ApplicationPreferences.prototype.getAsBoolean = function(key, success, fail)
{
    var args = {};
    args.key = key;
    
    var unwrapBooleanSuccessReturn = function(preferenceValue)
        {
            success((preferenceValue == "1"));
        };
    
    cordova.exec(unwrapBooleanSuccessReturn, fail, "ApplicationPreferences", "getSetting", [args]);
};

ApplicationPreferences.prototype.getAsNumber = function(key, success, fail)
{
    var args = {};
    args.key = key;
    
    var unwrapBooleanSuccessReturn = function(preferenceValue)
        {
            var resultValue = parseInt(preferenceValue);
            console.log("ApplicationPreferences.prototype.getAsNumber(" + key + "): RESULT " + resultValue);
            success(resultValue);
        };
    
    cordova.exec(unwrapBooleanSuccessReturn, fail, "ApplicationPreferences", "getSetting", [args]);
};

ApplicationPreferences.prototype.set = function(key, value, success, fail) 
{
    var args = {};
    args.key = key;
    args.value = value;
    cordova.exec(success, fail, "ApplicationPreferences", "setSetting", [args]);
};

cordova.addConstructor(function() 
{
    if (!window.plugins)
    {
        window.plugins = {};
    }
    window.plugins.ApplicationPreferences = new ApplicationPreferences();
});