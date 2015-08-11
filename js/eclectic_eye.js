(function ($) {

	$.widget( "main.eclectic_eye", {
	 
		options: {
			basePath: "",
		},

		_create: function() {
			var me = this;

			me.element
				.append("<img class='eye-component' id='base' src='" + me.options.basePath + "base.png' />")
				.append("<img class='eye-component' id='pupil' src='" + me.options.basePath + "pupil.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up0' src='" + me.options.basePath + "eyelash_up0.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up1' src='" + me.options.basePath + "eyelash_up1.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up2' src='" + me.options.basePath + "eyelash_up2.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up3' src='" + me.options.basePath + "eyelash_up3.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up4' src='" + me.options.basePath + "eyelash_up4.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up5' src='" + me.options.basePath + "eyelash_up5.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up6' src='" + me.options.basePath + "eyelash_up6.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up7' src='" + me.options.basePath + "eyelash_up7.png' />")
				.append("<img class='eye-component eyelash' id='eyelash_up8' src='" + me.options.basePath + "eyelash_up8.png' />")
				.find(".eye-component")
				.css({
					"position": "absolute",
				});


			var offset = me.element.offset();
			var width = me.element.width();
			var height = me.element.height();
			if(width == 0) {
				width = height * 1.4137296868;
				me.element.css("width", width);
			}
			if(height == 0) {
				height = width * 0.707070712;
				me.element.css("height", height);
			}

			me.element.find("#base").css({
				width: width,
			});


			// === FOR EYELASHES ===

			var eyelash_opts = [
				//[selector, left(%), top(%), width(%), rotationCenterX(%), rotationCenterY(%), head(°), distance(%)]
				["#eyelash_up0",	23.4320464950,	54.6958075177,	2.3130819408,	0,	100,	31.1743,	19.1709],
				["#eyelash_up1",	29.3546271426,	44.275759924,	2.4785192779,	0,	100,	14.9886,	37.3356],
				["#eyelash_up2",	35.9479844487,	33.5689207966,	2.4857411260,	0,	100,	11.2016,	60.3778],
				["#eyelash_up3",	42.8073148199,	23.8255345769,	3.6208066006,	0,	100,	10.7756,	78.3602],
				["#eyelash_up4",	52.7231973934,	13.0110478308,	4.0014740172,	0,	100,	10.6447,	85.3657],
				["#eyelash_up5",	61.9841723696,	7.9153240336,	6.4854096812,	0,	100,	17.4399,	98.1270],
				["#eyelash_up6",	70.9923826606,	12.8358012703,	10.084265664,	0,	100,	30.0437,	88.9871],
				["#eyelash_up7",	80.3335581609,	18.0605409402,	10.807495746,	0,	100,	34.2704,	83.7128],
				["#eyelash_up8",	84.8344799918,	27.4104287481,	14.273602758,	0,	100,	48.4427,	85.9884]
			];

			for(var i in eyelash_opts) {
				var c = eyelash_opts[i];

				me.element.find(c[0]).css({
					left: offset.left + width / 100 * c[1],
					top: offset.top + height / 100 * c[2],
					width: width / 100 * c[3],
					margin: 0
				})
				.detach()
				.appendTo("body")
				.cursorSpy({
					rotationCenterX: c[4],
					rotationCenterY: c[5],
					head: c[6],
					step: function(me, deg, distance) {
						//console.log(deg, distance);
						if(90 < deg && deg < 270) { deg = 180 - deg + 360; }
						if(270 <= deg && deg < 360) { deg = 360; }
						return deg;
					}
				});
			}
			


			// === FOR PUPIL ===

			var Xc = offset.left + width / 100 * 57.0145906039;
			var Yc = offset.top + height / 100 * 61.9886985052;
			var radius = width / 100 * 5;

			var a = radius * 1.6;
			var b = radius;
			var a2 = Math.pow(a, 2);
			var b2 = Math.pow(b, 2);
			if (a2 > b2) {
				var c = Math.sqrt(a2 - b2);
				var F1 = [Xc + -1 * c, Yc + 0];
				var F2 = [Xc + c, Yc + 0];
				var dF = 2 * a;
			} else {
				var c = Math.sqrt(b2 - a2);
				var F1 = [Xc + 0, Yc + -1 * c];
				var F2 = [Xc + 0, Yc + c];
				var dF = 2 * b;
			}

			me.element.find("#pupil").css({
				left: width / 100 * 48.3895183616,
				top: height / 100 * 75.1311154044,
				width: width / 100 * 16.7246600077,
				height: height / 100 * 26.2904782429//needed. otherwise the anchorX will be stack to 0
			}).obeyCursor({
				step: function(me, position) {
					var x = position.left + me.get_anchorX_px(); //anchorX absolute position
					var y = position.top + me.get_anchorY_px(); //anchorY absolute position

					var dx = x - Xc;
					var dy = y - Yc;
					var m = dy / dx;
					var m2 = Math.pow(m, 2);
					
					var distance = Math.sqrt(
						Math.pow(F1[0] - x, 2) + Math.pow(F1[1] - y, 2)
					) +	Math.sqrt(
						Math.pow(F2[0] - x, 2) + Math.pow(F2[1] - y, 2)
					);
				
					if (distance > dF) {
						//computes the nearest point to the cursor on the ellipse.
						x1 = Math.sqrt(a2 * b2 / (b2 + m2 * a2));
						y1 = m * x1;
						x2 = -1 * x1;
						y2 = m * x2;

						position.left = Xc - me.get_anchorX_px();
						position.top = Yc - me.get_anchorY_px();
						if (dx >= 0) {
							position.left += x1;
							position.top += y1;
						} else {
							position.left += x2;
							position.top += y2;
						}
					}
					return position;
				}
			});
			

			this._update();
		},
	 
		_setOption: function(key, value) {
			this.options[key] = value;
			this._update();
		},
	 
		_update: function() {},
	 
		_destroy: function() {},

		start: function() {
			this.options.isActive = true;
		},

		stop: function() {
			this.options.isActive = false;
		},
	 
	});

})(jQuery);