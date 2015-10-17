var auto_cursor = {
	
	init : function()
	{
		if (auto_cursor.check_for_anchor()
		|| auto_cursor.check_for_active_element()
		|| auto_cursor.check_for_selected_input()
		|| auto_cursor.check_for_page_scrolled()) {
			return;
		}
		auto_cursor.select_first_visible_text_input();
	},
	
	check_for_anchor : function()
	{
		var location_hash = window.location.hash.replace(/^#/, '');
		
		if ('function' == typeof document.getElementsByName) {
			var elements_with_location_hash_name = document.getElementsByName(location_hash);
			for (var i = 0; i < elements_with_location_hash_name.length; i++) {
				if (elements_with_location_hash_name[i].tagName == 'A') {
					return true;
				}
			}
		} else if (location_hash) {
			return true;
		}
		return false;
	},
	
	check_for_active_element : function()
	{
		var active_element = document.activeElement;
		if ( active_element.localName !== 'body' ) {
			return true;
		} else {
			return false;
		}
	},
	
	check_for_selected_input : function()
	{
		if (auto_cursor.page_content_selected()) {
			return true;
		} else {
			return false;
		}
	},
	
	page_content_selected : function()
	{
		if (window.getSelection().toString() == '') {
			return false;
		} else {
			return true;
		}
	},
	
	check_for_page_scrolled : function()
	{
		if (window.pageYOffset > 0) {
			return true;
		} else {
			return false;
		}
	},
	
	select_first_visible_text_input : function()
	{
		var input_elements = document.getElementsByTagName('input');
		for (var i = 0; i < input_elements.length; i++) {
			var current_input_type = input_elements[i].type;
			if (current_input_type == 'text') {
				if (auto_cursor.element_is_visible(input_elements[i])) {
					input_elements[i].focus();
					return;
				}
			}
		}
	},
	
	element_is_visible : function(element)
	{
		var element_offset_top = 0;
		
		while (element) {
			element_offset_top += element.offsetTop;
			element = element.offsetParent;
		}
		
		var window_height = window.innerHeight;
		
		if (element_offset_top >= window_height) {
			return false;
		} else {
			return true;
		}
	}
	
};

window.setTimeout(auto_cursor.init, 1000);