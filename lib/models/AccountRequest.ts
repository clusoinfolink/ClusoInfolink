import mongoose, { Schema } from 'mongoose';

const AccountRequestSchema = new Schema(
  {
    companyName: { type: String, default: '' },
    companyAddress1: { type: String, default: '' },
    companyAddress2: { type: String, default: '' },
    companyCity: { type: String, default: '' },
    companyState: { type: String, default: '' },
    companyPin: { type: String, default: '' },
    companyCountry: { type: String, default: 'India' },
    gstin: { type: String, default: '' },
    cin: { type: String, default: '' },
    companyDocumentName: { type: String, default: '' },
    companyDocumentId: { type: Schema.Types.ObjectId, ref: 'AccountRequestDocument', default: null },
    companyDocumentNames: [{ type: String }],
    companyDocumentIds: [{ type: Schema.Types.ObjectId, ref: 'AccountRequestDocument' }],

    billingSameAsCompany: { type: Boolean, default: false },
    invoiceEmail: { type: String, default: '' },
    billingAddress1: { type: String, default: '' },
    billingAddress2: { type: String, default: '' },
    billingCity: { type: String, default: '' },
    billingState: { type: String, default: '' },
    billingPin: { type: String, default: '' },
    billingCountry: { type: String, default: 'India' },

    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    designation: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    officePhone: { type: String, default: '' },
    mobileNumber: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },

    heardAbout: { type: String, default: '' },
    referredBy: { type: String, default: '' },
    backgroundsPerYear: { type: String, default: '' },
    promoCode: { type: String, default: '' },
    industry: { type: String, default: '' },

    checks: [{ type: String }],
    customRequirements: { type: String, default: '' },
    requirementDocumentName: { type: String, default: '' },
    requirementDocumentId: { type: Schema.Types.ObjectId, ref: 'AccountRequestDocument', default: null },
    requirementDocumentNames: [{ type: String }],
    requirementDocumentIds: [{ type: Schema.Types.ObjectId, ref: 'AccountRequestDocument' }],

    submissionType: {
      type: String,
      enum: ['draft', 'submitted'],
      default: 'submitted',
      index: true,
    },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

AccountRequestSchema.index({ createdAt: -1 });

export default mongoose.models.AccountRequest || mongoose.model('AccountRequest', AccountRequestSchema);
