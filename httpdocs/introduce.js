// -*- coding: UTF-8 -*-

const url = "my-static-profile.xml";

function writeMyProfile(data) {
    const dl = document.getElementById('my-profile');

    for (let [key, value] of Object.entries(data)) {
        dl.insertAdjacentHTML('beforeend', "<dt>" + key + "</dt>");
        dl.insertAdjacentHTML('beforeend', "<dd>" + value + "</dd>");
    }

    dl.insertAdjacentHTML('beforeend', "<dt>年齢</dt>");
    const now = new Date();
    const dob = new Date(document.getElementById('date-of-birth').attributes['datetime'].nodeValue);
    let age = now.getFullYear() - dob.getFullYear();
    const thisYearsBirthday = new Date(now.getFullYear(), dob.getMonth()-1, dob.getDate());
    if (now < thisYearsBirthday) {
        age--;
    }
    dl.insertAdjacentHTML('beforeend', "<dd>" + age + "歳</dd>");
}

const xmlhttp = (
    window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP')
);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let data = {};
        const elements = Array.from(xmlhttp.responseXML.getElementsByTagName('data'));
        elements.forEach(function(element) {
            data[element.attributes['key'].nodeValue] = element.innerHTML;
        });
        writeMyProfile(data);
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.overrideMimeType('text/xml');
xmlhttp.send();
