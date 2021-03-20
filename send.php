<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if(isset($_POST["subs"])){
    $email = $_POST['email'];

    $title = "Subscription to Best Tour Plan";
    $body = "
    <h2>Subscription to Best Tour Plan</h2>
    <b>For mail:</b> $email
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
        $mail->Password   = 'I5r5L6b1'; // Пароль на почте
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
    $title = "Best Tour Plan new appeal";
    $body = "
    <h2>Best Tour Plan new appeal</h2>
    <b>Name:</b> $name<br>
    <b>Phone:</b> $phone<br><br>
    <b>Message:</b><br> $message
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
        $mail->Password   = 'I5r5L6b1'; // Пароль на почте
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
if(isset($_POST["messa"])){
    // Переменные, которые отправляет пользователь
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Формирование самого письма
    $title = "Best Tour Plan new appeal";
    $body = "
    <h2>Best Tour Plan new appeal</h2>
    <b>Name:</b> $name<br>
    <b>Phone:</b> $phone<br><br>
    <b>Email:</b> $email<br><br>
    <b>Message:</b><br> $message
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
        $mail->Password   = 'I5r5L6b1'; // Пароль на почте
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