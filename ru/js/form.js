$(function () {

    $('#city_input').click(function () {
        var html = $('select[name="Shp_test5"] option:selected').text();
        if (html == 'Россия') {
            autocomplete();
        } else {
            noautocomplete();
        }
    });
    function noautocomplete(){

    }
    function autocomplete() {
        var $zip = $('[name="zip"]'),
            $city = $('[name="Shp_test3"]'),
            $street = $('[name="Shp_test4"]'),
            $building = $('[name="Shp_test9"]');

        var $tooltip = $('.tooltip');

        $.kladr.setDefault({
            parentInput: '.js-form-address',
            verify: true,
            select: function (obj) {
                $tooltip.hide();
            },
            check: function (obj) {
                var $input = $(this);

                if (obj) {
                    $tooltip.hide();
                }
                else {
                    showError($input, 'Введено неверно');
                }
            },
            checkBefore: function () {
                var $input = $(this);

                if (!$.trim($input.val())) {
                    $tooltip.hide();
                    return false;
                }
            }
        });

        $city.kladr('type', $.kladr.type.city);
        $street.kladr('type', $.kladr.type.street);
        $building.kladr('type', $.kladr.type.building);

        // Отключаем проверку введённых данных для строений
        $building.kladr('verify', false);

        // Подключаем плагин для почтового индекса
        $zip.kladrZip();

        function showError($input, message) {
            $tooltip.find('span').text(message);

            var inputOffset = $input.offset(),
                inputWidth = $input.outerWidth(),
                inputHeight = $input.outerHeight();

            var tooltipHeight = $tooltip.outerHeight();

            $tooltip.css({
                left: (inputOffset.left + inputWidth + 10) + 'px',
                top: (inputOffset.top + (inputHeight - tooltipHeight) / 2 - 1) + 'px'
            });

            $tooltip.show();
        }
    }
});