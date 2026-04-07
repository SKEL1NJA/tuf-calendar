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

  useEffect(() => {
    const stored = localStorage.getItem("calendar-notes");
    if (stored) setSavedNotes(JSON.parse(stored));
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
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setStartDate(null); setEndDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setStartDate(null); setEndDate(null);
  };

  const handleDayClick = (day) => {
    const clicked = new Date(currentYear, currentMonth, day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked); setEndDate(null);
    } else {
      if (clicked < startDate) { setStartDate(clicked); setEndDate(null); }
      else setEndDate(clicked);
    }
  };

  const isStart = (day) => {
    if (!startDate) return false;
    return new Date(currentYear, currentMonth, day).toDateString() === startDate.toDateString();
  };

  const isEnd = (day) => {
    if (!endDate) return false;
    return new Date(currentYear, currentMonth, day).toDateString() === endDate.toDateString();
  };

  const isInRange = (day) => {
    const d = new Date(currentYear, currentMonth, day);
    const end = endDate || hoverDate;
    if (!startDate || !end) return false;
    return d > startDate && d < end;
  };

  const isToday = (day) => {
    return new Date(currentYear, currentMonth, day).toDateString() === today.toDateString();
  };

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
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
      
      <div className="relative w-full h-60 md:h-80 flex-shrink-0 bg-gray-200 overflow-hidden">
        <img
          key={currentMonth}
          src={MONTH_IMAGES[currentMonth]}
          alt={MONTHS[currentMonth]}
          onLoad={() => setImgLoaded(true)}
          className={`
            w-full h-full object-cover object-center
            transition-all duration-700
            ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-0" />

        <div className="absolute top-0 left-0 right-0 flex justify-around items-center px-6 h-6 bg-black/30 z-10">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full border-2 border-white/80 bg-white/40" />
          ))}
        </div>

        <div className="absolute bottom-4 right-4 z-10 text-right">
          <div className="text-[10px] tracking-widest text-white/70">
            {currentYear}
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {MONTHS[currentMonth].toUpperCase()}
          </div>
        </div>

        <button onClick={prevMonth}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow font-bold text-lg transition">
          ‹
        </button>

        <button onClick={nextMonth}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow font-bold text-lg transition">
          ›
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-2">

        <div className="md:w-56 flex-shrink-0 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-4 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Notes</h3>
          <div className="text-xs text-blue-500 bg-blue-50 rounded-lg px-2 py-1 leading-tight">{rangeText}</div>
          <textarea
            className="flex-1 min-h-24 resize-none text-sm text-gray-700 bg-white border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`Notes for ${MONTHS[currentMonth]}...`}
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
          <button
            onClick={saveNote}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition">
            Save Note ✓
          </button>
        </div>

        <div className="flex-1 p-5 overflow-auto">
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className={`text-center text-xs font-semibold py-1 ${d === "Sun" || d === "Sat" ? "text-blue-500" : "text-gray-400"}`}>
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} className="h-11" />;
              const start = isStart(day);
              const end = isEnd(day);
              const inRange = isInRange(day);
              const tod = isToday(day);

              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => !endDate && startDate && setHoverDate(new Date(currentYear, currentMonth, day))}
                  onMouseLeave={() => setHoverDate(null)}
                  className={`
                    h-11 flex items-center justify-center text-sm font-medium cursor-pointer select-none transition-all
                    ${start ? "bg-blue-600 text-white rounded-l-full" : ""}
                    ${end ? "bg-blue-600 text-white rounded-r-full" : ""}
                    ${inRange ? "bg-blue-100 text-blue-700" : ""}
                    ${!start && !end && !inRange ? "hover:bg-gray-100 rounded-full" : ""}
                    ${tod && !start && !end ? "ring-2 ring-blue-500 rounded-full font-bold" : ""}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}