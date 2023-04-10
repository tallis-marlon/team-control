<?php
include('conexao.php');
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
    <link rel="stylesheet" href="css/login.css">
    <script src="js/script.js" defer></script>
</head>

<body>
    <header>
        <h1>Open Notes</h1>
    </header>
    <div id="login-form">
        <h1>Acesse sua conta</h1>
        <form action="" method="POST">
            <p>
                <label>E-mail</label>
                <input type="text" name="email">
            </p>
            <p>
                <label>Senha</label>
                <input type="password" name="senha">
            </p>
            <p>
                <button type="submit">Entrar</button>
            </p>
        </form>
    </div>
    <?php
    if (isset($_POST['email']) || isset($_POST['senha'])) {
        if (isset($_POST['email']) == 0) {
            echo "preencha seu email";
        } else if (isset($_POST['senha']) == 0) {
            echo "preencha sua senha";
        } else {
            $email = $mysqli->real_escape_string($_POST['email']);
            $senha = $mysqli->real_escape_string($_POST['senha']);

            $sql_code = "SELECT * FROM usuarios WHERE email = '$email' and senha = '$senha'";
            $sql_query = $mysqli->query($sql_code) or die('Falha na execução do código SQL' . $mysql->error);

            $quantidade = $sql_query->num_rows;
        }

        if ($quantidade == 1) {
            $usuario = $sql_query->fetch_assoc();
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['id'] = $usuario['id'];
            $_SESSION['nome'] = $usuario['nome'];

            header("Location: painel.php");
        } else {
            print "<p>Falha ao logar! E-mail ou senha incorretos</p>";
        }
    }
    ?>
</body>

</html>