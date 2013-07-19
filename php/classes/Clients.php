<?php
require_once('./mysql_connect.php');

class Clients {

    
    private $_db;
    protected $_result;
    public $results;



   
	function get(stdClass $data)
	{
		$query = "SELECT clients.id, \n".
					"	clients.note, \n".
					"	clients.actif, \n".
					"	clients.province, \n".
					"	clients.ville, \n".
					"	clients.mail, \n".
					"	clients.codePostal, \n".
					"	clients.adresse, \n".
					"	clients.fax, \n".
					"	clients.cell, \n".
					"	clients.phone, \n".
					"	clients.nom, \n".
					"	clients.prenom,\n".
					"CONCAT(clients.prenom, ' ',\n".
					"	clients.nom) as displayName\n".
					"FROM clients" ;
		//Conditions
		if (isset($data->id) && $data->id)
		{
			$query .= ' WHERE id = '.$data->id;
		}
		$_db = connectToDbMySql();

		//Sort
		if (isset($data->sort) && $data->sort)
		{
			$query .= 'ORDER BY ' . $data->sort[0]->property . ' ' . $data->sort[0]->direction;
		}
		else {
			$query .= ' ORDER BY prenom ASC';
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
		$query = 'INSERT INTO clients (
		nom,
		prenom,
		mail,
		phone,
		cell,
		adresse,
		codePostal,
		ville,
		province
		)
		 VALUES
		(?,?,?,?,?,?,?,?,?)';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('sssssssss', $nom, $prenom,$mail,$phone,
	        $cell,$adresse,$codePostal,$ville,$province);
	
	        $nom = $params->nom;
	        $prenom = $params->prenom;
	        $mail = $params->mail;
	        $phone = $params->phone;
	        $cell = $params->cell;
	        $adresse = $params->adresse;
	        $codePostal = $params->codePostal;
	        $ville = $params->ville;
	        $province = $params->province;
	        $stmt->execute();
	
	        $stmt->close();
	    }
	
	    return $this->get($params);
	}
	
	function update(stdClass $params)
	{
	    $_db = connectToDbMySql();
		$query = "UPDATE clients SET
		nom=?,
		prenom=?,
		mail=?,
		phone=?,
		cell=?,
		adresse=?,
		codepostal=?,
		ville=?,
		province=?,
		actif=?
		WHERE id=?";
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssssssssssi', $nom, $prenom,$mail,$phone,
	        $cell,$adresse,$codePostal,$ville,$province,$actif, $id);
	
	        $nom = $params->nom;
	        $prenom = $params->prenom;
	        $mail = $params->mail;
	        $phone = $params->phone;
	        $cell = $params->cell;
	        $adresse = $params->adresse;
	        $codePostal = $params->codePostal;
	        $ville = $params->ville;
	        $province = $params->province;
	        $actif = $params->actif;
	        //cast id to int
	        $id = (int) $params->id;
			$stmt->execute();
	
	        $stmt->close();
	    }
			
	    return $this->get($params);
	}
}
