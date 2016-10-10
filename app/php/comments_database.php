<?php

require_once '../../vendor/autoload.php';

Class CommentsDatabase {
	private $options = array(
 		'user'    => 'root',
 		'pass'    => 'root',
 		'db'      => 'page_with_comments'
  	);

	private $safeDb;

	function __construct() {
		$this->safeDb = new SafeMySQL($this->options);
		if (!$this->isTableExists()) {
			$sql = '
  				CREATE TABLE comment (
  				id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  				pid INT NOT NULL,
  				author TINYTEXT NOT NULL,
  				datetime DATETIME NOT NULL,
  				text TEXT NOT NULL
			)';
  			$this->safeDb->query($sql);
  		}
	}

	public function isTableExists() {
		$query = $this->safeDb->query("SHOW TABLES LIKE ?s", 'comment');
		$numRows = $this->safeDb->numRows($query);
		return ($numRows > 0) ? true : false;
	}

	public function read() {
		return $this->safeDb->getAll("SELECT * FROM ?n", 'comment');
	}

	public function write($pid, $author, $datetime, $text) {
		$sql = '
			INSERT INTO comment (pid, author, datetime, text)
			VALUES (?s,?s,?s,?s)
		';
		$this->safeDb->query($sql, $pid, $author, $datetime, $text);
	}
}