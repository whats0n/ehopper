import {$DOCUMENT, OPEN, ACTIVE} from '../_constants';

export default (function() {

	$DOCUMENT.on('click', '[data-fullinfo-open]', function(e) {

		const $this = $(this);
		const $target = $(e.target);
		const $container = $('[data-fullinfo-container]');
		const $items = $('[data-fullinfo-open]');
		const $tabTarget = $target.closest('[data-fullinfo-target]');
		const currentTab = $tabTarget.length ? $tabTarget.data('fullinfo-target') : null;

		const $tabOpen = $container.find(`[data-tab-open]`);
		const $tabContainer = $container.find(`[data-tab-container]`);

		$tabOpen.removeClass(ACTIVE);
		$tabContainer.removeClass(OPEN);

		if (currentTab) {
			$tabOpen.filter(`[data-tab-open="${currentTab}"]`).addClass(ACTIVE);
			$tabContainer.filter(`[data-tab-container="${currentTab}"]`).addClass(OPEN);
		} else {
			$tabOpen.eq(0).addClass(ACTIVE);
			$tabContainer.eq(0).addClass(OPEN);
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