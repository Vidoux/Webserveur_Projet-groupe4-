<!DOCTYPE html>
<html>
    <head>
        <title>Page d'accueil Batiment</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <h2>Viens voir tes capteurs en te connectant</h2>
        
        <p>
        	<?php
            global $db;
            echo date('d/m/Y h:i:s');
            ?> <br/>
            <form action="/login" method="post">
                <p>
                    <input type="text" name="pseudo" /> <br/> <br/>
                    <?php 
                    	if (isset($_GET['erreur']) AND $_GET['erreur'] == 1){  ?>
                    		<p style="color: red;"> Mot de passe incorrect</p>
                    	<?php }?>
                    <input type="password" name="mdp" />
                    <input type="submit" value="Valider" />
                </p>
            </form>

        </p>
    </body>
</html>