sand.define('View/PopIn',['Seed','DOM/toDOM'], function (r) {
	return r.Seed.extend({
		'+init' : function (obj) {

			this.scope = {};

			this.el = r.toDOM({
				tag : 'screen',
				children : ['.surlayer',{
					tag : ".pop-in",
					children : [{
						tag : ".content",
						children : [{
							tag : ".picto-wrap",
							children : ['.picto']
						},'.text '+ obj.text,{
						tag : '.footer',
						children : ['.left ' + (obj.left || ""),'.right ' + (obj.right || "")]
					}]
					}]
				}]
			}, this.scope)

			if(!obj.left && !obj.right) this.scope.footer.display = "none";
			else if (!obj.left) this.scope.left.display = "none";
			else if (!obj.right) this.scope.right.display = "none";
			
		}
	})
})