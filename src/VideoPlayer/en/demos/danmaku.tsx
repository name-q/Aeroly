/**
 * title: " "
 * description: Pass danmaku data to enable bullet comments. Supports toggle, region selection, opacity and speed settings. Hover on danmaku to like.
 */
import React from 'react';
import { VideoPlayer, ConfigProvider } from 'aeroly';
import type { DanmakuItem } from 'aeroly';
import enUS from 'aeroly/locale/en_US';

const danmakuData: DanmakuItem[] = [
  { id: 1, time: 0.5, text: 'Here we go!', likes: 12 },
  { id: 2, time: 1, text: 'So cute!', color: '#ff6b6b', likes: 45 },
  { id: 3, time: 1.5, text: 'Beautiful scene', likes: 8 },
  { id: 4, time: 2, text: 'LOL', color: '#ffd93d', likes: 23 },
  { id: 5, time: 2.5, text: 'Epic moment incoming', likes: 67 },
  { id: 6, time: 3, text: 'Danmaku shield!', color: '#6bcb77', likes: 5 },
  { id: 7, time: 3, text: 'Amazing!', likes: 31 },
  { id: 8, time: 3.5, text: 'First time watching', likes: 2 },
  { id: 9, time: 4, text: 'Classic animation', color: '#4d96ff', likes: 89 },
  { id: 10, time: 4.5, text: 'Childhood memories', likes: 15 },
];

export default () => (
  <ConfigProvider locale={enUS}>
    <VideoPlayer
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      width="100%"
      height={360}
      danmaku={danmakuData}
      onDanmakuLike={(item) => console.log('Liked danmaku:', item)}
    />
  </ConfigProvider>
);
