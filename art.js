/* ภาพสไตล์สีน้ำ (watercolor) วาดด้วย SVG — ใช้ฟิลเตอร์ #wc และ #wcSoft ที่ประกาศไว้ใน index.html */
const ART = (() => {
  const WC = 'filter="url(#wc)"';

  function hero(gender) {
    const girl = gender === 'girl';
    const tunic = girl ? '#8e3b5a' : '#2f6f7a', tunicD = girl ? '#5e2238' : '#1d4a52';
    const cape = girl ? '#5e7d4a' : '#9c3b2e', capeD = girl ? '#3c5530' : '#6a2419';
    const hair = girl ? '#7a4420' : '#5b3a1e', hairD = '#3a2410';
    const skin = '#f1c9a5', skinD = '#c98f6a';
    const legY = girl ? 200 : 185, legH = girl ? 34 : 48;
    return `<svg viewBox="0 0 200 260" class="char-svg" aria-hidden="true">
  <ellipse cx="100" cy="248" rx="58" ry="9" fill="#3b2a1a" opacity=".22"/>
  <g ${WC}>
    <path d="M72 108 Q50 170 58 236 L128 236 Q122 165 114 108 Z" fill="${cape}" stroke="${capeD}" stroke-width="2.5"/>
    ${girl ? `<path d="M66 74 Q54 140 72 160 Q100 168 128 160 Q144 130 134 74 Z" fill="${hair}" stroke="${hairD}" stroke-width="2"/>
    <path d="M76 120 Q80 140 76 158 M124 118 Q120 140 126 156" stroke="${hairD}" stroke-width="1.5" fill="none" opacity=".5"/>` : ''}
    <rect x="82" y="${legY}" width="15" height="${legH}" rx="6" fill="#5a4632"/>
    <rect x="104" y="${legY}" width="15" height="${legH}" rx="6" fill="#5a4632"/>
    <path d="M78 228 h22 v13 h-28 q0-9 6-13z" fill="#3e2a1a" stroke="#22160c" stroke-width="1.5"/>
    <path d="M102 228 h22 q8 4 8 13 h-30z" fill="#3e2a1a" stroke="#22160c" stroke-width="1.5"/>
    ${girl
      ? `<path d="M76 108 Q100 98 124 108 L142 204 Q100 218 58 204 Z" fill="${tunic}" stroke="${tunicD}" stroke-width="2.5"/>
    <path d="M64 192 Q100 206 136 192" stroke="#d4a63a" stroke-width="4" fill="none"/>`
      : `<path d="M74 108 Q100 98 126 108 L132 196 Q100 206 68 196 Z" fill="${tunic}" stroke="${tunicD}" stroke-width="2.5"/>`}
    <path d="M81 110 Q100 102 119 110 L117 150 Q100 160 83 150 Z" fill="#c2bcae" stroke="#6f6a5f" stroke-width="2"/>
    <path d="M100 106 V154" stroke="#8d877a" stroke-width="2"/>
    <rect x="72" y="158" width="56" height="9" rx="2" fill="#6b4423"/>
    <rect x="95" y="156" width="11" height="13" rx="2" fill="#d4a63a" stroke="#8a6414" stroke-width="1"/>
    <path d="M44 118 h36 v30 q0 26 -18 37 q-18 -11 -18 -37z" fill="#8a5a2b" stroke="#4a2f17" stroke-width="3"/>
    <path d="M62 124 v54 M49 146 h26" stroke="#d4a63a" stroke-width="5" stroke-linecap="round"/>
    <path d="M120 116 Q138 126 142 146" stroke="${tunic}" stroke-width="15" stroke-linecap="round" fill="none"/>
    <g class="sword">
      <rect x="140" y="70" width="9" height="70" rx="2" fill="#e3e7ea" stroke="#7d868c" stroke-width="2"/>
      <path d="M144.5 76 V134" stroke="#ffffff" stroke-width="2" opacity=".8"/>
      <rect x="130" y="138" width="29" height="7" rx="3" fill="#d4a63a" stroke="#8a6414" stroke-width="1.5"/>
      <rect x="141" y="144" width="7" height="16" rx="2" fill="#6b4423"/>
      <circle cx="144.5" cy="163" r="4.5" fill="#d4a63a"/>
    </g>
    <circle cx="144" cy="150" r="7.5" fill="${skin}" stroke="${skinD}" stroke-width="1.5"/>
    <circle cx="100" cy="78" r="30" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <ellipse cx="73" cy="83" rx="5" ry="7" fill="${skin}" stroke="${skinD}" stroke-width="1.5"/>
    ${girl
      ? `<path d="M68 84 Q62 40 100 39 Q138 41 132 80 Q126 60 108 57 Q94 64 82 61 Q74 70 68 84Z" fill="${hair}" stroke="${hairD}" stroke-width="2"/>
    <path d="M80 50 l-14 -10 l1 18z M80 50 l-3 -16 l13 8z" fill="#c23a3a" stroke="#7a1f1f" stroke-width="1.5"/>
    <path d="M102 78 l-3 -3 M117 77 l-2 -4" stroke="#2b1d12" stroke-width="1.6" stroke-linecap="round"/>`
      : `<path d="M70 80 Q64 43 100 41 Q135 43 131 74 Q124 61 112 63 L115 54 Q104 62 92 57 Q84 66 70 80Z" fill="${hair}" stroke="${hairD}" stroke-width="2"/>
    <path d="M102 72 l8 -2 M117 71 l8 1" stroke="${hairD}" stroke-width="2.6" stroke-linecap="round"/>`}
    <ellipse cx="106" cy="82" rx="3.4" ry="4.6" fill="#2b1d12"/>
    <ellipse cx="121" cy="82" rx="3.4" ry="4.6" fill="#2b1d12"/>
    <circle cx="107.2" cy="80.4" r="1.3" fill="#fff"/><circle cx="122.2" cy="80.4" r="1.3" fill="#fff"/>
    <ellipse cx="101" cy="93" rx="6" ry="3.5" fill="#e48b7a" opacity=".5"/>
    <ellipse cx="125" cy="93" rx="4" ry="3" fill="#e48b7a" opacity=".5"/>
    <path d="M110 97 q5 4 10 0" stroke="#7a3b2a" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
  }

  const shadow = (rx = 80) => `<ellipse cx="110" cy="205" rx="${rx}" ry="10" fill="#3b2a1a" opacity=".22"/>`;
  const wrap = (inner, rx) => `<svg viewBox="0 0 220 220" class="char-svg" aria-hidden="true">${shadow(rx)}<g ${WC}>${inner}</g></svg>`;

  const slime = () => wrap(`
    <path d="M30 198 Q24 120 78 92 Q110 74 142 92 Q196 120 190 198 Q160 206 110 204 Q60 206 30 198Z" fill="#8aa152" stroke="#4d6328" stroke-width="3"/>
    <path d="M150 199 q6 12 14 0 M48 199 q5 9 11 0" fill="#8aa152" stroke="#4d6328" stroke-width="2"/>
    <path d="M56 130 Q68 104 94 100" stroke="#eef5d6" stroke-width="7" stroke-linecap="round" fill="none" opacity=".75"/>
    <circle cx="152" cy="162" r="9" fill="#6f8a3a" opacity=".55"/><circle cx="66" cy="176" r="5" fill="#6f8a3a" opacity=".55"/>
    <path d="M84 92 L86 60 L99 76 L110 54 L121 76 L134 60 L136 92 Q110 98 84 92Z" fill="#d4a63a" stroke="#8a6414" stroke-width="2.5"/>
    <circle cx="110" cy="70" r="4" fill="#c23a3a"/>
    <ellipse cx="82" cy="140" rx="11" ry="13" fill="#fffbe9"/><circle cx="77" cy="143" r="6" fill="#2b1d12"/>
    <ellipse cx="124" cy="140" rx="11" ry="13" fill="#fffbe9"/><circle cx="119" cy="143" r="6" fill="#2b1d12"/>
    <path d="M66 118 l22 8 M140 118 l-22 8" stroke="#2b1d12" stroke-width="4" stroke-linecap="round"/>
    <path d="M86 170 Q100 180 116 170" stroke="#2b1d12" stroke-width="3.5" fill="none" stroke-linecap="round"/>`, 82);

  const goblin = () => wrap(`
    <path d="M146 118 Q168 140 158 162" stroke="#8aa04a" stroke-width="14" stroke-linecap="round" fill="none"/>
    <rect x="88" y="165" width="16" height="36" rx="6" fill="#6f8540"/><rect x="118" y="165" width="16" height="36" rx="6" fill="#6f8540"/>
    <ellipse cx="92" cy="202" rx="14" ry="6" fill="#4a3320"/><ellipse cx="126" cy="202" rx="14" ry="6" fill="#4a3320"/>
    <path d="M72 112 Q110 100 148 112 L156 176 L146 168 L138 178 L128 168 L118 178 L108 168 L98 178 L88 168 L78 178 L64 176 Z" fill="#7a5230" stroke="#47301a" stroke-width="2.5"/>
    <path d="M70 150 Q110 158 152 150" stroke="#c9a46a" stroke-width="5" fill="none"/>
    <path d="M80 66 L28 46 L76 92 Z" fill="#8aa04a" stroke="#4d6328" stroke-width="2.5"/>
    <path d="M140 66 L190 48 L144 92 Z" fill="#8aa04a" stroke="#4d6328" stroke-width="2.5"/>
    <ellipse cx="110" cy="76" rx="38" ry="34" fill="#8aa04a" stroke="#4d6328" stroke-width="2.5"/>
    <ellipse cx="94" cy="70" rx="8" ry="6" fill="#f2d14a"/><circle cx="91" cy="70" r="3.2" fill="#2b1d12"/>
    <ellipse cx="124" cy="70" rx="8" ry="6" fill="#f2d14a"/><circle cx="121" cy="70" r="3.2" fill="#2b1d12"/>
    <path d="M84 60 l18 5 M134 60 l-18 5" stroke="#3b4a1c" stroke-width="4" stroke-linecap="round"/>
    <path d="M106 74 Q84 86 100 92 Q107 91 109 84" fill="#7a9140" stroke="#4d6328" stroke-width="2"/>
    <path d="M90 100 Q110 112 132 100 Q110 106 90 100Z" fill="#5a2a1a" stroke="#3b2410" stroke-width="2.5"/>
    <path d="M97 102 l3 6 l3 -5 M120 103 l3 6 l3 -6" fill="#fff" stroke="#fff" stroke-width="1"/>
    <path d="M76 118 Q56 130 50 150" stroke="#8aa04a" stroke-width="14" stroke-linecap="round" fill="none"/>
    <path d="M48 158 L30 70 Q28 50 44 52 Q60 56 56 76 L56 156 Z" fill="#8a5a2b" stroke="#4a2f17" stroke-width="2.5"/>
    <path d="M33 72 l-9 -3 M37 94 l-9 0 M56 64 l9 -4 M57 88 l9 0" stroke="#d8d0bd" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="51" cy="152" r="8" fill="#8aa04a" stroke="#4d6328" stroke-width="2"/>`, 76);

  const wolf = () => wrap(`
    <ellipse cx="115" cy="135" rx="98" ry="72" fill="#4a3b5c" opacity=".16"/>
    <path d="M168 128 Q205 120 210 82 Q196 104 172 112 Z" fill="#5d5f69" stroke="#35363d" stroke-width="2.5"/>
    <rect x="164" y="148" width="14" height="52" rx="6" fill="#4d4f58"/>
    <rect x="88" y="150" width="14" height="50" rx="6" fill="#4d4f58"/>
    <ellipse cx="130" cy="135" rx="54" ry="32" fill="#6c6e79" stroke="#3a3b42" stroke-width="2.5"/>
    <path d="M104 106 l8 -10 l6 9 l8 -11 l6 10 l8 -9 l5 10" stroke="#3a3b42" stroke-width="2.5" fill="#6c6e79"/>
    <rect x="148" y="150" width="15" height="52" rx="6" fill="#6c6e79" stroke="#3a3b42" stroke-width="2"/>
    <rect x="104" y="152" width="15" height="50" rx="6" fill="#6c6e79" stroke="#3a3b42" stroke-width="2"/>
    <ellipse cx="108" cy="202" rx="11" ry="5" fill="#3a3b42"/><ellipse cx="152" cy="202" rx="11" ry="5" fill="#3a3b42"/>
    <path d="M88 118 Q72 150 94 168 Q106 150 106 122 Z" fill="#a9abb3"/>
    <path d="M66 84 L72 50 L88 80 Z" fill="#55575f" stroke="#3a3b42" stroke-width="2.5"/>
    <circle cx="82" cy="100" r="28" fill="#6c6e79" stroke="#3a3b42" stroke-width="2.5"/>
    <path d="M90 82 L102 52 L110 88 Z" fill="#6c6e79" stroke="#3a3b42" stroke-width="2.5"/>
    <path d="M95 82 L101 64 L105 86 Z" fill="#c9a0a0" opacity=".7"/>
    <path d="M66 92 L20 104 Q13 112 22 118 L66 122 Z" fill="#7c7e88" stroke="#3a3b42" stroke-width="2.5"/>
    <ellipse cx="18" cy="109" rx="6" ry="5" fill="#1d1d22"/>
    <path d="M24 118 L64 121" stroke="#1d1d22" stroke-width="2.5"/>
    <path d="M30 118 l3 7 l3 -7 M42 119 l3 7 l3 -7 M54 120 l3 7 l3 -7" fill="#fff" stroke="#fff" stroke-width="1"/>
    <path d="M60 94 L78 89 L74 99 Z" fill="#f2c335" stroke="#3a3b42" stroke-width="1"/>
    <circle cx="70" cy="94" r="2.2" fill="#1d1d22"/>`, 85);

  const skeleton = () => wrap(`
    <path d="M80 104 Q70 170 76 200 L94 186 L104 200 L116 186 L128 200 L140 186 L150 200 Q154 160 142 104 Z" fill="#4a3a52" stroke="#2c2232" stroke-width="2.5"/>
    <path d="M100 160 L96 196 M124 160 L128 196" stroke="#ece4cf" stroke-width="9" stroke-linecap="round"/>
    <rect x="84" y="193" width="22" height="11" rx="3" fill="#6b5d4f"/><rect x="118" y="193" width="22" height="11" rx="3" fill="#6b5d4f"/>
    <path d="M94 150 h36 l-6 14 h-24z" fill="#ece4cf" stroke="#9c9381" stroke-width="2"/>
    <path d="M112 102 V152" stroke="#ece4cf" stroke-width="7"/>
    <path d="M96 114 Q112 108 128 114 M94 124 Q112 118 130 124 M96 134 Q112 128 128 134 M100 144 Q112 140 124 144" stroke="#ece4cf" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M132 108 L148 132 L140 156" stroke="#ece4cf" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M84 102 Q96 92 108 102 L104 116 Q92 118 84 112Z" fill="#8a6e52" stroke="#4e3d2c" stroke-width="2"/>
    <path d="M118 102 Q130 92 142 102 L140 114 Q128 118 120 114Z" fill="#8a6e52" stroke="#4e3d2c" stroke-width="2"/>
    <path d="M92 110 L76 128 L62 134" stroke="#ece4cf" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M58 134 L16 58 L24 53 L64 130 Z" fill="#a9b0b4" stroke="#5c6266" stroke-width="2"/>
    <circle cx="33" cy="82" r="3" fill="#8a5a2b" opacity=".7"/><circle cx="44" cy="104" r="2.4" fill="#8a5a2b" opacity=".6"/>
    <path d="M46 140 L74 124" stroke="#6b5d4f" stroke-width="6" stroke-linecap="round"/>
    <path d="M63 133 L72 150" stroke="#4a2f17" stroke-width="6" stroke-linecap="round"/>
    <circle cx="62" cy="134" r="6" fill="#ece4cf" stroke="#9c9381" stroke-width="1.5"/>
    <circle cx="112" cy="72" r="27" fill="#efe7d2" stroke="#9c9381" stroke-width="2.5"/>
    <path d="M94 88 Q112 106 130 88 L128 98 Q112 112 96 98 Z" fill="#e3d9c0" stroke="#9c9381" stroke-width="2"/>
    <path d="M102 95 v6 M108 97 v6 M114 97 v6 M120 95 v6" stroke="#9c9381" stroke-width="1.5"/>
    <ellipse cx="100" cy="74" rx="8" ry="9" fill="#2a1d22"/><ellipse cx="122" cy="74" rx="7" ry="9" fill="#2a1d22"/>
    <circle cx="99" cy="75" r="3" fill="#ff5a3a"/><circle cx="121" cy="75" r="3" fill="#ff5a3a"/>
    <path d="M110 84 l-3 6 h6 z" fill="#2a1d22"/>
    <path d="M84 66 Q86 38 112 38 Q138 38 140 66 L132 62 Q112 52 92 62 Z" fill="#7b6a58" stroke="#4e3d2c" stroke-width="2.5"/>
    <circle cx="96" cy="52" r="2" fill="#4e3d2c"/><circle cx="112" cy="46" r="2" fill="#4e3d2c"/><circle cx="128" cy="52" r="2" fill="#4e3d2c"/>
    <path d="M112 39 Q120 14 148 14 Q132 24 136 40 Q124 32 112 40" fill="#9c2e2e" stroke="#5e1a1a" stroke-width="2"/>`, 70);

  const dragon = () => wrap(`
    <path d="M128 96 L176 22 L186 60 L214 56 L196 96 L214 112 L150 120 Z" fill="#6e2620" stroke="#3e1410" stroke-width="2.5"/>
    <path d="M128 96 L176 22 M150 110 L186 60 M160 116 L214 56" stroke="#3e1410" stroke-width="2.5" opacity=".6"/>
    <path d="M168 168 Q210 170 212 132 Q214 118 204 112 L206 128 Q202 154 160 150 Z" fill="#a83f2c" stroke="#5a1f15" stroke-width="2.5"/>
    <path d="M204 112 l13 -9 l-2 15 z" fill="#e3c08a" stroke="#8a6a3a" stroke-width="1.5"/>
    <path d="M150 160 Q168 186 162 204 L142 204 Q146 186 136 172Z" fill="#9a3a29" stroke="#5a1f15" stroke-width="2.5"/>
    <ellipse cx="128" cy="146" rx="52" ry="42" fill="#b0432f" stroke="#5a1f15" stroke-width="2.5"/>
    <path d="M120 105 l8 -14 l6 14 M138 106 l10 -12 l4 14 M156 114 l12 -8 l0 14" fill="#e3c08a" stroke="#8a6a3a" stroke-width="1.5"/>
    <path d="M90 130 Q84 170 112 188 Q130 176 128 140 Z" fill="#e7b874" stroke="#a87a3a" stroke-width="2"/>
    <path d="M92 146 Q108 150 126 144 M94 160 Q110 166 126 158 M100 174 Q112 178 122 172" stroke="#a87a3a" stroke-width="2" fill="none"/>
    <path d="M96 168 Q88 190 96 204 L116 204 Q110 186 116 176 Z" fill="#b0432f" stroke="#5a1f15" stroke-width="2.5"/>
    <path d="M95 204 l-4 5 M102 204 l-2 6 M109 204 l0 6" stroke="#e3c08a" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M110 112 Q86 98 78 74 L100 64 Q108 92 132 104 Z" fill="#b0432f" stroke="#5a1f15" stroke-width="2.5"/>
    <path d="M100 58 Q92 42 70 46 Q46 50 28 66 Q18 74 24 82 Q40 92 62 90 Q90 92 104 76 Z" fill="#b8492f" stroke="#5a1f15" stroke-width="2.5"/>
    <path d="M26 82 Q44 96 76 92 L74 100 Q46 104 28 90Z" fill="#9a3a29" stroke="#5a1f15" stroke-width="2"/>
    <path d="M34 86 l3 6 l3 -5 M46 89 l3 6 l3 -5 M58 90 l3 6 l3 -5" fill="#fff" stroke="#fff" stroke-width="1"/>
    <path d="M84 50 Q96 26 122 20 Q102 34 96 54 Z" fill="#e3c08a" stroke="#8a6a3a" stroke-width="2"/>
    <path d="M72 48 Q76 30 92 22 Q84 36 84 50Z" fill="#d8b47c" stroke="#8a6a3a" stroke-width="2"/>
    <path d="M54 60 Q65 53 75 62 Q64 67 54 60Z" fill="#f5d33a" stroke="#5a1f15" stroke-width="1.5"/>
    <path d="M65 56 v9" stroke="#1d1d22" stroke-width="2.6"/>
    <path d="M50 55 Q66 47 82 56" stroke="#5a1f15" stroke-width="3" fill="none"/>
    <circle cx="30" cy="72" r="2.5" fill="#3e1410"/>
    <circle cx="16" cy="62" r="6" fill="#9a8f84" opacity=".4"/><circle cx="8" cy="50" r="4" fill="#9a8f84" opacity=".3"/>
    <path d="M120 112 L150 60 L158 92 L180 90 L162 122 L140 130Z" fill="#8a3226" stroke="#3e1410" stroke-width="2.5"/>
    <path d="M120 112 L150 60 M140 122 L180 90" stroke="#3e1410" stroke-width="2" opacity=".5"/>`, 92);

  const monsters = [slime, goblin, wolf, skeleton, dragon];

  function landscape() {
    return `<svg viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax slice" class="landscape" aria-hidden="true">
  <defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcc08a"/><stop offset=".7" stop-color="#f1e1bc"/></linearGradient></defs>
  <rect width="1000" height="420" fill="url(#skyG)"/>
  <g filter="url(#wcSoft)">
    <circle cx="800" cy="90" r="58" fill="#f6dfa0" opacity=".75"/>
    <path d="M-20 120 Q120 90 220 120 Q300 100 360 125" stroke="#fff6dc" stroke-width="22" stroke-linecap="round" fill="none" opacity=".5"/>
    <path d="M0 230 L90 160 L170 210 L260 140 L360 205 L450 150 L560 215 L650 160 L760 220 L860 150 L1000 210 V420 H0Z" fill="#c2a57c" opacity=".55"/>
    <g fill="#8f6f4d" opacity=".85">
      <rect x="600" y="150" width="120" height="110"/>
      <path d="M600 150 v-12 h14 v12 h12 v-12 h14 v12 h12 v-12 h14 v12 h12 v-12 h14 v12 h12 v-12 h14 v12z"/>
      <rect x="575" y="110" width="36" height="150"/><path d="M570 112 L593 66 L616 112Z"/>
      <rect x="709" y="110" width="36" height="150"/><path d="M704 112 L727 66 L750 112Z"/>
      <rect x="642" y="95" width="36" height="70"/><path d="M637 97 L660 50 L683 97Z"/>
      <path d="M593 66 v-18 l18 6 l-18 6z M727 66 v-18 l18 6 l-18 6z M660 50 v-20 l20 7 l-20 7z" fill="#9c3b2e"/>
      <path d="M648 260 v-34 q12 -16 24 0 v34z" fill="#5e4328"/>
      <rect x="587" y="140" width="10" height="16" rx="5" fill="#5e4328"/><rect x="721" y="140" width="10" height="16" rx="5" fill="#5e4328"/>
    </g>
    <path d="M0 270 Q150 220 300 255 Q450 290 600 250 Q760 215 1000 260 V420 H0Z" fill="#a4835a"/>
    <g fill="#6e5a36">
      <ellipse cx="70" cy="255" rx="34" ry="44"/><ellipse cx="120" cy="268" rx="26" ry="34"/>
      <ellipse cx="900" cy="262" rx="36" ry="46"/><ellipse cx="950" cy="275" rx="24" ry="32"/>
    </g>
    <g stroke="#4a3520" stroke-width="6"><path d="M70 290 v24 M120 296 v20 M900 300 v20 M950 302 v16"/></g>
    <path d="M0 330 Q250 300 500 320 Q750 340 1000 310 V420 H0Z" fill="#7a5a36"/>
    <path d="M0 380 Q300 360 600 378 Q800 390 1000 372 V420 H0Z" fill="#5e4328"/>
  </g>
</svg>`;
  }

  function crest() {
    return `<svg viewBox="0 0 160 170" class="crest-svg" aria-hidden="true"><g ${WC}>
    <g transform="rotate(-35 80 85)"><rect x="76" y="0" width="8" height="120" fill="#d9dde0" stroke="#6d757a" stroke-width="2"/><rect x="62" y="112" width="36" height="7" rx="3" fill="#d4a63a"/><rect x="76" y="119" width="8" height="20" fill="#5a3519"/></g>
    <g transform="rotate(35 80 85)"><rect x="76" y="0" width="8" height="120" fill="#d9dde0" stroke="#6d757a" stroke-width="2"/><rect x="62" y="112" width="36" height="7" rx="3" fill="#d4a63a"/><rect x="76" y="119" width="8" height="20" fill="#5a3519"/></g>
    <path d="M30 30 h100 v50 q0 50 -50 75 q-50 -25 -50 -75z" fill="#6b4423" stroke="#2a1a0f" stroke-width="4"/>
    <path d="M42 42 h76 v38 q0 38 -38 58 q-38 -20 -38 -58z" fill="#a86a32"/>
    <text x="80" y="110" text-anchor="middle" font-family="Charm, serif" font-weight="700" font-size="66" fill="#f1d58a">ก</text>
  </g></svg>`;
  }

  return { hero, monster: i => monsters[i](), landscape, crest };
})();
