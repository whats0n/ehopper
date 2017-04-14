import {$DOCUMENT} from '../_constants';

export default (function() {

	$DOCUMENT.on('click', '[data-order-delete]', function(e) {
		e.preventDefault();
		$('[data-order-added]').remove();
		$('[data-order-empty]').attr('hidden', false);
		$('[data-order-visible]').attr('hidden', true);
	});

	$DOCUMENT.on('click', '[data-order-item]', function(e) {
		e.preventDefault();
		$('[data-order-empty]').attr('hidden', true);
		$('[data-order-visible]').attr('hidden', false);
	});

	const checkComponent = (props) => {
		if (!props.argument) return '';
		return props.template;
	};

	const addItem = function (props) {
		const template = `
			<li class="order-item" data-state="default" data-animation="ripple" data-fullinfo-open="fullinfo" data-order-added="order">
				<div class="order-item__info">
					<div class="order-item__title">${props.title}</div>
				</div>
				<div class="order-item__row">
					<div class="order-item__col">
						<div class="order-item__quantity" data-fullinfo-target="quantity">${props.quantity}</div>
						<div class="order-item__price" data-fullinfo-target="price">${props.price}</div>
					</div>
					<div class="order-item__col">
						<div class="order-item__total" data-fullinfo-target="price">${props.total}</div>
						${checkComponent({
							argument: props.discount,
							template: `<div class="order-item__discount" data-fullinfo-target="discount">${props.discount}</div>`
						})}
					</div>
				</div>
				${checkComponent({
					argument: props.meta,
					template: `<div class="order-item__meta" data-fullinfo-target="modifiers">${props.meta}</div>`
				})}
			</li>
		`;

		$('[data-order-list]').append(template);
		const scrollTo = $('[data-order-list]').outerHeight();
		$('[data-order-scroll]').scrollTop(scrollTo);
	};

	window.orderlist = {
		addItem: addItem
	};

})();