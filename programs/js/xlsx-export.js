window.exportXlsx = async function() {
  var lo = document.getElementById('loading');
  var loTxt = lo ? lo.querySelector('div[style]') : null;
  var oldTxt = loTxt ? loTxt.textContent : '';
  if (lo) { if (loTxt) loTxt.textContent = 'BUILDING EXCEL FILE...'; lo.classList.add('show'); }
  try {
    if (!window.ExcelJS) throw new Error('Excel engine not loaded');
    var THM = (window.EXPORT_THEMES||{})[STATE.exportTheme] || (window.EXPORT_THEMES||{}).original;
    var X = window.ExcelJS;
    var wb = new X.Workbook();
    wb.creator = 'Olympic Gym — Coach Loai Hassan';

    /* theme colours in Excel ARGB format */
    var A   = 'FF'+THM.accent,     BG   = 'FF'+THM.bg,     D2   = 'FF'+THM.panel;
    var D3  = 'FF'+THM.panel2,     D4   = 'FF'+THM.panel3, TX   = 'FF'+THM.text;
    var WB_ = 'FF'+THM.writeBg,    WTX  = 'FF'+THM.writeTx, WC_  = 'FF'+THM.writeCell;
    var MUT = 'FF'+THM.muted,      MUT2 = 'FF'+THM.muted2,  BOR  = 'FF'+THM.border;
    var LNK = 'FF5588CC';

    var weeksN = Math.min(parseInt(STATE.program.weeks,10) || 8, 16);
    var splitNames = window.splitNames || {};
    var periodNames = window.periodNames || {};
    var goalMap = window.goalMap || {};

    /* ── cover sheet ── */
    var cv = wb.addWorksheet('PROGRAM', { views:[{ showGridLines:false }], properties:{ tabColor:{ argb:A } } });
    cv.columns = [{ width:20 },{ width:26 },{ width:20 },{ width:30 }];
    cv.mergeCells('A1:D1');
    var c = cv.getCell('A1');
    c.value = 'OLYMPIC GYM \u2014 TRAINING PROGRAM'; c.font = { bold:true, size:20, color:{ argb:TX }, name:'Arial Black' };
    c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:BG } }; c.alignment = { vertical:'middle', horizontal:'left' };
    cv.getRow(1).height = 34;
    cv.mergeCells('A2:D2');
    c = cv.getCell('A2'); c.value = 'PERSONALISED TRAINING PLAN  |  MADE BY COACH LOAI HASSAN';
    c.font = { size:10, color:{ argb:MUT }, italic:true };
    var info = [
      ['Athlete',        STATE.client.name || '\u2014',                'Program Name', STATE.program.name || 'Training Program'],
      ['Age',            STATE.client.age ? STATE.client.age+' yrs' : '\u2014', 'Duration', weeksN + ' Weeks'],
      ['Weight',         STATE.client.weight ? STATE.client.weight+' kg' : '\u2014', 'Days / Week', STATE.program.daysPerWeek || STATE.days.length],
      ['Height',         STATE.client.height ? STATE.client.height+' cm' : '\u2014', 'Split Type', splitNames[STATE.program.split] || STATE.program.split || '\u2014'],
      ['Training Goal',  goalMap[STATE.client.goal] || STATE.client.goal || '\u2014', 'Periodization', periodNames[STATE.program.periodization] || STATE.program.periodization || '\u2014'],
      ['Training Level', STATE.client.level || '\u2014',               'Total Days', STATE.days.length + ' training days'],
    ];
    var ir = 4;
    info.forEach(function(row){
      cv.getCell('A'+ir).value = row[0]; cv.getCell('A'+ir).font = { bold:true, size:11, color:{ argb:A } };
      cv.getCell('B'+ir).value = row[1]; cv.getCell('B'+ir).font = { size:11, color:{ argb:TX } };
      cv.getCell('C'+ir).value = row[2]; cv.getCell('C'+ir).font = { bold:true, size:11, color:{ argb:A } };
      cv.getCell('D'+ir).value = row[3]; cv.getCell('D'+ir).font = { size:11, color:{ argb:TX } };
      ir++;
    });
    if (STATE.client.injuries) {
      cv.mergeCells('A'+ir+':D'+ir);
      c = cv.getCell('A'+ir); c.value = 'INJURIES / RESTRICTIONS: ' + STATE.client.injuries;
      c.font = { size:10, color:{ argb:WTX }, italic:true }; c.fill = { type:'pattern', pattern:'solid', fgColor:{ argb:WB_ } };
      c.alignment = { wrapText:true, vertical:'middle' };
      ir += 2;
    }
    ir++;
    cv.mergeCells('A'+ir+':D'+ir);
    c = cv.getCell('A'+ir);
    c.value = 'HOW TO USE: fill WEIGHT (kg), REPS and RIR after every set. The FROM LAST WEEK columns fill THEMSELVES \u2014 they automatically show what you did the previous week. Just open next week\u2019s tab and beat your numbers.';
    c.font = { size:10, color:{ argb:MUT }, italic:true }; c.alignment = { wrapText:true, vertical:'top' };
    cv.getRow(ir).height = 46;

    /* shared layout constants — identical on every week sheet so formulas align */
    var COLS = [
      { width:36 },   /* A exercise   */
      { width:8  },   /* B set        */
      { width:16 },   /* C from-last kg   */
      { width:17 },   /* D from-last reps */
      { width:14 },   /* E actual kg      */
      { width:11 },   /* F actual reps    */
      { width:9  },   /* G rir        */
      { width:12 },   /* H form video */
    ];
    var thinB  = { style:'thin', color:{ argb:BOR } };
    var accB   = { style:'medium', color:{ argb:A } };
    var fill   = function(hex){ return { type:'pattern', pattern:'solid', fgColor:{ argb:hex } }; };

    /* ── week sheets ── */
    for (var wk = 1; wk <= weeksN; wk++) {
      var ws = wb.addWorksheet('W'+wk, { views:[{ showGridLines:false }], properties:{ tabColor:{ argb:A } } });
      ws.columns = COLS.map(function(w0){ return { width: w0.width }; });
      ws.pageSetup = { orientation:'landscape', fitToPage:true, fitToWidth:1, fitToHeight:0 };

      ws.mergeCells('A1:H1');
      c = ws.getCell('A1'); c.value = 'WEEK ' + wk + '  \u2014  ' + (STATE.program.name || 'TRAINING PROGRAM');
      c.font = { bold:true, size:16, color:{ argb:TX }, name:'Arial Black' };
      c.fill = fill(D3); c.alignment = { vertical:'middle' }; ws.getRow(1).height = 28;

      ws.mergeCells('A2:H2');
      c = ws.getCell('A2');
      c.value = wk === 1
        ? 'Week 1 \u2014 write your STARTING weights. From week 2 on, FROM LAST WEEK fills automatically from the previous tab \u2014 you always continue where you stopped.'
        : 'FROM LAST WEEK is automatic \u2014 it shows your last week\u2019s numbers. Try to beat them!';
      c.font = { size:9, color:{ argb:MUT }, italic:true }; c.alignment = { vertical:'middle', wrapText:true };

      var r = 4;
      STATE.days.forEach(function(day, di) {
        ws.mergeCells('A'+r+':H'+r);
        c = ws.getCell('A'+r);
        c.value = (day.label + (day.loadStatus ? ('  \u2014  Load: ' + day.loadStatus) : '')) + (day.muscle ? ('   \u2022   ' + day.muscle) : '');
        c.font = { bold:true, size:12, color:{ argb:A } }; c.fill = fill(D3);
        c.alignment = { vertical:'middle' }; ws.getRow(r).height = 22;
        r++;
        if (day.loadNote) {
          ws.mergeCells('A'+r+':H'+r);
          c = ws.getCell('A'+r); c.value = '\uD83D\uDCCB ' + day.loadNote;
          c.font = { size:9, color:{ argb:LBL }, italic:true }; c.alignment = { vertical:'middle', wrapText:true };
          r++;
        }

        var hdrFills = [A, A, WB_, WB_, A, A, A, A];
        var hdrText  = ['EXERCISE','SET','FROM LAST WEEK (KG)','FROM LAST WEEK (REPS)','WEIGHT (kg)','REPS','RIR','FORM VIDEO'];
        var hdrTx    = [BG, BG, WTX, WTX, BG, BG, BG, BG];
        for (var ci = 1; ci <= 8; ci++) {
          c = ws.getCell(r, ci); c.value = hdrText[ci-1];
          c.font = { bold:true, size:9, color:{ argb:hdrTx[ci-1] } };
          c.fill = fill(hdrFills[ci-1]);
          c.alignment = { horizontal:'center', vertical:'middle', wrapText:true };
          c.border = { top:thinB, bottom:thinB, left:thinB, right:thinB };
        }
        ws.getRow(r).height = 24;
        r++;

        day.exercises.forEach(function(e, ei) {
          var bg   = ei % 2 === 0 ? D2 : D3;
          var nSets = Math.max(1, parseInt(e.sets) || 1);
          var infoStr = (nSets) + ' sets \u2022 rest ' + (e.rest || '\u2014') + (e.rpe ? (' \u2022 RPE ' + e.rpe) : '');
          var link = (typeof getExerciseLink === 'function') ? getExerciseLink(e.name || '') : null;
          for (var s = 1; s <= nSets; s++) {
            var first = s === 1;
            /* A: exercise (rich text on first set) */
            c = ws.getCell(r, 1);
            if (first) {
              var rich = [ { font:{ bold:true, size:10, color:{ argb:TX } }, text:(ei+1)+'. ' + (e.name || '') } ];
              if (infoStr) rich.push({ font:{ size:8, color:{ argb:MUT2 } }, text:'\n' + infoStr + (e.note ? (' \u2022 ' + e.note) : '') });
              c.value = { richText: rich };
            } else {
              c.value = null;
            }
            c.fill = fill(bg); c.alignment = { vertical:'middle', wrapText:true };
            c.border = { top:thinB, bottom:thinB, left:thinB, right:thinB };
            ws.getRow(r).height = first ? 30 : 18;

            /* B: set label */
            c = ws.getCell(r, 2); c.value = 'SET ' + s;
            c.font = { size:9, color:{ argb:MUT2 } }; c.fill = fill(bg);
            c.alignment = { horizontal:'center', vertical:'middle' };
            c.border = { top:thinB, bottom:thinB, left:thinB, right:thinB };

            /* C+D: FROM LAST WEEK — auto formulas from previous week's actuals */
            if (wk === 1) { ws.getCell(r, 3).value = null; ws.getCell(r, 4).value = null; }
            else {
              ws.getCell(r, 3).value = { formula: 'W'+(wk-1)+'!E'+r };
              ws.getCell(r, 4).value = { formula: 'W'+(wk-1)+'!F'+r };
            }
            [3,4].forEach(function(ci2){
              c = ws.getCell(r, ci2);
              c.fill = fill(WC_); c.alignment = { horizontal:'center', vertical:'middle' };
              c.font = { size:10, bold:true, color:{ argb:WTX } };
              c.border = { top:thinB, bottom:thinB, left:thinB, right:thinB };
              c.numFmt = '0.##';
            });

            /* E/F/G: ACTUAL WEIGHT / REPS / RIR — client types here */
            [5,6,7].forEach(function(ci3){
              c = ws.getCell(r, ci3);
              c.fill = fill(WC_); c.alignment = { horizontal:'center', vertical:'middle' };
              c.font = { size:10, color:{ argb:TX } };
              c.border = { top:thinB, bottom:thinB, left:thinB, right:thinB };
              if (ci3 < 7) c.numFmt = '0.##';
            });

            /* H: form video hyperlink on first set */
            c = ws.getCell(r, 8);
            if (first && link && link.type === 'yt') {
              c.value = { text:'\u25B6 FORM', hyperlink: link.url };
              c.font = { size:9, color:{ argb:LNK }, underline:true };
            } else { c.value = null; }
            c.fill = fill(bg); c.alignment = { horizontal:'center', vertical:'middle' };
            c.border = { top:thinB, bottom:thinB, left:thinB, right:thinB };
            r++;
          }
        });

        /* totals row */
        var totalSets = day.exercises.reduce(function(a,e2){ return a+(parseInt(e2.sets)||0); }, 0);
        ws.mergeCells('A'+r+':B'+r);
        c = ws.getCell('A'+r); c.value = day.exercises.length + ' EXERCISES \u2022 ' + totalSets + ' SETS';
        c.font = { bold:true, size:10, color:{ argb:A } }; c.fill = fill(D4);
        c.alignment = { vertical:'middle' };
        ws.mergeCells('C'+r+':H'+r);
        c = ws.getCell('C'+r); c.fill = fill(D4); c.border = { top:{ style:'medium', color:{ argb:A } }, bottom:thinB, left:thinB, right:thinB };
        c = ws.getCell('A'+r); c.border = { top:{ style:'medium', color:{ argb:A } }, bottom:thinB, left:thinB, right:thinB };
        r += 2;
      });
    }

    var buffer = await wb.xlsx.writeBuffer();
    var bytes = new Uint8Array(buffer);
    var bin = '';
    for (var i0 = 0; i0 < bytes.length; i0 += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i0, i0 + 8192));
    var b64 = btoa(bin);

    var fname = (STATE.client.name||'Athlete').replace(/\s+/g,'_') + '_Training_Program.xlsx';
    window._dlB64 = b64; window._dlFile = fname;

    var isIOS    = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);
    if (!isIOS && !isSafari) {
      var blob = new Blob([bytes], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement('a');
      a.href = url; a.download = fname;
      document.body.appendChild(a); a.click();
      setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 2000);
      showToast('Exported: ' + fname + ' \u2713');
    } else {
      /* iOS sheet — same UI, xlsx mime */
      var dUri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + b64;
      document.getElementById('dl-fname').textContent = fname;
      var link = document.getElementById('dl-link');
      link.href = dUri; link.setAttribute('download', fname);
      document.getElementById('dl-sheet').classList.add('show');
    }

  } catch(err) {
    console.error('Excel export error:', err);
    showToast('Error: ' + err.message.substring(0, 60));
  }
  if (lo) { if (loTxt) loTxt.textContent = oldTxt; lo.classList.remove('show'); }
};
