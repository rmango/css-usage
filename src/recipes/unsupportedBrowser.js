/* 
    RECIPE: unsupported browser
    -------------------------------------------------------------
    Author: Morgan Graham, Lia Hiscock
    Description: Looking for phrases that tell users that Edge is not supported, or to switch browers. 
*/

void function () {
    window.CSSUsage.StyleWalker.recipesToRun.push(function unsupportedBrowser(element, results) {
        //tests for phrases
        var phrases = ["switch to", "switching to", "get", "getting", "use", "using", "download", "downloading", "install", "installing", "upgrade", "upgrading"];
        var phrasesString = phrases.join("|");
        var browsers = ["Chrome", "Safari", "Firefox", "Opera", "Internet Explorer", "IE", "Chromium"];
        var browsersString = browsers.join("|");
        var switchPhraseString = new RegExp("(\\s|^)(" + phrasesString + ")\\s(\\w+\\s){0,5}(" + browsersString + ")(\\r\\n|\\n|\\W|\\s|$)", "gi");
        var supportedPhraseString = new RegExp("(\\s|^)(browser|Edge)\\s(\\w+\\s){0,5}(isn['’]t|not|no longer)(\\w|\\s)+(supported|compatible|up to date)(\\r\\n|\\n|\\W|\\s|$)", "gi");
        var upgradeBrowserString = new RegExp("(\\s|^)Upgrade\\s(\\w+\\s){0,5}(browser)(\\r\\n|\\n|\\W|\\s|$)", "gi");
        var outdatedBrowserString = new RegExp("(\\s|^)(browser|Edge)\\s(\\w+\\s){0,5}(incompatible|outdated|unsupported)(\\r\\n|\\n|\\W|\\s|$)", "gi");
        var needles = [{ str: switchPhraseString, name: "switchPhrase" },
        { str: supportedPhraseString, name: "supportedPhrase" },
        { str: upgradeBrowserString, name: "upgradePhrase" },
        { str: outdatedBrowserString, name: "outdatedBrowser" }];
        
        var testEl = element.cloneNode(true);
        if (testEl.hasChildNodes()) {
			var childArr = testEl.children !== undefined ? testEl.children : testEl.childNodes;
			var m = childArr.length;
			for (var j = m - 1; j >= 0; j--) {
				testEl.removeChild(childArr[j]);
			}
		}
        
        function isVisible(element)
        {
            //checks if width/height = 0
            if(element.getBoundingClientRect() !== null){
                var width = element.getBoundingClientRect().width;
                var height = element.getBoundingClientRect().height;

                if(width == 0 || height == 0)
                    return 0;
            }
            
            //checks for visibility with computed style
            var elStyle = getComputedStyle(element);
            if(elStyle.getPropertyValue("display") === "none"){
                return 0;
            } 
            else if(elStyle.getPropertyValue("opacity") < 0.1) {
                return 0;
            } 
            else if(elStyle.getPropertyValue("transform").includes(" 0,") || elStyle.getPropertyValue("transform").includes(" 0)")) {
                return 0;
            } 
            else if(elStyle.getPropertyValue("visibility") === "hidden") {
                return 0;
            }

            // if text is within an iframe that does not appear: <iframe frameBorder="0" src="">Browser not compatible.</iframe>
            var elAbove = element;
            while(elAbove.parentElement !== null) {
                if(elAbove.nodeName === "IFRAME") {
                    if(getComputedStyle(elAbove).getPropertyValue("src") === "" && getComputedStyle(elAbove).getPropertyValue("frameBorder") === 0) {
                        return 0;
                    }
                }
                elAbove = elAbove.parentElement;
            }
            return 1;
        }
            

        for (var i = 0; i < needles.length; i++) {
            var matches = testEl.textContent.match(needles[i].str);
            if (matches !== null) {
                results[needles[i].name] = results[needles[i].name] || { count: 0, values: [], visibility: 1 };
                results[needles[i].name].count++;

                for (var m = 0; m < matches.length; m++) {
                    if (!matches[m].includes("for") && !matches[m].includes(" in ")) {
                        results[needles[i].name].values[matches[m]] = results[needles[i].name].values[matches[m]] || { count: 0 };
                        results[needles[i].name].values[matches[m]].count++;
                    }
                }
                
                //checks if is visible on page
                //results[needles[i].name].visibility = results[needles[i].name].visibility || { 0 };
                results[needles[i].name].visibility = isVisible(element);

            }
        }
        return results;
    });
}();

