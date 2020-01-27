export interface ModalMessage {
	message?: string;
	modalType?: 'success' | 'error' | 'progress' | 'delete';
	okayAction?: any;
	cancelAction?: any;
	okayLabel?: string;
	cancelLabel?: string;
}
