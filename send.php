<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if(isset($_POST["subs"])){
    $email = $_POST['email'];

    $title = "Оформление подписки на Best Tour Plan";
    $body = "
    <h2>Оформление подписки</h2>
    <b>На маил:</b> $email
    ";
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();   
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

        
        $mail->Host       = 'daryadev.ru'; // SMTP сервера вашей почты
        $mail->Username   = 'besttourplan@daryadev.ru'; // Логин на почте
        $mail->Password   = 'X2q3B4t4'; // Пароль на почте
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('besttourplan@daryadev.ru', 'Darya Selivanova'); // Адрес самой почты и имя отправителя

        // Получатель письма
        $mail->addAddress('feral2015@mail.ru');  

        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;    


    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} 
    else {$result = "error";}

    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }

    // Отображение результата
    header('Location: subsc.html');
}

if(isset($_POST["mess"])){
    // Переменные, которые отправляет пользователь
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Формирование самого письма
    $title = "Новое обращение Best Tour Plan";
    $body = "
    <h2>Новое обращение</h2>
    <b>Имя:</b> $name<br>
    <b>Телефон:</b> $phone<br><br>
    <b>Сообщение:</b><br> $message
    ";

    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();   
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

        
        $mail->Host       = 'daryadev.ru'; // SMTP сервера вашей почты
        $mail->Username   = 'besttourplan@daryadev.ru'; // Логин на почте
        $mail->Password   = 'X2q3B4t4'; // Пароль на почте
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('besttourplan@daryadev.ru', 'Darya Selivanova'); // Адрес самой почты и имя отправителя

        // Получатель письма
        $mail->addAddress('feral2015@mail.ru');  

        // Отправка сообщения
        $mail->isHTML(true);
        $mail->Subject = $title;
        $mail->Body = $body;    

    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} 
    else {$result = "error";}

    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }

    // Отображение результата
    header('Location: thankyou.html');
}
?>