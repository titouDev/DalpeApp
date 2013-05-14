<?php


include("connectSql.php");


$query = "SHOW COLUMNS FROM " . $_GET['tableName'] ;	
$result = mysql_query($query);
	while($rec = mysql_fetch_array($result,1)){
                       
		$arr[] = $rec;
	}
	$jsonresult = JEncode($arr);
echo '{"results":'.$jsonresult.'}';

mysql_close($con);


?>
