import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  MessageSquareText, Settings, AlertCircle,
} from 'lucide-react';
import Icon from '../Icon';
import Slider from '../Slider';
import Popover from '../Popover';
import Spin from '../Spin';
import { useLocale } from '../ConfigProvider/useConfig';
import DanmakuLayer from './DanmakuLayer';
import type { DanmakuItem, DanmakuConfig, DanmakuRegion, DanmakuSpeed, DanmakuLayerRef } from './DanmakuLayer';
import './index.less';

// ─── Types ───

export interface VideoSource {
  label: string;
  src: string;
  default?: boolean;
}

export interface VideoPlayerProps {
  src?: string;
  sources?: VideoSource[];
  poster?: string;
  width?: number | string;
  height?: number | string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  fit?: 'contain' | 'cover' | 'fill';
  borderRadius?: number | string;
  danmaku?: DanmakuItem[];
  defaultDanmakuVisible?: boolean;
  onDanmakuLike?: (item: DanmakuItem) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onQualityChange?: (source: VideoSource) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  sendDanmaku: (item: DanmakuItem) => void;
  getVideoElement: () => HTMLVideoElement | null;
}
// ─── Helpers ───

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const P = 'aero-video-player';

// ─── Component ───

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(({
  src,
  sources,
  poster,
  width,
  height,
  autoPlay = false,
  loop = false,
  muted: mutedProp = false,
  fit = 'contain',
  borderRadius,
  danmaku,
  defaultDanmakuVisible = true,
  onDanmakuLike,
  onPlay,
  onPause,
  onEnded,
  onError,
  onTimeUpdate,
  onQualityChange,
  className,
  style,
}, ref) => {
  const locale = useLocale('VideoPlayer');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const danmakuRef = useRef<DanmakuLayerRef>(null);
  const hideTimerRef = useRef<number>(0);

  // ─── State ───
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(mutedProp ? 0 : 1);
  const [muted, setMuted] = useState(mutedProp);
  const [rate, setRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPoster, setShowPoster] = useState(!!poster);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [seeking, setSeeking] = useState(false);

  // 清晰度
  const resolvedSources = sources || (src ? [{ label: '', src }] : []);
  const defaultSource = resolvedSources.find(s => s.default) || resolvedSources[0];
  const [activeSource, setActiveSource] = useState<VideoSource | undefined>(defaultSource);
  const hasQuality = (sources?.length ?? 0) > 1;

  // 弹幕配置
  const [dmConfig, setDmConfig] = useState<DanmakuConfig>({
    visible: defaultDanmakuVisible,
    regions: ['top', 'middle', 'bottom'] as DanmakuRegion[],
    opacity: 1,
    speed: 'normal' as DanmakuSpeed,
  });
  // ─── Ref API ───
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
    seek: (t: number) => { if (videoRef.current) videoRef.current.currentTime = t; },
    sendDanmaku: (item: DanmakuItem) => danmakuRef.current?.send(item),
    getVideoElement: () => videoRef.current,
  }));

  // ─── Video event handlers ───
  const handlePlay = () => { setPlaying(true); setShowPoster(false); onPlay?.(); };
  const handlePause = () => { setPlaying(false); onPause?.(); };
  const handleEnded = () => { setPlaying(false); onEnded?.(); };
  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
    setLoading(false);
  };
  const handleTimeUpdate = () => {
    if (seeking) return;
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    onTimeUpdate?.(v.currentTime, v.duration);
    // buffered
    if (v.buffered.length > 0) {
      setBuffered(v.buffered.end(v.buffered.length - 1));
    }
  };
  const handleWaiting = () => setLoading(true);
  const handleCanPlay = () => setLoading(false);
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setError(true);
    setLoading(false);
    onError?.(e);
  };

  // ─── Controls ───
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  }, []);

  const handleVolumeChange = useCallback((val: number | [number, number]) => {
    const v = videoRef.current;
    if (!v) return;
    const n = val as number;
    v.volume = n;
    v.muted = n === 0;
    setVolume(n);
    setMuted(n === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (muted) {
      v.muted = false;
      v.volume = volume || 0.5;
      setMuted(false);
      if (!volume) setVolume(0.5);
    } else {
      v.muted = true;
      setMuted(true);
    }
  }, [muted, volume]);

  const handleRateChange = useCallback((r: number) => {
    if (videoRef.current) videoRef.current.playbackRate = r;
    setRate(r);
  }, []);
  // ─── Quality switch ───
  const handleQualityChange = useCallback((source: VideoSource) => {
    const v = videoRef.current;
    if (!v || source.src === activeSource?.src) return;
    const wasPlaying = !v.paused;
    const time = v.currentTime;
    setActiveSource(source);
    setLoading(true);
    // src 变更后 video 会自动 load
    v.src = source.src;
    v.addEventListener('loadedmetadata', () => {
      v.currentTime = time;
      if (wasPlaying) v.play();
    }, { once: true });
    onQualityChange?.(source);
  }, [activeSource, onQualityChange]);

  // ─── Fullscreen ───
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // ─── Progress seek ───
  const handleSeek = useCallback((val: number | [number, number]) => {
    const v = videoRef.current;
    if (!v) return;
    const t = val as number;
    v.currentTime = t;
    setCurrentTime(t);
  }, []);

  // ─── Controls auto-hide ───
  const showControls = useCallback(() => {
    setControlsVisible(true);
    clearTimeout(hideTimerRef.current);
    if (playing) {
      hideTimerRef.current = window.setTimeout(() => setControlsVisible(false), 2500);
    }
  }, [playing]);

  useEffect(() => {
    if (!playing) {
      clearTimeout(hideTimerRef.current);
      setControlsVisible(true);
    } else {
      showControls();
    }
  }, [playing, showControls]);

  // ─── Poster click ───
  const handlePosterClick = useCallback(() => {
    setShowPoster(false);
    videoRef.current?.play();
  }, []);

  // ─── Danmaku config helpers ───
  const toggleDmRegion = useCallback((region: DanmakuRegion) => {
    setDmConfig(prev => {
      const has = prev.regions.includes(region);
      const next = has ? prev.regions.filter(r => r !== region) : [...prev.regions, region];
      return { ...prev, regions: next.length ? next : prev.regions }; // 至少保留一个
    });
  }, []);
  // ─── Render ───
  const cls = [P, className].filter(Boolean).join(' ');
  const wrapStyle: React.CSSProperties = {
    width, height,
    borderRadius: borderRadius ?? undefined,
    ...style,
  };

  const videoSrc = activeSource?.src || src || '';

  return (
    <div
      ref={containerRef}
      className={cls}
      style={wrapStyle}
      onMouseMove={showControls}
      onMouseLeave={() => playing && setControlsVisible(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        style={{ objectFit: fit }}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onClick={togglePlay}
      />

      {/* Poster */}
      {showPoster && poster && (
        <div
          className={`${P}-poster`}
          style={{ backgroundImage: `url(${poster})` }}
          onClick={handlePosterClick}
        />
      )}

      {/* Big play button */}
      <div
        className={`${P}-play-overlay${!playing && !showPoster ? ` ${P}-play-overlay--visible` : ''}`}
        onClick={togglePlay}
      >
        <button type="button" className={`${P}-play-btn`}>
          <Icon icon={Play} size={28} />
        </button>
      </div>

      {/* Loading */}
      {loading && !error && (
        <div className={`${P}-loading`}>
          <Spin spinning size="large" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className={`${P}-error`}>
          <Icon icon={AlertCircle} size={32} />
          <span>{locale?.loadError || 'Failed to load video'}</span>
        </div>
      )}

      {/* Danmaku layer */}
      {danmaku && (
        <DanmakuLayer
          ref={danmakuRef}
          danmaku={danmaku}
          config={dmConfig}
          currentTime={currentTime}
          playing={playing}
          onLike={onDanmakuLike}
        />
      )}
      {/* Controls */}
      <div className={`${P}-controls${controlsVisible ? ` ${P}-controls--visible` : ''}`}>
        {/* Progress bar */}
        <div className={`${P}-progress`} style={{ position: 'relative' }}>
          {/* Buffered bar */}
          <div className={`${P}-buffered`} style={{ width: duration ? `${(buffered / duration) * 100}%` : 0 }} />
          <Slider
            min={0}
            max={duration || 1}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            tipFormatter={v => formatTime(v)}
            tooltipVisible
            animated={false}
          />
        </div>

        {/* Button bar */}
        <div className={`${P}-bar`}>
          <div className={`${P}-bar-left`}>
            {/* Play/Pause */}
            <button type="button" className={`${P}-btn`} onClick={togglePlay} title={playing ? locale?.pause : locale?.play}>
              <Icon icon={playing ? Pause : Play} size={18} />
            </button>

            {/* Time */}
            <span className={`${P}-time`}>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>

          <div className={`${P}-bar-right`}>
            {/* Volume */}
            <div className={`${P}-volume`}>
              <button type="button" className={`${P}-btn`} onClick={toggleMute} title={muted ? locale?.unmute : locale?.mute}>
                <Icon icon={muted ? VolumeX : Volume2} size={16} />
              </button>
              <Slider min={0} max={1} step={0.01} value={muted ? 0 : volume} onChange={handleVolumeChange} tipFormatter={null} animated={false} />
            </div>

            {/* Danmaku toggle */}
            {danmaku && (
              <Popover
                trigger="click"
                placement="top"
                raw
                content={
                  <div className={`${P}-danmaku-settings`}>
                    <div className={`${P}-danmaku-row`}>
                      <span className={`${P}-danmaku-row-label`}>{locale?.danmaku}</span>
                      <button
                        type="button"
                        className={`${P}-danmaku-region-btn${dmConfig.visible ? ` ${P}-danmaku-region-btn--active` : ''}`}
                        onClick={() => setDmConfig(prev => ({ ...prev, visible: !prev.visible }))}
                      >
                        {dmConfig.visible ? 'ON' : 'OFF'}
                      </button>
                    </div>
                    <div className={`${P}-danmaku-row`}>
                      <span className={`${P}-danmaku-row-label`}>{locale?.region}</span>
                      <div className={`${P}-danmaku-regions`}>
                        {(['top', 'middle', 'bottom'] as DanmakuRegion[]).map(r => (
                          <button
                            key={r}
                            type="button"
                            className={`${P}-danmaku-region-btn${dmConfig.regions.includes(r) ? ` ${P}-danmaku-region-btn--active` : ''}`}
                            onClick={() => toggleDmRegion(r)}
                          >
                            {locale?.[r === 'top' ? 'regionTop' : r === 'middle' ? 'regionMiddle' : 'regionBottom']}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={`${P}-danmaku-row`}>
                      <span className={`${P}-danmaku-row-label`}>{locale?.opacity}</span>
                      <Slider min={0.3} max={1} step={0.1} value={dmConfig.opacity} onChange={v => setDmConfig(prev => ({ ...prev, opacity: v as number }))} tipFormatter={null} animated={false} />
                    </div>
                    <div className={`${P}-danmaku-row`}>
                      <span className={`${P}-danmaku-row-label`}>{locale?.danmakuSpeed}</span>
                      <div className={`${P}-danmaku-regions`}>
                        {(['slow', 'normal', 'fast'] as DanmakuSpeed[]).map(s => (
                          <button
                            key={s}
                            type="button"
                            className={`${P}-danmaku-region-btn${dmConfig.speed === s ? ` ${P}-danmaku-region-btn--active` : ''}`}
                            onClick={() => setDmConfig(prev => ({ ...prev, speed: s }))}
                          >
                            {locale?.[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              >
                <button type="button" className={`${P}-btn`} title={locale?.danmakuSettings}>
                  <Icon icon={Settings} size={16} />
                </button>
              </Popover>
            )}
            {/* Speed */}
            <Popover
              trigger="click"
              placement="top"
              raw
              content={
                <div className={`${P}-panel`}>
                  {RATES.map(r => (
                    <div
                      key={r}
                      className={`${P}-panel-item${r === rate ? ` ${P}-panel-item--active` : ''}`}
                      onClick={() => handleRateChange(r)}
                    >
                      {r === 1 ? locale?.normal || 'Normal' : `${r}x`}
                    </div>
                  ))}
                </div>
              }
            >
              <button type="button" className={`${P}-label-btn`}>
                {rate === 1 ? (locale?.speed || 'Speed') : `${rate}x`}
              </button>
            </Popover>

            {/* Quality */}
            {hasQuality && (
              <Popover
                trigger="click"
                placement="top"
                raw
                content={
                  <div className={`${P}-panel`}>
                    {sources!.map(s => (
                      <div
                        key={s.src}
                        className={`${P}-panel-item${s.src === activeSource?.src ? ` ${P}-panel-item--active` : ''}`}
                        onClick={() => handleQualityChange(s)}
                      >
                        {s.label}
                      </div>
                    ))}
                  </div>
                }
              >
                <button type="button" className={`${P}-label-btn`}>
                  {activeSource?.label || locale?.quality || 'Quality'}
                </button>
              </Popover>
            )}

            {/* Fullscreen */}
            <button type="button" className={`${P}-btn`} onClick={toggleFullscreen} title={isFullscreen ? locale?.exitFullscreen : locale?.fullscreen}>
              <Icon icon={isFullscreen ? Minimize : Maximize} size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export type { DanmakuItem, DanmakuConfig, DanmakuRegion, DanmakuSpeed, DanmakuLayerRef };

export default VideoPlayer;
