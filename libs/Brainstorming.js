sand.define('activities/Brainstorming', ['Seed','DOM/toDOM','Items/PostIt'] , function (r) {
	return r.Seed.extend({

		'+init' : function (o) {
			
			if(!o) var o = {};

			this.scope = {};
			this.app = o.app;
			this.questions = o.questions || [""];
			this.questionsIndex = o.questionIndex || 0;
			this.countDown = o.countDown || 0;

			this.userPostIts = o.userPostIts || 0;
			this.allPostIts = o.allPostIts || 0;

			this.publicBrainstorming = o.publicBrainstorming || false;

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
								}.bind(this)
							}
						},
						"span.text",
						{
							tag : ".next",
							events : {
								mouseup : function () {
									this.nextQuestion();
								}.bind(this)
							}
						}]
					},
					{
						tag : ".title-form",
						children : [".left-bar",
						{
							tag : "input.add-title",
							attr : {
								placeholder : "Add Title"
							},
							events : {
								keyup : function (e) {
									this.toogleValidate();
									if(e.keyCode == 13 && this.valueIsNotEmpty()){
										this.appendPostIt();
										this.updatePostItNum();
									}
								}.bind(this)
							}
						},
						{
							tag : ".validate",
							events : {
								mouseup : function () {
									if(this.valueIsNotEmpty()){
										this.appendPostIt();
										this.updatePostItNum();
									}									
								}.bind(this)
							}
						}]
					},
					{
						tag : ".selctor-buttons",
						children : [{
							tag : ".me",
							children : [".text Me",".arrow"],
							events : {
								mouseup : function () {
									this.toogleMe();
								}.bind(this)
							}
						},
						{
							tag : ".all",
							children : [".text All",".arrow"],
							events : {
								mouseup : function () {
									this.toogleAll();
								}.bind(this)
							}
						}]
					},
					{
						tag : ".entries",
					}]
			},this.scope)

			this.setQuestion();
			this.updatePostItNum();
			this.toogleMe();
			console.log(this.scope)

			$(this.el).ready(function () {
				
			}.bind(this))

			this.result = r.toDOM({
				tag :'.result-display.brainstorming'
			})



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
				app.appendChild(this.result);
				this.result.style.display = "none";
				if(this.countDown && typeof(this.countDown) == "number") this.lauchCountdown(this.countDown);
				//TODO : A STRING VERSION 
			}.bind(this))
		},

		appendPostIt : function () {
			var postIt = new r.PostIt(this.scope["add-title"].value);
			this.scope.entries.appendChild(postIt.el);
			this.scope["add-title"].value = "";
			this.userPostIts++;
			this.allPostIts++;
			this.toogleValidate();
		},

		updatePostItNum : function () {
			this.scope.me.childNodes[0].innerHTML = "Me ("+ this.userPostIts + ")";
			this.scope.all.childNodes[0].innerHTML = "All ("+ this.allPostIts + ")";
		},

		toogleAll : function () {
			if(!this.publicBrainstorming) return;
			else{
				this.scope.me.className = "me";
				this.scope.all.className = "all selected";
			}
		},

		toogleMe : function () {
			this.scope.me.className = "me selected";
			this.scope.all.className = "all";
		},

		valueIsNotEmpty : function () {			
			var value = this.scope["add-title"].value;
			if(!value) return false;
			var k = 0;
			var n = value.length;
			while(k < n){
				if(value[k] != " ") return true;
				else return false;
			}
		},

		toogleValidate : function () {
			this.valueIsNotEmpty() ? this.scope.validate.className = "validate" : this.scope.validate.className = "validate invalid";
		}
	})
})