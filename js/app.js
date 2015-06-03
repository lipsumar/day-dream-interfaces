/*global freewall,_*/
window.jQuery(function(){

	var $ = window.jQuery;

	var app = {

		initialize: function(){
			this.$freeWall = $("#freewall");
			this.initWall();

		},

		wallComplete: function(){
			var bricks = [];
			this.$freeWall.find('.brick').each(function(){
				var $el = $(this),
					width = $el.width(),
					brick;

				if(width===0) return;//off screen

				brick = {
					$el: $el,
					width: width,
					height: $el.height()
				};

				brick.ratio = Math.round((brick.width / brick.height)*100)/100;


				if(brick.ratio > 1){
					// flat
					brick.shape = 'flat';

					if(brick.ratio < 1.2){


						if(brick.width<200){
							brick.shape  = 'square-small';
						}else{
							brick.shape = 'square-large';
						}
					}
				}else{
					// tall
					brick.shape = 'tall';

					if(brick.ratio > 0.85){


						if(brick.width<200){
							brick.shape  = 'square-small';
						}else{
							brick.shape = 'square-large';
						}
					}else{
						if( brick.width < 180){
							brick.shape = 'tall-thin';
						}
					}
				}
				//console.log(brick.ratio);


				bricks.push(brick);
			});

			this.assignModulesToBricks(bricks);
		},

		assignModulesToBricks: function(bricks){
			_.each(bricks, function(brick){
				var Module = this.getSuitableModuleForBrick(brick);
				brick.$el.addClass(Module.name);
				brick.$el.addClass(brick.shape);
				var module = new Module(brick);
				setTimeout(Module.prototype.start.bind(module), chance.integer({min:200, max:3000}));
			}, this);
		},

		getSuitableModuleForBrick: function(brick){

			// find all modules suited for this brick
			var suitableModules = [];
			_.each(window.DDI.modules, function(Module){
				if(Module.used >= Module.maxUsable) return;
				if(_.indexOf(Module.suitableShapes, brick.shape)>-1){
					suitableModules.push(Module);
				}
			});


			var Module = _.sample(suitableModules);
			Module.used ++;
			return Module;
		},


		initWall: function(){
			var self = this;
			var temp = "<div class='brick' style='width:{width}px; height: {height}px;'></div>";
			var w = 1, h = 1, html = '', limitItem = 28;
			for (var i = 0; i < limitItem; ++i) {
				h = 1 + 3 * Math.random() << 0;
				w = 1 + 3 * Math.random() << 0;

				html += temp.replace(/\{height\}/g, h*150).replace(/\{width\}/g, w*150);
			}
			this.$freeWall.html(html);
			this.wall = new freewall("#freewall");

			this.wall.reset({
				selector: '.brick',
				animate: false,
				cellW: 160,
				cellH: 160,
				gutterX:1,
				gutterY:1,
				onResize: function() {
					self.wall.refresh($(window).width(), $(window).height());
				},
				onComplete: _.bind(this.wallComplete, this)
			});
			this.wall.fitZone($(window).width(), $(window).height());
		}

	};

	app.initialize();


}());