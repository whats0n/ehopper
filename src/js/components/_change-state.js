import {$DOCUMENT} from '../_constants';

export default (function() {

	$DOCUMENT.on('click', '[data-state-target]', function(e) {
		e.preventDefault();
		const state = $(this).data('state-target');
		const $container = $(`[data-state-container="${state}"]`);

		if ($container.length) $container.addClass(state);
		if (!!window.menu) window.menu.close();
	});

	$DOCUMENT.on('click', '[data-state-cancel]', function(e) {
		e.preventDefault();
		const state = $(this).data('state-cancel');
		const $container = $(`[data-state-container="${state}"]`);

		if ($container.length) $container.removeClass(state);
	});

})();