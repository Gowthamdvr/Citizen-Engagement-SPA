
import React, { useState, useEffect } from 'react';
import { Timer, Radio } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;
      
      // If the event started less than 3 hours ago, consider it "LIVE"
      if (difference <= 0 && difference > -(3 * 60 * 60 * 1000)) {
        setIsLive(true);
        setTimeLeft(null);
        return;
      }

      if (difference <= -(3 * 60 * 60 * 1000)) {
        setIsLive(false);
        setTimeLeft(null);
        return;
      }

      setIsLive(false);
      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isLive) {
    return (
      <div className="bg-red-600 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-black shadow-xl shadow-red-200 animate-pulse uppercase tracking-widest">
        <Radio size={14} />
        <span>Live Now</span>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-3 text-xs font-bold shadow-2xl shadow-blue-200 border border-white/20 backdrop-blur-md">
      <Timer size={14} className="text-blue-200" />
      <div className="flex items-center gap-1 font-mono">
        <span className="flex flex-col items-center">
          <span className="text-[10px] opacity-60 uppercase font-sans">Days</span>
          <span className="text-sm">{timeLeft.d}</span>
        </span>
        <span className="opacity-30 self-end mb-0.5">:</span>
        <span className="flex flex-col items-center">
          <span className="text-[10px] opacity-60 uppercase font-sans">Hrs</span>
          <span className="text-sm">{timeLeft.h.toString().padStart(2, '0')}</span>
        </span>
        <span className="opacity-30 self-end mb-0.5">:</span>
        <span className="flex flex-col items-center">
          <span className="text-[10px] opacity-60 uppercase font-sans">Min</span>
          <span className="text-sm">{timeLeft.m.toString().padStart(2, '0')}</span>
        </span>
        <span className="opacity-30 self-end mb-0.5">:</span>
        <span className="flex flex-col items-center w-6 text-blue-300">
          <span className="text-[10px] opacity-60 uppercase font-sans">Sec</span>
          <span className="text-sm">{timeLeft.s.toString().padStart(2, '0')}</span>
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
