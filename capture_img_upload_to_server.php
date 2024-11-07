<?php

include 'DatabaseConfig.php';

// Create connection


 if($_SERVER['REQUEST_METHOD'] == 'POST')
 {
   $conn = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
	 $DefaultId = 0;
   $ImageData = $_POST['image_path'];
   $ImageName = $_POST['image_name'];

  $imei = $_POST['imei'];

 //$GetOldIdSQL ="SELECT id FROM ImageToServerTable ORDER BY id ASC";

 //$Query = mysqli_query($conn,$GetOldIdSQL);

 //while($row = mysqli_fetch_array($Query)){

 //$DefaultId = $row['id'];
 //}

 $ImagePath = "public/img/$ImageName.png";

 $ServerURL = "/img/$ImageName.png";

 //$InsertSQL = "insert into ImageToServerTable (image_path,image_name) values ('$ServerURL','$ImageName')";
 $InsertSQL = "UPDATE alerts SET imgpath = '$ServerURL' where imei = '$imei' ORDER BY id DESC limit 1";
 // $querySelect = "SELECT user_name from users where user_name = '".$_POST["username"]."'";
 if(mysqli_query($conn, $InsertSQL)){

 file_put_contents($ImagePath,base64_decode($ImageData));


 echo "Your Image Has Been Uploaded.";


 }
 else {
   echo "error query";
 }

 //mysqli_close($conn);
 }else{
 echo "Not Uploaded";
 }

?>
