<?php


include("connectSql.php");


$query = "SHOW TABLES" ;	

$result = mysql_query($query);
while($rec = mysql_fetch_array($result,1)){
	       
	$arr[] = $rec;
}

mysql_close($con);

$jsonresult = JEncode($arr);
echo '{"results":' . $jsonresult . '}';
?>
