import { Person, FamilyEvent } from '@/types';
import { getAllPeopleArray } from '@/data/familyData';

export interface CalendarEvent extends FamilyEvent {
  personName: string;
  month: number;
  day: number;
  year?: number;
}

/**
 * Get all events including birthdays, deaths, and custom events
 */
export function getAllEvents(): CalendarEvent[] {
  const people = getAllPeopleArray();
  const events: CalendarEvent[] = [];

  people.forEach(person => {
    // Add birthday events
    if (person.birthDate) {
      const date = parseDateString(person.birthDate);
      if (date) {
        events.push({
          id: `birthday-${person.id}`,
          personId: person.id,
          type: 'birthday',
          title: `${person.firstName}'s Birthday`,
          date: person.birthDate,
          personName: getFullName(person),
          month: date.month,
          day: date.day,
          year: date.year,
          isRecurring: true,
        });
      }
    }

    // Add death anniversary events
    if (person.deathDate) {
      const date = parseDateString(person.deathDate);
      if (date) {
        events.push({
          id: `death-${person.id}`,
          personId: person.id,
          type: 'death',
          title: `${person.firstName} - Death Anniversary`,
          date: person.deathDate,
          personName: getFullName(person),
          month: date.month,
          day: date.day,
          year: date.year,
          isRecurring: true,
        });
      }
    }

    // Add custom events
    if (person.events) {
      person.events.forEach(event => {
        const date = parseDateString(event.date);
        if (date) {
          events.push({
            ...event,
            personName: getFullName(person),
            month: date.month,
            day: date.day,
            year: date.year,
          });
        }
      });
    }
  });

  return events;
}

/**
 * Get events for a specific month/year
 */
export function getEventsForMonth(month: number, year: number): CalendarEvent[] {
  const allEvents = getAllEvents();
  
  return allEvents.filter(event => {
    // Recurring events (birthdays, anniversaries) match any year
    if (event.isRecurring) {
      return event.month === month;
    }
    // Non-recurring events must match exact month and year
    return event.month === month && event.year === year;
  });
}

/**
 * Get events for a specific day
 */
export function getEventsForDay(day: number, month: number, year: number): CalendarEvent[] {
  const allEvents = getAllEvents();
  
  return allEvents.filter(event => {
    if (event.isRecurring) {
      return event.month === month && event.day === day;
    }
    return event.month === month && event.day === day && event.year === year;
  });
}

/**
 * Get upcoming events (next N days)
 */
export function getUpcomingEvents(days: number = 30): CalendarEvent[] {
  const allEvents = getAllEvents();
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days);

  return allEvents
    .filter(event => {
      const eventDate = new Date(today.getFullYear(), event.month - 1, event.day);
      if (eventDate < today) {
        // For recurring events, check next year
        if (event.isRecurring) {
          eventDate.setFullYear(today.getFullYear() + 1);
        } else {
          return false;
        }
      }
      return eventDate <= futureDate;
    })
    .sort((a, b) => {
      const dateA = new Date(today.getFullYear(), a.month - 1, a.day);
      const dateB = new Date(today.getFullYear(), b.month - 1, b.day);
      if (dateA < today && a.isRecurring) dateA.setFullYear(today.getFullYear() + 1);
      if (dateB < today && b.isRecurring) dateB.setFullYear(today.getFullYear() + 1);
      return dateA.getTime() - dateB.getTime();
    });
}

/**
 * Parse date string (supports various formats)
 */
function parseDateString(dateStr: string): { day: number; month: number; year?: number } | null {
  // Try YYYY-MM-DD format
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return {
      year: parseInt(isoMatch[1]),
      month: parseInt(isoMatch[2]),
      day: parseInt(isoMatch[3]),
    };
  }

  // Try DD/MM/YYYY or DD-MM-YYYY
  const ddmmyyyyMatch = dateStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (ddmmyyyyMatch) {
    return {
      day: parseInt(ddmmyyyyMatch[1]),
      month: parseInt(ddmmyyyyMatch[2]),
      year: parseInt(ddmmyyyyMatch[3]),
    };
  }

  // Try MM/DD/YYYY
  const mmddyyyyMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mmddyyyyMatch) {
    return {
      month: parseInt(mmddyyyyMatch[1]),
      day: parseInt(mmddyyyyMatch[2]),
      year: parseInt(mmddyyyyMatch[3]),
    };
  }

  // Try just year
  const yearMatch = dateStr.match(/^(\d{4})$/);
  if (yearMatch) {
    return {
      year: parseInt(yearMatch[1]),
      month: 1,
      day: 1,
    };
  }

  return null;
}

function getFullName(person: Person): string {
  const parts = [person.firstName];
  if (person.nickname) parts.push(`"${person.nickname}"`);
  if (person.lastName) parts.push(person.lastName);
  return parts.join(' ');
}

/**
 * Get calendar grid for a month
 */
export function getCalendarGrid(month: number, year: number): (number | null)[][] {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  const grid: (number | null)[][] = [];
  let week: (number | null)[] = [];

  // Fill in the blanks before the first day
  for (let i = 0; i < startingDayOfWeek; i++) {
    week.push(null);
  }

  // Fill in the days
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }

  // Fill in the blanks after the last day
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    grid.push(week);
  }

  return grid;
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
