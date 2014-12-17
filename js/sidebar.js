function sidebarBegin () {
	var sidebarScrolling = false;
	var Ms = 0;
	var Bs = 0;

	$("#sidebar-scroll").mousedown(function (event) {
		sidebarScrolling = true;
		Ms = event.pageY;
		Bs = $("#sidebar-scroll").position().top;
	});

	$("body").mouseup(function () {
		sidebarScrolling = false;
	});

	$("body").mousemove(function (event) {
		var f = $("#sidebar")[0].scrollHeight;
		var h = $("#sidebar").height();
		var b = $("#sidebar-scroll").height()+2;
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

		if (sidebarScrolling) {
			event.preventDefault();
			$("#sidebar").scrollTop(o);
			$("#sidebar-scroll").css("top", e+"px");
		}
	});

	var selectedItem = null;

	$(".sidebar-item").click (function () {
		if (selectedItem)
			$(selectedItem).css("background", "transparent");
		$(this).css("background", "rgba(255,255,255,0.5)");
		selectedItem = this;
	});

	$(".sidebar-item").mouseenter (function () {
		if (selectedItem != this)
			$(this).css("background", "rgba(255,255,255,0.2)");
	});

	$(".sidebar-item").mouseleave (function () {
		if (selectedItem != this)
			$(this).css("background", "transparent");
	});
}