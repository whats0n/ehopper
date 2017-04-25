import slick from 'slick-carousel';
import {$DOCUMENT, isTouch} from '../_constants';

export default (function() {
	
	const DEFAULT = 'default';
	const PREV = 'prev';
	const NEXT = 'next';
	const BEFORE = 'before';
	const AFTER = 'next';

	const getArrow = (direction, icon) => {
		return `<button data-slider-arrow="${direction}"><i class="icon icon-nav-${icon}"></i></button>`;
	};

	//methods
	const init = () => {
		$('[data-slider]').each(function() {
			const $this = $(this);
			const type = $this.data('slider');
			const $parent = $this.closest('[data-slider-wrapper]');
			const $pagination = $parent.find('[data-slider-pagination]');

			switch (type) {
				case DEFAULT: 
					$this.slick({
						dots: true,
						arrows: !isTouch(),
						prevArrow: getArrow(PREV, BEFORE),
						nextArrow: getArrow(NEXT, AFTER),
						appendArrows: $pagination,
						appendDots: $pagination,
						cssEase: 'ease-in-out',
						speed: 700
					});
					break;
			}
		});
	};

	const destroy = () => {
		$('[data-slider]').slick('unslick');
	};

	const update = () => {
		destroy();
		init();
	};

	$DOCUMENT.ready(function() {
		init();
	});

})();