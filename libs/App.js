sand.define('View/App', ['Seed','DOM/toDOM','activities/*','View/Agenda','Tools'] , function (r) {
	return r.Seed.extend({

		'+init' : function (o) {
			if(!o) var o = {};
			this.scope = {}
			

			this.el = r.toDOM({
				tag : ".app",
				children : [
				{
					tag : ".header",
					children : [
					{
						tag : '.menu',
						events : {
							mouseup : function () {
								this.toggleAgenda();
								console.log("Agenda displayed");
							}.bind(this)
						}
					},'span.timer',
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

			this.agenda = new r.Agenda(o.agendaData);
			this.agendaDisplayed = o.agendaDisplayed || false;

			this.scope.header.appendChild(this.agenda.el);

		},

		toggleResult : function () {
			
			r.Tools.toggle({
				property : "modeActivity",
				button : this.scope.result,
				class : "result",
				mode1 : this.currentActivity.el,
				mode2 : this.currentActivity.result,
			})

		},

		toggleAgenda : function () {
			
			r.Tools.toggle({
				property : "agendaDisplayed",
				button : this.scope.menu,
				class : "menu",
				mode1 : this.agenda.el
			})

		}
	})
})