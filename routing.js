chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (
        tab.status === 'complete'
        &&
        (
            tab.url.match('[a-zA-Z]*:\/\/www\.instagram\.com\/.*\/followers')
            ||
            tab.url.match('[a-zA-Z]*:\/\/www\.instagram\.com\/p\/.*\/\?taken-by\=.*')
            ||
            tab.url.match('[a-zA-Z]*:\/\/www\.instagram\.com\/p\/.*\/liked\_by')
        )
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