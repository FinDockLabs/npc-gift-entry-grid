import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/**
 * LWC: geFindockPaymentWrapper
 * - Hosts a Flow that renders the FinDock payment component
 * - Passes giftTransactionId to the Flow as an input variable
 */
export default class GiftEntryFinDockPaymentWrapper extends LightningElement {

    /**
     * Required input property.
     * Contains all the data for the row.
     */
    @api
    set rowData(value) {
        this._rowData = value || {};
        this.initializeFields();
    }
    get rowData() {
        return this._rowData;
    }

    // Public API: Gift Transaction to link tribute to (hidden field)
    @api giftTransactionId;

    // Public API: Gift Commitment Id to pass to Flow
    @api giftCommitmentId;

    // Provide flow input variables array to lightning-flow
    get flowInputVariables() {
        // The Flow must define variables with these API names (case-sensitive),
        // dataType=String (or Id) and isAvailableForInput=true.
        // Variables: giftTransactionId, giftCommitmentId
        const inputs = [];
        if (this.giftTransactionId) {
            inputs.push({
                name: 'giftTransactionId',
                type: 'String',
                value: this.giftTransactionId
            });
        }
        if (this.giftCommitmentId) {
            inputs.push({
                name: 'giftCommitmentId',
                type: 'String',
                value: this.giftCommitmentId
            });
        }
        return inputs;
    }


    connectedCallback() {
        this.initializeFields();
    }

     /**
     * Initialize form fields with data from rowData
     */
    initializeFields() {
        console.log('** in initialize fields.');
        // Prefer explicit properties if provided, otherwise fall back to rowData
        this.giftTransactionId = this.giftTransactionId || this._rowData?.GiftTransactionId || this._rowData?.giftTransactionId;
        this.giftCommitmentId = this.giftCommitmentId || this._rowData?.GiftCommitmentId || this._rowData?.giftCommitmentId;
        console.log('** gift transaction id: ' + (this.giftTransactionId || 'N/A'));
        console.log('** gift commitment id: ' + (this.giftCommitmentId || 'N/A'));
    }

}
