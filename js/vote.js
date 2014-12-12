function begin () {
	var panelScrolling = false;
	var startY = 0;

	$("#panel-scroll").mousedown(function (event) {
		panelScrolling = true;
		startY = event.pageY-$("#panel-scroll").position().top;
	});

	$("#panel").mouseup(function () {
		panelScrolling = false;
	});

	$("#panel").mousemove(function (event) {
		var mul = ($("#panel")[0].scrollHeight-$("#panel").height())/$("#panel").height();

		if (panelScrolling) {
			event.preventDefault();
			$("#panel").scrollTop(event.pageY*mul);
			$("#panel-scroll").css("top", ((event.pageY*mul+event.pageY-startY))+"px");
		}
	});

	var selectedItem = null;

	$(".panel-item").click (function () {
		if (selectedItem)
			$(selectedItem).css("background", "transparent");
		$(this).css("background", "rgba(255,255,255,0.6)");
		selectedItem = this;
	});

	$(".panel-item").mouseenter (function () {
		if (selectedItem != this)
			$(this).css("background", "rgba(255,255,255,0.2)");
	});

	$(".panel-item").mouseleave (function () {
		if (selectedItem != this)
			$(this).css("background", "transparent");
	});
}