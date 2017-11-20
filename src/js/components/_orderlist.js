import {$DOCUMENT} from '../_constants';

export default (function() {

  $DOCUMENT.on('click', '[data-order-delete]', function(e) {
    e.preventDefault();
    $('[data-order-added]').remove();
    $('[data-order-empty]').show();
    $('[data-order-visible]').hide();
  });

  $DOCUMENT.on('click', '[data-order-delete-item]', function(e) {
    e.preventDefault();
    $(this).closest('[data-order-added]').remove();
  });

  $DOCUMENT.on('click', '[data-order-item]', function(e) {
    e.preventDefault();
    $('[data-order-empty]').hide();
    $('[data-order-visible]').show();
  });

  const checkComponent = (props) => {
    if (!props.argument) return '';
    return props.template;
  };

  // const addItem = function (props) {
  // 	props = props || {};
  // 	const template = `
  // 		<li class="order-item" 
  // 			data-order-added="item"
  // 			data-state="{{item.state}}" 
  // 			data-animation="ripple" 
  // 			data-swipe="is-open"
  // 			data-swipe-threshold="50">
  // 			<div class="order-item__container">
  // 				<div class="order-item__content"
  // 					data-fullinfo-open="fullinfo"
  // 					data-toggle-class-target="sidebar-header"
  // 					data-toggle-class-add="is-disabled">
  // 					<div class="order-item__info">
  // 						<div class="order-item__title">${props.title}</div>
  // 					</div>
  // 					<div class="order-item__row">
  // 						<div class="order-item__col">
  // 							<div class="order-item__quantity" data-fullinfo-target="quantity">${props.quantity}</div>
  // 							<div class="order-item__price" data-fullinfo-target="price">${props.price}</div>
  // 						</div>
  // 						<div class="order-item__col">
  // 							<div class="order-item__total" data-fullinfo-target="price">${props.total}</div>
  // 							${checkComponent({
  // 								argument: props.discount,
  // 								template: `<div class="order-item__discount" data-fullinfo-target="discount">${props.discount}</div>`
  // 							})}
  // 						</div>
  // 					</div>
  // 					${checkComponent({
  // 						argument: props.meta,
  // 						template: `<div class="order-item__meta" data-fullinfo-target="modifiers">${props.meta}</div>`
  // 					})}
  // 				</div>
  // 				<button class="order-item__close" 
  // 					data-fullinfo-close="fullinfo" 
  // 					data-toggle-class-target="sidebar-header" 
  // 					data-toggle-class-remove="is-disabled"
  // 					data-order-delete-item="delete">
  // 					<i class="icon icon-close"></i>
  // 				</button>
  // 			</div>
  // 		</li>
  // 	`;

  // 	$('[data-order-list]').append(template);
  // 	const scrollTo = $('[data-order-list]').outerHeight();
  // 	$('[data-order-scroll]').scrollTop(scrollTo);
  // };

  // window.orderlist = {
  // 	addItem: addItem
  // };

})();
