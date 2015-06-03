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


		this.$el.html('<div class="rel"><div class="scanLine"></div><div class="scanLine2" style="top:'+this.brick.height+'px"></div></div>');



		this.speed = chance.integer({min:1000, max:2000});

		this.changeImage();



	};




	Fingerprint.prototype.changeImage = function() {
		var rndImage = chance.integer({min:1,max:25});
		this.$el.css({
			background:'transparent url(js/modules/Fingerprint_files/'+rndImage+'.jpg) no-repeat center center',
			backgroundSize:'contain'
		});
		setTimeout(this.changeImage.bind(this), chance.integer({min:2000, max:2500}));
	};




	Fingerprint.prototype.addFoundPoint = function() {
		this.$rel.append('<div class="point" style="top:'+(chance.integer({min:10,max:this.brick.height-10}))+'px;left:'+(chance.integer({min:10,max:this.brick.width-10}))+'px"></div>');
	};

	// register module
	window.DDI.registerModule(Fingerprint, ['square-small'], 2);

}());