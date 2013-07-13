<?
require_once('php/FirePHPCore/fb.php');
require_once('php/mysql_connect.php');

if(isset($_FILES)){
    $file_tmp  = $_FILES['photoImport']['tmp_name'];
    $file_name = $_FILES['photoImport']['name'];
    $file_size = $_FILES['photoImport']['size'];
	$file_type = $_FILES['photoImport']['type'];

    if(is_uploaded_file($file_tmp)) {
    	if (isset($_POST['employeId']))
    	{
	    	$destPath = "./documents_importes/employes/$file_name";
	    	if(move_uploaded_file($file_tmp, $destPath)){
	            //On sauve le document dans la DB
				$_db = connectToDbMySql();
				$query = 'UPDATE employes SET
							photo=?,
							photoSize=?,
							photoExtension=?
							WHERE id=?';
							if ($stmt = $_db->prepare($query)) {
						        $stmt->bind_param('sssi', $destPath,$file_size, $file_type, $_POST['employeId']);
						        $stmt->execute();
						        $stmt->close();
								echo '{success: true}';
						    }
				//On creer les liens dans la DB
	        } else {
	            echo '{success: false}';
	        }
		}    
    }  else{
    	echo '{success: false}';
    }
}


?>