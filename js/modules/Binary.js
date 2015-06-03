/*global chance,_,$*/
(function(){

	function Binary(brick){
		this.brick = brick;
		this.$el = brick.$el;
	}

	Binary.prototype.start = function() {
		this.$el.html('<div class="inner"></div>');
		this.$inner = this.$el.find('.inner');

		this.speed = chance.integer({min:8, max:80});


		this.fill();
	};

	Binary.prototype.fill = function() {

		chance.n(this.add.bind(this), 50);

		if(this.$inner.height()+30 < this.brick.height){
			_.defer(this.fill.bind(this));
		}else{
			//one last
			chance.n(this.add.bind(this), 50);
			this.startAnimation();
		}

	};

	Binary.prototype.add = function() {

		this.$inner.append('<span class="'+(chance.bool() ? 'active' : '')+'">'+(chance.bool() ? '1' : '0')+'</span>');

	};


	Binary.prototype.startAnimation = function() {
		this.$spans = this.$el.find('span');
		this.animationStep();
	};

	Binary.prototype.animationStep = function() {
		$(_.sample(this.$spans, 10)).toggleClass('active').html(chance.bool() ? '1' : '0');
		$(_.sample(this.$spans, 2)).remove();
		chance.n(this.add.bind(this), 2);
		setTimeout(this.animationStep.bind(this), chance.integer({min:100, max:300}));
	};


	// register module
	window.DDI.registerModule(Binary, ['tall-thin','square-small'], 1);

}());