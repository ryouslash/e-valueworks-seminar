<?php
session_start(); // 先に呼び出す

$allowed_origin = 'https://seminar.e-valueworks.com';

// CORSチェック
if (!isset($_SERVER['HTTP_ORIGIN']) || $_SERVER['HTTP_ORIGIN'] !== $allowed_origin) {
  http_response_code(403);
  exit('Forbidden');
}

header("Access-Control-Allow-Origin: $allowed_origin");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!isset($_ENV['SMTP_HOST'], $_ENV['SMTP_USER'], $_ENV['SMTP_PASS'], $_ENV['SMTP_FROM'], $_ENV['SMTP_TO'], $_ENV['RECAPTCHA_SECRET_KEY'])) {
  http_response_code(500);
  exit('環境変数の読み込みに失敗しました。');
}

$json = file_get_contents("php://input");
$inputs = json_decode($json, true);

// CSRFトークン検証
if (!isset($_SESSION['csrf_token']) || !isset($inputs['csrf_token']) || $inputs['csrf_token'] !== $_SESSION['csrf_token']) {
  http_response_code(403);
  exit('Invalid CSRF Token');
}
unset($_SESSION['csrf_token']);

// reCAPTCHA検証
$recaptchaSecret = $_ENV['RECAPTCHA_SECRET_KEY'];
$recaptchaToken = $inputs['recaptcha_token'] ?? '';

$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaToken}");
$responseData = json_decode($response, true);

if (!$responseData['success'] || $responseData['score'] < 0.5) {
  http_response_code(403);
  exit('Bot detected');
}

$msg = "";
$labels = [
  'name' => 'お名前',
  'email' => 'メールアドレス',
  'contactTitle' => 'お問い合わせ件名',
  'contactMessage' => 'お問い合わせ詳細',
];


foreach ($labels as $key => $label) {
  if (!isset($inputs[$key])) continue;

  $safeValue = str_replace(["\r", "\n"], '', $inputs[$key]);
  $safeValue = htmlspecialchars($safeValue, ENT_QUOTES, 'UTF-8');

  $msg .= $label . "：" . $safeValue . "\n";
}

$mail = new PHPMailer(true);

/*
** 運営者宛メール本文
*/
try {
  $host = $_ENV['SMTP_HOST']; //メールサーバーホスト
  $username = $_ENV['SMTP_USER']; // SMTPユーザー
  $password = $_ENV['SMTP_PASS']; //SMTPパスワード
  $from = $_ENV['SMTP_FROM']; //差出人メールアドレス
  $fromname =  "E VALUE WORKS"; //差出人の名前
  $to = $_ENV['SMTP_TO']; //送信先メールアドレス
  //件名・本文
  $subject = "ホームページからのお問い合わせがありました";
  $body = <<<EOD
ホームページから以下の内容のお問い合わせがありました

--------------------
{$msg}
--------------------

対応をお願いいたします。

E VALUE WORKS
EOD;
  //メール設定
  $mail->isSMTP();
  $mail->SMTPAuth = true;
  $mail->Host = $host;
  $mail->Username = $username;
  $mail->Password = $password;
  $mail->SMTPSecure = "tls";
  $mail->Port = 587;
  $mail->CharSet = "utf-8";
  $mail->Encoding = "base64";
  $mail->setFrom($from, $fromname);
  $mail->addAddress($to);
  $mail->Subject = $subject;
  $mail->Body    = $body;
  //メール送信
  if ($mail->send()) {
    echo "送信完了";
  } else {
    echo "送信失敗: " . $mail->ErrorInfo;
  }
} catch (Exception $e) {
  echo "送信失敗: " . $mail->ErrorInfo;
}
exit();
