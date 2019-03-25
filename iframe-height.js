/*
 * When a user opens an link inside the iframe in a new tab the url would look like this
 * https://developer.here.com/olp/documentation/data-client-library/content/dev_guide/index.html
 * as the htmls inside the iframe are loaded with /content/
 *
 * To not show the user the iframe content only without layout and menu
 * we need to redirect to the same url without /content/
 * which will then load the requested page inside an iframe
 */


var iFrameHeight = 0,
    framePadding = 5;

function documentHeight(documentObj) {
    return Math.max(
        documentObj.documentElement.clientHeight,
        documentObj.body.scrollHeight,
        documentObj.documentElement.scrollHeight,
        documentObj.body.offsetHeight,
        documentObj.documentElement.offsetHeight
    )+ framePadding;
}

function informParentOnChanges(){
    var newIFrameHeight = documentHeight(document);
    if (newIFrameHeight !== iFrameHeight) {
        iFrameHeight = newIFrameHeight;
        window.parent.postMessage({type: "iFrameHeightChanged", height: iFrameHeight}, location.origin);
    }
};

window.addEventListener("load", function() {
    console.log("does it log?");

    //only post message for the top level iframe
    if (window.top === window.parent){
        iFrameHeight = documentHeight(document);
        console.log("parent");
        console.log(window.parent);
        console.log("top");
        console.log(window.top);
        window.parent.postMessage({type: "DOMContentLoaded", height: iFrameHeight}, location.origin);

        setInterval(function(){ informParentOnChanges(); }, 500);

        try {
            var observer = new MutationObserver(function () {
                informParentOnChanges();
            });
            observer.observe(document.body, {attributes: true, childList: true, subtree: true});
        } catch (e) {
        }
    }
});

window.addEventListener("unload", function() {
    //only post message for the specific content iframe inside our iframe
    if ((self.name === '')) {
        window.top.postMessage({type: "unload"}, location.origin);
    }
});
