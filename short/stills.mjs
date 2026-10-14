import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition, openBrowser} from '@remotion/renderer';
import path from 'path';
const [comp, outdir, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.jsx')});
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const puppeteerInstance = await openBrowser('chrome', {browserExecutable});
const composition = await selectComposition({serveUrl, id: comp, puppeteerInstance});
for (const f of frames) {
  await renderStill({serveUrl, composition, frame: +f, output: `${outdir}/${comp}_${String(f).padStart(5,'0')}.jpg`, imageFormat: 'jpeg', jpegQuality: 85, puppeteerInstance, scale: 0.5});
  process.stdout.write(f + ' ');
}
await puppeteerInstance.close({silent: true});
