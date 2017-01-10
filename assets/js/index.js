function success(response) {
	console.log(response);
}

function error(cause) {
	console.log(cause);
}

function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(JSON.parse(xhr.responseText));
			} else {
				if (error)
					error(xhr);
			}
		}
	}
	xhr.open("GET", path, true);
	xhr.send();
}

var request = "http://localhost:4000/users";
loadJSON(request, success, error);
