<?php

include 'banco.php';

if (isset($_POST['id'])) {
	$id = $_POST['id'];

	if ($dados = $conexao->query("SELECT * FROM fato WHERE id='$id';")) {
		$relacionados = $conexao->query("SELECT * FROM fato_fato WHERE id_fato='$id' OR id_fato2='$id';");
		$r_list = array();

		if ($relacionados) {
			while ($relacionado = $relacionados->fetch_assoc()) {
				array_push($r_list, $relacionado);
			}
		}

		while ($dado = $dados->fetch_assoc()) {
			$dado['relacionados'] = $r_list;
			echo json_encode($dado);
		}
	} else {
		echo '{"msg":"Erro ao pesquisar"}';
	}
} else {
	echo '{"msg":"Requisição sem dados"}';
}