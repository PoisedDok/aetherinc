export interface Workflow {
  id: string;
  title: string;
  persona: string;
  pain: string;
  solution: string;
  steps: string[];
  roiExample?: string;
}

export const workflows: Workflow[] = [
  {
    id: 'invoice-automation',
    title: 'Invoice Creation & Follow-Up',
    persona: 'Finance Lead – SaaS Startup',
    pain: 'Manual invoice emails and payment chasing takes 4 hrs/week',
    solution: 'Generate PDF invoices automatically and send smart chaser emails until payment is received',
    steps: [
      'Deal marked "Closed/Won" in CRM',
      'Create PDF invoice in Xero',
      'Send invoice email to customer',
      'Wait 7 days → if unpaid send polite reminder',
      'Update Slack #finance when paid'
    ],
    roiExample: '80% reduction in time spent chasing payments'
  },
  {
    id: 'ticket-triage',
    title: 'Customer-Service Auto-Reply & Ticket Routing',
    persona: 'Head of Support – E-commerce',
    pain: 'First-response time is too slow; tickets often mis-routed',
    solution: 'Instant AI acknowledgement, sentiment analysis and auto-routing to the right agent queue',
    steps: [
      'New support email arrives',
      'GPT classifies topic & sentiment',
      'Send personalised acknowledgement with relevant FAQ',
      'Route to correct queue in Helpdesk',
      'Escalate if negative sentiment'
    ]
  },
  {
    id: 'appointment-scheduling',
    title: 'Appointment Scheduling / Confirmation',
    persona: 'Sales Team',
    pain: 'Back-and-forth emails to set up demos',
    solution: 'Self-service booking with automatic reminders and calendar sync',
    steps: [
      'Prospect selects slot from calendar link',
      'Create Google Calendar invite for all parties',
      'Send confirmation email with agenda',
      '24-hour SMS reminder',
      'After meeting, auto-send feedback form'
    ]
  },
  {
    id: 'meeting-minutes',
    title: 'Auto-Summarise Meeting Minutes',
    persona: 'Project Manager',
    pain: 'Writing and distributing minutes is tedious',
    solution: 'Transcribe recording, summarise with GPT, distribute & create tasks',
    steps: [
      'Meeting recording ends',
      'Transcribe audio → text',
      'GPT summarises + extracts action items',
      'Email summary to attendees',
      'Create tasks in Asana'
    ]
  },
  {
    id: 'data-entry',
    title: 'Data Entry & Report Generation',
    persona: 'Operations Team',
    pain: 'Copy-pasting data between systems and compiling weekly reports',
    solution: 'Validate incoming data, sync to CRM and auto-generate PDF report every Friday',
    steps: [
      'New spreadsheet row submitted',
      'Validate & normalise data',
      'Create/Update record in CRM',
      'Aggregate weekly metrics',
      'Render PDF report & email stakeholders'
    ]
  }
]; 