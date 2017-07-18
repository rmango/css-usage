/* 
    RECIPE: imgEdgeSearch
    -------------------------------------------------------------
    Author: Morgan, Lia, Joel, Malick
    Description: Looking for sites that do not include edge as a supported browser
*/

void function () {
    window.CSSUsage.StyleWalker.recipesToRun.push(function imgEdgeSearch(element, results) {
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

                    }
                }
            }
        }

        return results;
    });
}();