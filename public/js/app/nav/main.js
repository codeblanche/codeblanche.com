define([
    'jquery',
    'app/state',
    'app/nav/pointer',
    'app/content/main',
], function ($, state, pointer, content) {

    var $navItems;
    var $current;

    var Nav = function () {

        var self = this;

        function setContent () {
            content.show($current.data('name'));

            $navItems.removeClass('active');
            $current.addClass('active');
        }

        function handleMouseOver (event) {
        }

        function handleMouseOut (event) {
        }

        function handleClick (event) {
            event.preventDefault();

            var $this = $(this);
            var popstate = {
                url     : $this.attr('href'),
                name    : $this.data('name'),
                pointer : $this.offset().top + 26
            }

            pointer.moveTo(popstate.pointer);

            $navItems.removeClass('active');

            if (typeof history.pushState === 'function') {
                history.pushState(popstate, $this.text(), popstate.url);
            }

            $current = $this;

            $current.addClass('active');

            setContent();
        }

        function handlePopState (event) {
            var popstate = event.originalEvent.state;

            if (popstate === undefined || popstate === null) {
                return;
            }

            pointer.moveTo(popstate.pointer);

            $current = $navItems.filter('.' + popstate.name);

            setContent();
        }

        this.init = function () {
            if (!state.domready) {
                throw new Error("Dom is not ready for this!");
            }

            content.init();

            $navItems   = $('#nav a');

            $navItems.each(function (index) {
                var $this = $(this);
                if ($this.attr('href').indexOf(state.url.getPath()) !== -1) {
                    $current = $this;

                    return false;
                }
            });

            setContent();

            $navItems
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut)
                .on('click', handleClick);

            pointer.init($current.offset().top + 26);

            $(window).on('popstate', handlePopState);
        };

    };

    return new Nav();

});
