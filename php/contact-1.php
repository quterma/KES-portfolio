<?php

if($_POST) {
  $name = "";
  $email = "";
  $web = "";
  $phone = "";
  $message = "";

  if(isset($_POST['name'])) {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  }

  if(isset($_POST['email'])) {
    $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
  }

  if(isset($_POST['phone'])) {
    $visitor_phone = filter_var($_POST['visitor_phone'], FILTER_SANITIZE_NUMBER_INT);
  }

  if(isset($_POST['message'])) {
    $message = htmlspecialchars($_POST['message']);
  }

  $recipient = "wolf921@mail.ru";
    
  $headers  = 'MIME-Version: 1.0' . "\r\n"
  .'Content-type: text/html; charset=utf-8' . "\r\n"
  .'From: ' . $email . "\r\n";

  $email_content = "<html><body>";
  $email_content .= "<table style='font-family: Arial;'><tbody><tr><td style='background: #eee; padding: 10px;'>Sender Name</td><td style='background: #fda; padding: 10px;'>$name</td></tr>";
  $email_content .= "<tr><td style='background: #eee; padding: 10px;'>Sender Email</td><td style='background: #fda; padding: 10px;'>$email</td></tr>";
  $email_content .= "<tr><td style='background: #eee; padding: 10px;'>Sender Phone</td><td style='background: #fda; padding: 10px;'>$phone</td></tr>";

  $email_content .= "<p style='font-family: Arial; font-size: 1.25rem;'><strong>Message from $name &mdash;</strong><i> $message</i>.</p>";
  $email_content .= '</body></html>';

  echo $email_content;
    
  if(mail($recipient, "Message", $email_content, $headers)) {
    echo '<p>Thank you for your message.</p>';
  } else {
    echo '<p>We are sorry but your message did not go through.</p>';
  }
    
} else {
  echo '<p>Something went wrong</p>';
}

?>