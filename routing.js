chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (
        tab.url.match('[a-zA-Z]*:\/\/www\.instagram\.com\/[a-zA-Z]*\/followers')
        &&
        tab.status === 'complete'
    ) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { data: 'falconinhas' },
                function () { }
            );
        });
    }
});