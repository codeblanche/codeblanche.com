define([
    'jquery',
    'app/state',
    'attention',
], function ($, state) {

    var $form;
    var initialized = false;

    var ContactForm = function () {

        var self = this;

        function handleFormSubmit(evt) {
            evt.preventDefault();

            var valid = validate($form.find('input.text, textarea.text'));

            if (!valid) {
                $form
                    .animate({marginLeft: '50px'}, 50)
                    .animate({marginLeft: '0px'}, 50)
                    .animate({marginLeft: '50px'}, 50)
                    .animate({marginLeft: '0px'}, 50, function () {
                        $form.clearQueue();
                    });

                return;
            }

            $.post(
                '/ajax/send',
                {
                    'email'   : $('#contact-email').val(),
                    'phone'   : $('#contact-phone').val(),
                    'message' : $('#contact-message').val()
                },
                function (response) {

                    console.log(response);

                    if (!response.ok) {
                        $form
                            .animate({marginLeft: '50px'}, 50)
                            .animate({marginLeft: '0px'}, 50)
                            .animate({marginLeft: '50px'}, 50)
                            .animate({marginLeft: '0px'}, 50, function () {
                                $form.clearQueue();
                            });

                        return;
                    }

                    $form.fadeOut('slow', function () {
                        $('#contact-complete').fadeIn();
                    });

                },
                'json'
            );

        }

        function validate($fields) {
            var valid = true;

            $fields.each(function (key) {
                valid &= validateField($(this));
            });

            return valid;
        }

        function validateField($field) {
            if (!$field.data('validate')) {
                return;
            }

            var valid = true;
            var value = $field.val();

            switch ($field.data('validate')) {
                case 'email':
                    valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                    break;
                case 'phone':
                    valid = /^(\+[0-9]{2,3})?(\s*\([0-9]{1}\)\s*)?(\s*[0-9]+){6,}$/i.test(value);
                    break;
                case 'not-empty':
                    valid = /^.+$/i.test(value);
                    break;
            }

            $icon = $field.next('.icon');

            if (!$icon) {
                $icon = $('<i class="icon" />');

                $field.insertAfter($icon);
            }

            if (!valid) {
                $icon.removeClass('yes').addClass('no');
            }
            else {
                $icon.removeClass('no').addClass('yes');
            }

            $field.one('keyup', function () {
                validateField($(this));
            });

            return valid;
        }

        this.init = function () {
            if (initialized) {
                return self;
            }

            if (!state.domready) {
                throw new Error("Dom is not ready for this!");
            }

            $form = $('#contact-form');

            $form.on('submit', handleFormSubmit);

            $form.find('input.text, textarea.text').on('blur', function (evt) {
                validate($(this));
            });

            initialized = true;

            return self;
        };

    };

    return new ContactForm();

});
