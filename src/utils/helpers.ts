interface UsernameInput {
  firstName: string;
  lastName: string;
  schoolName: string;
  gradYear?: number;
  mascot?: string;
}

export const AVATAR_COLORS = [
  '#2563EB',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EF4444',
  '#06B6D4',
  '#EC4899',
  '#0EA5E9',
  '#84CC16',
  '#F97316',
];

export function avatarColor(i: number): string {
  return AVATAR_COLORS[i % AVATAR_COLORS.length];
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const generateUsernames = (input: UsernameInput): string[] => {
  const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const fName = sanitize(input.firstName);
  const lName = sanitize(input.lastName);
  const school = sanitize(input.schoolName);

  const fInitial = fName.charAt(0);
  const lInitial = lName.charAt(0);

  const schoolWords = input.schoolName.split(/\s+/);
  const schoolAbbr = sanitize(
    schoolWords.length > 1
      ? schoolWords.map((word) => word.charAt(0)).join('')
      : input.schoolName.substring(0, 3),
  );

  const suggestions: string[] = [
    `${fInitial}${lName}${schoolAbbr}`,
    `${fName}.${lName}_${schoolAbbr}`,
    `${fInitial}${lName}_${school}`,
    `${fName}${lInitial}_${schoolAbbr}`,
  ];

  if (input.gradYear) {
    const shortYear = input.gradYear.toString().slice(-2);
    suggestions.push(`${fName}${lInitial}${shortYear}`);
    suggestions.push(`${fInitial}${lName}${shortYear}`);
  }

  if (input.mascot) {
    const mascotClean = sanitize(input.mascot);
    suggestions.push(`${mascotClean}${fInitial}${lName}`);
    suggestions.push(`${fName}${lName}${mascotClean}`);
  }

  return suggestions;
};

export const capitalize = (phrase: string) => {
  if (!phrase) return;
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
};

export const formatAmount = (amount: number, decimal: number, currency: string) => {
  if (amount === undefined) return;
  const value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimal,
    currencyDisplay: 'narrowSymbol',
  });
  return value.format(amount);
};

export const abbreviate = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

export const formatToStringDate = (date: number | string, hideDay: boolean = true) => {
  if (!date) return '';
  let datetime = '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let currentdate = new Date(date);
  if (hideDay) {
    datetime =
      currentdate.getDate() +
      ' ' +
      months[currentdate.getMonth()] +
      ', ' +
      currentdate.getFullYear();
  } else {
    datetime =
      days[currentdate.getDay()] +
      ', ' +
      currentdate.getDate() +
      ' ' +
      months[currentdate.getMonth()] +
      ' ' +
      currentdate.getFullYear();
  }

  return datetime;
};

export const getTimeOfDay = (date: Date = new Date()): string => {
  const hour = date.getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

export const getCurrentTime = (date: Date = new Date()): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
