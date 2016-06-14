
function SWITCH_ROW_HIGHLIGHT(fromObj) {
	var c = fromObj.className;
	if (c.length > 2) {
		fromObj.className = c.substring(0, 2);
	} else {
		fromObj.className = c+'sed';
	}
}

