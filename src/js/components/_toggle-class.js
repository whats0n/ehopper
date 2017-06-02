import {$DOCUMENT} from '../_constants';

export default (function() {

	$DOCUMENT.on('click', '[data-toggle-class-target]', function(e) {
		e.preventDefault();
		const target = $(this).attr('data-toggle-class-target');
		const add = $(this).attr('data-toggle-class-add');
		const remove = $(this).attr('data-toggle-class-remove');
		const toggle = $(this).attr('data-toggle-class-toggle');
		const $container = $(`[data-toggle-class-container*="${target}"]`);

		if (!!add && $container.length) $container.addClass(add);
		if (!!remove && $container.length) $container.removeClass(remove);
		if (!!toggle && $container.length) $container.toggleClass(toggle);
		if (!!window.menu) window.menu.close();
	});

})();