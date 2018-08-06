// var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//     images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }

// var followers = document.getElementsByClassName('FPmhX');
// for (var i = 0, l = followers.length; i < l; i++) {
//     console.log(followers[i].text);
//     followers[i].text = 'falcons';
// }

function addCheckBox(element) {
    var div = document.createElement('div');
    div.className = 'checkmark';
    div.innerHTML =
        '<label style="background: green; width:10px">x</label>';
    element.appendChild(div);
}

var followers = document.getElementsByClassName('FPmhX');
for (var i = 0, l = followers.length; i < l; i++) {
    addCheckBox(followers[i]);
}