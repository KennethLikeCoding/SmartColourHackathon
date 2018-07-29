var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-2196019-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
	
 function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	
	function componentToHex(c) {
	var hexNum = parseInt(c);
		var hex = hexNum.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
		return componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
	
	function getNearestColor(r, g, b) {
		var hexCode = rgbToHex(r, g, b);
		return JSON.parse(httpGet("http://localhost:6789/nearestColor/"+hexCode));
	}	
	
	var timer = setInterval(check, 100);
	
	function check() {
		if ($('#first-title').attr('red') != null) {
			clearInterval(timer);
			displayNearestColor();
		}
	}
	var foundNearest = false;
	function displayNearestColor() {
		var red = $('#first-title').attr('red');
		var green = $('#first-title').attr('green');
		var blue = $('#first-title').attr('blue');
		var nearest = "#" + getNearestColor(red, green, blue);
		$("#nearest h3").append(nearest);
		$("#nearest-color").css('background', nearest);
		foundNearest = true;
		localStorage.imgSrc = $('img').attr('src');
	}
	
	$("body").on('click', '#nearest h3', function(event) {
		if (foundNearest == false) {
			foundNearest = true;
			var red = $('#first-title').attr('red');
			var green = $('#first-title').attr('green');
			var blue = $('#first-title').attr('blue');
			var nearest = "#" + getNearestColor(red, green, blue);
			$("#nearest h3").append(nearest);
			$("#nearest-color").css('background', nearest);
		}
	});

	$("body").on('click', '.changeColor', function(event) {
		localStorage.red = $(this).attr('red');
		localStorage.green = $(this).attr('green');
		localStorage.blue = $(this).attr('blue');
	});
	var loadImg = setInterval(imgToCan, 100);

	function imgToCan() {
		if ($(".target-image") != null) {
			clearInterval(loadImg);
			$(".target-image").parent().append("<canvas></canvas>");
			canvas.attr("width", $(".target-image").width);
			canvas.attr("height", $(".target-image").height);
			canvas.className = $(".target-image").className;
			$(".target-image").html();
		}

	}
