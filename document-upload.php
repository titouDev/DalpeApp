<?
require_once('php/FirePHPCore/fb.php');
require_once('php/mysql_connect.php');

if(isset($_FILES)){
    $file_tmp  = $_FILES['documentImport']['tmp_name'];
    $file_name = $_FILES['documentImport']['name'];
    $file_size = $_FILES['documentImport']['size'];
	$file_type = $_FILES['documentImport']['type'];

    //echo ($file_tmp.", ".$file_name.", ".$file_size);

    if(is_uploaded_file($file_tmp)) {
    	if (isset($_POST['sousTraitantId']) or isset($_POST['chantierId']) )
    	{
	    	$destPath = "documents_importes/sous_traitants/$file_name";
	    	$documentType = $_POST['documentTypeId'];
			$note = $_POST['documentNote'];
			
	    	if(move_uploaded_file($file_tmp, $destPath)){
	            //On sauve le document dans la DB
				$_db = connectToDbMySql();
				$query = 'INSERT INTO documents (
							name,
							type,
							size,
							path,
							extension,
							note,
							creationDate
							)
							 VALUES
							(?,?,?,?,?,?,CURRENT_TIMESTAMP())';
							if ($stmt = $_db->prepare($query)) {
						        $stmt->bind_param('ssssss', $file_name, $documentType,$file_size,$destPath, $file_type, $note);
						        $stmt->execute();
						        $stmt->close();
								//On recupere le ID et on insert le lien avec le sousTraitant
								$documentId = $_db->insert_id;
								if (isset($_POST['sousTraitantId']))
								{
									$query_link = 'INSERT INTO soustraitants_link_documents (sousTraitantId, documentId ) VALUES (?,?)';
									if ($stmt = $_db->prepare($query_link)) {
										$stmt->bind_param('ii', $_POST['sousTraitantId'], $documentId);
								        $stmt->execute();
								        $stmt->close();
										echo '{success: true}';
									}
								}
								elseif (isset($_POST['chantierId']) {
									# code...
									$query_link = 'INSERT INTO chantiers_link_documents (chantierId, documentId ) VALUES (?,?)';
									if ($stmt = $_db->prepare($query_link)) {
										$stmt->bind_param('ii', $_POST['chantierId'], $documentId);
								        $stmt->execute();
								        $stmt->close();
										echo '{success: true}';
									}
								}
								
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