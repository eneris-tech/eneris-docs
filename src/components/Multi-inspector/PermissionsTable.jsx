import React from 'react';

export default function PermissionsTable() {
  const sections = [
    {
      heading: 'Inspections',
      rows: [
        ['List Inspections', '✅', '✅', '✅'],
        ['View Inspection', '✅', '✅', '✅'],
        ['Create Inspection', '✅', '✅', '✅'],
        ['Edit Inspection', '✅', '✅', '✅'],
        ['Delete Inspection', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Inspection Forms',
      rows: [
        ['List Inspection Forms', '✅', '✅', '✅'],
        ['View Inspection Form', '✅', '✅', '✅'],
        ['Create Inspection Form', '✅', '✅', '✅'],
        ['Edit Inspection Form', '✅', '✅', '✅'],
        ['Delete Inspection Form', '✅', '✅', '🚫'],
        ['Publish Inspection Form', '✅', '✅', '✅'],
      ],
    },
    {
      heading: 'Reports',
      rows: [
        ['Preview Report', '✅', '✅', '✅'],
        ['List Reports', '✅', '✅', '✅'],
        ['View Report', '✅', '✅', '✅'],
        ['Edit Report', '✅', '✅', '✅'],
        ['Delete Report', '✅', '✅', '🚫'],
        ['Share Report', '✅', '✅', '✅'],

        // AI Insights (feature not yet live)
        // ['List AI Insights', '✅', '✅', '✅'],
        // ['Create AI Insight', '✅', '✅', '✅'],
        // ['Edit AI Insight', '✅', '✅', '✅'],
        // ['Modify AI Insight Suggestion', '✅', '✅', '✅'],
        // ['Apply AI Insight Suggestion', '✅', '✅', '✅'],
      ],
    },
    {
      heading: 'Form Templates',
      rows: [
        ['List Form Templates', '✅', '✅', '✅'],
        ['View Form Template', '✅', '✅', '✅'],
        ['Create Form Template', '✅', '✅', '🚫'],
        ['Edit Form Template', '✅', '✅', '🚫'],
        ['Delete Form Template', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'SOP Templates',
      rows: [
        ['List SOP Templates', '✅', '✅', '✅'],
        ['View SOP Template', '✅', '✅', '✅'],
        ['Create SOP Template', '✅', '✅', '🚫'],
        ['Edit SOP Template', '✅', '✅', '🚫'],
        ['Delete SOP Template', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Reference Files',
      rows: [
        ['List Reference Files', '✅', '✅', '✅'],
        ['View Reference File', '✅', '✅', '✅'],
        ['Create Reference File', '✅', '✅', '🚫'],
        ['Edit Reference File', '✅', '✅', '🚫'],
        ['Delete Reference File', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Inspector Profiles',
      rows: [
        ['List Inspector Profiles', '✅', '✅', '✅'],
        ['View Inspector Profile', '✅', '✅', '✅'],
        ['Create Inspector Profile', '✅', '✅', '🚫'],
        ['Edit Inspector Profile', '✅', '✅', '🚫'],
        ['Delete Inspector Profiles', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Contacts',
      rows: [
        ['List Contacts', '✅', '✅', '✅'],
        ['View Contact', '✅', '✅', '✅'],
        ['Create Contact', '✅', '✅', '✅'],
        ['Edit Contact', '✅', '✅', '✅'],
        ['Delete Contact', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Pricing Items',
      rows: [
        ['List Pricing Items', '✅', '✅', '✅'],
        ['View Pricing Item', '✅', '✅', '✅'],
        ['Create Pricing Item', '✅', '✅', '🚫'],
        ['Edit Pricing Item', '✅', '✅', '🚫'],
        ['Delete Pricing Item', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Invoices',
      rows: [
        ['List Invoices', '✅', '✅', '✅'],
        ['View Invoice', '✅', '✅', '✅'],
        ['Create Invoice', '✅', '✅', '✅'],
        ['Edit Invoice', '✅', '✅', '✅'],
        ['Delete Invoice', '✅', '✅', '✅'],
        ['Share Invoice', '✅', '✅', '✅'],
        ['Take Payment', '✅', '✅', '✅'], // INVOICE_CHECKOUT
      ],
    },
    {
      heading: 'Payments',
      // Set Up Payment Account covers PAYMENT_ACCOUNT_CREATE && PAYMENT_ONBOARDING_LINK_CREATE
      rows: [
        ['Set Up Payment Account', '✅', '🚫', '🚫'],
        ['View Payment Account', '✅', '✅', '✅'],
        ['Delete Payment Account', '✅', '🚫', '🚫'],
      ],
    },
    {
      heading: 'Booking Pages',
      rows: [
        ['List Booking Pages', '✅', '✅', '✅'],
        ['View Booking Page', '✅', '✅', '✅'],
        ['Create Booking Page', '✅', '✅', '🚫'],
        ['Edit Booking Page', '✅', '✅', '🚫'],
        ['Delete Booking Page', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Booking Requests',
      // INSPECTOR can list/view/accept/reject only the booking requests routed
      // to their assigned Inspector Profile. ADMIN and SCHEDULER can act on any.
      rows: [
        ['List Booking Requests', '✅', '✅', '✅'],
        ['View Booking Request', '✅', '✅', '✅'],
        ['Accept Booking Request', '✅', '✅', '✅'],
        ['Reject Booking Request', '✅', '✅', '✅'],
        ['Delete Booking Request', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Agreement Templates',
      rows: [
        ['List Agreement Templates', '✅', '✅', '✅'],
        ['View Agreement Template', '✅', '✅', '✅'],
        ['Create Agreement Template', '✅', '✅', '🚫'],
        ['Edit Agreement Template', '✅', '✅', '🚫'],
        ['Delete Agreement Template', '✅', '✅', '🚫'],
      ],
    },
    {
      heading: 'Service Agreements',
      // Note: Edit Service Agreement includes contact and signature modification
      // (apply/remove contacts, request/delete signatures)
      rows: [
        ['List Service Agreements', '✅', '✅', '✅'],
        ['View Service Agreement', '✅', '✅', '✅'],
        ['Create Service Agreement', '✅', '✅', '✅'],
        ['Edit Service Agreement', '✅', '✅', '✅'],
        ['Delete Service Agreement', '✅', '✅', '🚫'],
        ['Publish Service Agreement', '✅', '✅', '✅'],
        ['Sign Service Agreement', '✅', '✅', '✅'],
        ['Share Service Agreement', '✅', '✅', '✅'],
      ],
    },
    {
      heading: 'Media',
      rows: [
        ['Upload images and videos', '✅', '✅', '✅'],
      ],
    },
    {
      heading: 'Team Members',
      rows: [
        ['List team members', '✅', '✅', '✅'],
        ['Create team member', '✅', '🚫', '🚫'],
        ['Edit team member', '✅', '🚫', '🚫'],
        ['Delete team member', '✅', '🚫', '🚫'],
      ],
    },
    {
      heading: 'Subscription',
      rows: [
        ['View subscription', '✅', '🚫', '🚫'],
        ['Modify subscription', '✅', '🚫', '🚫'], // CUSTOMER_SESSION_CREATE && BILLING_SESSION_CREATE
      ],
    },
    {
      heading: 'Import Data',
      rows: [
        ['Migrate from Eneris Legacy', '✅', '🚫', '🚫'],
      ],
    },
  ];

  return (
    <table style={{ width: '75%', maxWidth: '75%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '12px 12px' }}>Permission</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>ADMIN</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>SCHEDULER</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>INSPECTOR</th>
        </tr>
      </thead>
      <tbody>
        {sections.map((section) => (
          <React.Fragment key={section.heading}>
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: '12px 12px 6px',
                  fontWeight: 'bold',
                  fontSize: '0.95em',
                  borderBottom: 'none',
                }}
              >
                {section.heading}
              </td>
            </tr>
            {section.rows.map((row, idx) => (
              <tr key={idx}>
                <td style={{ padding: '6px 12px 6px 24px' }}>{row[0]}</td>
                <td style={{ textAlign: 'center', padding: '6px 8px' }}>{row[1]}</td>
                <td style={{ textAlign: 'center', padding: '6px 8px' }}>{row[2]}</td>
                <td style={{ textAlign: 'center', padding: '6px 8px' }}>{row[3]}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
