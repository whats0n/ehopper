import {$DOCUMENT, $BODY, OPEN, ACTIVE} from '../_constants';

export default (function() {
  const addClass = 'addClass';
  const removeClass = 'removeClass';
  const UP = 'is-dropdown-upper';

  const getDropdownComponents = (name, parentName) => {
    return {
      menu: $(`[data-dropdown-menu="${name}"]`),
      overlay: $(`[data-dropdown-overlay="${name}"]`),
      parent: $(`[data-dropdown-parent="${parentName}"]`)
    };
  };

  const toggleDropdown = (components, actionType) => {
    components
      .menu
      .add(components.overlay)
      [actionType](OPEN);
    components.parent && components.parent[actionType](UP);
    console.log(components.parent);
  };

  $DOCUMENT.on('click', '[data-dropdown-open]', function(e) { 
    e.preventDefault();
    const $this = $(this);
    const target = $this.data('dropdown-open');
    const parentName = $this.data('dropdown-parent-name');
    const $components = getDropdownComponents(target, parentName); 
    if ($components.menu.hasClass(OPEN)) {
      toggleDropdown($components, removeClass);
    } else {
      toggleDropdown($components, addClass);
    }
  });

  $DOCUMENT.on('click', function(e) { 
    const $target = $(e.target);
    if ($target.closest('[data-dropdown-open]').length) return;
    if ($target.closest('[data-dropdown-menu]').length) return;
    if ($target.closest('.ui-datepicker-header').length) return;
    const $overlay = $('[data-dropdown-overlay]');
    const $menu = $('[data-dropdown-menu]');
    const $parent = $('[data-dropdown-parent]');
    $overlay
      .add($menu)
      .removeClass(OPEN);
    $parent.removeClass(UP);
  });

  $DOCUMENT.on('click', '[data-dropdown-item]', function(e) {
    e.preventDefault();
    const $this = $(this); 
    const target = $this.data('dropdown-item');
    const value = $this.data('value');

    const $components = getDropdownComponents(target);
    const $dropdownValue = $(`[data-dropdown-value="${target}"]`);
    const $items = $(`[data-dropdown-item="${target}"]`);

    //set value
    $dropdownValue.text(value);
		
    //change active item
    $items.removeClass(ACTIVE);
    $this.addClass(ACTIVE);

    toggleDropdown($components, removeClass);
  });
})();
