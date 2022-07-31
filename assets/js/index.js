$(function () {
    getUserInfo()

    //给’退出‘绑定监听事件
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })

})

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        /* heders: { Authorization: localStorage.getItem('token') || '' }, */
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        //不论登陆成功或者失败，都会调用complete函数
        /* complete: function (res) {
            console.log('执行了complete回调函数');
            console.log(res)
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {

                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }  */
    })
}

function renderAvatar(user) {
    //获取用户的昵称
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染图片头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }
}




