This plugin is used to normalize or aggregate a certain property across a jquery element collection, with
optional grouping into rows when normalizing. Normalization is useful for arranging floated elements of differing heights into even rows.

### Examples

Find the maximum height out of a group of elements:

    $('.elements').aggregate('height', 'max');

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

[Download jquery.aggregate.js](https://gist.github.com/gists/1412995/download), or see <http://gist.github.com/1412995> for details.