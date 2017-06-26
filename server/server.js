const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', function (req, res) {
	res.sendFile('/home/pi/webmonitor/server/shell.html');
});

app.get('/assets/style.css', function (req, res) {
	res.sendFile('/home/pi/webmonitor/server/assets/style.css');
});

app.get('/assets/serverCheck.js', function (req, res) {
	res.sendFile('/home/pi/webmonitor/server/assets/serverCheck.js');
});

app.get('/get-status', function (req, res) {
	fs.readdir('/home/pi/webmonitor/status', function (err, files) {
		var statuses = [];

		files.forEach(function (file) {
			var fileNameInfo = file.replace(".status", "").split('_');

			var status = {
				'name': fileNameInfo[0],
				'status': fileNameInfo[1],
				'responseTime': (fileNameInfo[2] !== "") ? fileNameInfo[2] : '?'
			};

			statuses.push(status);
		});

		res.send(JSON.stringify(statuses));
	});
});

app.get('/get-error', function (req, res) {
	var errors = [],
		dir = '/home/pi/webmonitor/error/',
		files = fs.readdirSync(dir);

	files.sort(function(a, b) {
    	return fs.statSync(dir + a).mtime.getTime() - fs.statSync(dir + b).mtime.getTime();
	}).slice(Math.max(files.length - 5, 1));

	files.reverse().forEach(function (file) {
		var fileInfo = fs.readFileSync(dir + file, 'utf8');
		var content = fileInfo.split('\n').reverse();
		var errorsFromThisFile = { 'errorFileName': file.replace(".csv", ""), 'errors': [] };

		content.forEach(function (row) {
			if (row === "") return;

			var rowInfo = row.split(';');

			var error = {
				'time': rowInfo[0],
				'message': rowInfo[2],
				'monitorName': rowInfo[3],
				'url': rowInfo[4],
				'responseTime': rowInfo[5]
			};

			errorsFromThisFile.errors.push(error);
		});

		errors.push(errorsFromThisFile);
	});

	res.send(JSON.stringify(errors));
});

app.listen(3000, function () {
	console.log('Starting web server');
});
