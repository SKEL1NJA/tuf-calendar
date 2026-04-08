"use client";

import { useState, useEffect } from "react";

const MONTHS = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const MONTH_IMAGES = [
  "/images/months/jan.png",
  "/images/months/feb.png",
  "/images/months/mar.png",
  "/images/months/apr.png",
  "/images/months/may.png",
  "/images/months/jun.png",
  "/images/months/jul.png",
  "/images/months/aug.png",
  "/images/months/sep.png",
  "/images/months/oct.png",
  "/images/months/nov.png",
  "/images/months/dec.png",
];

const HOLIDAYS = {
  "0-26": "Republic Day",
  "1-19": "Shivaji Jayanti",
  "2-25": "Holi",
  "3-14": "Dr. Ambedkar Jayanti",
  "3-18": "Good Friday",
  "4-1": "Labour Day",
  "7-15": "Independence Day",
  "7-26": "Janmashtami",
  "9-2": "Gandhi Jayanti",
  "9-20": "Dussehra",
  "10-1": "Diwali",
  "11-25": "Christmas",
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState({});
  const [imgLoaded, setImgLoaded] = useState(false);
  const [dark, setDark] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("calendar-notes");
    if (stored) setSavedNotes(JSON.parse(stored));

    const theme = localStorage.getItem("calendar-theme");
    if (theme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    const key = `${currentYear}-${currentMonth}`;
    setNotes(savedNotes[key] || "");
    setImgLoaded(false);
  }, [currentMonth, currentYear, savedNotes]);

  const saveNote = () => {
    const key = `${currentYear}-${currentMonth}`;
    const updated = { ...savedNotes, [key]: notes };
    setSavedNotes(updated);
    localStorage.setItem("calendar-notes", JSON.stringify(updated));
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const toggleTheme = () => {
    setDark(d => {
      localStorage.setItem("calendar-theme", !d ? "dark" : "light");
      return !d;
    });
  };

  const getHoliday = (day) => HOLIDAYS[`${currentMonth}-${day}`];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else setCurrentMonth(m => m - 1);

    setStartDate(null);
    setEndDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else setCurrentMonth(m => m + 1);

    setStartDate(null);
    setEndDate(null);
  };

  const handleDayClick = (day) => {
    const clicked = new Date(currentYear, currentMonth, day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
    } else {
      if (clicked < startDate) {
        setStartDate(clicked);
        setEndDate(null);
      } else setEndDate(clicked);
    }
  };

  const isStart = (day) =>
    startDate &&
    new Date(currentYear, currentMonth, day).toDateString() === startDate.toDateString();

  const isEnd = (day) =>
    endDate &&
    new Date(currentYear, currentMonth, day).toDateString() === endDate.toDateString();

  const isInRange = (day) => {
    const d = new Date(currentYear, currentMonth, day);
    const end = endDate || hoverDate;
    if (!startDate || !end) return false;
    return d > startDate && d < end;
  };

  const isToday = (day) =>
    new Date(currentYear, currentMonth, day).toDateString() === today.toDateString();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const rangeText = startDate
    ? endDate
      ? `${startDate.toLocaleDateString()} → ${endDate.toLocaleDateString()}`
      : `From ${startDate.toLocaleDateString()}`
    : "Click a day to start";

  return (
    <div className={`w-full max-w-5xl mx-auto rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col transition-colors duration-300 ${dark ? "bg-gray-900" : "bg-white"}`}>

      {/* HEADER */}
      <div className="relative w-full h-60 md:h-80 overflow-hidden">

        <img
          key={currentMonth}
          src={MONTH_IMAGES[currentMonth]}
          alt={MONTHS[currentMonth]}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute top-0 left-0 right-0 flex justify-around items-center px-6 h-6 bg-black/30">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={`ring-${i}`} className="w-3.5 h-3.5 rounded-full border-2 border-white/80 bg-white/40" />
          ))}
        </div>

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          className="absolute top-1 right-4 z-20 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 rounded-full w-9 h-9 flex items-center justify-center shadow-sm transition-all duration-200"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="absolute bottom-5 right-5 text-right text-white">
          <div className="text-[10px] tracking-widest opacity-70">
            {currentYear}
          </div>
          <div className="text-2xl md:text-3xl font-bold leading-none">
            {MONTHS[currentMonth].toUpperCase()}
          </div>
        </div>

        <button onClick={prevMonth}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-9 h-9 flex items-center justify-center">
          ‹
        </button>

        <button onClick={nextMonth}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-9 h-9 flex items-center justify-center">
          ›
        </button>
      </div>

      {/* BODY */}
      <div className="flex flex-col md:flex-row">

        {/* NOTES */}
        <div className={`md:w-56 p-4 flex flex-col gap-3 ${dark ? "bg-gray-800" : "bg-white/70 backdrop-blur-md shadow-inner"}`}>
          <h3 className="text-xs font-bold text-gray-400 uppercase">Notes</h3>
          <div className="text-xs text-blue-500 bg-blue-50 rounded px-2 py-1">{rangeText}</div>

          <textarea
            className={`flex-1 min-h-24 text-sm border rounded-xl p-3 outline-none ${
              dark
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-gray-800 border-gray-200"
            }`}
            placeholder={`Notes for ${MONTHS[currentMonth]}...`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            onClick={saveNote}
            className={`text-white text-xs py-2 rounded-xl ${noteSaved ? "bg-green-500" : "bg-blue-600"}`}>
            {noteSaved ? "Saved! ✓" : "Save Note"}
          </button>
        </div>

        {/* CALENDAR */}
        <div
          className={`
            flex-1 p-6 rounded-2xl backdrop-blur-md transition-colors duration-300
            ${dark ? "bg-gray-800/80 text-white" : "bg-white/70 text-black"}
          `}
        >
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div
                key={`day-${d}`}
                className={`text-center text-xs font-semibold ${
                  d === "Sun" || d === "Sat"
                    ? "text-blue-500"
                    : dark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="h-11" />;
              }

              const uniqueKey = `${currentYear}-${currentMonth}-${day}`;

              return (
                <div
                  key={uniqueKey}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => {
                    if (!endDate && startDate)
                      setHoverDate(new Date(currentYear, currentMonth, day));
                    const h = getHoliday(day);
                    if (h) setTooltip({ day, name: h });
                  }}
                  onMouseLeave={() => {
                    setHoverDate(null);
                    setTooltip(null);
                  }}
                  className={`relative h-11 flex items-center justify-center text-sm cursor-pointer transition-all
                    ${isStart(day) ? "bg-blue-600 text-white rounded-l-full" : ""}
                    ${isEnd(day) ? "bg-blue-600 text-white rounded-r-full" : ""}
                    ${isInRange(day) ? "bg-blue-100 text-blue-700" : ""}
                    ${!isStart(day) && !isEnd(day) && !isInRange(day) ? `rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100/80"}` : ""}
                    ${isToday(day) && !isStart(day) && !isEnd(day) ? "ring-2 ring-blue-500 font-bold rounded-full" : ""}
                  `}
                >
                  {day}

                  {getHoliday(day) && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  )}

                  {tooltip?.day === day && (
                    <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded">
                      🎉 {getHoliday(day)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}