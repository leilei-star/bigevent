$(function() {
    //点击没有账号去注册
    $('#go-login').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击已有账号去登录
    $('#go-reg').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    //  从layui中获取four对象
    var form = layui.form
        // 通过layui的 form自定义校验规则
    form.verify({

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        pwd: [
            /^[\S]{6,12}$/, '啊sir密码必须6到12位，且没有空格哦'
        ],
        repwd: function(value) {
            // value == $('#pwds').val()
            if ($('#pwd').val() !== $('#pwds').val()) {
                return ('两次密码输入不一样')
            }
        }
    });
    //  从layui中获取layer对象
    var layer = layui.layer
        //注册表单提交验证
    $('#submit-reg').on('submit', function(e) {
            e.preventDefault();
            $.post('/api/reguser', {
                    username: $('#submit-reg [name=username]').val(),
                    password: $('#submit-reg [name=password]').val()
                },

                function(res) {
                    // console.log($('#submit-reg [name=username]').val());
                    // console.log(res.status);
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg('注册成功');
                    $('#go-reg').click()

                })

        })
        // 登录表单提交验证
    $('#submit-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/login",
            //快速获取数据
            data: $(this).serialize(),

            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('登录成功');
                //页面跳转
                location.href = '/index.html'
                    //将得到的token字符串保存到本地存储里面
                localStorage.setItem('token', res.token)
            }

        });




    })
})