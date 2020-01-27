import { days, months } from '../constants';

export const getDate = (date?: string | Date) => {
	const dt = date ? new Date(date) : new Date();
	return (
		(dt.getMonth() + 1).toString() +
		'/' +
		dt.getDate().toString() +
		'/' +
		dt
			.getFullYear()
			.toString()
			.substr(-2)
	);

};

export const getDateYearFirst = (date?: string | Date) => {
	// TODO: Need a fix for dates.  Currently dates are returned in UTC
	// and are showing on the wrong day
	if (typeof date === 'string' && date.indexOf('T00:00:00')) {
		date = date.replace('T00:00:00', 'T05:00:00');
	}
	const dt = date ? new Date(date) : new Date();
	return (
		dt.getFullYear().toString() +
		'-' +
		('0' + (dt.getMonth() + 1)).slice(-2) +
		'-' +
		('0' + dt.getDate()).slice(-2)
	);
};

export const formatDollar = (amount: number) =>
	amount || amount === 0 ? '$' + amount.toFixed(2).toString() : '?';

export const safeGet = <T>(getFn: () => T, defaultValue: any) => {
	try {
		return getFn();
	} catch {
		return defaultValue;
	}
};

export const getDayFromDate = (date: string) => {
	const dt = new Date(date);
	return dt.getDate();
};

export const getFullDate = (date: Date) => {
	return (
		days[date.getDay()] +
		'. ' +
		months[date.getMonth()] +
		' ' +
		date.getDate() +
		', ' +
		date.getFullYear()
	);
};

export const getChangeMonth = (month: any) => {
	const month_eng: string[] = [
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
	return month_eng[month];
};
