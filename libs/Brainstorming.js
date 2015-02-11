sand.define('View/Brainstorming', ['Seed','DOM/toDOM'] , function (r) {
	return r.Seed.extend({

		'+init' : function (o) {

			this.el = r.toDOM{
				tag : ".workspace",
					children : [
					{
						tag : ".title-form",
						children : ["input.add-title",".validate"]
					},
					{
						tag : ".selctor-buttons",
						children : [".me",".all"]
					}]
			}
		}
	})
})