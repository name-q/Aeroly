/**
 * title: " "
 * description: 传入弹幕数据，支持弹幕开关、区域选择、透明度和速度设置。鼠标移入弹幕可点赞。
 */
import React from 'react';
import { VideoPlayer } from 'aeroly';
import type { DanmakuItem } from 'aeroly';

const danmakuData: DanmakuItem[] = [
  { id: 1, time: 0.5, text: '开始了！', likes: 12 },
  { id: 2, time: 1, text: '好可爱的兔子', color: '#ff6b6b', likes: 45 },
  { id: 3, time: 1.5, text: '画面好美', likes: 8 },
  { id: 4, time: 2, text: '哈哈哈哈', color: '#ffd93d', likes: 23 },
  { id: 5, time: 2.5, text: '前方高能', likes: 67 },
  { id: 6, time: 3, text: '弹幕护体', color: '#6bcb77', likes: 5 },
  { id: 7, time: 3, text: '太好看了吧', likes: 31 },
  { id: 8, time: 3.5, text: '第一次看', likes: 2 },
  { id: 9, time: 4, text: '经典动画', color: '#4d96ff', likes: 89 },
  { id: 10, time: 4.5, text: '童年回忆', likes: 15 },
];

export default () => (
  <VideoPlayer
    src="https://www.w3schools.com/html/mov_bbb.mp4"
    width="100%"
    height={360}
    danmaku={danmakuData}
    onDanmakuLike={(item) => console.log('点赞弹幕:', item)}
  />
);
