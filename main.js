const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
	var xhr = new XMLHttpRequest(); // Extensible markup language precursor to json

	xhr.open("GET", baseURL + type + "/"); // Retrieve data from API server

	xhr.send(); // Send request

	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			cb(JSON.parse(this.responseText));
		}
	};

	// Ready state 4 = DONE (operation completed), status 200 = OK
	// Change HTML to response from API object
}

function getTableHeaders(obj) {
	var tableHeaders = [];

	Object.keys(obj).forEach(function (key) {
		tableHeaders.push(`<td>${key}</td>`);
	});

	return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
	var tableRows = [];
	var el = document.getElementById("data");
	el.innerHTML = "";

	getData(type, function (data) {
		console.dir(data); // dir = directory (can browse through object and see format) gives array called results & pagination
		data = data.results;
		var tableHeaders = getTableHeaders(data[0]);

		data.forEach(function (item) {
			var dataRow = [];

			Object.keys(item).forEach(function (key) {
				var rowData = item[key].toString();
				var truncatedData = rowData.substring(0, 15);
				dataRow.push(`<td>${truncatedData}</td>`);
			});
			tableRows.push(`<tr>${dataRow}</tr>`);
		});

		el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`; // Creating table
	});
} // prints [object] to screen
