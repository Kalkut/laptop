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
					children : ['.menu','span.timer 35:42',
					{
						tag : '.result',
						events : {
							mouseup : function () {
								this.toggleResult();
							}.bind(this)
						}
					},'.line','.line-background','.next-sequence']
				},]
			}, this.scope)

			this.currentActivity = new r.activities.Brainstorming(o.activityInput);
			this.currentActivity.plugToApp(this.el);
			this.modeActivity = o.modeActivity || true;

		},

		toggleResult : function () {
			
			
			this.modeActivity ? this.modeActivity = false : this.modeActivity = true;
			if(this.modeActivity) {
				this.scope.result.className = "result";
				this.currentActivity.result.style.display = "none";
				this.currentActivity.el.style.display = "block";
			} else{
				this.scope.result.className = "result on";
				this.currentActivity.result.style.display = "block";
				this.currentActivity.el.style.display = "none";
			} 
		}
	})
})