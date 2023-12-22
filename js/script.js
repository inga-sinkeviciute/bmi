document.addEventListener('DOMContentLoaded', function () {
	let lang = lang_en;

	function updateContent() {
		document.querySelector('.display-5').textContent = lang.title;
		document.querySelector('.lead').textContent = lang.description;
		document.querySelector('label[for="height"]').textContent =
			lang.heightLabel;
		document.querySelector('label[for="weight"]').textContent =
			lang.weightLabel;
		document.querySelector('.check').textContent = lang.calculateBtn;
		document.querySelector('.clear').textContent = lang.clearBtn;
		document.querySelector('.text-message').textContent = lang.startCalculating;
		document.querySelector('#selectedLanguage').textContent = lang.code; // Set the selected language in the span
	}

	updateContent();

	window.setLanguage = function (language) {
		lang = language === 'en' ? lang_en : language === 'lt' ? lang_lt : lang_en;
		updateContent();
	};

	const displayMessage = function (message) {
		document.querySelector('.text-message').textContent = message;
	};

	const showClearButton = function () {
		document.querySelector('.clear').style.display = 'block';
	};

	const eventHandler = function () {
		const heightInCentimeters = Number(
			document.querySelector('.height-input').value
		);
		const weightNum = Number(document.querySelector('.weight-input').value);

		if (!heightInCentimeters || !weightNum) {
			displayMessage(lang.enterBothValues);
		} else {
			const bmiIndex = weightNum / Math.pow(heightInCentimeters / 100, 2);

			if (bmiIndex <= 18.5) {
				document.querySelector('body').style.backgroundColor = 'yellow';
				displayMessage(lang.underweightMessage + ' ' + bmiIndex.toFixed(2));
			} else if (bmiIndex >= 18.5 && bmiIndex <= 24.9) {
				document.querySelector('body').style.backgroundColor = 'green';
				displayMessage(lang.normalMessage + ' ' + bmiIndex.toFixed(2));
			} else if (bmiIndex >= 25 && bmiIndex <= 29.9) {
				document.querySelector('body').style.backgroundColor = 'orange';
				displayMessage(lang.overweightMessage + ' ' + bmiIndex.toFixed(2));
			} else {
				document.querySelector('body').style.backgroundColor = 'red';
				displayMessage(lang.aboveNormalMessage + ' ' + bmiIndex.toFixed(2));
			}
			showClearButton();
		}
	};

	document.querySelector('.check').addEventListener('click', eventHandler);

	document.querySelector('.clear').addEventListener('click', function () {
		document.querySelector('.height-input').value = '0.00';
		document.querySelector('.weight-input').value = '0';
		document.querySelector('body').style.backgroundColor = 'white';
		displayMessage(lang.startCalculating);
		document.querySelector('.clear').style.display = 'none';
	});
});
