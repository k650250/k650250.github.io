// -*- coding: UTF-8; -*-

function stringApply() {
    const set_interval_id = setInterval(stringApplyInterval, 1);

    function stringApplyInterval() {
        // 連想配列初期化完了迄待機
        if(string['--flag']) {
            clearInterval(set_interval_id);
        }　else {
            return;
        }
        
        Array.from(document.getElementsByClassName('string')).forEach((element) => {
            element.innerHTML = string[element.getAttribute('data-key')];
            element.style.display = 'inline';
        });
    }
}

stringApply();
