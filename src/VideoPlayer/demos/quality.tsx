/**
 * title: " "
 * description: 传入多个清晰度源，控制栏显示清晰度切换按钮，切换时自动保持播放进度。
 */
import React from 'react';
import { VideoPlayer } from 'aeroly';

export default () => (
  <VideoPlayer
    sources={[
      { label: '720p', src: 'https://www.w3schools.com/html/mov_bbb.mp4', default: true },
      { label: '480p', src: 'https://www.w3schools.com/html/movie.mp4' },
    ]}
    width="100%"
    height={360}
  />
);
