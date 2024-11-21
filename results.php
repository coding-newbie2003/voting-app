<?php
$conn = new mysqli('', '', '', '');

// 接続時にUTF-8を設定
$conn->set_charset('utf8mb4');

if ($conn->connect_error) {
    die('Unable to connect to the database. Please try again later.');
}

// データを取得
$result = $conn->query('SELECT topic_id, option_name, vote_count FROM votes');
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data); // 結果をJSON形式で返す
$conn->close();
?>
