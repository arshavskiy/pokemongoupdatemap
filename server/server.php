<?php


$url = '../js/db_locations.json'; // path to your JSON file
$data = file_get_contents($url); // put the contents of the file into a variable
$characters = json_decode($data); // decode the JSON feed

// var_dump($characters);

if (isset($_POST['data_to_be_pass'])){
    header("Access-Control-Allow-Origin: application/x-www-form-urlencoded");
header("Access-Control-Allow-Origin: *");

    $data_to_be_pass=$_POST['data_to_be_pass'];
    var_dump($data_to_be_pass);
    $res="Data Passed Successfully: ".$data_to_be_pass;
    echo json_encode($res);
}

if (isset($_POST['item'])){
    header("Access-Control-Allow-Origin: application/x-www-form-urlencoded");
header("Access-Control-Allow-Origin: *");

    $item=$_POST['item'];
    var_dump($item);
    $res="Data Passed Successfully: ".$item;
    echo json_encode($res); 
}

if (isset($_POST['label'])){
    header("Access-Control-Allow-Origin: application/x-www-form-urlencoded");
header("Access-Control-Allow-Origin: *");

    $label=$_POST['label'];
    var_dump($label);
    $res="Data Passed Successfully: ".$label;
    echo json_encode($res);
}


echo '<h1>Hello world!</h1>';
?>

