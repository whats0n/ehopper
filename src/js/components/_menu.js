import {$DOCUMENT, OPEN} from '../_constants'

export default (function() {

	const addClass = 'addClass';
	const removeClass = 'removeClass';
	
	const toggleMenu = (actionType) => {
		$('[data-menu-container]')
			.add('[data-menu-overlay]')
			[actionType](OPEN);
	};

	$DOCUMENT.on('click', '[data-menu-open]', function(e) {
		e.preventDefault();
		toggleMenu(addClass);
	});

	$DOCUMENT.on('click', '[data-menu-close]', function(e) {
		e.preventDefault();
		toggleMenu(removeClass);
	});

	$DOCUMENT.on('click', '[data-menu-overlay]', function(e) {
		e.preventDefault();
		toggleMenu(removeClass);
	});

})();