/*global chance,_*/
(function(){

	function Gif(brick){
		this.brick = brick;
		this.$el = brick.$el;
	}

	Gif.prototype.start = function() {
		var rndGif = chance.integer({min:1,max:9});
		this.$el.css({
			background:'transparent url(js/modules/Gif_files/'+rndGif+'.gif) no-repeat center center',
			backgroundSize:'contain'
		});

		setTimeout(_.bind(this.start, this), chance.integer({min:1000, max:2000}));
	};


	// register module
	window.DDI.registerModule(Gif, ['square-small']);

}());