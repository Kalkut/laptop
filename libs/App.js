sand.define('View/App', ['Seed','DOM/toDOM','activities/*'] , function (r) {
	return r.Seed.extend({

		'+init' : function (o) {
			if(!o) var o = {};
			this.scope = {}
			

			this.el = r.toDOM({
				tag : ".app",
				children : [
				{
					tag : ".header",
					children : ['.menu','span.timer 35:42','.result','.line','.next-sequence']
				},]
			}, this.scope)

			this.currentActivity = new r.activities.Brainstorming();
			this.currentActivity.plugToApp(this.el);
			
		},
	})
})