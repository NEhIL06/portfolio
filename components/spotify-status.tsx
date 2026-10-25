"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export function SpotifyStatus() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-zinc-400 group">
      {/* Spotify Icon */}
      <svg
        className="w-4 h-4 text-[#1DB954] flex-shrink-0 animate-pulse"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>

      {/* Album thumbnail / play toggle */}
      <button
        onClick={togglePlay}
        className="relative w-5 h-5 rounded-sm overflow-hidden bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer"
        title={isPlaying ? "Pause preview" : "Play preview"}
        aria-label={isPlaying ? "Pause music preview" : "Play music preview"}
      >
        <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-700 flex items-center justify-center">
          {isPlaying ? (
            <Pause className="w-2.5 h-2.5 text-white" />
          ) : (
            <Play className="w-2.5 h-2.5 text-zinc-300 ml-0.5" />
          )}
        </div>
      </button>

      {/* Track details */}
      <span className="truncate max-w-[280px] sm:max-w-[420px]">
        <span className="text-zinc-500">last played </span>
        <strong className="font-medium text-zinc-200">Top Fella</strong>
        <span className="text-zinc-400"> by Karan Aujla, MXRCI</span>
      </span>

      {/* Equalizer animation when playing */}
      {isPlaying && (
        <span className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
          <span className="w-0.5 bg-[#1DB954] h-full animate-[bounce_1s_infinite_100ms]" />
          <span className="w-0.5 bg-[#1DB954] h-2/3 animate-[bounce_1s_infinite_300ms]" />
          <span className="w-0.5 bg-[#1DB954] h-4/5 animate-[bounce_1s_infinite_200ms]" />
        </span>
      )}

      {/* Hidden audio element for preview */}
      <audio
        ref={audioRef}
        src="/TOP%20FELLA%20(MUSIC%20VIDEO)%20KARAN%20AUJLA%20_%20MXRCI%20_%20Latest%20Punjabi%20Songs%202026.mp3"
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />
    </div>
  );
}
