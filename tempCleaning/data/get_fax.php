<?php


include("connectSql.php");



$query = "SELECT id,DATE_FORMAT(creationDate,'%m/%d/%Y') as creationDate,message
	FROM sousTraitantsFax WHERE sousTraitantId = " . $_GET['sousTraitantId'] ;
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
