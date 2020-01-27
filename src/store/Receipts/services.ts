import { baseURL } from '../../config';
import {
	ReceiptRequest,
	ReceiptImageRequest,
	ReceiptListRequest,
	ReceiptImagesRequest,
} from './types';
import { urlHeaders } from '../../constants';

export const saveReceipt = (
	receiptRequest: ReceiptRequest,
): Promise<Response> => {
	const body = JSON.stringify({
		ReceiptID: receiptRequest.receiptID || 0,
		PersonID: receiptRequest.personId,
		KeyWords: receiptRequest.keywords,
		ReceiptDate: receiptRequest.date,
		ExpenseID: receiptRequest.expenseID,
	});

	const url =
		baseURL +
		`/Receipts/AddEditReceipt?username=${receiptRequest.username}&password=${receiptRequest.password}`;
	return fetch(url, { method: 'POST', body, headers: urlHeaders });
};

export const saveReceiptImage = async (
	request: ReceiptImageRequest,
): Promise<string | Error> => {
	try {
		const url =
			baseURL +
			`/Receipts/AddReceiptImage?username=${request.username}&password=${request.password}`;

		for (const photo of request.photos) {
			await fetch(url, {
				body: JSON.stringify({
					ReceiptID: String(request.receiptID),
					ReceiptImage: photo.ReceiptImage,
				}),
				method: 'POST',
				headers: urlHeaders,
			});
		}
		return 'success';
	} catch (err) {
		return new Error(err);
	}
};

export const getReceipts = (
	receiptListRequest: ReceiptListRequest,
): Promise<Response> => {
	const keywords = receiptListRequest.keywords
		? encodeURI(receiptListRequest.keywords)
		: encodeURI('%');
	let url =
		baseURL +
		`/Receipts/GetReceiptList?username=${receiptListRequest.username}&password=${receiptListRequest.password}` +
		`&keywords=${keywords}`;

	if (!!receiptListRequest.month && !!receiptListRequest.year) {
		url =
			url +
			`&month=${receiptListRequest.month}&year=${receiptListRequest.year}`;
	}
	return fetch(url);
};

export const getReceiptImages = (
	receiptImageRequest: ReceiptImagesRequest,
): Promise<Response> => {
	const url =
		baseURL +
		`/Receipts/GetReceiptImages?username=${receiptImageRequest.username}&password=${receiptImageRequest.password}` +
		`&receiptID=${receiptImageRequest.ReceiptID}`;
	return fetch(url);
};

export const deleteReceipt = (
	username: string,
	password: string,
	ReceiptID: number,
): Promise<Response> => {
	const url =
		baseURL +
		'/Receipts/DeleteReceipt' +
		`?username=${username}&password=${password}&ReceiptID=${ReceiptID}`;
	return fetch(url, { method: 'POST', body: undefined, headers: urlHeaders });
};
