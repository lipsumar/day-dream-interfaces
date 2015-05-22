/*global chance,_,$*/
(function(){

	function htmlEscape(str) {
		return String(str)
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
	}

	function CodeScroll(brick){
		this.brick = brick;
		this.$el = brick.$el;

		this.codeStrings = this.getCodeStrings();
		//console.log(this.codeStrings);
	}

	CodeScroll.prototype.start = function() {
		this.$el.html('<div class="inner"><pre></pre></div>');
		this.$pre = this.$el.find('pre');

		this.speed = chance.integer({min:50, max:100});

		this.lineIndex = 0;

		this.addLine();


		//this.$pre.html(this.codeStrings.join('\n'));
	};

	CodeScroll.prototype.getCodeStrings = function() {
		var str = htmlEscape($('#CodeScroll-code').html());
		return str.split('\n');
	};


	CodeScroll.prototype.addLine = function() {
		if(window.pause) return;
		if(typeof this.codeStrings[this.lineIndex] === 'undefined'){
			_.defer(_.bind(this.start,this));
			return;
		}

		this.$pre.append(this.codeStrings[this.lineIndex]+'\n');

		this.lineIndex++;

		this.$el[0].scrollTop = this.$el[0].scrollHeight;
		setTimeout(_.bind(this.addLine, this), this.speed);

	};

	// register module

	window.DDI.registerModule(CodeScroll, ['square-large','flat'], 1);

}());

