import {$DOCUMENT, OPEN} from '../_constants';

export default (function() {

	$DOCUMENT.on('click', '[data-nav-submenu-open]', function(e) {
		e.preventDefault();
		const target = $(this).attr('data-nav-submenu-open');
		const $container = $(`[data-nav-submenu*="${target}"]`);

		if ($container.length) $container.toggleClass(OPEN);
	});

})();