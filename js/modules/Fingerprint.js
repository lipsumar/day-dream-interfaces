/*global chance,_*/
(function(){

	function Fingerprint(brick){
		this.brick = brick;
		this.$el = brick.$el;
	}

	Fingerprint.prototype.start = function() {
		var rndImage = chance.integer({min:1,max:25});
		this.$el.css({
			background:'transparent url(js/modules/Fingerprint_files/'+rndImage+'.jpg) no-repeat center center',
			backgroundSize:'contain'
		});


		this.$el.html('<div class="rel"><div class="scanLine"></div></div>');
		this.$rel = this.$el.find('.rel');
		this.$scanLine = this.$el.find('.scanLine');

		this.speed = chance.integer({min:1000, max:2000});

		this.scanToBottom();


	};


	Fingerprint.prototype.scanToBottom = function() {
		this.$scanLine.animate({top:this.brick.height}, this.speed, 'swing', _.bind(this.scanToTop, this));
	};
	Fingerprint.prototype.scanToTop = function() {
		this.$scanLine.animate({top:0}, this.speed, 'swing', _.bind(this.scanToBottom, this));
		if(chance.d10()<5){
			this.addFoundPoint();
		}
	};


	Fingerprint.prototype.addFoundPoint = function() {
		this.$rel.append('<div class="point" style="top:'+(chance.integer({min:10,max:this.brick.height-10}))+'px;left:'+(chance.integer({min:10,max:this.brick.width-10}))+'px"></div>');
	};

	// register module
	window.DDI.registerModule(Fingerprint, ['square-small'], 2);

}());