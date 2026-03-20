/**
 * title: " "
 * description: 基础视频播放，支持播放/暂停、进度拖拽、音量、倍速、全屏。
 */
import React from 'react';
import { VideoPlayer } from 'aeroly';

export default () => (
  <VideoPlayer
    src="https://www.w3schools.com/html/mov_bbb.mp4"
    width="100%"
    height={360}
    poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
  />
);
