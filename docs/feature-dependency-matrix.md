# Feature Dependency Matrix

This document maps the interactions and dependencies between all features in Eneris Elevate. Use this matrix to identify integration test scenarios.

## Feature Overview

| ID | Feature | Description |
|----|---------|-------------|
| F01 | Inspections | Core workspace containing all property site visit data |
| F02 | Inspection Forms | Structured data entry workspace for inspection findings |
| F03 | Form Templates | Reusable templates for inspection form structure |
| F04 | Form Customization | Tools to customize templates and forms |
| F05 | Inspector Profiles | Business/certification profiles linked to inspections |
| F06 | Reports | PDF documents generated from inspection data |
| F07 | Saving | Automatic local device storage |
| F08 | Syncing | Cloud backup and multi-device synchronization |
| F09 | Offline Forms | Locally cached forms for offline work |
| F10 | Multi-Inspector | Team collaboration and role management |
| F11 | Contacts | Contact database linked to inspections |
| F12 | Property Details | Property information captured in inspections |
| F13 | Account Settings | User account and configuration management |
| F14 | Account Migration | Data migration from Eneris Legacy |

---

## Dependency Matrix

The matrix below shows how features depend on and interact with each other.

### Legend
- **→** = Depends on / Requires
- **←** = Is required by
- **↔** = Bidirectional dependency
- **D** = Data flows to
- **T** = Triggers
- **A** = Affects behavior of

|        | F01 | F02 | F03 | F04 | F05 | F06 | F07 | F08 | F09 | F10 | F11 | F12 | F13 | F14 |
|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **F01 Inspections** | - | →D | →D | A | →D | D→ | T | T | - | ←A | →←D | →←D | ←A | - |
| **F02 Inspection Forms** | ←D | - | ←D | ←A | - | D→ | T | T | D↔ | ←A | - | - | - | - |
| **F03 Form Templates** | D→ | D→ | - | ←A | - | - | - | - | - | - | - | - | ←A | ←D |
| **F04 Form Customization** | A | A→ | A→ | - | - | A | - | - | - | - | - | - | - | - |
| **F05 Inspector Profiles** | ←D | - | - | - | - | D→ | - | T | - | ←A | - | - | ←A | ←D |
| **F06 Reports** | ←D | ←D | - | ←A | ←D | - | → | T→ | - | ←A | →D | ←D | - | - |
| **F07 Saving** | ←T | ←T | - | - | - | ←→ | - | → | →D | - | - | - | - | - |
| **F08 Syncing** | ←T | ←T | - | - | ←T | ←T | ← | - | ↔T | →A | - | - | - | - |
| **F09 Offline Forms** | - | ↔D | - | - | - | - | ←D | T↔ | - | - | - | - | - | - |
| **F10 Multi-Inspector** | A→ | A→ | - | - | A→ | A→ | - | ←A | - | - | - | - | ←A | ←D |
| **F11 Contacts** | ←→D | - | - | - | - | ←D | - | - | - | - | - | - | - | - |
| **F12 Property Details** | ←→D | - | - | - | - | D→ | - | - | - | - | - | - | - | - |
| **F13 Account Settings** | A→ | - | A→ | - | A→ | - | - | - | - | A→ | - | - | - | → |
| **F14 Account Migration** | - | - | D→ | - | D→ | - | - | - | - | D→ | - | - | ← | - |

---

## Detailed Feature Interactions

### F01: Inspections ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F02 Inspection Forms | Contains | Each inspection contains 1+ inspection forms |
| F03 Form Templates | Uses | Template selected when adding forms to inspection |
| F05 Inspector Profiles | Uses | Profile assigned to inspection, appears in report |
| F06 Reports | Produces | Reports generated from inspection data |
| F07 Saving | Triggers | Auto-saves inspection data locally |
| F08 Syncing | Triggers | Uploads inspection data to cloud |
| F10 Multi-Inspector | Controlled By | Team roles determine inspection access/assignment |
| F11 Contacts | Contains | Contacts assigned to inspection (7 role types) |
| F12 Property Details | Contains | Property info captured within inspection |
| F13 Account Settings | Configured By | Team settings affect inspection visibility |

### F02: Inspection Forms ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Belongs To | Forms are part of inspections |
| F03 Form Templates | Created From | Forms inherit structure from templates |
| F04 Form Customization | Modified By | Categories, components, fields can be customized |
| F06 Reports | Feeds | Form data generates report content |
| F07 Saving | Triggers | Form changes trigger auto-save |
| F08 Syncing | Triggers | Form changes can trigger sync |
| F09 Offline Forms | Cached As | Forms are cached locally for offline access |
| F10 Multi-Inspector | Shared Via | Multiple inspectors can work on same form |

### F03: Form Templates ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Selected For | Template chosen when creating inspection |
| F02 Inspection Forms | Basis For | Templates define form structure |
| F04 Form Customization | Modified By | Templates can be customized |
| F13 Account Settings | Managed Via | Templates accessible via settings |
| F14 Account Migration | Imported From | Templates migrate from Legacy |

### F04: Form Customization ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F02 Inspection Forms | Modifies | Individual forms can be customized |
| F03 Form Templates | Modifies | Templates can be customized (affects new inspections only) |
| F06 Reports | Affects | Customizations (visibility, fields) affect report output |

### F05: Inspector Profiles ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Assigned To | Profile selected when creating/editing inspection |
| F06 Reports | Appears In | Profile info shown on report cover page |
| F08 Syncing | Triggers | Profile changes require republish |
| F10 Multi-Inspector | Per Inspector | Each team member can have multiple profiles |
| F13 Account Settings | Managed Via | Profiles created/edited in settings |
| F14 Account Migration | Imported From | Business details migrate from Legacy |

### F06: Reports ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Generated From | Reports created from inspection data |
| F02 Inspection Forms | Generated From | Form data populates report content |
| F04 Form Customization | Affected By | Field visibility settings affect report |
| F05 Inspector Profiles | Includes | Profile info on cover page |
| F07 Saving | Requires | Data must be saved before publishing |
| F08 Syncing | Triggers | Publishing triggers sync |
| F10 Multi-Inspector | Access Controlled | Team roles determine report visibility |
| F11 Contacts | Sent To | Reports shared via email to contacts |
| F12 Property Details | Includes | Property info included in report |

### F07: Saving ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Stores | Auto-saves inspection data locally |
| F02 Inspection Forms | Stores | Saves form changes every 30s-2min |
| F06 Reports | Prerequisite | Data must be saved before report generation |
| F08 Syncing | Precedes | Saved data is what gets synced |
| F09 Offline Forms | Enables | Local saves enable offline access |

### F08: Syncing ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Uploads | Syncs inspection data to cloud |
| F02 Inspection Forms | Uploads | Syncs form data to cloud |
| F05 Inspector Profiles | Uploads | Profile changes synced |
| F06 Reports | Triggered By | Publishing/previewing triggers sync |
| F07 Saving | Follows | Syncing uploads saved data |
| F09 Offline Forms | Updates | Sync refreshes offline form cache |
| F10 Multi-Inspector | Enables | Sync merges multi-inspector changes |

### F09: Offline Forms ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F02 Inspection Forms | Caches | Local copy of inspection forms |
| F07 Saving | Uses | Relies on local save mechanism |
| F08 Syncing | Syncs With | Offline changes sync when online |

### F10: Multi-Inspector ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Assigns | Controls inspector assignment |
| F02 Inspection Forms | Merges | Combines inputs from multiple inspectors |
| F05 Inspector Profiles | Per User | Each inspector has own profiles |
| F06 Reports | Controls Access | Role-based report visibility |
| F08 Syncing | Uses | Sync enables multi-inspector collaboration |
| F13 Account Settings | Configured Via | Team management in settings |
| F14 Account Migration | Imported From | Team structure migrates from Legacy |

### F11: Contacts ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Assigned To | Contacts linked to inspections |
| F06 Reports | Recipients | Contacts auto-populate report sharing |

### F12: Property Details ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Part Of | Property info within inspection |
| F06 Reports | Included In | Property details appear in report |

### F13: Account Settings ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F01 Inspections | Configures | Team settings affect access |
| F03 Form Templates | Manages | Template management |
| F05 Inspector Profiles | Manages | Profile creation/editing |
| F10 Multi-Inspector | Configures | Team role management |
| F14 Account Migration | Triggers | Migration initiated from settings |

### F14: Account Migration ↔ Other Features

| Interacts With | Interaction Type | Description |
|----------------|------------------|-------------|
| F03 Form Templates | Imports | Templates from Legacy |
| F05 Inspector Profiles | Imports | Business details from Legacy |
| F10 Multi-Inspector | Imports | Team structure from Legacy |
| F13 Account Settings | Triggered By | Migration initiated via settings |

---

## Integration Test Scenarios

Based on the dependency matrix, the following integration test scenarios are recommended:

### Critical Path Tests

#### 1. Complete Inspection Workflow (F01 → F02 → F07 → F08 → F06)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create new inspection with contacts and property details | Inspection created successfully |
| 2 | Add inspection form from template | Form added with template structure |
| 3 | Enter inspection findings | Data saved locally (auto-save) |
| 4 | Sync to cloud | Data uploaded successfully |
| 5 | Generate and publish report | Report created with all data |
| 6 | Share report with contacts | Email sent to assigned contacts |

#### 2. Template to Form Flow (F03 → F04 → F02 → F06)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create custom template from base | Template created |
| 2 | Customize template (add fields, categories) | Customizations saved |
| 3 | Create new inspection using customized template | Form inherits customizations |
| 4 | Modify existing template | Changes do NOT affect existing forms |
| 5 | Create another inspection | New inspection has latest template changes |

#### 3. Offline Workflow (F02 → F07 → F09 → F08)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Sync inspection form while online | Form cached locally |
| 2 | Go offline | Offline form accessible |
| 3 | Make changes to form offline | Changes saved locally |
| 4 | Attempt to publish report offline | Publish blocked (expected) |
| 5 | Go online and sync | Changes uploaded to cloud |
| 6 | Verify data integrity | All offline changes preserved |

#### 4. Multi-Inspector Collaboration (F10 → F01 → F02 → F08)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Admin assigns inspection to multiple inspectors | Assignment saved |
| 2 | Inspector A adds findings and syncs | Data uploaded |
| 3 | Inspector B adds different findings and syncs | Both insights merged |
| 4 | Admin views inspection | All findings visible |
| 5 | Change inspector role | Access changes appropriately |

#### 5. Inspector Profile Integration (F05 → F01 → F06)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create inspector profile with business info | Profile saved |
| 2 | Assign profile to inspection | Profile linked |
| 3 | Publish report | Profile info appears on cover page |
| 4 | Update profile | Existing report unchanged |
| 5 | Republish report | Updated profile info appears |

### Edge Case Tests

#### 6. Data Conflict Resolution (F08 + F10)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Two inspectors edit same component simultaneously | No data loss |
| 2 | Both sync their changes | Changes merged correctly |
| 3 | Verify merged data | All insights preserved |

#### 7. Offline Form Expiration (F09)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create inspection 31+ days ago | Form eligible for cleanup |
| 2 | Don't sync for 31+ days | Auto-delete triggers |
| 3 | Verify cloud data | Cloud data unaffected |
| 4 | Re-download form | Form restored from cloud |

#### 8. Report Status Changes (F06 + F10)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Publish report as Public | Report accessible to shared contacts |
| 2 | Change status to Private | Access revoked for contacts |
| 3 | Verify admin access | Admin can still view |
| 4 | Change status back to Public | Access restored |

#### 9. Account Migration (F14 → F03 → F05 → F10)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Initiate migration from Legacy | Migration starts |
| 2 | Verify templates migrated | Templates present with suffix |
| 3 | Verify profiles migrated | Business details present |
| 4 | Verify team migrated | Team structure preserved |
| 5 | Create inspection with migrated template | Template works correctly |

#### 10. Form Customization Propagation (F04 → F02 → F06)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set field as "hidden from report" | Setting saved |
| 2 | Add data to hidden field | Data saved |
| 3 | Generate report | Hidden field data excluded |
| 4 | Verify data in form | Data still present in form |

### Boundary Tests

#### 11. Storage Limits (F07)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Fill device storage near capacity | Warning displayed |
| 2 | Attempt to save inspection | Appropriate error/warning |

#### 12. Contact Role Assignment (F11 → F01 → F06)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Assign contact as each of 7 roles | All roles work |
| 2 | Assign multiple contacts with same role | Multiple contacts supported |
| 3 | Share report | All contacts receive email |

#### 13. Media Handling (F02 → F06)
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add JPEG image to form | Image saved |
| 2 | Add PNG image to form | Image saved |
| 3 | Add MP4 video to form | Video saved |
| 4 | Add MOV video to form | Video saved |
| 5 | Apply photo markup | Annotations saved |
| 6 | Generate report | All media appears with annotations |

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ENERIS ELEVATE DATA FLOWS                          │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────────┐
                              │  Account         │
                              │  Settings (F13)  │
                              └────────┬─────────┘
                                       │ Configures
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
           ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
           │ Form Templates │ │ Inspector      │ │ Multi-Inspector│
           │ (F03)          │ │ Profiles (F05) │ │ (F10)          │
           └───────┬────────┘ └───────┬────────┘ └───────┬────────┘
                   │                  │                  │
                   │ Structure        │ Branding         │ Assignment
                   ▼                  ▼                  ▼
           ┌───────────────────────────────────────────────────────┐
           │                    INSPECTIONS (F01)                   │
           │  ┌─────────────┐  ┌─────────────┐  ┌────────────────┐ │
           │  │ Contacts    │  │ Property    │  │ Notes/Memo     │ │
           │  │ (F11)       │  │ Details(F12)│  │                │ │
           │  └─────────────┘  └─────────────┘  └────────────────┘ │
           └───────────────────────────┬───────────────────────────┘
                                       │ Contains
                                       ▼
                            ┌──────────────────────┐
                            │ Inspection Forms     │◄────┐
                            │ (F02)                │     │
                            └──────────┬───────────┘     │
                                       │                 │
              ┌────────────────────────┼─────────────────┤
              │                        │                 │
              ▼                        ▼                 │
    ┌─────────────────┐     ┌─────────────────┐         │
    │ Saving (F07)    │     │ Form            │         │
    │ (Local Device)  │     │ Customization   │         │
    └────────┬────────┘     │ (F04)           │         │
             │              └─────────────────┘         │
             │ Local Data                               │
             ▼                                          │
    ┌─────────────────┐                                 │
    │ Offline Forms   │─────────────────────────────────┘
    │ (F09)           │     Cached Copy
    └────────┬────────┘
             │
             │ When Online
             ▼
    ┌─────────────────┐
    │ Syncing (F08)   │
    │ (Cloud)         │
    └────────┬────────┘
             │
             │ Enables
             ▼
    ┌─────────────────┐
    │ Reports (F06)   │
    │ ├─ Full Report  │
    │ └─ Summary      │
    └────────┬────────┘
             │
             │ Shared To
             ▼
    ┌─────────────────┐
    │ Contacts (F11)  │
    │ (via Email)     │
    └─────────────────┘


    ┌─────────────────────────────────────────────────────────────┐
    │                     MIGRATION PATH                          │
    │                                                             │
    │  Eneris Legacy ──► Account Migration (F14) ──► Elevate     │
    │                    ├─► Templates                            │
    │                    ├─► Profiles                             │
    │                    └─► Team Structure                       │
    └─────────────────────────────────────────────────────────────┘
```

---

## Test Priority Matrix

Based on feature dependencies and user impact, tests should be prioritized as follows:

| Priority | Test Scenario | Risk Level | User Impact |
|----------|---------------|------------|-------------|
| **P0 - Critical** | Complete Inspection Workflow | High | Core functionality |
| **P0 - Critical** | Saving/Syncing Integration | High | Data loss risk |
| **P0 - Critical** | Report Generation | High | Revenue impact |
| **P1 - High** | Offline Workflow | Medium | Field work impact |
| **P1 - High** | Multi-Inspector Collaboration | Medium | Team productivity |
| **P1 - High** | Template to Form Flow | Medium | Setup efficiency |
| **P2 - Medium** | Inspector Profile Integration | Low | Branding consistency |
| **P2 - Medium** | Report Status Changes | Low | Access control |
| **P2 - Medium** | Form Customization Propagation | Low | Report accuracy |
| **P3 - Low** | Account Migration | Low | One-time operation |
| **P3 - Low** | Offline Form Expiration | Low | Storage management |
| **P3 - Low** | Data Conflict Resolution | Low | Edge case |

---

## Notes for Test Implementation

1. **Environment Requirements**
   - Tests should run on both web and mobile platforms
   - Offline tests require network simulation capabilities
   - Multi-inspector tests require multiple test accounts

2. **Test Data Requirements**
   - Standard test templates (based on 7 default types)
   - Test contacts with various roles
   - Sample media files (JPEG, PNG, MP4, MOV)
   - Test inspector profiles with complete data

3. **State Management**
   - Tests should verify local save state (every 30s-2min)
   - Tests should verify sync state indicators
   - Tests should handle sync conflicts gracefully

4. **Performance Considerations**
   - Offline form cache should persist for 30 days
   - Auto-save frequency: 30 seconds to 2 minutes
   - Report generation should complete within reasonable time

---

*Last Updated: December 2024*
*Version: 1.0*
