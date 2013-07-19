<?php
require_once('./mysql_connect.php');

class Employes {

    
    private $_db;
    protected $_result;
    public $results;



   
	function log_hour(stdClass $data)
	{
		//Attention
		//La fonction log hour est utilise uniquement pour l'employe qui est connecte.
		//Le userid est pris dans la session
		$_db = connectToDbMySql();
		$query = 'INSERT INTO employes_hours (
		employeId,
		chantierId,
		coutHoraire,
		workDate,
		hours
		)
		 VALUES
		(?,?,?,?,?)';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('sssss', $employeId,$chantierId, $coutHoraire, $workDate,$hours);
			
	        $employeId = $data->employeId;
	        if ( isset($data->chantierId) && $data->chantierId != '')
			{
				$chantierId = $data->chantierId;
			}
			else
			{
				$chantierId = NULL;
			}
	        $coutHoraire = $data->coutHoraire;
	        $workDate = $data->workDate;
	        $hours = $data->hours;
	        
	        $stmt->execute();
	
	        $stmt->close();
	    }
	
	    return;
		
	}
	function update_hour(stdClass $data)
	{
		$_db = connectToDbMySql();
		$query = 'UPDATE employes_hours SET
		chantierId = ?,
		coutHoraire = ?,
		workDate = ?,
		hours = ?
		WHERE id = ?';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssssi', $chantierId, $coutHoraire, $workDate,$hours,$id);
			
	        if($data->chantierId != '')
			{
				$chantierId = $data->chantierId;
			}
			else
			{
				$chantierId = NULL;
			}$coutHoraire = $data->coutHoraire;
	        $workDate = $data->workDate;
	        $hours = $data->hours;
	        $id = $data->id;
	        $stmt->execute();
	
	        $stmt->close();
	    }
	
	    return;
		
	}
	function delete_hour(stdClass $data)
	{
		$_db = connectToDbMySql();
		
		$queryDelete = 'DELETE FROM employes_hours WHERE checked = 0 AND id = ' . $data->id;
		if ($stmt = $_db->prepare($queryDelete))
			{
				$stmt->execute();
				$stmt->close();
			}
	}
	function get_hours(stdClass $data)
	{
		$_db = connectToDbMySql();
		
		$query = "SELECT employes_hours.id, 
				employes_hours.employeId, 
				employes_hours.workDate, 
				employes_hours.hours, 
				employes_hours.chantierId, 
				employes_hours.checked, 
				chantiers.`name` as chantier, 
				employes.nom as lastName, 
				employes.prenom as name,
				employes_hours.coutHoraire
			FROM employes_hours
			LEFT JOIN chantiers ON employes_hours.chantierId = chantiers.id
			INNER JOIN employes ON employes_hours.employeId = employes.id
			";
				
		if (isset($data->employeId) && $data->employeId)
		{
			$query .= " WHERE employeId = ".$data->employeId." ";
		}
		else if(isset($data->chantierId) && $data->chantierId)
		{
			$query .= " WHERE chantierId = ".$data->chantierId." ";
		}
		$query .= " ORDER BY employes_hours.workDate DESC";
		$_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

	    $results = array();
	
	    while ($row = $_result->fetch_assoc()) {
	        array_push($results, $row);
	    }
	
	    $_db->close();
	
	    return $results;
	}
    
	function get(stdClass $data)
	{
		
		$_db = connectToDbMySql();
		
		
		$query = "SELECT * FROM employes " ;
		//Conditions
		if (isset($data->id) && $data->id)
		{
			$query .= ' WHERE id = '.$data->id;
		}
		else if( isset($data->nom) && isset($data->prenom) )
		{
			$query .= ' WHERE nom = \''.$data->nom.'\' AND prenom = \''.$data->prenom.'\'';
		}
		//Sort
		if (isset($data->sort) && $data->sort)
		{
			$query .= ' ORDER BY ' . $data->sort[0]->property . ' ' . $data->sort[0]->direction;
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
	function checkLoginSession()
	{
		 if(isset($_SESSION['userId']))
		 {
		 		$user = new stdClass();
				$user->id = $_SESSION['userId'];
		 	return $this->get($user);
		 } 
		 return false;
		
	}
	function logout()
	{
		 session_destroy();
	}
	function login(stdClass $params)
	{
		$_db = connectToDbMySql();
		$query = "SELECT * FROM employes WHERE login ='".$params->userName."' AND password='".$params->passWord."'";
		$_result = $_db->query($query) or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

	    $results = array();
	
	    while ($row = $_result->fetch_assoc()) {
	        array_push($results, $row);
	    }
	
	    $_db->close();
		session_start();
		$_SESSION['userId'] = $results[0]['id'] ;
	    $_SESSION['timeout'] = time();
	    return $results;
	}
	function create(stdClass $params)
	{
		$_db = connectToDbMySql();
		$query = 'INSERT INTO employes (
		nom,
		prenom,
		mail,
		phone,
		cell,
		adresse,
		codePostal,
		ville,
		province,
		login,
		password
		)
		 VALUES
		(?,?,?,?,?,?,?,?,?,?,?)';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('sssssssssss', $nom, $prenom,$mail,$phone,
	        $cell,$adresse,$codePostal,$ville,$province,$login,$password);
			
	        $nom = $params->nom;
	        $prenom = $params->prenom;
	        $mail = $params->mail;
	        $phone = $params->phone;
	        $cell = $params->cell;
	        $adresse = $params->adresse;
	        $codePostal = $params->codePostal;
	        $ville = $params->ville;
	        $province = $params->province;
	        $login = $params->login;
	        $password = $params->password;
	        
	        $stmt->execute();
	
	        $stmt->close();
	    }
	
	    return $this->get($params);
	}
	
	function update(stdClass $params)
	{
	    $_db = connectToDbMySql();
		$query = "UPDATE employes SET
		nom=?,
		prenom=?,
		mail=?,
		phone=?,
		cell=?,
		adresse=?,
		codepostal=?,
		ville=?,
		province=?,
		actif=?,
		login=?,
		password=?,
		coutHoraire=?
		WHERE id=?";
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('sssssssssssssi', $nom, $prenom,$mail,$phone,
	        $cell,$adresse,$codePostal,$ville,$province,$actif,$login,$password,$coutHoraire, $id);
	
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
	        $login = $params->login;
	        $password = $params->password;
	        $coutHoraire = $params->coutHoraire;
	        //cast id to int
	        $id = (int) $params->id;
			$stmt->execute();
	
	        $stmt->close();
	    }
			
	    return $this->get($params);
	}
}
