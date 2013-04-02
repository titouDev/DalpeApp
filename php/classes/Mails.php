<?php
require_once('./mysql_connect.php');

class Mails {

    
  private $_db;
    protected $_result;
    public $results;


   
	function get(stdClass $params)
	{
		
		$query = "SELECT * FROM mails " ;
		//Conditions
		if ($params->id)
		{
			$query .= ' WHERE id = '.$params->id;
		}
		
		$_db = connectToDbMySql();

		$_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	
	    $results = array();
	
	    while ($row = $_result->fetch_assoc()) {
	        array_push($results, $row);
	    }
	
	    $_db->close();
	
	    return $results;
	}
	function getMailFromSousTraitant(stdClass $params)
	{
		$sousTraitantId = $params->filter[0]->value;
			
		$query = "SELECT mails.id, mails.message,mails.creationDate,mails.subject,mails.userCreateId,mails.chantierId,mails.sentDate  FROM mails INNER JOIN soustraitants_link_mails ON soustraitants_link_mails.mailId = mails.id WHERE soustraitants_link_mails.sousTraitantId = ".$sousTraitantId;
		$_db = connectToDbMySql();

		$_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	
	    $results = array();
	
	    while ($row = $_result->fetch_assoc()) {
	        array_push($results, $row);
	    }
	
	    $_db->close();
	
	    return $results;
		
	}
	function update(stdClass $params)
    {
   		$_db = connectToDbMySql();
		$query = 'UPDATE mails SET message=?, subject=?, chantierId=? WHERE id = ?';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('sssi', $message, $subject, $chantierId, $id);
	
	        $message = $params->message;
	        $subject = $params->subject;
	        $chantierId = $params->chantierId;
	        $id = (int) $params->id;
	        $stmt->execute();
	
	        $stmt->close();
	    }
		$_db->close();
	    return $this->get($params);
    }
	function create(stdClass $params)
	{
		$employeId = $_SESSION['userId'];
		$_db = connectToDbMySql();
		$query = 'INSERT INTO mails (
		message,subject, creationDate, chantierId, userCreateId
		)
		 VALUES
		(?,?, CURRENT_TIMESTAMP(),?,?)';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssss', $message, $subject, $chantierId, $employeId);
	
	        $message = $params->message;
	        $subject = $params->subject;
	        $chantierId = $params->chantierId;
	        
	        $stmt->execute();
	
	        $stmt->close();
	    }
		//On recupere le id
		$params->id = $_db->insert_id;
		$_db->close();
	    return $this->get($params);
	}
	function removeLinkSousTraitant(stdClass $mail, stdClass $sousTraitant){
		$query = 'DELETE FROM soustraitants_link_mails WHERE sousTraitantId='.$sousTraitant->id.' AND mailId ='.$mail->id;
		$_db = connectToDbMySql();
		if ($stmt = $_db->prepare($query))
			{
				$stmt->execute();
				$stmt->close();
			}
		$_db->close();
		return TRUE;
	}
	function getLinkSoustraitant(stdClass $params)
	{
		
	$query = 'SELECT * FROM soustraitants 
			Inner Join soustraitants_link_mails ON soustraitants_link_mails.sousTraitantId = soustraitants.id 
			WHERE soustraitants_link_mails.mailId = ' . $params->mailId;
	$_db = connectToDbMySql();
		
	$_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

    $results = array();

    while ($row = $_result->fetch_assoc()) {
        array_push($results, $row);
    }

    $_db->close();

    return $results;	
	}
	function saveLinkSoustraitant(stdClass $mail, Array $sousTraitants)
	{
		$_db = connectToDbMySql();
		for ($i=0;$i< sizeof($sousTraitants);$i++)
		{
			$query = 'INSERT  IGNORE INTO soustraitants_link_mails (sousTraitantId, mailId) VALUES ('. $sousTraitants[$i]->id.','.$mail->id . ')';
			if ($stmt = $_db->prepare($query))
			{
				$stmt->execute();
				$stmt->close();
			}
		}
		$_db->close();
		return TRUE;
	}

	function send(stdClass $params, Array $sousTraitants)
	{
			fb($sousTraitants);
		$_db = connectToDbMySql();
		for ($i=0;$i< sizeof($sousTraitants);$i++)
		{
			$sousTraitantId = $sousTraitants[$i]->id;
			$query = "UPDATE mails SET sentDate = CURRENT_TIMESTAMP() WHERE id = " . $params->id;
			if ($stmt = $_db->prepare($query))
			{
				$stmt->execute();
				$stmt->close();
			}
			
			// To
			$to = 'cbonnaffoux@me.com';
			
			// Subject
			$subject = $params->subject;
			
			// Message
			$msg = $params->message;
			
			// Headers
			$headers = 'From: Julien Dalpe Construction <julien@dalpe.com>'."\r\n";
			$headers .= 'Bcc: Moi <cbonnaffoux@me.com>;'."\r\n";
			$headers .= "\r\n";
			mail($to, $subject, $msg, $headers);
		}
		// Function mail()
		return TRUE; 

	}
    
   
}
