<?

	function connectToDbMySql()
	{
	    $_db = new mysqli('localhost', 'titoudev_simon' ,'Ucantd0it', 'titoudev_dalpe');
	
	    if ($_db->connect_error) {
	        die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
	    }
	
	    return $_db;
	}
	
?>