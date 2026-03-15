'use client';

import { useRef, useState } from 'react';

const indiaStatesAndUTs = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

const heardAboutOptions = [
  'NASSCOM event or communication',
  'CII or FICCI network',
  'NHRDN or SHRM India community',
  'Industry publication / media',
  'Search engine',
  'Existing client referral',
  'Social media',
  'Other',
];

const annualVolumeOptions = ['1-50 checks', '51-200 checks', '201-500 checks', '501-1,000 checks', '1,000+ checks'];

const industryOptions = [
  'Information Technology',
  'BFSI (Banking, Financial Services, Insurance)',
  'Healthcare and Pharmaceuticals',
  'Manufacturing',
  'Retail and E-commerce',
  'Staffing and Recruitment',
  'Education',
  'Logistics and Supply Chain',
  'Hospitality',
  'Other',
];

const backgroundChecks = [
  'Criminal Record Verification (Police)',
  'Court Record Search (District / High Court)',
  'Employment Verification (Past employers)',
  'Education Verification (Board / University)',
  'Identity Verification (Aadhaar, PAN, Voter ID)',
  'Address Verification (Physical / Digital)',
  'Professional Reference Check',
  'License / Certification Verification',
  'Credit / CIBIL Check',
  'Global Watchlist / Sanctions Check',
  'Social Media Screening',
  'Drug Test (as per applicable panel)',
  'Driving Licence Verification (RTO)',
  'Directorship / Company Association Check',
];

export function GetStartedRequestForm() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [billingSameAsCompany, setBillingSameAsCompany] = useState(false);
  const [companyFiles, setCompanyFiles] = useState<File[]>([]);
  const [requirementFiles, setRequirementFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<{ company: string; requirement: string }>({ company: '', requirement: '' });
  const companyInputRef = useRef<HTMLInputElement>(null);
  const requirementInputRef = useRef<HTMLInputElement>(null);

  function mergeFiles(existing: File[], incoming: File[]) {
    const merged = [...existing];

    for (const file of incoming) {
      const duplicate = merged.some(
        (item) =>
          item.name === file.name
          && item.size === file.size
          && item.lastModified === file.lastModified
      );
      if (!duplicate) merged.push(file);
      if (merged.length >= 5) break;
    }

    return merged;
  }

  function onCompanyFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;

    setCompanyFiles((prev) => {
      const next = mergeFiles(prev, picked);
      if (prev.length + picked.length > 5 || next.length === 5) {
        setFileError((curr) => ({ ...curr, company: 'Maximum 5 files allowed.' }));
      } else {
        setFileError((curr) => ({ ...curr, company: '' }));
      }
      return next;
    });

    e.target.value = '';
  }

  function onRequirementFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;

    setRequirementFiles((prev) => {
      const next = mergeFiles(prev, picked);
      if (prev.length + picked.length > 5 || next.length === 5) {
        setFileError((curr) => ({ ...curr, requirement: 'Maximum 5 files allowed.' }));
      } else {
        setFileError((curr) => ({ ...curr, requirement: '' }));
      }
      return next;
    });

    e.target.value = '';
  }

  function removeCompanyFile(index: number) {
    setCompanyFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError((curr) => ({ ...curr, company: '' }));
  }

  function removeRequirementFile(index: number) {
    setRequirementFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError((curr) => ({ ...curr, requirement: '' }));
  }

  function copyCompanyToBillingFields() {
    const fieldMap: Array<[string, string]> = [
      ['companyAddress1', 'billingAddress1'],
      ['companyAddress2', 'billingAddress2'],
      ['companyCity', 'billingCity'],
      ['companyState', 'billingState'],
      ['companyPin', 'billingPin'],
      ['companyCountry', 'billingCountry'],
    ];

    fieldMap.forEach(([fromId, toId]) => {
      const fromEl = document.getElementById(fromId) as HTMLInputElement | HTMLSelectElement | null;
      const toEl = document.getElementById(toId) as HTMLInputElement | HTMLSelectElement | null;
      if (!fromEl || !toEl) return;
      toEl.value = fromEl.value;
    });
  }

  function handleBillingSameAsCompanyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setBillingSameAsCompany(checked);
    if (checked) copyCompanyToBillingFields();
  }

  function handleCompanyAddressChange() {
    if (!billingSameAsCompany) return;
    copyCompanyToBillingFields();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const submissionType = submitter?.value === 'draft' ? 'draft' : 'submitted';

    setStatus('saving');
    setMessage('');

    const formData = new FormData(form);
    formData.set('submissionType', submissionType);
    formData.delete('companyDocument');
    formData.delete('requirementDocument');
    formData.delete('companyDocuments');
    formData.delete('requirementDocuments');

    companyFiles.forEach((file) => {
      formData.append('companyDocuments', file, file.name);
    });

    requirementFiles.forEach((file) => {
      formData.append('requirementDocuments', file, file.name);
    });

    const res = await fetch('/api/account-requests', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setStatus('success');
      setMessage(submissionType === 'draft' ? 'Draft saved successfully.' : 'Request submitted successfully.');
      if (submissionType === 'submitted') {
        form.reset();
        setCompanyFiles([]);
        setRequirementFiles([]);
        setFileError({ company: '', requirement: '' });
      }
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus('error');
      setMessage(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-[#f7fbff]">
      <section className="relative py-24 bg-gradient-to-br from-cluso-deep via-cluso-mid to-cluso-sky">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Cluso Account Request Form</h1>
          <p className="text-white/85 text-lg md:text-xl max-w-3xl mx-auto">
            Complete this form to set up your background verification account. All fields marked with an asterisk are required for processing.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="glass bg-white/90 p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/70 shadow-[0_20px_50px_rgba(59,123,214,0.15)] space-y-10">
            {message && (
              <div className={`rounded-xl border p-4 text-sm ${status === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                {message}
              </div>
            )}

            <div className="space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label><input id="companyName" name="companyName" required placeholder="Registered company name" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">GSTIN (if applicable)</label><input id="gstin" name="gstin" placeholder="22AAAAA0000A1Z5" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div className="md:col-span-2"><label htmlFor="companyAddress1" className="block text-sm font-medium text-gray-700 mb-1">Street Address 1 *</label><input id="companyAddress1" name="companyAddress1" required placeholder="Building no., street name" onChange={handleCompanyAddressChange} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div className="md:col-span-2"><label htmlFor="companyAddress2" className="block text-sm font-medium text-gray-700 mb-1">Street Address 2</label><input id="companyAddress2" name="companyAddress2" placeholder="Area, locality, landmark (optional)" onChange={handleCompanyAddressChange} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="companyCity" className="block text-sm font-medium text-gray-700 mb-1">City *</label><input id="companyCity" name="companyCity" required placeholder="City" onChange={handleCompanyAddressChange} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="companyState" className="block text-sm font-medium text-gray-700 mb-1">State / Union Territory *</label><select id="companyState" name="companyState" required defaultValue="" onChange={handleCompanyAddressChange} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50"><option value="" disabled>Select state / UT</option>{indiaStatesAndUTs.map((state) => <option key={state} value={state}>{state}</option>)}</select></div>
                <div><label htmlFor="companyPin" className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label><input id="companyPin" name="companyPin" required maxLength={6} inputMode="numeric" pattern="[0-9]{6}" placeholder="6-digit PIN code" onChange={handleCompanyAddressChange} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="companyCountry" className="block text-sm font-medium text-gray-700 mb-1">Country *</label><input id="companyCountry" name="companyCountry" required defaultValue="India" onChange={handleCompanyAddressChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div className="md:col-span-2"><label htmlFor="cin" className="block text-sm font-medium text-gray-700 mb-1">CIN / Registration Number *</label><input id="cin" name="cin" required placeholder="Company Identification Number" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">Company Documents</h2>
              <p className="text-sm text-gray-600">Upload any one of the following: GST Certificate, Certificate of Incorporation, MOA/AOA, Trade License, or MSME/Udyam Registration.</p>
              <div className="rounded-2xl border border-dashed border-cluso-mid/40 bg-cluso-sky/5 p-5">
                <label htmlFor="companyDocuments" className="block text-sm font-semibold text-cluso-deep mb-2">Click to upload document(s)</label>
                <input ref={companyInputRef} id="companyDocuments" name="companyDocuments" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={onCompanyFilesSelected} className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-cluso-deep file:px-4 file:py-2 file:text-white hover:file:bg-cluso-mid" />
                {fileError.company && <p className="mt-2 text-xs text-red-600">{fileError.company}</p>}
                {companyFiles.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {companyFiles.map((file, index) => (
                      <span key={`${file.name}-${file.lastModified}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-cluso-deep/20 bg-white px-3 py-1 text-xs text-gray-700">
                        {file.name}
                        <button type="button" onClick={() => removeCompanyFile(index)} className="text-red-600 hover:text-red-700" aria-label={`Remove ${file.name}`}>
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">No file chosen</p>
                )}
                <p className="mt-2 text-xs text-gray-500">PDF, JPG, PNG - max 10 MB each, up to 5 files</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">Invoicing Information</h2>
              <label className="inline-flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" name="billingSameAsCompany" checked={billingSameAsCompany} onChange={handleBillingSameAsCompanyChange} className="h-4 w-4 rounded border-gray-300 text-cluso-deep focus:ring-cluso-mid" />Billing address same as company address</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2"><label htmlFor="invoiceEmail" className="block text-sm font-medium text-gray-700 mb-1">Invoice Email Address *</label><input id="invoiceEmail" name="invoiceEmail" type="email" required placeholder="accounts@yourcompany.com" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div className="md:col-span-2"><label htmlFor="billingAddress1" className="block text-sm font-medium text-gray-700 mb-1">Street Address 1 *</label><input id="billingAddress1" name="billingAddress1" required placeholder="Building no., street name" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div className="md:col-span-2"><label htmlFor="billingAddress2" className="block text-sm font-medium text-gray-700 mb-1">Street Address 2</label><input id="billingAddress2" name="billingAddress2" placeholder="Area, locality, landmark (optional)" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">City *</label><input id="billingCity" name="billingCity" required placeholder="City" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">State / Union Territory *</label><select id="billingState" name="billingState" required defaultValue="" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50"><option value="" disabled>Select state / UT</option>{indiaStatesAndUTs.map((state) => <option key={`billing-${state}`} value={state}>{state}</option>)}</select></div>
                <div><label htmlFor="billingPin" className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label><input id="billingPin" name="billingPin" required maxLength={6} inputMode="numeric" pattern="[0-9]{6}" placeholder="6-digit PIN code" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">Country *</label><input id="billingCountry" name="billingCountry" required defaultValue="India" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
              </div>
              <p className="text-sm text-gray-600 rounded-xl bg-amber-50 border border-amber-200 p-4">For GST compliance, invoice will include your GSTIN. Ensure billing state matches your GST registration state.</p>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">Primary Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label><input id="firstName" name="firstName" required placeholder="First name" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label><input id="lastName" name="lastName" required placeholder="Last name" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation / Title *</label><input id="designation" name="designation" required placeholder="e.g., HR Manager, Director" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label><input id="contactEmail" name="contactEmail" type="email" required placeholder="name@company.com" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="officePhone" className="block text-sm font-medium text-gray-700 mb-1">Office Phone (with STD)</label><input id="officePhone" name="officePhone" placeholder="0XX-XXXXXXXX" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label><input id="mobileNumber" name="mobileNumber" required placeholder="+91 XXXXX XXXXX" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div className="md:col-span-2"><label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number (if different)</label><input id="whatsappNumber" name="whatsappNumber" placeholder="+91 XXXXX XXXXX" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">Additional Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label htmlFor="heardAbout" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us? *</label><select id="heardAbout" name="heardAbout" required defaultValue="" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50"><option value="" disabled>Select source</option>{heardAboutOptions.map((source) => <option key={source} value={source}>{source}</option>)}</select></div>
                <div><label htmlFor="referredBy" className="block text-sm font-medium text-gray-700 mb-1">If referred, list by whom</label><input id="referredBy" name="referredBy" placeholder="Name of referring client or person" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div><label htmlFor="backgroundsPerYear" className="block text-sm font-medium text-gray-700 mb-1">Approximate backgrounds expected per year *</label><select id="backgroundsPerYear" name="backgroundsPerYear" required defaultValue="" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50"><option value="" disabled>Select range</option>{annualVolumeOptions.map((range) => <option key={range} value={range}>{range}</option>)}</select></div>
                <div><label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">Promo Code (if any)</label><input id="promoCode" name="promoCode" placeholder="Enter code" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>
                <div className="md:col-span-2"><label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Primary industry / business type *</label><select id="industry" name="industry" required defaultValue="" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50"><option value="" disabled>Select industry</option>{industryOptions.map((industry) => <option key={industry} value={industry}>{industry}</option>)}</select></div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">Background Check Requirements</h2>
              <p className="text-sm text-gray-600">Select the checks required for your first order. You can customise per-candidate later.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {backgroundChecks.map((item) => (
                  <label key={item} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700">
                    <input type="checkbox" name="checks" value={item} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-cluso-deep focus:ring-cluso-mid" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div><label htmlFor="customRequirements" className="block text-sm font-medium text-gray-700 mb-1">Additional or custom requirements</label><textarea id="customRequirements" name="customRequirements" rows={5} placeholder="Describe any specific checks, turnaround time expectations, or compliance requirements (e.g., client-mandated, SEBI, RBI, IRDAI norms)..." className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50" /></div>

              <div className="rounded-2xl border border-dashed border-cluso-mid/40 bg-cluso-sky/5 p-5">
                <label htmlFor="requirementDocuments" className="block text-sm font-semibold text-cluso-deep mb-2">Click to upload requirements document(s)</label>
                <input ref={requirementInputRef} id="requirementDocuments" name="requirementDocuments" type="file" accept=".pdf,.doc,.docx" multiple onChange={onRequirementFilesSelected} className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-cluso-deep file:px-4 file:py-2 file:text-white hover:file:bg-cluso-mid" />
                {fileError.requirement && <p className="mt-2 text-xs text-red-600">{fileError.requirement}</p>}
                {requirementFiles.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {requirementFiles.map((file, index) => (
                      <span key={`${file.name}-${file.lastModified}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-cluso-deep/20 bg-white px-3 py-1 text-xs text-gray-700">
                        {file.name}
                        <button type="button" onClick={() => removeRequirementFile(index)} className="text-red-600 hover:text-red-700" aria-label={`Remove ${file.name}`}>
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">No file chosen</p>
                )}
                <p className="mt-2 text-xs text-gray-500">PDF, DOC, DOCX - max 10 MB each, up to 5 files</p>
              </div>
            </div>

            <div className="rounded-xl border border-cluso-sky/20 bg-cluso-sky/10 p-4 text-sm text-slate-700">For a complete list of services and pricing, please contact your Cluso account representative.</div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
              <button type="submit" value="draft" formNoValidate disabled={status === 'saving'} className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60">{status === 'saving' ? 'Saving...' : 'Save Draft'}</button>
              <button type="submit" value="submitted" disabled={status === 'saving'} className="rounded-xl border border-cluso-green/40 bg-cluso-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-60">{status === 'saving' ? 'Submitting...' : 'Submit Request ->'}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
