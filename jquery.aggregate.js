/*

jquery.aggregate.js by Greg Brown 2011. See 
http://gregbrown.co.nz/code/jquery-aggregate/ for details.

License information: http://gregbrown.co.nz/code/license/

*/

/*

Find the aggregate of a certain property across a jquery element
collection. Eg to find the maximum height of a group of elements:

$('.elements').aggregate('height', 'max');

to find the first non-zero height from a group of elements:

$('.elements').aggregate('height', function() {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
            return arguments[i];
        }
    }
});


property: any callable jquery element property, eg. 'height',
      'outerWidth', 'scrollTop' etc, or a callable taking the element
      as its sole argument, or an array where the first item is the callable
      and subsequent items are the arguments to be passed, i.e. 
      `['outerHeight', true]`. 
type: 'max', 'min', 'sum', or a callable taking a variable number of arguments
      to be aggregated


*/

$.fn.aggregate = (function(property, type){
    if (typeof property === 'function') {
        var values = this.map(function () {
            return property($(this));
        });
    }
    else {
        if (typeof property === 'string') {
            property = [property];
        }
        var values = this.map(function () {
            return $(this)[property[0]].apply($(this), property.slice(1));
        });
    }
    if (type === 'sum') {
        var sum = 0;
        for (var i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum;
    }
    else if (typeof type === 'function') {
        return type.apply(null, values.get());    
    }
    else {
        return Math[type].apply(null, values.get());
    }
});


/*

Normalize a certain property across a jquery element collection, with
optional grouping into rows.
Eg to make a group of elements all the same height as the highest, in
rows of 4 elements each:

$('.elements').normalize({
    property: 'height',
    type: 'max',
    per_row: $('.elements').parent().width() + 'px',
    callback: function(el, val) {
        el.css('paddingTop', val - el.height() + 'px');
    }
});


property: any callable jquery element property (default 'height') or 
      callable taking the element as its sole argument. 
type: 'max', 'min', or a callable taking a variable number of 
      arguments to be aggregated (default 'max')
per_row: number of elements in a row as an int, or a width in pixels,
         e.g. '300px'. (default is to normalize all elements as one)
callback: used to apply the aggregate to each element. (default 
          is to use the same method specified in the property option. 

*/

$.fn.normalize = (function(options){
    if (this.length) {
        var els, agg,
            // assume all have the same box-sizing & padding
            border_box = (this.css('box-sizing') === 'border-box'),
            options = $.extend({
                property: 'height',
                type: 'max',
                per_row: this.length,
                callback: function(el, val) {
                    if (options.property === 'height') {
                        var prop = 'minHeight',
                            padding = parseInt(el.css('paddingTop')) + 
                                      parseInt(el.css('paddingBottom'));
                    }
                    else {
                        var prop = options.property;
                        
                        if (prop === 'width') {
                            var padding = parseInt(el.css('paddingLeft')) + 
                                          parseInt(el.css('paddingRight'));
                        }
                    }
                    el.css(prop, val + (border_box ? padding : 0) + 'px');
                }
            }, options);
        
        
        function row_item_count(items) {
            /* Get the number of items in the row - either the static per_row 
               value, or the number of items that can be fitted within the 
               per_row width. */ 
            if (typeof options.per_row === 'string' && 
                options.per_row.slice(-2) === 'px') {
                var j = 0,
                    width = items.eq(0).outerWidth(true);
                
                while (width <= parseInt(options.per_row) && j < items.length) {
                    if (j + 1 < items.length) {
                        width += items.eq(j + 1).outerWidth(true);
                    }
                    j++;
                }
                
                // at least one item per row, regardless of its length
                return Math.max(j, 1);
            }
            else {
                return options.per_row;
            }
        };
        
        var i = 0,
            items_per_row;
        while (i < this.length) {
            items_per_row = row_item_count(this.slice(i));
            
            els = this.slice(i, i + items_per_row);
            agg = els.aggregate(options.property, options.type);
            els.each(function() {
                options.callback($(this), agg);
            });
            i += items_per_row;
        }
    }
    return this;
});


