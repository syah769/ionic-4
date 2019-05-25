<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
$today = date('Y-m-d');

if($postjson['aksi'] == "add_register") {
    $password = md5($postjson['password']);
    $query = mysqli_query($mysqli, "INSERT INTO login SET 
    full_name       = '$postjson[full_name]',
    phone_number    = '$postjson[phone_number]',
    username        = '$postjson[username]',
    password        = '$password'
  ");

  if($query) $result = json_encode(array('success' =>true));
  else $result = json_encode(array('success' => false, 'msg'=>'error , please try again'));
  echo $result;

}

elseif($postjson['aksi'] == "login") {
  $password = md5($postjson['password']);
  $query = mysqli_query($mysqli, "SELECT * FROM login WHERE username='$postjson[username]' AND password='$password' 
");
$check = mysqli_num_rows($query);

if($check>0){
  $data = mysqli_fetch_array($query);
  $datauser = array(
    'user_id' => $data['user_id'],
    'full_name' => $data['full_name'],
    'phone_number' => $data['phone_number'],
    'username' => $data['username'],
    'password' => $data['password']
  );

if($query) $result = json_encode(array('success' =>true, 'result'=>$datauser));
else $result = json_encode(array('success' => false, 'msg'=>'error, please try again'));

}else{
  $result = json_encode(array('success' => false, 'msg'=>'unregister account'));
}

echo $result;
}

if($postjson['aksi']=='add'){

    $query = mysqli_query($mysqli, "INSERT INTO master_customer SET
    name_customer = '$postjson[name_customer]',
    desc_customer = '$postjson[desc_customer]',
    created_at    = '$today'
");

   $idcust = mysqli_insert_id($mysqli);

   if($query) $result = json_encode(array('success'=>true, 'customerid'=>$idcust));
   else $result = json_encode(array('success'=>false));

   echo $result;
}

elseif($postjson['aksi']=='getdata'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM master_customer ORDER BY customer_id DESC LIMIT $postjson[start],$postjson[limit]");

    while($row = mysqli_fetch_array($query)){

        $data[] = array(
            'customer_id'   => $row['customer_id'],
            'name_customer' => $row['name_customer'],
            'desc_customer' => $row['desc_customer'],
            'created_at'    => $row['created_at'],
        );
    }

    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));
    
    echo $result;
}

elseif($postjson['aksi']=='update'){
    $query = mysqli_query($mysqli, "UPDATE master_customer SET 
        name_customer='$postjson[name_customer]',
        desc_customer='$postjson[desc_customer]' WHERE customer_id='$postjson[customer_id]'
        ");

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
    else $result = json_encode(array('success'=>false, 'result'=>'error'));
    
    echo $result;
}

elseif($postjson['aksi']=='delete'){
    $query = mysqli_query($mysqli, "DELETE FROM master_customer WHERE customer_id='$postjson[customer_id]'
        ");

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
    else $result = json_encode(array('success'=>false, 'result'=>'error'));
    
    echo $result;
}

?>
    
    
    
    
    