sand.define('View/LaptopGate',['Seed','DOM/toDOM'], function (r) {
	return r.Seed.extend({
		'+init' : function () {
			this.scope = {};

			this.el = r.toDOM({
				tag : ".gate",
				children : [{tag : ".lobby", children : [".logo"]},{ 
					tag : ".welcome",
					children : ['.title Bienvenue',{ 
						tag : '.add-pin', 
						children : [{ 
							tag : '.pin',
							children : ['.left',{
								tag : 'input.text',
								attr : {
								placeholder : "	Enter pin"
							},
							events : {
								keyup : function (e) {
									this.toogleValidate();
									this.stopCaretBlinking();
								}.bind(this),
								blur : function (e) {
									if(!this.scope["text"].value) this.blinkCaret();
								}.bind(this),
								focus : function (e) {
									if(!this.scope["text"].value) this.stopCaretBlinking();
								}.bind(this)
							}
						},'.next']
					}]
				}]
			}]
		},this.scope)

			this.toogleValidate();
			this.blinkCaret();

		},

		blinkCaret : function () {
			this.blinking = true;
			window.setTimeout(function () {				
				this.scope["left"].style.display == "none" ? this.scope["left"].style.display = "block" : this.scope["left"].style.display = "none";
				if(this.blinking) this.blinkCaret();
			}.bind(this),500);
		},

		stopCaretBlinking : function () {
			this.blinking = false;			
		},

		valueIsNotEmpty : function () {			
			var value = this.scope["text"].value;
			if(!value) return false;
			var k = 0;
			var n = value.length;
			while(k < n){
				if(value[k] != " ") return true;
				else return false;
			}
		},

		toogleValidate : function () {
			this.valueIsNotEmpty() ? this.scope.next.className = "next" : this.scope.next.className = "next invalid";
		},
	})
})