/**
 * title: " "
 * description: Pass multiple quality sources. The control bar shows a quality switch button. Progress is preserved when switching.
 */
import React from 'react';
import { VideoPlayer, ConfigProvider } from 'aeroly';
import enUS from 'aeroly/locale/en_US';

export default () => (
  <ConfigProvider locale={enUS}>
    <VideoPlayer
      sources={[
        { label: '720p', src: 'https://www.w3schools.com/html/mov_bbb.mp4', default: true },
        { label: '480p', src: 'https://www.w3schools.com/html/movie.mp4' },
      ]}
      width="100%"
      height={360}
    />
  </ConfigProvider>
);
