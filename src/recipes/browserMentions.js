
/*    
        RECIPE: browserMentions 
        Authors: Morgan, Lia, Malick, Joel
*/

void function () {   
        window.CSSUsage.StyleWalker.recipesToRun.push(function browserMentions(element, results) { 
        var browsers = ("Opera(\s|\.)|Internet Explorer|Firefox|Chrome|Edge|Safari|IE");
        var str = element.innerText(); 
        if(str !== null) 
            { 
                if(str.includes(browsers))
                    { 
                        var matches = str.match(browsers); 
                        if(matches !== null)
                            {
                                results["browser"] = results["browser"] || {count: 0, values: []};
                                results["browser"].count++;
                            }

                            for (var x = 0; x < matches.length; x++)
                                {
                                    results["browser"] = results["browser"].values[matches[x]] || {count: 0};
                                    results["browser"].values[matches[x]].count++;
                                }
                    } 
            } 
        return results; 
    }); 
}();