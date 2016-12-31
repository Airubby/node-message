(function() {
    "use strict"


    $("#tijiao").on("click", function() {
        $("#shibai").hide();
        $("#chenggong").hide();
        let xingming = $("#xingming").val();
        let liuyan = $("#liuyan").val();
        let shijian = new Date();
        if (xingming == "" || liuyan == "") {
            alert("请填写信息！");
            return;
        } else {
            $.post("/tijiao", {
                "xingming": xingming,
                "liuyan": liuyan
            }, function(result) {
                if (result.resultInfo == -1) {
                    $("#shibai").fadeIn();
                } else if (result.resultInfo == 1) {
                    $("#chenggong").fadeIn();
                    window.location.reload();

                    // _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
                    // let compiled = _.template($("#moban").html());
                    // let htmlStr = compiled({
                    //     xingming: xingming,
                    //     liuyan: liuyan,
                    //     shijian: shijian,
                    // });
                    // $(htmlStr).insertBefore($("#quanbuliuyan"));
                    //$("#quanbuliuyan").prepend($(htmlStr));
                }

            });
        }

    });

    //get /info不需要了，只是前期测试用到
    // $.get("/info", function(result) {
    //     _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
    //     let compiled = _.template($("#moban").html());
    //     for (var i = 0; i < result.resultInfo.length; i++) {
    //         let htmlStr = compiled({
    //             xingming: result.resultInfo[i].xingming,
    //             liuyan: result.resultInfo[i].liuyan,
    //             shijian: result.resultInfo[i].shijian,
    //             id: result.resultInfo[i]._id
    //         });
    //         //$(htmlStr).insertAfter($("#quanbuliuyan"));
    //         $("#quanbuliuyan").append($(htmlStr));
    //     }
    // });

    let nowpage = 1;
    let pageli = $("#pagination li");
    let pageAll = pageli.length - 2;
    let show = 7;
    let begin, end;

    loop();


    $(".pageBtn:first").addClass("active");
    $(".pageBtn").click(function() {
        let page = parseInt($(this).attr("data-page"));
        nowpage = page;
        getData(page);
        loop();

        $(this).addClass("active").siblings().removeClass("active");
    });
    getData(1);

    $(".prevbtn").click(function() {
        if (nowpage > 1) {
            nowpage--;
            getData(nowpage);
            loop();
            $(pageli[nowpage]).addClass("active").siblings().removeClass("active");
        }
    });
    $(".nextbtn").click(function() {
        if (nowpage < pageAll) {
            nowpage++;
            getData(nowpage);
            loop();
            $(pageli[nowpage]).addClass("active").siblings().removeClass("active");
        }
    });

    function loop() {
        begin = nowpage - Math.floor(show / 2);
        begin = begin < 1 ? 1 : begin;
        end = begin + show;
        if (end > pageAll) {
            end = pageAll + 1;
            begin = end - show;
            begin = begin < 1 ? 1 : begin;
        }
        for (var i = 1; i <= pageAll; i++) {
            $(pageli[i]).css("display", "none");
        }
        for (var i = begin; i < end; i++) {
            $(pageli[i]).css("display", "inline-block");
        }
    }

    function getData(page) {
        $.get("/info?page=" + (page - 1), function(result) {
            _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
            let compiled = _.template($("#moban").html());
            $("#quanbuliuyan").html("");
            for (var i = 0; i < result.resultInfo.length; i++) {
                let htmlStr = compiled({
                    xingming: result.resultInfo[i].xingming,
                    liuyan: result.resultInfo[i].liuyan,
                    shijian: result.resultInfo[i].shijian,
                    id: result.resultInfo[i]._id
                });
                //$(htmlStr).insertAfter($("#quanbuliuyan"));
                $("#quanbuliuyan").append($(htmlStr));
            }
        });
    }




})();