'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, User } from 'lucide-react';
import { 
  getCalendarGrid, 
  getEventsForMonth, 
  getUpcomingEvents,
  MONTH_NAMES,
  DAY_NAMES,
  CalendarEvent 
} from '@/utils/calendarUtils';
import { getPersonById, getPersonDisplayName } from '@/data/familyData';

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null);

  const calendarGrid = getCalendarGrid(currentMonth, currentYear);
  const monthEvents = getEventsForMonth(currentMonth, currentYear);
  const upcomingEvents = getUpcomingEvents(30);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const getEventsForDay = (day: number | null): CalendarEvent[] => {
    if (!day) return [];
    return monthEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day;
    });
  };

  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-amber-50/30 to-sage-50/20 dark:from-earth-900 dark:via-earth-800 dark:to-earth-900">
      
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-earth-900 dark:text-earth-100 mb-2 flex items-center gap-3">
              <CalendarDays className="w-8 h-8 text-amber-500" />
              Family Calendar
            </h1>
            <p className="text-earth-600 dark:text-earth-400">
              Birthdays, anniversaries, and important family events
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Grid */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-earth-800 rounded-2xl shadow-lg p-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToToday}
                      className="px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                    >
                      Today
                    </button>
                    <button
                      onClick={goToPreviousMonth}
                      className="p-2 hover:bg-earth-100 dark:hover:bg-earth-700 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-earth-600 dark:text-earth-400" />
                    </button>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 hover:bg-earth-100 dark:hover:bg-earth-700 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-earth-600 dark:text-earth-400" />
                    </button>
                  </div>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAY_NAMES.map(day => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-earth-500 dark:text-earth-400 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarGrid.map((week, weekIndex) =>
                    week.map((day, dayIndex) => {
                      const dayEvents = getEventsForDay(day);
                      const isTodayDate = isToday(day);
                      
                      return (
                        <button
                          key={`${weekIndex}-${dayIndex}`}
                          onClick={() => day && setSelectedDate({ day, month: currentMonth, year: currentYear })}
                          disabled={!day}
                          className={`
                            aspect-square p-1 sm:p-2 rounded-lg text-sm relative
                            ${!day ? 'invisible' : ''}
                            ${isTodayDate 
                              ? 'bg-amber-500 text-white font-bold' 
                              : dayEvents.length > 0
                                ? 'bg-sage-100 dark:bg-sage-900/30 text-earth-900 dark:text-earth-100 font-medium hover:bg-sage-200 dark:hover:bg-sage-800/50'
                                : 'hover:bg-earth-100 dark:hover:bg-earth-700 text-earth-700 dark:text-earth-300'
                            }
                            transition-colors
                          `}
                        >
                          <span className="block text-center">{day}</span>
                          {dayEvents.length > 0 && (
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                              {dayEvents.slice(0, 3).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-1 rounded-full ${
                                    isTodayDate ? 'bg-white' : 'bg-amber-500'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Selected Date Events */}
                {selectedDate && (
                  <div className="mt-6 pt-6 border-t border-earth-200 dark:border-earth-700">
                    <h3 className="font-semibold text-earth-900 dark:text-earth-100 mb-3">
                      Events on {selectedDate.day} {MONTH_NAMES[selectedDate.month]} {selectedDate.year}
                    </h3>
                    {getEventsForDay(selectedDate.day).length > 0 ? (
                      <div className="space-y-2">
                        {getEventsForDay(selectedDate.day).map((event, index) => {
                          const person = getPersonById(event.personId);
                          return (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-lg bg-earth-50 dark:bg-earth-700"
                            >
                              <User className="w-4 h-4 text-amber-500 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-earth-900 dark:text-earth-100">
                                  {event.title}
                                </p>
                                <p className="text-xs text-earth-600 dark:text-earth-400">
                                  {person ? getPersonDisplayName(person) : 'Unknown'}
                                </p>
                                {event.description && (
                                  <p className="text-xs text-earth-500 dark:text-earth-400 mt-1">
                                    {event.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-earth-500 dark:text-earth-400">No events on this date</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Events Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-earth-800 rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-earth-900 dark:text-earth-100 mb-4">
                  Upcoming Events
                </h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, index) => {
                      const person = getPersonById(event.personId);
                      const eventDate = new Date(event.date);
                      const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <div
                          key={index}
                          className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-sage-50 dark:from-earth-700 dark:to-earth-700 border border-amber-200/50 dark:border-earth-600"
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <User className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
                            <p className="text-sm font-medium text-earth-900 dark:text-earth-100 flex-1">
                              {event.title}
                            </p>
                          </div>
                          <p className="text-xs text-earth-600 dark:text-earth-400 ml-5">
                            {person ? getPersonDisplayName(person) : 'Unknown'}
                          </p>
                          <p className="text-xs text-amber-600 dark:text-amber-400 ml-5 mt-1">
                            {eventDate.getDate()} {MONTH_NAMES[eventDate.getMonth()]} {eventDate.getFullYear()}
                            {daysUntil === 0 && ' • Today'}
                            {daysUntil === 1 && ' • Tomorrow'}
                            {daysUntil > 1 && ` • In ${daysUntil} days`}
                          </p>
                          {event.description && (
                            <p className="text-xs text-earth-500 dark:text-earth-400 ml-5 mt-1">
                              {event.description}
                            </p>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-earth-500 dark:text-earth-400">No upcoming events in the next 30 days</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
