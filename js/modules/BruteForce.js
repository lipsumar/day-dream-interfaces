/*global chance,_,$*/
(function(){

	var finderHeight = 23;

	function BruteForce(brick){
		this.brick = brick;
		this.$el = brick.$el;
	}

	BruteForce.prototype.start = function() {
		this.$el.html('<div class="rel"></div>');
		this.$rel = this.$el.find('.rel');

		//build text columns
		var finderColsHtml = '';
		var colwidth = 170/8;
		for(var i=0;i<8;i++){
			this.$rel.append('<div class="column" data-index="'+i+'" style="height:'+this.brick.height+'px;left:'+(3+i*colwidth)+'px"></div>');
			finderColsHtml+='<div class="finderColumn" data-index="'+i+'" style="left:'+(i*colwidth)+'px"></div>';
		}

		//build structure
		var finderPosY = chance.integer({min:40, max:(this.brick.height-40-finderHeight-40)});
		this.$rel.append('<div class="ocult" style="height:'+finderPosY+'px"></div>');
		this.$rel.append('<div class="finder" style="top:'+finderPosY+'px;width:'+(this.brick.width-4)+'px"><div class="rel">'+finderColsHtml+'</div></div>');
		this.$rel.append('<div class="ocult" style="top:'+(finderPosY+finderHeight+4)+'px;height:'+(this.brick.height-finderHeight)+'px"></div>');
		this.$rel.append('<div class="description">'+chance.email()+'</div>');

		this.animateColumns();

	};


	BruteForce.prototype.animateColumns = function() {
		var self = this;
		this.$el.find('.column').each(function(){
			self.resetColumn(this);
		});
	};


	BruteForce.prototype.getColumnChars = function() {
		return chance.n(chance.character, 500).join('');
	};

	BruteForce.prototype.resetColumn = function(colEl) {
		var self = this;

		if(chance.d20()===1){
			$(colEl).html('');
			this.$el.find('.finderColumn[data-index="'+$(colEl).attr('data-index')+'"]').html(chance.character());
			return;
		}

		$(colEl)
			.css({marginTop:0})
			.html(this.getColumnChars())
			.animate({marginTop:-800}, chance.integer({min:1000, max:4000}), function(){
				self.resetColumn(this);
			});
	};

	// register module
	window.DDI.registerModule(BruteForce, ['tall-thin'], 1);

}());