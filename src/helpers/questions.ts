interface Answer {
  id: number;
  type: string;
  value: string; // or change this to the appropriate data type based on your answers
}

interface Question {
  id: number;
  type: string;
  text: string;
  isRequired: boolean;
  subTitle?: string;
  options?: string[];
  condition?(answers: Answer[]): boolean;
  maxSelect?: number;
  placeholder?: string;
  validation?: string;
  isLastQuestion?: boolean;
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'text',
    text: 'What is your first name?',
    isRequired: true,
  },
  {
    id: 2,
    type: 'text',
    text: 'What is your last name, {name}?',
    isRequired: true,
  },
  {
    id: 3,
    type: 'text',
    text: 'Would you like to add a phone number to your resume?',
    isRequired: true,
    subTitle: 'Only provided to employers you apply',
    placeholder: '089621 8845',
    validation: 'phone',
  },
  {
    id: 4,
    type: 'text',
    text: "Email you'd like to register with?",
    isRequired: true,
    subTitle:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
    placeholder: 'name@example.com',
    validation: 'email',
  },
  {
    id: 5,
    type: 'text',
    text: 'What is your current location or preferred work location?',
    isRequired: true,
    subTitle: 'Help us find jobs near your preferred location.',
    placeholder: 'City, State or Preferred Location',
  },
  {
    id: 6,
    type: 'text',
    text: 'What type of job are you looking for?',
    isRequired: true,
    subTitle: 'This helps match you with suitable job opportunities.',
    placeholder: 'e.g., full-time, part-time, remote, contract',
  },
  {
    id: 7,
    type: 'text',
    text: 'What is your preferred job title or position?',
    isRequired: true,
    subTitle: 'Let us know your desired role or position.',
    placeholder: 'Preferred Job Title or Position',
  },
  {
    id: 8,
    type: 'text',
    text: 'What industries are you interested in?',
    isRequired: true,
    subTitle: 'Tell us the industries you want to explore.',
    placeholder: 'Industries of Interest',
  },

  {
    id: 9,
    type: 'text',
    text: 'What is your field of study or area of expertise?',
    isRequired: true,
    subTitle: 'Tell us about your academic focus.',
    placeholder: 'Field of Study or Expertise',
  },
  {
    id: 10,
    type: 'number',
    text: 'How many years of relevant work experience do you have?',
    isRequired: true,
    subTitle: 'Please provide the number of years.',
    placeholder: 'Years of Work Experience',
  },
  {
    id: 11,
    type: 'text',
    text: "Can you list any certifications or special training you've completed?",
    isRequired: false,
    subTitle: 'If applicable, mention relevant certifications.',
    placeholder: 'Certifications or Special Training',
  },
  {
    id: 12,
    type: 'text',
    text: 'What are your key skills related to the job you are seeking?',
    isRequired: true,
    subTitle: 'List your main job-related skills.',
    placeholder: 'Key Job-related Skills',
  },
  {
    id: 13,
    type: 'text',
    text: 'Are there any specific software or tools you are proficient in?',
    isRequired: false,
    subTitle: 'Mention any software or tools you are skilled with.',
    placeholder: 'Software or Tools Proficiency',
  },
  {
    id: 14,
    type: 'text',
    text: 'When are you available to start a new job?',
    isRequired: true,
    subTitle: 'Let us know your potential start date.',
    placeholder: 'Availability to Start',
  },
  {
    id: 15,
    type: 'text',
    text: 'Is there anything else you would like to tell us about yourself or your job search?',
    isRequired: false,
    subTitle: 'Feel free to provide additional information.',
    placeholder: 'Additional Information',
    isLastQuestion: true,
  },
];
