<?

	function connectToDbMySql()
	{
	    $_db = new mysqli('localhost', 'dalpe' ,'simon', 'dalpe_construction');
	
	    if ($_db->connect_error) {
	        die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    }
	
	    return $_db;
	}
	
?>