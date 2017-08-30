<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <base href="$!link.contextPath">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript" src="$!link.contextPath/resource/jquery/jquery-1.9.1.min.js"></script>
	<script type="text/javascript">
        jQuery(document).ready(function () {
            $("#button").click(function () {
                var value = $("input").val();
                $.ajax({
                    url: "$!link.contextPath/changeValue.do",
                    type: "Post",
                    data: {value: value},
                    success: function (data) {
                        alert(data.items.test);
                    },
                    error: function () {
                        alert("error");
                    }
                })
            });
        })
	</script>
  </head>
  
  <body>
    This is my JSP page. <br>
    $!test,$!link.contextPath
    <input style="width: 250px" />
    <button id="button">button</button>
  </body>
</html>
