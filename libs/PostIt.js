sand.define('Items/PostIt',['Seed','DOM/toDOM'], function (r) {
	return r.Seed.extend({
		'+init' : function (text,color) {
			this.el = r.toDOM({
				tag : '.post-it '+text,
			})

			if(color) this.el.style.backgroundColor = color;
		}
	})
})