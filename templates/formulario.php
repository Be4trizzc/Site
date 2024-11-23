<?php

 $nome = $_POST["nome"];
 $email = $_POST["email"];
 $senha = $_POST[""];
 $data_atual = date('d/m/Y');
 $hora_atual = date('H:i:s');

    $conn = new mysqli('localhost', 'root', '', 'florescer_formulario');

 if ($conn->connect_error) {
    die("Falha não funcionou". $conn->connect_error);
 }

 $smtp = $conn -> prepare("INSERT INTO usuarios (nome,email,data,hora) VALUES (?,?,?,?)");
 $smtp->bind_param("ssss", $nome, $email,$senha,$data_atual,$hora_atual);

 if($smtp->execute()){
    echo "Mensagem enviada com sucesso";
 } else{
    echo "Erro no envio do cadastro: " .$smtp->error;
 }
 $smtp->close();
 $conn->close();
 ?>