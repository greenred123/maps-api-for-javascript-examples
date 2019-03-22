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
    framePadding = 5,
    contentPath;

function documentHeight(documentObj) {
    return Math.max(
        documentObj.documentElement.clientHeight,
        documentObj.body.scrollHeight,
        documentObj.documentElement.scrollHeight,
        documentObj.body.offsetHeight,
        documentObj.documentElement.offsetHeight
    );
}

function getContentIframe() {
    return document.getElementsByName('classFrame')[0] || document.getElementsByName('template')[0];
};

function getIframeToc() {
    return document.querySelector('.summary');
};

function getIframeHeight(contentIFrame) {
    var contentIframeHeight = 0;
    if (contentIFrame) {
        var frameDoc = contentIFrame.contentDocument || contentIFrame.contentWindow.document;
        if (frameDoc && frameDoc.body) {
            contentIframeHeight = documentHeight(frameDoc);
        }
    };
    return contentIframeHeight;
};

function getTocHeight(toc){
    var tocHeight = 0;
    if (toc) {
        tocHeight = toc.clientHeight;
    }
    return tocHeight;
};

function getHeight(contentIFrame, iFrameToc){
    return Math.max(documentHeight(document), getIframeHeight(contentIFrame), getTocHeight(iFrameToc)) + framePadding;
};

function informParentOnChanges(contentIFrame, iFrameToc){
    var newIFrameHeight = getHeight(contentIFrame, iFrameToc);
    if (ff_docs_iframe_height_fix && contentPath !== location.pathname) {
        contentIFrame = getContentIframe();
        iFrameToc = getIframeToc();
        newIFrameHeight = getTocHeight(iFrameToc);
        contentPath = location.pathname;
    }
    if (newIFrameHeight !== iFrameHeight) {
        iFrameHeight = newIFrameHeight + framePadding;
        parent.postMessage({type: "iFrameHeightChanged", height: iFrameHeight}, location.origin);
    }
};

window.addEventListener("load", function() {

    //only post message for the top level iframe
    if (top === parent){
        var contentIFrame = getContentIframe();
        var iFrameToc = getIframeToc();
        iFrameHeight = getHeight(contentIFrame, iFrameToc);
        contentPath = location.pathname;
        parent.postMessage({type: "DOMContentLoaded", height: iFrameHeight}, location.origin);
        //changing page in gitbook doesn't do a full page load, so an extra event is needed
        setInterval(function(){ informParentOnChanges(contentIFrame, iFrameToc); }, 500);
        if (ff_horizontal_flicker_fix) {
            try {
                var observer = new MutationObserver(function () {
                    informParentOnChanges(contentIFrame, iFrameToc);
                });
                observer.observe(document.body, {attributes: true, childList: true, subtree: true});
            } catch (e) {
            }
        }
    }
});

window.addEventListener("unload", function() {
    //only post message for the specific content iframe inside our iframe
    if ((self.name === '') || self.name === 'classFrame' || self.name === 'template') {
        top.postMessage({type: "unload"}, location.origin);
    }
});
