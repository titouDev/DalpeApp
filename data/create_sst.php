<?php


include("connectSql.php");


$firephp->log($_SERVER["REQUEST_METHOD"], 'Iterators');

	
$query = "INSERT INTO soustraitants (name) VALUES ('".$_GET['name']."') " ;
$result = mysql_query($query);

$query = "SELECT * FROM soustraitants WHERE name = '".$_GET['name']."'";

$result = mysql_query($query);
$nbrows = mysql_num_rows($result);

if($nbrows>0){
	while($rec = mysql_fetch_array($result,1)){
                       
		$arr[] = $rec;
	}
	$jsonresult = JEncode($arr);
	echo '{"total":"'.$nbrows.'","results":'.$jsonresult.'}';
} else {
	echo '{"total":"0", "results":""}';
}

mysql_close($con);

?>
