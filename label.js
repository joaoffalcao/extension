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
    let cookie = getCookie('followers');

    if (!cookie) {
        cookie = {list:[]};
        document.cookie = `followers=${JSON.stringify(cookie)}`;
    }

    const followers = JSON.parse(cookie);
    const username = element.text;

    return !followers.list.includes(username);
}

function addAvailability(element) {
    const isAvailable = checkAvailability(element);

    isAvailable ? addAvailable(element) : addUsed(element);
}

function onClickedButton(element) {
    const followers = JSON.parse(getCookie('followers'));
    followers.list.push(element.id);
    document.cookie = `followers=${JSON.stringify(followers)}`;
    console.log(element.id, 'added to database');
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

chrome.runtime.onMessage.addListener(function (request) {
    if (request.data) {
        const followers = document.getElementsByClassName('FPmhX');
        const followButtons = document.getElementsByClassName('BW116');
        const followLinkButtons = document.getElementsByClassName('followLink');

        for (let i = 0, l = followers.length; i < l; i++) {
            addAvailability(followers[i]);
            addFollowButton(followButtons[i], followers[i].text);

            if (followLinkButtons[i]) {
                followLinkButtons[i].addEventListener('click', function () {
                    onClickedButton(this);
                });
            }
        }
    }
});