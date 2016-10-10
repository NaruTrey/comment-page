# comment-page
 Тестовое задание, страница с комментариями.

## Установка
Перед установкой убедитесь, что у вас глобально установлены **npm** и **composer**.

1.  В  MySQL  создайте базу данных **page_with_comments** с **COLLATION**  *utf8_bin*;
2. Клонируйте репозитории **comment-page**:

 ```
 git clone https://github.com/NaruTrey/comment-page.git
 ```
3. Откройте  *app/php/comments_database.php*  и  в блоке кода:

 ```php
 	private $options = array(
 		'user'    => 'root',
 		'pass'    => 'root',
 		'db'      => 'page_with_comments'
  	);
 ```
   введите свои  *user*  и *pass*;
4. Перейдите в  корневую папку проекта и установите зависимости с помощью  NPM:

 ```
 npm install
 ```

##  Запуск
   В корневой папке проекта запустите *gulp*
 
 ```
 gulp
 ```
