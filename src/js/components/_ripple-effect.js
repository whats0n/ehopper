import {$DOCUMENT, isTouch} from '../_constants';

export default (function() {

	const eventName = isTouch() ? 'touchstart' : 'mousedown';
	const properties = [
		'animationDuration',
		'webkitAnimationDuration',
		'msAnimationDuration',
		'mozAnimationDuration',
		'oAnimationDuration'
	];
	const getDuration = (el) => {
		let style = window.getComputedStyle(el),
		    duration = style.webkitTransitionDuration; 

		for (let i = 0; i <= properties.length; i++) {
			let property = style[properties[i]];

			if (!property) continue;

			duration = property;
			break;
		}

		// fix miliseconds vs seconds
		duration = (duration.indexOf("ms")>-1) ? parseFloat(duration) : parseFloat(duration)*1000;


		return duration;
	};

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


		$item.append(circle);

		const duration = getDuration(circle);

		const deleteCircle = setTimeout(() => circle.remove(), duration + 50);
		const animationEnd = e => {
			circle.remove();
			clearTimeout(deleteCircle);
		};

		circle.addEventListener('animationend', animationEnd, false);
		circle.addEventListener('webkitAnimationEnd', animationEnd, false);
	};

	$DOCUMENT.on(eventName, '[data-animation*="ripple"]', function(e) { 
		animation(e, $(this));
	});

})();