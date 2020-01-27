import { baseURL } from '../../config';
import { BillRequest } from './types';
import { urlHeaders } from '../../constants';

export const saveBill = (billRequest: BillRequest): Promise<Response> => {
	const { username, password, ...request } = billRequest;
	const body = JSON.stringify({ ...request });

	const url =
		baseURL + `/Bill/SaveBill?username=${username}&password=${password}`;
	return fetch(url, { method: 'POST', body, headers: urlHeaders });
};

export const deleteBill = (
	username: string,
	password: string,
	billID: number,
): Promise<Response> => {
	const url =
		baseURL +
		`/Bill/DeleteBill?username=${username}&password=${password}&billID=${billID}`;
	return fetch(url);
};
