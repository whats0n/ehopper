import {$DOCUMENT} from '../_constants';

export default (function() {

	const x = { start: 0, end: 0 };

	$('[data-table-scrollable]').scroll(function(e) {
		//set start scroll
		const $target = $(this);
		x.start = $target.scrollLeft();

		//check if scroll on Y = return
		if (x.start === x.end) return;

		const fake = $target.data('table-scrollable');
		const target = $target.get(0);
		//move fixed elements
		$target
			.closest(`[data-table="${fake}"]`)
			.find(`[data-table-fake="${fake}"]`)
			.css({
				'transform': `translate3d(${-x.start}px,0,0)`
			});
		
		//set end scroll
		x.end = $target.scrollLeft();
	});

})();