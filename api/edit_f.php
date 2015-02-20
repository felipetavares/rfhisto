<?php

include 'banco.php';

if (isset($_POST['id']) &&
	isset($_POST['nome']) &&
	isset($_POST['texto'])) {

	$id = $_POST['id'];
	$nome = $_POST['nome'];
	$texto = $_POST['texto'];
	$ftr = array();

	$i = 0;
	while (isset($_POST['ftr'.$i])) {
		array_push($ftr, $_POST['ftr'.$i]);
		$i++;
	}

	if ($conexao->query("UPDATE fato SET nome='$nome', texto='$texto' WHERE id='$id';")) {
		$relacionados = $conexao->query("SELECT * FROM fato_fato WHERE id_fato='$id' OR id_fato2='$id';");

		if ($relacionados) {
			while ($relacionado = $relacionados->fetch_assoc()) {
				$idr = 0;

				if ($relacionado['id_fato'] == $id) 
					$idr = $relacionado['id_fato2'];
				else
					$idr = $relacionado['id_fato'];

				$existe = false;
				foreach ($ftr as $i => $v) {
					if ($v == $idr) {
						$existe = true;
					}
				}

				if (!$existe) {
					if (!$conexao->query("DELETE FROM fato_fato WHERE (id_fato='$idr' AND id_fato2='$id') OR (id_fato2='$idr' AND id_fato='$id');")) {
						echo "Erro ao deletar relacionamento";
					}
				}
			}
		}

		foreach ($ftr as $i => $v) {
			if ($existe = $conexao->query("SELECT * FROM fato_fato WHERE (id_fato='$v' AND id_fato2='$id') OR (id_fato2='$v' AND id_fato='$id');")) {
				if ($existe->num_rows == 0) {
					$conexao->query("INSERT INTO fato_fato(id_fato, id_fato2) VALUES('$id','$v');");
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