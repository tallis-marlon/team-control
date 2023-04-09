<?php
include('php/conexao.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--    Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js" defer></script>
</head>

<body>
    <header>
        <h1>Open Notes</h1>
        <div id="search-container">
            <input type="text" id="search-input" placeholder="Busque por uma nota">
            <i class="bi bi-search"></i>
        </div>
        <button id="login">Login</button>
    </header>
    <!-- div form export -->


    <div id="add-note-container">
        <input type="text" id="note-content" placeholder="O que deseja anotar">
        <button class="add-note"><i class="bi bi-plus-lg"></i></button>
        <div id="exports-notes-container">
            <button id="exports-notes">Exportar CSV <i class="bi bi-download"></i></button>
        </div>
    </div>
    <div id="notes-container">

    </div>
</body>

</html>