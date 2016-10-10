<?php
require_once 'comments_database.php';
require_once 'tree.php';

try {
	$db = new CommentsDatabase();
	if (isset($_POST['author'])) {
		$db->write($_POST['pid'],$_POST['author'], date('Y-m-d H:i:s'),$_POST['message']);
	}
	echo "
		<div id='reply-0' class='ballon reply'>
			<form name='formAddCommentButton' method='post'>
				<input type='submit' value='Добавить комментарий'>
			</form>
		</div>
	";
	$data = $db->read();
	$tree = createTree($data);
	treePrint($tree, 20);
} catch (Exception $e) {
	$error_message = $e->getMessage();
	echo "
		<div class='ballon error'>
			$error_message;
		</div>
	";
}

function treePrint($tree, $limit, $pid = 0) {
	if (empty($tree[$pid])) return;
	for($k = count($tree[$pid]) - 1; $k >= 0; --$k) {
		$row = $tree[$pid][$k];
		if ($limit <= 0) break;
		if ($pid == 0) {
			echo "<div class='ballon'>";
			--$limit;
		} else {
			echo "<div class='comment'>";
		}
		echo "<div class='author'>" . $row['author'] . "</div>";
		echo "<div class='date'>" . date_create($row['datetime'])->format('d.m.Y H:i:s') . "</div>";
		echo "<br><hr>";
		echo $row['text'] . "<br>";
		echo "<a href='' class='reply' id='reply-" . $row['id'] . "'>ответить</a>";
		echo '<div></div>';
		if (isset($tree[$row['id']])) {
			treePrint($tree, $limit, $row['id']);
		}
		echo '</div>';
	}
}