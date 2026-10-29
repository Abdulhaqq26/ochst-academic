import type {
  TimetableEntry,
  Course,
  Reminder,
  Exam,
  Announcement,
  CalendarActivity,
  StudentProfile,
} from '../types';
import { todayISO, addDaysISO, dayNameForISO } from '../lib/utils';

export const studentProfile: StudentProfile = {
  name: 'Ade Ogundimu',
  email: 'ade@example.com',
  matricNumber: 'OCHST/CSC/24/001',
  department: 'Computer Science',
  level: 'ND II',
};

export const courses: Course[] = [
  { code: 'GST 101', title: 'Use of English I', department: 'General Studies' },
  { code: 'GST 102', title: 'Communication in English', department: 'General Studies' },
  { code: 'GST 201', title: 'Nigerian Peoples and Culture', department: 'General Studies' },
  { code: 'GST 202', title: 'Citizenship Education', department: 'General Studies' },
  { code: 'CSC 101', title: 'Introduction to Computer Science', department: 'Computer Science' },
  { code: 'CSC 102', title: 'Introduction to Programming I', department: 'Computer Science' },
  { code: 'CSC 201', title: 'Introduction to Programming II', department: 'Computer Science' },
  { code: 'CSC 202', title: 'Computer Architecture', department: 'Computer Science' },
  { code: 'CSC 203', title: 'Data Communication', department: 'Computer Science' },
  { code: 'MTH 201', title: 'Mathematical Methods', department: 'Computer Science' },
  { code: 'PHY 201', title: 'Physics for Computing', department: 'Computer Science' },
  { code: 'ENG 201', title: 'Technical Writing', department: 'Computer Science' },
  { code: 'CSC 301', title: 'Data Structures', department: 'Computer Science' },
  { code: 'CSC 302', title: 'Database Systems', department: 'Computer Science' },
  { code: 'CSC 303', title: 'Web Technologies', department: 'Computer Science' },
  { code: 'CSC 401', title: 'Operating Systems', department: 'Computer Science' },
  { code: 'CSC 402', title: 'Software Engineering', department: 'Computer Science' },
  { code: 'STA 101', title: 'Introduction to Statistics', department: 'Statistics' },
  { code: 'STA 201', title: 'Probability Theory', department: 'Statistics' },
  { code: 'STA 202', title: 'Statistical Methods', department: 'Statistics' },
  { code: 'STA 301', title: 'Statistical Inference', department: 'Statistics' },
  { code: 'STA 302', title: 'Sample Survey Methods', department: 'Statistics' },
  { code: 'STA 401', title: 'Applied Multivariate Statistics', department: 'Statistics' },
  { code: 'PHE 101', title: 'Introduction to Public Health', department: 'Public Health' },
  { code: 'PHE 201', title: 'Epidemiology I', department: 'Public Health' },
  { code: 'PHE 202', title: 'Health Education and Promotion', department: 'Public Health' },
  { code: 'PHE 301', title: 'Epidemiology II', department: 'Public Health' },
  { code: 'PHE 302', title: 'Biostatistics for Health', department: 'Public Health' },
  { code: 'PHE 401', title: 'Health Systems Management', department: 'Public Health' },
  { code: 'CHO 101', title: 'Introduction to Community Health', department: 'Community Health' },
  { code: 'CHO 201', title: 'Primary Health Care', department: 'Community Health' },
  { code: 'CHO 202', title: 'Maternal and Child Health', department: 'Community Health' },
  { code: 'CHO 301', title: 'Community Health Nursing Practice', department: 'Community Health' },
  { code: 'CHO 302', title: 'Disease Surveillance', department: 'Community Health' },
  { code: 'CHO 401', title: 'Community Health Practicum', department: 'Community Health' },
  { code: 'EHT 101', title: 'Introduction to Environmental Health', department: 'Environmental Health' },
  { code: 'EHT 201', title: 'Water and Sanitation', department: 'Environmental Health' },
  { code: 'EHT 202', title: 'Food Hygiene and Safety', department: 'Environmental Health' },
  { code: 'EHT 301', title: 'Occupational Health and Safety', department: 'Environmental Health' },
  { code: 'EHT 302', title: 'Vector Control', department: 'Environmental Health' },
  { code: 'EHT 401', title: 'Environmental Impact Assessment', department: 'Environmental Health' },
  { code: 'HIM 101', title: 'Health Records Management', department: 'Health Information Management' },
  { code: 'HIM 201', title: 'Medical Terminology', department: 'Health Information Management' },
  { code: 'HIM 202', title: 'Health Informatics', department: 'Health Information Management' },
  { code: 'HIM 301', title: 'Biostatistics and Health Data Analysis', department: 'Health Information Management' },
  { code: 'HIM 302', title: 'Health Insurance and Reimbursement', department: 'Health Information Management' },
  { code: 'HIM 401', title: 'Health Information Systems', department: 'Health Information Management' },
  { code: 'DTH 101', title: 'Introduction to Dental Therapy', department: 'Dental Therapy' },
  { code: 'DTH 201', title: 'Oral Anatomy and Physiology', department: 'Dental Therapy' },
  { code: 'DTH 202', title: 'Dental Health Education', department: 'Dental Therapy' },
  { code: 'DTH 301', title: 'Preventive Dentistry', department: 'Dental Therapy' },
  { code: 'DTH 302', title: 'Community Dentistry', department: 'Dental Therapy' },
  { code: 'DTH 401', title: 'Advanced Clinical Dental Therapy', department: 'Dental Therapy' },
  { code: 'DTC 101', title: 'Introduction to Dental Technology', department: 'Dental Technology' },
  { code: 'DTC 201', title: 'Dental Materials Science', department: 'Dental Technology' },
  { code: 'DTC 202', title: 'Denture Construction', department: 'Dental Technology' },
  { code: 'DTC 301', title: 'Crown and Bridge Technology', department: 'Dental Technology' },
  { code: 'DTC 302', title: 'Orthodontic Appliance Technology', department: 'Dental Technology' },
  { code: 'DTC 401', title: 'Advanced Denture Technology', department: 'Dental Technology' },
  { code: 'MLT 101', title: 'Introduction to Medical Laboratory Science', department: 'Medical Laboratory Technology' },
  { code: 'MLT 201', title: 'Medical Microbiology', department: 'Medical Laboratory Technology' },
  { code: 'MLT 202', title: 'Clinical Chemistry', department: 'Medical Laboratory Technology' },
  { code: 'MLT 301', title: 'Haematology and Blood Transfusion Science', department: 'Medical Laboratory Technology' },
  { code: 'MLT 302', title: 'Histopathology Techniques', department: 'Medical Laboratory Technology' },
  { code: 'MLT 401', title: 'Advanced Clinical Microbiology', department: 'Medical Laboratory Technology' },
  { code: 'PHT 101', title: 'Introduction to Pharmacy Practice', department: 'Pharmacy Technician' },
  { code: 'PHT 201', title: 'Pharmaceutical Chemistry', department: 'Pharmacy Technician' },
  { code: 'PHT 202', title: 'Dispensing Techniques', department: 'Pharmacy Technician' },
  { code: 'PHT 301', title: 'Pharmacology', department: 'Pharmacy Technician' },
  { code: 'PHT 302', title: 'Pharmacy Law and Ethics', department: 'Pharmacy Technician' },
  { code: 'PHT 401', title: 'Clinical Pharmacy Practice', department: 'Pharmacy Technician' },
  { code: 'NTD 101', title: 'Introduction to Human Nutrition', department: 'Nutrition and Dietetics' },
  { code: 'NTD 201', title: 'Diet Therapy', department: 'Nutrition and Dietetics' },
  { code: 'NTD 202', title: 'Food Science', department: 'Nutrition and Dietetics' },
  { code: 'NTD 301', title: 'Community Nutrition', department: 'Nutrition and Dietetics' },
  { code: 'NTD 302', title: 'Nutritional Biochemistry', department: 'Nutrition and Dietetics' },
  { code: 'NTD 401', title: 'Clinical Nutrition', department: 'Nutrition and Dietetics' },
  { code: 'ANA 201', title: 'Gross Anatomy', department: 'Anatomy' },
  { code: 'ANA 202', title: 'Histology', department: 'Anatomy' },
  { code: 'ANA 301', title: 'Systemic Anatomy', department: 'Anatomy' },
  { code: 'PHS 201', title: 'Human Physiology', department: 'Physiology' },
  { code: 'PHS 301', title: 'Applied Physiology', department: 'Physiology' },
  { code: 'BCH 201', title: 'General Biochemistry', department: 'Biochemistry' },
  { code: 'BCH 301', title: 'Metabolic Biochemistry', department: 'Biochemistry' },
];

const SESSION = '2025/2026';

export const timetableEntries: TimetableEntry[] = [
  { id: 't1', courseCode: 'GST 101', courseTitle: 'Use of English I', department: 'General Studies', level: 'ND I', day: 'Monday', startTime: '08:00', endTime: '10:00', venue: 'Lecture Hall A', lecturer: 'Dr. A. O. Adeyemi', semester: 'First Semester', academicSession: SESSION },
  { id: 't2', courseCode: 'GST 102', courseTitle: 'Communication in English', department: 'General Studies', level: 'ND I', day: 'Tuesday', startTime: '08:00', endTime: '09:00', venue: 'Lecture Hall B', lecturer: 'Mrs. K. A. Balogun', semester: 'First Semester', academicSession: SESSION },
  { id: 't3', courseCode: 'GST 201', courseTitle: 'Nigerian Peoples and Culture', department: 'General Studies', level: 'ND II', day: 'Wednesday', startTime: '09:00', endTime: '11:00', venue: 'Lecture Hall C', lecturer: 'Mr. T. O. Ibrahim', semester: 'First Semester', academicSession: SESSION },
  { id: 't4', courseCode: 'GST 202', courseTitle: 'Citizenship Education', department: 'General Studies', level: 'ND II', day: 'Thursday', startTime: '10:00', endTime: '12:00', venue: 'Lecture Hall D', lecturer: 'Dr. M. A. Yusuf', semester: 'First Semester', academicSession: SESSION },
  { id: 't5', courseCode: 'CSC 101', courseTitle: 'Introduction to Computer Science', department: 'Computer Science', level: 'ND I', day: 'Friday', startTime: '11:00', endTime: '12:00', venue: 'Science Laboratory', lecturer: 'Mrs. R. O. Adebayo', semester: 'First Semester', academicSession: SESSION },
  { id: 't6', courseCode: 'CSC 102', courseTitle: 'Introduction to Programming I', department: 'Computer Science', level: 'ND I', day: 'Monday', startTime: '11:00', endTime: '13:00', venue: 'Computer Laboratory 1', lecturer: 'Mr. S. A. Oladipo', semester: 'First Semester', academicSession: SESSION },
  { id: 't7', courseCode: 'CSC 201', courseTitle: 'Introduction to Programming II', department: 'Computer Science', level: 'ND II', day: 'Tuesday', startTime: '13:00', endTime: '15:00', venue: 'Computer Laboratory 2', lecturer: 'Dr. F. O. Ogunleye', semester: 'Second Semester', academicSession: SESSION },
  { id: 't8', courseCode: 'CSC 202', courseTitle: 'Computer Architecture', department: 'Computer Science', level: 'ND II', day: 'Wednesday', startTime: '13:00', endTime: '14:00', venue: 'ICT Centre', lecturer: 'Dr. C. N. Eze', semester: 'First Semester', academicSession: SESSION },
  { id: 't9', courseCode: 'CSC 203', courseTitle: 'Data Communication', department: 'Computer Science', level: 'ND II', day: 'Thursday', startTime: '14:00', endTime: '16:00', venue: 'Anatomy Laboratory', lecturer: 'Mrs. B. T. Fashola', semester: 'First Semester', academicSession: SESSION },
  { id: 't10', courseCode: 'MTH 201', courseTitle: 'Mathematical Methods', department: 'Computer Science', level: 'ND II', day: 'Friday', startTime: '15:00', endTime: '16:00', venue: 'Physiology Laboratory', lecturer: 'Mr. O. A. Salako', semester: 'First Semester', academicSession: SESSION },
  { id: 't11', courseCode: 'PHY 201', courseTitle: 'Physics for Computing', department: 'Computer Science', level: 'ND II', day: 'Monday', startTime: '15:00', endTime: '17:00', venue: 'Biochemistry Laboratory', lecturer: 'Dr. H. A. Musa', semester: 'First Semester', academicSession: SESSION },
  { id: 't12', courseCode: 'ENG 201', courseTitle: 'Technical Writing', department: 'Computer Science', level: 'ND II', day: 'Tuesday', startTime: '08:00', endTime: '10:00', venue: 'Seminar Room', lecturer: 'Mrs. T. A. Bakare', semester: 'First Semester', academicSession: SESSION },
  { id: 't13', courseCode: 'CSC 301', courseTitle: 'Data Structures', department: 'Computer Science', level: 'HND I', day: 'Wednesday', startTime: '08:00', endTime: '09:00', venue: 'Room 101', lecturer: 'Mr. K. O. Adisa', semester: 'First Semester', academicSession: SESSION },
  { id: 't14', courseCode: 'CSC 302', courseTitle: 'Database Systems', department: 'Computer Science', level: 'HND I', day: 'Thursday', startTime: '09:00', endTime: '11:00', venue: 'Room 204', lecturer: 'Dr. N. E. Okonkwo', semester: 'Second Semester', academicSession: SESSION },
  { id: 't15', courseCode: 'CSC 303', courseTitle: 'Web Technologies', department: 'Computer Science', level: 'HND I', day: 'Friday', startTime: '10:00', endTime: '12:00', venue: 'Room 305', lecturer: 'Prof. J. A. Okafor', semester: 'First Semester', academicSession: SESSION },
  { id: 't16', courseCode: 'CSC 401', courseTitle: 'Operating Systems', department: 'Computer Science', level: 'HND II', day: 'Monday', startTime: '11:00', endTime: '12:00', venue: 'Dental Laboratory', lecturer: 'Mrs. F. O. Lawal', semester: 'First Semester', academicSession: SESSION },
  { id: 't17', courseCode: 'CSC 402', courseTitle: 'Software Engineering', department: 'Computer Science', level: 'HND II', day: 'Tuesday', startTime: '11:00', endTime: '13:00', venue: 'Pharmacy Laboratory', lecturer: 'Mr. D. A. Yakubu', semester: 'First Semester', academicSession: SESSION },
  { id: 't18', courseCode: 'STA 101', courseTitle: 'Introduction to Statistics', department: 'Statistics', level: 'ND I', day: 'Wednesday', startTime: '13:00', endTime: '15:00', venue: 'Nutrition Laboratory', lecturer: 'Dr. P. O. Nwachukwu', semester: 'First Semester', academicSession: SESSION },
  { id: 't19', courseCode: 'STA 201', courseTitle: 'Probability Theory', department: 'Statistics', level: 'ND II', day: 'Thursday', startTime: '13:00', endTime: '14:00', venue: 'Public Health Lecture Hall', lecturer: 'Mrs. A. O. Sanni', semester: 'First Semester', academicSession: SESSION },
  { id: 't20', courseCode: 'STA 202', courseTitle: 'Statistical Methods', department: 'Statistics', level: 'ND II', day: 'Friday', startTime: '14:00', endTime: '16:00', venue: 'HIM Laboratory', lecturer: 'Mr. E. O. Adegoke', semester: 'First Semester', academicSession: SESSION },
  { id: 't21', courseCode: 'STA 301', courseTitle: 'Statistical Inference', department: 'Statistics', level: 'HND I', day: 'Monday', startTime: '15:00', endTime: '16:00', venue: 'Community Health Laboratory', lecturer: 'Dr. O. T. Bello', semester: 'Second Semester', academicSession: SESSION },
  { id: 't22', courseCode: 'STA 302', courseTitle: 'Sample Survey Methods', department: 'Statistics', level: 'HND I', day: 'Tuesday', startTime: '15:00', endTime: '17:00', venue: 'Environmental Health Laboratory', lecturer: 'Mrs. G. A. Afolabi', semester: 'First Semester', academicSession: SESSION },
  { id: 't23', courseCode: 'STA 401', courseTitle: 'Applied Multivariate Statistics', department: 'Statistics', level: 'HND II', day: 'Wednesday', startTime: '08:00', endTime: '10:00', venue: 'MLT Laboratory', lecturer: 'Dr. A. O. Adeyemi', semester: 'First Semester', academicSession: SESSION },
  { id: 't24', courseCode: 'PHE 101', courseTitle: 'Introduction to Public Health', department: 'Public Health', level: 'ND I', day: 'Thursday', startTime: '08:00', endTime: '09:00', venue: 'Lecture Hall A', lecturer: 'Mrs. K. A. Balogun', semester: 'First Semester', academicSession: SESSION },
  { id: 't25', courseCode: 'PHE 201', courseTitle: 'Epidemiology I', department: 'Public Health', level: 'ND II', day: 'Friday', startTime: '09:00', endTime: '11:00', venue: 'Lecture Hall B', lecturer: 'Mr. T. O. Ibrahim', semester: 'First Semester', academicSession: SESSION },
  { id: 't26', courseCode: 'PHE 202', courseTitle: 'Health Education and Promotion', department: 'Public Health', level: 'ND II', day: 'Monday', startTime: '10:00', endTime: '12:00', venue: 'Lecture Hall C', lecturer: 'Dr. M. A. Yusuf', semester: 'First Semester', academicSession: SESSION },
  { id: 't27', courseCode: 'PHE 301', courseTitle: 'Epidemiology II', department: 'Public Health', level: 'HND I', day: 'Tuesday', startTime: '11:00', endTime: '12:00', venue: 'Lecture Hall D', lecturer: 'Mrs. R. O. Adebayo', semester: 'First Semester', academicSession: SESSION },
  { id: 't28', courseCode: 'PHE 302', courseTitle: 'Biostatistics for Health', department: 'Public Health', level: 'HND I', day: 'Wednesday', startTime: '11:00', endTime: '13:00', venue: 'Science Laboratory', lecturer: 'Mr. S. A. Oladipo', semester: 'Second Semester', academicSession: SESSION },
  { id: 't29', courseCode: 'PHE 401', courseTitle: 'Health Systems Management', department: 'Public Health', level: 'HND II', day: 'Thursday', startTime: '13:00', endTime: '15:00', venue: 'Computer Laboratory 1', lecturer: 'Dr. F. O. Ogunleye', semester: 'First Semester', academicSession: SESSION },
  { id: 't30', courseCode: 'CHO 101', courseTitle: 'Introduction to Community Health', department: 'Community Health', level: 'ND I', day: 'Friday', startTime: '13:00', endTime: '14:00', venue: 'Computer Laboratory 2', lecturer: 'Dr. C. N. Eze', semester: 'First Semester', academicSession: SESSION },
  { id: 't31', courseCode: 'CHO 201', courseTitle: 'Primary Health Care', department: 'Community Health', level: 'ND II', day: 'Monday', startTime: '14:00', endTime: '16:00', venue: 'ICT Centre', lecturer: 'Mrs. B. T. Fashola', semester: 'First Semester', academicSession: SESSION },
  { id: 't32', courseCode: 'CHO 202', courseTitle: 'Maternal and Child Health', department: 'Community Health', level: 'ND II', day: 'Tuesday', startTime: '15:00', endTime: '16:00', venue: 'Anatomy Laboratory', lecturer: 'Mr. O. A. Salako', semester: 'First Semester', academicSession: SESSION },
  { id: 't33', courseCode: 'CHO 301', courseTitle: 'Community Health Nursing Practice', department: 'Community Health', level: 'HND I', day: 'Wednesday', startTime: '15:00', endTime: '17:00', venue: 'Physiology Laboratory', lecturer: 'Dr. H. A. Musa', semester: 'First Semester', academicSession: SESSION },
  { id: 't34', courseCode: 'CHO 302', courseTitle: 'Disease Surveillance', department: 'Community Health', level: 'HND I', day: 'Thursday', startTime: '08:00', endTime: '10:00', venue: 'Biochemistry Laboratory', lecturer: 'Mrs. T. A. Bakare', semester: 'First Semester', academicSession: SESSION },
  { id: 't35', courseCode: 'CHO 401', courseTitle: 'Community Health Practicum', department: 'Community Health', level: 'HND II', day: 'Friday', startTime: '08:00', endTime: '09:00', venue: 'Seminar Room', lecturer: 'Mr. K. O. Adisa', semester: 'Second Semester', academicSession: SESSION },
  { id: 't36', courseCode: 'EHT 101', courseTitle: 'Introduction to Environmental Health', department: 'Environmental Health', level: 'ND I', day: 'Monday', startTime: '09:00', endTime: '11:00', venue: 'Room 101', lecturer: 'Dr. N. E. Okonkwo', semester: 'First Semester', academicSession: SESSION },
  { id: 't37', courseCode: 'EHT 201', courseTitle: 'Water and Sanitation', department: 'Environmental Health', level: 'ND II', day: 'Tuesday', startTime: '10:00', endTime: '12:00', venue: 'Room 204', lecturer: 'Prof. J. A. Okafor', semester: 'First Semester', academicSession: SESSION },
  { id: 't38', courseCode: 'EHT 202', courseTitle: 'Food Hygiene and Safety', department: 'Environmental Health', level: 'ND II', day: 'Wednesday', startTime: '11:00', endTime: '12:00', venue: 'Room 305', lecturer: 'Mrs. F. O. Lawal', semester: 'First Semester', academicSession: SESSION },
  { id: 't39', courseCode: 'EHT 301', courseTitle: 'Occupational Health and Safety', department: 'Environmental Health', level: 'HND I', day: 'Thursday', startTime: '11:00', endTime: '13:00', venue: 'Dental Laboratory', lecturer: 'Mr. D. A. Yakubu', semester: 'First Semester', academicSession: SESSION },
  { id: 't40', courseCode: 'EHT 302', courseTitle: 'Vector Control', department: 'Environmental Health', level: 'HND I', day: 'Friday', startTime: '13:00', endTime: '15:00', venue: 'Pharmacy Laboratory', lecturer: 'Dr. P. O. Nwachukwu', semester: 'First Semester', academicSession: SESSION },
  { id: 't41', courseCode: 'EHT 401', courseTitle: 'Environmental Impact Assessment', department: 'Environmental Health', level: 'HND II', day: 'Monday', startTime: '13:00', endTime: '14:00', venue: 'Nutrition Laboratory', lecturer: 'Mrs. A. O. Sanni', semester: 'First Semester', academicSession: SESSION },
  { id: 't42', courseCode: 'HIM 101', courseTitle: 'Health Records Management', department: 'Health Information Management', level: 'ND I', day: 'Tuesday', startTime: '14:00', endTime: '16:00', venue: 'Public Health Lecture Hall', lecturer: 'Mr. E. O. Adegoke', semester: 'Second Semester', academicSession: SESSION },
  { id: 't43', courseCode: 'HIM 201', courseTitle: 'Medical Terminology', department: 'Health Information Management', level: 'ND II', day: 'Wednesday', startTime: '15:00', endTime: '16:00', venue: 'HIM Laboratory', lecturer: 'Dr. O. T. Bello', semester: 'First Semester', academicSession: SESSION },
  { id: 't44', courseCode: 'HIM 202', courseTitle: 'Health Informatics', department: 'Health Information Management', level: 'ND II', day: 'Thursday', startTime: '15:00', endTime: '17:00', venue: 'Community Health Laboratory', lecturer: 'Mrs. G. A. Afolabi', semester: 'First Semester', academicSession: SESSION },
  { id: 't45', courseCode: 'HIM 301', courseTitle: 'Biostatistics and Health Data Analysis', department: 'Health Information Management', level: 'HND I', day: 'Friday', startTime: '08:00', endTime: '10:00', venue: 'Environmental Health Laboratory', lecturer: 'Dr. A. O. Adeyemi', semester: 'First Semester', academicSession: SESSION },
  { id: 't46', courseCode: 'HIM 302', courseTitle: 'Health Insurance and Reimbursement', department: 'Health Information Management', level: 'HND I', day: 'Monday', startTime: '08:00', endTime: '09:00', venue: 'MLT Laboratory', lecturer: 'Mrs. K. A. Balogun', semester: 'First Semester', academicSession: SESSION },
  { id: 't47', courseCode: 'HIM 401', courseTitle: 'Health Information Systems', department: 'Health Information Management', level: 'HND II', day: 'Tuesday', startTime: '09:00', endTime: '11:00', venue: 'Lecture Hall A', lecturer: 'Mr. T. O. Ibrahim', semester: 'First Semester', academicSession: SESSION },
  { id: 't48', courseCode: 'DTH 101', courseTitle: 'Introduction to Dental Therapy', department: 'Dental Therapy', level: 'ND I', day: 'Wednesday', startTime: '10:00', endTime: '12:00', venue: 'Lecture Hall B', lecturer: 'Dr. M. A. Yusuf', semester: 'First Semester', academicSession: SESSION },
  { id: 't49', courseCode: 'DTH 201', courseTitle: 'Oral Anatomy and Physiology', department: 'Dental Therapy', level: 'ND II', day: 'Thursday', startTime: '11:00', endTime: '12:00', venue: 'Lecture Hall C', lecturer: 'Mrs. R. O. Adebayo', semester: 'Second Semester', academicSession: SESSION },
  { id: 't50', courseCode: 'DTH 202', courseTitle: 'Dental Health Education', department: 'Dental Therapy', level: 'ND II', day: 'Friday', startTime: '11:00', endTime: '13:00', venue: 'Lecture Hall D', lecturer: 'Mr. S. A. Oladipo', semester: 'First Semester', academicSession: SESSION },
  { id: 't51', courseCode: 'DTH 301', courseTitle: 'Preventive Dentistry', department: 'Dental Therapy', level: 'HND I', day: 'Monday', startTime: '13:00', endTime: '15:00', venue: 'Science Laboratory', lecturer: 'Dr. F. O. Ogunleye', semester: 'First Semester', academicSession: SESSION },
  { id: 't52', courseCode: 'DTH 302', courseTitle: 'Community Dentistry', department: 'Dental Therapy', level: 'HND I', day: 'Tuesday', startTime: '13:00', endTime: '14:00', venue: 'Computer Laboratory 1', lecturer: 'Dr. C. N. Eze', semester: 'First Semester', academicSession: SESSION },
  { id: 't53', courseCode: 'DTH 401', courseTitle: 'Advanced Clinical Dental Therapy', department: 'Dental Therapy', level: 'HND II', day: 'Wednesday', startTime: '14:00', endTime: '16:00', venue: 'Computer Laboratory 2', lecturer: 'Mrs. B. T. Fashola', semester: 'First Semester', academicSession: SESSION },
  { id: 't54', courseCode: 'DTC 101', courseTitle: 'Introduction to Dental Technology', department: 'Dental Technology', level: 'ND I', day: 'Thursday', startTime: '15:00', endTime: '16:00', venue: 'ICT Centre', lecturer: 'Mr. O. A. Salako', semester: 'First Semester', academicSession: SESSION },
  { id: 't55', courseCode: 'DTC 201', courseTitle: 'Dental Materials Science', department: 'Dental Technology', level: 'ND II', day: 'Friday', startTime: '15:00', endTime: '17:00', venue: 'Anatomy Laboratory', lecturer: 'Dr. H. A. Musa', semester: 'First Semester', academicSession: SESSION },
  { id: 't56', courseCode: 'DTC 202', courseTitle: 'Denture Construction', department: 'Dental Technology', level: 'ND II', day: 'Monday', startTime: '08:00', endTime: '10:00', venue: 'Physiology Laboratory', lecturer: 'Mrs. T. A. Bakare', semester: 'Second Semester', academicSession: SESSION },
  { id: 't57', courseCode: 'DTC 301', courseTitle: 'Crown and Bridge Technology', department: 'Dental Technology', level: 'HND I', day: 'Tuesday', startTime: '08:00', endTime: '09:00', venue: 'Biochemistry Laboratory', lecturer: 'Mr. K. O. Adisa', semester: 'First Semester', academicSession: SESSION },
  { id: 't58', courseCode: 'DTC 302', courseTitle: 'Orthodontic Appliance Technology', department: 'Dental Technology', level: 'HND I', day: 'Wednesday', startTime: '09:00', endTime: '11:00', venue: 'Seminar Room', lecturer: 'Dr. N. E. Okonkwo', semester: 'First Semester', academicSession: SESSION },
  { id: 't59', courseCode: 'DTC 401', courseTitle: 'Advanced Denture Technology', department: 'Dental Technology', level: 'HND II', day: 'Thursday', startTime: '10:00', endTime: '12:00', venue: 'Room 101', lecturer: 'Prof. J. A. Okafor', semester: 'First Semester', academicSession: SESSION },
  { id: 't60', courseCode: 'MLT 101', courseTitle: 'Introduction to Medical Laboratory Science', department: 'Medical Laboratory Technology', level: 'ND I', day: 'Friday', startTime: '11:00', endTime: '12:00', venue: 'Room 204', lecturer: 'Mrs. F. O. Lawal', semester: 'First Semester', academicSession: SESSION },
  { id: 't61', courseCode: 'MLT 201', courseTitle: 'Medical Microbiology', department: 'Medical Laboratory Technology', level: 'ND II', day: 'Monday', startTime: '11:00', endTime: '13:00', venue: 'Room 305', lecturer: 'Mr. D. A. Yakubu', semester: 'First Semester', academicSession: SESSION },
  { id: 't62', courseCode: 'MLT 202', courseTitle: 'Clinical Chemistry', department: 'Medical Laboratory Technology', level: 'ND II', day: 'Tuesday', startTime: '13:00', endTime: '15:00', venue: 'Dental Laboratory', lecturer: 'Dr. P. O. Nwachukwu', semester: 'First Semester', academicSession: SESSION },
  { id: 't63', courseCode: 'MLT 301', courseTitle: 'Haematology and Blood Transfusion Science', department: 'Medical Laboratory Technology', level: 'HND I', day: 'Wednesday', startTime: '13:00', endTime: '14:00', venue: 'Pharmacy Laboratory', lecturer: 'Mrs. A. O. Sanni', semester: 'Second Semester', academicSession: SESSION },
  { id: 't64', courseCode: 'MLT 302', courseTitle: 'Histopathology Techniques', department: 'Medical Laboratory Technology', level: 'HND I', day: 'Thursday', startTime: '14:00', endTime: '16:00', venue: 'Nutrition Laboratory', lecturer: 'Mr. E. O. Adegoke', semester: 'First Semester', academicSession: SESSION },
  { id: 't65', courseCode: 'MLT 401', courseTitle: 'Advanced Clinical Microbiology', department: 'Medical Laboratory Technology', level: 'HND II', day: 'Friday', startTime: '15:00', endTime: '16:00', venue: 'Public Health Lecture Hall', lecturer: 'Dr. O. T. Bello', semester: 'First Semester', academicSession: SESSION },
  { id: 't66', courseCode: 'PHT 101', courseTitle: 'Introduction to Pharmacy Practice', department: 'Pharmacy Technician', level: 'ND I', day: 'Monday', startTime: '15:00', endTime: '17:00', venue: 'HIM Laboratory', lecturer: 'Mrs. G. A. Afolabi', semester: 'First Semester', academicSession: SESSION },
  { id: 't67', courseCode: 'PHT 201', courseTitle: 'Pharmaceutical Chemistry', department: 'Pharmacy Technician', level: 'ND II', day: 'Tuesday', startTime: '08:00', endTime: '10:00', venue: 'Community Health Laboratory', lecturer: 'Dr. A. O. Adeyemi', semester: 'First Semester', academicSession: SESSION },
  { id: 't68', courseCode: 'PHT 202', courseTitle: 'Dispensing Techniques', department: 'Pharmacy Technician', level: 'ND II', day: 'Wednesday', startTime: '08:00', endTime: '09:00', venue: 'Environmental Health Laboratory', lecturer: 'Mrs. K. A. Balogun', semester: 'First Semester', academicSession: SESSION },
  { id: 't69', courseCode: 'PHT 301', courseTitle: 'Pharmacology', department: 'Pharmacy Technician', level: 'HND I', day: 'Thursday', startTime: '09:00', endTime: '11:00', venue: 'MLT Laboratory', lecturer: 'Mr. T. O. Ibrahim', semester: 'First Semester', academicSession: SESSION },
  { id: 't70', courseCode: 'PHT 302', courseTitle: 'Pharmacy Law and Ethics', department: 'Pharmacy Technician', level: 'HND I', day: 'Friday', startTime: '10:00', endTime: '12:00', venue: 'Lecture Hall A', lecturer: 'Dr. M. A. Yusuf', semester: 'Second Semester', academicSession: SESSION },
  { id: 't71', courseCode: 'PHT 401', courseTitle: 'Clinical Pharmacy Practice', department: 'Pharmacy Technician', level: 'HND II', day: 'Monday', startTime: '11:00', endTime: '12:00', venue: 'Lecture Hall B', lecturer: 'Mrs. R. O. Adebayo', semester: 'First Semester', academicSession: SESSION },
  { id: 't72', courseCode: 'NTD 101', courseTitle: 'Introduction to Human Nutrition', department: 'Nutrition and Dietetics', level: 'ND I', day: 'Tuesday', startTime: '11:00', endTime: '13:00', venue: 'Lecture Hall C', lecturer: 'Mr. S. A. Oladipo', semester: 'First Semester', academicSession: SESSION },
  { id: 't73', courseCode: 'NTD 201', courseTitle: 'Diet Therapy', department: 'Nutrition and Dietetics', level: 'ND II', day: 'Wednesday', startTime: '13:00', endTime: '15:00', venue: 'Lecture Hall D', lecturer: 'Dr. F. O. Ogunleye', semester: 'First Semester', academicSession: SESSION },
  { id: 't74', courseCode: 'NTD 202', courseTitle: 'Food Science', department: 'Nutrition and Dietetics', level: 'ND II', day: 'Thursday', startTime: '13:00', endTime: '14:00', venue: 'Science Laboratory', lecturer: 'Dr. C. N. Eze', semester: 'First Semester', academicSession: SESSION },
  { id: 't75', courseCode: 'NTD 301', courseTitle: 'Community Nutrition', department: 'Nutrition and Dietetics', level: 'HND I', day: 'Friday', startTime: '14:00', endTime: '16:00', venue: 'Computer Laboratory 1', lecturer: 'Mrs. B. T. Fashola', semester: 'First Semester', academicSession: SESSION },
  { id: 't76', courseCode: 'NTD 302', courseTitle: 'Nutritional Biochemistry', department: 'Nutrition and Dietetics', level: 'HND I', day: 'Monday', startTime: '15:00', endTime: '16:00', venue: 'Computer Laboratory 2', lecturer: 'Mr. O. A. Salako', semester: 'First Semester', academicSession: SESSION },
  { id: 't77', courseCode: 'NTD 401', courseTitle: 'Clinical Nutrition', department: 'Nutrition and Dietetics', level: 'HND II', day: 'Tuesday', startTime: '15:00', endTime: '17:00', venue: 'ICT Centre', lecturer: 'Dr. H. A. Musa', semester: 'Second Semester', academicSession: SESSION },
  { id: 't78', courseCode: 'ANA 201', courseTitle: 'Gross Anatomy', department: 'Anatomy', level: 'ND II', day: 'Wednesday', startTime: '08:00', endTime: '10:00', venue: 'Anatomy Laboratory', lecturer: 'Mrs. T. A. Bakare', semester: 'First Semester', academicSession: SESSION },
  { id: 't79', courseCode: 'ANA 202', courseTitle: 'Histology', department: 'Anatomy', level: 'ND II', day: 'Thursday', startTime: '08:00', endTime: '09:00', venue: 'Physiology Laboratory', lecturer: 'Mr. K. O. Adisa', semester: 'First Semester', academicSession: SESSION },
  { id: 't80', courseCode: 'ANA 301', courseTitle: 'Systemic Anatomy', department: 'Anatomy', level: 'HND I', day: 'Friday', startTime: '09:00', endTime: '11:00', venue: 'Biochemistry Laboratory', lecturer: 'Dr. N. E. Okonkwo', semester: 'First Semester', academicSession: SESSION },
  { id: 't81', courseCode: 'PHS 201', courseTitle: 'Human Physiology', department: 'Physiology', level: 'ND II', day: 'Monday', startTime: '10:00', endTime: '12:00', venue: 'Seminar Room', lecturer: 'Prof. J. A. Okafor', semester: 'First Semester', academicSession: SESSION },
  { id: 't82', courseCode: 'PHS 301', courseTitle: 'Applied Physiology', department: 'Physiology', level: 'HND I', day: 'Tuesday', startTime: '11:00', endTime: '12:00', venue: 'Room 101', lecturer: 'Mrs. F. O. Lawal', semester: 'First Semester', academicSession: SESSION },
  { id: 't83', courseCode: 'BCH 201', courseTitle: 'General Biochemistry', department: 'Biochemistry', level: 'ND II', day: 'Wednesday', startTime: '11:00', endTime: '13:00', venue: 'Room 204', lecturer: 'Mr. D. A. Yakubu', semester: 'First Semester', academicSession: SESSION },
  { id: 't84', courseCode: 'BCH 301', courseTitle: 'Metabolic Biochemistry', department: 'Biochemistry', level: 'HND I', day: 'Thursday', startTime: '13:00', endTime: '15:00', venue: 'Room 305', lecturer: 'Dr. P. O. Nwachukwu', semester: 'Second Semester', academicSession: SESSION },
];

const today = todayISO();

export const exams: Exam[] = [
  { id: 'e1', courseCode: 'CSC 301', courseTitle: 'Data Structures', date: '2026-09-15', time: '09:00', venue: 'Lecture Hall A', department: 'Computer Science', level: 'HND I' },
  { id: 'e2', courseCode: 'MTH 201', courseTitle: 'Mathematical Methods', date: '2026-09-18', time: '10:00', venue: 'Lecture Hall B', department: 'Computer Science', level: 'ND II' },
  { id: 'e3', courseCode: 'STA 202', courseTitle: 'Statistical Methods', date: '2026-09-22', time: '09:00', venue: 'Room 204', department: 'Statistics', level: 'ND II' },
  { id: 'e4', courseCode: 'CSC 201', courseTitle: 'Introduction to Programming II', date: '2026-09-25', time: '11:00', venue: 'Computer Laboratory 2', department: 'Computer Science', level: 'ND II' },
  { id: 'e5', courseCode: 'ANA 201', courseTitle: 'Gross Anatomy', date: '2026-09-20', time: '09:00', venue: 'Anatomy Laboratory', department: 'Anatomy', level: 'ND II' },
  { id: 'e6', courseCode: 'PHE 201', courseTitle: 'Epidemiology I', date: '2026-09-16', time: '10:00', venue: 'Public Health Lecture Hall', department: 'Public Health', level: 'ND II' },
  { id: 'e7', courseCode: 'CHO 201', courseTitle: 'Primary Health Care', date: '2026-09-17', time: '09:00', venue: 'Community Health Laboratory', department: 'Community Health', level: 'ND II' },
  { id: 'e8', courseCode: 'EHT 301', courseTitle: 'Occupational Health and Safety', date: '2026-09-19', time: '11:00', venue: 'Environmental Health Laboratory', department: 'Environmental Health', level: 'HND I' },
  { id: 'e9', courseCode: 'HIM 201', courseTitle: 'Medical Terminology', date: '2026-09-21', time: '09:00', venue: 'HIM Laboratory', department: 'Health Information Management', level: 'ND II' },
  { id: 'e10', courseCode: 'DTH 201', courseTitle: 'Oral Anatomy and Physiology', date: '2026-09-23', time: '10:00', venue: 'Dental Laboratory', department: 'Dental Therapy', level: 'ND II' },
  { id: 'e11', courseCode: 'DTC 301', courseTitle: 'Crown and Bridge Technology', date: '2026-09-24', time: '09:00', venue: 'Dental Laboratory', department: 'Dental Technology', level: 'HND I' },
  { id: 'e12', courseCode: 'MLT 201', courseTitle: 'Medical Microbiology', date: '2026-09-26', time: '11:00', venue: 'MLT Laboratory', department: 'Medical Laboratory Technology', level: 'ND II' },
  { id: 'e13', courseCode: 'PHT 301', courseTitle: 'Pharmacology', date: '2026-09-27', time: '09:00', venue: 'Pharmacy Laboratory', department: 'Pharmacy Technician', level: 'HND I' },
  { id: 'e14', courseCode: 'NTD 201', courseTitle: 'Diet Therapy', date: '2026-09-28', time: '10:00', venue: 'Nutrition Laboratory', department: 'Nutrition and Dietetics', level: 'ND II' },
  { id: 'e15', courseCode: 'GST 101', courseTitle: 'Use of English I', date: '2026-09-29', time: '09:00', venue: 'Lecture Hall A', department: 'General Studies', level: 'ND I' },
];

export const reminders: Reminder[] = [
  { id: 'r1', title: 'Submit CSC 201 Assignment', description: 'Upload the pseudocode assignment on the portal.', date: today, time: '18:00', priority: 'High', type: 'Assignment', repeat: 'Does not repeat', completed: false },
  { id: 'r2', title: 'Prepare for MTH 201 Test', description: 'Revise chapters 3 and 4.', date: addDaysISO(today, 1), time: '20:00', priority: 'Medium', type: 'Exam', repeat: 'Does not repeat', completed: false },
  { id: 'r3', title: 'Read Chapter 4 — Statistics', date: addDaysISO(today, 3), time: '17:00', priority: 'Low', type: 'Personal', repeat: 'Does not repeat', completed: false },
  { id: 'r4', title: 'Anatomy Practical Write-up', description: 'Complete the dissection report.', date: addDaysISO(today, 4), time: '16:00', priority: 'Medium', type: 'Assignment', repeat: 'Does not repeat', completed: false },
  { id: 'r5', title: 'Attend CSC 302 Practical Session', date: addDaysISO(today, 1), time: '11:00', priority: 'Medium', type: 'Class', repeat: 'Weekly', completed: false },
  { id: 'r6', title: 'Public Health Group Assignment', description: 'Coordinate with group members on the report.', date: addDaysISO(today, 2), time: '19:00', priority: 'High', type: 'Assignment', repeat: 'Does not repeat', completed: false },
  { id: 'r7', title: 'Renew Library Access Card', date: addDaysISO(today, 6), time: '10:00', priority: 'Low', type: 'General', repeat: 'Does not repeat', completed: false },
  { id: 'r8', title: 'Review Lecture Notes — CSC 201', date: addDaysISO(today, 0), time: '21:00', priority: 'Low', type: 'Personal', repeat: 'Daily', completed: false },
  { id: 'r9', title: 'Submit Departmental Registration Form', date: addDaysISO(today, -2), time: '15:00', priority: 'High', type: 'General', repeat: 'Does not repeat', completed: true },
  { id: 'r10', title: 'Pay Semester Dues', date: addDaysISO(today, -5), time: '12:00', priority: 'Medium', type: 'General', repeat: 'Does not repeat', completed: true },
  { id: 'r11', title: 'Community Health Field Report', description: 'Finalize the primary health care field visit report.', date: addDaysISO(today, 5), time: '17:00', priority: 'Medium', type: 'Assignment', repeat: 'Does not repeat', completed: false },
  { id: 'r12', title: 'Dental Therapy Practical Assessment', date: addDaysISO(today, 7), time: '09:00', priority: 'High', type: 'Exam', repeat: 'Does not repeat', completed: false },
  { id: 'r13', title: 'MLT Laboratory Safety Briefing', date: addDaysISO(today, 2), time: '08:30', priority: 'Medium', type: 'Class', repeat: 'Does not repeat', completed: false },
];

export const announcements: Announcement[] = [
  { id: 'a1', title: 'First Semester Examination Timetable Released', body: 'The first semester examination timetable has been released. Students are advised to check their examination dates and venues on the notice board and student portal ahead of the exam period.', date: '2026-09-05', category: 'Academic', read: false },
  { id: 'a2', title: 'Departmental Orientation', body: 'All newly admitted students are advised to attend the departmental orientation holding at the departmental hall. Attendance is compulsory for all fresh ND I students.', date: '2026-09-03', category: 'Department', read: true },
  { id: 'a3', title: 'Lecture Venue Change', body: 'CSC 301 lectures will temporarily hold at Lecture Hall B while Lecture Hall A undergoes minor renovation works. This takes effect immediately until further notice.', date: '2026-09-01', category: 'Notice', read: true },
  { id: 'a4', title: 'Library Extended Hours During Exams', body: 'The central library will extend its opening hours to 10:00 PM daily throughout the examination period to support student revision.', date: '2026-09-07', category: 'Notice', read: false },
  { id: 'a5', title: 'Matriculation Ceremony Announced', body: 'The matriculation ceremony for newly admitted students has been scheduled. Further details will be communicated through departmental notice boards.', date: '2026-08-28', category: 'Academic', read: true },
  { id: 'a6', title: 'Health Sciences Practical Rotation Schedule', body: 'Community Health, Environmental Health, Dental Therapy, Dental Technology, Medical Laboratory Technology and Pharmacy Technician students should check their updated practical rotation schedule on the departmental board.', date: '2026-09-08', category: 'Department', read: false },
  { id: 'a7', title: 'New Laboratory Equipment for MLT and Dental Programmes', body: 'The Medical Laboratory Technology and Dental Technology laboratories have received new demo equipment for the current session. Orientation sessions will be held before practicals resume.', date: '2026-09-04', category: 'Department', read: false },
  { id: 'a8', title: 'Nutrition and Dietetics Guest Lecture', body: 'A guest lecture on community nutrition programmes will hold for Nutrition and Dietetics students. All levels are encouraged to attend.', date: '2026-09-06', category: 'Academic', read: false },
];

export const schoolEvents: CalendarActivity[] = [
  { id: 'ev1', title: 'Matriculation Ceremony', date: '2026-09-12', time: '10:00', venue: 'Main Auditorium', type: 'Event' },
  { id: 'ev2', title: 'Departmental Meeting', date: '2026-09-15', time: '14:00', venue: 'Departmental Hall', type: 'Event' },
  { id: 'ev3', title: 'Sports Week Opening', date: '2026-09-26', time: '09:00', venue: 'Sports Complex', type: 'Event' },
  { id: 'ev4', title: 'Health Sciences Career Fair', date: '2026-09-19', time: '10:00', venue: 'Main Auditorium', type: 'Event' },
  { id: 'ev5', title: 'Dental and MLT Clinical Skills Workshop', date: '2026-09-24', time: '09:00', venue: 'Dental Laboratory', type: 'Event' },
];

/**
 * Projects the recurring weekly timetable onto real calendar dates within a window
 * around today, filtered to the signed-in student's department/level (plus General
 * Studies), so the calendar shows a realistic, personalized mixture of classes
 * alongside assignments, tests, examinations and academic events.
 */
function getClassActivities(daysBack = 21, daysForward = 120): CalendarActivity[] {
  const start = addDaysISO(todayISO(), -daysBack);
  const totalDays = daysBack + daysForward;
  const relevant = timetableEntries.filter(
    (e) => e.level === studentProfile.level && (e.department === studentProfile.department || e.department === 'General Studies')
  );

  const activities: CalendarActivity[] = [];
  for (let i = 0; i <= totalDays; i++) {
    const iso = addDaysISO(start, i);
    const dayName = dayNameForISO(iso);
    if (!dayName) continue; // weekend — no classes
    for (const entry of relevant) {
      if (entry.day !== dayName) continue;
      activities.push({
        id: `class-${entry.id}-${iso}`,
        title: `${entry.courseCode} — ${entry.courseTitle}`,
        date: iso,
        time: entry.startTime,
        venue: entry.venue,
        type: 'Class',
      });
    }
  }
  return activities;
}

export function getCalendarActivities(): CalendarActivity[] {
  const fromExams: CalendarActivity[] = exams.map((e) => ({
    id: `exam-${e.id}`,
    title: `${e.courseCode} Examination`,
    date: e.date,
    time: e.time,
    venue: e.venue,
    type: 'Exam',
  }));

  const fromReminders: CalendarActivity[] = reminders
    .filter((r) => !r.completed)
    .map((r) => ({
      id: `reminder-${r.id}`,
      title: r.title,
      date: r.date,
      time: r.time,
      type: r.type === 'Assignment' ? 'Assignment' : r.type === 'Class' ? 'Class' : r.type === 'Exam' ? 'Exam' : 'Reminder',
    }));

  const fromClasses = getClassActivities();

  return [...fromExams, ...fromReminders, ...schoolEvents, ...fromClasses];
}
