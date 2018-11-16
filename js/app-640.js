var price = 640;
var pay = 0;
var count = 1;
var dostavka = 0;
var discount = 0;
var discountType = '';
$(document).ready(function () {
    $('.avers').click(function () {
        //$('.loader').show();
        $('.but1').removeClass('active');
        $('.but2').removeClass('active');
        $('.but3').removeClass('active');
        $('.but4').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('but3') || $(this).hasClass('but4') || $(this).hasClass('but2')) {
            $('#selectpvz').hide();
            $('.cdek_map_container').hide();
        }
        if ($(this).hasClass('but2')) {
            /*$.ajax({
                type: 'POST',
                url: '/api/getPostPrice',
                data: {
                    reciverIndex: $('input[name="Shp_test7"]').val(),
                    item: typePay,
                    count: count,
                    country: $('select[name="Shp_test5"] option:selected').text()
                },
                dataType: 'json'
            }).then(function (e) {
                $('#dostavka').text(e.cost);
                dostavka = Math.ceil(parseFloat(e.cost));
                $('#sum_total2').text(Math.ceil((price * count) + dostavka));

                $('.loader').hide();
            }).fail(function (e) {
                $('.loader').hide();
                $('#selectpvz').hide();
                console.log('fail ', e);
            });*/
        }
        if ($(this).hasClass('but3') || $(this).hasClass('but4') || $(this).hasClass('but1')) {
            /*$.ajax({
                url: 'https://api.cdek.ru/city/getListByTerm/jsonp.php',
                data: {q: $('input[name="Shp_test3"]').val()},
                dataType: 'jsonp',
                type: 'GET'
            }).then(function (e) {
                var rid = e.geonames[0].id;
                $('#zip').val(e.geonames[0].postCodeArray[0]);
                if ($('.but1').hasClass('active')) {
                    getPvz();
                }
                $.ajax({
                    type: 'post',
                    url: '/api/getCdekPrice',
                    data: {
                        way: typePay,
                        reciverId: rid,
                        sizeMode: count,
                        city: $('input[name="Shp_test3"]').val(),
                        country: $('select[name="Shp_test5"] option:selected').text()
                    },
                    dataType: 'json'
                }).then(function (e) {
                    $('.but4').show();
                    $('#dostavka').text(e.result.price);
                    dostavka = Math.ceil(parseFloat(e.result.price));
                    $('#sum_total2').text(Math.ceil((price * count) + dostavka));
                    $('.loader').hide();
                }).fail(function (e) {
                    $('.loader').hide();
                    $('#selectpvz').hide();
                    $('.but4').hide();
                    console.log('error of ', e);
                });
            }).fail(function (e) {
                $('.loader').hide();
                $('#selectpvz').hide();
                console.log('city fail', e);
            });*/

        }
    });


    $("[type='Shp_test2']").click(function (e) {
        $('[type="Shp_test2"]').removeClass("valid");
    });

    $('[name="Shp_test0"]').click(function (e) {
        $('[name="Shp_test0"]').removeClass("valid");
        $(this).focus();
    });
    $('[name="Shp_name"]').click(function (e) {
        $('[name="Shp_name"]').removeClass("valid");
        $(this).focus();
    });

    $("#next0").click(function () {
        if ($('#country_select').val() == '') {
            $('.transformSelect').addClass('error');
        } else {
            $("#step1").removeClass('expanded');
            $("#step1 .accordion-collapse").hide();
            $("#step2").addClass('expanded');
            $("#step2 .accordion-header").removeClass('noactive');
            $("#step2 .accordion-collapse").fadeIn();
            $("#step2").addClass('expanded');
            $("#step2 .accordion-header").removeClass('noactive');
            $("#step2 .accordion-collapse").fadeIn();
            $("#step3 .accordion-header,#step4 .accordion-header,#step5 .accordion-header").addClass('noactive');
        }
    });
    $('#to_next0').click(function () {
        $("#step1").addClass('expanded');
        $("#step1 .accordion-collapse").fadeIn();
        $("#step2").removeClass('expanded');
        $("#step2 .accordion-collapse").hide();
    });
    $('#to_next1').click(function () {
        $("#step2").addClass('expanded');
        $("#step2 .accordion-collapse").fadeIn();
        $("#step3").removeClass('expanded');
        $("#step3 .accordion-collapse").hide();
    });


    $("#next1").click(function () {
        var pattern = /^[a-z0-9_.-]+@[a-z0-9-.]+\.[a-z.]{2,6}$/i;
        var pat_var = false;
        if ($('[name="Shp_test2"]').val().search(pattern) != 0) {
            pat_var = true;
        }
        if ($('[name="Shp_test"]').val().replace(/[^0-9]/gim, '').length >= 10 && $('[name="Shp_name"]').val() != '') {
            $("#step2").removeClass('expanded');
            $("#step2 .accordion-collapse").hide();
            $("#step3").addClass('expanded');
            $("#step3 .accordion-header").removeClass('noactive');
            $("#step3 .accordion-collapse").fadeIn();
        }

        // if ($('[name="Shp_test0"]').val().length < 1) {
        //     $('[name="Shp_test0"]').removeClass('valid').addClass('error');
        // } else {
        //     $('[name="Shp_test0"]').removeClass('error').addClass('valid');
        // }
        if ($('[name="Shp_test"]').val().replace(/[^0-9]/gim, '').length < 10) {
            $('[name="Shp_test"]').removeClass('valid').addClass('error');
        } else {
            $('[name="Shp_test"]').removeClass('error').addClass('valid');
        }
        if ($('[name="Shp_name"]').val() == '') {
            $('[name="Shp_name"]').removeClass('valid').addClass('error');
        } else {
            $('[name="Shp_name"]').removeClass('error').addClass('valid');
        }
        // if ($('[name="Shp_test2"]').val() == '' || pat_var) {
        //     $('[name="Shp_test2"]').removeClass('valid').addClass('error');
        //     alert ('e-mail Error');
        // } else {
        //     $('[name="Shp_test2"]').removeClass('error').addClass('valid');
        //     alert ('e-mail ok!');
        // }

    });


    $("#next2").click(function () {
        $("#step3").removeClass('expanded');
        $("#step3 .accordion-collapse").hide();
        $("#step5").addClass('expanded');
        $("#step5 .accordion-header").removeClass('noactive');
        $("#step5 .accordion-collapse").fadeIn();
        if ($('select[name="Shp_test5"] option:selected').text() != 'Россия') {
            $('.but4').hide();
        } else {
            $('.but4').show();
        }
        $(".but1").click();
    });

    $(".plus-minus").click(function () {
        count++;
        if (discountType == 'procent') {
            price = Math.ceil(getPrice(count) / 100 * (100 - discount));
        } else {
            price = getPrice(count);
        }
        $('.summ').text(price);
        $('input[name="count"]').val(count);
        $('#quantity_current').text(count);
        $('#sum_total').text(price * count);
        $('#sum_total2').text((price * count) + dostavka);
    });
    $(".icon-minus").click(function () {
        if (count > 1) {
            count--;
            if (discountType == 'procent') {
                price = Math.ceil(getPrice(count) / 100 * (100 - discount));
            } else {
                price = getPrice(count);
            }
            $('.summ').text(price);
            $('input[name="count"]').val(count);
            $('#quantity_current').text(count);
            $('#sum_total').text(price * count);
            $('#sum_total2').text((price * count) + dostavka);

        }
    });

    /*$(".subscribe_button").click(function () {
        if ($('.subscribe_email').val != '') {
            $.ajax({
                type: "POST",
                url: "api/subscription/" + $('.subscribe_email').val(),
                dataType: 'json',
                success: function (msg) {
                    if (msg.result == 'ok') {
                        $.fancybox.open('<p style="text-align: center;">Вы успешно подписались на рассылку</p>');
                    }
                }
            });
        } else {
            $.fancybox.open('<p style="text-align: center;">Вы не указали Email</p>');
        }
    });*/
    /*$(".promo_check").click(function () {
        if ($('.promokode').val() != '' && discountType == '') {
            $('input[name="promocode"]').val($('.promokode').val());
            $.ajax({
                type: "POST", url: "api/promokode/" + $('.promokode').val(), dataType: 'json', success: function (msg) {
                    if (msg.result) {
                        discount = msg.count.count;
                        discountType = msg.count.type;
                        if (discountType == 'procent') {
                            price = Math.ceil(getPrice(count) / 100 * (100 - discount));
                        }
                        $('.summ').text(price);
                        $('input[name="count"]').val(count);
                        $('#quantity_current').text(count);
                        $('#sum_total').text(price * count);
                        $('#sum_total2').text((price * count) + dostavka);
                        if (msg.count.type == 'amount') {

                            if ($('.promokode').val() == 'rastushevka' && $('input[name="count"]').val() > 1) {
                            $(".promokodes_span").text(msg.count.count + ' бесплатная банка по промокоду');
                            } else if ($('.promokode').val() == 'rastushevka' && $('input[name="count"]').val() < 2) {
                            $(".promokodes_span").text('Промокод действует на заказы от 2х банок!');
                            $('input[name="promocode"]').val('');
                            discountType = '';  
                            } else {
                            $(".promokodes_span").text(msg.count.count + ' бесплатная банка по промокоду');
                            }

                        } else if (msg.count.type == 'procent') {
                            $(".promokodes_span").text('ваша скидка равна ' + msg.count.count + '%');
                        }
                    } else {
                        $(".promokodes_span").text('Такого промокода не существует');
                    }
                }
            });
        } else if (discountType != '') {
            $(".promokodes_span").text('промокод уже активирован');
        } else {
            $(".promokodes_span").text('Вы не ввели промокод');
        }
    });*/
});



$(document).ready(function () {


    $(".fancybox").fancybox({
        padding: 0,
        beforeShow: function (event) {
            $(".fancybox-wrap").appendTo(".fancybox-overlay");
        },
        afterLoad: function () {
            $(".fancybox-wrap").appendTo(".fancybox-overlay");
        }
    });

    var pros = [
        'Волосы растут невероятно быстро - Уникальный состав пастилок, где наличие в них Витамина Биотин увеличивает приток крови и питательных веществ к волосяным луковицам. Ее клетки заметно быстро делятся и рост волос увеличивается.',

        'Волосы обрели силу и блеск - Витамин Д3, входящий в состав пастилок улучшает состояние волос, делает их гладкими и блестящими.',

        'Шикарный природный объём без укладочных средств - Витамин С стимулирует выработку коллагена, который изнутри дарит силу и придаёт объём вашим волосам.',

        'Напрочь забыла про ломкость и сечение - Недостаток Витамина А вызывает сухость и шелушение кожи, ломкость и тусклость волос. Пастилки @honeyteddyhair богаты витамином А.',

        'Волосы дольше остаются чистыми и не выпадают - Витамин Е влияет на питание волосяных луковиц. Поэтому кожа головы становится здоровой, а волосы перестают выпадать.',

        'Ногти стали крепкими и перестали ломаться -  Пастилки богаты Кератином - это то вещество, из которого состоят ваши волосы, кожа и ногти.'
    ];

    var vit = [
        'Витамин С - стимулирует выработку коллагена, который изнутри дарит силу вашим волосам, обеспечивая удивительно быстрый рост волос.',

        'Витамин Д3 - защищает от кожных инфекций, ультрафиолета и улучшает состояние волос, делая их гладкими и блестящими.',

        'Витамин Е - необходим для циркуляции крови. Обеспечивает кожу головы достаточным количеством кислорода, что способствует здоровому росту волос. Богат антиоксидантами, защищает от повреждений волосяные фолликулы.',

        'Фолиевая кислота - активно стимулирует деление клеток, благодаря которому ваши волосяные фолликулы смогут обеспечить рост здоровых волос. Фолиевая кислота лучше других веществ сокращает выпадение волос, предотвращая их истончение!',

        'Биотин - один из самых эффективных витаминов для стимулирования роста волос. Биотин поддерживает здоровье кожи головы, а также уровень необходимого содержания кератина, который делает ваши волосы сильными, гладкими и пышными.',

        'Пантотеновая кислота - Витамин В-5 помогает стимулировать рост волос, поддерживая естественную выработку кератина, что помогает заменить потерянные из-за чрезмерного высыпания или ломкости волосы на новые. Питает волосяные луковицы изнутри и обеспечивает сияние и блеск вашим волосам.',

        'Витамин В8 - способствует укреплению, восстановлению структуры волоса, препятствует выпадению волос.',

        'Витамин А - обогащает кислородом и  помогает наполнить кожу головы жизненно важными питательными веществами, волосы становятся более длинными и сильными. Защищает волосяные фолликулы от выпадения волос.',

        'Витамин В6 - способствует формированию новых клеток  и обогащает кислородом кожу головы. Предотвращает появление перхоти.',

        'Витамин В12 - дает мощный импульс росту ваших волос, помогает формировать красные кровяные тельца, которые отвечают за поступление кислорода к коже головы, что помогает волосам расти быстрее. Люди, принимающие Витамин B -12, отмечают повышение жизненного тонуса и энергичности.',

        'Йод - предотвращает выпадение волос.',

        'Цинк - регулирует деятельность сальных желёз.',

        'Холин - положительно влияет на нервную систему, тем самым снижает риск выпадения волос.',
    ];

    $('.blocks_res:eq(0) .bl_res').css('cursor', 'pointer');

    $('.blocks_res:eq(0) .bl_res').click(function () {
        var $t = $(this);

        ind = parseInt($('.blocks_res:eq(0) .bl_res').index($t));

        $.fancybox.open('<div class="text_review">' + pros[ind] + '</div>');
        $(".fancybox-wrap").appendTo(".fancybox-overlay");
    });

    $('.min_bl_content li').click(function () {
        var $t = $(this);
        ind = parseInt($('.min_bl_content li').index($t));
        $.fancybox.open('<div class="text_review">' + vit[ind] + '</div>');
        $(".fancybox-wrap").appendTo(".fancybox-overlay");
    });

    $('.pin .btn, .knob').click(function () {
        $('.modal__bg').show();
        $('.modal__cc').show();
    });

    $('.modal .close, .modal__bg').click(function () {
        $('.modal__bg').hide();
        $('.modal').hide();
        $.fancybox.close();
    });

    $('.buy_button').click(function () {
        $('.modal').hide();
        $('.modal__bg').hide();
        count = $(this).data('count');
        price = getPrice(count);
        pay = price * count;
        $('.summ').text(price);
        $('#sum_total').text(price * count);
        $('#sum_total2').text((price * count) + dostavka);
        $('#quantity_current').text(count);
        $('input[name="count"]').val(count);
        $.fancybox.open($('#foo'));
    });

    $('.region').click(function () {
        $.fancybox.open($('.modal__region'));

        // $('.modal__bg').show();
    });

    $('.callphone').click(function () {
        $('.modal__call').show();
        $('.modal__bg').show();
    });
    $(".telephone__callback").mask("+38(999)-999-99-99");



    $("#myform").submit(function () {
        a = $(".telephone__callback").val();
        if (a.length >= 16) {
        var data = {
            'subject': 'Обратный звонок',
            'phone': a
        }
        //$('#order_form').serialize() + '&typePay=' + typePay;
        jQuery.post('/order.php?v='+Math.random(), data, function(response) {
                console.log('phone');
                //$.fancybox.close();
                $('.modal .close').click();
                $.fancybox.open('<div class="text_review" style="text-align: center;">Ваша заявка принята.<br>Вам перезвонит наш менеджер в ближайшее время.</div>', {
                    'afterClose': function () {
                        $('.modal__bg').hide();
                    }
                });
                $('.modal__bg').show();
        });
            /*$.ajax({type: "GET", url: "/api/addPhone", data: $(this).serialize()}).done(function () {
                $('.modal .close').click();
                $.fancybox.open('<div class="text_review" style="text-align: center;">Ваша заявка принята.<br>Вам перезвонит наш менеджер в ближайшее время.</div>', {
                    'afterClose': function () {
                        $('.modal__bg').hide();
                    }
                });
                $('.modal__bg').show();
            });
            return false;*/
        } else {
            $(".telephone__callback").val('');
        }
        return false;
    });

    $("#myform").submit(function () {
        a = $(".telephone__callback").val();
        if (a.length >= 16) {
            $.ajax({type: "GET", url: "/api/addPhone", data: $(this).serialize()}).done(function () {
                $('.modal .close').click();
                $.fancybox.open('<div class="text_review" style="text-align: center;">Ваша заявка принята.<br>Вам перезвонит наш менеджер в ближайшее время.</div>', {
                    'afterClose': function () {
                        $('.modal__bg').hide();
                    }
                });
                $('.modal__bg').show();
            });
            return false;
        } else
            $(".telephone__callback").val('');
    });

});

function getPvz() {
    /*$.ajax({
        type: "POST", url: "/api/getPvz/" + $('#zip').val(), dataType: 'json', success: function (msg) {
            $('#selectpvz').show();
            $('.cdek_map_container').show();
            $('#selectpvz').html('');
            $.each(msg, function (i, item) {
                $('#selectpvz').append($('<option>', {value: item.attributes.Code, text: item.attributes.FullAddress}));
            });
        }
    });*/
    return false;
}

function zakaz() {

    if ($('.checkbox').is(":checked")) {
        $.fancybox.close();
        $.fancybox.open('Дождитесь окончания загрузки...');
        send_zakaz();
    } else {
        $.fancybox.open('Вы не согласились на обработку персональных данных');
    }
}

function getPrice(count) {
    var price = 640;
    if (count >= 10) {
        price = 520;
    }
    else if (count >= 3) {
        price = 565;
    } else if (count === 2) {
        price = 595;
    }

    return price;
}

function send_zakaz() {
    $('#tamoj').hide();
    $('#wait').show();
    $('input[name="dostavka"]').val(dostavka);
    $('input[name="discount"]').val(discount);
    $('input[name="discountType"]').val(discountType);
    $('input[name="utm_promo"]').val(window.location.href);

    if (typePay == 4) {
        $.fancybox.close();
        $.fancybox.open('<p style="text-align: center;">Ваш заказ принят!<br> Наш менеджер свяжется с вами в ближайшее время.</p>');
    }
    localStorage.setItem("payType", typePay);
    console.log('send_zakaz');
    var data = $('#order_form').serialize() + '&typePay=' + typePay;
    jQuery.post('/order.php?v='+Math.random(), data, function(response) {
            $.fancybox.close();
            $.fancybox.open('<p style="text-align: center;">Ваш заказ принят!<br> Наш менеджер свяжется с вами в ближайшее время.</p>');
    });
    return false;

      /*
    $.ajax({
        type: "GET",
        url: "/order.php",
        data: $('#order_form').serialize() + '&typePay=' + typePay,
        dataType: 'json',
        success: function (msg) { 
            console.log('test');
            $.fancybox.close();
            $.fancybox.open('<p style="text-align: center;">Ваш заказ принят!<br> Наш менеджер свяжется с вами в ближайшее время.</p>');
 
            if (msg.url != '') {
                window.location.replace(msg.url);
            }
            if (!msg) {
                $.fancybox.close();
                $.fancybox.open('<p style="text-align: center;">Ваш заказ принят!<br> Наш менеджер свяжется с вами в ближайшее время.</p>');
            }
        }
    });*/

}

$(function () {

    $('.accordion-header').on('click', function (e) {

        var $this = $(this);
        if (!$(this).hasClass('noactive')) {

            $this.parent('.accordion').toggleClass('expanded');

            $this.next('.accordion-collapse').toggle();

            $this.parent('.accordion').siblings('.accordion').removeClass('expanded').find('.accordion-collapse').hide();

            e.stopPropagation();

        }
    });

});











function checkMail(v) {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(v);
}



function initConvead() {
    var $subBut = $('.form_mail button');
    var $subInp = $('.form_mail input');

    $subBut.click(function () {
        var val = $subInp.val();
        if (checkMail(val)) {
             //$.fancybox.open('<div class="text_review" style="text-align:center">Спасибо за подписку!</div>');
            //$(".fancybox-wrap").appendTo(".fancybox-overlay");

            data = {
                'subject':'Подписка на рассылку',
                'email': val
            }
                jQuery.post('/order.php?v='+Math.random(), data, function(response) {
                    $('.form_mail input').val('');
                        $.fancybox.close();
                        $.fancybox.open('<div class="text_review" style="text-align:center">Спасибо за подписку!</div>');
                });
        } else {
            $.fancybox.close();
            $.fancybox.open('<div class="text_review" style="text-align:center">Ошибка! Вы ввели не корректный email адрес.</div>');
        }
        return false;
    });

}
initConvead();




function init_form_question() {
    var $subBut = $('#form_question_btn');

    $subBut.click(function () {
        var name = jQuery('#form_question_name').val();
        var email = jQuery('#form_question_email').val();
        var comment = jQuery('#form_question_comment').val();

        var valid = 1;

        if(name==''){
            valid = 0;
        }


        if(email==''){
            valid = 0;
        }


        if(comment==''){
            valid = 0;
        }


        if(valid==1){

        if (checkMail(email)) {
             //$.fancybox.open('<div class="text_review" style="text-align:center">Спасибо за подписку!</div>');
            //$(".fancybox-wrap").appendTo(".fancybox-overlay");

            data = {
                'subject':'Вопрос от посетителя',
                'name':name,
                'email': email,
                'comment': comment
            }
                jQuery.post('/order.php?v='+Math.random(), data, function(response) {

                    jQuery('#form_question_name').val('');
                    jQuery('#form_question_email').val('');
                    jQuery('#form_question_comment').val('');
                        $.fancybox.close();
                        $.fancybox.open('<div class="text_review" style="text-align:center">Спасибо за Ваш вопрос! Мы постараемся ответить на него в ближайшее время</div>');
                });
        } else {
            $.fancybox.close();
            $.fancybox.open('<div class="text_review" style="text-align:center">Ошибка! Вы ввели не корректный email адрес.</div>');
        }
        } else {

            $.fancybox.close();
            $.fancybox.open('<div class="text_review" style="text-align:center">Ошибка! Вы заполнили не все поля.</div>');
        }
        return false;
    });

}
init_form_question();











    /*
#form_mail
*/





/*
jQuery(document).ready(function(){
    jQuery('#form_mail').submit(function(){
        console.log('form_mail:start');
        jQuery.post('/order.php?v='+Math.random(), jQuery("#form_mail").serialize(),  function(response) {
        console.log('response: '+response);
                        $.fancybox.close();
                        $.fancybox.open('<div class="text_review" style="text-align:center">Спасибо за подписку!</div>');
        });
        return false;
    });


    jQuery('#form_question').submit(function(){
        console.log('form_question:start');
        jQuery.post('/order.php?v='+Math.random(), jQuery("#form_question").serialize(),  function(response) {
        console.log('response: '+response);
                        $.fancybox.close();
                        $.fancybox.open('<div class="text_review" style="text-align:center">Спасибо за Ваш вопрос! Мы постараемся ответить на него в ближайшее время</div>');
        });
        return false;
    });

});*/