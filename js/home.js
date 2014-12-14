function begin () {
	var menu = false;
	$(".backbutton").css("display", "none");


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
		$(".backbutton").fadeOut(400);
	}

	function retiraRodape () {
		$("#rodape").fadeOut(400);
		$(".backbutton").fadeIn(400);
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

	$(".backbutton").click (function () {
		mostraRodape();
		retiraMenu();
	})

	// Setup WebGL

	render.begin("corpo");

	// Vertices
	render.createBuffer ("vertices",
		new Float32Array([
			0,-1,0,
			-1,1,0,
			1,1,0,
		]),
		3,false
	);

	// Create a triangle
	render.createBuffer ("triangle",
		new Uint16Array([
			0,1,2,0
		]),
		1,true
	);

	render.clearColor ([0,0,0,1]);

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
	render.perspective (3.14/4, render.canvas.width/render.canvas.height,
						1, 100);
	render.mvMatrix = mIdentity();

	// Rotate the thing	
	render.mvMatrix = mRotateY (render.mvMatrix, new Date()/100);

	render.mvMatrix = mTranslate (render.mvMatrix, [0,0,5]);

	// Rotate the thing	
	// render.mvMatrix = mRotateY (render.mvMatrix, new Date()/1000);
	
	render.useFrameBuffer("default");
	render.useShader ("default");
	
	// Use the vertices we created
	render.useBuffer("vertices","vertexPosition");
	
	render.useBuffer("triangle",null);
	render.clear();
	render.draw(false);

	setTimeout (draw, 1000/60);
}