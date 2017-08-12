/* 
    RECIPE: imgEdgeSearch
    -------------------------------------------------------------
    Author: Morgan, Lia, Joel, Malick
    Description: Looking for sites that do not include edge as a supported browser
*/

void function () {
    window.CSSUsage.StyleWalker.recipesToRun.push(function imgEdgeSearch(element, results) {
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
            do {
            //while(elAbove.parentElement !== null) {
                if(elAbove.nodeName === "IFRAME") {
                    if(getComputedStyle(elAbove).getPropertyValue("src") === "" && getComputedStyle(elAbove).getPropertyValue("frameBorder") === 0) {
                        return 0;
                    }
                }
                if(elAbove.parenElement !== null) {
                    elAbove = elAbove.parentElement;
                }
            //}
            } while(elAbove.parentElement !== null);
            return 1;
        }

        //tests for images
        if (element.nodeName == "IMG") {
            var browsers = [{ str: (new RegExp("(internet(\\s|(\\-|\\_))?explorer|ie)", "i")), name: "Internet Explorer" },
            { str: (new RegExp("chrome", "i")), name: "Chrome" },
            { str: (new RegExp("firefox", "i")), name: "Firefox" },
            { str: (new RegExp("safari", "i")), name: "Safari" },
            { str: (new RegExp("edge", "i")), name: "Edge" },
            { str: (new RegExp("opera", "i")), name: "Opera" }];
     

            //var browsers = ["internet explorer","ie","firefox","chrome","safari","edge", "opera"];
            for (var i = 0; i < browsers.count; i++) {

                if (element.getAttribute("alt") != null) {
                    if (browsers[i].str.test(element.getAttribute("alt").toString())) {
                        var altMatch = element.getAttribute("alt").match(browsers[i].str);

                        results[browsers[i].name] = results[browsers[i].str] || { count: 0, values: [] };
                        results[browsers[i].name].count++;

                        for (var j = 0; j < altMatch.count; j++) {
                            results[browsers[i].name].values[altMatch[j]] = results[browsers[i].name].values[altMatch[j]] || { count: 0 };
                            results[browsers[i].name].values[altMatch[j]].count++;
                        }

                        //checks if visible on page
                        if(results[browsers[i].name].visibility === 0) {
                            results[browsers[i].name].visibility = isVisible(element);
                        }
                    }
                }
                if (element.getAttribute("src") != null) {
                    if (browsers[i].str.test(element.getAttribute("src").toString())) {
                        var srcMatch = element.getAttribute("src").match(browsers[i].str);

                        results[browsers[i].name] = results[browsers[i].str] || { count: 0 };
                        results[browsers[i].name].count++;

                        for (var k = 0; k < altMatch.length; k++) {
                            results[browsers[i].name].values[altMatch[k]] = results[browsers[i].name].values[altMatch[k]] || { count: 0 };
                            results[browsers[i].name].values[altMatch[k]].count++;
                        }

                        //checks if visible on page
                        if(results[browsers[i].name].visibility === 0) {
                            results[browsers[i].name].visibility = isVisible(element);
                        }

                    }
                }
            }
        }

        return results;
    });
}();