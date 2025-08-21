let imgPreloadArr = [];
function preload() {
    var folderPath = "./img/";
    $.ajax({
        url: "./text/preload.txt",
        dataType: "text",
        success: function (update) {
            let i = 0;
            arr = update.toString().replaceAll('\r', '').split('\n')
            arr.forEach(a => {
                const img = new Image();
                img.src = `.${a}`;
                imgPreloadArr.push(img);
            });
        }
    });
}
preload()

$('#switch-test').on('click', function () {
    $('.stylechoose').removeClass('d-none')
    $('#game-test').removeClass('d-none')
    $('#stframe').addClass('d-none')
    $('#game').addClass('d-none')
    $('.lotto').addClass('d-none')

})

let currentNode = "";
let story = "";
let audio = false;
let bgm = $('#music')[0];
let flipme = $('#flipme')[0];
let cardflip = $('#cardflip')[0];
let press = $('#press')[0];
let amore = $('#a-more')[0];
let amorec = $('#a-more-c')[0];
let sw = $('#on-off .bi');
let identity = 'illegal'
let flip = false
let where = '';
let mute = '';
let st = true;
let career = '';
let atkarr = ['none', '舉起了權杖，對魔法書施展了淨化', '拿起了戰錘，狠狠地砸向魔法書', '拔出了寶劍，須臾間將魔法書斬為兩半', '架起了弓箭，射向半空中的魔法書', '舉起重斧奮力跳起，下落的同時將魔法書劈成兩半'];
let atkstr = 'none';


bgm.volume = 0.8
bgm.loop = true
flipme.volume = 0.5
flipme.loop = false
cardflip.volume = 0.3
cardflip.loop = false
press.volume = 0.5
press.loop = false
amore.volume = 0.5
amore.loop = false
amorec.volume = 0.5
amorec.loop = false

$('#on-off').on('click', function (e) {
    e.preventDefault();
    $(sw).each((a, b) => {
        $(b).toggleClass('d-none');
    })
    if (audio == false) {
        bgm.play();
        audio = true;
        mute = false;
        return;
    } else {
        bgm.pause();
        audio = false;
        mute = true;
        return;
    }
})

$('#list').on('click', function (e) {
    e.preventDefault();
    // $('.more').fadeToggle()
    amore.play()
    $('.more').toggleClass('fadein')
    $('.more').toggleClass('fadeout')
    $('.more').css('display', 'flex')
})
$('#close-more').on('click', function (e) {
    e.preventDefault();
    $('.more').toggleClass('fadein')
    $('.more').toggleClass('fadeout')
    amorec.play()
    setTimeout(() => {
        $('.more').css('display', 'none')
    }, 800);
});

$('#start').on('click', function (e) {
    e.preventDefault();
    if (st && !audio) {
        $('#on-off').click()
    }
    st = false
    setTimeout(() => {
        $('#stframe').addClass('animate__fadeOutTopRight')
    }, 200);
    setTimeout(function () {
        // $('#stframe').remove()
        $('#stframe').addClass('d-none')
        $('.lotto').removeClass('d-none')
        $('.lotto').addClass('animate__fadeIn')
        $('.dialog').removeClass('d-none')
        $('.dialog').addClass('animate__fadeIn')
    }, 2500)
})

$('.idcard').on('click', function (e) {
    if (!flip) {
        e.preventDefault();
        flip = true
        $('.dialog').addClass('d-none')
        $('.lotto .front').removeClass('ryp')
        $('.lotto .back').removeClass('ryn')
        if (audio) {
            console.log(audio)
            cardflip.play()
        }
        setTimeout(function () {
            let random = Math.floor(Math.random() * 11)
            $('.lotto .front').addClass('ryp')
            $('.lotto .back').addClass('ryn')
            switch (random) {
                case 0:
                    career = '村民A'
                    identity = 'legal'
                    break;
                case 1:
                    career = '祭司'
                    identity = 'illegal'
                    break;
                case 2:
                    career = '鐵匠'
                    identity = 'illegal'
                    break;
                case 3:
                    career = '勇者'
                    identity = 'illegal'
                    break;
                case 4:
                    career = '獵人'
                    identity = 'illegal'
                    break;
                case 5:
                    career = '樵夫'
                    identity = 'illegal'
                    break;
                case 6:
                    career = '祭司'
                    identity = 'illegal'
                    break;
                case 7:
                    career = '鐵匠'
                    identity = 'illegal'
                    break;
                case 8:
                    career = '勇者'
                    identity = 'illegal'
                    break;
                case 9:
                    career = '獵人'
                    identity = 'illegal'
                    break;
                case 10:
                    career = '樵夫'
                    identity = 'illegal'
                    break;
            }
            atkstr = atkarr[random]
            // $('.identity').text(`${random < 1 ? '合法移工之子' : '非法移工之子'}`)
            // $('.identity').attr('data-id', `${random < 1 ? 'legal' : 'illegal'}`)
            // $('.identity').attr('data-id', `${random < 1 ? identity = 'legal' : identity = 'illegal'}`)
            $('.dialog p').html(`<p class="m-0 pb-3 fs-5">
                            您的身分為「<span class="identity">${career}</span>」
                            <br>
                            若想更改身分可以再次點擊畫面
                            <button id="checkid">確定身分並開始人生</button>
                        </p>`)
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
    console.log(0)
    $(this).addClass('option2a');
    setTimeout(() => {
        console.log(1)
        $(this).removeClass('option2a');
    }, 1);
    $('.bg').click()
})



$.ajax({
    url: './text/main_story.json',
    // url: './text/careland_story.json',
    method: 'GET',
    dataType: 'json',
    data: '',
    async: true,

    success: res => {
        story = res;
        currentNode = "where";
        let arr_chapter = `<option value="" disabled selected>請選擇章節</option>`
        Object.keys(story).forEach((a, b) => {
            arr_chapter += `<option value="${a}">${a}</option>`
        })
        $('#chapter').html(arr_chapter)
    },
    error: err => {
        console.log(err)
    },
});
let rad;
for (var i = 0; i < 2001; i++) {
    (function (x) {
        window.setTimeout(function () {
            $('.second').attr('style', `bottom:${200 * x / 2000}px`)
            if (x % 20 == 0) {
                $('.num').text(`${100 * x / 2000}%`)
            }
            if (x >= '2000') {
                $('#intrologo').addClass('animate__animated animate__fadeIn ')
                setTimeout(() => {
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
        windowsVH = window.innerHeight / 100;
        console.log('resized')
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

    //顯示圖片
    if (node.img) {
        $('.bg').css('background-image', `url("./img/${node.img}.png")`)
    }

    // 顯示標題
    if (dialog.head) {
        if (node.type == 'interlude') {
            container.append(`<h4 class="mb-3 h2 ${node.type}">${dialog.head.replace(/\n/g, "<br>")}</h4>`);
        } else {
            container.append(`<h4 class="mb-3 fs-4 ${node.type}">${dialog.head.replace(/\n/g, "<br>")}</h4>`);
        }
    }

    // 顯示內容
    if (dialog.description) {
        container.append(`<p class="mb-4 fs-4 ${node.type}">${dialog.description.replace(/\n/g, "<br>").replace('{{帶入職業}}', '<span style="/*color:red;font-size:1.2rem;*/">' + atkstr + '</span>')}</p>`);
        if (node.type == 'interlude') {
            container.append(`<i class="bi bi-caret-down-fill"></i>`)
        }
    }

    // 顯示按鈕或選項
    if (node.type === "question") {
        const options = dialog.options;
        for (const key in options) {
            const opt = options[key];
            if (opt.condition === "none" || opt.condition === identity) {
                console.log(opt.where)
                if (opt.where == undefined || opt.where == where) {
                    container.append(`
                        <a class="option3" data-note="${opt.note}" data-goto="${opt.goto}">
                            ${opt.description.replace(/\n/g, "<br>")}
                        </a>
                    `);
                }
            }
        }
    } else {
        // const btnText = dialog.btn || "再次開始新的人生";
        const btnText = node.type == 'end' ? "再次開始新的人生" : node.btn
        container.append(`
            <a class="option2 ${node.type}" data-goto="${node.goto}" ">${btnText}</a>
            `);
        $.ajax({
            type: 'POST',
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfCjPJJlD0CJ15M6tatxqv1CtUkIVRpY_Coo6Ar8BGgsyZ_9w/formResponse",
            data: {
                "entry.59267215": nodeKey,
            },
            contentType: 'application/json',
            dataType: 'jsonp',
        });
    }
}

function reset() {
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
    $('.bg').css('background-image', ``)
    where = '';
}

$(document).on('click', function (e) {
    if ($(e.target)[0].nodeName == "A") {
        let option = $(e.target).attr('class');
        switch (option) {
            case 'option1':
            case 'option2':
                $(e.target).addClass('option2a');
                setTimeout(() => {
                    $(e.target).removeClass('option2a');
                }, 500);
            case 'option2 interlude':
                $(e.target).addClass('option2a');
                setTimeout(() => {
                    $(e.target).removeClass('option2a');
                }, 500);
            case 'option2 end':
                $(e.target).addClass('option2a');
                setTimeout(() => {
                    $(e.target).removeClass('option2a');
                }, 500);
            case 'option3':
                e.target.classList.remove('animate');
                e.target.classList.add('animate');
                setTimeout(function () {
                    e.target.classList.remove('animate');
                }, 500);
            default:
                if ($(e.target).data('note') != 'undefined') {
                    where = $(e.target).data('note');
                }
                break;
        }
        if (audio) {
            $('#press')[0].play()
        }
        if ($(e.target).data('goto')) {
            $('.bg').removeClass('bgfadeIn')
            $('.bg').addClass('bgfadeOut')
            $('#game').removeClass('animate__fadeIn')
            $('#game').addClass('animate__fadeOut')
            setTimeout(() => {
                $('.bg').removeClass('bgfadeOut')
                $('.bg').addClass('bgfadeIn')
                $('#game').removeClass('animate__fadeOut')
                $('#game').addClass('animate__fadeIn')
                let currentNode = $(e.target).data('goto')
                if (currentNode == 'start') {
                    reset()
                } else if ($(e.target).data('goto') != undefined) {
                    renderNode(currentNode)
                }
            }, 2000);
            $('.bg').click()

        }
    } else if ($(e.target)[0].nodeName == "BUTTON" && $(e.target)[0].id == 'checkid') {
        flip = true
        $('.lotto').removeClass('animate__fadeIn')
        $('.lotto').addClass('animate__fadeOut')
        setTimeout(() => {
            // $('.lotto').remove()
            $('.lotto').addClass('d-none')
            $("#game").removeClass("d-none");  // 顯示遊戲對話區
            renderNode(currentNode);           // 執行顯示第一節點
        }, 2000);
    }
})

// $('#checkid').on('click', function (e) {
//     flip = true
//     $('.lotto').removeClass('animate__fadeIn')
//     $('.lotto').addClass('animate__fadeOut')
//     setTimeout(() => {
//         // $('.lotto').remove()
//         $('.lotto').addClass('d-none')
//         $("#game").removeClass("d-none");  // 顯示遊戲對話區
//         renderNode(currentNode);           // 執行顯示第一節點
//     }, 2000);
// })

let t = window.devicePixelRatio
let r = window.innerHeight
if (t > 1 && t < 2) {
    $('body').attr('style', `zoom:${1 / t};height:${r * t}px;`)
    $('.container').css('height', `${r * t}px`)
    $('.container').css('margin-bottom', '75px')
    $('.main').css('height', `${r * t}px`)
    console.log('resize')
}

$('body').click(function (e) {
    if ($(e.target).hasClass('more')) {
        e.preventDefault();
        amorec.play()
        $('#close-more').click()
    }
});

$('.stylechoose').on('click', function (e) {
    e.preventDefault();
    let style = $(e.target).attr('id');
    if (style) {
        $('#game-test a').each((a, b) => {
            $(b).removeClass($($('#game-test a')[a]).attr('class'))
            $(b).addClass(style)
        })
    }
})

$('#memory-btn').on('click', function (e) {
    e.preventDefault();
    console.log(123)
    $('#memory').removeClass('animate__fadeIn')
    $('#memory').addClass('animate__fadeOut')
})


$('#chapter').on('change', function () {
    if ($('#game').attr('class').search('d-none') > -1) {
        st = false
        $('#stframe').addClass('d-none')
        $('.lotto').addClass('d-none')
        $("#game").removeClass("d-none");  // 顯示遊戲對話區
        flip = true
        renderNode(currentNode);           // 執行顯示第一節點
    }
    console.log($('#chapter').val())
    renderNode($('#chapter').val())
})
$('#career').on('change', function () {
    console.log($('#career').val())
    switch ($('#career').val()) {
        case 0:
            career = '村民A'
            identity = 'legal'
            break;
        case 1:
            career = '祭司'
            identity = 'illegal'
            break;
        case 2:
            career = '鐵匠'
            identity = 'illegal'
            break;
        case 3:
            career = '勇者'
            identity = 'illegal'
            break;
        case 4:
            career = '獵人'
            identity = 'illegal'
            break;
        case 5:
            career = '樵夫'
            identity = 'illegal'
            break;
    }
    atkstr = atkarr[$('#career').val()]
    renderNode($('#chapter').val())
})