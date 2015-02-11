var lista = [
	"Lustgarten",
	"George Fenton",
	"Cardaillac",
	"Epidendrum campestre",
	"Condado de Knox (Tennessee)",
	"Game of Death",
	"Port au Port (cidade)",
	"KVA",
	"Frigate Bird"
];


// Um fato no espaço
function Fato (p) {
	// Posição
	this.p = p?p:[0, 0, 0];

	this.r = [Math.random()*1-0.5, Math.random()*2*Math.PI, 0];

	this.color = [Math.random()*0.5+0.2,
				  Math.random()*0.5+0.2,
				  Math.random()*0.5+0.2	]

	this.name = lista[Math.floor(Math.random()*lista.length)];
	this.text = "O futuro nos dirá!";

	this.mostrando = false;
	this.mostrandoNome = false;

	this.draw = function () {
		var matrizAntiga = mat4.clone(render.mvMatrix); 

		render.gl.uniform3fv(render.activeShader.uUniforms.color,
							 new Float32Array (this.color))

		mat4.translate (render.mvMatrix, render.mvMatrix, this.p);		

		mat4.rotateX(render.mvMatrix, render.mvMatrix, this.r[0]);
		mat4.rotateY(render.mvMatrix, render.mvMatrix, this.r[1]);

		render.useBuffer("vertices","vertexPosition");
		render.useBuffer("vertices-normals", "vertexNormal");

		render.useBuffer("cube",null);
		render.draw(false);

		render.mvMatrix = matrizAntiga;
	}

	this.mostraNome = function () {
		if (this.mostrandoNome)
			return;

		console.log("N");

		$("#nome-over").css("top", ($(window).height()/2-12)+"px");
		$("#nome-over").css("left", $(window).width()/2+25+"px");
		$("#nome-over").fadeIn(400);

		$("#nome-over").find(".titulo").html(this.name);

		this.mostrandoNome = true;
	}

	this.retiraNome = function () {
		if (!this.mostrandoNome)
			return;

		console.log("RN");

		$("#nome-over").fadeOut(400);

		this.mostrandoNome = false;		
	}

	this.mostraInformacao = function () {
		if (this.mostrando)
			return;

		console.log("M");

		$("#informacao").css("display", "block");
		$("#informacao").css("left", (-$("#informacao").width())+"px");
		
		$("#informacao").animate({
			left: "0"
		}, 400, function() {});

		$("#informacao").find(".titulo").html(this.name);
		$("#informacao").find(".paragrafo").html(this.text);

		this.mostrando = true;
	} 

	this.retiraInformacao = function () {
		if (!this.mostrando)
			return;

		console.log("R");

		$("#informacao").animate({
			left: (-$("#informacao").width())+"px"
		}, 400, function() {
			$("#informacao").css("display", "none");
		});

		this.mostrando = false;
	}
}