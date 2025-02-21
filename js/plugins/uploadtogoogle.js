function upload() {
    document.write("<script src='https://code.jquery.com/jquery-3.7.1.js'></script>")
    let data1 = $gameVariables.value(1)
    let data = {
        "entry.1653610061": '文山服務中心',
        "entry.618460249": '康寶濃湯(雞蓉玉米口味)',
        "entry.366820350": '200包',
        "entry.1149498620": 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=13190088',
        "entry.1253988068": '下架',
        "emailAddress": 'jia10617@hhat.org',
    }
    $.ajax({
        type: 'POST',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSd3P_SBq7SF6u2iFrlBpBHnVPcQIbzYOJNYxg_tlzxKh0oCPQ/formResponse',
        data: data,
        contentType: 'application/json',
        dataType: 'jsonp',
        complete: function () {
            alert('資料已送出！');
        }
    });
}



function testttt() {
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSd3P_SBq7SF6u2iFrlBpBHnVPcQIbzYOJNYxg_tlzxKh0oCPQ/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            "entry.1653610061": '文山服務中心',
            "entry.618460249": '康寶濃湯(雞蓉玉米口味)',
            "entry.366820350": '200包',
            "entry.1149498620": 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=13190088',
            "entry.1253988068": '下架',
            "emailAddress": 'jia10617@hhat.org',
        },
    });
}

fetch('https://docs.google.com/forms/d/e/1FAIpQLSd3P_SBq7SF6u2iFrlBpBHnVPcQIbzYOJNYxg_tlzxKh0oCPQ/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        "entry.1653610061": '文山服務中心',
        "entry.618460249": '康寶濃湯(雞蓉玉米口味)',
        "entry.366820350": '200包',
        "entry.1149498620": 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=13190088',
        "entry.1253988068": '下架',
        "emailAddress": 'jia10617@hhat.org',
    },
});