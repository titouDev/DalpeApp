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
		if (isset($params->id) && $params->id)
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
	function delete(stdClass $params)
	{
		//Conditions
		if (isset($params->id) && $params->id)
		{
			$query = "DELETE FROM mails " ;
			$query .= ' WHERE sent = 0 AND id = '.$params->id;
			$_db = connectToDbMySql();
			if ($stmt = $_db->prepare($query))
				{
					$stmt->execute();
					$stmt->close();
				}
			$_db->close();
		}
		else
		{
			return;
		}
		
		return TRUE;
	}
	function getMails_notsent()
	{
		$query = "SELECT
					mails.id, 
					mails.message, 
					mails.creationDate, 
					mails.`subject`, 
					mails.sentDate, 
					employes.prenom AS userCreate, 
					chantiers.`name` AS chantier, 
					chantiers.id AS chantierId, 
					employes.nom AS userCreateLastName
					FROM mails
					LEFT JOIN employes ON mails.userCreateId = employes.id
					LEFT JOIN chantiers ON mails.chantierId = chantiers.id
					 
					WHERE mails.sent = 0 " ;
		
		$_db = connectToDbMySql();

		$_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	
	    $results = array();
	
	    while ($row = $_result->fetch_assoc()) {
	        array_push($results, $row);
	    }
	
	    $_db->close();
	
	    return $results;	
	}
	function getMailFromSousTraitant($params)
	{
		$sousTraitantId = $params->filter[0]->value;
			
		$query = "SELECT mails.id, 
					mails.message, 
					mails.creationDate, 
					mails.`subject`, 
					mails.sentDate, 
					chantiers.`name` AS chantier, 
					chantiers.id AS chantierId, 
					employes.prenom AS userCreate, 
					employes.nom AS userCreateLastName
				FROM mails INNER JOIN soustraitants_link_mails ON soustraitants_link_mails.mailId = mails.id
					 LEFT JOIN chantiers ON mails.chantierId = chantiers.id
					 LEFT JOIN employes ON mails.userCreateId = employes.id
					 WHERE mails.sent = 1 AND soustraitants_link_mails.sousTraitantId = ".$sousTraitantId;
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
	        if ($chantierId == '') {
				$chantierId = null;
			}
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
	        if ($chantierId == '') {
				$chantierId = null;
			}
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
		$_db = connectToDbMySql();
		for ($i=0;$i< sizeof($sousTraitants);$i++)
		{
			
			// To
			$to = 'cbonnaffoux@icloud.com';
			
			// Subject
			$subject = $params->subject;
			
			// Message
			$msg = $params->message;
			
			// Headers
			$headers = 'From: Julien Dalpe Construction <julien@dalpe.com>'."\r\n";
			$headers .= 'Bcc: Moi <cbonnaffoux@me.com>;'."\r\n";
			$headers .= "\r\n";
			fb($to);
			fb($subject);
			fb($msg);
			fb($headers);
			mail($to, $subject, $msg, $headers);

			$sousTraitantId = $sousTraitants[$i]->id;
			$query = "UPDATE mails SET sentDate = CURRENT_TIMESTAMP(), sent=1 WHERE id = " . $params->id;
			if ($stmt = $_db->prepare($query))
			{
				$stmt->execute();
				$stmt->close();
			}
			
		}
		// Function mail()
		return TRUE; 

	}
    
   
}
