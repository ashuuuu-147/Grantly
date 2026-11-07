/**
 * GRANTLY OFFICIAL MOCK APPLICATIONS
 * Statuses: 'Saved', 'In Progress', 'Submitted', 'Approved', 'Rejected'
 */

export const mockApplications = [
  {
    id: 'app-001',
    scholarshipId: 'sch-101',
    title: 'Global Turing Fellowship in Computing & Artificial Intelligence',
    provider: 'International Institute of Technology & Future Science',
    awardAmount: 50000,
    amount: 50000, // alias
    status: 'In Progress',
    deadline: '2026-12-15',
    progress: 75,
    lastUpdated: '2026-11-04',
    notes: 'Drafted 1,200 words of the neural architecture research proposal. Dr. Thorne confirmed letter of reference by Friday.',
    documents: [
      { name: 'Official Academic Transcript', completed: true, required: true },
      { name: 'Two Letters of Academic Recommendation', completed: true, required: true },
      { name: 'Research Proposal (max 1,500 words)', completed: true, required: true },
      { name: 'GitHub / Open-Source Portfolio Link', completed: false, required: true },
      { name: 'Identity Verification Proof', completed: false, required: false },
    ],
  },
  {
    id: 'app-002',
    scholarshipId: 'sch-102',
    title: 'Meridian Global Leadership & Civic Innovation Grant',
    provider: 'Meridian Foundation for Public Good',
    awardAmount: 35000,
    amount: 35000,
    status: 'Submitted',
    deadline: '2026-11-30',
    progress: 100,
    lastUpdated: '2026-10-28',
    notes: 'Submitted full packet through official portal. Confirmation ID: MER-89241.',
    documents: [
      { name: 'Statement of Civic Impact (1,000 words)', completed: true, required: true },
      { name: 'Curriculum Vitae highlighting community service', completed: true, required: true },
      { name: 'One Academic and One Community Reference Letter', completed: true, required: true },
      { name: 'Income Verification / Tax Form', completed: true, required: true },
    ],
  },
  {
    id: 'app-003',
    scholarshipId: 'sch-103',
    title: 'Ada Lovelace Women in Advanced Technology Fellowship',
    provider: 'Apex Venture Capital & Women In Code Coalition',
    awardAmount: 25000,
    amount: 25000,
    status: 'Saved',
    deadline: '2027-01-20',
    progress: 25,
    lastUpdated: '2026-11-01',
    notes: 'Need to record video introduction and polish personal journey essay.',
    documents: [
      { name: 'Proof of Enrollment in accredited Engineering/CS program', completed: true, required: true },
      { name: 'Personal Essay on overcoming technical bottlenecks (750 words)', completed: false, required: true },
      { name: 'Verified Academic Marksheet', completed: false, required: true },
      { name: 'Proof of Identity', completed: false, required: true },
    ],
  },
  {
    id: 'app-004',
    scholarshipId: 'sch-109',
    title: 'Sankofa African Diaspora Academic Excellence Grant',
    provider: 'Pan-African Higher Education Endowment',
    awardAmount: 22000,
    amount: 22000,
    status: 'Approved',
    deadline: '2026-10-15',
    progress: 100,
    lastUpdated: '2026-10-25',
    notes: 'Awarded! $22,000 disbursement scheduled for Fall tuition credit.',
    documents: [
      { name: 'Official Academic Records', completed: true, required: true },
      { name: 'Leadership & Community Impact Portfolio', completed: true, required: true },
      { name: 'Personal Narrative of Resilience', completed: true, required: true },
      { name: 'Two letters of recommendation', completed: true, required: true },
    ],
  },
];
