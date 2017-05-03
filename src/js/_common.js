import {$DOCUMENT, $BODY, isTouch, touchClass, noTouchClass} from './_constants';

export default (function() {
	$DOCUMENT.ready(function() {
		isTouch() && $BODY.addClass(touchClass);
		!isTouch() && $BODY.addClass(noTouchClass);
	});
})();