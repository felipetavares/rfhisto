<?php

$conexao = new mysqli("localhost", "root", "123456");

if ($conexao->connect_errno) {
	echo "Falha ao conectar ao banco (".$conexao->connect_errno."):".$conexao->connect_error;
	die;
}

$conexao->query("USE rfhisto;");