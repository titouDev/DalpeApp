<?php


include("connectSql.php");



$query = "SELECT * FROM soustraitants " ;
if (isset($_GET['searchText']))
{
	
	$query .= " WHERE name like '%".$_GET['searchText']."%'";
}

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
