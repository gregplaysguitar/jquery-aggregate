/*

Find the aggregate of a certain property across a jquery element
collection. Eg to find the maximum height of a group of elements:

$('.elements').aggregate('height', 'max');


property: any callable jquery element property, eg. 'height',
      'outerWidth', 'scrollTop' etc, or callable taking the element
      as its sole argument. 
type: 'max' or 'min'


*/

$.fn.aggregate = (function(property, type){
    if (typeof property === 'function') {
        var values = this.map(function () {
            return property($(this));
        });
    }
    else {
        var values = this.map(function () {
            return $(this)[property]();
        });
    }
    return Math[type].apply(null, values.get());
});


/*

Normalize a certain property across a jquery element collection, with
optional grouping into rows.
Eg to make a group of elements all the same height as the highest, in
rows of 4 elements each:

$('.elements').normalize({
    property: 'height',
    type: 'max',
    per_row: 4,
    callback: function(el, val) {
        el.css('paddingTop', val - el.height() + 'px');
    }
});


property: any callable jquery element property (default 'height') or 
      callable taking the element as its sole argument. 
type: 'max' or 'min' (default 'max')
per_row: number of elements in a row (default is to normalize all
         elements as one)
callback: used to apply the aggregate to each element. (default 
          is to use the same method specified in the property option. 

*/

$.fn.normalize = (function(options){
    var els, agg, 
        options = $.extend({
            property: 'height',
            type: 'max',
            per_row: this.length,
            callback: function(el, val) {
                el[options.property](val);
            }
        }, options);

    for (var i = 0; i < this.length; i += options.per_row) {
        els = this.slice(i, i + options.per_row);
        agg = els.aggregate(options.property, options.type);
        els.each(function() {
            options.callback($(this), agg);
        });
    }
});


