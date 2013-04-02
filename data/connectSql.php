<?php
require_once('../FirePHPCore/FirePHP.class.php');
ob_start();


$firephp = FirePHP::getInstance(true);
 
 

/*
$con = mysql_connect("localhost","dalpe","simon");

if (!$con)
    {
    die('Could not connect: ' . mysql_error());
    }
mysql_select_db("dalpe_construction", $con);
mysql_query("SET NAMES 'utf8'");
  
function JEncode($arr){
    if (version_compare(PHP_VERSION,"5.2","<"))
    {
        require_once("./JSON.php");   //if php<5.2 need JSON class
        $json = new Services_JSON();  //instantiate new json object
        $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
            }
            return $data;
            }
*/

class QueryDatabase
{
    private $_db;
    protected $_result;
    public $results;



public function __construct()
{
    $_db = new mysqli('localhost', 'dalpe' ,'simon', 'dalpe_construction');

    if ($_db->connect_error) {
        die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
    }

    return $_db;
}
public function __destruct()
{
    $_db = $this->__construct();
    $_db->close();

    return $this;
}
}          
?>
            