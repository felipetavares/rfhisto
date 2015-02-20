function removeElementoVetorAuto (elemento, id) {
	var elementos = elemento.get(0).elementos;
	
	for (var i=0;i<elementos.length;i++) {
		if (elementos[i] == id) {
			$(elemento.children(".f-vetorauto").children().get(i)).fadeOut(200, function () {
				$(this).remove();
			});
			elementos.splice(i, 1);
			break;
		}
	}
}

function adicionaElementoVetorAuto (elemento, data, id) {
	var elementos = elemento.get(0).elementos;

	for (var i=0;i<elementos.length;i++) {
		if (elementos[i] == id) {
			return;
		}
	}

	var conteudo = data+"<div class='f-deletar' onclick='removeElementoVetorAuto($(this).parent().parent().parent(), "+id+")'>"+"</div>";

	$("<div class='f-vetorauto-elemento'>"+conteudo+"</div>").insertBefore(elemento.children(".f-vetorauto").children(".f-clear"));
	elemento.children(".f-vetorauto-opcoes").fadeOut(100);
	elemento.children(".f-vetorauto-texto").val("");

	elementos.push(id);
}

var rfface = {
	"handle": function (o) {
		this.o = o;
		this.ultimoTempo = 0;
		this.atualizado = false;

		this.keyup = function (key) {
			var texto = $(this.o).children(".f-vetorauto-texto");

			if (key.which == 13) {
				if (texto.val() != "") {
					adicionaElementoVetorAuto($(this.o), $(this.o).children(".f-vetorauto-opcoes").children("li").get(0).innerHTML, this.o.listaID[0]);
				}
			} else {
				var now = new Date()/1000;
				this.ultimoTempo = now;
				this.atualizado = false;
			}
		}

		this.verifica = function () {
			var texto = $(this.o).children(".f-vetorauto-texto");

			if (texto.val() == "" && !this.atualizado) {
				$(this.o).children(".f-vetorauto-opcoes").html("");
				$(this.o).children(".f-vetorauto-opcoes").fadeOut(100);
			}

			if (texto.val() != "" && !this.atualizado) {
				var now = new Date()/1000;

				if (now-this.ultimoTempo > 0.5) {
					this.atualizado = true;
					$(this.o).children(".f-vetorauto-opcoes").fadeOut(100);
					$.ajax({
						"type": "POST",
						"url": "api/search_f.php",
						"data": "pergunta="+texto.val(),
						"success": $.proxy(this.o.conector,this),
					});
				}
			}
		}

		setInterval($.proxy(this.verifica, this), 250);
	},

	"seleciona": function (elemento, nome) {
		var painel = null;

		if (elemento !== undefined && nome !== undefined) {
			// Nome é o id do elemento
			if (isNaN(nome)) {
				painel = $("#"+elemento).find("#"+nome);
			} else { // Nome é o índice do elemento
				painel = $($("#"+elemento).children("").get(nome));
			}
		} else if (elemento) {
			painel = $("#"+elemento);
		} else {
			return null;
		}

		return painel;
	},

	"mostra": function (elemento, nome) {
		var lista = rfface.seleciona(elemento).get(0);
		var painel = rfface.seleciona(elemento, nome);

		if (lista && painel && painel.length !== 0) {
			if (lista.painelAtual !== undefined) {
				if (lista.painelAtual != nome) {
					rfface.esconde(elemento, lista.painelAtual);
				} else {
					return true;
				}
			}
		
			lista.painelAtual = nome;
		} else {
			return false;
		}
		
		painel.css("top", "100%");
		painel.css("display", "block");

		painel.animate ({
			"top": "10%",
		}, 400, function () {
		})

		return true;
	},

	"esconde": function (elemento, nome) {
		var painel = rfface.seleciona(elemento, nome);

		if (painel && painel.length !== 0) {
			painel.scrollTop(0);

			painel.animate ({
				"top": "-80%",
			}, 400, function () {
				painel.css("display", "none");
			})
		} else {
			return false;
		}

		return true;
	},

	"escondeTodos": function (elemento) {
		var lista = rfface.seleciona(elemento).get(0);

		if (lista) {
			if (lista.painelAtual !== undefined) {
				rfface.esconde(elemento, lista.painelAtual);
			}
		
			lista.painelAtual = undefined;
		}
	},

	"desabilita": function () {
		$(".f-desabilita").fadeIn(200);
	},

	"habilita": function () {
		$(".f-desabilita").fadeOut(200);
	}
};

$(document).ready(function () {
	$(".f-vetor").each(function (i, v) {
		v.elementos = [];
		v.listaID = [];
		v.conector = eval($(v).attr("data-conector"));

		var texto = $(v).children(".f-vetorauto-texto").get(0);
		texto.rfface = new rfface.handle(v);		
		$(texto).keyup($.proxy(texto.rfface.keyup, texto.rfface));
	});
});