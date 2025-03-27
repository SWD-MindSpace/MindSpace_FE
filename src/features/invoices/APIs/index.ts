import { get } from '@/lib/apiCaller';
import { InvoiceQueryParams } from '../schemas/Invoice';
const invoiceEndpoint = '/api/v1/invoices';

export const getInvoiceList = async (searchParams: InvoiceQueryParams) => {
    return get(`${invoiceEndpoint}`, searchParams)
}