import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";

export function MusicPlayer({
  src,
  title = "Our Wedding Song",
  autoStart = false,
}: {
  src: string;
  title?: string;
  autoStart?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const stored = sessionStorage.getItem("wedding-music");
    const shouldPlay = stored ? stored === "on" : autoStart;
    if (!shouldPlay) return;
    audioRef.current?.play().catch(console.error);
  }, [autoStart]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      sessionStorage.setItem("wedding-music", "off");
    } else {
      void audio.play();
      sessionStorage.setItem("wedding-music", "on");
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <audio 
        id="wedding-audio"
        ref={audioRef} 
        src={src} 
        loop 
        preload="auto" 
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="card-invite flex items-center gap-3 rounded-full py-2 pr-4 pl-2">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/60 text-[var(--cream)] transition-transform hover:scale-105"
          style={playing ? { animation: "slow-spin 8s linear infinite" } : undefined}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="hidden sm:block">
          <p className="font-display flex items-center gap-1 text-xs tracking-[0.2em] text-[var(--cream)] uppercase">
            <Music size={12} /> {title}
          </p>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            aria-label="Volume"
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mt-1 h-1 w-28 accent-[var(--blush)]"
          />
        </div>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute" : "Mute"}
          className="text-[var(--cream)]/80 transition-colors hover:text-[var(--blush)]"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}