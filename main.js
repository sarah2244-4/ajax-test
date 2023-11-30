function getData(url, cb) {
	var xhr = new XMLHttpRequest(); // Extensible markup language precursor to json

	xhr.open("GET", url); // Retrieve data from API server

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

function generatePaginationButtons(next, prev) {
	if (next && prev) {
		return `<button onclick="writeToDocument('${prev}')">Previous</button>
		<button onclick="writeToDocument('${next}')">Next</button>`;
	} else if (next && !prev) {
		return `<button onclick="writeToDocument('${next}')">Next</button>`;
	} else if (!next && prev) {
		return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
	}
}

function writeToDocument(url) {
	var tableRows = [];
	var el = document.getElementById("data");
	el.innerHTML = "";

	getData(url, function (data) {
		var pagination;
		if (data.next || data.previous) {
			pagination = generatePaginationButtons(data.next, data.previous);
		}

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

		el.innerHTML =
			`<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(
				/,/g,
				" "
			); // Creating table, / = replace, g = all instances of comma
	});
} // prints [object] to screen
