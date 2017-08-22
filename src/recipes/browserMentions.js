
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
                results["visibility"] = results["visibility"] || {value:"false"};
                if(results["visibility"].value === "false"){
                    results["visibility"].value = isVisible(element).toString();
                }
            }
        }
        return results;
    });
}();