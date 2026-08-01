import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Search,
  Plus,
  RefreshCw,
  Activity,
  Clock,
  Send,
  Terminal,
  Lock,
  Edit2,
  Trash2,
  Radio,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck,
  Zap,
  ChevronRight,
  Filter,
  Image as ImageIcon,
  Camera,
  Upload,
  UserX,
  User,
  MapPin,
  Calendar,
  Globe,
  DollarSign,
  Maximize2,
  Shield,
  AlertOctagon,
  Eye,
  PlusCircle,
  X,
  Printer,
  Download,
  Grid
} from 'lucide-react';

export interface ProgressUpdate {
  id: string;
  timestamp: string;
  author: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'RESOLVED';
  message: string;
}

export interface EvidencePhoto {
  id: string;
  title: string;
  url: string;
  caption: string;
  timestamp: string;
  uploadedBy: string;
}

export interface Suspect {
  id: string;
  name: string;
  alias: string;
  photoUrl: string;
  threatLevel: 'CRITICAL' | 'EXTREME' | 'HIGH' | 'MODERATE';
  status: 'AT_LARGE' | 'APPREHENDED' | 'UNDER_SURVEILLANCE' | 'UNKNOWN';
  lastKnownLocation: string;
  biography: string;
}

export interface Victim {
  name: string;
  photoUrl: string;
  identitySummary: string;
  status: 'PROTECTED' | 'EVACUATED' | 'AT_LARGE' | 'COMPROMISED' | 'SAFE';
  location: string;
  contactOrBio: string;
}

export interface ClientCase {
  id: string;
  caseNumber: string;
  name: string;
  alias: string;
  classification: 'LEVEL 5 - TOP SECRET' | 'LEVEL 4 - CRITICAL' | 'LEVEL 3 - HIGH' | 'LEVEL 2 - MEDIUM';
  status: 'ACTIVE_SURVEILLANCE' | 'DECRYPT_PENDING' | 'INTERCEPTED' | 'CLOSED';
  natureOfInvestigation: string;
  targetSystems: string[];
  assignedOfficer: string;
  progressPercentage: number;
  lastUpdated: string;
  incidentDate: string;
  jurisdiction: string;
  financialImpact: string;
  investigatedDuration: string;
  victim: Victim;
  suspects: Suspect[];
  evidencePhotos: EvidencePhoto[];
  updates: ProgressUpdate[];
}

const INITIAL_CASES: ClientCase[] = [
  {
    id: 'case-101',
    caseNumber: 'CY-2026-8821',
    name: 'Marcus Sterling',
    alias: 'Vanguard-9',
    classification: 'LEVEL 4 - CRITICAL',
    status: 'ACTIVE_SURVEILLANCE',
    natureOfInvestigation:
      'Suspected involvement in illegal multi-vector data exfiltration from regional satellite telemetry nodes. Subject exhibits high operational security and utilizes custom cryptographic relays to breach critical infrastructure.',
    targetSystems: ['SAT-COMM-04', 'POWER_GRID_EAST', 'QUANTUM_RELAY_A'],
    assignedOfficer: 'AGENT VANCE (SEC-882)',
    progressPercentage: 68,
    lastUpdated: '2 mins ago',
    incidentDate: '2026-06-14',
    jurisdiction: 'Federal Cyber Task Force / Interpol Relay Node',
    financialImpact: '$42,500,000 USD',
    investigatedDuration: '48 Hours',
    victim: {
      name: 'Dr. Evelyn Vance',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      identitySummary: 'Chief Quantum Cryptography Researcher & Executive Lead at Apex Defense Labs',
      status: 'AT_LARGE',
      location: 'Secured Safehouse Facility Delta (Geneva Coordinates Grid 7)',
      contactOrBio: 'Dr. Vance holds top-secret level clearance for orbital defense keys. Following identity compromise and physical surveillance threats from Vanguard-9, she has been placed under Federal Identity Protection.'
    },
    suspects: [
      {
        id: 's-1',
        name: 'Dmitri Volkov',
        alias: 'The Spectre',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        threatLevel: 'CRITICAL',
        status: 'AT_LARGE',
        lastKnownLocation: 'Cyberspace Proxy Relay (Zurich / Eastern EU Hop)',
        biography: 'Ex-military electronic warfare specialist wanted for orchestrating global malware deployment. Highly skilled in kernel zero-days.'
      },
      {
        id: 's-2',
        name: 'Ksenia Romanova',
        alias: 'NullPointer',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        threatLevel: 'HIGH',
        status: 'UNDER_SURVEILLANCE',
        lastKnownLocation: 'Frankfurt Network Switch Facility Node 4',
        biography: 'Key developer behind custom ransomware payloads targeting orbital relay satellite communications.'
      }
    ],
    evidencePhotos: [
      {
        id: 'p-1',
        title: 'Exfiltration Packet Dump',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        caption: 'Intercepted encrypted satellite telemetry packet header capture (4.2MB binary buffer payload).',
        timestamp: '01:02:14 UTC',
        uploadedBy: 'FIELD PROBE ALPHA'
      },
      {
        id: 'p-2',
        title: 'Server Hardware Probe',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        caption: 'Physical relay node circuit board seized during field operation in Zurich.',
        timestamp: '23:40:11 UTC',
        uploadedBy: 'AGENT VANCE'
      }
    ],
    updates: [
      {
        id: 'u-1',
        timestamp: '01:02:14 UTC',
        author: 'FIELD PROBE ALPHA',
        severity: 'CRITICAL',
        message: 'Detected encrypted outbound payload (4.2MB) to unknown proxy node in Zurich.'
      },
      {
        id: 'u-2',
        timestamp: '00:45:00 UTC',
        author: 'AGENT VANCE',
        severity: 'INFO',
        message: 'Subpoena served for cloud storage access logs. Awaiting decryption key exchange.'
      },
      {
        id: 'u-3',
        timestamp: '23:15:22 UTC',
        author: 'ANALYST KIM',
        severity: 'WARNING',
        message: 'Subject changed primary mobile hardware MAC address. Satellite tracking re-acquired.'
      }
    ]
  },
  {
    id: 'case-102',
    caseNumber: 'CY-2026-4409',
    name: 'Aether Synth Dynamics',
    alias: 'PROJECT APEX',
    classification: 'LEVEL 5 - TOP SECRET',
    status: 'DECRYPT_PENDING',
    natureOfInvestigation:
      'Investigation into unauthorized synthetic voice generation vectors used for financial institution executive impersonation. Key infrastructure traces point to isolated server farms in Eastern Europe.',
    targetSystems: ['FIN_CORE_DB', 'VOICE_SYNTH_API', 'GLOBAL_PAYMENTS_GATEWAY'],
    assignedOfficer: 'AGENT CHEN (SEC-419)',
    progressPercentage: 42,
    lastUpdated: '12 mins ago',
    incidentDate: '2026-07-02',
    jurisdiction: 'Cyber Financial Crimes Unit & US Secret Service Relay',
    financialImpact: '$118,000,000 USD',
    investigatedDuration: '48 Hours',
    victim: {
      name: 'Global Banking Consortium',
      photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      identitySummary: 'International Federal Reserve Clearing Partner & Institutional Vault Systems',
      status: 'COMPROMISED',
      location: 'New York Financial HQ / Vault Sector 3',
      contactOrBio: 'Executive board members targeted with AI voice clone phishing calls that authorized emergency wire transfers to off-shore quantum escrow nodes.'
    },
    suspects: [
      {
        id: 's-10',
        name: 'Victor Vance',
        alias: 'VoiceCraft',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        threatLevel: 'EXTREME',
        status: 'AT_LARGE',
        lastKnownLocation: 'Prague Telecommunications Relay',
        biography: 'Architect of deepfake voice neural networks designed to bypass biometrics.'
      }
    ],
    evidencePhotos: [
      {
        id: 'p-10',
        title: 'Deepfake Spectral Audio Waveform',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        caption: 'Audio spectrum analysis revealing synthetic artifact frequencies in hijacked wire call.',
        timestamp: '19:30:00 UTC',
        uploadedBy: 'AUDIO LAB ANALYST'
      }
    ],
    updates: [
      {
        id: 'u-10',
        timestamp: '00:50:11 UTC',
        author: 'CYBER LAB DECRYPT',
        severity: 'WARNING',
        message: 'Decryption sequence reached Stage 3. 2,048-bit RSA modulus factorization at 42% completion.'
      },
      {
        id: 'u-11',
        timestamp: '19:30:00 UTC',
        author: 'AGENT CHEN',
        severity: 'INFO',
        message: 'Intercepted voice model weights file signature matching stolen internal prototype.'
      }
    ]
  },
  {
    id: 'case-103',
    caseNumber: 'CY-2026-1102',
    name: 'Elena Rostova',
    alias: 'Shadow_Cipher',
    classification: 'LEVEL 3 - HIGH',
    status: 'INTERCEPTED',
    natureOfInvestigation:
      'Zero-day vulnerability deployment targeting federal biometric authentication endpoints. Subject identified as primary developer of custom kernel-level rootkit.',
    targetSystems: ['BIOMETRIC_ID_SERVER', 'SECURE_AUTH_V3'],
    assignedOfficer: 'AGENT VANCE (SEC-882)',
    progressPercentage: 91,
    lastUpdated: '1 hour ago',
    incidentDate: '2026-05-28',
    jurisdiction: 'National Security Cyber Division',
    financialImpact: '$14,200,000 USD',
    investigatedDuration: '48 Hours',
    victim: {
      name: 'Department of Biometric Security',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      identitySummary: 'Federal Identity Directory Office & Central Passport Registry',
      status: 'PROTECTED',
      location: 'Washington DC HQ Operations Center',
      contactOrBio: 'System administrators compromised via social engineering attack; database integrity restored via cloud backups.'
    },
    suspects: [
      {
        id: 's-20',
        name: 'Elena Rostova',
        alias: 'Shadow_Cipher',
        photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
        threatLevel: 'HIGH',
        status: 'APPREHENDED',
        lastKnownLocation: 'Federal Detention Center - Wing B',
        biography: 'Apprehended by cyber strike team following IP trace on compromised satellite uplink.'
      }
    ],
    evidencePhotos: [
      {
        id: 'p-20',
        title: 'Rootkit Kernel Binary',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        caption: 'Disassembled binary showing low-level memory injection hooks.',
        timestamp: '23:58:19 UTC',
        uploadedBy: 'RESPONSE TEAM DELTA'
      }
    ],
    updates: [
      {
        id: 'u-20',
        timestamp: '23:58:19 UTC',
        author: 'RESPONSE TEAM DELTA',
        severity: 'RESOLVED',
        message: 'Primary command-and-control IP neutralized by cloud infrastructure ISP. Main repository secured.'
      },
      {
        id: 'u-21',
        timestamp: '18:12:05 UTC',
        author: 'AGENT VANCE',
        severity: 'INFO',
        message: 'Final evidentiary report compiled for Cyber Prosecution Division.'
      }
    ]
  }
];

export const ClientCaseManagement: React.FC = () => {
  const [cases, setCases] = useState<ClientCase[]>(INITIAL_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(INITIAL_CASES[0].id);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'VICTIM' | 'SUSPECTS' | 'PHOTOS' | 'DISPATCH'>('OVERVIEW');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isLiveStreamActive, setIsLiveStreamActive] = useState<boolean>(true);

  // Modal / Form States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showAddSuspectModal, setShowAddSuspectModal] = useState(false);
  const [showEditVictimModal, setShowEditVictimModal] = useState(false);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);

  // Gallery Grid State
  const [photoGalleryCategory, setPhotoGalleryCategory] = useState<'ALL' | 'EVIDENCE' | 'SUSPECTS' | 'VICTIM'>('ALL');
  const [selectedPreviewItem, setSelectedPreviewItem] = useState<{
    id: string;
    title: string;
    url: string;
    caption: string;
    timestamp: string;
    category: 'EVIDENCE' | 'SUSPECT' | 'VICTIM';
    uploadedBy: string;
    badgeText: string;
    badgeColor: string;
  } | null>(null);

  // New Case Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientAlias, setNewClientAlias] = useState('');
  const [newNature, setNewNature] = useState('');
  const [newClassification, setNewClassification] =
    useState<ClientCase['classification']>('LEVEL 4 - CRITICAL');
  const [newTargetSystems, setNewTargetSystems] = useState('');
  const [newVictimName, setNewVictimName] = useState('');
  const [newVictimPhoto, setNewVictimPhoto] = useState('');
  const [newInvestigatedDuration, setNewInvestigatedDuration] = useState('48 Hours');

  // Editing Case / Nature State
  const [isEditingNature, setIsEditingNature] = useState(false);
  const [editedNatureText, setEditedNatureText] = useState('');

  // Add Photo Form State
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');

  // Add Suspect Form State
  const [suspectName, setSuspectName] = useState('');
  const [suspectAlias, setSuspectAlias] = useState('');
  const [suspectPhotoUrl, setSuspectPhotoUrl] = useState('');
  const [suspectThreat, setSuspectThreat] = useState<Suspect['threatLevel']>('CRITICAL');
  const [suspectStatus, setSuspectStatus] = useState<Suspect['status']>('AT_LARGE');
  const [suspectLocation, setSuspectLocation] = useState('');
  const [suspectBio, setSuspectBio] = useState('');

  // Edit Victim Form State
  const [editVicName, setEditVicName] = useState('');
  const [editVicPhoto, setEditVicPhoto] = useState('');
  const [editVicSummary, setEditVicSummary] = useState('');
  const [editVicStatus, setEditVicStatus] = useState<Victim['status']>('AT_LARGE');
  const [editVicLocation, setEditVicLocation] = useState('');
  const [editVicBio, setEditVicBio] = useState('');

  // New Progress Update Form State
  const [newUpdateText, setNewUpdateText] = useState('');
  const [newUpdateSeverity, setNewUpdateSeverity] = useState<ProgressUpdate['severity']>('INFO');
  const [newUpdateAuthor, setNewUpdateAuthor] = useState('AGENT ON-DUTY');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const suspectFileInputRef = useRef<HTMLInputElement>(null);
  const victimFileInputRef = useRef<HTMLInputElement>(null);

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  // Auto real-time telemetry simulator effect
  useEffect(() => {
    if (!isLiveStreamActive) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const telemetryEvents = [
          'Packet inspection verified clean SHA-256 hash checksum.',
          'Real-time IP routing trace updated: Node hop ping 14ms.',
          'Biometric surveillance log synchronized with central database.',
          'Telemetry probe heartbeat signal confirmed active.',
          'Automated threat heuristic scan completed with 0 new anomalies.'
        ];
        const randomMsg = telemetryEvents[Math.floor(Math.random() * telemetryEvents.length)];
        const autoUpdate: ProgressUpdate = {
          id: `auto-${Date.now()}`,
          timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
          author: 'AUTO-TELEMETRY',
          severity: 'INFO',
          message: randomMsg
        };

        setCases((prevCases) =>
          prevCases.map((c) => {
            if (c.id === selectedCaseId) {
              return {
                ...c,
                lastUpdated: 'Just now',
                updates: [autoUpdate, ...c.updates]
              };
            }
            return c;
          })
        );
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [isLiveStreamActive, selectedCaseId]);

  // Export Full Case File as Formatted PDF Summary
  const handleExportPDF = (caseData: ClientCase) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export the formatted case file PDF summary.');
      return;
    }

    const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>CYBER_FBI_CASE_${caseData.caseNumber}.pdf</title>
    <style>
      @page { size: A4; margin: 12mm; }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'Courier New';
        color: #0f172a;
        background: #ffffff;
        font-size: 11px;
        line-height: 1.5;
        margin: 0;
        padding: 24px;
      }
      .header {
        border-bottom: 2px solid #0284c7;
        padding-bottom: 12px;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .title-sub {
        font-size: 10px;
        font-weight: 800;
        color: #0369a1;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      h1 {
        font-size: 22px;
        margin: 4px 0 8px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #092e42;
      }
      .badge-row {
        display: flex;
        gap: 6px;
        margin-top: 4px;
      }
      .badge {
        display: inline-block;
        padding: 4px 8px;
        background: #0f172a;
        color: #ffffff;
        font-size: 10px;
        font-weight: 700;
        border-radius: 2px;
      }
      .badge-crit { background: #b91c1c; }
      .badge-cyan { background: #0284c7; }
      .badge-dur { background: #0f766e; }
      .grid-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 16px;
      }
      .box {
        border: 1px solid #cbd5e1;
        padding: 8px 10px;
        background: #f8fafc;
        border-radius: 4px;
      }
      .box-label {
        font-size: 9px;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
        margin-bottom: 2px;
      }
      .box-val {
        font-size: 11px;
        font-weight: 700;
        color: #0f172a;
      }
      .section-title {
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-left: 4px solid #0284c7;
        padding-left: 8px;
        margin: 20px 0 10px 0;
        background: #e0f2fe;
        color: #0369a1;
        padding-top: 4px;
        padding-bottom: 4px;
      }
      .profile-card {
        border: 1px solid #cbd5e1;
        padding: 12px;
        background: #ffffff;
        margin-bottom: 12px;
        display: flex;
        gap: 14px;
        border-radius: 4px;
      }
      .profile-img {
        width: 85px;
        height: 100px;
        object-fit: cover;
        border: 2px solid #0284c7;
        border-radius: 3px;
        flex-shrink: 0;
      }
      .suspect-img {
        border-color: #dc2626;
      }
      .photo-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 16px;
      }
      .photo-card {
        border: 1px solid #cbd5e1;
        padding: 8px;
        background: #f8fafc;
        border-radius: 4px;
        text-align: left;
      }
      .photo-card img {
        width: 100%;
        height: 110px;
        object-fit: cover;
        border-radius: 2px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
        margin-top: 8px;
      }
      th, td {
        border: 1px solid #cbd5e1;
        padding: 6px 8px;
        text-align: left;
      }
      th {
        background: #f1f5f9;
        font-weight: 700;
        color: #334155;
      }
      .footer {
        margin-top: 30px;
        padding-top: 12px;
        border-top: 1px dashed #94a3b8;
        font-size: 9px;
        color: #64748b;
        text-align: center;
      }
      @media print {
        .no-print { display: none; }
      }
    </style>
  </head>
  <body>
    <div class="no-print" style="margin-bottom: 16px; text-align: right;">
      <button onclick="window.print()" style="padding: 10px 20px; background: #0284c7; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        🖨️ PRINT / DOWNLOAD FORMATTED PDF SUMMARY
      </button>
    </div>

    <div class="header">
      <div>
        <div class="title-sub">CYBER FBI COMMAND DIVISION — OFFICIAL CASE DOSSIER REPORT</div>
        <h1>${caseData.name} (${caseData.alias})</h1>
        <div class="badge-row">
          <span class="badge">${caseData.caseNumber}</span>
          <span class="badge badge-crit">${caseData.classification}</span>
          <span class="badge badge-cyan">STATUS: ${caseData.status}</span>
          <span class="badge badge-dur">DURATION: ${caseData.investigatedDuration || '48 Hours'}</span>
        </div>
      </div>
      <div style="text-align: right; font-size: 10px; color: #334155;">
        <div><strong>ASSIGNED OFFICER:</strong> ${caseData.assignedOfficer}</div>
        <div><strong>INCIDENT DATE:</strong> ${caseData.incidentDate}</div>
        <div><strong>REPORT GENERATED:</strong> ${new Date().toLocaleString()}</div>
      </div>
    </div>

    <div class="grid-4">
      <div class="box">
        <div class="box-label">Jurisdiction</div>
        <div class="box-val">${caseData.jurisdiction}</div>
      </div>
      <div class="box">
        <div class="box-label">Financial Impact</div>
        <div class="box-val" style="color:#b91c1c;">${caseData.financialImpact}</div>
      </div>
      <div class="box">
        <div class="box-label">Investigated Duration</div>
        <div class="box-val" style="color:#0284c7;">${caseData.investigatedDuration || '48 Hours'}</div>
      </div>
      <div class="box">
        <div class="box-label">Progress Solved</div>
        <div class="box-val">${caseData.progressPercentage}% Complete</div>
      </div>
    </div>

    <div class="box" style="margin-bottom: 16px;">
      <div class="box-label">Nature of Investigation & Case Scope</div>
      <p style="margin: 4px 0 0 0; line-height: 1.6; color: #1e293b;">${caseData.natureOfInvestigation}</p>
    </div>

    <div class="box" style="margin-bottom: 16px;">
      <div class="box-label">Target Infrastructure Endpoints</div>
      <div style="margin-top: 4px;">
        ${caseData.targetSystems.map(s => `<span style="display:inline-block; background:#e0f2fe; color:#0369a1; padding:3px 8px; margin-right:4px; font-weight:700; border-radius:3px; font-size:10px;">${s}</span>`).join('')}
      </div>
    </div>

    <div class="section-title">VICTIM & TARGET IDENTIFICATION PROFILE</div>
    <div class="profile-card">
      <img src="${caseData.victim.photoUrl}" class="profile-img" alt="Victim Photo" />
      <div style="flex:1;">
        <div style="font-size: 15px; font-weight: 800; color: #0f172a;">${caseData.victim.name}</div>
        <div style="color: #0284c7; font-weight: 700; margin-bottom: 6px;">${caseData.victim.identitySummary}</div>
        <div style="font-size: 10px; margin-bottom: 4px;">
          <strong>IDENTITY PROTECTION STATUS:</strong> <span class="badge" style="background:#0284c7; padding:2px 6px;">${caseData.victim.status}</span>
          &nbsp;|&nbsp; <strong>CURRENT SAFEHOUSE LOCATION:</strong> ${caseData.victim.location}
        </div>
        <p style="margin: 6px 0 0 0; color: #475569; font-size: 10px;">${caseData.victim.contactOrBio}</p>
      </div>
    </div>

    <div class="section-title">PRIME SUSPECTS & THREAT ACTORS MATRIX (${caseData.suspects.length} Identified)</div>
    ${caseData.suspects.map(s => `
      <div class="profile-card">
        <img src="${s.photoUrl}" class="profile-img suspect-img" alt="Suspect Photo" />
        <div style="flex:1;">
          <div style="font-size: 14px; font-weight: 800;">${s.name} <span style="color:#b91c1c; font-size:11px;">(ALIAS: "${s.alias}")</span></div>
          <div style="margin: 4px 0;">
            <span class="badge badge-crit">THREAT: ${s.threatLevel}</span>
            <span class="badge" style="background:#475569;">STATUS: ${s.status}</span>
          </div>
          <div style="font-size: 10px; margin: 4px 0;"><strong>LAST KNOWN LOCATION:</strong> ${s.lastKnownLocation}</div>
          <p style="margin: 4px 0 0 0; color: #334155; font-size: 10px;">${s.biography}</p>
        </div>
      </div>
    `).join('')}

    <div class="section-title">EVIDENCE & SURVEILLANCE PHOTO CATALOG (${caseData.evidencePhotos.length} Captured Items)</div>
    <div class="photo-grid">
      ${caseData.evidencePhotos.map(p => `
        <div class="photo-card">
          <img src="${p.url}" alt="${p.title}" />
          <div style="font-weight: 700; font-size: 11px; margin-top: 6px; color:#0f172a;">${p.title}</div>
          <div style="font-size: 10px; color: #475569; margin-top: 2px;">${p.caption}</div>
          <div style="font-size: 9px; color: #94a3b8; margin-top: 6px;">Uploader: ${p.uploadedBy} | ${p.timestamp}</div>
        </div>
      `).join('')}
    </div>

    <div class="section-title">CHRONOLOGICAL DISPATCH LOG & TELEMETRY (${caseData.updates.length} Logs)</div>
    <table>
      <thead>
        <tr>
          <th style="width: 100px;">Timestamp</th>
          <th style="width: 140px;">Author / Officer</th>
          <th style="width: 90px;">Severity</th>
          <th>Message Log</th>
        </tr>
      </thead>
      <tbody>
        ${caseData.updates.map(u => `
          <tr>
            <td style="white-space:nowrap; font-weight:700;">${u.timestamp}</td>
            <td>${u.author}</td>
            <td style="font-weight:700; color:${u.severity === 'CRITICAL' ? '#b91c1c' : u.severity === 'WARNING' ? '#d97706' : '#0284c7'};">${u.severity}</td>
            <td>${u.message}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="footer">
      CONFIDENTIAL DOCUMENT — CYBER FBI TASK FORCE SUMMARY REPORT — FOR OFFICIAL AGENCY USE ONLY
    </div>
  </body>
</html>`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Get combined photo gallery list across evidence, suspects, and victim
  const getGalleryItems = () => {
    const items: {
      id: string;
      title: string;
      url: string;
      caption: string;
      timestamp: string;
      category: 'EVIDENCE' | 'SUSPECT' | 'VICTIM';
      uploadedBy: string;
      badgeText: string;
      badgeColor: string;
    }[] = [];

    // 1. Evidence Photos
    activeCase.evidencePhotos.forEach((p) => {
      items.push({
        id: p.id,
        title: p.title,
        url: p.url,
        caption: p.caption,
        timestamp: p.timestamp,
        category: 'EVIDENCE',
        uploadedBy: p.uploadedBy,
        badgeText: 'EVIDENCE CAPTURE',
        badgeColor: 'bg-cyan-950/90 border-cyan-500/60 text-cyan-300'
      });
    });

    // 2. Suspect Photos
    activeCase.suspects.forEach((s) => {
      items.push({
        id: `sus-img-${s.id}`,
        title: `PRIME SUSPECT: ${s.name}`,
        url: s.photoUrl,
        caption: `Alias: "${s.alias}" | Threat Level: ${s.threatLevel} | Status: ${s.status}. Last known location: ${s.lastKnownLocation}`,
        timestamp: 'SURVEILLANCE DOSSIER',
        category: 'SUSPECT',
        uploadedBy: 'CRIMINAL INTEL MATRIX',
        badgeText: `SUSPECT (${s.status})`,
        badgeColor: 'bg-rose-950/90 border-rose-500/60 text-rose-300'
      });
    });

    // 3. Victim Photo
    if (activeCase.victim) {
      items.push({
        id: `vic-img-${activeCase.id}`,
        title: `VICTIM PROFILE: ${activeCase.victim.name}`,
        url: activeCase.victim.photoUrl,
        caption: `${activeCase.victim.identitySummary}. Status: ${activeCase.victim.status}. Location: ${activeCase.victim.location}`,
        timestamp: 'IDENTITY PROTECTION',
        category: 'VICTIM',
        uploadedBy: 'CLIENT PROTECTION REGISTRY',
        badgeText: `VICTIM (${activeCase.victim.status})`,
        badgeColor: 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300'
      });
    }

    if (photoGalleryCategory === 'ALL') return items;
    if (photoGalleryCategory === 'EVIDENCE') return items.filter((i) => i.category === 'EVIDENCE');
    if (photoGalleryCategory === 'SUSPECTS') return items.filter((i) => i.category === 'SUSPECT');
    if (photoGalleryCategory === 'VICTIM') return items.filter((i) => i.category === 'VICTIM');
    return items;
  };

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'EVIDENCE' | 'SUSPECT' | 'VICTIM') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (target === 'EVIDENCE') setPhotoUrlInput(result);
        if (target === 'SUSPECT') setSuspectPhotoUrl(result);
        if (target === 'VICTIM') setEditVicPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dispatch Evidence Photo
  const handleAddEvidencePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrlInput.trim()) return;

    const newPhoto: EvidencePhoto = {
      id: `p-${Date.now()}`,
      title: photoTitle.trim() || 'Evidence Capture',
      url: photoUrlInput.trim(),
      caption: photoCaption.trim() || 'Classified case evidentiary image capture.',
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      uploadedBy: 'AGENT VANCE'
    };

    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === selectedCaseId
          ? { ...c, evidencePhotos: [newPhoto, ...c.evidencePhotos] }
          : c
      )
    );

    setShowAddPhotoModal(false);
    setPhotoTitle('');
    setPhotoUrlInput('');
    setPhotoCaption('');
  };

  // Dispatch New Suspect
  const handleAddSuspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspectName.trim()) return;

    const newSuspectObj: Suspect = {
      id: `s-${Date.now()}`,
      name: suspectName.trim(),
      alias: suspectAlias.trim() || 'UNKNOWN_ALIAS',
      photoUrl:
        suspectPhotoUrl.trim() ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      threatLevel: suspectThreat,
      status: suspectStatus,
      lastKnownLocation: suspectLocation.trim() || 'Cyberspace Node / Location Unknown',
      biography: suspectBio.trim() || 'Primary suspect flagged in cyber surveillance logs.'
    };

    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === selectedCaseId
          ? { ...c, suspects: [...c.suspects, newSuspectObj] }
          : c
      )
    );

    setShowAddSuspectModal(false);
    setSuspectName('');
    setSuspectAlias('');
    setSuspectPhotoUrl('');
    setSuspectLocation('');
    setSuspectBio('');
  };

  // Open Edit Victim Modal
  const openEditVictim = () => {
    setEditVicName(activeCase.victim.name);
    setEditVicPhoto(activeCase.victim.photoUrl);
    setEditVicSummary(activeCase.victim.identitySummary);
    setEditVicStatus(activeCase.victim.status);
    setEditVicLocation(activeCase.victim.location);
    setEditVicBio(activeCase.victim.contactOrBio);
    setShowEditVictimModal(true);
  };

  // Save Victim Profile
  const handleSaveVictim = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedVictim: Victim = {
      name: editVicName.trim() || 'Protected Subject',
      photoUrl:
        editVicPhoto.trim() ||
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      identitySummary: editVicSummary.trim() || 'Client / Victim Identity at Large',
      status: editVicStatus,
      location: editVicLocation.trim() || 'Safehouse Location Protected',
      contactOrBio: editVicBio.trim() || 'Subject profile under Federal Protection.'
    };

    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === selectedCaseId ? { ...c, victim: updatedVictim } : c
      )
    );

    setShowEditVictimModal(false);
  };

  // Dispatch new manual progress update
  const handleAddProgressUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateText.trim()) return;

    const update: ProgressUpdate = {
      id: `u-${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      author: newUpdateAuthor.trim() || 'AGENT ON-DUTY',
      severity: newUpdateSeverity,
      message: newUpdateText.trim()
    };

    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id === selectedCaseId) {
          const newProgress =
            newUpdateSeverity === 'RESOLVED'
              ? Math.min(100, c.progressPercentage + 10)
              : c.progressPercentage;

          return {
            ...c,
            progressPercentage: newProgress,
            lastUpdated: 'Just now',
            updates: [update, ...c.updates]
          };
        }
        return c;
      })
    );

    setNewUpdateText('');
  };

  // Update progress percentage manually
  const handleProgressChange = (newPct: number) => {
    setCases((prevCases) =>
      prevCases.map((c) => (c.id === selectedCaseId ? { ...c, progressPercentage: newPct } : c))
    );
  };

  // Create new client case dossier
  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const createdCase: ClientCase = {
      id: `case-${Date.now()}`,
      caseNumber: `CY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newClientName.trim(),
      alias: newClientAlias.trim() || 'UNCLASSIFIED_SUBJECT',
      classification: newClassification,
      status: 'ACTIVE_SURVEILLANCE',
      natureOfInvestigation:
        newNature.trim() ||
        'Initial investigation opened regarding cyber infrastructure telemetry anomalies.',
      targetSystems: newTargetSystems
        ? newTargetSystems.split(',').map((s) => s.trim())
        : ['INTERNAL_PROBE_01'],
      assignedOfficer: 'AGENT VANCE (SEC-882)',
      progressPercentage: 15,
      lastUpdated: 'Just now',
      incidentDate: new Date().toISOString().split('T')[0],
      jurisdiction: 'Federal Cyber Task Force',
      financialImpact: '$5,000,000 USD (Estimated)',
      investigatedDuration: newInvestigatedDuration.trim() || '48 Hours',
      victim: {
        name: newVictimName.trim() || `${newClientName.trim()} (Targeted Entity)`,
        photoUrl:
          newVictimPhoto.trim() ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        identitySummary: 'Primary Victim / Identity under Cyber Protection',
        status: 'AT_LARGE',
        location: 'Safehouse Coordinates Confidential',
        contactOrBio: 'Client profile initialized. Identity protection protocol active.'
      },
      suspects: [
        {
          id: `s-init-${Date.now()}`,
          name: 'Unidentified Threat Actor',
          alias: 'UNKNOWN_VECTOR',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
          threatLevel: 'CRITICAL',
          status: 'AT_LARGE',
          lastKnownLocation: 'Unresolved Anonymized Proxy Node',
          biography: 'Primary prime suspect identified through network log anomalies.'
        }
      ],
      evidencePhotos: [
        {
          id: `p-init-${Date.now()}`,
          title: 'Initial Incident Report Log',
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          caption: 'System boot log trace captured upon case opening.',
          timestamp: '00:00:01 UTC',
          uploadedBy: 'SYSTEM AUTO-CAPTURE'
        }
      ],
      updates: [
        {
          id: `u-init-${Date.now()}`,
          timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
          author: 'SYSTEM BOOTSTRAP',
          severity: 'INFO',
          message: `Client case profile opened under Cyber FBI Command Node. Active investigation: ${
            newInvestigatedDuration.trim() || '48 Hours'
          }.`
        }
      ]
    };

    setCases([createdCase, ...cases]);
    setSelectedCaseId(createdCase.id);
    setShowCreateModal(false);
    setNewClientName('');
    setNewClientAlias('');
    setNewNature('');
    setNewTargetSystems('');
    setNewVictimName('');
    setNewVictimPhoto('');
    setNewInvestigatedDuration('48 Hours');
  };

  // Save edited nature of investigation
  const handleSaveNature = () => {
    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === selectedCaseId ? { ...c, natureOfInvestigation: editedNatureText } : c
      )
    );
    setIsEditingNature(false);
  };

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.victim.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && c.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-mono">
      {/* Tactical Top Title & Connection Bar */}
      <div className="bg-slate-950 border border-slate-800 p-6 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs uppercase tracking-[0.2em] mb-1">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span>CYBER FBI CLIENT CASE & EVIDENCE MATRIX</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 uppercase tracking-wider">
              Investigative Client Case Files
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Comprehensive case details, victim identities, prime suspects matrix, real-time evidence gallery & updates.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsLiveStreamActive(!isLiveStreamActive)}
              className={`px-3 py-1.5 border text-xs flex items-center space-x-2 transition-all ${
                isLiveStreamActive
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              <Radio
                className={`w-3.5 h-3.5 ${isLiveStreamActive ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`}
              />
              <span>{isLiveStreamActive ? 'TELEMETRY: ACTIVE' : 'STREAM: PAUSED'}</span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-1.5 bg-slate-900 border border-cyan-500/80 hover:bg-cyan-950/60 text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>NEW CASE PROFILE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Navigation / Cases List (4 columns), Right Comprehensive Case View (8 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Client Case List & Filters */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-4 flex flex-col h-[820px]">
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center space-x-1.5">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>CASE INDEX ({filteredCases.length})</span>
              </h3>
              <span className="text-[10px] text-cyan-500 font-mono">TOP SECRET</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case, subject, or victim..."
                className="w-full bg-slate-900 border border-slate-700 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center space-x-1 bg-slate-900 p-1 border border-slate-800 text-[10px]">
              {['ALL', 'ACTIVE_SURVEILLANCE', 'DECRYPT_PENDING', 'INTERCEPTED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`flex-1 py-1 px-1 uppercase transition-all truncate ${
                    statusFilter === st
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st === 'ACTIVE_SURVEILLANCE' ? 'ACTIVE' : st === 'DECRYPT_PENDING' ? 'DECRYPT' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Cases Scroll List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredCases.map((c) => {
              const isSelected = c.id === selectedCaseId;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCaseId(c.id);
                    setIsEditingNature(false);
                  }}
                  className={`p-3 border cursor-pointer transition-all relative ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-500 border-l-4 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-100 tracking-wider">
                      {c.name}
                    </span>
                    <span className="text-[9px] bg-slate-950 border border-slate-800 px-1.5 py-0.5 text-slate-400">
                      {c.caseNumber}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 mb-2 flex items-center justify-between">
                    <span className="text-cyan-400 font-semibold">ALIAS: {c.alias}</span>
                    <span className="text-slate-400 font-mono text-[9px] flex items-center space-x-1 bg-slate-950 px-1 py-0.5 border border-slate-800">
                      <Clock className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{c.investigatedDuration || '48 Hours'}</span>
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 mb-2 truncate">
                    <span className="text-slate-500">VICTIM:</span> {c.victim.name}
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-400">
                      <span>SOLVED:</span>
                      <span className="text-cyan-400 font-bold">{c.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 border border-slate-800">
                      <div
                        className="bg-cyan-500 h-full transition-all duration-300"
                        style={{ width: `${c.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredCases.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs">
                No case dossiers match search filter.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Comprehensive Active Case Dossier */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-6 flex flex-col h-[820px] overflow-y-auto custom-scrollbar space-y-6">
          {/* Active Case Top Header */}
          <div className="border-b border-slate-800 pb-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-cyan-400 font-bold tracking-widest">
                    {activeCase.caseNumber}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-900 border border-amber-500/40 text-amber-400 text-[9px] font-bold">
                    {activeCase.classification}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-900 border border-cyan-500/40 text-cyan-300 text-[9px] font-bold">
                    STATUS: {activeCase.status}
                  </span>
                  <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 text-[9px] font-bold flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>INVESTIGATED: {activeCase.investigatedDuration || '48 Hours'}</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-wide mt-1">
                  CLIENT CASE: {activeCase.name} ({activeCase.alias})
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleExportPDF(activeCase)}
                  className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/80 hover:bg-cyan-900 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  title="Export full case file report as formatted printable PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>EXPORT CASE PDF</span>
                </button>
                <span className="text-xs text-slate-400">ASSIGNED:</span>
                <span className="text-xs bg-slate-900 border border-slate-700 px-2.5 py-1 text-slate-200 font-bold">
                  {activeCase.assignedOfficer}
                </span>
              </div>
            </div>

            {/* Dossier Navigation Sub-Tabs */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1 border border-slate-800 text-xs overflow-x-auto">
              {[
                { id: 'OVERVIEW', label: 'CASE OVERVIEW', icon: FileText },
                { id: 'VICTIM', label: `VICTIM PROFILE (${activeCase.victim.name})`, icon: ShieldAlert },
                { id: 'SUSPECTS', label: `PRIME SUSPECTS (${activeCase.suspects.length})`, icon: UserX },
                { id: 'PHOTOS', label: `EVIDENCE & PHOTOS (${activeCase.evidencePhotos.length})`, icon: ImageIcon },
                { id: 'DISPATCH', label: `LOGS & DISPATCH (${activeCase.updates.length})`, icon: Radio }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-3 py-1.5 transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 font-bold shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="uppercase text-[11px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              {/* Nature of Investigation */}
              <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-cyan-500" />
                    <span>NATURE OF INVESTIGATION</span>
                  </h4>
                  {!isEditingNature ? (
                    <button
                      onClick={() => {
                        setEditedNatureText(activeCase.natureOfInvestigation);
                        setIsEditingNature(true);
                      }}
                      className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center space-x-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>EDIT DETAILS</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSaveNature}
                        className="text-[10px] bg-cyan-950 border border-cyan-500 text-cyan-300 px-2 py-0.5"
                      >
                        SAVE
                      </button>
                      <button
                        onClick={() => setIsEditingNature(false)}
                        className="text-[10px] text-slate-400 hover:text-slate-200"
                      >
                        CANCEL
                      </button>
                    </div>
                  )}
                </div>

                {isEditingNature ? (
                  <textarea
                    value={editedNatureText}
                    onChange={(e) => setEditedNatureText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none h-24"
                  />
                ) : (
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 border border-slate-800/80">
                    {activeCase.natureOfInvestigation}
                  </p>
                )}
              </div>

              {/* Key Case Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>Incident Date:</span>
                  </span>
                  <p className="text-xs text-slate-200 font-bold">{activeCase.incidentDate}</p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    <span>Jurisdiction:</span>
                  </span>
                  <p className="text-xs text-slate-200 font-bold truncate">{activeCase.jurisdiction}</p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase flex items-center space-x-1">
                    <DollarSign className="w-3 h-3 text-amber-400" />
                    <span>Financial Impact:</span>
                  </span>
                  <p className="text-xs text-amber-400 font-bold">{activeCase.financialImpact}</p>
                </div>

                <div className="bg-slate-900/60 border border-cyan-500/40 bg-cyan-950/20 p-3.5 space-y-1">
                  <span className="text-[10px] text-cyan-400 uppercase flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Investigated Duration:</span>
                  </span>
                  <p className="text-xs text-cyan-300 font-bold flex items-center space-x-1">
                    <span>{activeCase.investigatedDuration || '48 Hours'}</span>
                  </p>
                </div>
              </div>

              {/* Target Infrastructure Systems */}
              <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>TARGET INFRASTRUCTURE ENDPOINTS</span>
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeCase.targetSystems.map((sys, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-cyan-950/80 border border-cyan-700 text-cyan-300 px-3 py-1 font-bold"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Summary Preview Card of Victim & Suspects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Victim Preview Card */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h5 className="text-xs font-bold text-cyan-400 uppercase">Victim Overview</h5>
                    <button
                      onClick={() => setActiveTab('VICTIM')}
                      className="text-[10px] text-cyan-400 hover:underline flex items-center space-x-1"
                    >
                      <span>VIEW FULL PROFILE</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src={activeCase.victim.photoUrl}
                      alt={activeCase.victim.name}
                      className="w-14 h-14 object-cover border border-cyan-500/50 shrink-0"
                    />
                    <div className="space-y-0.5 text-xs">
                      <p className="font-bold text-slate-100">{activeCase.victim.name}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">
                        {activeCase.victim.identitySummary}
                      </p>
                      <span className="inline-block text-[9px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.5 mt-1">
                        IDENTITY: {activeCase.victim.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Suspect Preview Card */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h5 className="text-xs font-bold text-cyan-400 uppercase">
                      Prime Suspect ({activeCase.suspects[0]?.name || 'N/A'})
                    </h5>
                    <button
                      onClick={() => setActiveTab('SUSPECTS')}
                      className="text-[10px] text-cyan-400 hover:underline flex items-center space-x-1"
                    >
                      <span>VIEW MATRIX</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  {activeCase.suspects[0] ? (
                    <div className="flex items-center space-x-3">
                      <img
                        src={activeCase.suspects[0].photoUrl}
                        alt={activeCase.suspects[0].name}
                        className="w-14 h-14 object-cover border border-rose-500/50 shrink-0"
                      />
                      <div className="space-y-0.5 text-xs">
                        <p className="font-bold text-slate-100">{activeCase.suspects[0].name}</p>
                        <p className="text-[10px] text-cyan-400">
                          ALIAS: {activeCase.suspects[0].alias}
                        </p>
                        <span className="inline-block text-[9px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.5 mt-1">
                          THREAT: {activeCase.suspects[0].threatLevel}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No prime suspects cataloged yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VICTIM PROFILE */}
          {activeTab === 'VICTIM' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={activeCase.victim.photoUrl}
                      alt={activeCase.victim.name}
                      className="w-24 h-24 object-cover border-2 border-cyan-500 shadow-lg"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs text-slate-400">VICTIM / TARGETED IDENTITY</span>
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold ${
                            activeCase.victim.status === 'AT_LARGE'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : activeCase.victim.status === 'PROTECTED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          STATUS AT LARGE: {activeCase.victim.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100">{activeCase.victim.name}</h3>
                      <p className="text-xs text-cyan-400 mt-1">{activeCase.victim.identitySummary}</p>
                    </div>
                  </div>

                  <button
                    onClick={openEditVictim}
                    className="px-4 py-2 bg-slate-950 border border-cyan-500 text-cyan-300 hover:bg-cyan-950 text-xs font-bold uppercase tracking-wider flex items-center space-x-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>UPDATE VICTIM PROFILE</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Current Safehouse / Physical Location:</span>
                    </span>
                    <p className="text-xs text-slate-200 font-bold">{activeCase.victim.location}</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase flex items-center space-x-1.5">
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Federal Identity Protection Protocol:</span>
                    </span>
                    <p className="text-xs text-emerald-400 font-bold">LEVEL 4 - IDENTITY MASK ACTIVE</p>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    COMPREHENSIVE VICTIM DOSSIER & SECURITY BRIEFING
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {activeCase.victim.contactOrBio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRIME SUSPECTS */}
          {activeTab === 'SUSPECTS' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <UserX className="w-4 h-4 text-rose-400" />
                  <span>PRIME SUSPECTS & THREAT ACTORS</span>
                </h4>
                <button
                  onClick={() => setShowAddSuspectModal(true)}
                  className="px-3 py-1.5 bg-slate-900 border border-cyan-500 text-cyan-300 hover:bg-cyan-950 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ADD SUSPECT DOSSIER</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCase.suspects.map((suspect) => (
                  <div
                    key={suspect.id}
                    className="bg-slate-900/60 border border-slate-800 hover:border-rose-500/60 transition-all p-5 space-y-4"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={suspect.photoUrl}
                        alt={suspect.name}
                        className="w-20 h-24 object-cover border-2 border-rose-500/80 shrink-0"
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.5 font-bold">
                            THREAT: {suspect.threatLevel}
                          </span>
                          <span className="text-[9px] bg-slate-950 text-slate-400 border border-slate-800 px-1.5 py-0.5">
                            {suspect.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-100">{suspect.name}</h4>
                        <p className="text-xs text-cyan-400 font-semibold">ALIAS: "{suspect.alias}"</p>
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-2.5 text-[11px] space-y-1">
                      <span className="text-slate-400 uppercase text-[9px] flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>Last Known Location:</span>
                      </span>
                      <p className="text-slate-200 font-bold">{suspect.lastKnownLocation}</p>
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">BIOGRAPHY & KNOWN VECTORS:</span>
                      <p className="text-slate-300 leading-relaxed text-[11px] bg-slate-950/50 p-2.5 border border-slate-800/80">
                        {suspect.biography}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EVIDENCE & PHOTOS GALLERY */}
          {activeTab === 'PHOTOS' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                    <Grid className="w-4 h-4 text-cyan-400" />
                    <span>CASE EVIDENCE & MULTI-MEDIA GALLERY GRID</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Comprehensive visual archive of evidence captures, suspect mugshots, and victim profiles.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddPhotoModal(true)}
                  className="px-3.5 py-1.5 bg-slate-900 border border-cyan-500 text-cyan-300 hover:bg-cyan-950 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shrink-0"
                >
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ADD EVIDENCE CAPTURE</span>
                </button>
              </div>

              {/* Gallery Category Filter Tabs */}
              <div className="flex items-center space-x-1 bg-slate-900/80 p-1 border border-slate-800 text-xs overflow-x-auto">
                {[
                  { id: 'ALL', label: `ALL MEDIA (${activeCase.evidencePhotos.length + activeCase.suspects.length + (activeCase.victim ? 1 : 0)})` },
                  { id: 'EVIDENCE', label: `EVIDENCE CAPTURES (${activeCase.evidencePhotos.length})` },
                  { id: 'SUSPECTS', label: `PRIME SUSPECTS (${activeCase.suspects.length})` },
                  { id: 'VICTIM', label: `VICTIM PROFILE (${activeCase.victim ? 1 : 0})` }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPhotoGalleryCategory(cat.id as any)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                      photoGalleryCategory === cat.id
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Interactive Photo Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {getGalleryItems().map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/80 transition-all flex flex-col group overflow-hidden shadow-lg"
                  >
                    <div className="relative aspect-video bg-slate-950 overflow-hidden border-b border-slate-800">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Category Badge overlay */}
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase border backdrop-blur-sm ${item.badgeColor}`}
                      >
                        {item.badgeText}
                      </span>

                      {/* Zoom Button overlay */}
                      <button
                        onClick={() => {
                          setSelectedPreviewItem(item);
                          setPreviewPhotoUrl(item.url);
                        }}
                        className="absolute bottom-2 right-2 p-1.5 bg-slate-950/90 text-cyan-300 hover:bg-cyan-950 border border-cyan-500/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-[10px] font-bold uppercase"
                        title="Zoom & Inspect Image"
                      >
                        <Maximize2 className="w-3 h-3 text-cyan-400" />
                        <span>ZOOM</span>
                      </button>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2 text-xs">
                      <div>
                        <h5 className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {item.caption}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-slate-500 pt-2 border-t border-slate-800/80">
                        <span className="truncate max-w-[120px]">{item.uploadedBy}</span>
                        <span className="font-mono text-cyan-400/90">{item.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getGalleryItems().length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No images match the selected category filter.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DISPATCH & LOGS */}
          {activeTab === 'DISPATCH' && (
            <div className="space-y-6">
              {/* Progress Slider Bar */}
              <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-cyan-500" />
                    <span>Investigative Progress Level</span>
                  </h4>
                  <span className="text-xs font-bold text-cyan-300 bg-cyan-950 border border-cyan-500/50 px-2 py-0.5">
                    {activeCase.progressPercentage}% COMPLETE
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={activeCase.progressPercentage}
                  onChange={(e) => handleProgressChange(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-950 cursor-pointer"
                />
              </div>

              {/* Progress Dispatch Form */}
              <div className="bg-slate-900/60 border border-slate-800 p-4 space-y-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-cyan-500 animate-pulse" />
                  <span>Transmit Real-Time Progress Update</span>
                </h4>

                <form onSubmit={handleAddProgressUpdate} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">AUTHOR / OFFICER ID</label>
                      <input
                        type="text"
                        value={newUpdateAuthor}
                        onChange={(e) => setNewUpdateAuthor(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        placeholder="AGENT ID..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">SEVERITY LEVEL</label>
                      <select
                        value={newUpdateSeverity}
                        onChange={(e) =>
                          setNewUpdateSeverity(e.target.value as ProgressUpdate['severity'])
                        }
                        className="w-full bg-slate-950 border border-slate-700 p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="INFO">INFO (Normal Update)</option>
                        <option value="WARNING">WARNING (Security Advisory)</option>
                        <option value="CRITICAL">CRITICAL (Threat Detected)</option>
                        <option value="RESOLVED">RESOLVED (Target Neutralized)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">PROGRESS DISPATCH NOTE</label>
                    <input
                      type="text"
                      value={newUpdateText}
                      onChange={(e) => setNewUpdateText(e.target.value)}
                      placeholder="Enter detailed progress update text..."
                      className="w-full bg-slate-950 border border-slate-700 p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-950 border border-cyan-500/80 hover:bg-cyan-950 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
                    >
                      <Send className="w-3.5 h-3.5 text-cyan-400" />
                      <span>TRANSMIT UPDATE</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Progress Log List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-cyan-500" />
                    <span>CHRONOLOGICAL PROGRESS LOG & TELEMETRY</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">
                    {activeCase.updates.length} TOTAL ENTRIES
                  </span>
                </div>

                <div className="space-y-2">
                  {activeCase.updates.map((update) => (
                    <div
                      key={update.id}
                      className="bg-slate-950 border border-slate-800 p-3 space-y-1 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 font-bold">{update.author}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400">{update.timestamp}</span>
                        </div>

                        <span
                          className={`px-1.5 py-0.5 text-[9px] font-bold ${
                            update.severity === 'CRITICAL'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : update.severity === 'WARNING'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : update.severity === 'RESOLVED'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {update.severity}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: ADD EVIDENCE PHOTO */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 max-w-lg w-full p-6 font-mono space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>ATTACH CASE EVIDENCE PICTURE</span>
              </h3>
              <button
                onClick={() => setShowAddPhotoModal(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                [ESC]
              </button>
            </div>

            <form onSubmit={handleAddEvidencePhoto} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Evidence Title *</label>
                <input
                  type="text"
                  required
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="e.g. Encrypted Network Bridge Snapshot"
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">
                  Image Source URL or Local File
                </label>
                <input
                  type="text"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="Paste image URL (https://...)"
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 mb-2"
                />

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] text-slate-500 uppercase">OR SELECT FILE:</span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => handleFileUpload(e, 'EVIDENCE')}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase hover:bg-slate-800"
                  >
                    BROWSE LOCAL DISK
                  </button>
                </div>
              </div>

              {photoUrlInput && (
                <div className="border border-slate-800 p-2 aspect-video bg-slate-900 overflow-hidden">
                  <img src={photoUrlInput} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Caption & Technical Notes</label>
                <textarea
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  rows={3}
                  placeholder="Technical description of the evidence..."
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 border border-cyan-500 text-cyan-300 font-bold hover:bg-cyan-950 uppercase"
                >
                  ATTACH PICTURE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD PRIME SUSPECT */}
      {showAddSuspectModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 max-w-lg w-full p-6 font-mono space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                <UserX className="w-4 h-4 text-rose-400" />
                <span>REGISTER PRIME SUSPECT DOSSIER</span>
              </h3>
              <button
                onClick={() => setShowAddSuspectModal(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                [ESC]
              </button>
            </div>

            <form onSubmit={handleAddSuspect} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Suspect Real Name *</label>
                  <input
                    type="text"
                    required
                    value={suspectName}
                    onChange={(e) => setSuspectName(e.target.value)}
                    placeholder="e.g. Dmitri Volkov"
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Alias / Hacker Handle</label>
                  <input
                    type="text"
                    value={suspectAlias}
                    onChange={(e) => setSuspectAlias(e.target.value)}
                    placeholder="e.g. Vanguard-9"
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Threat Level</label>
                  <select
                    value={suspectThreat}
                    onChange={(e) => setSuspectThreat(e.target.value as Suspect['threatLevel'])}
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="EXTREME">EXTREME</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MODERATE">MODERATE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Surveillance Status</label>
                  <select
                    value={suspectStatus}
                    onChange={(e) => setSuspectStatus(e.target.value as Suspect['status'])}
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AT_LARGE">AT_LARGE</option>
                    <option value="UNDER_SURVEILLANCE">UNDER_SURVEILLANCE</option>
                    <option value="APPREHENDED">APPREHENDED</option>
                    <option value="UNKNOWN">UNKNOWN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Suspect Photo URL or File</label>
                <input
                  type="text"
                  value={suspectPhotoUrl}
                  onChange={(e) => setSuspectPhotoUrl(e.target.value)}
                  placeholder="Mugshot / photo URL"
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={suspectFileInputRef}
                  onChange={(e) => handleFileUpload(e, 'SUSPECT')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => suspectFileInputRef.current?.click()}
                  className="px-3 py-1 bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase hover:bg-slate-800"
                >
                  UPLOAD MUGSHOT
                </button>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Last Known Location</label>
                <input
                  type="text"
                  value={suspectLocation}
                  onChange={(e) => setSuspectLocation(e.target.value)}
                  placeholder="e.g. Zurich Relay Hop"
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Suspect Bio & Vectors</label>
                <textarea
                  value={suspectBio}
                  onChange={(e) => setSuspectBio(e.target.value)}
                  rows={3}
                  placeholder="Background and modus operandi..."
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSuspectModal(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 border border-rose-500 text-rose-300 font-bold hover:bg-rose-950 uppercase"
                >
                  REGISTER SUSPECT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT VICTIM PROFILE */}
      {showEditVictimModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 max-w-lg w-full p-6 font-mono space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>UPDATE VICTIM & IDENTITY PROFILE</span>
              </h3>
              <button
                onClick={() => setShowEditVictimModal(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                [ESC]
              </button>
            </div>

            <form onSubmit={handleSaveVictim} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Victim Full Name *</label>
                <input
                  type="text"
                  required
                  value={editVicName}
                  onChange={(e) => setEditVicName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Victim Photo URL / File</label>
                <input
                  type="text"
                  value={editVicPhoto}
                  onChange={(e) => setEditVicPhoto(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={victimFileInputRef}
                  onChange={(e) => handleFileUpload(e, 'VICTIM')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => victimFileInputRef.current?.click()}
                  className="px-3 py-1 bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase hover:bg-slate-800"
                >
                  UPLOAD VICTIM PHOTO
                </button>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Identity Summary</label>
                <input
                  type="text"
                  value={editVicSummary}
                  onChange={(e) => setEditVicSummary(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Identity Status</label>
                  <select
                    value={editVicStatus}
                    onChange={(e) => setEditVicStatus(e.target.value as Victim['status'])}
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AT_LARGE">AT_LARGE (Identity Exposed)</option>
                    <option value="PROTECTED">PROTECTED (In Safehouse)</option>
                    <option value="EVACUATED">EVACUATED</option>
                    <option value="COMPROMISED">COMPROMISED</option>
                    <option value="SAFE">SAFE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Physical Location</label>
                  <input
                    type="text"
                    value={editVicLocation}
                    onChange={(e) => setEditVicLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">Dossier / Contact Bio</label>
                <textarea
                  value={editVicBio}
                  onChange={(e) => setEditVicBio(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditVictimModal(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 border border-cyan-500 text-cyan-300 font-bold hover:bg-cyan-950 uppercase"
                >
                  SAVE PROFILE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: INITIATE NEW CASE */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 max-w-lg w-full p-6 font-mono space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>INITIATE CLIENT CASE DOSSIER</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                [ESC]
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">
                  Client / Subject Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Julian Thorne"
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">
                    Subject Alias / Codename
                  </label>
                  <input
                    type="text"
                    value={newClientAlias}
                    onChange={(e) => setNewClientAlias(e.target.value)}
                    placeholder="e.g. Cipher_Vector"
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">
                    Security Classification
                  </label>
                  <select
                    value={newClassification}
                    onChange={(e) =>
                      setNewClassification(e.target.value as ClientCase['classification'])
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="LEVEL 5 - TOP SECRET">LEVEL 5 - TOP SECRET</option>
                    <option value="LEVEL 4 - CRITICAL">LEVEL 4 - CRITICAL</option>
                    <option value="LEVEL 3 - HIGH">LEVEL 3 - HIGH</option>
                    <option value="LEVEL 2 - MEDIUM">LEVEL 2 - MEDIUM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 uppercase">
                  Nature of Investigation *
                </label>
                <textarea
                  required
                  value={newNature}
                  onChange={(e) => setNewNature(e.target.value)}
                  rows={3}
                  placeholder="Describe the nature of investigation, suspected vector, and objective..."
                  className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Victim Name</label>
                  <input
                    type="text"
                    value={newVictimName}
                    onChange={(e) => setNewVictimName(e.target.value)}
                    placeholder="Victim name..."
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 uppercase">Target Infrastructure</label>
                  <input
                    type="text"
                    value={newTargetSystems}
                    onChange={(e) => setNewTargetSystems(e.target.value)}
                    placeholder="e.g. SAT-COMM-02"
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-cyan-400 mb-1 uppercase font-bold flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Investigated Duration *</span>
                </label>
                <input
                  type="text"
                  required
                  value={newInvestigatedDuration}
                  onChange={(e) => setNewInvestigatedDuration(e.target.value)}
                  placeholder="e.g. 48 Hours"
                  className="w-full bg-slate-900 border border-cyan-500/60 p-2.5 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 border border-cyan-500 text-cyan-300 font-bold hover:bg-cyan-950 uppercase"
                >
                  CREATE DOSSIER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: FULL-SCREEN IMAGE PREVIEW & METADATA LIGHTBOX */}
      {previewPhotoUrl && (
        <div
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => {
            setPreviewPhotoUrl(null);
            setSelectedPreviewItem(null);
          }}
        >
          <div
            className="relative max-w-5xl w-full border border-cyan-500/60 bg-slate-900 overflow-hidden flex flex-col md:flex-row shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setPreviewPhotoUrl(null);
                setSelectedPreviewItem(null);
              }}
              className="absolute top-3 right-3 z-10 p-2 bg-slate-950/90 text-cyan-400 hover:text-cyan-200 border border-cyan-500/80 transition-all"
              title="Close Inspection"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-3/5 bg-slate-950 flex items-center justify-center p-4 min-h-[300px] border-b md:border-b-0 md:border-r border-slate-800">
              <img
                src={previewPhotoUrl}
                alt={selectedPreviewItem?.title || 'Evidence High-Res Zoom'}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-4 bg-slate-900 text-xs">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-cyan-950 border border-cyan-500/60 text-cyan-300 font-bold px-2 py-0.5 uppercase">
                    {selectedPreviewItem?.badgeText || 'EVIDENCE DOSSIER'}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {selectedPreviewItem?.timestamp || 'RECORDED ITEM'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 leading-snug">
                  {selectedPreviewItem?.title || 'High-Resolution Captured Dossier Asset'}
                </h3>

                <div className="bg-slate-950 border border-slate-800 p-3 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">EXAMINED CAPTION & FORENSIC SUMMARY:</span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {selectedPreviewItem?.caption || 'Image captured as part of active FBI cyber investigative proceedings.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>DISPATCH SOURCE:</span>
                  <span className="text-cyan-400 font-bold">{selectedPreviewItem?.uploadedBy || 'CYBER DIVISION'}</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE CASE:</span>
                  <span className="text-slate-200 font-bold">{activeCase.name} ({activeCase.caseNumber})</span>
                </div>

                <button
                  onClick={() => {
                    setPreviewPhotoUrl(null);
                    setSelectedPreviewItem(null);
                  }}
                  className="w-full mt-2 py-2 bg-slate-950 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-cyan-500 font-bold uppercase tracking-wider transition-all"
                >
                  DISMISS INSPECTION [ESC]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
