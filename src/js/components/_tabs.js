import {$DOCUMENT, $BODY, OPEN, ACTIVE, smartClick} from '../_constants';

export default (function() {

	smartClick('[data-tab-open]', function(e) {
		e.preventDefault();
		const $this = $(this);
		if ($this.hasClass(ACTIVE)) return;

		const target = $this.data('tab-open');
	    const collection = $this.data('tab-collection');
	    
		const $parent = $this.closest('[data-tab]');
	    let $sections = $parent.find('[data-tab-container]');
		let $buttons = $parent.find('[data-tab-open]');
	    
	    if (collection && collection.length) {
	    	$sections = $sections.filter(`[data-tab-collection="${collection}"]`);
	    	$buttons = $buttons.filter(`[data-tab-collection="${collection}"]`);
	    }
	    
		const $activeSection = $sections.filter(`[data-tab-container="${target}"]`);

		$buttons.removeClass(ACTIVE);
		$this.addClass(ACTIVE);

		$sections.removeClass(OPEN);
		$activeSection.addClass(OPEN);
	});

})();