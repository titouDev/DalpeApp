<?php


include("connectSql.php");


$query = "CREATE TABLE `". $_POST['tableName'] ."`
	( `id` int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`))
	ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT" ;	

$result = mysql_query($query);

mysql_close($con);

echo '{"succes":true}';
?>
