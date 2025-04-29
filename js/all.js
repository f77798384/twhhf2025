let currentNode = "";
let story = "";
let bgmstatus = false;
let audio = $('#music')[0];
let flipme = $('#flipme')[0];
let cardflip = $('#cardflip')[0];
let press = $('#press')[0];
let sw = $('#on-off .bi');
let identity = 'legal'
let flip = false

audio.volume = 0.8
audio.loop = true
flipme.volume = 0.5
flipme.loop = false
cardflip.volume = 0.3
cardflip.loop = false
press.volume = 0.5
press.loop = false

$('#on-off').on('click', function (e) {
    e.preventDefault();
    $(sw).each((a, b) => {
        $(b).toggleClass('d-none');
    })
    if (bgmstatus == false) {
        audio.play();
        bgmstatus = true;
        return;
    } else {
        audio.pause();
        bgmstatus = false;
        return;
    }
})

$('#list').on('click', function (e) {
    e.preventDefault();
    $('.more').removeClass('d-none')
})
// $('.more').removeClass('d-none')
$('#close-more').on('click', function (e) {
    e.preventDefault();
    $('.more').addClass('d-none')
});

$('#start').on('click', function (e) {
    e.preventDefault();
    $('#on-off').click()
    flipme.play()
    setTimeout(() => {
        $('#stframe').addClass('animate__fadeOutTopRight')
    }, 200);
    setTimeout(function () {
        // $('#stframe').remove()
        $('#stframe').addClass('d-none')
        $('.lotto').removeClass('d-none')
        $('.lotto').addClass('animate__fadeIn')
    }, 2500)
})

$('.idcard').on('click', function (e) {
    if (!flip) {
        e.preventDefault();
        flip = true
        $('.dialog').addClass('d-none')
        $('.lotto .front').removeClass('ryp')
        $('.lotto .back').removeClass('ryn')
        cardflip.play()
        setTimeout(function () {
            let random = Math.floor(Math.random() * 10)
            $('.lotto .front').addClass('ryp')
            $('.lotto .back').addClass('ryn')
            $('.identity').text(`${random < 1 ? '合法移工之子' : '非法移工之子'}`)
            $('.identity').attr('data-id', `${random < 1 ? 'legal' : 'illegal'}`)
            $('.identity').attr('data-id', `${random < 1 ? identity = 'legal' : identity = 'illegal'}`)
        }, 1)
        setTimeout(() => {
            $('.dialog').removeClass('d-none')
        }, 3500);
        setTimeout(() => {
            flip = false
        }, 4000);
    }
})

$('.option2').on('click', function (e) {
    e.preventDefault();
    $(this).addClass('option2a');
    setTimeout(() => {
        $(this).removeClass('option2a');
    }, 500);
})

$('#checkid').on('click', function (e) {
    flip = true
    $('.lotto').removeClass('animate__fadeIn')
    $('.lotto').addClass('animate__fadeOut')
    setTimeout(() => {
        // $('.lotto').remove()
        $('.lotto').addClass('d-none')
        $("#game").removeClass("d-none");  // 顯示遊戲對話區
        renderNode(currentNode);           // 執行顯示第一節點
    }, 2000);
})

$.ajax({
    url: './text/story.json',
    method: 'GET',
    dataType: 'json',
    data: '',
    async: true,

    success: res => {
        story = res;
        currentNode = "where";
    },
    error: err => {
        console.log(err)
    },
});
let rad;
for (var i = 0; i < 2001; i++) {
    (function (x) {
        window.setTimeout(function () {
            $('.second').attr('style', `bottom:${300 * x / 2000}px`)
            if (x % 20 == 0) {
                $('.num').text(`${100 * x / 2000}%`)
            }
            if (x >= '2000') {
                $('#intrologo').addClass('animate__animated animate__fadeIn ')
                setTimeout(() => {
                    $('.loadframe').addClass('loadover')
                    $('#intrologo').removeClass('animate__fadeIn')
                    $('#intrologo').addClass('animate__fadeOut')
                    $('#introbg').addClass('bgfadeout')
                    setTimeout(() => {
                        $('#introbg').remove()
                    }, 1500);
                }, 1000);
            }
        }, 1000 + 2 * (x + Math.random() * 10));
    })(i);
}

function safariHacks() {
    let windowsVH = window.innerHeight / 100;
    document.querySelector('.container').style.setProperty('--vh', windowsVH + 'px');
    document.querySelector('.main').style.setProperty('--vh', windowsVH + 'px');
    window.addEventListener('resize', function () {
        document.querySelector('.container').style.setProperty('--vh', windowsVH + 'px');
        document.querySelector('.main').style.setProperty('--vh', windowsVH + 'px');
    });
}
safariHacks();


function renderNode(nodeKey) {
    const node = story[nodeKey];
    if (!node) return;

    const container = $("#game");
    container.empty();  // 清空舊內容

    const dialog = node.dialog;

    // 顯示標題
    if (dialog.head) {
        container.append(`<h3 class="mb-3 ${node.type}">${dialog.head.replace(/\n/g, "<br>")}</h3>`);
    }

    // 顯示內容
    if (dialog.description) {
        container.append(`<p class="mb-4 ${node.type}">${dialog.description.replace(/\n/g, "<br>")}</p>`);
    }

    // 顯示按鈕或選項
    if (node.type === "question") {
        const options = dialog.options;
        for (const key in options) {
            const opt = options[key];
            if (opt.condition === "none" || opt.condition === identity) {
                container.append(`
                    <a class="option2" data-goto="${opt.goto}">
                        ${opt.description.replace(/\n/g, "<br>")}
                    </a>
                `);
            }
        }
    } else {
        // const btnText = dialog.btn || "再次開始新的人生";
        const btnText = node.type == 'end' ? "再次開始新的人生" : '繼續'
        container.append(`
            <a class="option2" data-goto="${node.goto}" ">${btnText}</a>
            `);
    }
}

$(document).on('click', function (e) {
    // console.log($(e.target)[0].nodeName == "A")
    // console.log($(e.target).hasClass('option2'))
    if ($(e.target)[0].nodeName == "A" && $(e.target).hasClass('option2') && $(e.target).data('goto') != '') {
        $('#press')[0].play()
        $('.bg').click()
        $(e.target).addClass('option2a');
        $('#game').removeClass('animate__fadeIn')
        $('#game').addClass('animate__fadeOut')
        setTimeout(() => {
            $('#game').removeClass('animate__fadeOut')
            $('#game').addClass('animate__fadeIn')
            $(e.target).removeClass('option2a');
            console.log($(e.target).data('goto'))
            let currentNode = $(e.target).data('goto')
            if (currentNode == 'start') {
                flip = false
                $('.lotto .front').removeClass('ryp')
                $('.lotto .back').removeClass('ryn')
                $('.dialog').addClass('d-none')
                $('#stframe').removeClass('animate__fadeOutTopRight')
                $('#stframe').addClass('animate__fadeIn')
                $('.lotto').addClass('animate__fadeIn')
                $('.lotto').removeClass('animate__fadeOut')
                $('#game').addClass('d-none')
                $('#stframe').removeClass('d-none')
            } else {
                renderNode(currentNode)
            }
        }, 2000);
    }
})

let t = window.devicePixelRatio
let r = window.innerHeight
if (t > 1 && t < 2) {
    $('body').attr('style', `zoom:${1 / t};height:${r * t}px;`)
    $('.container').css('height', `${r * t}px`)
    $('.container').css('margin-bottom', '75px')
    $('.main').css('height', `${r * t}px`)
    console.log('resize')
}