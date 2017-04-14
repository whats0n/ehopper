import {$DOCUMENT, OPEN} from '../_constants';

export default (function() {

	$DOCUMENT.on('click', '[data-fullinfo-open]', function(e) {

		const $this = $(this);
		const $target = $(e.target);
		const $container = $('[data-fullinfo-container]');
		const $items = $('[data-fullinfo-open]');
		const $tabTarget = $target.closest('[data-fullinfo-target]');
		const currentTab = $tabTarget.length ? $tabTarget.data('fullinfo-target') : null;


		if (currentTab) {
			$(`[data-tab-open="${currentTab}"]`).trigger('click');
		} else {
			$(`[data-tab-open`).eq(0).trigger('click');
		}
		$items.attr('data-state', 'default');
		$this.attr('data-state', 'active');

		if ($container.hasClass(OPEN)) return;

		$container.addClass(OPEN);

	});

	$DOCUMENT.on('click', '[data-fullinfo-close]', function(e) {
		e.preventDefault();
		const $container = $('[data-fullinfo-container]');
		const $items = $('[data-fullinfo-open]');

		if ($container.hasClass(OPEN)) {
			$container.removeClass(OPEN);
			$items.attr('data-state', 'default');
		}

	});

})();