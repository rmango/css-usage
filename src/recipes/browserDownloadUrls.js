/* 
    RECIPE: browserDownloadUrls
    -------------------------------------------------------------
    Author: Morgan, Lia, Joel, Malick
    Description: Looks for the download urls of other browsers
*/


void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push( function browserDownloadUrls( element, results) {
        function isVisible(element)
        {
            //checks if width/height = 0 and left/top < 0
            if (element.getBoundingClientRect() !== null) {
                var box = element.getBoundingClientRect();
                var docEl = document.documentElement;
                var scrollTop = docEl.scrollTop;
                var scrollLeft = docEl.scrollLeft;
                var clientTop = docEl.clientTop;
                var clientLeft = docEl.clientLeft;
                var width = box.width;
                var height = box.height;
                var top = box.top + scrollTop - clientTop;
                var left = box.left + scrollLeft - clientLeft;
                var bottom = top + height;
                var right = left + width;
                if (width == 0 || height == 0 || bottom <= 0 || right <= 0) {
                    return 0;
                }
            }
            
            //checks for visibility with computed style
            var elStyle = getComputedStyle(element);
            if(elStyle.getPropertyValue("display") === "none"){
                return 0;
            } 
            else if(elStyle.getPropertyValue("opacity") < 0.1) {
                return 0;
            } 
            else if(elStyle.getPropertyValue("transform").includes(" 0,") || elStyle.getPropertyValue("transform").includes(" 0)")) {
                return 0;
            } 
            else if(elStyle.getPropertyValue("visibility") === "hidden") {
                return 0;
            }

            // if text is within an iframe that does not appear: <iframe frameBorder="0" src="">Browser not compatible.</iframe>
            var elAbove = element;
            do {
            //while(elAbove.parentElement !== null) {
                if(elAbove.nodeName === "IFRAME") {
                    if(getComputedStyle(elAbove).getPropertyValue("src") === "" && getComputedStyle(elAbove).getPropertyValue("frameBorder") === 0) {
                        return 0;
                    }
                }
                if(elAbove.parenElement !== null) {
                    elAbove = elAbove.parentElement;
                }
            //}
            } while(elAbove.parentElement !== null);
            return 1;
        }
        
        //tests for browser download urls
        var linkList = [{url:"www.google.com/chrome", name:"Chrome"}, 
        {url:"www.google.com/intl/en/chrome/browser", name:"Chrome"},
        {url:"support.microsoft.com/en-us/help/17621/internet-explorer-downloads", name:"Internet Explorer"}, 
        {url:"windows.microsoft.com/en-US/internet-explorer/downloads/ie", name:"Internet Explorer"}, 
        {url:"windows.microsoft.com/en-us/internet-explorer/download-ie", name:"Internet Explorer"},
        {url:"www.microsoft.com/windows/internet-explorer", name:"Internet Explorer"},
        {url:"windows.microsoft.com/ie", name:"Internet Explorer"},
        {url:"www.mozilla.org/en-US/firefox", name:"Firefox"}, 
        {url:"www.getfirefox.com", name:"Firefox"},
        {url:"www.mozilla.org/firefox", name:"Firefox"},
        {url:"www.mozilla.com/firefox", name:"Firefox"},
        {url:"www.firefox.com", name:"Firefox"},
        {url:"www.mozilla.com/en-US/firefox", name:"Firefox"},
        {url: "www.mozilla.org/en-GB/firefox/new/", name:"Firefox"},
        {url:"www.apple.com/safari", name:"Safari"}, 
        {url:"support.apple.com/en-us/HT204416", name:"Safari"},
        {url:"www.apple.com/support/mac-apps/safari", name:"Safari"},
        {url:"support.apple.com/downloads/safari", name:"Safari"},
        {url:"support.apple.com/downloads/#internet", name:"Safari"},
        {url:"www.opera.com/download", name:"Opera"},
        {url:"www.microsoft.com/en-us/download/details.aspx?id=48126", name:"Edge"},
        {url:"www.microsoft.com/en-us/windows/microsoft-edge", name:"Edge"}];
        
        for(var j = 0; j < linkList.length; j++) {
            if(element.getAttribute("href") != null) {
                if(element.getAttribute("href").indexOf(linkList[j].url) != -1 ) {
                    results[linkList[j].name] = results[linkList[j].name] || {count: 0, visibility:0};
                    results[linkList[j].name].count++;
                    //checks if is visible on page
                    if(results[linkList[j].name].visibility === 0) {
                        results[linkList[j].name].visibility = isVisible(element);
                    }
                }
            }
            if (element.getAttribute("src") != null) {
                if(element.getAttribute("src").indexOf(linkList[j].url) != -1 ) {
                    results[linkList[j].name] = results[linkList[j].name] || {count: 0, visibility:0};
                    results[linkList[j].name].count++;
                    if(results[linkList[j].name].visibility === 0) {
                        results[linkList[j].name].visibility = isVisible(element);
                    }
                }
            }
        }
    });
}();