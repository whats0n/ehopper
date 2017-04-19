import {$DOCUMENT, $BODY, isTouch, touchClass} from './_constants';

export default (function() {
	$DOCUMENT.ready(function() {
		isTouch() && $BODY.addClass(touchClass);
	});
})();