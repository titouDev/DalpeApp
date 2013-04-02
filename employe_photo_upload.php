<?
require_once('php/FirePHPCore/fb.php');
require_once('php/mysql_connect.php');

if(isset($_FILES)){
    $file_tmp  = $_FILES['photoImport']['tmp_name'];
    $file_name = $_FILES['photoImport']['name'];
    $file_size = $_FILES['photoImport']['size'];
	$file_type = $_FILES['photoImport']['type'];

    //echo ($file_tmp.", ".$file_name.", ".$file_size);
	fb($file_tmp);
    if(is_uploaded_file($file_tmp)) {
    	fb(1);
    	if (isset($_POST['employeId']))
    	{
	    	fb(2);
	    	$destPath = "documents_importes/employes/$file_name";
	    	
	    	if(move_uploaded_file($file_tmp, $destPath)){
	            fb(3);
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
	            fb(4);
	            echo '{success: false}';
	        }
		}    
    }  else{
    	fb(5);
    	echo '{success: false}';
    }
}


?>