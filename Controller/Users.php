<?php

namespace Controller;

class Users
{


	public function error(){
		require("../view/accueil.php?erreur=1");
	}

	public function login()
	{
		header("Access-Control-Allow-Origin: *"); 
		session_start();         
		global $db;

		if (isset($_POST['mdp']) AND isset($_POST['pseudo'])){
			$donneesUtil = $db->prepare('SELECT * FROM utilisateur WHERE NomUtilisateur = ?');
			$donneesUtil->execute(array($_POST['pseudo']));
			$reponseReq = $donneesUtil->fetch();
			$password = $reponseReq ? $reponseReq['Mdp']:0;
			if (password_verify($_POST['mdp'], $password)){
				if ($reponseReq['Admin']){
					$_SESSION['isAdmin'] = 1;
				}
				else{
					$_SESSION['isAdmin'] = 0;
				}
				header('Location: /plan.php');
				exit();
			}
			else{
				header('Location: ../view/accueil.php?erreur=1');
				exit();
			}
		}
		else{
			header('Location: ../view/accueil.php?erreur=1');
			exit();
		} 
		
	}

	
}
