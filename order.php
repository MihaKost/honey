<?php
$admin_email='makoma@mail.ru, mihakost81@gmail.com';
$theme='Заказ товара';
$site=$_SERVER['SERVER_NAME'];
$delim=PHP_EOL;

if(isset($_POST['subject'])){
	$theme = $_POST['subject'];
}


if(!empty($_POST)){
	$values='';
	foreach ($_POST as $key => $value) {
		if($key!='action' AND $key!='subject' AND !empty($value)){
			if($key=='name'){$key='Имя';}
			if($key=='phone'){$key='Телефон';}
			if($key=='email'){$key='E-mail';}
			if($key=='subject'){$key='Тема сообщения';}
			if($key=='message'){$key='Сообщение';}
			if($key=='act'){$key='Тип заявки';}
			if($key=='hid'){$key='Тип заявки';}


			if($key=='count'){$key='Количество банок';}
			if($key=='utm_promo'){$key='Ссылка, откуда была отправлена заявка';}
			if($key=='Shp_test5'){$key='Страна';}
			if($key=='Shp_name'){$key='Фамилия и Имя';}
			if($key=='Shp_test2'){$key='E-mail';}


			if($key=='Shp_test'){$key='Телефон';}
			if($key=='Shp_test3'){$key='Город';}
			if($key=='Shp_test4'){$key='Адрес';}


			if($key=='promokode'){$key='Промокод';}
			if($key=='sum_total'){$key='Общая сумма';}
			if($key=='summ'){$key='Цена одной банки';}


			if($key=='comment'){$key='Ваш вопрос';}



			if($key=='typePay'){
				if($value==1){
					$value = 'Предоплата';
				}
				if($value==2){
					$value = 'Наложенным платежом';
				}
				$key='Тип оплаты';

			}

			if($key=='url'){$key='Страничка, с которой была отправлена заявка';}
			$values.=$key.': '.$value.PHP_EOL;
		}
	}
	$subject = $theme.' на сайте '.$site;
	$message = 'На сайте http://'.$site.' был отправлен запрос на "'.$theme.'".'.$delim.$values;
	$site_email= 'info@'.$site;
	$header = 'MIME-Version: 1.0' . "\n" . 'Content-type: text/plain; charset=UTF-8' . "\n" . 'From: '.$site_email.' <' . $site_email . ">\n";
	
	if(!empty($values)){
		mail(trim($admin_email), '=?UTF-8?B?'.base64_encode($subject).'?=', $message, $header);
	}
		echo '{"FormResponse": { "success": true"}}';
}
?>