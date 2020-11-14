function parseTime(time) {
    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];
    s = Number(hour * 3600) + Number(min * 60) + Number(sec);
    return s
}

(function () {
    const delay = 4 * 1000;
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    // 初始化一下
    $(".playButton").click();
    let mode = '';
    mode = '刷习惯分';
    var duration = 27*60
    var preChapSum = 0
    const start = async function (mode) {
        console.log("智慧树助手已启动");

        if (mode === '刷习惯分') {
            console.log("习惯分模式");
            if ($(".definiBox").find("span").text() !== "流畅") {
                console.log("更改画质");
                $(".line1bq").click();
            }

            console.log('等待初始化完成')
            await sleep(10000)
            console.log('完成？')
            let curChapUse = parseTime($('.nPlayTime').find('.duration')[0].innerText) - parseTime($('.nPlayTime').find('.currentTime')[0].innerText)
            // 弹出循环用观看视频的分钟数
            while (preChapSum < duration) {
                if ($(".volumeBox").find(".passVolume").height() != 0) {
                    console.log("静音");
                    $(".volumeIcon").click();
                }

                if ($(".playButton").length) {
                    console.log("点击播放");
                    $(".playButton").click();
                }

                if ($(".dialog-test").length) {
                    console.log("发现弹题");
                    await sleep(1000);
                    $(".dialog-test").find(".topic-item")[0].click();
                    await sleep(1000);
                    $(".dialog-test").find(".btn").click();

                    if ($(".playButton").length) {
                        console.log("点击播放");
                        $(".playButton").click();
                    }
                }
                if ($(".nPlayTime").length && $('.nPlayTime').find('.duration')[0].innerText === $('.nPlayTime').find('.currentTime')[0].innerText
                ) {
                    console.log("本节完成，" + delay / 1000 + " 秒后将切到下一课");
                    preChapSum += curChapUse
                    console.log('总共观看' + preChapSum + '秒')
                    $(".controlsBar").find(".nextButton").click();
                    await sleep(5000);
                    curChapUse = parseTime($('.nPlayTime').find('.duration')[0].innerText) - parseTime($('.nPlayTime').find('.currentTime')[0].innerText)
                    if (curChapUse + preChapSum > 44 * 60 && preChapSum < 25 * 60) {
                        preChapSum +=10*60
                        setTimeout("$(\".pauseButton\").click();window.location.href='https://www.zhihuishu.com/'", 1000 * 60 * 10)
                    }
                }
                await sleep(1000);
            }
        } else {
            console.log("冲刺模式");
            while (true) {
                if (!$(".speedBox").find("span").text().match(/1\.5/)) {
                    console.log("提升到1.5倍速");
                    $(".speedTab15").click();
                }

                if ($(".volumeBox").find(".passVolume").height() != 0) {
                    console.log("静音");
                    $(".volumeIcon").click();
                }

                if ($(".playButton").length) {
                    console.log("点击播放");
                    $(".playButton").click();
                }

                if ($(".dialog-test").length) {
                    console.log("发现弹题");
                    await sleep(delay);
                    $(".dialog-test").find(".topic-item")[0].click();
                    await sleep(delay);
                    $(".dialog-test").find(".btn").click();
                }

                if ($(".current_play").find(".time_icofinish").length) {
                    console.log("本节完成，" + delay / 1000 + " 秒后将切到下一课");
                    await sleep(delay);
                    $(".controlsBar").find(".nextButton").click();
                }

                await sleep(1000);
            }
        }
        if (mode = '刷习惯分') {
            if ($('.pauseButton').length) {
                $('.pauseButton')[0].click()
            }
            await sleep(1000)
            alert('已观看视频' + parseInt(preChapSum/60) + '分')
        }
    };

    start(mode);
})();