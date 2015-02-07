// Função principal
function inicia () {
	var menu = false;
	$(".botaovoltar").css("display", "none");


	function onKeypress (event) {
		if (event.which == 13) { // 13 = Enter
			event.preventDefault();
			retiraRodape();
			mostraMenu();
		}
		if (event.which == 8) { // 8 = Backspace
			event.preventDefault();
			mostraRodape();
			retiraMenu();
		}
	}

	function mostraRodape () {
		$("#rodape").fadeIn(400);
		$(".botaovoltar").fadeOut(400);
	}

	function retiraRodape () {
		$("#rodape").fadeOut(400);
		$(".botaovoltar").fadeIn(400);
	}

	function mostraMenu () {
		if (menu)
			return;

		$("#menu").css("display", "inline");
		$("#menu").css("top", (-$("#menu").height())+"px");
		
		$("#menu").animate({
			top: "20%"
		}, 400, function() {});

		menu = true;
	}

	function retiraMenu () {
		if (!menu)
			return;

		$("#menu").animate({
			top: (-$("#menu").height())+"px"
		}, 400, function() {
			$("#menu").css("display", "none");
		});

		menu = false;
	}

	$("html").keydown(onKeypress);
	$("#rodape").click (function () {
		retiraRodape();
		mostraMenu();
	});

	$(".botaovoltar").click (function () {
		mostraRodape();
		retiraMenu();
	})

	// Setup WebGL
	render.begin("corpo");

	// Vertices
	render.createBuffer ("vertices",
		new Float32Array([
			0.5 , -0.5 , 0.5 ,
			-0.5 , -0.5 , 0.5 ,
			-0.5 , -0.5 , -0.5 ,
			-0.5 , 0.5 , -0.5 ,
			-0.5 , 0.5 , 0.5 ,
			0.5 , 0.5 , 0.5 ,
			0.5 , 0.5 , -0.5 ,
			0.5 , 0.5 , 0.5 ,
			0.5 , -0.5 , 0.5 ,
			0.5 , -0.5 , 0.5 ,
			0.5 , 0.5 , 0.5 ,
			-0.5 , 0.5 , 0.5 ,
			-0.5 , 0.5 , 0.5 ,
			-0.5 , 0.5 , -0.5 ,
			-0.5 , -0.5 , -0.5 ,
			0.5 , 0.5 , -0.5 ,
			0.5 , -0.5 , -0.5 ,
			-0.5 , -0.5 , -0.5 ,
			0.5 , -0.5 , -0.5 ,
			0.5 , -0.5 , 0.5 ,
			-0.5 , -0.5 , -0.5 ,
			0.5 , 0.5 , -0.5 ,
			-0.5 , 0.5 , -0.5 ,
			0.5 , 0.5 , 0.5 ,
			0.5 , -0.5 , -0.5 ,
			0.5 , 0.5 , -0.5 ,
			0.5 , -0.5 , 0.5 ,
			-0.5 , -0.5 , 0.5 ,
			0.5 , -0.5 , 0.5 ,
			-0.5 , 0.5 , 0.5 ,
			-0.5 , -0.5 , 0.5 ,
			-0.5 , 0.5 , 0.5 ,
			-0.5 , -0.5 , -0.5 ,
			-0.5 , 0.5 , -0.5 ,
			0.5 , 0.5 , -0.5 ,
			-0.5 , -0.5 , -0.5 ,
		]),
		3,false
	);

	// Normals
	render.createBuffer ("vertices-normals",
		new Float32Array([
			0.5773 , -0.5773 , 0.5773 ,
			-0.5773 , -0.5773 , 0.5773 ,
			-0.5773 , -0.5773 , -0.5773 ,
			-0.5773 , 0.5773 , -0.5773 ,
			-0.5773 , 0.5773 , 0.5773 ,
			0.5773 , 0.5773 , 0.5773 ,
			0.5773 , 0.5773 , -0.5773 ,
			0.5773 , 0.5773 , 0.5773 ,
			0.5773 , -0.5773 , 0.5773 ,
			0.5773 , -0.5773 , 0.5773 ,
			0.5773 , 0.5773 , 0.5773 ,
			-0.5773 , 0.5773 , 0.5773 ,
			-0.5773 , 0.5773 , 0.5773 ,
			-0.5773 , 0.5773 , -0.5773 ,
			-0.5773 , -0.5773 , -0.5773 ,
			0.5773 , 0.5773 , -0.5773 ,
			0.5773 , -0.5773 , -0.5773 ,
			-0.5773 , -0.5773 , -0.5773 ,
			0.5773 , -0.5773 , -0.5773 ,
			0.5773 , -0.5773 , 0.5773 ,
			-0.5773 , -0.5773 , -0.5773 ,
			0.5773 , 0.5773 , -0.5773 ,
			-0.5773 , 0.5773 , -0.5773 ,
			0.5773 , 0.5773 , 0.5773 ,
			0.5773 , -0.5773 , -0.5773 ,
			0.5773 , 0.5773 , -0.5773 ,
			0.5773 , -0.5773 , 0.5773 ,
			-0.5773 , -0.5773 , 0.5773 ,
			0.5773 , -0.5773 , 0.5773 ,
			-0.5773 , 0.5773 , 0.5773 ,
			-0.5773 , -0.5773 , 0.5773 ,
			-0.5773 , 0.5773 , 0.5773 ,
			-0.5773 , -0.5773 , -0.5773 ,
			-0.5773 , 0.5773 , -0.5773 ,
			0.5773 , 0.5773 , -0.5773 ,
			-0.5773 , -0.5773 , -0.5773 ,
		]),
		3,false
	);

	// Create a cube
	render.createBuffer ("cube",
		new Uint16Array([
			0, 1, 2, 3,
			4, 5, 6,
			7, 8, 9,
			10, 11, 12,
			13, 14, 15,
			16, 17, 18,
			19, 20, 21,
			22, 23, 24,
			25, 26, 27,
			28, 29, 30,
			31, 32, 33,
			34, 35
		]),
		1,true
	);

	render.clearColor ([0.2,0.7,1,1]);

	render.viewport();

	// Está tudo ok?
	if (render.good()) {
		setTimeout (draw, 0);
	} else {
		alert ("Erro ao preparar WebGL!");
	}
}

// Desenha com WebGL
function draw () {
	mat4.perspective (render.pMatrix,
					  3.14/4, render.canvas.width/render.canvas.height,
						1, 100);
	
	mat4.identity(render.mvMatrix);

	mat4.translate (render.mvMatrix, render.mvMatrix, [0,0,-5]);

	// Rotate the thing	
	mat4.rotateY (render.mvMatrix, render.mvMatrix, new Date()/1000);
	mat4.rotateX (render.mvMatrix, render.mvMatrix, new Date()/1000);


	// Rotate the thing	
	// render.mvMatrix = mRotateY (render.mvMatrix, new Date()/1000);
	
	render.useFrameBuffer("default");
	render.useShader ("default");
	
	// Use the vertices we created
	render.useBuffer("vertices","vertexPosition");
	render.useBuffer("vertices-normals", "vertexNormal");

	render.useBuffer("cube",null);
	render.clear();
	render.draw(false);

	setTimeout (draw, 1000/60);
}