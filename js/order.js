(function(){

var ViewClass = function(){
	
};

ViewClass.prototype.init = function() {
	this.$cnt = $('.order_container');
	this.$overlay = this.$cnt.find('.order_overlay');
	this.$modalCnt = this.$cnt.find('.modal_container');
	this.$close = this.$cnt.find('.modal_close');
	this.$item = this.$cnt.find('.item_select .item');

	this.$email = this.$cnt.find('.email');
	this.$name = this.$cnt.find('.name');
	this.$phone = this.$cnt.find('input.phone');
	this.$address = this.$cnt.find('.address');
	this.$submit = this.$cnt.find('.order_button');
	this.$city = this.$cnt.find('.city');
	this.$cityR = this.$cnt.find('.country');
	this.$street = this.$cnt.find('.street');
	this.$house = this.$cnt.find('.house');
	this.$flat = this.$cnt.find('.flat');
	this.$index = this.$cnt.find('.index');
	this.$promInp = this.$cnt.find('.promo_code input');
	this.$error = this.$cnt.find('.form_error');

	this.$waySelector = this.$cnt.find('.way_select .way');
	this.$waySetting = this.$cnt.find('.way_setting');
	this.$wayPrice = this.$cnt.find('.way_price');
	this.$wayTime = this.$cnt.find('.way_time');
	this.$cdekMap = this.$cnt.find('.cdek_map_container');

	this.$finalPrice = this.$cnt.find('.final_price');
	
	this.$qName = $('.is_bl input:first');
	this.$qEmail = $('.is_bl input:last');
	this.$qText = $('.is_bl textarea');
	this.$qButton = $('.is_bl button');
	//this.$cashDelivery = $('.cashDelivery');
	this.$cashDeliveryWay = $('.cashDelivery a');
	
	//initial state
	
	this.$cnt.hide();
	this.$wayPrice.hide();
	this.$wayTime.hide();
	this.$waySetting.children().hide();
	//this.$phone.mask('+9(999)999-99-99');

	this.$city.select2({
		dropdownParent: $('.form_container')
	}).css({
		width: '100%'
	});
	
	this.$city.on('select2:open', function(){
		$('.modal_container').css('overflow-y', 'hidden');
	}).on('select2:close', function(){
		$('.modal_container').css('overflow-y', 'scroll');
	}).on('select2:select', function(e){
		var c = View.$city.val();
		Process.country = c;

		if(c != 'Россия') $('.way.cash').hide(); else $('.way.cash').show();
		Process.isCashDelivery = false;
		Process.way = 0;
		//Process.selectWay(Process.way);
	});
	
	var w = $('body').width();
	if(w < 600){
		this.$cnt.css('width', w);
		this.$cnt.find('.modal_container').css('width', w);
	}

	//events

	this.$item.click(this.itemSelect.bind(this));

	/*this.$name.suggestions({
		token: "4cea6aaa754e27267b8909a1fa92a37a8843453b",
        type: "NAME",
        count: 5,
		onSelect: this.nameInput
	});*/

	this.$name.on('input statuschange', function(e){
		View.nameInput({value:$(this).val()});	
	});

	this.$phone.on('input propertychange', this.phoneInput);

	this.$email.on('input statuschange', function(e){
		View.emailInput({value: $(this).val()});	
	});

	this.$cashDeliveryWay.click( this.cashDeliveryInput );

	/*this.$email.suggestions({
		token: "4cea6aaa754e27267b8909a1fa92a37a8843453b",
        type: "EMAIL",
        count: 5,
		onSelect: this.emailInput
	});*/

	/*this.$address.suggestions({
		token: "4cea6aaa754e27267b8909a1fa92a37a8843453b",
        type: "ADDRESS",
        count: 5,
		onSelect: this.addressInput

	});*/

	//this.$address.on("change", this.addressInput)

	/*this.$address.on("input propertychange", function(e){
		console.log(11);
		View.addressInput($(this).val());
	});*/

	this.$cityR.on("input propertychange", function(e){
		var v = $(this).val();
		Process.cityInput(v);
		Process.makeAddress();
	});

	this.$street.on("input propertychange", function(e){
		var v = $(this).val();
		Process.street = v;
		Process.makeAddress();
	});

	this.$house.on("input propertychange", function(e){
		var v = $(this).val();
		Process.house = v;
		Process.makeAddress();
	});

	this.$flat.on("input propertychange", function(e){
		var v = $(this).val();
		Process.flat = v;
		Process.makeAddress();
	});

	this.$index.on("input propertychange", function(e){
		var v = $(this).val();
		Process.reciverIndex = v;
		//if(Process.way){
		//}
		//Process.makeAddress();
	});

	this.$index.on('change', function(){
		//View.selectWay(Process.way);
	});

	Process.loadPromos();

	this.$promInp.on('input properychange', function(){
		var v = $(this).val();
		Process.promoInput(v);
	});


	this.$waySelector.click(this.waySelected);

	this.$submit.click(this.submit);
	this.$close.click(this.hide.bind(this));

	this.$qButton.click(this.qSubmit.bind(this));

	$('.ai').hide();
	$('.order_way').hide();
	$('.way_time').hide();
	$('.way_price').hide();
	$('.order_button').hide();
	$('.to_order').hide();
	$('.promo_code').hide();
	//this.$index.hide();

	this.$cnt.find('.goto').click(function(){
		fbq('track', 'InitiateCheckout');
		
		if($(this).hasClass('back') || $(this).hasClass('bottom')){
			
			if(Process.checkForm0() != 0) return;

			$('.modal_container').animate({scrollTop: 1000}, 100);
			$(this).text('Назад')
			$(this).removeClass('bottom');
			$(this).removeClass('back');
			$(this).addClass('top');
			$('.ai').show();
			//$(this).hide();
			$('.order_way').hide();
			//$('.way_time').show();
			//$('.way_price').show();
			$('.pi').hide();
			$('.item_select').hide();
			$('.order_button').hide();
			$('.to_order').show();
			$('.final_price').hide();
			$('.promo_code').hide();
		}else if($(this).hasClass('top')){
			$('.pi').show();
			$('.item_select').show();
			$('.modal_container').animate({scrollTop: 0}, 100);
			$(this).text('Далее');
			$(this).removeClass('top');
			$(this).addClass('bottom');
			$('.ai').hide();
			$('.order_way').hide();
			$('.way_time').hide();
			$('.way_price').hide();
			$('.to_order').show();
			$('.order_button').hide();
			$('.to_order').hide();
			$('.final_price').hide();
			$('.promo_code').hide();
		}
	});

	$('.to_order').click(function(){
		
		console.log(Process);

		fbq('track', 'Purchase', {value: Process.finalPrice, currency: 'RUB'});
		if(Process.checkForm() != 0) return;

		$('.goto').addClass('back').text('Назад');

		if(Process.way){
			View.selectWay(this.way);
		}

		$('.ai').hide();
		$('.final_price').show();

		$('.order_button').show();
		$('.order_way').show();
		$('.promo_code').show();
		$('.to_order').hide();
	}.bind(this));

	/*$('.pm_container .plus').click(View.itemIt(1));
	$('.pm_container .minus').click(View.itemIt(-1));*/
	//View.itemIt(0)();

	//this.$cnt.find('.goto.top');
}

ViewClass.prototype.show = function() {
	this.$cnt.fadeIn(200);
	Process.checkSubmit();
	Process.updatePrice()
	$('body').css('overflow', 'hidden');
};

ViewClass.prototype.hide = function() {
	this.$cnt.fadeOut(200);
	$('body').css('overflow', 'auto');
};

ViewClass.prototype.addressInput = function(address) {
	Process.addressInput.bind(Process)(address);
};

ViewClass.prototype.nameInput = function(e) {
	Process.nameInput.bind(Process)(e);
};

ViewClass.prototype.emailInput = function(e) {
	Process.emailInput.bind(Process)(e);
}

ViewClass.prototype.phoneInput = function(e) {
	Process.phoneInput.bind(Process)($(this).val());
}

ViewClass.prototype.cashDeliveryInput = function() {
	var $t = $(this);
	View.$cashDeliveryWay.removeClass('selected');
	$t.addClass('selected');
	var r = $t.hasClass('yes');

	Process.cashDeliveryInput(r);
	
};

ViewClass.prototype.updateSubmit = function(is) {
	if(is){
		this.$submit.addClass('enabled');
		this.$submit.removeClass('disabled');
	}else{
		this.$submit.addClass('disabled');
		this.$submit.removeClass('enabled');
	}
};

ViewClass.prototype.itemIt = function(m) {
	return function(e){

		var nn = Process.itemsCount;
		if(m < 0){
			switch(Process.itemsCount){
				case 3:
					nn = 1;
					break;
				case 6:
					nn = 3;
					break;
			}
		}else if(m > 0){
			switch(Process.itemsCount){
				case 1:
					nn = 3;
					break;
				case 3:
					nn = 6;
					break;
			}
		}
		
		Process.itemsCount = nn;
		var aa = {
			1: 1,
			3: 2,
			6: 3
		}
		Process.item = aa[nn];

		//Process.itemsCount += m;
		//if(Process.itemsCount == 0) current = 1;

		console.log(Process.itemsCount);

		Process.countItemPrice();

		var price = Process.getItemPriceVal();
		var count = Process.itemsCount;
		//var pcount = 40 * Process.itemsCount;

		console.log(price, count);

		/*$('.modal_body .item .price').text(price);
		$('.modal_body .item .item_count').text(count);*/
	}
};

ViewClass.prototype.itemSelect = function(e) {
	//return;
	var $t = $(e.target).parent();
	console.log($t);
	var n = $t.attr('n');
	
	this.$item.removeClass('selected');
	$t.addClass('selected');

	Process.chooseItem(parseInt(n));
};

ViewClass.prototype.selectItem = function(n) {
	//return;
	View.$item.removeClass('selected');
	View.$item.eq(n-1).addClass('selected');
	Process.chooseItem(n);
};

ViewClass.prototype.waySelected = function(e) {
	
	if(Process.checkForm() != 0) return false;

	var $t = $(this);
	var trg = $t.attr('trg');
	var self = View;

	console.log('tTTT', trg);
	Process.isCashDelivery = (trg == 'cash');
	console.log('shhshshs', Process.isCashDelivery );

	if(trg == 'cash') 
		self.$submit.text('Заказать');
	else
		self.$submit.text('Оплатить');

	if(trg == 'cash') trg == 'curier';

	self.$waySelector.removeClass('selected');
	$t.addClass('selected');

	var $trg = self.$waySetting.find('.'+trg);
	
	self.$waySetting.children().hide();

	$trg.find('.success').hide();
	$trg.find('.error').hide();
	$trg.show();

	var ww = {cdek: 1, ruPost: 2, curier: 3, cash: 3};

	Process.way = ww[trg];

	$('.index').hide();
	switch(trg){
		case 'cdek':
			Process.getCdekPrice(true);
			break;
		case 'ruPost':
			$('.index').show();
			Process.getPostPrice();
			break;
		case 'curier':
		case 'cash':
			Process.getCdekPrice(false);
			break;
	}

};

ViewClass.prototype.selectWay = function(n) {
	this.$waySelector.eq(n-1).click();
};

ViewClass.prototype.wayShow = function(trg, suc, par) {

	//Cart.setState(this);
	
	console.log('wayShow!!', trg);

	var $trg = this.$waySetting.find('.' + trg);
	var $suc = $trg.find('.success');
	var $err = $trg.find('.error');

	console.log($trg, $suc, $err, suc);

	//console.log('shshshsh');
	
	//console.log('cash del');
	//$('.cashDelivery').hide();
	if(Process.country == 'Россия'){
		//$('.cashDelivery').show();
	}

	var showPrice = Math.round( par.price / Process.currencyRate ) + ' ' + Process.currencyName;

	if(suc){
		$suc.fadeIn(200);
		this.$wayPrice.find('span').text(showPrice);
		this.$wayTime.find('span').text(par.time);

		//if(!$('.to_order').hasClass('back')){
		this.$wayPrice.show();
		this.$wayTime.show();
		//}

		Process.wayA = true;

	}else{
		$err.show();
		this.$wayPrice.hide();
		this.$wayTime.hide();

		Process.wayA = false;
	}
};

ViewClass.prototype.cdekPoints = function(points) {
	var $sel = this.$waySetting.find('.cdek select');
	var $info = $cnt = this.$waySetting.find('.cdek .show');

	var mapPoints = [];

	$sel.empty();

	for(var i in points){
		var pi = points[i];

		console.log(pi);

		var txt = pi.City + ' ' + pi.Address 
			+ ' Время работы: ' + pi.WorkTime + ' Телефон: ' + pi.Phone;
		var $o = $('<option>');
		$o.text(txt);
		$o.val(i);

		$sel.append($o);

		var mapP = {
			title: pi.Address,
			position: {
				lat: parseFloat(pi.coordY),
				lng: parseFloat(pi.coordX)
			}
		};
		mapPoints.push(mapP);
	}

	$sel.on('change', function(){
		Process.selectPoint($sel.val())();
	})
	
	Process.selectPoint(0)();

	this.initCdekMap(mapPoints);

	//console.log(Process);
}

ViewClass.prototype.cdekPointSelected = function(par) {
	
	//console.log(par);

	$cnt = this.$waySetting.find('.cdek');
	$h = $cnt.find('h4');
	$p = $cnt.find('.phone span');
	$t = $cnt.find('.time span');

	$h.text(par.City + ', ' + par.Address);
	$p.text(par.Phone);
	$t.text(par.WorkTime);

};

ViewClass.prototype.showFormError = function(e) {
	this.$error.text(e);
	this.$error.fadeIn(300);
	//this.$cnt.scrollTop(0);
	
	this.$modalCnt.animate({
		scrollTop: 0
	}, 300);
};

ViewClass.prototype.hideFormError = function(e) {
	this.$error.fadeOut(200);
}

ViewClass.prototype.updatePrice = function(price) {
	//console.log(price);
	this.$finalPrice.find('.val').text(price);
	if(price == 0)
		this.$finalPrice.hide();
	else
		this.$finalPrice.show();
};

ViewClass.prototype.updateSubmit = function() {
	if(Process.isValid){
		this.$submit.removeClass('disabled');
	}else{
		this.$submit.addClass('disabled');
	}
};

ViewClass.prototype.submit = function() {
	if(Process.isValid)
		Process.submit.call(Process);
};

ViewClass.prototype.qSubmit = function() {
	
	if(this.$qName.val() == '' || !checkMail(this.$qEmail.val())) return;

	//console.log(22);
	$.ajax({
		url: '/back.php?url=question',
		data: {
			email: this.$qEmail.val(),
			name: this.$qName.val(),
			text: this.$qText.val()
		},
		type: 'GET',
		dataType: 'json'
	}).then(function(e){
		this.$qEmail.val(''),
		this.$qName.val(''),
		this.$qText.val('')

		convead('event', 'update_info', {}, 
				{
				  email: this.$qEmail.val(),
				  first_name: this.$qName.val()
				}
		);

		alert('Мы ответим в ближайшее время!');

	}.bind(this)).fail(function(e){
		console.log('fail', e);
		console.log(e.responseText);
	});

	return false;
};

ViewClass.prototype.initCdekMap = function(markers){

	var address = Process.country + ', ' + Process.city;

	this.$cdekMap.css('height', this.$cdekMap.width());
	
	var map = new google.maps.Map(this.$cdekMap[0], {
		center: {lat: -34.397, lng: 150.644},
		zoom: 10,
	});

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({address: address}, function(result, status){
		if( status == google.maps.GeocoderStatus.OK ) {
			map.setCenter(result[0].geometry.location);
		}
	});

	for(var i in markers){
		var mi = markers[i];
		
		var marker = new google.maps.Marker({
			position: mi.position,
			map: map,
			title: mi.title,
		});

		marker.addListener('click', function(i){
			return function(e){
				//Process.selectPoint(i)();
				var $sel = View.$waySetting.find('.cdek select');
				$sel.val(i).trigger('change');
			}
		}(i));
	}

}

ViewClass.prototype.makeCurrency = function($sel) {
	var text = parseInt($sel.text());
	console.log('cc', $sel, text);
	var cld = $sel.children().first();
	if(text){
		var val = Math.round(text / Process.currencyRate);
		console.log('cc', val);
		$sel.text( val + ' ' + Process.currencyName );
		$sel.append(cld);
	}
};

ViewClass.prototype.makeCurrencies = function() {
	
	var sels = [
		'.bl_set .price span',
		'.bl_set .price',
		'.modal_body .item .price'
	];

	sels.forEach(function(e){
		$(e).each(function(a,b){
			console.log('cc', $(b))
			View.makeCurrency( $(b) );
		});
	});

	//this.makeCurrency();
};

window.View = new ViewClass();

var ProcessClass = function(){
	
	//this.url = 'https://honeyteddyhair.com/back.php';
	this.url = '/back.php'
	  //'./back.php';
	  //'http://localhost:8888';

	this.cdek = {
		points: [],
		currentPoint: null
	};

	this.ruPostAuth = {
	};

	this.yandexAuth = {
	
	};

	this.crmAuth = {
	
	};

	this.itemsPrices = [
		1390,
		3870,
		7140
	];

	this.currencyRate = 1;
	this.currencyName = 'руб';

	this.item = 0;
	this.itemsCount = 1;
	this.way = 0;
	this.wayA = false;
	this.address = null;
	this.name = null;
	this.phone = null;
	this.country = 'Россия';
	this.reciverIndex = '';
	this.city = null;
	this.street = null;
	this.flat = null;
	this.house = null;
	this.pvz = null;
	this.promoSale = 1;[]
	this.promos = [];
	this.promo = '';
	this.isCashDelivery = false;
	this.isValid = false;

	this.itemPrice = 0;
	this.deliveryPrice = 0;

	this.loadCurrency();
}

ProcessClass.prototype.init = function() {
	this.initSdek();
	//this.initRuPost();
	//this.initYandex();
	
	this.loadCurrency();
}

ProcessClass.prototype.loadCurrency = function() {
	var countryCode, isEuro, exhange;

	$.ajax({url:'https://www.geoip-db.com/jsonp/', dataType: 'jsonp', jsonpCallback: "callback"}).then(function(e){
		countryCode = e.country_code;
		return $.getJSON('https://restcountries.eu/rest/v2/region/europe');
	}).then(function(e){
		
		//console.log('geee', e.find((e)=>e.alpha2Code == 'UA').currencies );

		if(countryCode == 'RU' || countryCode == 'UA' || countryCode == 'BY'){
			isEuro = false;
		}else{
			var c = e.find(function(e){
				return e.alpha2Code == countryCode;	
			});
			isEuro = c ? true : false;
		}

		console.log('isEEU', isEuro);

		var val = isEuro ? 'EUR' : 'RUB';
		return $.getJSON('http://api.fixer.io/latest?base=' + val);
	}).then(function(e){
		//console.log('some ee', e);
		
		Process.currencyRate = e.rates.RUB
		if(!isEuro) Process.currencyRate = 1;
		Process.currencyName = (isEuro) ? 'евро' : 'руб';

		console.log(Process);

		View.makeCurrencies();
		View.itemIt(0)();

	});

	/*.then(e)({
		//console.log(e.rates.RUB);
	});*/
};

ProcessClass.prototype.initSdek = function() {
}

ProcessClass.prototype.checkSubmit = function() {

	//console.log('chekc', this);
	
	Cart.setState(this);

	var isAddress = (
		this.address 
		&& this.street
		&& this.house
	);

	if(this.country != 'Россия' && this.address.length > 0) isAddress = true;

	console.log('valid', isAddress, this);

	this.isValid = (
					this.item
					&& this.country
					&& this.name 
					//&& this.flat
					&& isAddress
					&& this.phone 
					&& this.email
					&& this.finalPrice
					&& this.way
					&& this.wayA
				   );
	
	console.log('valid', this.isValid);

	View.updateSubmit();

}

ProcessClass.prototype.chooseItem = function(n) {
	this.item = n;
	this.itemPrice = this.itemsPrices[n-1];

	console.log('choose', this.item);

	this.updatePrice();
	this.checkSubmit();
};

ProcessClass.prototype.countItemPrice = function() {
	var cur = this.itemsCount;

	var price = this.itemsPrices[cur];
	if(!price){
		//console.log('noPrice', )
		price = this.itemsPrices[1] * cur;
	}

	this.itemPrice = price;

	this.updatePrice();
};

ProcessClass.prototype.getItemPriceVal = function() {
	var price = this.itemPrice;
	console.log('pr', price, Process );
	price = Math.round( price / Process.currencyRate ) + ' ' + this.currencyName;

	return price;
};

ProcessClass.prototype.makeAddress = function() {
	this.address = this.country + ', ' + this.city + ', ' + this.street + ', ' 
	+ this.house + ', ' + this.flat;
};

ProcessClass.prototype.loadPromos = function() {
	$.ajax({
		url: '/back.php?url=getPromos',
		dataType: 'json',
		type: 'GET',
	}).then(function(e){
		Process.promos = e;
	}).fail(function(e){
		console.log('fail promo', e);
	});
};

ProcessClass.prototype.promoInput = function(a){

	function err(){
		Process.promoSale = 1;
		$('.code_res').text('');
	}

	function suc(per){
		$('.code_res').text('-' + per + '%');
		if(per==50)
		$('.code_res').text('+1 банка в подарок');

	}

	if(Process.promos[a.toLowerCase()]){
		var promVal = Process.promos[a];
		if(typeof promVal != 'number'){
			err();
			return;
		}
		this.promo = a;
		var sale = (100 - promVal) * 0.01;
		if(promVal==50)
			sale=1;

		Process.promoSale = sale;
		suc(promVal);

	}else{
		err();
	}
	Process.updatePrice();
	Cart.setState(Process);
}

ProcessClass.prototype.cityInput = function(a){
	//console.log('city inp', a);
	Process.city = a;
	$.ajax({
		url: 'https://api.cdek.ru/city/getListByTerm/jsonp.php?callback=?',
		data: {q: a},
		dataType: 'jsonp',
		type: 'GET',
	}).then(function(e){
		console.log(e.geonames, Process.country);
		if(!e.geonames[0]) return;

		var gn = e.geonames;

		console.log(gn);
		for(var i in gn){
			if( gn[i].countryName.match(Process.country).length > 0 ){
				Process.reciverId = gn[i].id;

				Cart.setState(Process);
				//return;
				
				break;
			}
		}

		console.log('rec', Process.reciverId, Process.country);
		console.log('geonames', e);

		if(Process.way){
			//View.selectWay(this.way);
		}

	}).fail(function(e){
		console.log('city fail', e);
	});
}

ProcessClass.prototype.addressInput = function(a) {

	this.address = a;
	
	//console.log(a);
	$.ajax({
		url: '/back.php?url=getAddress',
		dataType: 'json',
		type: 'POST',
		data: {
			query: a
		},
		/*beforeSend: function(xhr){
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", "Token 4cea6aaa754e27267b8909a1fa92a37a8843453b");
		}*/
		/*headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Authorization": "Token 4cea6aaa754e27267b8909a1fa92a37a8843453b"
		},*/

	}).then(function(e){

		var a = e['suggestions'];
		if(a.length == 0) return;
		a = a[0];


		//a = e;
		
		var city = a.data.city;
		this.address = a.value;
		this.city = a.data.city;
		this.street = a.data.street;
		this.flat = 0; //a.data.flat;
		this.house = a.data.house;
		this.reciverIndex = a.data.postal_code;

		$.ajax({
			url: 'https://api.cdek.ru/city/getListByTerm/jsonp.php?callback=?',
			data: {q: city},
			dataType: 'jsonp',
			type: 'GET',
		}).then(function(e){
			if(!e.geonames[0]) return;
			this.reciverId = e.geonames[0].id;
			//this.reciverIndex = e.geonames[0].postCodeArray[0]
			//console.log('recID', this.reciverId);*/
			
			/*var gn = e.geonames;

			//console.log('ii', gn);
			for(var i in gn){
				if(gn[i].countryName == a.data.country){
					this.reciverId = e.geonames[i].id;
					this.reciverIndex = e.geonames[i].postCodeArray[0]
					//console.log('ii', i);
					return;
				}
			}*/

			if(this.way){
				//View.selectWay(this.way);
			}
			this.checkSubmit();
		}.bind(this)).fail(function(e){
			console.log('addr error', e);
		});

		//console.log(e);
	}.bind(this)).fail(function(e){
		console.log(e);
	});

	return;


}

ProcessClass.prototype.nameInput = function(a){
	this.name = a.value;

	this.checkSubmit();
}

ProcessClass.prototype.emailInput = function(a){
	this.email = a.value;

	this.checkSubmit();
}

ProcessClass.prototype.phoneInput = function(a){
	if(a.length > 0)
		this.phone = a;
	else
		this.phone = null;

	this.checkSubmit();
}

ProcessClass.prototype.getCdekPrice = function(isSelf) {
	var tariffId = isSelf ? 138 : 139;
	var trg = isSelf ? 'cdek' : 'curier';
	
	function suc(price, time){
		View.wayShow(trg, true, {price: price, time: time});
		Process.delPrice(price);
		if(isSelf){
			Process.getPoints();
		}
		Process.checkSubmit();
	}

	function err(){
		View.wayShow(trg, false, {});
		Process.delPrice(0);
		Process.checkSubmit();
	}

	///console.log(this);

	$.ajax({
		type: 'post',
		url: this.url + '?url=getCdekPrice',
		data: {
			//tariffId: tariffId,
			way: this.way,
			reciverId: this.reciverId,
			sizeMode: this.item,
			city: this.city,
			country: this.country
		},
		dataType: 'json',
	}).then(function(e){
		console.log(e);

		if(e.hasOwnProperty('result')){
			var price = e.result.price;
			var time = e.result.deliveryPeriodMin + ' - ' + e.result.deliveryPeriodMax;

			//console.log(price);

			suc(price, time);
		}else{
			err();
		}

	}).fail(function(e){
		console.log('error of ', e);
		err();
	});
};

ProcessClass.prototype.getPoints = function() {
	$.ajax({
		type: 'post',
		url: this.url + '?url=getPoints',
		data: {
			cityId: this.reciverId,
		},
		dataType: 'json',
	}).then(function(e){

		Process.cdek.points = e;

		View.cdekPoints(e);

	}).fail(function(e){
		console.log(e);
	});
};

ProcessClass.prototype.selectPoint = function(i) {
	return function(){
		var p = Process.cdek.points[i];
		Process.cdek.currentPoint = p;
		Process.pvz = p.Code;

		View.cdekPointSelected(p);
	}
};

ProcessClass.prototype.getPostPrice = function() {

	var trg = 'ruPost';

	if(!this.reciverIndex) return err();

	function suc(price, time){
		View.wayShow(trg, true, {price: price, time: time});
		Process.delPrice(price);
		Process.checkSubmit();
	}

	function err(){
		View.wayShow(trg, false, {});
		Process.delPrice(0);
		Process.checkSubmit();
	}
	
	$.ajax({
		type: 'POST',
		url: this.url + '?url=getPostPrice',
		data: {
			reciverIndex: Process.reciverIndex,
			item: Process.item,
			country: this.country
		},
		dataType: 'json'
	}).then(function(e){
		
		if(e.msg.type == 'done' && e.calc.length > 1){
			suc(e.calc[1].cost, e.calc[1].days );
		}else{
			err();
		}

	}).fail(function(e){
		console.log('fail ', e);
		console.log(e.responseText);
		err();
	});
};

ProcessClass.prototype.delPrice = function(v) {
	this.deliveryPrice = v;
	this.updatePrice();
};

ProcessClass.prototype.cashDeliveryInput = function(r) {
	console.log(r);
	this.isCashDelivery = r;
};

ProcessClass.prototype.checkForm0 = function() {

	Cart.setState(this);

	convead('event', 'update_info', {}, 
			{
			  email: Process.email,
			  first_name: Process.name,
			  phone: Process.phone
			}
	);

	var code = 0;
	if(!this.item){
		code = 1;
	}else
	if(!this.name){
		code = 2;
	}else if(!this.email && !checkMail(this.email)){
		code = 3;
	}else if(!this.phone){
		code = 4;
	}

	/*else if(!(this.way)){
		code = 6;
	}*/

	var messages = {
		1: 'Товар не выбран',
		2: 'ФИО введено не верно',
		3: 'Email введен не верно',
		4: 'Телефон введен не верно',
		5: 'Адрес введен не верно! Город, улица, дом, квартира',
		6: 'Не выбран способ доставки'
	};

	var message = messages[code];

	if(!code){
		View.hideFormError();
	}else{
		View.showFormError(message);
	}

	return code;
};

ProcessClass.prototype.checkForm = function() {
	var code = 0;
	/*if(!this.item){
		code = 1;
	}else*/ 

	Cart.setState(this)

	if(!this.name){
		code = 2;
	}else if(!this.email && !checkMail(this.email)){
		code = 3;
	}else if(!this.phone){
		code = 4;
	}else if(!(this.city && this.street && this.house /*&& this.flat*/)){
		code = 5;
	}

	if(code == 5 && this.country != 'Россия'){
		code = 0;
	}

	/*else if(!(this.way)){
		code = 6;
	}*/

	var messages = {
		1: 'Товар не выбран',
		2: 'ФИО введено не верно',
		3: 'Email введен не верно',
		4: 'Телефон введен не верно',
		5: 'Адрес введен не верно! Город, улица, дом, квартира',
		6: 'Не выбран способ доставки'
	};

	var message = messages[code];

	if(!code){
		View.hideFormError();
	}else{
		View.showFormError(message);
	}

	return code;
};

ProcessClass.prototype.updatePrice = function() {
	this.finalPrice = parseFloat(this.itemPrice) + parseFloat(this.deliveryPrice);
	this.finalPrice = Math.ceil(this.finalPrice * this.promoSale);
	if(!this.itemPrice /*|| !this.deliveryPrice*/)
		this.finalPrice = 0;

	var priceView = Math.floor(this.finalPrice / this.currencyRate) + ' ' + this.currencyName;

	View.updatePrice(priceView);
}

ProcessClass.prototype.submit = function() {

	//if(!Process.checkForm() != 0) return;
	if(!Process.isValid) return;

	Cart.clear();

	if(!this.flat) this.flat = '1';

	var itm = {
		1: 1,
		3: 2,
		6: 3
	}
	itm = itm[this.itemsCount];

	var data = {
		url: 'submit',
		item: this.item,
		//item: itm,
		
		//count: this.itemsCount,
		way: this.way,
		name: this.name,
		email: this.email,
		phone: this.phone,
		reciverId: this.reciverId,
		reciverIndex: this.reciverIndex,
		address: this.address,
		pvz: this.pvz,
		country: this.country,
		city: this.city,
		street: this.street,
		house: this.house,
		flat: this.flat,
		country: this.country,
		cashDelivery: this.isCashDelivery,
		promo: this.promo
	};

	console.log(data);

	//return;

	convead('event', 'update_info', {}, 
			{
			  email: this.email,
			  first_name: this.name
			});

	var pars = $.param(data);

	window.location.href = this.url + '?' + pars;
};

ProcessClass.prototype.restore = function() {

	View.$wayPrice.hide();
	View.$wayTime.hide();
	
	if(this.item)
		View.selectItem(this.item);

	View.$name.val(this.name);
	View.$email.val(this.email);
	View.$phone.val(this.phone);

	View.$city.val(this.country).trigger('change.select2');
	View.$cityR.val(this.city);
	View.$street.val(this.street);
	View.$house.val(this.house);
	View.$flat.val(this.flat);
	View.$index.val(this.reciverIndex);
	
	if(this.way)
		View.selectWay(this.way);

	if(this.city || this.house || this.flat)
		$('.goto.bottom').trigger('click');

	if(this.way)
		$('.to_order').trigger('click');

	console.log(11);

};

window.Process = new ProcessClass();

function CartClass(){
	this.state = null;
	this.load();
	this.showWelcome();
}

CartClass.prototype.setState = function(s) {
	//	var ss = JSON.parse(JSON.strin)
	this.state = Object.assign({}, s);
	this.save();
}

CartClass.prototype.restore = function(s) {
	$.fancybox.close()
	Object.assign(Process, this.state);
	Order.show();
	Process.restore.bind(Process)();
}

CartClass.prototype.load = function() {
	const ls = localStorage.getItem('cart');
	if(ls){
		this.state = JSON.parse(ls);
	}
};

CartClass.prototype.save = function() {
	localStorage.setItem('cart', JSON.stringify(this.state));
}

CartClass.prototype.clear = function() {
	localStorage.removeItem('cart');
}

CartClass.prototype.showWelcome = function() {
	if(this.state){
		//
        $.fancybox('<div class="text_review">Приветствуем! Вы начали заполнять форму, но не завершили. Нажмите, чтобы продолжить <button class="goCart">Прододжить</button></div>');
        $(".fancybox-wrap").appendTo(".fancybox-overlay");

		$('.goCart').click(this.restore.bind(this));
	}
};

var Cart = new CartClass;

var OrderClass = function(){

}

OrderClass.prototype.init = function() {
	View.init();
	Process.init();
};

OrderClass.prototype.show = function() {
	View.show();
};

OrderClass.prototype.hide = function() {
	View.hide();
};

/*Choose count: 1 - 1, 2 - 3, 3: 6*/
OrderClass.prototype.chooseItem = function(n) {

}

/*Chose delivery way: 1 - cdek, 2 - post*/
OrderClass.prototype.chooseWay = function(w) {

}


window.Order = new OrderClass();

$(function(){

	Order.init();

	$('.pin .btn, .knob').click(function(){
		fbq('track', 'Lead');
		View.show(); 
		var $el = $(this);
		if($el.attr('item')){
			//View.selectItem(parseInt($el.attr('item')));
		}
		return false;
	});

});

})();
