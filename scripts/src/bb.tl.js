var bb = bb || {};
bb.tl = bb.tl || {};
bb.tl.vars = bb.tl.vars || {};

bb.tl.init = function() {
	$('#mask').width($(window).width()).height($(window).height());
	
 	bb.tl.vars.paper = Raphael('map', 2426, 1615);	
	bb.tl.vars.properties = bb.tl.vars.paper.set();
	
	bb.tl.addTubeLines();
	bb.tl.addTubeStations();
	bb.tl.setupPanning();
	bb.tl.setupListeners();
	
	// bb.tl.vars.map.attr('opacity':0);
};

bb.tl.addTubeLines = function() {
	bb.tl.vars.tubelines = bb.tl.vars.paper.set();
	bb.tl.vars.tubelines.attr({x: 0, y: 0});
	
	for (p in bb.tl.lines) {
		line = bb.tl.lines[p];
		
		for (var i = line.strings.length - 1; i >= 0; i--){
			var c = bb.tl.vars.paper.path(line.strings[i]);
			c.group = p;
			
			if (p == "EastLondon") {
				c.attr({"stroke-width": 3, "stroke-dasharray": "-", stroke: line.color, opacity: 1, 'stroke-linecap':'round'});
			}
			else {
				c.attr({"stroke-width": 5, stroke: line.color, opacity: 1, 'stroke-linecap':'round'});
			}
			
			c.translate(line.tx, line.ty);
	
			line.paths.push(c);
			bb.tl.vars.tubelines.push(c);
		};
	}
	
	bb.tl.vars.map = bb.tl.vars.paper.image("images/map-artifacts.png", 0, 0, 2426, 1615).attr({"cursor": "move", opacity:1});
};
bb.tl.addTubeStations = function() {
	bb.tl.vars.stations = bb.tl.vars.paper.set();
		
		for (p in bb.tl.stations) {
			var station = bb.tl.stations[p];
			var t = bb.tl.vars.paper.text(station.x, station.y, p);
			t.attr({font: 'Myriad', 'font-size': 12.5, fill: '#1C3F94'});
			t.translate(-70, -110);
			
			bb.tl.vars.stations.push(t);
		}
};

bb.tl.setupPanning = function() {
	bb.tl.vars.ty = 0;
	bb.tl.vars.tx = 0;
	
	bb.tl.vars.map.drag(
		// move
		function(dx, dy) {
			var yRemainder = 1615 - $(window).height(),
			xRemainder = 2426 - $(window).width() + $('#sidebar').width() + 30;
			
			if (dy <= 0 && this.attr("y") > (-(yRemainder))) {
				this.attr({"y": this.oy + dy});
				// bb.tl.vars.tubelines.attr({"y": bb.tl.vars.tubelines.oy + dy});
			}
			if (dy > 0 && this.attr("y") < 0) { 
				this.attr("y", this.oy + dy);
				// bb.tl.vars.tubelines.attr("y", bb.tl.vars.tubelines.oy + dy);
			}
			
			if (dx <= 0 && this.attr("x") > (-(xRemainder))) {
				this.attr("x", this.ox + dx);
				// bb.tl.vars.tubelines.attr("x", bb.tl.vars.tubelines.ox + dx);
			}
			if (dx > 0 && this.attr("x") < 0) {
				this.attr("x", this.ox + dx);
				// bb.tl.vars.tubelines.attr("x", bb.tl.vars.tubelines.ox + dx);
			}
		},
		// start
		function() {
			this.ox = this.attr("x");
		    this.oy = this.attr("y");
		
			this.hide();
			bb.tl.vars.tubelines.hide();
			bb.tl.vars.properties.hide();
		},
		// up
		function() {			
			// adjust the tube lines
			var offsetX = this.ox - this.attr("x");
			var offsetY = this.oy - this.attr("y");
			
			this.show();
			
			bb.tl.vars.tubelines.translate(-offsetX, -offsetY);
			bb.tl.vars.tubelines.show();
			
			bb.tl.vars.stations.translate(-offsetX, -offsetY);
			
			bb.tl.vars.properties.translate(-offsetX, -offsetY);
			bb.tl.vars.properties.show();
			
		}
	);
};

bb.tl.setupListeners = function() {
	$(window).resize(function() {
		$('#mask').width($(window).width()).height($(window).height());
	});
};


$(document).ready(function() {
	bb.tl.init();
});
