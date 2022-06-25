let showerrormsg = function(n)
{
    s = [];
    if(n == 0)
    {
        document.getElementById("massage").innerHTML = s;
        document.getElementById("submit").disabled = false;
    }
    if(n == 1)
    {
        s = "请输入用户名";
        document.getElementById("massage").innerHTML = s;
        document.getElementById("submit").disabled = true;
    }
    if(n == 2)
    {
        s = "用户名只能包含数字，字母和下划线";
        document.getElementById("massage").innerHTML = s;
        document.getElementById("submit").disabled = true;
    }
    if(n == 3)
    {
        s = "请输入密码";
        document.getElementById("massage").innerHTML = s;
        document.getElementById("submit").disabled = true;
    }
    if(n == 4)
    {
        s = "重复密码与密码不相等";
        document.getElementById("massage").innerHTML = s;
        document.getElementById("submit").disabled = true;
    }
    if(n == 5)
    {
        s = "请勾选同意用户协议";
        document.getElementById("massage").innerHTML = s;
        document.getElementById("submit").disabled = true;
    }
}

let nicknameinput = function()
{
    s = [];
    nickname = document.getElementById("nickname").value;
    if (nickname == '')
    {
        showerrormsg(1);
        document.getElementById("username").value = '';
        return;
    }
    n = nickname.search(/^\w+$/);
    if(n!=0)
    {
        showerrormsg(2);
        document.getElementById("username").value = '';
        return;
    }
    showerrormsg(0);
    ss = [];
    ss += nickname;
    ss += "@stu.xmut.edu.cn";
    document.getElementById("username").value = ss;
    passwordinput();
}

let passwordinput = function()
{
    password = document.getElementById("password").value;
    repassword = document.getElementById("repeatpsd").value;
    if(password == '')
    {
        showerrormsg(3);
        nicknameinput();
        return;
    }
    if(password === repassword);
    else
    {
        document.getElementById("repeatpsd").style.borderColor = "#FF0000";
        showerrormsg(4);
        nicknameinput();
        return;
    }
    document.getElementById("repeatpsd").style.borderColor = "black";
    showerrormsg(0);
    protocalclick();
}

let protocalclick = function()
{
    if(document.getElementById("protocal").checked == false)
    {
        showerrormsg(5);
        passwordinput();
        return;
    }
    showerrormsg(0);
}

nicknameinput();