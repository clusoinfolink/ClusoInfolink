import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AccountRequest from '@/lib/models/AccountRequest';
import AccountRequestDocument from '@/lib/models/AccountRequestDocument';

const MAX_FILE_BYTES = 10 * 1024 * 1024;

const companyDocMimeTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
]);

const requirementDocMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function missingRequired(body: Record<string, unknown>) {
  const requiredKeys = [
    'companyName',
    'companyAddress1',
    'companyCity',
    'companyState',
    'companyPin',
    'invoiceEmail',
    'billingAddress1',
    'billingCity',
    'billingState',
    'billingPin',
    'firstName',
    'lastName',
    'designation',
    'contactEmail',
    'mobileNumber',
    'heardAbout',
    'backgroundsPerYear',
    'industry',
  ];

  return requiredKeys.filter((key) => {
    const value = body[key];
    return typeof value !== 'string' || !value.trim();
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const getString = (key: string) => String(formData.get(key) || '').trim();
    const getBoolean = (key: string) => formData.get(key) === 'on' || formData.get(key) === 'true';

    const submissionType = getString('submissionType') === 'draft' ? 'draft' : 'submitted';

    const body: Record<string, unknown> = {
      companyName: getString('companyName'),
      companyAddress1: getString('companyAddress1'),
      companyAddress2: getString('companyAddress2'),
      companyCity: getString('companyCity'),
      companyState: getString('companyState'),
      companyPin: getString('companyPin'),
      companyCountry: getString('companyCountry'),
      gstin: getString('gstin'),
      cin: getString('cin'),

      billingSameAsCompany: getBoolean('billingSameAsCompany'),
      invoiceEmail: getString('invoiceEmail'),
      billingAddress1: getString('billingAddress1'),
      billingAddress2: getString('billingAddress2'),
      billingCity: getString('billingCity'),
      billingState: getString('billingState'),
      billingPin: getString('billingPin'),
      billingCountry: getString('billingCountry'),

      firstName: getString('firstName'),
      lastName: getString('lastName'),
      designation: getString('designation'),
      contactEmail: getString('contactEmail'),
      officePhone: getString('officePhone'),
      mobileNumber: getString('mobileNumber'),
      whatsappNumber: getString('whatsappNumber'),

      heardAbout: getString('heardAbout'),
      referredBy: getString('referredBy'),
      backgroundsPerYear: getString('backgroundsPerYear'),
      promoCode: getString('promoCode'),
      industry: getString('industry'),

      checks: formData.getAll('checks').map((item) => String(item)).filter((item) => item.trim().length > 0),
      customRequirements: getString('customRequirements'),
    };

    const getValidFiles = (values: FormDataEntryValue[]) => {
      return values
        .filter((value): value is File => value instanceof File)
        .filter((file) => Boolean(file.name) && file.size > 0);
    };

    const companyDocuments = getValidFiles(formData.getAll('companyDocuments'));
    const requirementDocuments = getValidFiles(formData.getAll('requirementDocuments'));

    if (companyDocuments.length > 5) {
      return NextResponse.json({ error: 'Maximum 5 company documents allowed' }, { status: 400 });
    }

    if (requirementDocuments.length > 5) {
      return NextResponse.json({ error: 'Maximum 5 requirement documents allowed' }, { status: 400 });
    }

    for (const file of companyDocuments) {
      if (!companyDocMimeTypes.has(file.type)) {
        return NextResponse.json({ error: `Invalid company document type: ${file.name}` }, { status: 400 });
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `Company document exceeds 10 MB limit: ${file.name}` }, { status: 400 });
      }
    }

    for (const file of requirementDocuments) {
      if (!requirementDocMimeTypes.has(file.type)) {
        return NextResponse.json({ error: `Invalid requirement document type: ${file.name}` }, { status: 400 });
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `Requirement document exceeds 10 MB limit: ${file.name}` }, { status: 400 });
      }
    }

    if (submissionType === 'submitted') {
      const missing = missingRequired(body);
      if (missing.length > 0) {
        return NextResponse.json(
          { error: 'Validation failed', missingFields: missing },
          { status: 400 }
        );
      }
    }

    await dbConnect();

    const companyDocumentIds: string[] = [];
    const companyDocumentNames: string[] = [];
    const requirementDocumentIds: string[] = [];
    const requirementDocumentNames: string[] = [];

    for (const companyDocument of companyDocuments) {
      const createdDoc = await AccountRequestDocument.create({
        filename: companyDocument.name,
        mimeType: companyDocument.type,
        size: companyDocument.size,
        data: Buffer.from(await companyDocument.arrayBuffer()),
        kind: 'company',
      });
      companyDocumentIds.push(createdDoc._id.toString());
      companyDocumentNames.push(companyDocument.name);
    }

    for (const requirementDocument of requirementDocuments) {
      const createdDoc = await AccountRequestDocument.create({
        filename: requirementDocument.name,
        mimeType: requirementDocument.type,
        size: requirementDocument.size,
        data: Buffer.from(await requirementDocument.arrayBuffer()),
        kind: 'requirement',
      });
      requirementDocumentIds.push(createdDoc._id.toString());
      requirementDocumentNames.push(requirementDocument.name);
    }

    const payload = {
      companyName: String(body.companyName || ''),
      companyAddress1: String(body.companyAddress1 || ''),
      companyAddress2: String(body.companyAddress2 || ''),
      companyCity: String(body.companyCity || ''),
      companyState: String(body.companyState || ''),
      companyPin: String(body.companyPin || ''),
      companyCountry: String(body.companyCountry || ''),
      gstin: String(body.gstin || ''),
      cin: String(body.cin || ''),
      companyDocumentName: companyDocumentNames[0] || '',
      companyDocumentId: companyDocumentIds[0] || null,
      companyDocumentNames,
      companyDocumentIds,

      billingSameAsCompany: Boolean(body.billingSameAsCompany),
      invoiceEmail: String(body.invoiceEmail || ''),
      billingAddress1: String(body.billingAddress1 || ''),
      billingAddress2: String(body.billingAddress2 || ''),
      billingCity: String(body.billingCity || ''),
      billingState: String(body.billingState || ''),
      billingPin: String(body.billingPin || ''),
      billingCountry: String(body.billingCountry || ''),

      firstName: String(body.firstName || ''),
      lastName: String(body.lastName || ''),
      designation: String(body.designation || ''),
      contactEmail: String(body.contactEmail || ''),
      officePhone: String(body.officePhone || ''),
      mobileNumber: String(body.mobileNumber || ''),
      whatsappNumber: String(body.whatsappNumber || ''),

      heardAbout: String(body.heardAbout || ''),
      referredBy: String(body.referredBy || ''),
      backgroundsPerYear: String(body.backgroundsPerYear || ''),
      promoCode: String(body.promoCode || ''),
      industry: String(body.industry || ''),

      checks: Array.isArray(body.checks)
        ? body.checks.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        : [],
      customRequirements: String(body.customRequirements || ''),
      requirementDocumentName: requirementDocumentNames[0] || '',
      requirementDocumentId: requirementDocumentIds[0] || null,
      requirementDocumentNames,
      requirementDocumentIds,

      submissionType,
      read: false,
    };

    const created = await AccountRequest.create(payload);

    return NextResponse.json(
      { success: true, id: created._id, submissionType: created.submissionType },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
