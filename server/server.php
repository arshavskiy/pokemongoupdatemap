<?php
$url = '../js/db_locations.json'; // path to your JSON file
$data = file_get_contents($url); // put the contents of the file into a variable
$characters = json_decode($data); // decode the JSON feed
echo $characters;

 $marker = json_decode($_POST['m'], true);
 $item = json_decode($_POST['i '], true);

 $select = isset($_POST['select']) ? $_POST['select'] : false;

 $db = json_decode(file_get_contents('primaryEmailsJson.json'), true); 

 ?>

