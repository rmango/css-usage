/* 
    RECIPE: SupportedBrowserPage
    -------------------------------------------------------------
    Author: Malick Sere, Lia Hiscock, Joel Ramos, Morgan Graham
    Description: This recipe looks for strings that would indicate that a page is a "supported browser" page.
*/



void function () {
    window.CSSUsage.StyleWalker.recipesToRun.push(function SupportedBrowserPage(element, results){
        //doesn't go to microsoft sites
        if(window.location.href.toString().indexOf("microsoft.com") !== -1) {
            return results;
        }
        function isVisible(element){
            //checks if width/height = 0 and left/top < 0
            if (element.getBoundingClientRect() !== null){
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

            }while(elAbove.parentElement !== null);
            return 1;
        }

        if(element.nodeName !== "HTML" && element.nodeName !== "SCRIPT" && element.nodeName !== "BODY"){
            var str = element.cloneNode(true);
            if(str.hasChildNodes()){
                var childs = str.children !== undefined ? str.children : str.childNodes;
                for(var i = childs.length - 1; i >= 0; i--){
                    str.removeChild(childs[i]);
                }
            }

            str = str.textContent;
            var find = new RegExp(/((Supported|Compatible|Recommended|Required)\s(\w+\s){0,3}Browser)|(Browser (Support|Recommendation|Compatibility|Requirement))/gi);
            var matches = str.match(find);
            if(matches !== null) {
                results["browserPage"] = results["browserPage"] || { count: 0, values: [], visibility: 0 };
                results["browserPage"].count++;
                for(var i = 0; i < matches.length; i++){
                    results["browserPage"].values[matches[i]] = results["browserPage"].values[matches[i]] || { count: 0 };
                    results["browserPage"].values[matches[i]].count++;
                }

                //checks if is visible on page
                results["browserPage"].visibility = (results["browserPage"].visibility === 0) ? isVisible(element) : 1;

            }
        }
        return results;
    });
}();



