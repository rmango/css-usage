
/*    
        RECIPE: browserMentions 
        Authors: Morgan, Lia, Malick, Joel
*/

void function () {
    window.CSSUsage.StyleWalker.recipesToRun.push(function browserMentions(element, results) {
        //doesn't go to microsoft sites
        if(window.location.href.toString().indexOf("microsoft.com") !== -1) {
            return results;
        }
        if (element.nodeName !== "SCRIPT") {
            var browsers = new RegExp(/(\s|^)(Opera|Internet Explorer|Firefox|Chrome|Edge|Safari|IE)(\r\n|\n|\W|\s|$)/gi);
            var browsers2 = new RegExp(/(Opera|Internet Explorer|Firefox|Chrome|Edge|Safari|IE)/gi);
            var str = element.textContent;
            var matches = str.match(browsers);
            if (matches !== null) {
                results["browser"] = results["browser"] || { count: 0, values: [] };
                results["browser"].count++;


                for (var x = 0; x < matches.length; x++) {
                    results["browser"].values[matches[x].match(browsers2)[0].toLowerCase()] = results["browser"].values[matches[x].match(browsers2)[0].toLowerCase()] || { count: 0 };
                    results["browser"].values[matches[x].match(browsers2)[0].toLowerCase()].count++;
                }
            }
        }
        return results;
    });
}();