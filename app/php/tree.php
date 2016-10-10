<?php
function createTree($data) {
	$tree = array();
	foreach ($data as $row) {
   		$tree[(int) $row['pid']][] = $row;
	}
	return $tree;
}