/* 
    RECIPE: unsupported browser
    -------------------------------------------------------------
    Author: Morgan Graham, Lia Hiscock
    Description: Looking for phrases that tell users that Edge is not supported, or to switch browers. 
*/

void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push( function unsupportedBrowser( element, results) {        
        //tests for phrases
        var switchPhraseString = new RegExp("(Switch to|Get|Use|Download|Install|Upgrad)\\s(\\w+\\s){0,5}(Chrome|Safari|firefox|Opera|Internet Explorer|IE)(\\r\\n|\\n|\\W|\\s)","gi");
        var supportedPhraseString = new RegExp("(browser|Edge)\\s(\\w+\\s){0,5}(isn['’]t|not|no longer)(\\w|\\s)+(supported|compatible|up to date)(\\r\\n|\\n|\\W|\\s)", "gi");
        var upgradeBrowserString = new RegExp("Upgrade\\s(\\w+\\s){0,5}(browser)", "gi");
        var outdatedBrowserString = new RegExp("(browser|Edge)\\s(\\w+\\s){0,5}(incompatible|outdated|unsupported)(\\r\\n|\\n|\\W|\\s)", "gi");
        var needles = [{str:switchPhraseString, name:"switchPhrase"},
                        {str:supportedPhraseString, name:"supportedPhrase"},
                        {str:upgradeBrowserString, name:"upgradePhrase"},
                        {str:outdatedBrowserString, name:"outdatedBrowser"}];

        var testEl = element.cloneNode(true);
        if(testEl.hasChildNodes()) {
            var childArr = testEl.children;
            var m = childArr.length;
            for (var j = m - 1; j >= 0; j--){
                testEl.removeChild(childArr[j]);
            }
        }
        
        for(var i = 0; i < needles.length; i++) {
            var matches = testEl.textContent.match(needles[i].str);
            
            if(matches !== null) {
                results[needles[i].name] = results[needles[i].name] || {count: 0, values: []};
                results[needles[i].name].count++;

                for(var m = 0; m < matches.length; m++) {
                    results[needles[i].name].values[matches[m]] = results[needles[i].name].values[matches[m]] || {count: 0};
                    results[needles[i].name].values[matches[m]].count++;
                }
            }
        }
        
        return results;
    });
}();

