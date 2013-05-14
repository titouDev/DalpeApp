<?php


include("connectSql.php");
if ($_GET['addColumn'])
{
    //Par default on cree un int()
    $query = "ALTER TABLE " . $_GET['tableName']  . " ADD ".$_GET['columnName']." INT ";	
    
}
else if ($_GET['updateName'])
{
    $query = "ALTER TABLE " . $_GET['tableName']  . " CHANGE ".$_GET['columnName']." ".$_GET['newColumnName']." ".$_GET['columnType'];	
    
}
else if ($_GET['updateType'])
{
    $query = "ALTER TABLE " . $_GET['tableName']  . " MODIFY ".$_GET['columnName']." ".$_GET['columnType'];	
    
}
else if ($_GET['deleteColumn'])
{
    $query = "ALTER TABLE " . $_GET['tableName']  . " DROP ".$_GET['columnName'];
}
else if ($_GET['addIndex'])
{
    //Index type  INDEX ou UNIQUE
    //On verifie si la column a deja un index
    $queryIndex = "SHOW INDEXES FROM ".$_GET['tableName']." where column_name = '".$_GET['columnName']."'";
    $result = mysql_query($queryIndex);
    $nbrows = mysql_num_rows($result);
    echo $nbrows;
    $query='';
    if ($nbrows>0)
    {
        $indexName = mysql_result($result,0,'Key_name');
        $query = 'ALTER TABLE '. $_GET['tableName']  . ' DROP INDEX '.$indexName.';';
        $result = mysql_query($query);
    }
    $query = "ALTER TABLE " . $_GET['tableName']  . " ADD ".$_GET['indexType']." (".$_GET['columnName'].");";    
    
    
}
else if ($_GET['removeIndex'])
{
    $queryIndex = "SHOW INDEXES FROM ".$_GET['tableName']." where column_name = '".$_GET['columnName']."'";
    $result = mysql_query($queryIndex);
    $nbrows = mysql_num_rows($result);
    echo $nbrows;
    $query='';
    if ($nbrows>0)
    {
        $indexName = mysql_result($result,0,'Key_name');
        $query = 'ALTER TABLE '. $_GET['tableName']  . ' DROP INDEX '.$indexName.';';
        $result = mysql_query($query);
    }

    
}
else if ($_GET['allowNull'])
{
    $query = "ALTER TABLE " . $_GET['tableName']  . " MODIFY ".$_GET['columnName']." ".$_GET['columnType'] . " " . $_GET['nullValue'];
    
}

echo $query . "<br>";

$result = mysql_query($query);
echo $result;
mysql_close($con);


?>
