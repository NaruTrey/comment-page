var request = new XMLHttpRequest(),
	formAddComment,
	formAddCommentPlaceholder;

request.onreadystatechange = function() {
	if (request.readyState == 4) {
		document.body.innerHTML = request.responseText;

		var elementsClassesReply = document.getElementsByClassName('reply');

  		for(var i = 0; i < elementsClassesReply.length; ++i) {
  			elementsClassesReply[i].addEventListener("click", clickReply);
  		}
	}
};

sendRequest(null);

function clickReply(event) {
    event.preventDefault();
    if (formAddComment !== undefined && formAddComment.parentNode !== null) {
    	formAddComment.parentNode.removeChild(formAddComment);
    }
    if (formAddCommentPlaceholder !== undefined) {
    	formAddCommentPlaceholder.style.display = 'block';
    }
    formAddCommentPlaceholder = this;
    formAddCommentPlaceholder.style.display = 'none';
    formAddComment = createFormAddComment((this.id).replace('reply-', ''));
    this.parentNode.insertBefore(formAddComment, this);
    formAddComment.addEventListener("submit", function(event) {
    	event.preventDefault();
    	sendRequest(getRequestBody(document.getElementsByName('formAddComment')[0]));
    });
}

function createFormAddComment(id) {
	var container = document.createElement('div');
	container.innerHTML = "<div id='divAddComment' class='ballon'> \
	    	<form action='.' name='formAddComment' method='post'> \
	    		<input type='hidden' name='pid' value='" + id + "'> \
				<input type='text' name='author' placeholder='Имя' required><br> \
				<textarea name='message' placeholder='Комментарии' required></textarea><br> \
				<input type='submit' value='Отправить'> \
			</form> \
		</div> \
	";
	return container.firstChild;
}

/**
 *	Функция упаковки формы для отправки в POST в AJAX
 * 	Взято отсюда: https://jqbook.net.ru/ajax/post
 */
function getRequestBody(oForm) {
    var aParams = new Array();
    for(var i = 0; i < oForm.elements.length; i++) {
        var sParam = encodeURIComponent(oForm.elements[i].name);
        sParam += "=";
        sParam += encodeURIComponent(oForm.elements[i].value);
        aParams.push(sParam);
    }
    return aParams.join("&");
}

function sendRequest(uri) {
	request.open('POST', '/php/comments_ajax.php', true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(uri);

}