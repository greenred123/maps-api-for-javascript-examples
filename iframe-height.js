/*
 * When a user opens an link inside the iframe in a new tab the url would look like this
 * https://developer.here.com/olp/documentation/data-client-library/content/dev_guide/index.html
 * as the htmls inside the iframe are loaded with /content/
 *
 * To not show the user the iframe content only without layout and menu
 * we need to redirect to the same url without /content/
 * which will then load the requested page inside an iframe
 */


var iFrameHeight = 500,
    framePadding = 5,
    iFrame;

function documentHeight(documentObj) {
    return Math.max(
        documentObj.documentElement.clientHeight,
        documentObj.body.scrollHeight,
        documentObj.documentElement.scrollHeight,
        documentObj.body.offsetHeight,
        documentObj.documentElement.offsetHeight
    );
}

function informParentOnChanges(){
    var newIFrameHeight = documentHeight(document);
    if (newIFrameHeight !== iFrameHeight) {
        iFrameHeight = newIFrameHeight;
        parent.postMessage({type: "iFrameHeightChanged", height: iFrameHeight}, "https://localhost.developer.here.com");
    }
};

window.addEventListener("load", function() {
    //only post message for the top level iframe
    if (top === parent){
        iFrameHeight = documentHeight(document) + framePadding;
        parent.postMessage({type: "DOMContentLoaded", height: iFrameHeight}, "https://localhost.developer.here.com");

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

