<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <script lang="javascript">
      function OnClose(check)
      {
        if(check == true)
        {
          var value = document.getElementById("password").value;
          window.returnValue = value;
        }
        window.close();
      }
    </script>
  </head>
  <body scroll="no">
    <div style="width:200px; left:10px; top:20px; position:relative; height:55px">

      <div  style="width:208px; left:0px; top:0px; position:absolute; height:24px">
        <font class="big1_text">输入审核密码</font>
      </div>

      <div style="width:auto; left:114px; top:0px; position:absolute; height:20px">
        <input type="text" id="password" size="12" maxlength="20"/>
      </div>

      <div style="width:60px; left:170px; top:30px; position:relative; height:20px">
        <input type="button" value="确认" onclick="OnClose(true)" />
      </div>

    </div>
  </body>
</html>