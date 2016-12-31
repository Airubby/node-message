(function() {
    "use strict"


    $("#tijiao").on("click", function() {
        $("#shibai").hide();
        $("#chenggong").hide();
        let xingming = $("#xingming").val();
        let liuyan = $("#liuyan").val();
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
                    let htmlStr = compiled({ xingming: xingming, liuyan: liuyan });
                    $(htmlStr).insertBefore($("#quanbuliuyan"));

                }

            });
        }

    });


    $.get("/info", function(result) {

        console.log(result);

        _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
        let compiled = _.template($("#moban").html());
        for (var i = 0; i < result.resultInfo.length; i++) {
            let htmlStr = compiled({ xingming: result.resultInfo[i].xingming, liuyan: result.resultInfo[i].liuyan });
            $(htmlStr).insertAfter($("#quanbuliuyan"));
        }


    });


})();