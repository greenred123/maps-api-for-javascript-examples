var iFrameHeight = 0,
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
        parent.postMessage({type: "iFrameHeightChanged", height: iFrameHeight}, "https://dv.developer.here.com");
    }
};

window.addEventListener("load", function() {
    //only post message for the top level iframe
    if (top === parent){
        iFrameHeight = documentHeight(document) + framePadding;
        parent.postMessage({type: "DOMContentLoaded", height: iFrameHeight}, "https://dv.developer.here.com");

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

