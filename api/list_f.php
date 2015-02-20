<?php

include 'banco.php';

if ($dados = $conexao->query("SELECT * FROM fato;")) {
	$lista = array();

	while ($dado = $dados->fetch_assoc()) {
		array_push($lista, $dado);
	}

	echo json_encode($lista);
} else {
	echo '{"msg":"Erro ao listar"}';
}
