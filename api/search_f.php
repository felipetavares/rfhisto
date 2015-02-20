<?php

include 'banco.php';

if (isset($_POST['pergunta'])) {
	$pergunta = $_POST['pergunta'];

	if ($dados = $conexao->query("SELECT * FROM fato WHERE nome LIKE '%$pergunta%' OR texto LIKE '%$pergunta%';")) {
		$lista = array();
		while ($dado = $dados->fetch_assoc()) {
			array_push($lista, $dado);
		}
		echo json_encode($lista);
	} else {
		echo '{"msg":"Erro ao pesquisar"}';
	}
} else {
	echo '{"msg":"Requisição sem dados"}';
}