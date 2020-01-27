export const urlHeaders = {
	'Content-Type': 'application/json',
	'cache-control': 'no-cache',
};

export const colors = {
	DARK_GRAY: '#666',
	LIGHT_GRAY: '#F8F8F8',

	DARK_GREEN: '#658421',
	LIGHT_GREEN: '#DBEFAE',

	DARK_PURPLE: '#8C0883',
	LIGHT_PURPLE: '#FFD8FC',

	DARK_BLUE: '#0B3954',
	LIGHT_BLUE: '#BFDFF2',

	DARK_ORANGE: '#F44336',
	LIGHT_ORANGE: '#F4CDCB',

	PRIMARY: '#77bcc1',
	LIGHT_PRIMARY: '#F4FEFF',

	LIGHT_YELLOW: '#F1FFA3',
	DARK_YELLOW: '#D8F243',

	ERROR: '#8c0000',

	BLUE_GRAY: '#9EB7D6',
};

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const emailRegex = new RegExp(
	[
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/.source,
		/@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
			.source,
	].join(''),
);

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const frequencySource = [
	'Monthly',
	'Every Other Week',
	'Twice a month',
	'Weekly',
];
