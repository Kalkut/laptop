sand.define('View/Gate', ["Seed","DOM/toDOM"] , function (r) {
	return r.Seed.extend({
		
		'+init' : function (o) {
			this.el = r.toDOM({
				tag : ".title-screen",
				children : [".lob"+ (o.className ? "." + o.className : ""),
				{
					tag : ".arrow-bloc",
					children : [
					{
						tag : ".circle-wrap",
						children : [".circle",".white-circle"]
					},
					{
						tag : ".rect",
						children : ["span " + (o.title || "")]
					},
					{
						tag : ".triangle-wrap",
						children : [
						{
							tag : ".triangle-wrap",
							children : [".triangle"]
						}]
					}]
				},
				{
					tag : ".touch",
					children : [{
						tag : "input.instruction",
						attr : {
							value : (o.instruction || "")
						}
					}]
				}]
			})
		}


	})
})