/* 
    RECIPE: browserDownloadUrls
    -------------------------------------------------------------
    Author: Morgan, Lia, Joel, Malick
    Description: Looks for the download urls of other browsers
*/


void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push(function browserDownloadUrls(element, results){
        //excludes Microsoft sites and forums because they will have irrelevant user comments about switching browsers 
        if(window.location.href.indexOf("microsoft.com") !== -1 || window.location.href.toString().indexOf("forum") !== -1){
            return results;
        }
        
        //tests for browser download urls
        var linkList = [
        {url: (new RegExp("http(s)?\\:\\/\\/(\w{0,9}\\.)?google\\.(\\w{0,4})((\\W|\\w)+)?\/chrome", "gi")), name:"Chrome"}, //but not support.google
        {url: (new RegExp("microsoft\\.(\\w{0,4})\\/((\\W|\\w)+)?(internet-explorer|\\Wie)($|\\W)", "gi")), name:"Internet Explorer"}, //but not answers.
        {url: (new RegExp("microsoft\\.(\\w{0,4})\\/(\\W|\\w)+?(microsoft-edge)($|\\W)", "gi")), name:"Edge"}, //but not answers.  
        {url: (new RegExp("http(s)?\\:\\/\\/(\w{0,9}\\.)?(mozilla|getfirefox|firefox)\\.(\\w{0,4})", "gi")), name:"Firefox"}, //but not support.
        {url: (new RegExp("http(s)?\\:\\/\\/(\\w{0,9}\\.)?apple\\.(\\w{0,4})\\/((\\w|\\W)+)?safari", "gi")), name:"Safari"}, //but not support.
        {url: (new RegExp("http(s)?\\:\\/\\/(\w{0,9}\\.)?opera\\.(\\w{0,4})", "gi")), name:"Opera"}]; //but not help.

        for(var link of linkList){
            if(element.hasAttribute("href")){
                var href = element.getAttribute("href");
                //filtering out results that begin with "answers" to exclude answer forum results  
                if(link.url.test(href) && href.indexOf("answers") === -1 && href.indexOf("itunes") === -1){
                    results[link.name] = results[link.name] || {count: 0};
                    results[link.name].count++;
                    //checks if is visible on page
                    results["visibility"] = results["visibility"] || {value:"false"};
                    if( isVisible(element)){
                        results["visibility"] = true;
                    }
                }
            }
        }
    });
}();