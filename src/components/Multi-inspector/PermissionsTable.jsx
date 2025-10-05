import React from 'react';

export default function PermissionsTable() {
  const rows = [
    ['List Inspections', '✅', '✅', '✅'],
    ['View Inspection', '✅', '✅', '✅'],
    ['Create Inspection', '✅', '✅', '✅'],
    ['Edit Inspection', '✅', '✅', '✅'],
    ['Delete Inspection', '✅', '✅', '🚫'],
    ['List Inspection Forms', '✅', '✅', '✅'],
    ['View Inspection Form', '✅', '✅', '✅'],
    ['Create Inspection Form', '✅', '✅', '✅'],
    ['Edit Inspection Form', '✅', '✅', '✅'],
    ['Delete Inspection Form', '✅', '✅', '🚫'],
    ['Publish Inspection Form', '✅', '✅', '✅'],
    ['Preview Report', '✅', '✅', '✅'],
    ['List Reports', '✅', '✅', '✅'],
    ['View Report', '✅', '✅', '✅'],
    ['Edit Report', '✅', '✅', '✅'],
    ['Delete Report', '✅', '✅', '🚫'],
    ['Share Report', '✅', '✅', '✅'],
    ['List Form Templates', '✅', '✅', '✅'],
    ['View Form Template', '✅', '✅', '✅'],
    ['Create Form Template', '✅', '✅', '🚫'],
    ['Edit Form Template', '✅', '✅', '🚫'],
    ['Delete Form Template', '✅', '✅', '🚫'],
    ['List Inspector Profiles', '✅', '✅', '✅'],
    ['View Inspector Profile', '✅', '✅', '✅'],
    ['Create Inspector Profile', '✅', '✅', '🚫'],
    ['Edit Inspector Profile', '✅', '✅', '🚫'],
    ['Delete Inspector Profiles', '✅', '✅', '🚫'],
    ['List Contacts', '✅', '✅', '🚫'],
    ['View Contact', '✅', '✅', '✅'],
    ['Create Contact', '✅', '✅', '✅'],
    ['Edit Contact', '✅', '✅', '✅'],
    ['Delete Contact', '✅', '✅', '🚫'],
    ['Upload images and videos', '✅', '✅', '✅'],
    ['List team members', '✅', '✅', '✅'],
    ['Create team member', '✅', '🚫', '🚫'],
    ['Edit team member', '✅', '🚫', '🚫'],
    ['Delete team member', '✅', '🚫', '🚫'],
    ['View subscription', '✅', '🚫', '🚫'],
    ['Modify subscription', '✅', '🚫', '🚫'], // CUSTOMER_SESSION_CREATE && BILLING_SESSION_CREATE
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
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td style={{ padding: '10px 12px' }}>{row[0]}</td>
            <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row[1]}</td>
            <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row[2]}</td>
            <td style={{ textAlign: 'center', padding: '10px 8px' }}>{row[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}