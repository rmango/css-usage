/* 
    RECIPE: unsupported browser
    -------------------------------------------------------------
    Author: Morgan Graham, Lia Hiscock
    Description: Looking for phrases that tell users that Edge is not supported, or to switch browers. 
*/

void function() {
    window.CSSUsage.StyleWalker.recipesToRun.push( function unsupportedBrowser( element, results) {        
        //tests for phrases
        var switchPhraseString = new RegExp("(Switch to|Get|Download|Install)((\\w|\\s)+)?(Google|Chrome|Safari|firefox|Opera|Internet Explorer|\\sIE)[^\\w]","gi");
        var supportedPhraseString = new RegExp("(browser|Edge)(\\w|\\s)+(isn't|not|no longer)(\\w|\\s)+(supported|compatible)", "gi");
        var needles = [{str:switchPhraseString, name:"switchPhrase"},
                        {str:supportedPhraseString, name:"supportedPhrase"}];

        var testEl = element.cloneNode();
        /*var childArr = testEl.children;
        for (var j = 0; j < childArr.length; j++){
            testEl.removeChild(childArr[j]);
        }*/

        for(var i = 0; i < needles.length; i++) {
            var matches = testEl.textContent.match(needles[i].str);
            
            if(matches !== null) {
                results[needles[i].name] = results[needles[i].name] || {count: 0, values: []};
                results[needles[i].name].count++;

                for(var m = 0; m < matches.length; m++) {
                    results[needles[i].name].values[matches[m]] = results[needles[i].name].values[matches[m]] || {count: 0};
                    results[needles[i].name].values[matches[m]].count++;
                    console.log(testEl.nodeName + " " + matches[m]);
                    console.log(element.textContent);
                }
            }
        }
        
        return results;
    });
}();

