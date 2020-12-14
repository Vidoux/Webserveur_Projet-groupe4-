<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="CSS/styles.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script type="text/javascript" src="javascript/script.js"></script>
	</head>
	<body>
		<img id= "background" src="images\Plan-batiment.jpg" >
		<div id="menu">
			<?php
				session_start();
				$admin = $_SESSION['isAdmin'];
				if ($admin){
					?>
					<script>setAdminSession()</script>
					<img id= "addButton" src="images/addOff.png" height="auto" width="5%" onclick="changeAddState()">
					<img id= "deleteButton" src="images/deleteOff.png" height="auto" width="5%" onclick="changeDeleteState()">
					<?php
				}

			?>
		</div>
		
		<div id="capteurs"></div>
	</body>
</html> 