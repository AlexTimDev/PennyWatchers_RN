export interface ReceiptRequest {
	username: string;
	password: string;
	date: string;
	keywords: string;
	photos: any[];
	receiptID?: number;
	personId?: number;
	expenseID?: number;
}

export interface ReceiptResponse {
	ReceiptID: number;
	PersonID: number | null;
	ExpenseID: number | null;
	ReceiptDate: string;
	KeyWords: string;
	Name: string | null;
	ExpenseType: string | null;
	ImageCount: number | null;
	ErrorCode: number;
	ErrorMessage: string | null;
}

export interface ReceiptImageRequest {
	username: string;
	password: string;
	receiptID: number;
	photos: any[];
}

export interface ReceiptImageResponse {
	ReceiptImageID: number;
	ReceiptID: number;
	ReceiptImage: string;
	ReceiptImageType?: string;
	ErrorCode: number;
	ErrorMessage: string | null;
}

export interface ReceiptListRequest {
	username: string;
	password: string;
	keywords?: string;
	month?: string;
	year?: string;
}

export interface ReceiptListResponse {
	ReceiptList: Receipt[];
	ErrorCode: number;
	ErrorMessage: string;
}

export interface Receipt {
	ReceiptID: number;
	PersonID: number;
	ExpenseID: number;
	ReceiptDate: string;
	KeyWords: string;
	Name: string;
	ExpenseType: string;
	ImageCount: string;
	ErrorCode: number;
	ErrorMessage: string;
}

export interface ReceiptImagesRequest {
	username: string;
	password: string;
	ReceiptID: number;
}

export interface ReceiptImagesResponse {
	ReceiptImageList: ReceiptImageResponse[];
	ErrorCode: number;
	ErrorMessage: string;
}
