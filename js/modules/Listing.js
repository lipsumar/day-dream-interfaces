/*global chance,_*/
(function(){

	var chanceMethods = ['name', 'ip', 'cpf', 'ssn', 'coordinates', 'country', 'phone', 'postal', 'province', 'zip'];

	function Listing(brick){
		this.brick = brick;
		this.$el = brick.$el;
	}

	Listing.prototype.start = function() {
		this.$el.html('<div class="inner"><table cellmargin="0" cellpadding="0"></table></div>');
		this.$inner = this.$el.find('.inner');
		this.$table = this.$el.find('table');


		this.colNum = 3;//@TODO make dynamic
		this.speed = chance.integer({min:180, max:350});
		this.colMethods = this.pickChanceMethods(this.colNum);

		this.fillMore();
	};

	Listing.prototype.fillMore = function() {
		if(window.pause) return;

		var row = '<tr class="'+(chance.d10()>9 ? 'selected' : '')+'">';
		for(var i=0;i<this.colNum;i++){
			row+='<td>'+chance[this.colMethods[i]]()+'</td>';
		}
		row+='</tr>';

		this.$table.append(row);


		if(this.$inner.height() > this.brick.height){
			this.$table.find('tr:first-child').remove();
		}
		setTimeout(_.bind(this.fillMore, this), this.speed);
	};

	Listing.prototype.pickChanceMethods = function(n) {
		var rnd = _.shuffle(chanceMethods);
		return rnd.slice(0, n);
	};



	// register module
	window.DDI.registerModule(Listing, ['flat','square-large']);

}());