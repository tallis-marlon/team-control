<?php

$host = 'localhost';
$usuario = 'root';
$senha = '';
$database = 'team_control';

$conn = new mysqli($host, $usuario, $senha, $database);

if ($conn->error) {
    die("Falha ao conectar" . $conn->error); /*A função die() em PHP é usada para imprimir uma mensagem e encerrar a execução do script atual. É essencialmente a mesma coisa que a função exit(), que é usada para interromper a execução de um script */
}
