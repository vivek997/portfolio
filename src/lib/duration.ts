export type CalendarDiff = { years: number; months: number; days: number };
export type ClockDiff = { days: number; hours: number; minutes: number; seconds: number };

/** Calendar-aware years/months/days between two dates (handles varying month lengths). */
export function calendarDiff(start: Date, end: Date): CalendarDiff {
  if (end.getTime() <= start.getTime()) return { years: 0, months: 0, days: 0 };

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

/** Raw elapsed time broken into days/hours/minutes/seconds. */
export function clockDiff(start: Date, end: Date): ClockDiff {
  let diff = Math.max(0, end.getTime() - start.getTime());
  const day = 86_400_000;
  const hour = 3_600_000;
  const minute = 60_000;

  const days = Math.floor(diff / day);
  diff -= days * day;
  const hours = Math.floor(diff / hour);
  diff -= hours * hour;
  const minutes = Math.floor(diff / minute);
  diff -= minutes * minute;
  const seconds = Math.floor(diff / 1000);

  return { days, hours, minutes, seconds };
}

/** e.g. "6 years 4 months", "8 months", "0 months" */
export function formatYearsMonths(start: Date, end: Date): string {
  const { years, months } = calendarDiff(start, end);
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0 || years === 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  return parts.join(" ");
}

/** e.g. "0y 6m", used in compact contexts like the terminal. */
export function formatYearsMonthsCompact(start: Date, end: Date): string {
  const { years, months } = calendarDiff(start, end);
  return `${years}y ${months}m`;
}

/** e.g. "201d 12h 51m 5s" */
export function formatClock(start: Date, end: Date): string {
  const { days, hours, minutes, seconds } = clockDiff(start, end);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
