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
                }
                console.log(result);
            });
        }

    });


})();