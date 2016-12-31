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

                    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
                    let compiled = _.template($("#moban").html());
                    let htmlStr = compiled({ xingming: xingming, liuyan: liuyan, shijian: shijian });
                    //$(htmlStr).insertBefore($("#quanbuliuyan"));
                    $("#quanbuliuyan").prepend($(htmlStr));
                }

            });
        }

    });


    $.get("/info", function(result) {

        _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
        let compiled = _.template($("#moban").html());
        for (var i = 0; i < result.resultInfo.length; i++) {
            let htmlStr = compiled({ xingming: result.resultInfo[i].xingming, liuyan: result.resultInfo[i].liuyan, shijian: result.resultInfo[i].shijian });
            //$(htmlStr).insertAfter($("#quanbuliuyan"));
            $("#quanbuliuyan").append($(htmlStr));
        }


    });

    let nowpage = 1;
    let pageli = $("#pagination li");
    let pageAll = pageli.length;
    $(".pageBtn:first").addClass("active");
    $(".pageBtn").click(function() {
        let page = parseInt($(this).attr("data-page"));
        nowpage = page;
        getData(page);
        $(this).addClass("active").siblings().removeClass("active");
    });
    getData(1);

    $(".prevbtn").click(function() {
        if (nowpage > 1) {
            nowpage--;
            getData(nowpage);
            $(pageli[nowpage]).addClass("active").siblings().removeClass("active");
        }
    });
    $(".nextbtn").click(function() {
        if (nowpage < pageAll - 2) {
            nowpage++;
            getData(nowpage);
            $(pageli[nowpage]).addClass("active").siblings().removeClass("active");
        }
    });


    function getData(page) {
        $.get("/info?page=" + (page - 1), function(result) {
            _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
            let compiled = _.template($("#moban").html());
            $("#quanbuliuyan").html("");
            for (var i = 0; i < result.resultInfo.length; i++) {
                let htmlStr = compiled({ xingming: result.resultInfo[i].xingming, liuyan: result.resultInfo[i].liuyan, shijian: result.resultInfo[i].shijian });
                //$(htmlStr).insertAfter($("#quanbuliuyan"));
                $("#quanbuliuyan").append($(htmlStr));
            }
        });
    }




})();