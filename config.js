/* ตั้งค่าการส่งผลการเล่นไปยัง Google Sheets
   วาง URL ของ Web App ที่ได้จาก Apps Script (ลงท้ายด้วย /exec) ไว้ในเครื่องหมายคำพูดด้านล่าง
   ถ้าเว้นว่างไว้ เกมยังเล่นได้ตามปกติ เพียงแต่จะไม่ส่งผลไปที่ชีต */
window.GAME_CONFIG = {
  SHEET_WEBAPP_URL: 'https://script.google.com/macros/s/AKfycbw33-qRmLUzZdqwdMp6dESvp0dSqSTa6YJoHEA9ZM2x8sA4I-beuE5m_NzHCLuJ6NKX/exec',
};
