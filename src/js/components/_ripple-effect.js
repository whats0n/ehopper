import {$DOCUMENT, isTouch} from '../_constants';

export default (function() {

	const eventName = isTouch() ? 'touchstart' : 'mousedown';

	const animation = (e, $item) => {
		const width = $item.outerWidth();
		const height = $item.outerHeight();
		const size = width >= height ? width : height;
		const offset = $item.offset();
		const pageX = e.type !== 'touchstart' ? e.pageX : e.touches[0].clientX;
		const pageY = e.type !== 'touchstart' ? e.pageY : e.touches[0].clientY;
		const x = pageX - offset.left;
		const y = pageY - offset.top;
		
		const circle = document.createElement('span');
		circle.classList.add('ripple-circle');
		circle.style.top = `${y - size/2}px`;
		circle.style.left = `${x - size/2}px`;
		circle.style.width = `${size}px`;
		circle.style.height = `${size}px`;
		circle.addEventListener('animationend', e => circle.remove(), false);
		circle.addEventListener('webkitAnimationEnd', e => circle.remove(), false);

		$item.append(circle);
	};

	$DOCUMENT.on(eventName, '[data-animation*="ripple"]', function(e) { 
		animation(e, $(this));
	});

})();