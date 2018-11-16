function checkMail(v){
	return  /(.+)@(.+){2,}\.(.+){2,}/.test(v);
}

function initConvead(){
	var $subBut = $('.form_mail button');
	var $subInp = $('.form_mail input');

	$subBut.click(function(){
		var val = $subInp.val();
		if(checkMail(val)){
			console.log(val);
            $.fancybox('<div class="text_review" style="text-align:center">Спасибо за подписку!</div>');
            $(".fancybox-wrap").appendTo(".fancybox-overlay");
			convead('event', 'update_info', {}, {email: val});
            convead('event', 'custom', {key: 'register'});
		}
		return false;
	});

}

$(document).ready(function() {

	initConvead();

	$(".fancybox").fancybox({
		padding: 0,
        beforeShow: function(event) {
        $(".fancybox-wrap").appendTo(".fancybox-overlay");
        },
        afterLoad: function() {
        $(".fancybox-wrap").appendTo(".fancybox-overlay");
        this.title = '<a href="' + this.title + '">' + this.title + '</a>';
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

	$('.blocks_res:eq(0) .bl_res').click(function(){
		var $t = $(this);

		ind = parseInt($('.blocks_res:eq(0) .bl_res').index($t));

		//alert(pros[ind]);
        $.fancybox('<div class="text_review">'+pros[ind]+'</div>');
        $(".fancybox-wrap").appendTo(".fancybox-overlay");
	});

	$('.min_bl_content li').click(function(){
		var $t = $(this);
		ind = parseInt($('.min_bl_content li').index($t));
		//alert(vit[ind]);
        $.fancybox('<div class="text_review">'+vit[ind]+'</div>');
        $(".fancybox-wrap").appendTo(".fancybox-overlay");
	});

	$('.min_bl_content li').css('cursor', 'pointer');
	
	
});



