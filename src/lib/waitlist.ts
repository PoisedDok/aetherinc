import fs from 'fs';
import path from 'path';

// Define waitlist entry interface
export interface WaitlistEntry {
  name: string;
  email: string;
  reason?: string;
  useCase?: string;
  earlyAccess: boolean;
  timestamp: string;
  ip?: string;
}

// Path to waitlist data file
const waitlistFilePath = path.join(process.cwd(), 'src', 'data', 'waitlist.json');

// Ensure waitlist directory exists
export const ensureWaitlistFile = () => {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  
  // Create data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Create empty waitlist file if it doesn't exist
  if (!fs.existsSync(waitlistFilePath)) {
    fs.writeFileSync(waitlistFilePath, JSON.stringify([], null, 2));
  }
};

// Get all waitlist entries
export const getWaitlistEntries = (): WaitlistEntry[] => {
  ensureWaitlistFile();
  
  try {
    const data = fs.readFileSync(waitlistFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading waitlist file:', error);
    return [];
  }
};

// Add a new entry to the waitlist
export const addWaitlistEntry = (
  entry: Omit<WaitlistEntry, 'timestamp'> & { ip?: string }
): boolean => {
  ensureWaitlistFile();
  
  try {
    const entries = getWaitlistEntries();
    
    // Check if email already exists
    const emailExists = entries.some(e => e.email === entry.email);
    if (emailExists) {
      return false;
    }
    
    // Add new entry with timestamp
    const newEntry: WaitlistEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    
    entries.push(newEntry);
    
    // Write back to file
    fs.writeFileSync(waitlistFilePath, JSON.stringify(entries, null, 2));
    return true;
  } catch (error) {
    console.error('Error adding waitlist entry:', error);
    return false;
  }
}; 