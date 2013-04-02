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
		workDate,
		hours
		)
		 VALUES
		(?,?,?)';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('sss', $employeId, $workDate,$hours);
			
	        $employeId = $_SESSION['userId'];
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
		workDate = ?,
		hours = ?
		WHERE id = ?';
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssi', $workDate,$hours,$id);
			
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
		
		$query = "SELECT\n".
				"	employes_hours.id,\n".
				"	employes_hours.employeId,\n".
				"	employes_hours.workDate,\n".
				"	employes_hours.hours,\n".
				"	employes_hours.chantierId,\n".
				"	employes_hours.checked\n".
				"FROM\n".
				"	employes_hours ";
				
		if ($data->employeId)	
		{
			$query .= " WHERE employeId = ".$data->employeId." ";
		}
		else if($data->chantierId)	
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
		if ($data->id)
		{
			$query .= ' WHERE id = '.$data->id;
		}
		else if($data->nom && $data->prenom) 
		{
			$query .= ' WHERE nom = \''.$data->nom.'\' AND prenom = \''.$data->prenom.'\'';
		}
		//Sort
		if ($data->sort)
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
		password=?
		WHERE id=?";
		if ($stmt = $_db->prepare($query)) {
	        $stmt->bind_param('ssssssssssssi', $nom, $prenom,$mail,$phone,
	        $cell,$adresse,$codePostal,$ville,$province,$actif,$login,$password, $id);
	
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
	        //cast id to int
	        $id = (int) $params->id;
			$stmt->execute();
	
	        $stmt->close();
	    }
			
	    return $this->get($params);
	}
}
