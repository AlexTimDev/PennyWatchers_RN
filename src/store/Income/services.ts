import { baseURL } from '../../config';
import {
	SaveIncomeRequest,
	SaveIncomeListRequest,
	SaveOtherRequest,
	SaveDeductionRequest,
	GetDeductionRequest,
	ActualIncome,
	Income,
} from './types';
import { urlHeaders } from '../../constants';

export const getIncome = (
	username: string,
	password: string,
	month: string,
	year: string,
): Promise<Response> => {
	const url =
		baseURL +
		`/Income/GetIncomeScheduleItems?username=${username}&password=${password}` +
		`&IncomeMonth=${month}&IncomeYear=${year}`;
	return fetch(url);
};

export const saveIncome = (
	saveIncomeRequest: SaveIncomeRequest,
): Promise<Response> => {
	const {
		username,
		password,
		FrequencyID,
		GrossAmount,
		IncomeID,
		IncomeMonth,
		IncomeYear,
		Source,
	} = saveIncomeRequest;
	const url =
		baseURL +
		`/Income/SaveIncomeItem?username=${username}&password=${password}` +
		`&IncomeID=${IncomeID}&Source=${Source}&FrequencyID=${FrequencyID}` +
		`&IncomeYear=${IncomeYear}&IncomeMonth=${IncomeMonth}&GrossAmount=${GrossAmount}`;
	return fetch(url);
};
// updated by LJC
export const saveIncomeList = (
	saveIncomeListRequest: SaveIncomeListRequest,
): Promise<Response> => {
	const url =
		baseURL +
		'/Income/SaveIncomeSchedule?' +
		`username=${saveIncomeListRequest.username}&password=${saveIncomeListRequest.password}&incomeMonth=${saveIncomeListRequest.month}&incomeYear=${saveIncomeListRequest.year}`;

	const body = JSON.stringify({
		IncomeScheduleList: saveIncomeListRequest.IncomeList,
	});

	return fetch(url, { method: 'POST', body, headers: urlHeaders });
};

export const saveOther = (
	saveOtherRequest: SaveOtherRequest,
): Promise<Response> => {
	const url =
		baseURL +
		'/Income/SaveIncomeSchedule?' +
		`username=${saveOtherRequest.username}&password=${saveOtherRequest.password}&incomeMonth=${saveOtherRequest.month}&incomeYear=${saveOtherRequest.year}`;

	const body = JSON.stringify({
		IncomeScheduleList: saveOtherRequest.IncomeList,
	});
	return fetch(url, { method: 'POST', body, headers: urlHeaders });
};

// ------end---------

export const saveDeduction = (
	saveDeductionRequest: SaveDeductionRequest,
): Promise<Response> => {
	const {
		username,
		password,
		deductionAmount,
		deductionID,
		deductionType,
		incomeID,
	} = saveDeductionRequest;
	const url =
		baseURL +
		`/Income/SaveDeductionItem?username=${username}&password=${password}` +
		`&deductionID=${deductionID}&incomeID=${incomeID}&deductionType=${deductionType}` +
		`&deductionAmount=${deductionAmount}`;
	return fetch(url);
};

export const getDeduction = (
	getDeductionRequest: GetDeductionRequest,
): Promise<Response> => {
	const { username, password, incomeID } = getDeductionRequest;
	const url =
		baseURL +
		`/Income/GetDeductionItemList?username=${username}&password=${password}` +
		`&incomeID=${incomeID}`;
	return fetch(url);
};

export const saveActualIncome = (
	saveActualIncomeRequest: ActualIncome,
): Promise<Response> => {
	const { Password, ...request } = saveActualIncomeRequest;
	const body = JSON.stringify({ ...request });
	const url =
		baseURL +
		'/ActualIncome/SaveActualIncome?username=' +
		`${saveActualIncomeRequest.Username}&password=${Password}`;
	return fetch(url, { method: 'POST', body, headers: urlHeaders });
};

export const deleteActualIncome = (
	username: string,
	password: string,
	ActualIncomeID: number,
): Promise<Response> => {
	const url =
		baseURL +
		'/ActualIncome/DeleteActualIncome' +
		`?username=${username}&password=${password}&ActualIncomeID=${ActualIncomeID}`;
	return fetch(url);
};

export const deleteIncome = (
	username: string,
	password: string,
	incomeID: number,
): Promise<Response> => {
	const url =
		baseURL +
		'/Income/DeleteIncome' +
		`?username=${username}&password=${password}&incomeID=${incomeID}`;
	return fetch(url);
};
