<?php
  try
  {
    $db = new PDO("sqlite:../../dataBaseDemo.db");
  }
  catch(Exception $e)
  {
    die('Erreur : '.$e->getMessage());
  }
  header("Access-Control-Allow-Origin: *");
  $functionname = $_POST['functionname'];
    
  function createCapteur($nomCapteur, $posX, $posY){
    global $db;
    $requeteInsertCapteur = $db->prepare('INSERT into capteur(nomCapteur,posX,posY,state) values (?,?,?,?)');
    $requeteInsertCapteur->execute(array($nomCapteur,$posX,$posY,0));

  }
  function updateCapteur($idCapteur){
    global $db;
    $requeteUpdateCapteur= $db->prepare('UPDATE capteur SET state = not(state) WHERE nomCapteur = ?');
    $requeteUpdateCapteur->execute(array($idCapteur));
  }
  function getCapteurs(){
    global $db;
    $donneesCapteurs = $db->prepare ('SELECT * FROM capteur');
    $donneesCapteurs->execute();
    $listeCapteur = '';
    while ($unCapteur = $donneesCapteurs->fetch()){
      $listeCapteur = $listeCapteur.''.$unCapteur['IdCapteur'].';'.$unCapteur['nomCapteur'].';'.$unCapteur['posX'] .';'. $unCapteur['posY'] . ';'. $unCapteur['state'] . ';';
    }
    echo $listeCapteur;
    //return $listeCapteur;
  }
  function deleteCapteur($nomDuCapteur){
    global $db;
    $donneesCapteurs = $db->prepare("DELETE FROM capteur WHERE nomCapteur = ?");
    $donneesCapteurs->execute(array($nomDuCapteur));
    echo $nomDuCapteur;
  }

  switch($functionname) {
    case 'updateCapteur':
      updateCapteur($_POST['id']);
      break;
    case 'deleteCapteur':
      deleteCapteur($_POST['id']);
      break;
    case 'createCapteur':
      createCapteur($_POST['name'],$_POST['positionX'],$_POST['positionY']);
      break;
    case 'getCapteurs':
      getCapteurs();
      break;
  }
?>