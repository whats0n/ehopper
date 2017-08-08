(function() {

	const isTouch = () => 'touchstart' in window;
	const eventName = isTouch() ? 'touchstart' : 'mousedown';

	const animation = (e, target) => {
		const width = target.offsetWidth;
		const height = target.offsetHeight;
		const size = width >= height ? width : height;
		const offset = target.getBoundingClientRect();
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

		target.appendChild(circle);
	};

	document.addEventListener(eventName, function(e) { 
		const target = e.target.closest('[data-animation*="ripple"]');
		if (target) animation(e, target);
	}, false);

})();