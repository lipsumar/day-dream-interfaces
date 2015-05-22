/*global chance,_*/
(function(){

	function FillCharacters(brick){
		this.brick = brick;
		this.$el = brick.$el;
	}

	FillCharacters.prototype.start = function() {
		this.$el.html('<div class="inner" style="opacity:'+chance.floating({min:0.5, max:1})+'"></div>');
		this.$inner = this.$el.find('.inner');

		this.speed = chance.integer({min:8, max:80});
		this.wordLength = chance.integer({min:1, max:10});

		this.fillMore();
	};

	FillCharacters.prototype.fillMore = function() {
		if(window.pause) return;
		//this.$inner[0].innerHTML += chance.string({length:this.wordLength});
		this.$inner.append('<span class="'+(chance.d20()<=2 ? 'inverse' :'')+'">'+chance.string({length:this.wordLength})+'</span>');
		if(this.$inner.height() < this.brick.height){
			setTimeout(_.bind(this.fillMore, this), this.speed);
		}else{
			this.start();
		}
	};



	// register module
	window.DDI.registerModule(FillCharacters, ['tall','tall-thin']);

}());