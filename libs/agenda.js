sand.define('View/Agenda',['Seed','DOM/toDOM','Tools'], function (r) {
	return r.Seed.extend({
		
		'+init' : function (parameters) {
			if(!parameters) var parameters = {};
			this.scope = {}

			this.el = r.toDOM({
				tag : '.agenda',
				children : ['.title','.list',
				{ 
					tag : '.add-sequence',
					children : [{
						tag : '.picto',
						events : {
							mouseup : this.editMode.bind(this)
						}
					},
					{
						tag : '.text Ajouter séquence',
						events : {
							mouseup : this.editMode.bind(this)
						}
					},
					{
						tag : '.dropdown',
						children : [
						{
							tag : '.drop-button',
							children : ['.text Choisir activité','.drop-picto'],
							events : {
								mouseup : this.showOrHideDropList.bind(this)
							}
						},'input.time','.droplist'],
					}],
				},
				]
			},this.scope);

			this.activities = parameters.activities || [];
			this.idleMode = true;
			this.addPicto = $(this.scope['add-sequence']).children('.picto')[0];
			this.initDropDown();
		},

		toogleEditMode : function () {

			r.Tools.toggle({
				property : "idleMode",
				mode1 : this.scope.dropdown,
				mode2 : $(this.scope['add-sequence']).children('.text')[0],
			});

			this.pointerEventsHandle();

			console.log($(this.scope['add-sequence']).children('.text')[0]);
			console.log(this.scope.dropdown);
			console.log(this.idleMode);

		},

		pointerEventsHandle : function () {
			this.dropdownIsHidden() ? this.scope["add-sequence"].style.pointerEvents = "all" : this.scope["add-sequence"].style.pointerEvents = "none";
		},

		showDropdown : function () {
			
			$(this.scope.droplist).show();
		},

		hideDropdown : function () {
			
			$(this.scope.droplist).hide();
		},

		dropdownIsHidden : function () {
			return this.scope.droplist.style.display == "none";
		},

		initDropDown : function () {
			var activities = this.activities
			
			for(var i = 0,n = activities.length; i < n ; i++) {

				this.scope.droplist.appendChild(r.Tools.createCliquableItem({
					children : ['.text ' + activities[i]],
					callback : function (text) { return function () {this.newActivitySelection(text)}.bind(this)}.bind(this)(activities[i])
				}))

			}

		},

		newSequence : function (text) {
			
			this.scope.list.appendChild(r.Tools.createCliquableItem({
				children : ['.picto','.index ' + (this.getLastVisibleIndex() + 1),'.text ' + text,'.time'],
				callback : function () {
					r.Tools.exclusiveSelection({ selectables : $(this.scope.list).children('.item'), selected : scope.item});
				}.bind(this)
			}))

		},

		pictoAnimate : function () {
			var deg;
			this.idleMode ? deg = 0 : deg = 45;
			
			$(this.scope['add-sequence']).children('.picto').animate({
			    "transform": "rotate(" + deg + "deg)",
			})
		},

		/*pictoEvent : function () {
			if(!idleMode) this.addPicto.addEventListener("mouseup",this.deleteSequence);
		},

		deleteSequence : function () {

			$(this.scope.list).children('.selected').remove();
			this.refreshIndexes();

		},*/

		refreshIndexes : function () {
			var indexes = $(this.scope.list).children('.item .index');

			for(var i = 0, n = indexes.length; i < n; i++) {
				indexes[i].innerHTML = (i+1) + "."; //TEMP, get Indexes should be involved
			}
		},

		getIndexes : function () {//SHOUDL BE A DB QUERY
			
		},

		getLastVisibleIndex : function () {
			return $(this.scope.list).children().length;
		},

		newActivitySelection : function (text) {
			console.log("go");
			this.hideDropdown();
			$(this.scope['drop-button']).children('.text').text(text);
			console.log(text);
		},

		editMode : function () {
			this.toogleEditMode();
			this.pictoAnimate();
		},

		showOrHideDropList : function () {
			this.dropdownIsHidden() ? this.showDropdown() : this.hideDropdown();
			console.log("dropButton");
		}




	})
})