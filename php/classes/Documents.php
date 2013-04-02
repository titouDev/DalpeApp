<?php
require_once('./mysql_connect.php');

class Documents {

    
    private $_db;
    protected $_result;
    public $results;



   
	function get(stdClass $data)
	{
		
		$_db = connectToDbMySql();
		
		
		$query = "SELECT documents.id,
						documents.`name`, 
						documents.path, 
						documents.size, 
						documents.note, 
						documents.extension, 
						documents.creationDate, 
						documents.type
					FROM documents " ;
		//Conditions
		if ($data->id)
		{
			$query .= ' WHERE id = '.$data->id;
		}
		else if ($data->sousTraitantId)
		{
			$query .= ' INNER JOIN soustraitants_link_documents ON soustraitants_link_documents.documentId = documents.id ';
			$query .= ' WHERE soustraitants_link_documents.sousTraitantId = ' . $data->sousTraitantId; 
		}
		//Sort
		if ($data->sort)
		{
			$query .= ' ORDER BY ' . $data->sort[0]->property . ' ' . $data->sort[0]->direction;
		}
		else {
			$query .= ' ORDER BY documents.creationDate DESC';
		}
    $_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

    $results = array();

    while ($row = $_result->fetch_assoc()) {
        array_push($results, $row);
    }

    $_db->close();

    return $results;
		
		
		
	}//eof
	
	function get_type(stdClass $data)
	{
		
		$_db = connectToDbMySql();
		
		
		$query = "SELECT * FROM document_type " ;
		//Conditions
		if ($data->id)
		{
			$query .= ' WHERE id = '.$data->id;
		}
		//Sort
		if ($data->sort)
		{
			$query .= ' ORDER BY ' . $data->sort[0]->property . ' ' . $data->sort[0]->direction;
		}
		else {
			$query .= ' ORDER BY name ASC';
		}
    $_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

    $results = array();

    while ($row = $_result->fetch_assoc()) {
        array_push($results, $row);
    }

    $_db->close();

    return $results;
		
		
		
	}//eof
	
	
}
