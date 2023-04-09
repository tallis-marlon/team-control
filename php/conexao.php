<?php

$host = 'localhost';
$usuario = 'root';
$senha = '';
$database = 'team_control';

$mysqli = new mysqli($host, $usuario, $senha, $database);

if ($mysqli->error) {
    die("Falha ao conectar" . $mysqli->error); /*A função die() em PHP é usada para imprimir uma mensagem e encerrar a execução do script atual. É essencialmente a mesma coisa que a função exit(), que é usada para interromper a execução de um script */
}
