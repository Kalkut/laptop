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
					children : ['.picto','.text Ajouter séquence',
					{
						tag : 'dropdown',
						children : [
						{
							tag : '.drop-button',
							children : ['.text','.picto'],
							events : {
								mouseup : function () {
									this.dropdownIsHidden() ? this.showDropdown() : this.hideDropdown();
								}.bind(this)
							}
						},'input.time','.droplist'],
					}],
					events : {
						mouseup : function () {

							this.toogleEditMode() // Don't forget to deal with this man

						}.bind(this)
					}
				},
				]
			})

			this.activities = parameters.activities || [];
			this.idleMode = true;
			this.addPicto = $(this.scope['add-sequence']).children('.picto')[0];;
		},

		toogleEditMode : function () {

			r.Tools.toogle({
				property : "idleMode",
				mode1 : this.scope['add-sequence'].text,
				mode2 : this.scope.dropdown
			});

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
					callback : function () {
						this.hideDropdown();
						$(this.scope['drop-button']).children('.text').text(text);
					}.bind(this)
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
			var sign;
			this.idleMode ? sign = -1 : sign = 1;
			
			$(this.scope['add-sequence'].picto).animate({
				"-ms-transform": "rotate(" + sign*45 + "deg)", /* IE 9 */
			    "-webkit-transform": "rotate(" + sign*45 + "deg)", /* Chrome, Safari, Opera */
			    "transform": "rotate(" + sign*45 + "deg)",
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
		}




	})
})