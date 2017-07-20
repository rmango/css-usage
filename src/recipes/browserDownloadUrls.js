/* 
    RECIPE: browserDownloadUrls
    -------------------------------------------------------------
    Author: Morgan, Lia, Joel, Malick
    Description: Looks for the download urls of other browsers
*/


void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push( function browserDownloadUrls( element, results) {
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
                    results[linkList[j].name] = results[linkList[j].name] || {count: 0};
                    results[linkList[j].name].count++;
                }
            }
            if (element.getAttribute("src") != null) {
                if(element.getAttribute("src").indexOf(linkList[j].url) != -1 ) {
                    results[linkList[j].name] = results[linkList[j].name] || {count: 0};
                    results[linkList[j].name].count++;
                }
            }
        }
    });
}();