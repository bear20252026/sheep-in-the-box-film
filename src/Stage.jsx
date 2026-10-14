import React, {useLayoutEffect, useRef, useState} from 'react';
import {useCurrentFrame, useVideoConfig, delayRender, continueRender, staticFile} from 'remotion';
import '@fontsource/lora/400.css';
import '@fontsource/lora/400-italic.css';
import '@fontsource/noto-serif-sc/400.css';

const BASE_CSS = `#stage *{box-sizing:content-box}`;

// Mounts one part's HTML once, builds its GSAP timeline, then seeks it to the current frame.
export const Stage = ({part}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ref = useRef(null);
  const api = useRef(null);
  const [handle] = useState(() => delayRender('Loading images and fonts'));
  const [html] = useState(() => part.html(staticFile('img/')));

  useLayoutEffect(() => {
    let cancelled = false;
    const root = ref.current;
    const imgs = [...root.querySelectorAll('img')].map((i) => i.decode().catch(() => {}));
    const svgImgs = [...root.querySelectorAll('image')].map((im) => new Promise((res) => {
      const i = new Image(); i.onload = i.onerror = res; i.src = im.getAttribute('href');
    }));
    const text = part.SUB_TEXT || '';
    const fonts = [
      document.fonts.load('40px Lora', 'Ab'),
      document.fonts.load('italic 40px Lora', 'Ab'),
      document.fonts.load('31px "Noto Serif SC"', text || '羊'),
    ];
    Promise.all([...imgs, ...svgImgs, ...fonts]).then(() => document.fonts.ready).then(() => {
      if (cancelled) return;
      api.current = part.setup();
      api.current.render(frame / fps);
      continueRender(handle);
    });
    return () => { cancelled = true; };
  }, []);

  useLayoutEffect(() => {
    if (api.current) api.current.render(frame / fps);
  }, [frame, fps]);

  return (
    <div style={{width: 1920, height: 804, background: '#000'}}>
      <style>{BASE_CSS + part.css}</style>
      <div ref={ref} dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
};
