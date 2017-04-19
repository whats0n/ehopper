import {$DOCUMENT, isTouch} from '../_constants';

export default (function() {

	const swipe = {
		start(e) {
			this.swipeStartX = e.targetTouches[0].pageX;
			this.swipeEndX = e.targetTouches[0].pageX;
		},
		move(e) {
			this.swipeEndX = e.targetTouches[0].pageX;
		},
		end(e) {
			const activeClass = this.getAttribute('data-swipe');
			const threshold = +this.getAttribute('data-swipe-threshold') || 30;

			if (this.swipeStartX > this.swipeEndX + threshold) {
				this.classList.add(activeClass);
			} else if (this.swipeStartX < this.swipeEndX - threshold) {
				this.classList.remove(activeClass);
			}
		}
	};

	$DOCUMENT.on('touchstart', '[data-swipe]', swipe.start);
	$DOCUMENT.on('touchmove', '[data-swipe]', swipe.move);
	$DOCUMENT.on('touchend', '[data-swipe]', swipe.end);

})();