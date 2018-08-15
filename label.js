function addAvailable(element) {
    var div = document.createElement('div');
    div.className = 'available';
    div.style.display = 'inline-block'
    div.style.marginLeft = '2px';
    div.innerHTML =
        '<div style="background: green; width:10px">v</div>';
    element.appendChild(div);
}

function addUsed(element) {
    var div = document.createElement('div');
    div.className = 'used';
    div.style.display = 'inline-block'
    div.style.marginLeft = '2px';
    div.innerHTML =
        '<div style="background: red; width: 10px">x</div>';
    element.appendChild(div);
}

function addFollowButton(element, username) {
    var a = document.createElement('a');
    a.id = username;
    a.className = "followLink";
    a.innerHTML =
        '<span>follow</span>';
    element.appendChild(a);
}

function checkAvailability(element) {
    let notParsedFollowers = window.localStorage.getItem('followers');

    if (!notParsedFollowers) {
        notParsedFollowers = JSON.stringify({list:[]});
        window.localStorage.setItem('followers', notParsedFollowers);
    }

    const followers = JSON.parse(notParsedFollowers);
    const username = element.text;

    return !followers.list.includes(username);
}

function addAvailability(element) {
    const isAvailable = checkAvailability(element);

    isAvailable ? addAvailable(element) : addUsed(element);
}

function onClickedButton(element) {
    const followers = JSON.parse(window.localStorage.getItem('followers'));
    followers.list.push(element.id);
    followers.list = [...new Set(followers.list)];
    window.localStorage.setItem('followers', JSON.stringify(followers));

    console.log(element.id, 'added to database');
}

chrome.runtime.onMessage.addListener(function (request) {
    if (request.data) {
        const followers = document.querySelectorAll('.FsskP .FPmhX');
        const followButtons = document.getElementsByClassName('BW116');
        const followLinkButtons = document.getElementsByClassName('followLink');

        for (let i = 0, l = followers.length; i < l; i++) {
            const username = followers[i].text;
            addAvailability(followers[i]);
            addFollowButton(followButtons[i], username);

            if (followLinkButtons[i]) {
                followLinkButtons[i].addEventListener('click', function () {
                    onClickedButton(this);
                });
            }
        }
    }
});