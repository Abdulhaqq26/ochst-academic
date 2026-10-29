export type Department =
  | 'Computer Science'
  | 'Statistics'
  | 'Public Health'
  | 'Community Health'
  | 'Environmental Health'
  | 'Anatomy'
  | 'Physiology'
  | 'Biochemistry'
  | 'Health Information Management'
  | 'Dental Therapy'
  | 'Dental Technology'
  | 'Medical Laboratory Technology'
  | 'Pharmacy Technician'
  | 'Nutrition and Dietetics'
  | 'General Studies';

export type Level = 'ND I' | 'ND II' | 'HND I' | 'HND II';

export type Semester = 'First Semester' | 'Second Semester';

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface TimetableEntry {
  id: string;
  courseCode: string;
  courseTitle: string;
  department: Department;
  level: Level;
  day: Day;
  startTime: string;
  endTime: string;
  venue: string;
  lecturer: string;
  semester: Semester;
  academicSession: string;
}

export interface Course {
  code: string;
  title: string;
  department: Department;
}

export type Priority = 'High' | 'Medium' | 'Low';
export type ReminderType = 'Personal' | 'Assignment' | 'Exam' | 'Class' | 'General';
export type RepeatOption = 'Does not repeat' | 'Daily' | 'Weekly' | 'Monthly';

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  priority: Priority;
  type: ReminderType;
  repeat: RepeatOption;
  completed: boolean;
  isUserCreated?: boolean;
}

export interface Exam {
  id: string;
  courseCode: string;
  courseTitle: string;
  date: string;
  time: string;
  venue: string;
  department: Department;
  level: Level;
}

export type AnnouncementCategory = 'Academic' | 'Department' | 'Notice';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  category: AnnouncementCategory;
  read: boolean;
}

export type EventType = 'Class' | 'Assignment' | 'Exam' | 'Reminder' | 'Event';

export interface CalendarActivity {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  type: EventType;
}

export interface StudentProfile {
  name: string;
  email: string;
  matricNumber: string;
  department: Department;
  level: Level;
}
