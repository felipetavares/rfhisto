function Linear (x0, x1, y0, y1) {
	this.x0 = x0;
	this.x1 = x1;
	this.y0 = y0;
	this.y1 = y1;

	this.done = function (x) {
		return x > this.x1;
	} 

	this.v = function (x) {
		if (!x)
			x = I.time;
		if (x < this.x0)
			return y0;
		if (x > this.x1)
			return y1;

		return this.y0+(this.y1-this.y0)*(x-this.x0)/(this.x1-this.x0);
	}
}

var fatos = [];
var alinharCom = 0;
var camP = [null, null, null];
var camR = [null, null, null];
var camD = [null, null, null];
var transTime = 10;
var keySpace = false;

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
		if (event.which == 38) { // 38 = Seta de cima
			setCam(alinharCom+1);
		}
		if (event.which == 32) {
			keySpace = true;
		}
	}

	function onKeyunpress (event) {
		if (event.which == 32) {
			keySpace = false;
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

		var x0 = new Date()/1000;
		angleX = new Linear(x0, x0+0.4, 1, 0);
		angleY = new Linear(x0, x0+0.4, 3, 0);
		angleZ = new Linear(x0, x0+0.4, 2, 0);

		dZ = new Linear(x0, x0+0.4, -10, -1.5);
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

		var x0 = new Date()/1000;
		angleX = new Linear(x0, x0+0.4, 0, 1);
		angleY = new Linear(x0, x0+0.4, 0, 3);
		angleZ = new Linear(x0, x0+0.4, 0, 2);

		dZ = new Linear(x0, x0+0.4, -1.5, -10);
	}

	$("html").keydown(onKeypress);
	$("html").keyup(onKeyunpress);

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

	var baseD = 0.5;
	var bigD = baseD*render.canvas.width/render.canvas.height;

	// Vertices
	render.createBuffer ("vertices",
		new Float32Array([
			bigD , -baseD , baseD ,
			-bigD , -baseD , baseD ,
			-bigD , -baseD , -baseD ,
			-bigD , baseD , -baseD ,
			-bigD , baseD , baseD ,
			bigD , baseD , baseD ,
			bigD , baseD , -baseD ,
			bigD , baseD , baseD ,
			bigD , -baseD , baseD ,
			bigD , -baseD , baseD ,
			bigD , baseD , baseD ,
			-bigD , baseD , baseD ,
			-bigD , baseD , baseD ,
			-bigD , baseD , -baseD ,
			-bigD , -baseD , -baseD ,
			bigD , baseD , -baseD ,
			bigD , -baseD , -baseD ,
			-bigD , -baseD , -baseD ,
			bigD , -baseD , -baseD ,
			bigD , -baseD , baseD ,
			-bigD , -baseD , -baseD ,
			bigD , baseD , -baseD ,
			-bigD , baseD , -baseD ,
			bigD , baseD , baseD ,
			bigD , -baseD , -baseD ,
			bigD , baseD , -baseD ,
			bigD , -baseD , baseD ,
			-bigD , -baseD , baseD ,
			bigD , -baseD , baseD ,
			-bigD , baseD , baseD ,
			-bigD , -baseD , baseD ,
			-bigD , baseD , baseD ,
			-bigD , -baseD , -baseD ,
			-bigD , baseD , -baseD ,
			bigD , baseD , -baseD ,
			-bigD , -baseD , -baseD ,
		]),
		3,false
	);

	// Normals
	render.createBuffer ("vertices-normals",
		new Float32Array([
			0.0 , -1.0 , -0.0 ,
			0.0 , -1.0 , -0.0 ,
			0.0 , -1.0 , -0.0 ,
			0.0 , 1.0 , 0.0 ,
			0.0 , 1.0 , 0.0 ,
			0.0 , 1.0 , 0.0 ,
			1.0 , 0.0 , 0.0 ,
			1.0 , 0.0 , 0.0 ,
			1.0 , 0.0 , 0.0 ,
			0.0 , -0.0 , 1.0 ,
			0.0 , -0.0 , 1.0 ,
			0.0 , -0.0 , 1.0 ,
			-1.0 , -0.0 , 0.0 ,
			-1.0 , -0.0 , 0.0 ,
			-1.0 , -0.0 , 0.0 ,
			0.0 , 0.0 , -1.0 ,
			0.0 , 0.0 , -1.0 ,
			0.0 , 0.0 , -1.0 ,
			0.0 , -1.0 , -0.0 ,
			0.0 , -1.0 , -0.0 ,
			0.0 , -1.0 , -0.0 ,
			0.0 , 1.0 , 0.0 ,
			0.0 , 1.0 , 0.0 ,
			0.0 , 1.0 , 0.0 ,
			1.0 , 0.0 , 0.0 ,
			1.0 , 0.0 , 0.0 ,
			1.0 , 0.0 , 0.0 ,
			0.0 , -0.0 , 1.0 ,
			0.0 , -0.0 , 1.0 ,
			0.0 , -0.0 , 1.0 ,
			-1.0 , -0.0 , 0.0 ,
			-1.0 , -0.0 , 0.0 ,
			-1.0 , -0.0 , 0.0 ,
			0.0 , 0.0 , -1.0 ,
			0.0 , 0.0 , -1.0 ,
			0.0 , 0.0 , -1.0 ,
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

	render.clearColor ([1,0.8,0.2,1]);

	render.viewport();

	// Está tudo ok?
	if (render.good()) {
		setTimeout (draw, 0);
	} else {
		alert ("Erro ao preparar WebGL!");
	}

	for (var i=0;i<100;i++) {
		var distancia = Math.random()*-40-20;
		var xymax = distancia/Math.sin(3.14/4);
		var prop = render.canvas.width/render.canvas.height;

		fatos.push(new Fato([(Math.random()*xymax-xymax/2),
							 (Math.random()*xymax-xymax/2)/prop,
							 distancia]));
	}

	setCam(0);
}

function setCam (num) {
	alinharCom = num;

	var oX, oY, oZ;
	var rX, rY, rZ;
	var dX, dY, dZ;
	var t;

	t = new Date()/1000;

	oX = camP[0]?camP[0].v(t):0;
	oY = camP[1]?camP[1].v(t):0;
	oZ = camP[2]?camP[2].v(t):0;

	rX = camR[0]?camR[0].v(t):0;
	rY = camR[1]?camR[1].v(t):0;

	dZ = camD[2]?camD[2].v(t):50;

	camP[0] = new Linear(t, t+transTime, oX, fatos[alinharCom].p[0]);
	camP[1] = new Linear(t, t+transTime, oY, fatos[alinharCom].p[1]);
	camP[2] = new Linear(t, t+transTime, oZ, fatos[alinharCom].p[2]);

	camR[0] = new Linear(t, t+transTime, rX, fatos[alinharCom].r[0])
	camR[1] = new Linear(t, t+transTime, rY, fatos[alinharCom].r[1])

	camD[2] = new Linear(t, t+transTime/4, dZ, 50);
}

// Desenha com WebGL
function draw () {
	mat4.perspective (render.pMatrix,
					  3.14/4, render.canvas.width/render.canvas.height,
						1, 200);

	render.useFrameBuffer("default");
	render.useShader ("default");
	
	render.clear();

	mat4.identity(render.mvMatrix);

	var t = new Date()/1000;

	mat4.translate (render.mvMatrix, render.mvMatrix, [ camP[0].v(t),
														camP[1].v(t),
														camP[2].v(t)]);

	mat4.rotateX(render.mvMatrix, render.mvMatrix, camR[0].v(t));
	mat4.rotateY(render.mvMatrix, render.mvMatrix, camR[1].v(t));

	mat4.translate (render.mvMatrix, render.mvMatrix, [0,
													   0,
													   camD[2].v(t)]);

	mat4.invert(render.mvMatrix, render.mvMatrix);

	for (var f in fatos) {
		fatos[f].draw();
	}

	if (t > camD[2].x0+transTime/4*3 && camD[2].v(t) == 50 && !keySpace) {
		camD[2] = new Linear(t, t+transTime/4, camD[2].v(t), 2);
	}

	setTimeout (draw, 1000/60);
}