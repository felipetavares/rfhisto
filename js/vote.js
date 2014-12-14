function begin () {
	var panelScrolling = false;
	var Ms = 0;
	var Bs = 0;

	$("#panel-scroll").mousedown(function (event) {
		panelScrolling = true;
		Ms = event.pageY;
		Bs = $("#panel-scroll").position().top;
	});

	$("body").mouseup(function () {
		panelScrolling = false;
	});

	$("body").mousemove(function (event) {
		var f = $("#panel")[0].scrollHeight;
		var h = $("#panel").height();
		var b = $("#panel-scroll").height()+2;
		var Mc = event.pageY;

		var o = 0;
		var e = 0;

		if (f > h) {

			if (Mc-(Ms-Bs) < h-b)  {
				o = (Mc-(Ms-Bs))/(h-b)*(f-h);		
				e = o + Mc - (Ms-Bs);
			} else {
				o = (f-h);		
				e = o + h-b;
			}

			if (e < 0) {
				e = 0;
			}

			if (e-o > h-b)
				e = h-b+o;
		}

		if (panelScrolling) {
			event.preventDefault();
			$("#panel").scrollTop(o);
			$("#panel-scroll").css("top", e+"px");
		}
	});

	var selectedItem = null;

	$(".panel-item").click (function () {
		if (selectedItem)
			$(selectedItem).css("background", "transparent");
		$(this).css("background", "#4090b0");
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