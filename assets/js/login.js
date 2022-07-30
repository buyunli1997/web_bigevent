$(function () {
    /* 点击去登录 */
    $('#login-link').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    /* 点击去注册 */
    $('#reg-link').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //只要导入了layui的js文件，就可以使用layui这个对象，跟jquery一样
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格']
        ,
        //检测两次密码是否一致
        repwd: function (value) {
            //通过形参value拿到密码框输入值
            let repassword = $('.reg-box [name=repassword]').val()
            if (repassword !== value) {
                return '两次输入密码不一致'
            }

        }
    })
    //监听注册表单提交
    var layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        //发起ajax的post请求
        $.post('/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功')
            $('#login-link').click()
        })
    })

    //监听登录表单的提交事件
    $('#form-login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })





})