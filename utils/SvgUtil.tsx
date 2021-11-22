import ReactDOMServer from 'react-dom/server';
import { flushToHTML } from 'styled-jsx/server';
import SvgWidget from '../components/SvgWidget';
import { RecentTracksResponse } from '../models/RecentTracksResponse';

const baseHeight = 40;
const heightPerItem = 57;
const heightBuffer = 5;

export function generateSvg(recentTracksRes: RecentTracksResponse, width: number): string {
    const count = recentTracksRes.recenttracks.track.length;
    const height = baseHeight + count * heightPerItem + heightBuffer;
    const svgBody = ReactDOMServer.renderToStaticMarkup(
        <SvgWidget width={width} height={height} recentTracksResponse={recentTracksRes} />
    );
    const svgStyles = flushToHTML();

    return `
    <svg
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
    ${svgStyles}
    ${svgBody}
    </svg>`;
}
