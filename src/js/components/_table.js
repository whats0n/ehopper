import {$WIN} from '../_constants';

export default (function() {

	const x = { start: 0, end: 0 };

	$('[data-table-scrollable]').scroll(function(e) {
		//set start scroll
		const $target = $(this);
		x.start = $target.scrollLeft();

		//check if scroll on Y = return
		if (x.start === x.end) return;

		const fake = $target.data('table-scrollable');
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

	const checkTableOnScroll = () => {
		$('[data-table-scrollable]').each(function(e) {
			const $target = $(this);
			const scrollHeight = this.scrollHeight;
			const clientHeight = this.clientHeight;
			const offsetWidth = this.offsetWidth;
			const clientWidth = this.clientWidth;
			const diff = offsetWidth - clientWidth;
			const fake = $target.data('table-scrollable');
			const $fakeScrollableElement = $target
				.closest(`[data-table="${fake}"]`)
				.find(`[data-table-fake="${fake}"]`);
			const minWidth = +$target.find(`[data-table-main="${fake}"]`).css('min-width').replace('px', '');

			$fakeScrollableElement
				.css({
					'padding-right': `${diff}px`,
					'min-width': `${minWidth + diff}px`
				});
		});
	};

	$WIN.resize(checkTableOnScroll);
	checkTableOnScroll();
	

})();