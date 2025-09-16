// let imgPreloadArr = [];
// function preload() {
//     $.ajax({
//         url: "./text/preload.txt",
//         dataType: "text",
//         success: function (update) {
//             // let i = 0;
//             // arr = update.toString().replaceAll('\r', '').split('\n')
//             // arr.forEach(a => {
//             //     console.log(a)
//             //     const img = new Image();
//             //     img.src = `.${a}`;
//             //     imgPreloadArr.push(img);
//             // });
//             arr = update.toString().replaceAll('\r', '').split('\n')
//             for (let i = 0; i < arr.length; i++) {
//                 setTimeout(() => {
//                     let img = new Image();
//                     img.src = `.${arr[i]}`;
//                     imgPreloadArr.push(img)
//                     console.log(`${arr[i]} loaded`)
//                 }, i * 200);
//             }
//         }
//     });
// }
// preload()

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function preloadImages(paths, concurrency = 8) {
  const q = paths.slice(); // 複製一份
  const results = [];
  const workers = Array.from({ length: concurrency }, async () => {
    while (q.length) {
      const p = q.shift();
      const img = await loadImg(`.${p}`);
      results.push(img);
    }
  });
  await Promise.all(workers);
  return results;
}

$.ajax({
  url: "./text/preload.txt",
  dataType: "text",
  success(update) {
    const arr = update.toString().replaceAll('\r','').split('\n').filter(Boolean);
    preloadImages(arr).then(imgs => {
      imgPreloadArr.push(...imgs);
      console.log(`Preloaded ${imgs.length} images`);
    });
  }
});

function loadImgWithLog(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { console.log(src, 'loaded'); resolve(img); }
    img.onerror = (e) => { console.warn(src, 'failed', e); reject(e); }
    img.src = src;
  });
}

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
let identity = 'illegal';
let flip = false;
let mute = '';
let st = true;
let career = '';
let num_career = '';
let owhere = '';
let where = '';
let area = '';
let issue = '';
let destination = '';
let codename = '';
let canvas = '';

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
    if (mute == false) {
        amore.play()
    }
    $('.more').toggleClass('fadein')
    $('.more').toggleClass('fadeout')
    $('.more').css('display', 'flex')
})
$('#close-more').on('click', function (e) {
    e.preventDefault();
    $('.more').toggleClass('fadein')
    $('.more').toggleClass('fadeout')
    if (mute == false) {
        amorec.play()
    }
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
        // $('.back img')[0].height = th
        // $('.back img')[1].height = 0
        // $('#light')[0].style.top = '0px'
        console.log($('.back img')[0].height)
        $('.lotto')[0].style = `--cardh:${$('.front img')[0].height}px;`
        $($('.idcard.back img')[0]).removeClass('up')
        $($('.idcard.back img')[1]).removeClass('down')
        if (audio) {
            cardflip.play()
        }
        setTimeout(function () {
            let random = Math.floor(Math.random() * 11)
            $('.lotto .front').addClass('ryp')
            $('.lotto .back').addClass('ryn')
            random > 5 ? random = random - 5 : random
            switch (random) {
                case 0:
                    career = '村民A'
                    identity = 'legal'
                    $('#careercard')[0].src = './img/lottery/VILLAGER.webp'
                    break;
                case 1:
                    career = '祭司'
                    identity = 'illegal'
                    $('#careercard')[0].src = './img/lottery/PRIEST.webp'
                    break;
                case 2:
                    career = '鐵匠'
                    identity = 'illegal'
                    $('#careercard')[0].src = './img/lottery/FORGER.webp'
                    break;
                case 3:
                    career = '勇者'
                    identity = 'illegal'
                    $('#careercard')[0].src = './img/lottery/HERO.webp'
                    break;
                case 4:
                    career = '獵人'
                    identity = 'illegal'
                    $('#careercard')[0].src = './img/lottery/HUNTER.webp'
                    break;
                case 5:
                    career = '樵夫'
                    identity = 'illegal'
                    $('#careercard')[0].src = './img/lottery/LOGGER.webp'
                    break;
            }
            if (random > 5) {
                num_career = random - 6
            } else {
                num_career = random
            }

            setTimeout(() => {
                $('#light').removeClass('d-none')
                $('#light').addClass('light')
                $($('.idcard.back img')[0]).addClass('up')
                $($('.idcard.back img')[1]).addClass('down')
                setTimeout(() => {
                    $('#light').addClass('d-none')
                }, 2000);
            }, 4000);
            $('#c_lottery').addClass('d-none')
            $('#c_result').removeClass('d-none').html(
                `
                您的身分為「<span class="identity">${career}</span>」
                <br>
                若想更改身分可以再次點擊畫面
                <button id="checkid">確定身分並開始人生</button>
                `
            )
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
    }, 1);
    $('.bg').click()
})

$.ajax({
    url: './text/main_story.json?_=1.05',
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

let testa = ''

function renderNode(nodeKey, dev) {
    const node = story[nodeKey];
    if (!node) return;

    const container = $("#game");
    container.empty();  // 清空舊內容
    const dialog = node.dialog;

    //顯示圖片
    if (node.img) {
        $('.bg').css('background-image', `url("./img/${node.img}.webp")`)
    }

    // 顯示標題
    if (dialog.head) {
        if (node.type == 'interlude') {
            container.append(`<h4 class="mb-3 h2 ${node.type}">${dialog.head.replace(/\n/g, "<br>")}</h4>`);
        } else if (node.type == 'end' && dev == 'false') {

            container.append(`<a id="share" class="position-absolute" style="font-size:2rem;right:10%;top:2.5rem;"><i onclick="share()" class="bi bi-box-arrow-up"></i></a><h4 class="mb-3 fs-4 ${node.type}">${dialog.head.replace(/\n/g, "<br>")}</h4>`);
        } else {
            container.append(`<h4 class="mb-3 fs-4 ${node.type}">${dialog.head.replace(/\n/g, "<br>")}</h4>`);
        }
    }

    // 顯示內容
    let str
    try {
        str = dialog.career[num_career]
    } catch (error) {
    }
    if (dialog.description) {
        container.append(`<p class="mb-4 fs-4 ${node.type}">${dialog.description.replace(/\n/g, "<br>").replace('{{帶入職業}}', '<span style="/*color:red;font-size:1.2rem;*/">' + str + '</span>').replace('{{出生地}}', owhere).replace('{{現實出生地}}', where).replace('{{環境}}', area).replace('{{問題}}', issue)}</p>`);
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
                // if (opt.where == undefined || opt.where == where) {
                //     container.append(`
                //         <a class="option3" data-note="${opt.note}" data-goto="${opt.goto}">
                //             ${opt.description.replace(/\n/g, "<br>")}
                //         </a>
                //     `);
                // }
                container.append(`
                    <a class="option3" data-note="${opt.note}" data-goto="${opt.goto}">
                        ${opt.description.replace(/\n/g, "<br>")}
                    </a>
                `);
            }
        }
    } else {
        // const btnText = dialog.btn || "再次開始新的人生";
        const btnText = node.type == 'end' ? "再次開始新的人生" : node.btn
        container.append(`
            <a class="option2 ${node.type}" data-goto="${node.goto}" ">${btnText}</a>
            `);
        if (node.type == 'end' && dev != 'false') {
            console.log(dev)
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
    if (node.type == 'end') {
        $('#share-img').remove()
        $('#window').append(`<div id="share-img" class="w-100 d-none"">
	<div class="position-absolute w-100 z-3 text-center">
		<h2 class="mt-4">命運之書<br>未完的童話</h2>
		<h3 class="mb-3 ${node.type}">${dialog.head.split('\n',)[1]}</h3>
	<p class="mx-4 fs-5 text-justify" style="text-align: justify;line-height:1.4">${dialog.description.replace(/\n/g, "<br>").replace('{{帶入職業}}', '<span style="/*color:red;font-size:1.2rem;*/">' + '' + '</span>').replace('{{出生地}}', owhere).replace('{{現實出生地}}', where).replace('{{環境}}', area).replace('{{問題}}', issue).split(`<br><span class='text-center fs-5 d-block'>看看你的選擇`)[0]}</p></div>
    <img src="./img/ending/${codename}.png" class="w-100 position-absolute">`)
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
    $('#c_lottery').removeClass('d-none')
    $('#c_result').addClass('d-none')
    owhere = '';
    where = '';
    area = '';
    issue = '';
    destination = '';
    codename = '';
    $('#share-img').remove()
    $('#close-canvas').remove()
    $('#endimg').remove()
}

$(document).on('click', function (e) {
    e.preventDefault();
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
                if ($(e.target).data('note') != 'undefined') {
                    let goto = $(e.target).data('goto');
                    console.log(goto)
                    switch (goto) {
                        case 'intro':
                            owhere = $(e.target).text().trim();
                            where = $(e.target).data('note')
                            break;
                        case 'd':
                            area = '沙漠';
                            issue = '出生即不斷高燒';
                            codename = 'd';
                            break;
                        case 'j':
                            area = '叢林';
                            issue = '檢查出罕見疾病';
                            codename = 'j';
                            break;
                        case 'g':
                            area = '草原';
                            issue = '施打疫苗';
                            codename = 'g';
                            break;
                        default:
                            break;
                    }
                }
            default:
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
        if ($(e.target).parentsUntil('#close-canvas') == 'close-canvas') {
            $('#endimg').remove()
            $('#close-canvas').remove()
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
    // if ($($(e.target)[0]).parent()[0].id == 'share') {

    // }
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
    renderNode($('#chapter').val(), 'false')
})
$('#career').on('change', function () {
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
    num_career = $('#career').val() - 1
    renderNode($('#chapter').val(), 'false')
})

function share() {
    $('#share-img').removeClass('d-none')
    html2canvas(document.querySelector('#share-img'), {
        useCORS: true,
        allowTaint: false,
        scale: 1.4,           // 較高解析度，視需求
        backgroundColor: null // 若要保留透明背景
    }).then(canvas => {
        $('#window').append(`<img id="endimg" src="${canvas.toDataURL('image/png')}">`)
        $('#window').append(`<div id="close-canvas"><a href="#">
            <svg onclick="closec()" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x-lg text-black p-1 border-black" viewBox="0 0 16 16">
            <path onclick="closec()" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
            </svg>
            </a></div>`)
    });
    $('#share-img').addClass('d-none')
}

function closec() {
    $('#endimg').remove()
    $('#close-canvas').remove()
}
