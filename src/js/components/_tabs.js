import {$DOCUMENT, $BODY, OPEN, ACTIVE} from '../_constants';

export default (function() {

	$DOCUMENT.on('click', '[data-tab-open]', function(e) {
		e.preventDefault();
		const $this = $(this);
		if ($this.hasClass(ACTIVE)) return;

		const target = $this.data('tab-open');
		const $parent = $this.closest('[data-tab]');
		const $buttons = $parent.find('[data-tab-open]');
		const $sections = $parent.find(`[data-tab-container]`);
		const $activeSection = $sections.filter(`[data-tab-container="${target}"]`);

		$buttons.removeClass(ACTIVE);
		$this.addClass(ACTIVE);

		$sections.removeClass(OPEN);
		$activeSection.addClass(OPEN);
	});

})();