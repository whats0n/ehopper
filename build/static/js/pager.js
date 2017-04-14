
function pager(container) {
	var _node = container;
	var _pages = 0;
	var _current;

	// Initialize
	_node.empty();

	function add(handler) {
		// console.log('add page: '+_pages);
		var el = $(document.createElement('a'))
			.addClass('pager__item')
			.attr('href', '#')
			.attr('title', 'Navigate to page '+(_pages+1))
			.click(handler);
		_node.append(el);
		if (!_current) activate(_pages);
		_pages++;
	};

	function totalPages() {
		return _pages;
	};

	function activate(index) {
		// console.log('activage page: '+index);
		if (_current)
			_current.removeClass('pager__item_active');
		_current = _node.find(':eq('+ index +')');
		_current.addClass('pager__item_active');
	};

	return {
		add: add,
		activate: activate,
		totalPages: totalPages,
	}
}
