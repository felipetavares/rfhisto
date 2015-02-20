var id_fato;

function conector_criar_fato (data) {
	var lista = "";
	data = JSON.parse(data);

	this.o.listaID = [];

	for (var d in data) {
		lista += "<li onclick='adicionaElementoVetorAuto($(this).parent().parent(), \""+data[d].nome+"\","+data[d].id+");'>"+data[d].nome+"</li>";
		this.o.listaID.push(data[d].id);
	}

	$(this.o).children(".f-vetorauto-opcoes").html(lista);
	$(this.o).children(".f-vetorauto-opcoes").fadeIn(100);
}

function conector_editar_fato (data) {
	var lista = "";
	data = JSON.parse(data);

	this.o.listaID = [];

	for (var d in data) {
		lista += "<li onclick='adicionaElementoVetorAuto($(this).parent().parent(), \""+data[d].nome+"\","+data[d].id+");'>"+data[d].nome+"</li>";
		this.o.listaID.push(data[d].id);
	}

	$(this.o).children(".f-vetorauto-opcoes").html(lista);
	$(this.o).children(".f-vetorauto-opcoes").fadeIn(100);
}

function adiciona_fato () {
	rfface.desabilita();

	var nome = $("#fato-criar-nome").val();
	var texto = $("#fato-criar-texto").val();
	var ftr = $("#fato-criar-ftr").get(0).elementos;

	var dados = "";

	dados += "nome=" + encodeURIComponent(nome);
	dados += "&texto=" + encodeURIComponent(texto);
	
	for (i in ftr) {
		dados += "&ftr"+i+"=" + encodeURIComponent(ftr[i]);
	}

	$.ajax({
		"type": "POST",
		"url": "api/add_f.php",
		"data": dados,
		"success": function (data) {
			$("#fato-criar-nome").val("");
			$("#fato-criar-texto").val("");
			$("#fato-criar-ftr").children(".f-vetorauto-texto").html("")
			$("#fato-criar-ftr").children(".f-vetorauto").html("<div class='f-clear'></div>")
			$("#fato-criar-ftr").get(0).elementos = [];

			rfface.mostra("dados", 2);
			rfface.habilita();

			console.log(data);
		},
	});
}

function abre_criacao () {
	rfface.mostra("dados", 0);
}

function abre_edicao () {
	rfface.desabilita();

	var dados = "";

	var id = '1';

	dados += "id=" + encodeURIComponent(id);

	$.ajax({
		"type": "POST",
		"url": "api/load_f.php",
		"data": dados,
		"success": function (data) {
			console.log (data);

			data = JSON.parse(data);

			for (var r in data.relacionados) {
				var id;				

				if (data.relacionados[r].id_fato != data.id) {
					id = data.relacionados[r].id_fato;
				} else {
					id = data.relacionados[r].id_fato2;
				}

				var dados = "";
				dados += "id=" + encodeURIComponent(id);

				$.ajax({
					"async": false,
					"type": "POST",
					"url": "api/load_f.php",
					"data": dados,
					"success": function (data) {
						data = JSON.parse(data);
						
						adicionaElementoVetorAuto($("#fato-editar-ftr"), data.nome, data.id);
					},
				});				
			}

			$("#fato-editar-nome").val(data.nome);
			$("#fato-editar-texto").val(data.texto);

			id_fato = Math.floor(data.id);

			rfface.mostra("dados", 1);

			rfface.habilita();
		},
	});
}

function edita_fato () {
	rfface.desabilita();

	var nome = $("#fato-editar-nome").val();
	var texto = $("#fato-editar-texto").val();
	var ftr = $("#fato-editar-ftr").get(0).elementos;
	var id = id_fato;

	var dados = "";

	dados += "nome=" + encodeURIComponent(nome);
	dados += "&texto=" + encodeURIComponent(texto);
	dados += "&id=" + encodeURIComponent(id);

	for (i in ftr) {
		dados += "&ftr"+i+"=" + encodeURIComponent(ftr[i]);
	}

	$.ajax({
		"type": "POST",
		"url": "api/edit_f.php",
		"data": dados,
		"success": function (data) {
			console.log(data);

			$("#fato-editar-ftr").children(".f-vetorauto-texto").html("")
			$("#fato-editar-ftr").children(".f-vetorauto").html("<div class='f-clear'></div>")
			$("#fato-editar-ftr").get(0).elementos = [];

			rfface.mostra("dados", 2);
			rfface.habilita();
		},
	});
}

function inicia () {
	rfface.mostra('dados', 3);
}