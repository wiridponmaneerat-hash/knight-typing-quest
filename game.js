(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  /* ===================== คลังคำตามระดับชั้น =====================
     tBase + tChar × จำนวนตัวอักษร = เวลาพื้นฐานต่อคำ (วินาที)
     เพิ่ม/ลบคำได้ในอาร์เรย์ words ได้เลย (ระบบจะจัดลำดับความยากให้อัตโนมัติ) */
  const GRADES = {
    1: { label: 'ป.1', desc: 'คำง่าย 2–3 ตัวอักษร', tBase: 6, tChar: 1.6, words: [
      'กา', 'ตา', 'ปู', 'งู', 'มา', 'ดู', 'หู', 'ขา', 'นา', 'ยา', 'ม้า', 'หมู', 'ปลา', 'ไก่', 'ไข่', 'แม่', 'พ่อ', 'ยาย', 'ป้า', 'น้า',
      'ใบ', 'ฟ้า', 'มือ', 'เสือ', 'ปู่', 'ย่า', 'ตู้', 'งา', 'รู', 'ชา', 'เรือ', 'หมา', 'นก', 'กบ', 'ปาก', 'ตี', 'ปี', 'มี', 'ดี', 'หา',
      'ไป', 'ใจ', 'ไฟ', 'ไม้', 'ผ้า', 'ป่า', 'คอ', 'ขอ', 'รอ', 'จอ', 'โต', 'เตา', 'กาว', 'ตก', 'ดาว', 'ดิน', 'หิน', 'ฝน', 'ลม', 'ตัว',
      'หัว', 'วัว', 'บัว', 'มด', 'ไร่', 'แกะ', 'บอล', 'นม', 'ลิง', 'ยุง'] },
    2: { label: 'ป.2', desc: 'คำพยางค์เดียว–สองพยางค์', tBase: 5, tChar: 1.3, words: [
      'บ้าน', 'แมว', 'ช้าง', 'เป็ด', 'ข้าว', 'น้ำ', 'ผัก', 'รถ', 'ถนน', 'ตลาด', 'ครู', 'เพื่อน', 'ห้อง', 'ประตู', 'กระดาษ',
      'ยางลบ', 'ปากกา', 'โต๊ะ', 'เก้าอี้', 'ทะเล', 'ภูเขา', 'แม่น้ำ', 'ดอกไม้', 'ต้นไม้', 'ไข่ไก่', 'ผลไม้', 'กล้วย', 'ส้ม', 'แตงโม',
      'ร่ม', 'เสื้อ', 'กางเกง', 'รองเท้า', 'หมวก', 'กุ้ง', 'หอย', 'ปลาทู', 'ขนม', 'ผึ้ง', 'แดด', 'เมฆ', 'ทราย', 'เกลือ', 'น้ำตาล',
      'พัดลม', 'ช้อน', 'ส้อม', 'จาน', 'ชาม', 'แก้ว', 'หม้อ', 'ถ้วย', 'เตียง', 'หมอน', 'ผ้าห่ม', 'ห้องน้ำ', 'สวน', 'ลูกโป่ง', 'ว่าว',
      'ตุ๊กแก', 'กระรอก', 'ควาย', 'หมี', 'แพะ', 'ไข่ดาว', 'ข้าวผัด', 'ตะกร้า', 'กระจก'] },
    3: { label: 'ป.3', desc: 'คำหลายพยางค์', tBase: 5, tChar: 1.05, words: [
      'โรงเรียน', 'ดินสอ', 'หนังสือ', 'สมุด', 'ไม้บรรทัด', 'นักเรียน', 'ห้องสมุด', 'ผีเสื้อ', 'กระต่าย', 'จระเข้', 'ยีราฟ', 'ทุเรียน',
      'มะม่วง', 'สับปะรด', 'ฝนตก', 'พระอาทิตย์', 'ดวงจันทร์', 'รถไฟ', 'เครื่องบิน', 'จักรยาน', 'ชาวนา', 'ตำรวจ', 'หมอฟัน',
      'ขยันเรียน', 'กตัญญู', 'ซื่อสัตย์', 'ประหยัด', 'สามัคคี', 'กระเป๋า', 'นาฬิกา', 'ตุ๊กตา', 'ลูกบอล', 'ไอศกรีม', 'มะพร้าว',
      'นกยูง', 'แมงมุม', 'ปลาวาฬ', 'ปลาโลมา', 'ดอกกุหลาบ', 'ทานตะวัน', 'ดอกบัว', 'ข้าวเหนียว', 'ขนมปัง', 'น้ำส้ม', 'ห้องเรียน',
      'กระดานดำ', 'สนามหญ้า', 'ธงชาติ', 'วันเด็ก', 'วันครู', 'ปีใหม่', 'ครอบครัว', 'พี่น้อง', 'คุณยาย', 'คุณตา', 'สุนัข',
      'ม้าลาย', 'อูฐ', 'หมีแพนด้า', 'ฟุตบอล', 'ว่ายน้ำ', 'วิ่งเล่น', 'ร้องเพลง', 'วาดรูป', 'ระบายสี'] },
    4: { label: 'ป.4', desc: 'คำยาวและคำศัพท์วิชาการ', tBase: 4.5, tChar: 0.95, words: [
      'ประเทศไทย', 'คอมพิวเตอร์', 'วิทยาศาสตร์', 'คณิตศาสตร์', 'ภาษาไทย', 'สิ่งแวดล้อม', 'ธรรมชาติ', 'วัฒนธรรม', 'ประเพณี',
      'สงกรานต์', 'ลอยกระทง', 'พิพิธภัณฑ์', 'อนุสาวรีย์', 'ภูมิปัญญา', 'ความสะอาด', 'ความรับผิดชอบ', 'อาสาสมัคร', 'สุขภาพ',
      'อาหารกลางวัน', 'การบ้าน', 'เทคโนโลยี', 'อินเทอร์เน็ต', 'โทรศัพท์', 'แผนที่', 'มหาสมุทร', 'ป่าไม้', 'พลังงาน',
      'ห้องวิทยาศาสตร์', 'ดาวเคราะห์', 'ระบบสุริยะ', 'ภูเขาไฟ', 'แผ่นดินไหว', 'น้ำท่วม', 'ภัยแล้ง', 'ฤดูฝน', 'ฤดูหนาว', 'ฤดูร้อน',
      'ทรัพยากร', 'พระมหากษัตริย์', 'จังหวัด', 'อำเภอ', 'หมู่บ้าน', 'ชุมชน', 'เกษตรกร', 'ชาวประมง', 'สนามบิน', 'สถานีรถไฟ',
      'โรงพยาบาล', 'ไปรษณีย์', 'ห้างสรรพสินค้า', 'ตู้เย็น', 'เครื่องซักผ้า', 'ไมโครโฟน', 'แบตเตอรี่', 'แม่เหล็ก', 'ไฟฟ้า',
      'การทดลอง', 'สัตว์เลี้ยงลูกด้วยนม', 'สัตว์ครึ่งบกครึ่งน้ำ', 'ประชาธิปไตย'] },
    5: { label: 'ป.5', desc: 'วลีและประโยคสั้น', tBase: 5, tChar: 0.85, words: [
      'ฉันไปโรงเรียนทุกวัน', 'แม่ทำอาหารอร่อย', 'พ่อขับรถไปทำงาน', 'นักเรียนตั้งใจเรียน', 'ช่วยกันรักษาความสะอาด',
      'อ่านหนังสือทุกวัน', 'ปลูกต้นไม้ให้ร่มเงา', 'ล้างมือก่อนกินข้าว', 'ครูสอนภาษาไทย', 'ดื่มน้ำวันละแปดแก้ว',
      'ออกกำลังกายทุกเช้า', 'ไม่ทิ้งขยะลงแม่น้ำ', 'ประหยัดน้ำประหยัดไฟ', 'เคารพธงชาติตอนเช้า', 'ช่วยแม่ล้างจาน',
      'ทำการบ้านเสร็จแล้ว', 'ห้องสมุดมีหนังสือมากมาย', 'ฝนตกหนักเมื่อวานนี้', 'ช้างเป็นสัตว์ประจำชาติไทย',
      'ฉันรักประเทศไทย', 'วันนี้อากาศดีมาก', 'ลูกแมวนอนหลับใต้โต๊ะ', 'พี่ชายเล่นฟุตบอลเก่ง', 'เพื่อนช่วยเหลือกัน',
      'พระอาทิตย์ขึ้นทางทิศตะวันออก', 'แม่ไก่ออกไข่ทุกวัน', 'น้องสาวชอบวาดรูประบายสี', 'คุณครูใจดีมาก', 'เราต้องแปรงฟันก่อนนอน',
      'ปลาว่ายน้ำอยู่ในสระ', 'ผีเสื้อบินไปตอมดอกไม้', 'พวกเราไปทัศนศึกษาที่สวนสัตว์', 'ห้ามวิ่งเล่นบนถนน', 'คุณยายเล่านิทานก่อนนอน',
      'ข้ามถนนตรงทางม้าลาย', 'ฝนตกทำให้ต้นไม้เขียวชอุ่ม', 'พ่อพาไปเที่ยวทะเล', 'ลมพัดเย็นสบาย', 'เราควรกินผักและผลไม้',
      'ห้องเรียนของเราสะอาดมาก', 'ฉันชอบอ่านการ์ตูน', 'แมวจับหนูเก่งมาก', 'ชาวนาปลูกข้าวในนา', 'วันเสาร์ฉันช่วยแม่ทำสวน',
      'หนังสือเป็นเพื่อนที่ดี', 'ทิ้งขยะให้ถูกที่', 'สุนัขเห่าเสียงดัง', 'ดวงจันทร์ส่องแสงสว่าง', 'ไปโรงเรียนให้ทันเวลา'] },
    6: { label: 'ป.6', desc: 'สำนวนและสุภาษิตไทย', tBase: 5, tChar: 0.75, words: [
      'น้ำขึ้นให้รีบตัก', 'ความรู้คู่คุณธรรม', 'ไม่มีใครแก่เกินเรียน', 'ขี่ช้างจับตั๊กแตน', 'น้ำซึมบ่อทราย', 'ตำน้ำพริกละลายแม่น้ำ',
      'ปิดทองหลังพระ', 'สิบปากว่าไม่เท่าตาเห็น', 'ฝนทั่งให้เป็นเข็ม', 'ผักชีโรยหน้า', 'อดเปรี้ยวไว้กินหวาน', 'หนีเสือปะจระเข้',
      'น้ำน้อยย่อมแพ้ไฟ', 'เข้าเมืองตาหลิ่วต้องหลิ่วตาตาม', 'ช้า ๆ ได้พร้าเล่มงาม', 'ทำดีได้ดี ทำชั่วได้ชั่ว',
      'ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น', 'มีสลึงพึงบรรจบให้ครบบาท', 'รักดีหามจั่ว รักชั่วหามเสา', 'ลางเนื้อชอบลางยา',
      'เพื่อนกินหาง่าย เพื่อนตายหายาก', 'ไม้อ่อนดัดง่าย ไม้แก่ดัดยาก', 'ตนเป็นที่พึ่งแห่งตน', 'คนดีตกน้ำไม่ไหล ตกไฟไม่ไหม้',
      'ไก่งามเพราะขน คนงามเพราะแต่ง', 'น้ำเชี่ยวอย่าขวางเรือ', 'จับปลาสองมือ', 'กระต่ายตื่นตูม', 'วัวหายล้อมคอก',
      'เสียน้อยเสียยาก เสียมากเสียง่าย', 'ปลาหมอตายเพราะปาก', 'ชักแม่น้ำทั้งห้า', 'เข็นครกขึ้นภูเขา', 'ตีวัวกระทบคราด',
      'คบคนพาล พาลพาไปหาผิด', 'คบบัณฑิต บัณฑิตพาไปหาผล', 'ลูกไม้หล่นไม่ไกลต้น', 'น้ำร้อนปลาเป็น น้ำเย็นปลาตาย',
      'ขิงก็รา ข่าก็แรง', 'งมเข็มในมหาสมุทร', 'แกว่งเท้าหาเสี้ยน', 'ฆ้องปากแตก', 'หวานอมขมกลืน', 'ใจดีสู้เสือ',
      'รู้ไว้ใช่ว่า ใส่บ่าแบกหาบ', 'ทำคุณบูชาโทษ', 'กินบนเรือน ขี้บนหลังคา', 'เอามือซุกหีบ'] },
  };

  /* ===================== ด่านหลัก 5 ด่าน × ด่านย่อย 10 ด่าน ===================== */
  const SUBS = 10;
  const REGIONS = [
    { name: 'ทุ่งหญ้าชายป่า', art: 0, mobs: ['สไลม์โคลน', 'สไลม์น้ำผึ้ง', 'สไลม์มอส'], boss: 'ราชาสไลม์' },
    { name: 'ป่าทมิฬ', art: 1, mobs: ['ก็อบลินจอมป่วน', 'ก็อบลินขโมย', 'ก็อบลินถือกระบอง'], boss: 'หัวหน้าเผ่าก็อบลิน' },
    { name: 'หุบเขาหมาป่า', art: 2, mobs: ['หมาป่าเงา', 'หมาป่าหิมะ', 'หมาป่าหอน'], boss: 'จ่าฝูงหมาป่าเงา' },
    { name: 'สุสานปราสาทร้าง', art: 3, mobs: ['โครงกระดูกทหาร', 'โครงกระดูกยาม', 'อัศวินโครงกระดูก'], boss: 'ราชันโครงกระดูก' },
    { name: 'รังมังกรเพลิง', art: 4, mobs: ['ลูกมังกรไฟ', 'มังกรเกล็ดแดง', 'มังกรปีกเพลิง'], boss: 'มังกรเพลิงโบราณ' },
  ];
  const TOTAL = REGIONS.length * SUBS;

  // ความยากของแต่ละด่าน: d = 0 (ด่าน 1-1) → 1 (ด่าน 5-10)
  function levelInfo(L) {
    const r = Math.floor((L - 1) / SUBS), sub = (L - 1) % SUBS + 1, region = REGIONS[r];
    const boss = sub === SUBS, d = (L - 1) / (TOTAL - 1);
    const words = Math.round(3 + d * 3) + (boss ? 2 : 0);   // จำนวนคำที่ต้องพิมพ์ 3–6 คำ (บอส +2)
    return {
      L, r, sub, region, boss, d, words,
      hp: words * 20,
      atk: Math.round(9 + d * 15) + (boss ? 4 : 0),          // แรงโจมตีเมื่อหมดเวลา
      timeMul: (1.25 - 0.45 * d) * (boss ? 0.95 : 1),         // เวลาลดลงเรื่อย ๆ เมื่อด่านสูงขึ้น
      name: boss ? region.boss : region.mobs[(sub - 1) % region.mobs.length],
      tint: boss ? 0 : [0, 24, -24][Math.floor((sub - 1) / 3) % 3],
      code: `${r + 1}-${sub}`,
    };
  }

  /* ===================== แป้นพิมพ์เกษมณี ===================== */
  const K = (code, n, s, en) => ({ code, n, s, en });
  const M = (label, cls, code) => ({ mod: label, cls, code });
  const KB_ROWS = [
    [K('Backquote', '_', '%', '`'), K('Digit1', 'ๅ', '+', '1'), K('Digit2', '/', '๑', '2'), K('Digit3', '-', '๒', '3'), K('Digit4', 'ภ', '๓', '4'),
     K('Digit5', 'ถ', '๔', '5'), K('Digit6', 'ุ', 'ู', '6'), K('Digit7', 'ึ', '฿', '7'), K('Digit8', 'ค', '๕', '8'), K('Digit9', 'ต', '๖', '9'),
     K('Digit0', 'จ', '๗', '0'), K('Minus', 'ข', '๘', '-'), K('Equal', 'ช', '๙', '='), M('ลบ ⌫', 'w2', 'Backspace')],
    [M('Tab', 'w15'), K('KeyQ', 'ๆ', '๐', 'q'), K('KeyW', 'ไ', '"', 'w'), K('KeyE', 'ำ', 'ฎ', 'e'), K('KeyR', 'พ', 'ฑ', 'r'), K('KeyT', 'ะ', 'ธ', 't'),
     K('KeyY', 'ั', 'ํ', 'y'), K('KeyU', 'ี', '๊', 'u'), K('KeyI', 'ร', 'ณ', 'i'), K('KeyO', 'น', 'ฯ', 'o'), K('KeyP', 'ย', 'ญ', 'p'),
     K('BracketLeft', 'บ', 'ฐ', '['), K('BracketRight', 'ล', ',', ']'), { ...K('Backslash', 'ฃ', 'ฅ', '\\'), cls: 'w15' }],
    [M('Caps', 'w175'), K('KeyA', 'ฟ', 'ฤ', 'a'), K('KeyS', 'ห', 'ฆ', 's'), K('KeyD', 'ก', 'ฏ', 'd'), { ...K('KeyF', 'ด', 'โ', 'f'), cls: 'bump' },
     K('KeyG', 'เ', 'ฌ', 'g'), K('KeyH', '้', '็', 'h'), { ...K('KeyJ', '่', '๋', 'j'), cls: 'bump' }, K('KeyK', 'า', 'ษ', 'k'), K('KeyL', 'ส', 'ศ', 'l'),
     K('Semicolon', 'ว', 'ซ', ';'), K('Quote', 'ง', '.', "'"), M('Enter', 'w225')],
    [M('Shift', 'w225', 'ShiftLeft'), K('KeyZ', 'ผ', '(', 'z'), K('KeyX', 'ป', ')', 'x'), K('KeyC', 'แ', 'ฉ', 'c'), K('KeyV', 'อ', 'ฮ', 'v'),
     K('KeyB', 'ิ', 'ฺ', 'b'), K('KeyN', 'ื', '์', 'n'), K('KeyM', 'ท', '?', 'm'), K('Comma', 'ม', 'ฒ', ','), K('Period', 'ใ', 'ฬ', '.'),
     K('Slash', 'ฝ', 'ฦ', '/'), M('Shift', 'w275', 'ShiftRight')],
    [M('เว้นวรรค', 'space', 'Space')],
  ];
  const CODE_MAP = {};
  const CHAR_KEY = { ' ': { code: 'Space', shift: false } };
  KB_ROWS.flat().forEach((k) => {
    if (k.mod) return;
    CODE_MAP[k.code] = [k.n, k.s];
    if (!(k.n in CHAR_KEY)) CHAR_KEY[k.n] = { code: k.code, shift: false };
    if (!(k.s in CHAR_KEY)) CHAR_KEY[k.s] = { code: k.code, shift: true };
  });
  const LEFT_HAND = new Set(['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT',
    'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB']);
  const COMBINING = /[ัิ-ฺ็-๎]/;
  const showChar = (c) => (COMBINING.test(c) ? '◌' + c : c);

  /* ===================== เสียง (สังเคราะห์) ===================== */
  const SFX = {
    ctx: null, on: true,
    init() {
      if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ctx = null; }
    },
    tone(f, d, type = 'sine', v = 0.12, slide = 0, delay = 0) {
      const c = this.ctx; if (!c || !this.on) return;
      const t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + d);
      g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + 0.03);
    },
    noise(d, v = 0.2, freq = 1500, delay = 0) {
      const c = this.ctx; if (!c || !this.on) return;
      const len = Math.floor(c.sampleRate * d), b = c.createBuffer(1, len, c.sampleRate), data = b.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = b; f.type = 'bandpass'; f.frequency.value = freq; g.gain.value = v;
      s.connect(f).connect(g).connect(c.destination); s.start(c.currentTime + delay);
    },
    key() { this.tone(1100, 0.035, 'triangle', 0.035); },
    wrong() { this.tone(140, 0.14, 'square', 0.06); },
    hit(crit) { this.noise(0.18, 0.35, 2400); this.tone(crit ? 520 : 380, 0.18, 'sawtooth', 0.07, -200); if (crit) this.tone(990, 0.22, 'triangle', 0.08, 0, 0.05); },
    hurt() { this.noise(0.22, 0.3, 600); this.tone(260, 0.3, 'square', 0.07, -150); },
    fire() { this.noise(0.55, 0.35, 450); },
    slain() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.1, 0, i * 0.09)); },
    horn() { this.tone(392, 0.25, 'sawtooth', 0.05); this.tone(523, 0.45, 'sawtooth', 0.05, 0, 0.22); },
    win() { [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => this.tone(f, 0.22, 'triangle', 0.1, 0, i * 0.12)); },
    lose() { [392, 330, 262, 196].forEach((f, i) => this.tone(f, 0.38, 'triangle', 0.1, 0, i * 0.22)); },
  };

  /* ===================== storage ===================== */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  };
  const PROG_KEY = 'knight-typing-progress-v2';

  /* ===================== ระบบสุ่มคำ: ไม่ซ้ำจนกว่าจะใช้ครบทุกคำ =====================
     - คลังคำของแต่ละชั้น = คำของชั้นนั้น + คำครึ่งที่ยากของชั้นก่อนหน้า (ใช้เป็นคำวอร์มอัพในด่านต้น ๆ)
     - คำที่ใช้แล้วจะถูกจำไว้ (ข้ามด่าน ข้ามรอบเล่น) และจะไม่ถูกสุ่มซ้ำจนกว่าคำในคลังจะหมดจริง ๆ
     - ด่านง่ายจะเลือกคำที่ง่าย ด่านยากเลือกคำที่ยาก จากคำที่ยังไม่เคยใช้ */
  function diffScore(w) {
    let s = 0;
    for (const ch of w) {
      s += 1;
      const k = CHAR_KEY[ch];
      if (k && k.shift) s += 1.5;          // ตัวที่ต้องกด Shift ยากกว่า
      if (COMBINING.test(ch)) s += 0.3;    // สระบน-ล่าง วรรณยุกต์
    }
    return s;
  }
  const byDiff = (arr) => [...arr].sort((a, b) => diffScore(a) - diffScore(b));
  const Words = {
    grade: 0, pool: [], rank: new Map(), used: new Set(),
    key(g) { return 'knight-typing-used-g' + g; },
    load(g) {
      this.grade = g;
      const prev = g > 1 ? byDiff(GRADES[g - 1].words) : [];
      const warmup = prev.slice(Math.floor(prev.length / 2));
      this.pool = [...new Set([...warmup, ...GRADES[g].words])];
      const sorted = byDiff(this.pool);
      this.rank = new Map(sorted.map((w, i) => [w, sorted.length > 1 ? i / (sorted.length - 1) : 0]));
      this.used = new Set(store.get(this.key(g), []).filter((w) => this.rank.has(w)));
    },
    remaining() { return this.pool.length - this.used.size; },
    next(target, avoid) {
      let free = this.pool.filter((w) => !this.used.has(w));
      if (!free.length) {
        this.used.clear();
        free = this.pool.filter((w) => w !== avoid);
        toast('ใช้คำครบทุกคำในคลังแล้ว — เริ่มสุ่มคำรอบใหม่!');
      }
      shuffle(free);
      free.sort((a, b) => Math.abs(this.rank.get(a) - target) - Math.abs(this.rank.get(b) - target));
      const k = Math.min(free.length, Math.max(4, Math.ceil(free.length * 0.08)));
      const w = free[Math.floor(Math.random() * k)];
      this.used.add(w);
      store.set(this.key(this.grade), [...this.used]);
      return w;
    },
  };

  /* ===================== state ===================== */
  const S = {
    name: '', grade: 0, gender: null, L: 1, LI: null, mapRegion: 0,
    heroHp: 100, heroMax: 100, monHp: 100, monMax: 100,
    word: '', clusters: [], last: '', wordIdx: 0,
    tLeft: 0, tMax: 1,
    combo: 0, maxCombo: 0, score: 0, keys: 0, goodKeys: 0, wrong: 0, words: 0, chars: 0, typingMs: 0,
    running: false, locked: true, paused: false, raf: 0, lastTs: 0, prevLen: 0, toldLayout: false,
  };
  SFX.on = store.get('knight-typing-sound', true);

  const el = {
    input: $('#type-input'), word: $('#word'), timer: $('#timer-fill'), fx: $('#fx'), arena: $('#arena'), landscape: $('#landscape'),
    heroActor: $('#hero-actor'), monActor: $('#mon-actor'), monFighter: $('.monster-f'),
    heroHp: $('#hero-hp'), heroHpText: $('#hero-hptext'), monHp: $('#mon-hp'), monHpText: $('#mon-hptext'), monName: $('#mon-name'),
    score: $('#tb-score'), combo: $('#tb-combo'), kb: $('#kb'), kbRows: $('#kb-rows'), kbHint: $('#kb-hint'),
  };

  /* ===================== helpers ===================== */
  function show(id) {
    $$('.screen').forEach((s) => s.classList.toggle('active', s.id === 'screen-' + id));
    window.scrollTo(0, 0);
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function segment(str) {
    if (window.Intl && Intl.Segmenter) {
      return [...new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(str)].map((x) => ({ t: x.segment, s: x.index, e: x.index + x.segment.length }));
    }
    const out = []; const re = /.[ัำ-ฺ็-๎]*/gu; let m;
    while ((m = re.exec(str))) out.push({ t: m[0], s: m.index, e: m.index + m[0].length });
    return out;
  }
  function restart(node, cls) { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); }
  let toastTimer = 0;
  function toast(msg, ms = 2800) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const starText = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);

  /* ===================== ความคืบหน้าของผู้เล่น ===================== */
  function progId() { return S.grade + '|' + S.name; }
  function getProg() {
    const all = store.get(PROG_KEY, {});
    return all[progId()] || { name: S.name, grade: S.grade, gender: null, unlocked: 1, stars: {}, best: {} };
  }
  function saveProg(p) { const all = store.get(PROG_KEY, {}); all[progId()] = p; store.set(PROG_KEY, all); }
  const sumStars = (p) => Object.values(p.stars || {}).reduce((a, b) => a + b, 0);
  const sumBest = (p) => Object.values(p.best || {}).reduce((a, b) => a + b, 0);

  /* ===================== หน้าแรก ===================== */
  $('#crest').innerHTML = ART.crest();
  const gradesBox = $('#grades');
  Object.entries(GRADES).forEach(([g, info]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'grade-btn'; b.dataset.grade = g;
    b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
    b.innerHTML = `<b>${info.label}</b><small>${info.desc}</small>`;
    b.addEventListener('click', () => selectGrade(+g));
    gradesBox.appendChild(b);
  });
  function selectGrade(g) {
    S.grade = g;
    $$('.grade-btn').forEach((b) => b.setAttribute('aria-checked', String(+b.dataset.grade === g)));
    $('#form-error').textContent = '';
    renderHall();
  }
  function renderHall() {
    const all = Object.values(store.get(PROG_KEY, {}));
    const list = (S.grade ? all.filter((r) => r.grade === S.grade) : all)
      .map((p) => ({ ...p, st: sumStars(p), sc: sumBest(p) }))
      .filter((p) => p.st > 0)
      .sort((a, b) => b.st - a.st || b.sc - a.sc).slice(0, 6);
    $('#hall-grade').textContent = S.grade ? 'ระดับชั้น ' + GRADES[S.grade].label : 'ทุกระดับชั้น';
    const ol = $('#hall-list'); ol.innerHTML = '';
    if (!list.length) { ol.innerHTML = '<li class="hall-empty">ยังไม่มีผู้กล้าคนใดจารึกชื่อ…</li>'; return; }
    list.forEach((r, i) => {
      const li = document.createElement('li');
      const reach = levelInfo(Math.min(r.unlocked, TOTAL)).code;
      li.innerHTML = `<span class="rank">${i + 1}</span><span class="who"></span><span class="pts">★ ${r.st}</span>`;
      const who = li.querySelector('.who');
      who.textContent = r.name;
      const sm = document.createElement('small');
      sm.textContent = `${GRADES[r.grade].label} · ${r.unlocked > TOTAL ? 'พิชิตครบทุกด่าน' : 'ถึงด่าน ' + reach} · ${r.sc.toLocaleString('th-TH')} คะแนน`;
      who.appendChild(sm);
      ol.appendChild(li);
    });
  }
  const lastName = store.get('knight-typing-last', null);
  if (lastName) { $('#player-name').value = lastName.name || ''; if (lastName.grade) selectGrade(lastName.grade); }
  renderHall();

  $('#start-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#player-name').value.trim();
    if (!name) { $('#form-error').textContent = 'กรุณากรอกชื่อของเจ้าก่อนนะ'; $('#player-name').focus(); return; }
    if (!S.grade) { $('#form-error').textContent = 'กรุณาเลือกระดับชั้นก่อนนะ'; return; }
    S.name = name;
    store.set('knight-typing-last', { name, grade: S.grade });
    SFX.init();
    Words.load(S.grade);
    const p = getProg();
    S.gender = p.gender;
    if (p.gender) openMap(); else openHeroSelect();
  });

  /* ===================== เลือกตัวละคร ===================== */
  $$('.hero-card-art').forEach((d) => { d.innerHTML = ART.hero(d.dataset.art); });
  function openHeroSelect() {
    $('#hero-player').textContent = S.name;
    $('#hero-grade-note').textContent = `ระดับ ${GRADES[S.grade].label} — ${GRADES[S.grade].desc}`;
    $$('.hero-card').forEach((c) => c.classList.toggle('selected', c.dataset.gender === S.gender));
    $('#btn-hero-go').disabled = !S.gender;
    show('hero');
  }
  $$('.hero-card').forEach((c) => c.addEventListener('click', () => {
    S.gender = c.dataset.gender;
    $$('.hero-card').forEach((x) => x.classList.toggle('selected', x === c));
    $('#btn-hero-go').disabled = false;
    SFX.init(); SFX.tone(660, 0.12, 'triangle', 0.08);
  }));
  $('#btn-hero-back').addEventListener('click', () => { renderHall(); show('start'); });
  $('#btn-hero-go').addEventListener('click', () => {
    const p = getProg(); p.gender = S.gender; saveProg(p);
    openMap();
  });

  /* ===================== แผนที่ด่าน ===================== */
  // ตำแหน่งด่านย่อยบนแผนที่ (เป็น % ) — แถวบนซ้าย→ขวา แถวล่างขวา→ซ้าย
  const NODE_POS = [[10, 25], [30, 25], [50, 25], [70, 25], [90, 25], [90, 75], [70, 75], [50, 75], [30, 75], [10, 75]];
  function openMap(region) {
    const p = getProg();
    const cur = Math.min(p.unlocked, TOTAL);
    S.mapRegion = region ?? Math.floor((cur - 1) / SUBS);
    $('#map-grade').textContent = GRADES[S.grade].label;
    $('#map-name').textContent = S.name;
    $('#map-stars').textContent = sumStars(p);
    const tabs = $('#region-tabs'); tabs.innerHTML = '';
    REGIONS.forEach((rg, i) => {
      const first = i * SUBS + 1, open = first <= p.unlocked;
      let st = 0; for (let L = first; L < first + SUBS; L++) st += p.stars[L] || 0;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'region-tab'; b.disabled = !open;
      b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', String(i === S.mapRegion));
      b.innerHTML = `<b>${open ? '' : '🔒 '}ด่านหลัก ${i + 1}</b><small>${rg.name} · ★${st}/30</small>`;
      b.addEventListener('click', () => openMap(i));
      tabs.appendChild(b);
    });
    const rg = REGIONS[S.mapRegion];
    $('#region-name').textContent = `ด่านหลัก ${S.mapRegion + 1} · ${rg.name}`;
    $('#region-desc').textContent = `ปราบ${rg.mobs.join(' ')} ให้ครบ 9 ด่าน แล้วโค่น${rg.boss}ในด่านที่ 10`;
    const nodes = $('#nodes'); nodes.innerHTML = '';
    for (let sub = 1; sub <= SUBS; sub++) {
      const L = S.mapRegion * SUBS + sub, open = L <= p.unlocked, stars = p.stars[L] || 0;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'node' + (sub === SUBS ? ' boss' : '') + (open && !stars ? ' open' : '');
      b.disabled = !open;
      b.style.left = NODE_POS[sub - 1][0] + '%'; b.style.top = NODE_POS[sub - 1][1] + '%';
      b.title = `ด่าน ${S.mapRegion + 1}-${sub}`;
      b.innerHTML = open
        ? `<b>${sub === SUBS ? 'บอส' : sub}</b><span class="st">${starText(stars)}</span>`
        : `<b>🔒</b>`;
      b.addEventListener('click', () => startLevel(L));
      nodes.appendChild(b);
    }
    show('map');
  }
  $('#btn-map-home').addEventListener('click', () => { renderHall(); show('start'); });
  $('#btn-map-hero').addEventListener('click', openHeroSelect);

  /* ===================== แป้นพิมพ์บนจอ ===================== */
  let kbShift = false;
  function buildKeyboard() {
    el.kbRows.innerHTML = '';
    KB_ROWS.forEach((row) => {
      const r = document.createElement('div'); r.className = 'kb-row';
      row.forEach((k) => {
        const b = document.createElement('button'); b.type = 'button'; b.tabIndex = -1;
        if (k.mod) {
          b.className = 'key mod ' + (k.cls || ''); b.textContent = k.mod;
          if (k.code) b.dataset.code = k.code;
        } else {
          b.className = 'key ' + (k.cls || ''); b.dataset.code = k.code;
          b.innerHTML = `<span>${esc(showChar(k.n))}</span><small>${esc(showChar(k.s))}</small><span class="en">${esc(k.en)}</span>`;
        }
        b.addEventListener('mousedown', (e) => e.preventDefault());
        b.addEventListener('click', () => onScreenKey(k));
        r.appendChild(b);
      });
      el.kbRows.appendChild(r);
    });
  }
  function onScreenKey(k) {
    if (k.code === 'ShiftLeft' || k.code === 'ShiftRight') { kbShift = !kbShift; $$('.key[data-code^="Shift"]').forEach((b) => b.classList.toggle('shift-on', kbShift)); return; }
    if (k.code === 'Backspace') { el.input.value = el.input.value.slice(0, -1); onInput(); }
    else if (k.code === 'Space') insertText(' ');
    else if (!k.mod) { insertText(kbShift ? k.s : k.n); if (kbShift) onScreenKey({ code: 'ShiftLeft' }); }
    el.input.focus();
  }
  function keyEls(code) { return $$(`.key[data-code="${code}"]`); }
  function highlightNext() {
    $$('.key.next').forEach((k) => k.classList.remove('next'));
    if (!S.running || S.locked) { el.kbHint.textContent = ''; return; }
    const v = el.input.value;
    if (!S.word.startsWith(v)) {
      keyEls('Backspace').forEach((k) => k.classList.add('next'));
      el.kbHint.innerHTML = 'พิมพ์ผิด! กด <b>⌫</b> เพื่อลบ';
      return;
    }
    const ch = S.word[v.length];
    if (ch === undefined) { el.kbHint.textContent = ''; return; }
    const info = CHAR_KEY[ch];
    if (!info) { el.kbHint.innerHTML = `ตัวต่อไป <b>${esc(showChar(ch))}</b>`; return; }
    keyEls(info.code).forEach((k) => k.classList.add('next'));
    if (info.shift) keyEls(LEFT_HAND.has(info.code) ? 'ShiftRight' : 'ShiftLeft').forEach((k) => k.classList.add('next'));
    el.kbHint.innerHTML = ch === ' '
      ? 'ตัวต่อไป <b>เว้นวรรค</b>'
      : `ตัวต่อไป <b>${esc(showChar(ch))}</b>${info.shift ? ' — กด Shift ค้างไว้' : ''}`;
  }
  function flashKey(code) {
    keyEls(code).forEach((k) => { k.classList.add('press'); setTimeout(() => k.classList.remove('press'), 110); });
  }

  /* ===================== การพิมพ์ ===================== */
  function insertText(t) {
    const inp = el.input, s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? inp.value.length;
    inp.value = inp.value.slice(0, s) + t + inp.value.slice(e);
    inp.selectionStart = inp.selectionEnd = s + t.length;
    onInput();
  }
  el.input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); togglePause(); return; }
    flashKey(e.code);
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
    // ถ้าเครื่องยังเป็นแป้นภาษาอังกฤษ ให้แปลงเป็นตัวอักษรไทยตามแป้นเกษมณีอัตโนมัติ
    if (e.key.length === 1 && /[!-~]/.test(e.key) && CODE_MAP[e.code]) {
      const th = CODE_MAP[e.code][e.shiftKey ? 1 : 0];
      if (th !== e.key && /[a-zA-Z]/.test(e.key) && !S.toldLayout) {
        S.toldLayout = true;
        toast('เครื่องยังเป็นแป้นภาษาอังกฤษ — เกมแปลงเป็นภาษาไทยให้อัตโนมัติแล้ว');
      }
      e.preventDefault();
      insertText(th);
    }
  });
  el.input.addEventListener('input', onInput);
  el.input.addEventListener('paste', (e) => e.preventDefault());
  el.input.addEventListener('drop', (e) => e.preventDefault());

  function onInput() {
    if (!S.running || S.locked || S.paused) { el.input.value = ''; S.prevLen = 0; return; }
    const v = el.input.value, added = v.length - S.prevLen;
    S.prevLen = v.length;
    const ok = S.word.startsWith(v);
    if (added > 0) {
      S.keys += added;
      if (ok) { S.goodKeys += added; SFX.key(); }
      else {
        S.wrong += added; SFX.wrong();
        if (S.combo) { S.combo = 0; updateHud(); }
        restart(el.input, 'shake');
      }
    }
    el.input.classList.toggle('err', !ok);
    let n = 0; while (n < v.length && v[n] === S.word[n]) n++;
    renderWord(n, !ok);
    highlightNext();
    if (v === S.word) heroAttack();
  }

  function renderWord(n, err) {
    let html = '', marked = false;
    for (const c of S.clusters) {
      let cls;
      if (c.e <= n) cls = 'done'; else if (!marked) { cls = 'cur'; marked = true; } else cls = 'todo';
      html += `<span class="${cls}">${c.t === ' ' ? '<span class="sp">␣</span>' : esc(c.t)}</span>`;
    }
    el.word.innerHTML = html;
    el.word.classList.toggle('err', !!err);
  }

  function nextWord() {
    const g = GRADES[S.grade], LI = S.LI;
    // ความยากของคำ: ตามระดับด่าน + ขยับขึ้นเล็กน้อยระหว่างการต่อสู้
    const target = Math.min(1, LI.d * 0.92 + 0.08 * (S.wordIdx / LI.words));
    S.word = Words.next(target, S.last);
    S.last = S.word; S.wordIdx++;
    S.clusters = segment(S.word);
    S.tMax = (g.tBase + g.tChar * S.word.length) * LI.timeMul;
    S.tLeft = S.tMax;
    el.input.value = ''; S.prevLen = 0; el.input.classList.remove('err');
    renderWord(0, false); restart(el.word, 'pop');
    updateTimer();
    S.locked = false;
    highlightNext();
    el.input.focus();
  }

  /* ===================== HUD ===================== */
  function updateHud() {
    const hp = Math.max(0, S.heroHp), mp = Math.max(0, S.monHp);
    el.heroHp.style.width = (hp / S.heroMax) * 100 + '%';
    el.heroHp.classList.toggle('low', hp / S.heroMax < 0.3);
    el.heroHpText.textContent = `${hp}/${S.heroMax}`;
    el.monHp.style.width = (mp / S.monMax) * 100 + '%';
    el.monHpText.textContent = `${mp}/${S.monMax}`;
    el.score.textContent = S.score.toLocaleString('th-TH');
    el.combo.querySelector('b').textContent = S.combo;
    el.combo.classList.toggle('hot', S.combo >= 3);
  }
  function updateTimer() {
    const r = Math.max(0, S.tLeft / S.tMax);
    el.timer.style.width = r * 100 + '%';
    el.timer.classList.toggle('low', r < 0.3);
  }

  /* ===================== effects ===================== */
  function posOf(node, fx = 0.5, fy = 0.45) {
    const a = el.arena.getBoundingClientRect(), r = node.getBoundingClientRect();
    return { x: r.left - a.left + r.width * fx, y: r.top - a.top + r.height * fy };
  }
  function addFx(html, cls, x, y, ms, style = '') {
    const d = document.createElement('div'); d.className = cls; d.style.cssText = `left:${x}px;top:${y}px;${style}`; d.innerHTML = html;
    el.fx.appendChild(d); setTimeout(() => d.remove(), ms);
    return d;
  }
  const SLASH_SVG = `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M12 82 Q40 40 90 14" stroke="#fffbe6" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M12 82 Q40 40 90 14" stroke="#f1d58a" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M20 92 Q55 55 94 34" stroke="#fffbe6" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/></svg>`;
  const CLAW_SVG = `<svg viewBox="0 0 100 100" width="100%" height="100%"><g stroke="#9c2e2e" stroke-width="7" stroke-linecap="round" fill="none"><path d="M24 14 Q34 50 22 88"/><path d="M48 10 Q58 50 46 92"/><path d="M72 14 Q82 50 70 88"/></g><g stroke="#ffd6c8" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M24 14 Q34 50 22 88"/><path d="M48 10 Q58 50 46 92"/><path d="M72 14 Q82 50 70 88"/></g></svg>`;
  function damageText(text, cls, node) {
    const p = posOf(node, 0.5, 0.2);
    addFx(text, 'dmg ' + cls, p.x, p.y, 1000);
  }

  /* ===================== combat ===================== */
  async function heroAttack() {
    S.locked = true;
    const LI = S.LI, ratio = S.tLeft / S.tMax;
    S.combo++; S.maxCombo = Math.max(S.maxCombo, S.combo);
    S.words++; S.chars += S.word.length;
    const crit = ratio > 0.6;
    let dmg = (LI.hp / LI.words) * (0.85 + 0.35 * ratio) * (1 + Math.min(S.combo - 1, 5) * 0.05);
    if (crit) dmg *= 1.2;
    dmg = Math.round(dmg);
    S.score += dmg * 10 + S.combo * 15 + Math.round(ratio * 50);

    restart(el.heroActor, 'attack');
    highlightNext();
    await wait(180);
    SFX.hit(crit);
    const p = posOf(el.monActor);
    addFx(SLASH_SVG, 'slash', p.x, p.y, 450);
    restart(el.monActor, 'hurt');
    damageText((crit ? 'คริติคอล! ' : '') + '-' + dmg, crit ? 'crit' : '', el.monActor);
    S.monHp = Math.max(0, S.monHp - dmg);
    updateHud();
    await wait(380);
    if (!S.running) return;
    el.heroActor.classList.remove('attack');
    if (S.monHp <= 0) monsterSlain(); else nextWord();
  }

  async function monsterAttack() {
    S.locked = true;
    const LI = S.LI;
    S.combo = 0;
    el.input.classList.remove('err');
    renderWord(S.word.length, false);     // เฉลยคำให้เห็น
    highlightNext();
    restart(el.monActor, 'mon-attack');
    await wait(200);
    const p = posOf(el.heroActor);
    if (LI.r === 4) {
      const from = posOf(el.monActor, 0.15, 0.3);
      addFx('', 'fireball', from.x, from.y, 600, `--dx:${p.x - from.x}px`);
      SFX.fire();
      await wait(380);
    }
    SFX.hurt();
    addFx(CLAW_SVG, 'claw', p.x, p.y, 450);
    restart(el.heroActor, 'hurt');
    damageText('-' + LI.atk + ' หมดเวลา!', 'hurt', el.heroActor);
    S.heroHp = Math.max(0, S.heroHp - LI.atk);
    updateHud();
    await wait(650);
    if (!S.running) return;
    if (S.heroHp <= 0) endLevel(false); else nextWord();
  }

  async function monsterSlain() {
    SFX.slain();
    restart(el.monActor, 'die');
    S.score += 300 + Math.round(S.heroHp * 3);
    updateHud();
    await wait(900);
    if (S.running) endLevel(true);
  }

  async function spawnMonster() {
    const LI = S.LI;
    S.monMax = LI.hp; S.monHp = LI.hp;
    el.monActor.className = 'actor';
    el.monActor.innerHTML = ART.monster(LI.region.art);
    const svg = el.monActor.firstElementChild;
    if (svg && LI.tint) svg.style.filter = `hue-rotate(${LI.tint}deg)`;
    el.monFighter.classList.toggle('boss', LI.boss);
    el.monName.textContent = LI.name;
    restart(el.monActor, 'enter');
    updateHud();
    el.word.innerHTML = '';
    el.timer.style.width = '100%'; el.timer.classList.remove('low');
    SFX.horn();
    const b = addFx(`ด่าน ${LI.code} · ${LI.name}<small>${LI.boss ? 'บอสใหญ่ปรากฏตัว! พิมพ์ให้ครบ ' + LI.words + ' คำเพื่อโค่นมัน' : 'พิมพ์ให้ถูกและเร็วเพื่อโจมตี!'}</small>`, 'stage-banner', 0, 0, 1750);
    b.style.left = ''; b.style.top = '';
    await wait(1750);
  }

  /* ===================== นาฬิกา ===================== */
  function tick() {
    if (!S.running) return;
    const now = performance.now();
    const dt = Math.min(1, (now - S.lastTs) / 1000);
    S.lastTs = now;
    if (!S.paused && !S.locked) {
      S.tLeft -= dt; S.typingMs += dt * 1000;
      if (S.tLeft <= 0) { S.tLeft = 0; monsterAttack(); }
      updateTimer();
    }
  }
  function startClock() { stopClock(); S.lastTs = performance.now(); S.raf = setInterval(tick, 50); }
  function stopClock() { clearInterval(S.raf); }

  async function startLevel(L) {
    SFX.init();
    if (Words.grade !== S.grade) Words.load(S.grade);
    S.L = L; S.LI = levelInfo(L);
    Object.assign(S, {
      heroHp: 100, heroMax: 100, combo: 0, maxCombo: 0, score: 0, keys: 0, goodKeys: 0, wrong: 0,
      words: 0, chars: 0, typingMs: 0, running: true, locked: true, paused: false, prevLen: 0, toldLayout: false, wordIdx: 0,
    });
    $('#tb-grade').textContent = GRADES[S.grade].label;
    $('#tb-name').textContent = S.name;
    $('#tb-level').textContent = S.LI.code;
    $('#tb-region').textContent = S.LI.region.name;
    $('#hero-hpname').textContent = S.name;
    el.landscape.className = 'r' + (S.LI.r + 1);
    el.heroActor.className = 'actor';
    el.heroActor.innerHTML = ART.hero(S.gender);
    el.input.value = ''; el.input.classList.remove('err');
    el.fx.innerHTML = '';
    show('battle');
    el.input.focus();
    startClock();
    highlightNext();
    await spawnMonster();
    if (S.running && S.L === L) nextWord();
  }

  /* ===================== pause ===================== */
  function togglePause(force) {
    if (!S.running) return;
    S.paused = typeof force === 'boolean' ? force : !S.paused;
    $('#pause-overlay').hidden = !S.paused;
    if (!S.paused) { S.lastTs = performance.now(); el.input.focus(); }
    else $('#btn-resume').focus();
  }
  $('#btn-pause').addEventListener('click', () => togglePause());
  $('#btn-resume').addEventListener('click', () => togglePause(false));
  $('#btn-quit').addEventListener('click', () => {
    S.running = false; stopClock();
    $('#pause-overlay').hidden = true; S.paused = false;
    openMap(S.LI.r);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && S.running && document.activeElement !== el.input) togglePause();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && S.running && !S.paused) togglePause(true); });
  $('#screen-battle').addEventListener('mouseup', (e) => {
    if (S.running && !S.paused && !e.target.closest('button')) el.input.focus();
  });

  const soundBtn = $('#btn-sound');
  const syncSound = () => { soundBtn.textContent = SFX.on ? '🔊' : '🔇'; soundBtn.classList.toggle('off', !SFX.on); };
  syncSound();
  soundBtn.addEventListener('click', () => { SFX.on = !SFX.on; store.set('knight-typing-sound', SFX.on); syncSound(); el.input.focus(); });
  $('#btn-kb').addEventListener('click', () => { el.kb.classList.toggle('hidden'); $('#btn-kb').classList.toggle('off', el.kb.classList.contains('hidden')); el.input.focus(); });

  /* ===================== ส่งผลการเล่นไป Google Sheets =====================
     ถ้าส่งไม่สำเร็จ (เช่น เน็ตหลุด) จะเก็บไว้ในเครื่องแล้วส่งใหม่ภายหลัง */
  const QUEUE_KEY = 'knight-typing-outbox';
  async function flushOutbox() {
    const url = window.GAME_CONFIG && window.GAME_CONFIG.SHEET_WEBAPP_URL;
    if (!url || !navigator.onLine) return;
    const box = store.get(QUEUE_KEY, []);
    if (!box.length) return;
    const left = [];
    for (const row of box) {
      try {
        await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(row) });
      } catch (e) { left.push(row); }
    }
    store.set(QUEUE_KEY, left);
  }
  function sendResult(row) {
    const box = store.get(QUEUE_KEY, []);
    box.push(row);
    store.set(QUEUE_KEY, box.slice(-200));
    flushOutbox();
  }
  window.addEventListener('online', flushOutbox);

  /* ===================== จบด่าน ===================== */
  function starSvg(on, i) {
    return `<svg viewBox="0 0 50 50" class="${on ? 'on' : ''}" style="animation-delay:${0.2 + i * 0.25}s"><path d="M25 3 L31 18 L47 19 L35 30 L39 46 L25 37 L11 46 L15 30 L3 19 L19 18Z" fill="${on ? '#e2b13c' : '#cdb995'}" stroke="${on ? '#7a5212' : '#9c8562'}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
  }
  function endLevel(win) {
    S.running = false; S.locked = true; stopClock();
    highlightNext();
    const LI = S.LI;
    const acc = S.keys ? Math.round((S.goodKeys / S.keys) * 100) : 0;
    const cpm = S.typingMs > 1000 ? Math.round(S.chars / (S.typingMs / 60000)) : 0;
    const stars = win ? (acc >= 90 && S.heroHp >= 60 ? 3 : acc >= 75 ? 2 : 1) : 0;
    if (win) SFX.win(); else SFX.lose();

    const p = getProg();
    const prevUnlocked = p.unlocked;
    if (win) {
      p.stars[LI.L] = Math.max(p.stars[LI.L] || 0, stars);
      p.best[LI.L] = Math.max(p.best[LI.L] || 0, S.score);
      p.unlocked = Math.max(p.unlocked, LI.L + 1);
    }
    p.gender = S.gender;
    saveProg(p);
    sendResult({
      time: new Date().toISOString(), name: S.name, grade: GRADES[S.grade].label, hero: S.gender === 'girl' ? 'หญิง' : 'ชาย',
      level: LI.code, main: LI.r + 1, sub: LI.sub, result: win ? 'ผ่าน' : 'ไม่ผ่าน', stars, score: S.score,
      acc, cpm, words: S.words, wrong: S.wrong, maxCombo: S.maxCombo, hp: S.heroHp,
      totalStars: sumStars(p), unlocked: levelInfo(Math.min(p.unlocked, TOTAL)).code,
    });

    const finale = win && LI.L === TOTAL;
    $('#res-title').textContent = finale ? 'พิชิตครบทุกด่าน!' : win ? `ผ่านด่าน ${LI.code}!` : `พ่ายแพ้ที่ด่าน ${LI.code}`;
    $('#res-stars').innerHTML = [0, 1, 2].map((i) => starSvg(i < stars, i)).join('');
    let msg;
    if (finale) msg = `${S.name} โค่น${LI.name}ได้สำเร็จ เจ้าคืออัศวินนักพิมพ์ตัวจริง!`;
    else if (win && LI.boss && p.unlocked > prevUnlocked) msg = `ปลดล็อกด่านหลักใหม่: ${REGIONS[LI.r + 1].name}!`;
    else if (win) msg = `${S.name} ปราบ${LI.name}ได้แล้ว — ${stars === 3 ? 'ยอดเยี่ยมมาก!' : 'ลองเก็บให้ครบ 3 ดาวนะ'}`;
    else msg = `${S.name} ฝึกอีกนิดแล้วกลับมาสู้ใหม่นะ — ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น`;
    $('#res-msg').textContent = msg;
    $('#res-art').innerHTML = ART.hero(S.gender);
    const stats = [
      ['คะแนน', S.score.toLocaleString('th-TH')],
      ['ความแม่นยำ', acc + '%'],
      ['ความเร็ว', cpm + ' ตัวอักษร/นาที'],
      ['คำที่พิมพ์ถูก', S.words + ' คำ'],
      ['คอมโบสูงสุด', S.maxCombo],
      ['คำในคลังที่ยังไม่ได้ใช้', Words.remaining() + '/' + Words.pool.length],
    ];
    $('#res-stats').innerHTML = stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    $('#btn-next').hidden = !(win && LI.L < TOTAL);
    setTimeout(() => show('result'), win ? 300 : 700);
  }
  $('#btn-next').addEventListener('click', () => startLevel(S.L + 1));
  $('#btn-again').addEventListener('click', () => startLevel(S.L));
  $('#btn-map').addEventListener('click', () => openMap(S.LI.r));

  /* ===================== init ===================== */
  $('#landscape').innerHTML = ART.landscape();
  buildKeyboard();
  flushOutbox();
})();
