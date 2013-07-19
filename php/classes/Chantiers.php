<?php
require_once('./mysql_connect.php');

class Chantiers {

    
    private $_db;
    protected $_result;
    public $results;

    function get(stdClass $data)
	{
		

		$query = "SELECT chantiers.id, chantiers.name, chantiers.note, chantiers.status, chantiers.startDate, chantiers.endDate, CONCAT(clients.prenom,' ', clients.nom) as clientName, clients.id as clientId FROM chantiers Inner Join clients ON clients.id = chantiers.clientId " ;
		//Conditions
		if (isset($data->id) && $data->id)
		{
			$query .= ' WHERE chantiers.id = '.$data->id;
		}
		$_db = connectToDbMySql();

		//Sort
		if (isset($data->sort) && $data->sort)
		{
			$query .= 'ORDER BY ' . $data->sort[0]->property . ' ' . $data->sort[0]->direction;
		}
		else {
			$query .= ' ORDER BY chantiers.name ASC';
		}
    $_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

    $results = array();

    while ($row = $_result->fetch_assoc()) {
        array_push($results, $row);
    }

    $_db->close();

    return $results;
		
		
		
	}//eof
	function get_documents(stdClass $data)
	{
		$query = "SELECT chantiers_link_documents.chantierId, 
					chantiers_link_documents.documentId
					FROM chantiers_link_documents";
		$_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

    	$results = array();

	    while ($row = $_result->fetch_assoc()) {
	        array_push($results, $row);
	    }

	    $_db->close();

	    return $results;
	}
	function create(stdClass $params)
	{
		$_db = connectToDbMySql();
		$query = 'INSERT INTO chantiers (
		name,
		clientId,
		note,
		status,
		creationDate,
		startDate,
		endDate
		)
		 VALUES
		(?,?,?,?,CURRENT_TIMESTAMP(),?,?)';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssssss', $name, $clientId,$note,$status, $startDate, $endDate);
	
	        $name = $params->name;
	        $clientId = $params->clientId;
	        $note = $params->note;
	        $status = $params->status;
	        $startDate = $params->startDate;
	        $endDate = $params->endDate;
	        $stmt->execute();
	
	        $stmt->close();
	    }
	
	    return $this->get($params);
	}
	
	function update(stdClass $params)
	{
	    $_db = connectToDbMySql();
		$query = "UPDATE chantiers SET
		name=?,
		clientId=?,
		note=?,
		status=?,
		startDate=?,
		endDate=?
		WHERE id=?";
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssssssi', $name, $clientId,$note,$status,$startDate, $endDate, $id);
	        $name = $params->name;
	        $clientId = $params->clientId;
	        $note = $params->note;
	        $status = $params->status;
	        $startDate = $params->startDate;
	        $endDate = $params->endDate;
	        //cast id to int
	        $id = (int) $params->id;
			$stmt->execute();
	
	        $stmt->close();
	    }
			
	    return $this->get($params);
	}
}
