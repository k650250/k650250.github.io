// -*- coding: utf-8; -*-

function introduce() {
    const set_interval_id = setInterval(introduceInterval, 1);

    function introduceInterval() {
        // 連想配列初期化完了迄待機
        if (string['--flag']) {
            clearInterval(set_interval_id);
        }　else {
            return;
        }

        const url = `res/my-static-profile-${string['--lang']}.xml`;

        function writeMyProfile(data) {
            const dl = document.getElementById('my-profile');

            while (dl.firstChild) {
                dl.removeChild(dl.firstChild);
            }
            
            for (let [key, value] of Object.entries(data)) {
                dl.insertAdjacentHTML('beforeend', "<dt>" + key + "</dt>");
                dl.insertAdjacentHTML('beforeend', "<dd>" + value + "</dd>");
            }

            dl.insertAdjacentHTML('beforeend', `<dt>${string['age-key']}</dt>`);
            const now = new Date();
            const dob = new Date(document.getElementById('date-of-birth').attributes['datetime'].nodeValue);
            let age = now.getFullYear() - dob.getFullYear();
            const thisYearsBirthday = new Date(now.getFullYear(), dob.getMonth()-1, dob.getDate());
            if (now < thisYearsBirthday) {
                age--;
            }
            dl.insertAdjacentHTML('beforeend', `<dd>${age}${string['age-value']}</dd>`);
        }

        const xmlhttp = (
            window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP')
        );
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                const data = {};
                const elements = Array.from(xmlhttp.responseXML.getElementsByTagName('data'));
                elements.forEach(function (element) {
                    data[element.attributes['key'].nodeValue] = element.innerHTML;
                });
                writeMyProfile(data);
            }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.overrideMimeType('text/xml');
        xmlhttp.send();
    }
}

introduce();
