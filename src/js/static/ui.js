
$(function() {

	// Init dropdowns
	$('.dropdown__handle').click(function(e) {
		e.preventDefault();
		console.log('click');
		$(this).parent('.dropdown').toggleClass('open');
	});

	window.categories = new scrolledList(
		$("#categories"),			// DOM container
		"data/categories.json",		// load data from URL
		8, 							// items per page
		function(cat) {				// presentation renderer
			return '<li class="catalog__item'+ (cat.default ? ' active' : '') +'" id="' + cat.id + '">'
				+'<a class="catalog__card category-card" href="#">'
					+'<div class="category-card__title">' + cat.id + '</div>'
					+'<div class="category-card__info">' + cat.info + '</div>'
				+'</a>'
			+'</li>';
			}
		);


	window.products = new scrolledList(
		$("#products"),
		"data/products.json",
		12,
		function(item){
			return '<li class="catalog__item">'
				+'<a class="catalog__card product-card" href="#">'
					+(item.pic ? ('<img class="product-card__pic" src="'+ item.pic +'">') : '')
					+'<span class="product-card__price">$'+ item.price.toFixed(2) +'</span>'
					+'<span class="product-card__title">'+ item.title +'</span>'
				+'</a>'
			+'</li>';
			}
		);

});