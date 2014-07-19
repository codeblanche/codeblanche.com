
// on ready
$(function () {

  // init top carousel a
  $(".top-carousel-a").owlCarousel({
    singleItem : true,
    autoPlay : true,
    stopOnHover : true,
    pagination : true,
    lazyLoad : true,
    lazyFollow : true,
    autoHeight : true
  });

  // init top carousel b
  $(".top-carousel-b").owlCarousel({
    singleItem : false,
    itemsCustom : [[0, 2], [768, 3], [960, 5]],
    autoPlay : true,
    stopOnHover : true,
    pagination : false,
    lazyLoad : true,
    lazyFollow : true,
    autoHeight : true,
    navigation : true,
    navigationText : ['<span class="carousel-btn-prev">&nbsp;</span>','<span class="carousel-btn-next">&nbsp;</span>']
  });

  // init product carousels
  $(".carousel").owlCarousel({
    singleItem : true,
    autoPlay : true,
    stopOnHover : true,
    pagination : true,
    lazyLoad : true,
    lazyFollow : true,
    autoHeight : true,
    navigation : true,
    navigationText : ['<span class="carousel-btn-prev">&nbsp;</span>','<span class="carousel-btn-next">&nbsp;</span>']
  });

  // init subnav
  $('.subnav-trigger').on('click', function (event) {
    var $this = $(this)
      , $subnav;

    if (!$this.data('subnav')) {
      return;
    }

    event.preventDefault();
    $subnav = $($this.data('subnav'));

    if ($subnav.is(':visible')) {
      $subnav.fadeOut('fast');
    }
    else {
      $subnav.fadeIn('fast');
    }
  });

  $('.banner-pager-item').on('click', function (event) {
    event.preventDefault();

    var $this = $(this)
      , target = $this.data('target')
      , imgSrc = $this.data('src');

    if (target == '' || imgSrc == '') {
      return;
    }

    $(target).prop('src', imgSrc);
  });


});
