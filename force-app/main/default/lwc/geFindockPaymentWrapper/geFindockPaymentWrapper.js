import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/**
 * LWC: geFindockPaymentWrapper
 * - Hosts a Flow that renders the FinDock payment component
 * - Passes giftTransactionId to the Flow as an input variable
 */
export default class GiftEntryTributePostSave extends LightningElement {

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

    /**
     * Required input property.
     * Contains objects for templateConfig and recordId for navigation
     */
    @api configuration;

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

    // record-edit-form bindings
    giftTransactionField = GIFT_TRANSACTION_FIELD;

    @track isSubmitting = false;
    @track errorMessage;

    get hasGiftTransaction() {
        return !!this.giftTransactionId;
    }

    // Ensure defaults and set hidden values on submit
    handleSubmit(event) {
        this.isSubmitting = true;
        this.errorMessage = undefined;

        // Prevent default submit to inject default values
        event.preventDefault();

        // Clone and enforce defaults
        const fields = { ...event.detail.fields };

        // Set hidden GiftTransaction if provided via @api
        if (this.giftTransactionId) {
            fields[GIFT_TRANSACTION_FIELD.fieldApiName] = this.giftTransactionId;
        }

        // Submit updated fields
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event) {
        this.isSubmitting = false;
        this.errorMessage = undefined;
        // Show a success toast using platform event
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Payment Component executed succesfully!',
                variant: 'success'
            })
        );

        this.closeModal();
       
    }

    handleError(event) {
        this.isSubmitting = false;
        // LDS error object includes detail; surface friendly message where possible
        const err = event.detail;
        this.errorMessage =
            (err && (err.message || err.detail || (err.output && err.output.errors && err.output.errors[0] && err.output.errors[0].message))) ||
            'An unexpected error occurred while executing the <your error message>.';

        // Show an error toast using platform event
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Failed to execute Payment Component: ' + this.errorMessage,
                variant: 'error'
            })
        );

    }

    handleCancel() {
       this.closeModal();
    }

    /**
     * Close the modal (emit custom event)
     */
    closeModal() {
        console.log('** in close modal');
        this.dispatchEvent(new CustomEvent('closemodal', {
            detail: {
                componentName: 'c/geFinDockPaymentWrapper'
            }
        }));
    }

/* toast helper removed; using ShowToastEvent directly */

}
