// Um fato no espaço
function Fato (p) {
	// Posição
	this.p = p?p:[0, 0, 0];

	this.r = [Math.random()*Math.PI*2, Math.random()*Math.PI*2, Math.random()*Math.PI*2];

	this.draw = function () {
		var matrizAntiga = mat4.clone(render.mvMatrix); 

		mat4.translate (render.mvMatrix, render.mvMatrix, this.p);		

		mat4.rotateX(render.mvMatrix, render.mvMatrix, this.r[0]);
		mat4.rotateY(render.mvMatrix, render.mvMatrix, this.r[1]);

		render.useBuffer("vertices","vertexPosition");
		render.useBuffer("vertices-normals", "vertexNormal");

		render.useBuffer("cube",null);
		render.draw(false);

		render.mvMatrix = matrizAntiga;
	}
}