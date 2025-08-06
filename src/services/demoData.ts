// Demo data service for the broker change platform

export interface Client {
  id: string;
  name: string;
  panNumber: string;
  clientCode: string;
  email: string;
  phone: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  riskProfile: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  totalAUM: number;
  portfolios: Portfolio[];
  address: string;
  dateOfBirth: string;
  occupation: string;
}

export interface Portfolio {
  id: string;
  type: 'MUTUAL_FUND' | 'NPS' | 'INSURANCE' | 'STOCKS';
  schemeName: string;
  currentValue: number;
  broker: string;
  folioNumber: string;
  units: number;
  nav: number;
  lastUpdated: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface Broker {
  id: string;
  name: string;
  code: string;
  arnCode: string;
  sebiRegistration: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  activeClients: number;
  specialties: string[];
}

export interface BrokerChangeRequest {
  id: string;
  clientName: string;
  clientCode: string;
  requestType: string;
  oldBroker: string;
  newBroker: string;
  status: 'PENDING' | 'PROCESSING' | 'UNDER_REVIEW' | 'COMPLETED' | 'REJECTED';
  submittedAt: string;
  estimatedCompletion?: string;
  completedAt?: string;
  rejectedAt?: string;
  reason: string;
  reasonCode: string;
  additionalNotes?: string;
  timeline: TimelineEvent[];
  documents: Document[];
}

export interface TimelineEvent {
  event: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
  description?: string;
  performedBy?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'FORM' | 'KYC' | 'BANK_STATEMENT' | 'PAN_CARD' | 'AADHAR';
  status: 'REQUIRED' | 'UPLOADED' | 'VERIFIED' | 'REJECTED';
  uploadedAt?: string;
  verifiedAt?: string;
}

export interface ReasonCode {
  code: string;
  description: string;
  category: string;
}

// Mock Clients Data
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Sharma',
    panNumber: 'ABCDE1234F',
    clientCode: 'CL001',
    email: 'rajesh.sharma@email.com',
    phone: '+91-9876543210',
    kycStatus: 'VERIFIED',
    riskProfile: 'MODERATE',
    totalAUM: 905000,
    address: '123, MG Road, Bangalore, Karnataka - 560001',
    dateOfBirth: '1985-03-15',
    occupation: 'Software Engineer',
    portfolios: [
      {
        id: 'p1',
        type: 'MUTUAL_FUND',
        schemeName: 'SBI Blue Chip Fund - Direct Growth',
        currentValue: 185000,
        broker: 'HDFC Securities',
        folioNumber: 'FOL-001-123456',
        units: 1500.5,
        nav: 123.45,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      },
      {
        id: 'p2',
        type: 'NPS',
        schemeName: 'NPS Tier I Account - Active Choice',
        currentValue: 95000,
        broker: 'SBI Securities',
        folioNumber: 'NPS-001-789012',
        units: 850.25,
        nav: 111.76,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      },
      {
        id: 'p3',
        type: 'INSURANCE',
        schemeName: 'LIC Jeevan Anand Policy',
        currentValue: 500000,
        broker: 'LIC of India',
        folioNumber: 'LIC-001-345678',
        units: 1,
        nav: 500000,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: '2',
    name: 'Priya Mehta',
    panNumber: 'FGHIJ5678K',
    clientCode: 'CL002',
    email: 'priya.mehta@email.com',
    phone: '+91-9876543211',
    kycStatus: 'VERIFIED',
    riskProfile: 'AGGRESSIVE',
    totalAUM: 1250000,
    address: '456, Koramangala, Bangalore, Karnataka - 560034',
    dateOfBirth: '1990-07-22',
    occupation: 'Marketing Manager',
    portfolios: [
      {
        id: 'p4',
        type: 'MUTUAL_FUND',
        schemeName: 'HDFC Equity Fund - Direct Growth',
        currentValue: 450000,
        broker: 'ICICI Direct',
        folioNumber: 'FOL-002-234567',
        units: 3200.75,
        nav: 140.63,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      },
      {
        id: 'p5',
        type: 'MUTUAL_FUND',
        schemeName: 'Axis Small Cap Fund - Direct Growth',
        currentValue: 800000,
        broker: 'Zerodha',
        folioNumber: 'FOL-002-345678',
        units: 4500.25,
        nav: 177.78,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: '3',
    name: 'Amit Singh',
    panNumber: 'LMNOP9012Q',
    clientCode: 'CL003',
    email: 'amit.singh@email.com',
    phone: '+91-9876543212',
    kycStatus: 'PENDING',
    riskProfile: 'CONSERVATIVE',
    totalAUM: 750000,
    address: '789, Indiranagar, Bangalore, Karnataka - 560038',
    dateOfBirth: '1978-11-08',
    occupation: 'Business Analyst',
    portfolios: [
      {
        id: 'p6',
        type: 'MUTUAL_FUND',
        schemeName: 'SBI Conservative Fund - Direct Growth',
        currentValue: 400000,
        broker: 'SBI Securities',
        folioNumber: 'FOL-003-456789',
        units: 2800.5,
        nav: 142.86,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      },
      {
        id: 'p7',
        type: 'NPS',
        schemeName: 'NPS Conservative Scheme - Auto Choice',
        currentValue: 350000,
        broker: 'HDFC Securities',
        folioNumber: 'NPS-003-567890',
        units: 3150.75,
        nav: 111.11,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: '4',
    name: 'Suresh Patel',
    panNumber: 'QRSTU3456V',
    clientCode: 'CL004',
    email: 'suresh.patel@email.com',
    phone: '+91-9876543213',
    kycStatus: 'VERIFIED',
    riskProfile: 'MODERATE',
    totalAUM: 2100000,
    address: '321, Whitefield, Bangalore, Karnataka - 560066',
    dateOfBirth: '1982-05-12',
    occupation: 'Senior Manager',
    portfolios: [
      {
        id: 'p8',
        type: 'MUTUAL_FUND',
        schemeName: 'Kotak Emerging Equity Fund - Direct Growth',
        currentValue: 1200000,
        broker: 'Kotak Securities',
        folioNumber: 'FOL-004-678901',
        units: 6000.25,
        nav: 200.00,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      },
      {
        id: 'p9',
        type: 'INSURANCE',
        schemeName: 'HDFC Life Click 2 Protect Plus',
        currentValue: 900000,
        broker: 'HDFC Life',
        folioNumber: 'HDFC-004-789012',
        units: 1,
        nav: 900000,
        lastUpdated: '2024-08-05',
        status: 'ACTIVE'
      }
    ]
  }
];

// Mock Brokers Data
export const mockBrokers: Broker[] = [
  {
    id: '1',
    name: 'HDFC Securities',
    code: 'HDFC001',
    arnCode: 'ARN-123456',
    sebiRegistration: 'SEBI-REG-123456',
    address: 'HDFC Bank House, HDFC Bank Limited, 165-166, Backbay Reclamation, Mumbai - 400020',
    phone: '+91-22-66521000',
    email: 'support@hdfcsec.com',
    rating: 4.5,
    activeClients: 1500000,
    specialties: ['Mutual Funds', 'Equity Trading', 'IPO', 'Research']
  },
  {
    id: '2',
    name: 'ICICI Direct',
    code: 'ICICI001',
    arnCode: 'ARN-789012',
    sebiRegistration: 'SEBI-REG-789012',
    address: 'ICICI Bank Tower, ICICI Bank Limited, Bandra Kurla Complex, Mumbai - 400051',
    phone: '+91-22-40701000',
    email: 'support@icicidirect.com',
    rating: 4.3,
    activeClients: 1200000,
    specialties: ['Mutual Funds', 'Equity Trading', 'Commodities', 'Currency']
  },
  {
    id: '3',
    name: 'Zerodha',
    code: 'ZERO001',
    arnCode: 'ARN-345678',
    sebiRegistration: 'SEBI-REG-345678',
    address: 'Zerodha House, Plot No. 865, 1st Floor, 8th Cross, 2nd Phase, 100 Feet Ring Road, Indiranagar, Bangalore - 560038',
    phone: '+91-80-40402020',
    email: 'support@zerodha.com',
    rating: 4.7,
    activeClients: 800000,
    specialties: ['Equity Trading', 'F&O', 'Currency', 'Commodities']
  },
  {
    id: '4',
    name: 'SBI Securities',
    code: 'SBI001',
    arnCode: 'ARN-901234',
    sebiRegistration: 'SEBI-REG-901234',
    address: 'SBI Corporate Office, State Bank Bhavan, Madame Cama Road, Mumbai - 400021',
    phone: '+91-22-22785100',
    email: 'support@sbisecurities.com',
    rating: 4.1,
    activeClients: 900000,
    specialties: ['Mutual Funds', 'Equity Trading', 'NPS', 'Insurance']
  },
  {
    id: '5',
    name: 'Kotak Securities',
    code: 'KOTAK001',
    arnCode: 'ARN-567890',
    sebiRegistration: 'SEBI-REG-567890',
    address: 'Kotak Mahindra Bank Limited, 27BKC, C-27, G Block, Bandra Kurla Complex, Mumbai - 400051',
    phone: '+91-22-43360000',
    email: 'support@kotaksecurities.com',
    rating: 4.4,
    activeClients: 700000,
    specialties: ['Mutual Funds', 'Equity Trading', 'Research', 'Wealth Management']
  }
];

// Mock Reason Codes
export const reasonCodes: ReasonCode[] = [
  {
    code: 'BETTER_SERVICE',
    description: 'Better service quality and support',
    category: 'Service'
  },
  {
    code: 'LOWER_CHARGES',
    description: 'Lower brokerage charges and fees',
    category: 'Cost'
  },
  {
    code: 'PLATFORM_FEATURES',
    description: 'Better platform features and technology',
    category: 'Technology'
  },
  {
    code: 'CLIENT_REQUEST',
    description: 'Client specific request or preference',
    category: 'Client'
  },
  {
    code: 'RESEARCH_QUALITY',
    description: 'Better research and advisory services',
    category: 'Research'
  },
  {
    code: 'BRANCH_ACCESS',
    description: 'Better branch network and accessibility',
    category: 'Accessibility'
  }
];

// Mock Requests Data
export const mockRequests: BrokerChangeRequest[] = [
  {
    id: 'REQ-001',
    clientName: 'Rajesh Kumar Sharma',
    clientCode: 'CL001',
    requestType: 'Mutual Fund',
    oldBroker: 'HDFC Securities',
    newBroker: 'Zerodha',
    status: 'PROCESSING',
    submittedAt: '2024-08-05T10:30:00',
    estimatedCompletion: '2024-08-08T18:00:00',
    reason: 'Lower brokerage charges',
    reasonCode: 'LOWER_CHARGES',
    additionalNotes: 'Client wants to reduce transaction costs for regular SIP investments.',
    timeline: [
      { event: 'Request Created', date: '2024-08-05T10:30:00', status: 'completed', performedBy: 'System' },
      { event: 'Documents Generated', date: '2024-08-05T10:35:00', status: 'completed', performedBy: 'System' },
      { event: 'Submitted for Review', date: '2024-08-05T11:00:00', status: 'completed', performedBy: 'Rajesh Kumar Sharma' },
      { event: 'Under Processing', date: '2024-08-06T09:00:00', status: 'current', performedBy: 'Processing Team' },
      { event: 'Completion', date: '2024-08-08T18:00:00', status: 'pending', performedBy: 'AMC' }
    ],
    documents: [
      { id: 'doc1', name: 'Broker Change Form', type: 'FORM', status: 'VERIFIED', uploadedAt: '2024-08-05T10:35:00', verifiedAt: '2024-08-05T11:00:00' },
      { id: 'doc2', name: 'KYC Document', type: 'KYC', status: 'VERIFIED', uploadedAt: '2024-08-05T10:40:00', verifiedAt: '2024-08-05T11:30:00' }
    ]
  },
  {
    id: 'REQ-002',
    clientName: 'Priya Mehta',
    clientCode: 'CL002',
    requestType: 'NPS',
    oldBroker: 'SBI Securities',
    newBroker: 'HDFC Securities',
    status: 'COMPLETED',
    submittedAt: '2024-08-03T14:20:00',
    completedAt: '2024-08-05T16:45:00',
    reason: 'Better service quality',
    reasonCode: 'BETTER_SERVICE',
    timeline: [
      { event: 'Request Created', date: '2024-08-03T14:20:00', status: 'completed', performedBy: 'System' },
      { event: 'Documents Generated', date: '2024-08-03T14:25:00', status: 'completed', performedBy: 'System' },
      { event: 'Submitted for Review', date: '2024-08-03T15:00:00', status: 'completed', performedBy: 'Priya Mehta' },
      { event: 'Approved', date: '2024-08-04T10:00:00', status: 'completed', performedBy: 'Review Team' },
      { event: 'Completed', date: '2024-08-05T16:45:00', status: 'completed', performedBy: 'NPS Trust' }
    ],
    documents: [
      { id: 'doc3', name: 'NPS Transfer Form', type: 'FORM', status: 'VERIFIED', uploadedAt: '2024-08-03T14:25:00', verifiedAt: '2024-08-03T15:00:00' },
      { id: 'doc4', name: 'PAN Card', type: 'PAN_CARD', status: 'VERIFIED', uploadedAt: '2024-08-03T14:30:00', verifiedAt: '2024-08-03T15:15:00' }
    ]
  },
  {
    id: 'REQ-003',
    clientName: 'Amit Singh',
    clientCode: 'CL003',
    requestType: 'Insurance',
    oldBroker: 'LIC of India',
    newBroker: 'HDFC Life',
    status: 'UNDER_REVIEW',
    submittedAt: '2024-08-04T09:15:00',
    reason: 'Platform features',
    reasonCode: 'PLATFORM_FEATURES',
    additionalNotes: 'Client prefers digital platform for policy management.',
    timeline: [
      { event: 'Request Created', date: '2024-08-04T09:15:00', status: 'completed', performedBy: 'System' },
      { event: 'Documents Generated', date: '2024-08-04T09:20:00', status: 'completed', performedBy: 'System' },
      { event: 'Submitted for Review', date: '2024-08-04T09:45:00', status: 'completed', performedBy: 'Amit Singh' },
      { event: 'Under Review', date: '2024-08-04T14:00:00', status: 'current', performedBy: 'Review Team' },
      { event: 'Completion', date: '2024-08-07T18:00:00', status: 'pending', performedBy: 'Insurance Company' }
    ],
    documents: [
      { id: 'doc5', name: 'Insurance Transfer Form', type: 'FORM', status: 'VERIFIED', uploadedAt: '2024-08-04T09:20:00', verifiedAt: '2024-08-04T09:45:00' },
      { id: 'doc6', name: 'Policy Document', type: 'KYC', status: 'REQUIRED' }
    ]
  }
];

// Service functions
export const getClients = (): Client[] => {
  return mockClients;
};

export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const searchClients = (query: string): Client[] => {
  const lowerQuery = query.toLowerCase();
  return mockClients.filter(client =>
    client.name.toLowerCase().includes(lowerQuery) ||
    client.clientCode.toLowerCase().includes(lowerQuery) ||
    client.panNumber.toLowerCase().includes(lowerQuery) ||
    client.email.toLowerCase().includes(lowerQuery)
  );
};

export const getBrokers = (): Broker[] => {
  return mockBrokers;
};

export const getBrokerById = (id: string): Broker | undefined => {
  return mockBrokers.find(broker => broker.id === id);
};

export const getRequests = (): BrokerChangeRequest[] => {
  return mockRequests;
};

export const getRequestById = (id: string): BrokerChangeRequest | undefined => {
  return mockRequests.find(request => request.id === id);
};

export const getReasonCodes = (): ReasonCode[] => {
  return reasonCodes;
};

// Simulate API delays
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Enhanced search with debouncing
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 