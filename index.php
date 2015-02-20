<?php
session_start();

function login () {
	header("Location: login.html");
	die();
}

function recarrega () {
	header("Location: index.php");
	die();
}

function entra () {
	header("Location: main.html");
	die();
}

if (isset($_SESSION['usuario.nome'])) {
	entra();
} else {
	if (isset($_POST['login-nome']) &&
		isset($_POST['login-senha'])) {
		$nome = $_POST['login-nome'];
		$senha = $_POST['login-senha'];

		include 'api/banco.php';

		if ($resposta = $conexao->query("SELECT nome,email,senha FROM usuario WHERE nome='$nome';")) {
			echo "login";
			while ($usuario = $resposta->fetch_assoc()) {
				if ($usuario['senha'] == crypt($senha, $usuario['senha'])) {
					$_SESSION['usuario.email'] = $email;
					$_SESSION['usuario.nome'] = $nome;
		
					entra();
				} else {
					// Erro, senha inválida.
				}
			}
		
			recarrega();
		} else {
			echo 'Erro ao logar!';
		}	
	} else
	if (isset($_POST['cadastro-nome']) &&
		isset($_POST['cadastro-senha']) &&
		isset($_POST['cadastro-senha-confirma']) &&
		isset($_POST['cadastro-email'])) {
		
		$nome = $_POST['cadastro-nome'];
		$senha = $_POST['cadastro-senha'];
		$senha_confirma = $_POST['cadastro-senha-confirma'];
		$email = $_POST['cadastro-email'];
		$dificuldade = 10;

		if ($senha != $senha_confirma) {
			login();
		}

		// Criando um hash salgado
		$sal = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
		$sal = sprintf("$2a$%02d$", $dificuldade) . $sal;
		$hash = crypt($senha, $sal);

		include 'api/banco.php';

		if ($conexao->query("INSERT INTO usuario(nome, senha, email, moderador) VALUES('$nome', '$hash', '$email', false);")) {
			$_SESSION['usuario.email'] = $email;
			$_SESSION['usuario.nome'] = $nome;
		
			recarrega();
		} else {
			echo 'Erro ao cadastrar!';
		}
	} else {
		login();
	}
}