import React from 'react';

export default function PermissionsTable() {
  const rows = [
    ['View accounts', '✅', '✅', '✅'],
    ['Create new account', '✅', '🚫', '🚫'],
    ['Update account', '✅', '🚫', '🚫'],
    ['Delete account', '✅', '🚫', '🚫'],
    ['View Inspector Profiles', '✅', '✅', '✅'],
    ['Create Inspector Profiles', '✅', '✅', '🚫'],
    ['Use Inspector Profiles', '✅', '✅', '✅'],
    ['Update Inspector Profiles', '✅', '✅', '🚫'],
    ['Delete Inspector Profiles', '✅', '✅', '🚫'],
    ['View Contacts', '✅', '✅', '🚫'],
    ['Create Contacts', '✅', '✅', '✅'],
    ['Use Contacts', '✅', '✅', '✅'],
    ['Update Contacts', '✅', '✅', '✅'],
    ['Delete Contacts', '✅', '✅', '🚫'],
    ['View Service Agreements', '✅', '✅', '✅'],
    ['Create Service Agreements', '✅', '✅', '🚫'],
    ['Use Service Agreements', '✅', '✅', '✅'],
    ['Update Service Agreements', '✅', '✅', '🚫'],
    ['Delete Service Agreements', '✅', '✅', '🚫'],
    ['View Form Templates', '✅', '✅', '✅'],
    ['Create Form Templates', '✅', '✅', '🚫'],
    ['Use Form Templates', '✅', '✅', '✅'],
    ['Update Form Templates', '✅', '✅', '🚫'],
    ['Delete Form Templates', '✅', '✅', '🚫'],
    ['View Inspections', '✅', '✅', '✅'],
    ['Create Inspection', '✅', '✅', '✅'],
    ['Use Inspection', '✅', '✅', '✅'],
    ['Update Inspection', '✅', '✅', '✅'],
    ['Delete Inspection', '✅', '✅', '🚫'],
    ['View Inspection Forms', '✅', '✅', '✅'],
    ['Create Inspection Forms', '✅', '✅', '✅'],
    ['Use Inspection Forms', '✅', '✅', '✅'],
    ['Update Inspection Forms', '✅', '✅', '✅'],
    ['Publish Inspection Forms', '✅', '✅', '✅'],
    ['Delete Inspection Forms', '✅', '✅', '🚫'],
    ['View Report', '✅', '✅', '✅'],
    ['Preview Report', '✅', '✅', '✅'],
    ['Use Report', '✅', '✅', '✅'],
    ['Update Report', '✅', '✅', '✅'],
    ['Delete Report', '✅', '✅', '🚫'],
    ['Share Report', '✅', '✅', '✅'],
    ['Upload images and videos', '✅', '✅', '✅'],
    ['Modify subscription', '✅', '🚫', '🚫'],
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