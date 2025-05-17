<?php
session_start();
$token = bin2hex(random_bytes(32));
$_SESSION['csrf_token'] = $token;

header('Content-Type: application/json');
echo json_encode(['csrf_token' => $token]);
exit();
