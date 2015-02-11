sand.define('View/App', ['Seed','DOM/toDOM'] , function (r) {
	return r.Seed.extend({

		'+init' : function (o) {

			this.el = r.toDOM({
				tag : ".app",
				children : [
				{
					tag : ".header",
					children : ['.menu','span.timer','.result','.line','.next-sequence']
				},
				{
					tag : ".question",
					children : [".previous",".text",".next"]
				},
				{
					tag : ".workspace",
					/*children : [
					{
						tag : ".title-form",
						children : ["input.add-title",".validate"]
					},
					{
						tag : ".selctor-buttons",
						children : [".me",".all"]
					}]*/
				}]
			})
		}
	})
})