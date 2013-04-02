<?php


include("connectSql.php");



$query = "INSERT INTO sousTraitantsFax (sousTraitantId, message) VALUES (".$_GET['sousTraitantId'].",'".$_GET['message']."') " ;

$result = mysql_query($query);

mysql_close($con);
echo 'Fax sauvegarŽ avec succs.';

?>
