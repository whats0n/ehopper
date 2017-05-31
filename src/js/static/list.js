
function scrolledList(container, dataPath, perPage, renderer) {
	// var _selector = name;
	var _node = container;
	var _list = container.children('.catalog__list');
	var _perPage = perPage;
	var _swipe;
	var _currentPage;// = container.find('.catalog__page');
	var _pager = new pager(_node.children('.pager'));

	// Initialize
	_load(dataPath);

	function _enableSwipe() {
		// attach and initialize Swipe component
		_swipe = new Swipe(_node.get(0), {
			draggable: true,
			continuous: false,
			stopPropagation: true,
			disableScroll: true,
			callback: function(){
				_pager.activate( _swipe.getPos() );
			}
		});
	}

	function _empty() {
		_list.empty();
		_currentPage = undefined;
	}

	function _addPage(handler) {
		var p = _pager.totalPages();
		_pager.add(function() {
				_swipe.slide(p);
			});
		var el = $(document.createElement('ul'))
			.addClass('catalog__page');
		_list.append(el);
		_currentPage = el;
	}

	function _addItem(item) {
		if (_currentPage==undefined || _currentPage.children().length >= _perPage) {
			_addPage();
		}
		_currentPage.append(renderer(item));
	}

	function _load(path) {
		$.ajax({url: path, dataType: 'json'})
		.done(function(data) {// Success: populate list with data received
			_empty();
			$.each(data, function(id, item) {
				_addItem(item);
			})
			_enableSwipe();
		})
		.fail(function(data) {
			console.log('failed loading: ' + path);
		})
	}
}
