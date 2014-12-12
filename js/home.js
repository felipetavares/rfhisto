function begin () {
	var menu = false;
	$(".backbutton").css("display", "none");


	function onKeypress (event) {
		if (event.which == 13) { // 13 = Enter
			retiraRodape();
			mostraMenu();
		}
		if (event.which == 8) { // 8 = Backspace
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
}