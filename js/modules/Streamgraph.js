/*global chance,_,d3*/

/*
Disclaimer: i have no real idea of what is going on here,
it's all based on a d3 example (http://bl.ocks.org/mbostock/4060954)
 */

(function(){

	// Inspired by Lee Byron's test data generator.
	function bumpLayer(n) {

		function bump(a) {
			var x = 1 / (0.1 + Math.random()),
			y = 2 * Math.random() - 0.5,
			z = 10 / (0.1 + Math.random());
			for (var i = 0; i < n; i++) {
				var w = (i / n - y) * z;
				a[i] += x * Math.exp(-w * w);
			}
		}

		var a = [], i;
		for (i = 0; i < n; ++i) a[i] = 0;
		for (i = 0; i < 5; ++i) bump(a);
		return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
	}

	function Streamgraph(brick){
		this.brick = brick;
		this.$el = brick.$el;
		this.stack = d3.layout.stack().offset("wiggle");
	}

	Streamgraph.prototype.start = function() {
		this.$el.html('<div class="rel" style="opacity:0"><div class="description">'+chance.techterms()+'</div></div>');
		this.$rel = this.$el.find('.rel');

		var layerCount = chance.integer({min:3, max:15});
		var samplesPerLayer = chance.integer({min:50, max:80});

		var layer = this.stack(d3.range(layerCount).map(function() { return bumpLayer(samplesPerLayer); }));

		var x = d3.scale.linear()
			.domain([0, samplesPerLayer - 1])
			.range([0, this.brick.width]);

		var y = d3.scale.linear()
			.domain([0, d3.max(layer.concat(layer), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
			.range([this.brick.height, 0]);

		var color = d3.scale.linear()
			.range(["#aaa", "#fff"]);

		var area = d3.svg.area()
			.x(function(d) { return x(d.x); })
			.y0(function(d) { return y(d.y0); })
			.y1(function(d) { return y(d.y0 + d.y); });

		var svg = d3.select(this.$rel[0]).append("svg")
			.attr("width", this.brick.width)
			.attr("height", this.brick.height);

		svg.selectAll("path")
			.data(layer)
			.enter().append("path")
			.attr("d", area)
			.style("fill", function() { return color(Math.random()); });


		for(var i=0;i<samplesPerLayer;i+=2){
			this.$rel.append('<div class="vert" style="left:'+((this.brick.width/samplesPerLayer)*i)+'px"></div>');
		}

		this.$rel.animate({opacity:1}, 600);

		setTimeout(_.bind(this.transition, this, layer, area, layerCount, samplesPerLayer), chance.integer({min:500,max:2000}));
	};


	Streamgraph.prototype.transition = function(l, area, layerCount, samplesPerLayer) {

		var l2 = this.stack(d3.range(layerCount).map(function() { return bumpLayer(samplesPerLayer); }));
		var dur = chance.integer({min:2000,max:8000});
		d3.selectAll("path")
			.data(function() {
				var d = l2;
				l2 = l;
				return l = d;
			})
			.transition()
			.duration(dur)
			.attr("d", area);

		setTimeout(_.bind(this.transition, this, l2, area, layerCount, samplesPerLayer), dur+chance.integer({min:1000,max:4000}));
	};


	// register module
	window.DDI.registerModule(Streamgraph, ['flat'], 1);

}());