<?php

include 'banco.php';

if (isset($_POST['nome']) &&
	isset($_POST['texto'])) {
	$nome = $_POST['nome'];
	$texto = $_POST['texto'];
	$ftr = array();

	$i = 0;
	while (isset($_POST['ftr'.$i])) {
		array_push($ftr, $_POST['ftr'.$i]);
		$i++;
	}

	if ($conexao->query("INSERT INTO fato(nome, texto) VALUES('$nome', '$texto');")) {
		$id = $conexao->insert_id;

		if ($id >= 0) {
			foreach ($ftr as $i => $v) {
				if (!$conexao->query("INSERT INTO fato_fato(id_fato, id_fato2) VALUES('$id','$v');")) {
					echo "Erro ao inserir relacionamento";
				}
			}
		}

		echo "Salvo";
	} else {
		echo "Erro ao salvar";
	}
} else {
	echo "Requisição sem dados";
}