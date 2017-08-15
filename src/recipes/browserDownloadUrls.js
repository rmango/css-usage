/* 
    RECIPE: browserDownloadUrls
    -------------------------------------------------------------
    Author: Morgan, Lia, Joel, Malick
    Description: Looks for the download urls of other browsers
*/


void function(){
    window.CSSUsage.StyleWalker.recipesToRun.push(function browserDownloadUrls(element, results){
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
            else if(elStyle.getPropertyValue("opacity") < 0.1){
                return 0;
            } 
            else if(elStyle.getPropertyValue("transform").includes(" 0,") || elStyle.getPropertyValue("transform").includes(" 0)")){
                return 0;
            } 
            else if(elStyle.getPropertyValue("visibility") === "hidden"){
                return 0;
            }

            // if text is within an iframe that does not appear: <iframe frameBorder="0" src="">Browser not compatible.</iframe>
            var elAbove = element;
            do{
                if(elAbove.nodeName === "IFRAME"){
                    if(getComputedStyle(elAbove).getPropertyValue("src") === "" && getComputedStyle(elAbove).getPropertyValue("frameBorder") === 0){
                        return 0;
                    }
                }
                if(elAbove.parenElement !== null){
                    elAbove = elAbove.parentElement;
                }
            } while(elAbove.parentElement !== null);
            return 1;
        }
        
        //tests for browser download urls
        var linkList = [{url: (new RegExp("google\\.(\\w{0,4})((\\W|\\w)+)?\/chrome", "i")), name:"Chrome"}, //but not support.google
        {url: (new RegExp("microsoft\\.(\\w{0,4})\/((\\W|\\w)+)?(internet-explorer|ie)", "i")), name:"Internet Explorer"}, //but not answers. 
        {url: (new RegExp("(mozilla|getfirefox|firefox)\\.(\\w{0,4})", "i")), name:"Firefox"}, //but not support.
        {url: (new RegExp("apple\\.(\\w{0,4})", "i")), name:"Safari"}, //but not support.
        {url: (new RegExp("opera\\.(\\w{0,4})", "i")), name:"Opera"}]; //but not help.

        for(var j = 0; j < linkList.length; j++){
            if(element.getAttribute("href") != null){
                //filtering out results that begin with "answers" to exclude answer forum results  
                if(linkList[j].url.test(element.getAttribute("href")) && element.getAttribute("href").indexOf("answers") === -1){
                    results[linkList[j].name] = results[linkList[j].name] || {count: 0, visibility:0};
                    results[linkList[j].name].count++;
                    //checks if is visible on page
                    if(results[linkList[j].name].visibility === 0){
                        results[linkList[j].name].visibility = isVisible(element);
                    }
                }
            }
        }
    });
}();