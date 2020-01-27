import { baseURL } from '../../config';

export const getInformation = (
	username: string,
	password: string,
	startDate: string,
	endDate: string,
): Promise<Response> => {
	const url =
		baseURL +
		`/Information/GetInformation/?username=${username}&password=${password}&startDate=${startDate}&endDate=${endDate}`;
	return fetch(url);
};

export const getInformationSearch = (
	username: string,
	password: string,
	searchTerm: string,
): Promise<Response> => {
	const url =
		baseURL +
		`/Information/GetInformation/?username=${username}&password=${password}&searchString=${searchTerm}`;
	return fetch(url);
};
