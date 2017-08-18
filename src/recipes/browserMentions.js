
/*    
        RECIPE: browserMentions 
        Authors: Morgan, Lia, Malick, Joel
*/

void function () {
    window.CSSUsage.StyleWalker.recipesToRun.push(function browserMentions(element, results) {
        //doesn't go to microsoft sites
        if(window.location.href.toString().indexOf("microsoft.com") !== -1 || window.location.href.toString().indexOf("forum") !== -1){
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
                if(elAbove.parentElement !== null){
                    elAbove = elAbove.parentElement;
                }

            }while(elAbove.parentElement !== null);
            return 1;
        }

        if (element.nodeName !== "SCRIPT" && element.nodeName !== "META") {

            var str = element.cloneNode(true);
            if(str.hasChildNodes()){
                var childs = str.children !== undefined ? str.children : str.childNodes;
                for(var i = childs.length - 1; i >= 0; i--){
                    str.removeChild(childs[i]);
                }
            }
            
            var browsers = new RegExp(/(\s|^)(Opera|Internet Explorer|Firefox|Chrome|Edge|Safari|IE)(\r\n|\n|\W|\s|$)/gi);
            var browsers2 = new RegExp(/(Opera|Internet Explorer|Firefox|Chrome|Edge|Safari|IE)/gi);
            var str = str.textContent;
            var matches = str.match(browsers);
            if (matches !== null) {
                results["browser"] = results["browser"] || { count: 0, values: [] };
                results["browser"].count++;

                for (var x = 0; x < matches.length; x++) {
                    var foundBrowserName = matches[x].match(browsers2)[0].toLowerCase();
                    results["browser"].values[foundBrowserName] = results["browser"].values[foundBrowserName] || {count: 0}
                    results["browser"].values[foundBrowserName].count++;
                }
                //checks if is visible on page
                results["visibility"] = results["visibility"] || {value:0};
                if(results["visibility"].value === 0){
                    results["visibility"].value = isVisible(element);
                }
            }
        }
        return results;
    });
}();