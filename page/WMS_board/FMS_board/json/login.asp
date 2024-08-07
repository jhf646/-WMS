<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!--#include file="../Include/Conn.asp" -->
<!--#include file="../Include/sql.asp"--> 
<!--#include file="../Include/inc.asp"--> 
<!--#include file="md5.Asp"-->
<%if session("admin")<>"" then response.redirect "index.asp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>自由策划网站后台管理系统</title>
<link href="images/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//<!CDATA[
	var bodyBgs = [];
	bodyBgs[0] = "login_bj/001.jpg";
	bodyBgs[1] = "login_bj/002.jpg";
	bodyBgs[2] = "login_bj/003.jpg";
	bodyBgs[3] = "login_bj/004.jpg";
	bodyBgs[4] = "login_bj/005.jpg";
	bodyBgs[5] = "login_bj/006.jpg";
	var randomBgIndex = Math.round( Math.random() * 6 );document.write('<style>body{margin:0 auto; padding:0;background:#0496DA url(' + bodyBgs[randomBgIndex] + ') top center no-repeat}</style>');
//]]>
</script>
</head>
<body>
<%'如果未获取到可显示为
agent = Request.ServerVariables("HTTP_USER_AGENT")
if Instr(agent,"MSIE 6.0")>0 then
ieVer="Internet Explorer 6.0"
else
end if%>
<div id="login"><div class="loginbox">
<div class="loginlogo"><div class="inc"><a href="http://www.zychr.com" target="_blank">ZYCH <%=zver%>-<%=zversion%></a></div>
</div>
<form name="add" method="post" action="login.asp?login=ok">
<input name="ipdz" type="hidden" class="inpu" id="ipShow"/>
<div class="name"><input name="admin" type="text" class="inpu" id="name" size="23" maxlength="20" /></div>
<div class="pass"><input name="password" type="password" class="inpu" id="pass" size="23" maxlength="20" /></div>
<%if code=0 then %><div class="code"><input name="VerifyCode" type="text" class="inpu"  size="10" /><div class="img_code"><img src="../Include/safecode.asp?" alt="图片看不清？点击重新得到验证码" width="85" height="30" style="cursor:hand;" onClick="this.src+=Math.random()" /></div></div>
<%end if%>
<input type="submit" value="登  陆" class="submit" /> 
</form>
<div class="ver">Copyright &copy;2011-<%=year(date())%> <a href="http://www.zychr.com" target="_blank">自由策划 <%=zver%></a> Inc. All rights reserved.  </div>
</div></div>
<%if ieVer="Internet Explorer 6.0" then%>
<div id="iets">您的IE浏览器为<%= ieVer %> 版本太低 <a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank">立即下载升级</a></div>
<%else 
end if%>
<!--获取后台IP的地方地址-->
<script charset="gb2312" src=http://<%=zurl%>/Include/IP/ip.asp?action=d&id=ipShow&way=value></script>
</body>
</html>
<%
webd=ubound(split(az,"."))
if Request.QueryString("login")="ok" then
	webd=ubound(split(az,"."))
	webq=Replace(az,".","")
	admin=Replace(request.Form("admin"), "'", "''") 
	// passwor=md5(Request("password"))
	passwor=Request("password")
	password=passwor&d
	ipdz=Replace(request.Form("ipdz"), "'", "''") 
	if code=0 then
	VerifyCode=request.form("VerifyCode") 
	if  VerifyCode="" then 
	response.Write("<script language=javascript>alert('验证码不能为空!');history.go(-1)</script>") 
	response.end
	end if 
	if cstr(Session("firstecode"))<>cstr(Request.Form("VerifyCode")) then
	response.Write("<script language=javascript>alert('验证码错误!');history.go(-1)</script>")
	response.End
	end if
	end if 
	sql="select * from admin where admin='"&admin&"' and password='"&password&"" 
	set rs=conn.execute(sql) 
	if rs.eof or rs.bof then
	response.Write("<script language=javascript>alert('帐号或密码错误!');history.go(-1)</script>")
	else 
	session("admin")=rs("admin") 
	session("key")=int(rs("key"))
	session.timeout=9999 '登陆会话时间，60分钟后自动退出。
	sql="update admin set dldata=#"&now()&"#, dlcs=dlcs+1 where admin='"&session("admin")&"'" '记录登陆时间
	conn.execute(sql)
	ip=request.servervariables("remote_addr")
	sqli="INSERT INTO admincount (name, ip, dz) VALUES ('"&rs("admin")&"', '"&ip&"', '"&ipdz&"')"
	conn.execute(sqli)
	If webd<3 and webd<>0 and not isnumeric(webq) Then Response.Write gowith(url&udata)
	response.redirect "index.asp" 
	end if 
end if
%>   
