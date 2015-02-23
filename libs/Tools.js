sand.define('Tools',['DOM/toDOM'], function (r) {
	return {
		toggle : function (obj) { //Require binding
			this[obj.property] ? this[obj.property] = false : this[obj.property] = true;
			
			if(this[obj.property]) {
				if(obj.class) obj.button.className = obj.class;
				if(obj.mode2) obj.mode2.style.display = "none";
				if(obj.mode1) obj.mode1.style.display = "block";
			} else{
				if(obj.class) obj.button.className = obj.class + " on";
				if(obj.mode2) obj.mode2.style.display = "block";
				if(obj.mode1) obj.mode1.style.display = "none";
			} 
		},

		exclusiveSelection : function (obj) {
			obj.selectables.removeClass('.selected');
			$(obj.selected).addClass('.selected');
		},

		createCliquableItem : function (obj) {
			var scope = {};

			var item = r.toDOM({
				tag : obj.class ? '.' + obj.class : '.item',
				children : obj.children || [],
				events : {
					mouseup : obj.callback || function () {}
				}
			},scope)

			return item;
		}
	}
})