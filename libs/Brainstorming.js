sand.define('activities/Brainstorming', ['Seed','DOM/toDOM'] , function (r) {
	return r.Seed.extend({

		'+init' : function (o) {
			
			if(!o) var o = {};

			this.scope = {};
			this.app = o.app;
			this.questions = o.questions || ["Comment faire en sorte d'avoir plus d'idée quand on veut avoir des idées ?","Facile cuius animi moribus et similis in ab eis amantur eo nisi ex parentes amant si exstitit potest amant perspicere.","Harcode2",] ;//TEMP : HARDCODE TO DELETE
			this.questionsIndex = o.questionIndex || 0;
			this.countDown = o.countDown;

			this.el = r.toDOM({
				tag : ".activity.brainstorming",
					children : [
					{
						tag : ".question",
						children : [
						{
							tag : ".previous",
							events : {
								mouseup : function () {
									this.previousQuestion();
									console.log("s")
								}.bind(this)
							}
						},
						"span.text",
						{
							tag : ".next",
							events : {
								mouseup : function () {
									this.nextQuestion();
									console.log("s")
								}.bind(this)
							}
						}]
					},
					{
						tag : ".title-form",
						children : [".left-bar",
						{
							tag : "input.add-title",
							atrr : {
								placeholder : "Add Title"
							}
						},".validate"]
					},
					{
						tag : ".selctor-buttons",
						children : [".me",".all"]
					}]
			},this.scope)

			this.setQuestion();
			console.log(this.scope)
			$(this.el).ready(function () {
				
			}.bind(this))



		},

		nextQuestion : function () {
						if(this.questionsIndex < this.questions.length -1) {
							this.questionsIndex++;
							this.setQuestion();
						}
					},		

		previousQuestion : function () {
			if(this.questionsIndex > 0 ) {
				this.questionsIndex--;
				this.setQuestion();
			}
		},

		setQuestion : function () {
			this.questions && this.questions[this.questionsIndex] ? this.scope.text.innerHTML = this.questions[this.questionsIndex] : this.scope.text.innerHTML = "";
		},

		lauchCountdown : function (time) {
			var timer = $('.app .header .timer');
			var currentTime = time;
			var line = $('.app .header .line');
			

			line.animate({
				width : "0%"
			},{ 
				duration : time,
				easing : 'linear',
				step : function (now,fx) {
					//currentTime = now;
					var timeString = Math.floor((now/100)*time/60000) + ':' + (Math.floor(((now/100)*time/1000)%60) > 9 ? Math.floor(((now/100)*time/1000)%60) : '0' + Math.floor(((now/100)*time/1000)%60));
					if(timer.text() != timeString){
						timer.text(timeString)
					} 
					console.log()
				}
			})
		},

		plugToApp : function (app) {
			$(document.body).ready(function () {
				app.appendChild(this.el);
				if(this.countDown && typeof(this.countDown) == "number") this.lauchCountdown(this.countDown);
				else this.lauchCountdown(900000);
			}.bind(this))
		},
	})
})