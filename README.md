This plugin is used to normalize or aggregate a certain property across a jquery element collection, with
optional grouping into rows when normalizing. Normalization is useful for arranging floated elements of differing heights into even rows.

### Examples

Aggregate some properties from a group of elements:

    var max_height = $('.elements').aggregate('height', 'max');
    var total_width = $('.elements').aggregate(['outerWidth', true], 'sum');

Make all elements in a collection the same height as the highest:

    $('.elements').normalize();

Make a group of elements all the same height as the highest, in rows of 4 elements each, with bottom-aligned content:

    $('.elements').normalize({
        property: 'height',
        type: 'max',
        per_row: 4,
        callback: function(el, val) {
            el.css('paddingTop', val - el.height() + 'px');
        }
    });


Make a group of elements all the same height as the highest, arranged in rows of a specified pixel width:

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


