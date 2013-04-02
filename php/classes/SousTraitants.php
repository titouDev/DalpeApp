<?php
require_once('./mysql_connect.php');


class SousTraitants {

    
    private $_db;
    protected $_result;
    public $results;



	
   
	function getSpecialites(stdClass $params)
	{
		if ($params->sousTraitantId)
		{
			
			$query = "SELECT id, name FROM specialites
						INNER JOIN soustraitants_link_specialites ON soustraitants_link_specialites.specialiteId = specialites.id
						WHERE soustraitants_link_specialites.sousTraitantId = " . $params->sousTraitantId  
						. " ORDER BY specialites.name ";
			
		}
		else {
		$query = "SELECT id, name FROM specialites ORDER BY specialites.name ";	
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
	function removeLinkWithSpecialite(stdClass $specialite, stdClass $sousTraitant)
	{
		$_db = connectToDbMySql();
		$queryDelete = "DELETE FROM soustraitants_link_specialites WHERE specialiteId =".$specialite->id." AND sousTraitantId=".$sousTraitant->id;
		if ($stmt = $_db->prepare($queryDelete))
			{
				$stmt->execute();
				$stmt->close();
			}
		return TRUE;
		
	}
	function setLinkWithSpecialite(stdClass $specialite, stdClass $sousTraitant)
	{
		$_db = connectToDbMySql();
		if (! $specialite->id)
		{
			//C'est une nouvelle specialite, on doit d'abord la creer
			$queryInsert = "INSERT IGNORE INTO specialites SET name = '". $specialite->name . "'";
			if ($stmt = $_db->prepare($queryInsert))
			{
				$stmt->execute();
				$stmt->close();
			}
			
			//On recuper ensuite son id
			$querySelect = "SELECT id, name FROM specialites WHERE name = '". $specialite->name ."'";
			$_result = $_db->query($querySelect) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
			$result = $_result->fetch_assoc();
			$specialite->id = $result['id'];
			}
		
		
		$query = 'INSERT  IGNORE INTO soustraitants_link_specialites (sousTraitantId, specialiteId) VALUES ('. $sousTraitant->id.','.$specialite->id . ')';
		if ($stmt = $_db->prepare($query))
		{
			$stmt->execute();
			$stmt->close();
		}
		$_db->close();
		return TRUE;
	}
    function get(stdClass $data)
	{
		


		$query = "SELECT * FROM soustraitants " ;
		if ($data->specialiteId)
		{
			$query .= ' INNER JOIN soustraitants_link_specialites on soustraitants_link_specialites.sousTraitantId = soustraitants.id ';
			
		}
		$query .= ' WHERE soustraitants.id > 0 '; 
		//Conditions
		if ($data->id)
		{
			$query .= ' AND id = '.$data->id;
		}
		else if ($data->name)
		{
			$query .= ' AND name = \''.$data->name.'\'';
		}
		else if ($data->searchText)
		{
			$query .= ' AND (name like "%'.$data->searchText.'%" OR contactName like "%'.$data->searchText.'%" OR note like "%'.$data->searchText.'%") ';
			
		
		}
		if ($data->specialiteId)
			{
				$query .= ' AND soustraitants_link_specialites.specialiteId = ' . $data->specialiteId; 
				
			}
		$_db = connectToDbMySql();

		//Sort
		if ($data->sort)
		{
			$query .= 'ORDER BY ' . $data->sort[0]->property . ' ' . $data->sort[0]->direction;
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
	
	function create(stdClass $params)
	{
		$_db = connectToDbMySql();
		$query = 'INSERT INTO soustraitants (
		name,
		contactName,
		mail,
		fax,
		phone,
		cell,
		adresse,
		codePostal,
		ville,
		province,
		note,
		licenseRbq,
		tps,
		siteWeb)
		 VALUES
		(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssssssssssssss', $name, $contactName,$mail,$fax,$phone,
	        $cell,$adresse,$codePostal,$ville,$province,$note,
	        $licenseRbq,$tps,$siteWeb);
	
	        $name = $params->name;
	        $contactName = $params->contactName;
	        $mail = $params->mail;
	        $fax = $params->fax;
	        $phone = $params->phone;
	        $cell = $params->cell;
	        $adresse = $params->adresse;
	        $codePostal = $params->codePostal;
	        $ville = $params->ville;
	        $province = $params->province;
	        $note = $params->note;
	        $licenseRbq = $params->licenseRbq;
	        $tps = $params->tps;
	        $siteWeb = $params->siteWeb;
	        
	        $stmt->execute();
	
	        $stmt->close();
	    }
	
	    return $this->get($params);
	}
	
	function update(stdClass $params)
	{
	    $_db = connectToDbMySql();
		$query = "UPDATE soustraitants SET
		name=?,
		contactName=?,
		mail=?,
		fax=?,
		phone=?,
		cell=?,
		adresse=?,
		codePostal=?,
		ville=?,
		province=?,
		actif=?,
		note=?,
		licenseRbq=?,
		tps=?,
		siteWeb=?
		WHERE id=?";
	    if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('sssssssssssssssi', $name, $contactName,$mail,$fax,$phone,
	        $cell,$adresse,$codePostal,$ville,$province,$actif,$note,
	        $licenseRbq,$tps,$siteWeb, $id);
	
	        $name = $params->name;
	        $contactName = $params->contactName;
	        $mail = $params->mail;
	        $fax = $params->fax;
	        $phone = $params->phone;
	        $cell = $params->cell;
	        $adresse = $params->adresse;
	        $codePostal = $params->codePostal;
	        $ville = $params->ville;
	        $province = $params->province;
	        $actif = $params->actif;
	        $note = $params->note;
	        $licenseRbq = $params->licenseRbq;
	        $tps = $params->tps;
	        $siteWeb = $params->siteWeb;
	        //cast id to int
	        $id = (int) $params->id;
	
	        $stmt->execute();
	
	        $stmt->close();
	    }
	
	    return $this->get($params);
	}
}
