// -*- coding: UTF-8; -*-

let string = {};
const stringtableurl = "res/string-table.xhtml";

function stringInit(url) {
    

    const xmlhttp = (
        window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP')
    );
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const langselect = document.getElementById("lang-select");
            const keyrecord = xmlhttp.responseXML.getElementById('key');
            let valuerecord;

            if (langselect.value == "") {
                const languages =  window.navigator.languages || window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage;

                for (let language of languages) {
                    valuerecord = xmlhttp.responseXML.getElementById(language);
                    string['--lang'] = language;
                    if (valuerecord) break;
                }
                if (!valuerecord) {
                    const C = 'C';
                    valuerecord = xmlhttp.responseXML.getElementById(C);
                    string['--lang'] = C;
                }
                langselect.value = string['--lang'];
                langselect.addEventListener('change', refreshView);
            } else {
                valuerecord = xmlhttp.responseXML.getElementById(langselect.value);
                string['--lang'] = langselect.value;
            }
            
            // データを取得
            const keys = keyrecord.getElementsByTagName('th');
            const values = valuerecord.getElementsByTagName('td');
            
            // 連想配列string初期化
            for (let i = 0; i < keys.length; i++) {
                string[keys[i].innerHTML] = values[i].innerHTML;
            }

            // 連想配列string初期化完了フラグを追加
            string['--flag'] = true;
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.overrideMimeType('text/xml');
    xmlhttp.send();
}

stringInit(stringtableurl);
