/**
 * title: " "
 * description: Basic video playback with play/pause, progress seeking, volume, speed, and fullscreen.
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
