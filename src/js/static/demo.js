// This is collection of quick and dirty functions
// to bring to life some GUI components, while no
// JavaScript framework is defined in this project.

// TODO:
// 1. Should be refactored for use with Knockout and Durandal


function toggleClass(element, className, newState) {
	if (newState == undefined) {
		// determine current state, inverted
		newState = !element.classList.contains(className);
	}
	// console.log(element, className, newState);
	if (newState) {
		element.classList.add(className);
	} else {
		element.classList.remove(className);
		//element.className.replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), '');
	}
	return newState;
}

function newNode(tag, className, content) {
	var node = document.createElement(tag);
	node.className = className;
	node.innerText = content;
	return node;
}

function forEvery(parent, selector, func) {
	// console.log("For every "+selector);
	var items = parent.querySelectorAll(selector);
	for (var i = 0; i < items.length; i++) {
		func(items[i]);
	}
}

// Replaces HTML5 import with loaded HTML content
// used only temporarily, as no server-side templates used
// nor client-side engine available
function demoTemplate(inc) {
	// console.log(inc.import.body.innerHTML);
	inc.outerHTML = inc.import.body.innerHTML;
}


function demoEditItem(tab) {
	toggleClass(document.querySelector('.pos-edit'), 'hide');
	toggleClass(document.querySelector('main.pos-order'), 'disabled');
	toggleClass(document.querySelector('#demo_order_items'), 'order__items-interactive');
	// console.log(tab);
	if (tab != undefined) {
		console.log("Switch to tab:", tab);
	}
}
//	Sets X,Y point (relative to right-panel)
//	from which edit-panel animation expands.
//	Should be center of clicked object, or mouse poiner position
function demoSetOrigin(card, x, y) {
	var box = demoPosEditor;
	box.style.transformOrigin = x + " " + y;
	// console.log(card.style);
	// console.log(box.style.transformOrigin);
}

function demoManualRefund() {
	toggleClass(demoOrderPanel, 'refund-mode');
	
	//	Hide menu, leaving on this page
	toggleClass(document.querySelector(".menu"), 'menu-active', false);
	return false;
}


function demoDuplicateItem(item) {
	// var html = item.outerHTML;
	// console.log(html);
	// item.outerHTML = html + html;
	var cart = demo_order_items;
	forEvery(cart, '.order__item-active', function(el) {
		toggleClass(el, 'order__item-active', false);
	});
	var copy = item.cloneNode(true);
	toggleClass(copy, 'order__item-active');
	cart.appendChild(copy);
	cart.scrollTop = 9000;
}

function demoToggleModifier(card) {
	toggleClass(card, 'card-selected');
}


function demoEmptyOrder() {
	demo_order_items.innerHTML = "";
	toggleClass(demo_order_empty, 'hide', false);
	emitMessage('All items removed from your shopping cart');
}

function demoToggleAnimation() {
	toggleClass(demoAnimated, 'icon-check', toggleClass(body, 'animated'));
}


function demoDialogOpen(id) {
	var dialog = document.getElementById(id);
	if (!dialog) return false;
	var mask = document.querySelector('.dialog#'+ id +' + .dialog__mask');
	mask.onclick = function() {
		demoDialogClose(dialog);
	};
	forEvery(dialog, '.dialog__close', function(el) {
		el.onclick = mask.onclick;
	});
	// console.log(mask);
	toggleClass(dialog, 'dialog-open', true);
	return false;
}

function demoDialogClose(dialog) {
	// console.log("close dialog?");
	toggleClass(dialog, 'dialog-open', false);
}

var snackbarTimeout;

function demoSnackbar(style, action, handler) {
	var messages = [
		"Hello, World!",
		"This is sample notification message.",
		"On this demonstration page messages generated randomly, but in real-world application text should be defined according to event happened.",
		"Message can optionally contain only one action button!",
		"Click or touch this bar to dismiss."
		];
	var message = messages[Math.floor(Math.random()*messages.length)];
	emitMessage(message, style, action, handler);
}


function emitMessage(message, style, action, handler) {
	function hide(sb) {
		toggleClass(sb, "hide", true);
	}

	var sb = document.querySelector('.snackbar');
	hide(sb);

	var btn = sb.querySelector('.btn');
	toggleClass(btn, "hide", action==undefined);
	if (action) {
		btn.innerText = action;
		btn.onclick = handler;
	}
	console.log(btn.onclick);
	//	Apply message only after animation delay
	setTimeout(function() {
		sb.querySelector('.snackbar__message').innerText = message;
		sb.className = "snackbar" + (style ? " snackbar-"+style : '');
	}, 200);

	sb.onclick = function() {
		hide(sb);
	}
	if (snackbarTimeout) clearTimeout(snackbarTimeout);
	snackbarTimeout = setTimeout(function() {
		hide(sb);
	}, 3000);
}


function demoAddToCart(tabToShow) {
	var cart = demo_order_items;
	// hide "empty order"
	toggleClass(demo_order_empty, 'hide', true);
	// remove old selection
	forEvery(cart, '.order__item-active', function(el) {
		toggleClass(el, 'order__item-active', false);
		toggleClass(el, 'order__item-added', false);
	});
	// create new item in order list (from HTML template id="demoOrderItemTemplate")
	var item = document.createElement('div');
	item.className = demoOrderItemTemplate.className;
	toggleClass(item, 'order__item-active');
	item.innerHTML = demoOrderItemTemplate.innerHTML;
	item.onclick = demoEditItem;
	console.log(item);
	cart.appendChild(item);
	cart.scrollTop = 9000;
	// Activate edit mode if tab specified
	if (tabToShow != undefined) {
		demoEditItem(tabToShow);
	}
}



document.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOM ready. Run init...");
	// alert([].forEach);
	var menu = document.querySelector(".menu");
	//	Open main menu
	forEvery(document, ".btn.icon-menu", function(el) {
		el.onclick = function() {
			toggleClass(menu, 'menu-active', true);
		};
	});
	//	Close main menu
	forEvery(document, ".menu header, .menu__mask", function(el){
		el.onclick = function() {
			toggleClass(menu, 'menu-active', false);
		};
	});
	//	Dropdown open/close
	forEvery(document, ".dropdown", function(el) {
		el.onclick = function() {
			var menu = this.querySelector('.dropdown-menu');
			if (menu) {
				toggleClass(menu, 'dropdown-menu-open');
			}
		};
	});
	// Tabs
	forEvery(document, ".tabs__item", function(el) {
		el.onclick = function() {
			var prevTab = this.parentElement.querySelector(".tabs__item-active");
			if (prevTab)
				toggleClass(prevTab, "tabs__item-active", false);
			toggleClass(this, "tabs__item-active", true);
		}
	});

	//	Toggles
	forEvery(document, "input.toggle", function(el) {
		toggleClass(el, "toggle", false);
		// console.log("Decorate .toggle: ", el);
		var additionalClasses = el.classList.contains("toggle-danger") ? " toggle-danger" : '';
		additionalClasses += el.classList.contains("toggle-success") ? " toggle-success" : '';
		additionalClasses += el.checked ? "" : " toggle-off";
		el.outerHTML = '<div class="toggle' + additionalClasses + '">'
			+ '<span class="toggle__thumb"></span>'
			+ el.outerHTML
			+ '</div>';
	});
	forEvery(document, ".toggle input", function(el) {
		el.onclick = function() {
			// console.log(this.parentElement);
			toggleClass(this.parentElement, "toggle-off", !this.checked);
		}
	});

	// Apply FastClick for specified controls only
	//	+ Removes 300ms delay
	//	+ Allows :active on iOS
	forEvery(document, ".toggle, .btn, .dropdown, .productsitem, .categories__item, .order__item", function(el) {
		el.ontouchstart = function() { };
	});

	//	Bind .tabbed component
	forEvery(document, ".tabs .tabs__item", function(el) {
		var group = el.parentElement.parentElement;	// TODO! remove hardcode
		// console.log(el);
		el.onclick = function() {
			function activateTab(tabId, state) {
				var panel = group.querySelector('.tabbed__panel[data-tab="' + tabId +'"]');
				// console.log(panel);
				if (panel)
					toggleClass(panel, 'tabbed__panel-active', state);
			}

			//	TODO: refactor - all copied from Tab control
			var prevTab = this.parentElement.querySelector(".tabs__item-active");
			if (prevTab) {
				toggleClass(prevTab, "tabs__item-active", false);
				activateTab(prevTab.dataset.tab, false);			//except this
			}
			toggleClass(this, "tabs__item-active", true);
			//	Activate corresponding tabbed panel
			activateTab(this.dataset.tab, true);
		}
	});

	//	Bind JS-based Ripple effect
	// forEvery(document, ".btn-ripple", function(el) {
	// 	el.onmousedown = function(e) {
	// 		// if (!e.target.classList.contains('btn-ripple'))
	// 		// 	return false;
	// 		// console.log(e);
	// 		var effect = document.createElement('div');
	// 		var parentRect = e.target.getBoundingClientRect();
	// 		effect.className = 'btn-ripple__effect';
	// 		effect.style.left = (e.pageX - parentRect.left) + 'px';
	// 		effect.style.top = (e.pageY - parentRect.top) + 'px';
	// 		// effect.style.left = (e.pageX - e.currentTarget.offsetLeft) + 'px';
	// 		// effect.style.top = (e.pageY - e.currentTarget.offsetTop) + 'px';
	// 		// effect.style.left = (e.pageX) + 'px';
	// 		// effect.style.top = (e.pageY) + 'px';

	// 		// Ripple size
	// 		var size = Math.max(parentRect.width, parentRect.height);
	// 		effect.style.width = size+'px';
	// 		effect.style.height = size+'px';
	// 		effect.style.marginTop = (size/-2)+'px';
	// 		effect.style.marginLeft = (size/-2)+'px';
	// 		effect.style.borderRadius = size+'px';

	// 		this.appendChild(effect);
	// 		window.setTimeout(function() {
	// 			// Toggle start animation
	// 			effect.className += ' effect-on';
	// 		}, 10);
	// 		window.setTimeout(function() {
	// 			// Remove element on complete
	// 			effect.parentElement.removeChild(effect);
	// 		}, 500);
	// 	}
	// 	// el.ontouchstart = el.onmousedown;
	// });

	//	Test original FastClick
	// console.log(FastClick.attach(document.body));

});


