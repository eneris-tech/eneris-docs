import React from 'react';

export default function FeatureTable() {
  const rows = [
    ['Automatic cloud backups', 'Available', 'Available', ''],
    ['iOS app', 'Available', 'Available', 'Improved capabilities and performance.'],
    ['Android app', 'Available', 'Available', 'Improved capabilities and performance.'],
    ['Offline reporting', 'Available', 'Available', 'Streamlined sync process.'],
    ['PDF report', 'Available', 'Available', 'Redesigned for readability and future customizations.'],
    ['Inspector profiles', 'Available', 'Available', 'Elevate will support multiple inspector profiles.'],
    ['Built-in templates', 'Available', 'Available', ''],
    ['Report publishing', 'Available', 'Available', ''],
    ['Share report via email', 'Available', 'Available', ''],
    ['Photos & videos', 'Available', 'Available', 'Capture multiple images/videos at once or multi-select them from your media library.'],
    ['Disclaimers', 'Available', 'Available', 'Disclaimers are now part of templates. This means different templates can have different disclaimers.'],
    ['Custom fields', 'Available', 'Unplanned', 'i.e., Description, condition, location, etc. fields can be fully customized.'],
    ['Custom categories', 'Available', 'Unplanned', 'i.e., Exterior, roofing, HVAC, etc. can be fully customized.'],
    ['Room-by-room template', 'Available', 'Unplanned', 'A dedicated room-by-room template is available to suit your inspection and reporting style.'],
    ['Multi-inspector', 'Available', 'Available', ''],
    ['PDF summary report', 'Planned', 'Available', ''],
    ['Web report', 'Planned', 'Available', ''],
    ['Progress checklist', 'Planned', 'Available', ''],
    ['Photo annotation', 'Planned', 'Available', ''],
    ['Service agreements', 'Planned', 'Available', ''],
    ['Invoicing and payment collection', 'Planned', 'Available', ''],
    ['Custom files', 'Planned', 'Available', ''],
    ['TREC + Wind Mitigation + 4 Point', 'Planned', 'Available', ''],
    ['Standards of practice', 'Planned', 'Available', ''],
    ['Progress report', 'Planned', 'Available', ''],
    ['Automations', 'Planned', 'Unplanned', ''],
    ['ISN integration support', 'Unplanned', 'Available', 'More scheduling and invoicing capabilities to come.']
  ];

  const getColor = (status) => {
    if (status === 'Available') return 'green';
    if (status === 'Planned') return 'goldenrod';
    if (status === 'Unplanned') return 'red';
    return 'black';
  };

  return (
    <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '40%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ textAlign: 'center', padding: '12px 12px' }}>Feature</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>Eneris Elevate</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>Eneris Legacy</th>
          <th style={{ textAlign: 'center', padding: '10px 8px' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td style={{ padding: '10px 12px' }}>{row[0]}</td>
            <td style={{ color: getColor(row[1]), textAlign: 'center', padding: '10px 8px' }}>{row[1]}</td>
            <td style={{ color: getColor(row[2]), textAlign: 'center', padding: '10px 8px' }}>{row[2]}</td>
            <td style={{ padding: '10px 8px' }}>{row[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}