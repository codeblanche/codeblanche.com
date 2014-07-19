/*
 * Ensure all columns nested in a row are the same height.
 *
 * Requires jQuery.
 */
function _columns_height_fix() {
  $('.row').not('.no-fix').each(function (i, el) {
    var $this = $(el)
      , $cols = $this.find('> [class^="col"]')
      , height;

    $cols.css('height', 'auto');
    height = $this.height();
    $cols.height(height);
  });
}

(function () {
  var resize;

  $(_columns_height_fix);

  $(window).on('resize', function () {
    if (resize !== undefined && resize !== null) {
      clearInterval(resize);
    }

    resize = setTimeout(_columns_height_fix, 100);
  });
})();
