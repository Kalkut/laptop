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

			if(!obj.left && !obj.right) this.scope.footer.style.display = "none";
			else if (!obj.left) this.scope.left.style.display = "none";
			else if (!obj.right) this.scope.right.style.display = "none";

			if(obj.picto) this.scope.picto.style.backgroundImage = obj.picto;

		}
	})
})