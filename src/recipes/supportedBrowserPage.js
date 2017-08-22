/* 
    RECIPE: SupportedBrowserPage
    -------------------------------------------------------------
    Author: Malick Sere, Lia Hiscock, Joel Ramos, Morgan Graham
    Description: This recipe looks for strings that would indicate that a page is a "supported browser" page.
*/



void function () {
    window.CSSUsage.StyleWalker.recipesToRun.push(function SupportedBrowserPage(element, results){
        //doesn't go to microsoft sites
        if(window.location.href.toString().indexOf("microsoft.com") !== -1 || window.location.href.toString().indexOf("forum") !== -1){
            return results;
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
            var find = new RegExp(/(\s|^)((Supported|Compatible|Recommended|Required)\s(\w+\s){0,3}Browser)|(Browser (Support|Recommendation|Compatibility|Requirement))(\r\n|\n|\W|\s|$)/gi);
            var matches = str.match(find);
            if(matches !== null) {
                results["browserPage"] = results["browserPage"] || { count: 0, values: [] };
                results["browserPage"].count++;
                for(var i = 0; i < matches.length; i++){
                    results["browserPage"].values[matches[i]] = results["browserPage"].values[matches[i]] || { count: 0 };
                    results["browserPage"].values[matches[i]].count++;
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



