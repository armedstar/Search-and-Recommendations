function isEmptyString(pString)
{
    if (!pString || pString.length == 0) 
    {
        return true;
    }
    
    return !/[^\s]+/.test(pString);
}

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

function getCurrentDateTimeStr() {
    var curDate = new Date();
    return curDate.toString();
}

function getMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof(obj[id]) == "function") {
                result.push(id + ": " + obj[id].toString());
            }
        } catch (err) {
            result.push(id + ": inaccessible");
        }
    }
    return result;
}

function getElementPosition(element)
{
    var elem=element, tagname="", x=0, y=0;
    
    while ((elem != null) && (typeof(elem) == "object") && (typeof(elem.tagName) != "undefined"))
    {
        y += elem.offsetTop;
        x += elem.offsetLeft;
        
        tagname = (elem.tagName != null) ? elem.tagName.toUpperCase() : "";
        
        if(tagname == "BODY")
        {
            elem=0;
        }
        
        if (typeof(elem) == "object")
        {
            if (typeof(elem.offsetParent) == "object")
            {
                elem = elem.offsetParent;
            }
        }
    }
    
    return {x: x, y: y};
}

Array.prototype.shuffle = function() 
{
    var s = [];
    while (this.length)
    {
        var index = Math.floor(Math.random() * this.length);
        var item = (this.splice(index, 1))[0];
        s.push(item);
    }
    while (s.length) 
    {
        this.push(s.pop());
    }
    return this;
}

if (typeof String.prototype.startsWith != 'function') 
{
    String.prototype.startsWith = function (str)
    {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') 
{
    String.prototype.endsWith = function (str)
    {
        return this.slice(-str.length) == str;
    };
}

function createRandomUUID() 
{
    var s = [], itoh = '0123456789ABCDEF';

    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    for (var i = 0; i <36; i++)
    { 
        s[i] = Math.floor(Math.random()*0x10);
    }

    // Conform to RFC-4122, section 4.4
    s[14] = 4;  // Set 4 high bits of time_high field to version
    s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

    // Convert to hex chars
    for (var i = 0; i <36; i++) 
    {
        s[i] = itoh[s[i]];
    }

    // Insert '-'s
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
}

function getFileNameFromURL(url) 
{
    var fileName = "";
    if (url)
    {
        fileName = url;
        
        //this removes the anchor at the end, if there is one
        fileName = fileName.substring(0, (fileName.indexOf("#") == -1) ? fileName.length : fileName.indexOf("#"));
        
        //this removes the query after the file name, if there is one
        fileName = fileName.substring(0, (fileName.indexOf("?") == -1) ? fileName.length : fileName.indexOf("?"));
        
        //this removes everything before the last slash in the path
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length);
    }
    return fileName;
}
         
function isTouchWithinElement(touchX, touchY, element)
{
    var isWithinElement = false;
    if (element)
    {
        var jqueryElement = $(element).first();
        var position = jqueryElement.position();
        var topBoundary = position.top;
        var bottomBoundary = topBoundary + jqueryElement.height();
        var leftBoundary = position.left
        var rightBoundary = leftBoundary + jqueryElement.width();

        isWithinElement =
            ((touchX >= leftBoundary) && (touchX <= rightBoundary) &&
            (touchY >= topBoundary) && (touchY <= bottomBoundary));
    }
    return isWithinElement;
}