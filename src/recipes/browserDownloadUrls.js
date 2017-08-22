/* 
    RECIPE: browserDownloadUrls
    -------------------------------------------------------------
    Author: Morgan, Lia, Joel, Malick
    Description: Looks for the download urls of other browsers
*/


void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push(function browserDownloadUrls(element, results){
        //excludes Microsoft sites and forums because they will have irrelevant user comments about switching browsers 
        if(window.location.href.indexOf("microsoft.com") !== -1 || window.location.href.indexOf("forum") !== -1){
            return results;
        }
        function isVisible(element) {
            //checks if width/height = 0 and left/top < 0
            var rect = element.getBoundingClientRect();
            if(rect !== null) {
                var box = rect;
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
                    return false;
                }
            }          
            
            //checks for visibility with computed style
            var elStyle = getComputedStyle(element);
            if(elStyle.display === "none"){
                return false;
            } 
            else if(elStyle.opacity < 0.1){
                return false;
            } 
            else if(elStyle.transform.includes(" 0,") || elStyle.getPropertyValue("transform").includes(" 0)")){
                return false;
            } 
            else if(elStyle.scale.includes(" 0,") || elStyle.scale.includes(" 0)") || elStyle.scaleX == 0 || elStyle.scaleY == 0){
                return false;
            }
            else if(elStyle.visibility != "visible"){
                return false;
            }

            // if text is within an iframe that does not appear
            var elAbove = element;
            do{
                if(elAbove.nodeName === "IFRAME" || !!element.closest("IFRAME")){
                   return false;
                }
                elAbove = elAbove.parentElement;
            } while(!!elAbove);
            return true;
        }
        
        //tests for browser download urls
        var linkList = [
        {url: (new RegExp("http(s)?\\:\\/\\/(\\w{0,9}\\.)?google\\.(\\w{0,4})((\\W|\\w)+)?\/chrome", "gi")), name:"Chrome"},
        {url: (new RegExp("http(s)?\\:\\/\\/(\\w{0,9}\\.)?microsoft\\.(\\w{0,4})\\/((\\W|\\w)+)?(internet-explorer|\\Wie)($|\\W)", "gi")), name:"Internet Explorer"},
        {url: (new RegExp("http(s)?\\:\\/\\/(\\w{0,9}\\.)?microsoft\\.(\\w{0,4})\\/(\\W|\\w)+?(microsoft-edge)($|\\W)", "gi")), name:"Edge"},
        {url: (new RegExp("http(s)?\\:\\/\\/(\\w{0,9}\\.)?(mozilla|getfirefox|firefox)\\.(\\w{0,4})", "gi")), name:"Firefox"}, 
        {url: (new RegExp("http(s)?\\:\\/\\/(\\w{0,9}\\.)?apple\\.(\\w{0,4})\\/((\\w|\\W)+)?safari", "gi")), name:"Safari"},
        {url: (new RegExp("http(s)?\\:\\/\\/(\\w{0,9}\\.)?opera\\.(\\w{0,4})", "gi")), name:"Opera"}]; 

        

        for(var link of linkList){
            if(element.hasAttribute("href")){
                var href = element.getAttribute("href");
                //filtering out results that begin with "answers" to exclude answer forum results  
                if(link.url.test(href) && href.indexOf("answers") === -1 && href.indexOf("itunes") === -1){
                    results[link.name] = results[link.name] || {count: 0};
                    results[link.name].count++;
                    //checks if is visible on page
                    results["visibility"] = results["visibility"] || {value:"false"};
                    if(isVisible(element)){
                        results["visibility"] = true;
                    }
                }
            }
        }
    });
}();