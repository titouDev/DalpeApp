<?php
require_once('../mysql_connect.php');
$userId = $_GET["userId"];
$method = $_GET["method"];

if ($method == 'save') {
    $value = $_GET["value"];
    $name = $_GET["name"];
    $query = sprintf("INSERT INTO state_extjs (userId, value, name) VALUES (%s,'%s','%s') ON DUPLICATE KEY UPDATE value='%s'",$userId, $value, $name, $value);
    $_db = connectToDbMySql();
    if ($stmt = $_db->prepare($query)) {
        $stmt->execute();
        $stmt->close();
    }
}
else if($method == 'get') {
    $query = sprintf("SELECT name, value FROM state_extjs WHERE userId = %s", $userId);
    $_db = connectToDbMySql();
    $_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
    $result = $_result->fetch_assoc();
    //FIX ME  on doit retourner une paire....
    echo ($result['value']);
}
?>