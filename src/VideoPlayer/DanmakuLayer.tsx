import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { ThumbsUp } from 'lucide-react';
import Icon from '../Icon';

// ─── Types ───

export interface DanmakuItem {
  id: string | number;
  time: number;
  text: string;
  color?: string;
  image?: string;
  likes?: number;
}

export type DanmakuRegion = 'top' | 'middle' | 'bottom';
export type DanmakuSpeed = 'slow' | 'normal' | 'fast';

export interface DanmakuConfig {
  visible: boolean;
  regions: DanmakuRegion[];
  opacity: number;
  speed: DanmakuSpeed;
}

export interface DanmakuLayerRef {
  send: (item: DanmakuItem) => void;
  clear: () => void;
}

interface DanmakuLayerProps {
  danmaku: DanmakuItem[];
  config: DanmakuConfig;
  currentTime: number;
  playing: boolean;
  onLike?: (item: DanmakuItem) => void;
}

const SPEED_MAP: Record<DanmakuSpeed, number> = { slow: 10, normal: 7, fast: 4 };
const LINE_HEIGHT = 28; // px per track
const GAP = 8; // min gap between danmaku on same track

// 轨道状态：记录每条轨道最后一条弹幕的"右边缘进入屏幕"时间
interface TrackState {
  freeAt: number; // timestamp (ms) when track becomes free
}

const DanmakuLayer = React.forwardRef<DanmakuLayerRef, DanmakuLayerProps>(
  ({ danmaku, config, currentTime, playing, onLike }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const firedRef = useRef(new Set<string | number>()); // 已发射的弹幕 id
    const tracksRef = useRef<TrackState[]>([]);
    const runtimeRef = useRef<DanmakuItem[]>([]); // 运行时追加的弹幕

    // 暴露 ref
    useImperativeHandle(ref, () => ({
      send: (item: DanmakuItem) => {
        runtimeRef.current.push(item);
      },
      clear: () => {
        firedRef.current.clear();
        runtimeRef.current = [];
        if (containerRef.current) containerRef.current.innerHTML = '';
      },
    }));

    // 计算可用轨道数和区域映射
    const getAvailableTracks = useCallback(() => {
      const el = containerRef.current;
      if (!el) return [];
      const h = el.clientHeight;
      const totalTracks = Math.floor(h / LINE_HEIGHT);
      const third = Math.ceil(totalTracks / 3);

      const tracks: number[] = [];
      if (config.regions.includes('top')) {
        for (let i = 0; i < third && i < totalTracks; i++) tracks.push(i);
      }
      if (config.regions.includes('middle')) {
        for (let i = third; i < third * 2 && i < totalTracks; i++) tracks.push(i);
      }
      if (config.regions.includes('bottom')) {
        for (let i = third * 2; i < totalTracks; i++) tracks.push(i);
      }
      return tracks;
    }, [config.regions]);

    // 分配轨道：找最早空闲的
    const allocateTrack = useCallback((availTracks: number[]): number | null => {
      const now = performance.now();
      // 确保 tracksRef 足够长
      while (tracksRef.current.length < 100) {
        tracksRef.current.push({ freeAt: 0 });
      }
      let best: number | null = null;
      let bestTime = Infinity;
      for (const t of availTracks) {
        const state = tracksRef.current[t];
        if (state.freeAt <= now) return t; // 立即可用
        if (state.freeAt < bestTime) {
          bestTime = state.freeAt;
          best = t;
        }
      }
      // 所有轨道都被占用 → 返回 null（丢弃）
      return null;
    }, []);
/* APPEND_DL_1 */

    // 发射一条弹幕到 DOM
    const fireDanmaku = useCallback((item: DanmakuItem, trackIndex: number) => {
      const el = containerRef.current;
      if (!el) return;
      const containerWidth = el.clientWidth;
      const duration = SPEED_MAP[config.speed];

      // 创建弹幕元素
      const span = document.createElement('span');
      span.className = 'aero-video-player-danmaku-item';
      span.style.top = `${trackIndex * LINE_HEIGHT}px`;
      span.style.left = `${containerWidth}px`;
      span.style.color = item.color || '#fff';
      span.style.opacity = String(config.opacity);
      span.style.animationDuration = `${duration}s`;

      // 文本 + 图片
      let html = '';
      if (item.image) html += `<img src="${item.image}" alt="" />`;
      html += item.text.replace(/</g, '&lt;');

      // 点赞按钮
      if (onLike) {
        html += `<button class="aero-video-player-danmaku-like" data-danmaku-id="${item.id}">` +
          `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>` +
          `${item.likes ?? 0}</button>`;
      }
      span.innerHTML = html;

      // 计算滚动距离（需要弹幕完全离开左侧）
      // 先插入 DOM 测量宽度
      el.appendChild(span);
      const spanWidth = span.offsetWidth;
      const distance = -(containerWidth + spanWidth);
      span.style.setProperty('--danmaku-distance', `${distance}px`);

      // 更新轨道占用时间：弹幕右边缘进入屏幕的时间
      const enterDuration = (spanWidth + GAP) / (containerWidth + spanWidth) * duration * 1000;
      tracksRef.current[trackIndex].freeAt = performance.now() + enterDuration;

      // 动画结束后移除
      span.addEventListener('animationend', () => span.remove());
    }, [config.speed, config.opacity, onLike]);

    // 点赞事件代理
    useEffect(() => {
      const el = containerRef.current;
      if (!el || !onLike) return;
      const handleClick = (e: MouseEvent) => {
        const btn = (e.target as HTMLElement).closest('.aero-video-player-danmaku-like') as HTMLElement;
        if (!btn) return;
        const id = btn.dataset.danmakuId;
        const allItems = [...danmaku, ...runtimeRef.current];
        const item = allItems.find(d => String(d.id) === id);
        if (item) onLike(item);
      };
      el.addEventListener('click', handleClick);
      return () => el.removeEventListener('click', handleClick);
    }, [danmaku, onLike]);
/* APPEND_DL_2 */

    // 主调度：根据 currentTime 发射弹幕
    useEffect(() => {
      if (!config.visible || !playing) return;

      const allItems = [...danmaku, ...runtimeRef.current];
      // 筛选当前时间窗口内未发射的弹幕
      const pending = allItems
        .filter(d => !firedRef.current.has(d.id) && d.time >= currentTime - 0.3 && d.time <= currentTime + 0.3)
        .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)); // 高赞优先

      if (pending.length === 0) return;

      const availTracks = getAvailableTracks();
      if (availTracks.length === 0) return;

      for (const item of pending) {
        const track = allocateTrack(availTracks);
        if (track === null) break; // 密度已满
        firedRef.current.add(item.id);
        fireDanmaku(item, track);
      }
    }, [currentTime, config.visible, playing, danmaku, getAvailableTracks, allocateTrack, fireDanmaku]);

    // seek 时重置已发射记录
    const prevTimeRef = useRef(currentTime);
    useEffect(() => {
      if (Math.abs(currentTime - prevTimeRef.current) > 2) {
        // 大幅跳跃 = seek
        firedRef.current.clear();
        if (containerRef.current) containerRef.current.innerHTML = '';
      }
      prevTimeRef.current = currentTime;
    }, [currentTime]);

    // 暂停时暂停所有弹幕动画
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const items = el.querySelectorAll('.aero-video-player-danmaku-item') as NodeListOf<HTMLElement>;
      items.forEach(item => {
        item.style.animationPlayState = playing ? 'running' : 'paused';
      });
    }, [playing]);

    if (!config.visible) return null;

    return (
      <div
        ref={containerRef}
        className="aero-video-player-danmaku"
        style={{ opacity: config.opacity }}
      />
    );
  },
);

DanmakuLayer.displayName = 'DanmakuLayer';

export default DanmakuLayer;
