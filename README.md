This plugin is used to normalize or aggregate a certain property across a jquery 
element collection, with optional grouping into rows when normalizing. 

## `$(...).aggregate(property, type)`

Finds a property aggregate – for example the maximum height – from a 
jquery collection of elements. Takes two required arguments:

* property: any callable jquery element property, eg. 'height',
  'outerWidth', 'scrollTop' etc, or a callable taking the element
  as its sole argument, or an array where the first item is the callable
  and subsequent items are the arguments to be passed, i.e. 
  `['outerHeight', true]`. 
* type: 'max', 'min', 'sum', or a callable taking a variable number of 
  arguments to be aggregated

For example:

    var max_height = $('.elements').aggregate('height', 'max');
    var min_width = $('.elements').aggregate('width', 'min');
    // these give identical results
    var total_width = $('.elements').aggregate(['outerWidth', true], 'sum');
    var total_width = $('.elements').aggregate(function(el) {
        return el.outerWidth(true);
    }, 'sum');

## `$(...).normalize(options)`

Normalizes a collection of elements, for example making them all the same height. 
Takes one optional `options` argument.

* property: any callable jquery element property (default 'height') or 
  callable taking the element as its sole argument. 
* type: 'max', 'min', or a callable taking a variable number of 
  arguments to be aggregated (default 'max')
* per_row: number of elements in a row as an int, or a width in pixels,
  e.g. '300px'. (default is to normalize all elements as one)
* callback: used to apply the aggregate to each element. (default 
  is to use the same method specified in the property option. 

For example, make all elements in a collection the same height as the highest:

    $('.elements').normalize();

Make a group of elements all the same height as the highest, in rows of 4 
elements each, with bottom-aligned content:

    $('.elements').normalize({
        property: 'height',
        type: 'max',
        per_row: 4,
        callback: function(el, val) {
            el.css('paddingTop', val - el.height() + 'px');
        }
    });

Make a group of elements all the same height as the highest, arranged in rows
of a specified pixel width:

    var width = $('.wrapper').width();
    $('.wrapper > .element').normalize({
        property: 'height',
        type: 'max',
        per_row: width + 'px'
    });


### Get the code

[Download jquery.aggregate.js](https://github.com/gregplaysguitar/jquery-aggregate/archive/master.zip), or see <https://github.com/gregplaysguitar/jquery-aggregate> for details.


### TODO

- Bind `this` to the property callback


