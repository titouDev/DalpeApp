<?php


include("connectSql.php");

$query = " SELECT historique_entretient.id, historique_entretient.entretientDate, historique_entretient.description, historique_entretient.prix FROM historique_entretient INNER JOIN vehicules ON historique_entretient.vehiculeId = vehicules.id WHERE vehicules.id = ".$_GET['vehiculeId'];

$result = mysql_query($query);
$nbrows = mysql_num_rows($result);

if($nbrows>0){
	while($rec = mysql_fetch_array($result,1)){
                       
		$arr[] = $rec;
	}
	$jsonresult = JEncode($arr);
	echo $_GET['callback'].'({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
} else {
	echo $_GET['callback'].'({"total":"0", "results":""})';
}

mysql_close($con);


?>
