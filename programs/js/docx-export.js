/* ═══════════════════════════════════════════════════════════════
   DOCX EXPORT FOR OLYMPIC GYM TRAINING PROGRAM BUILDER
   Uses the embedded docx IIFE (window.docx)
═══════════════════════════════════════════════════════════════ */

var _dlB64  = '';
var _dlFile = '';

async function exportDocx() {
  if (!STATE.days.length) { showToast('Add training days first'); return; }
  document.getElementById('loading').classList.add('show');
  await new Promise(function(r) { setTimeout(r, 60); });
  try {
    /* ── aliases ── */
    var D   = docx;
    var Doc = D.Document,   Pkr = D.Packer,      Par = D.Paragraph,  TxR = D.TextRun;
    var Tbl = D.Table,      TR  = D.TableRow,     TC  = D.TableCell,  ImgR = D.ImageRun;
    var AT  = D.AlignmentType, BS = D.BorderStyle, WT = D.WidthType;
    var ST  = D.ShadingType,   VA = D.VerticalAlign, Hdr = D.Header, Ftr = D.Footer;

    /* ── colours ── */
    var Y='F5FF00', BK='0A0A0A', D2='1A1A1A', D3='131300', D4='0D0D00', WH='FFFFFF';
    var GR='4ADE80', BL='00CFFF', OR='FF8C42', RE='F87171';

    /* ── borders ── */
    var nb   = { style:BS.NONE,   size:0,  color:'FFFFFF' };
    var nbs  = { top:nb, bottom:nb, left:nb, right:nb };
    var thn  = { style:BS.SINGLE, size:1,  color:'2A2A2A' };
    var thns = { top:thn, bottom:thn, left:thn, right:thn };
    var yb   = { style:BS.SINGLE, size:1,  color:'444400' };
    var yThk = { style:BS.THICK,  size:18, color:Y };
    var yTop = { style:BS.SINGLE, size:8,  color:Y };

    /* ── page ── */
    var PW  = 12240;
    var PH  = 15840;
    var MAR = 1080;
    var TW  = PW - MAR * 2; // 10080

    /* ── logo ── */
    var logoBytes = Uint8Array.from(atob(LOGO_B64), function(c) { return c.charCodeAt(0); });

    /* ── text/para helpers ── */
    function R(txt, o) { return new TxR(Object.assign({ text:txt, font:'Arial', size:20, color:'CCCCCC' }, o || {})); }
    function RB(txt, o) { return R(txt, Object.assign({ bold:true }, o || {})); }
    function AR(txt, o) { return new TxR(Object.assign({ text:txt, font:'Arial', size:20, color:'CCCCCC', rightToLeft:true }, o || {})); }

    function P(ch, o) {
      o = o || {};
      return new Par({ alignment: o.align || AT.LEFT, spacing:{ after: o.after||0, before: o.before||0 }, children: ch });
    }
    function PC(ch, o) { return P(ch, Object.assign({ align: AT.CENTER }, o || {})); }
    function AP(ch, o) { return new Par({ bidirectional:true, alignment:AT.RIGHT, spacing:{ after:(o&&o.after)||0, before:(o&&o.before)||0 }, children:ch }); }
    function SP(pt) { return new Par({ spacing:{ before:pt||130, after:0 }, children:[ new TxR('') ] }); }
    function LBL(txt) { return new Par({ spacing:{ before:0, after:120 }, children:[ R(txt, { size:16, color:'555533', allCaps:true }) ] }); }
    function RULE() {
      return new Par({ spacing:{ before:160, after:160 }, border:{ bottom:{ style:BS.SINGLE, size:8, color:Y, space:1 } }, children:[ new TxR('') ] });
    }

    /* ── cell helper ── */
    function C(children, w, o) {
      o = o || {};
      return new TC({
        width: { size:w, type:WT.DXA },
        shading: { fill: o.fill || BK, type: ST.CLEAR },
        margins: { top: o.mt||110, bottom: o.mb||110, left: o.ml||160, right: o.mr||160 },
        verticalAlign: o.va || VA.CENTER,
        borders: o.borders || thns,
        columnSpan: o.span,
        children: children
      });
    }

    /* ══════════════════════════════════════════════════════════
       1. PAGE HEADER (Logo + Client + Goal)
    ══════════════════════════════════════════════════════════ */
    var goalMap = { hypertrophy:'Muscle Hypertrophy', strength:'Strength', endurance:'Muscular Endurance', 'fat-loss':'Fat Loss' };
    var cn  = STATE.client.name || 'ATHLETE';
    var np  = cn.trim().split(' ');
    var cfn = np[0].toUpperCase();
    var cln = np.slice(1).join(' ').toUpperCase();

    var pageHdr = new Tbl({
      width:{ size:TW, type:WT.DXA }, columnWidths:[1100, 7200, 1780],
      rows:[ new TR({ children:[
        C([ PC([ new ImgR({ data:logoBytes, transformation:{ width:72, height:55 }, type:'png' }) ]) ],
          1100, { fill:BK, borders:nbs, mt:0, mb:0, ml:0, mr:200 }),
        C([
          P([ R('OLYMPIC GYM  —  TRAINING PROGRAM', { size:16, color:'666633', allCaps:true }) ], { after:40 }),
          P([ RB(cfn+' ', { size:54, font:'Arial Black', color:WH }), RB(cln, { size:54, font:'Arial Black', color:Y }) ], { after:40 }),
          P([ R('PERSONALISED TRAINING PLAN  |  MADE BY COACH LOAI HASSAN', { size:15, color:'555555', allCaps:true }) ]),
        ], TW-1100-1780, { fill:BK, borders:nbs, mt:0, mb:0 }),
        C([
          PC([ R('GOAL', { size:14, color:'666633', allCaps:true }) ], { after:40 }),
          PC([ RB(goalMap[STATE.client.goal] || STATE.client.goal || '—', { size:18, font:'Arial Black', color:Y }) ], { after:60 }),
          PC([ R('LEVEL', { size:14, color:'666633', allCaps:true }) ], { after:40 }),
          PC([ RB(STATE.client.level || 'Intermediate', { size:18, font:'Arial Black', color:Y }) ]),
        ], 1780, { fill:D3, borders:nbs, mt:60, mb:60, ml:120, mr:120 }),
      ]}) ]
    });

    /* ══════════════════════════════════════════════════════════
       2. PROGRAM SUMMARY TABLE
    ══════════════════════════════════════════════════════════ */
    var splitNames = { ul4:'Upper / Lower (4 days)', ppl3:'Push/Pull/Legs (3 days)', ppl6:'Push/Pull/Legs (6 days)', fb3:'Full Body (3 days)', arnold3:'Arnold Split (3 days)' };
    var periodNames = { linear:'Linear Progression', wave:'Wave Loading', dup:'Daily Undulating (DUP)', block:'Block Periodization' };
    var IBW = [2200,2840,2200,2840];

    function ihc(txt, w) {
      return C([ P([ RB(txt, { size:17, color:Y, allCaps:true }) ]) ], w,
        { fill:'1C1C00', borders:{ top:yb, bottom:{ style:BS.SINGLE,size:4,color:Y }, left:thn, right:thn }, mt:90, mb:90 });
    }
    function ivc(val, w) {
      return C([ PC([ R(val, { size:20, color:'DDDDDD' }) ]) ], w,
        { fill:D2, borders:thns, mt:90, mb:90 });
    }

    var summaryRows = [];
    summaryRows.push(new TR({ children:[ C([
      P([ RB('PROGRAM OVERVIEW', { size:22, font:'Arial Black', color:Y, allCaps:true }) ])
    ], TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yb, left:yThk }, mt:130, mb:130, ml:200, mr:200, span:4 }) ]}));

    var infoRows = [
      ['Athlete',       cn || '—',                         'Program Name', STATE.program.name || 'Training Program'],
      ['Age',           (STATE.client.age  ? STATE.client.age+' yrs' : '—'),    'Duration',   STATE.program.weeks+' Weeks'],
      ['Weight',        (STATE.client.weight ? STATE.client.weight+' kg' : '—'),'Days / Week',STATE.program.daysPerWeek],
      ['Height',        (STATE.client.height ? STATE.client.height+' cm' : '—'),'Split Type', splitNames[STATE.program.split] || STATE.program.split],
      ['Training Goal', goalMap[STATE.client.goal] || '—',                      'Periodization', periodNames[STATE.program.periodization] || STATE.program.periodization],
      ['Training Level',STATE.client.level || '—',                              'Total Days', STATE.days.length+' training days'],
    ];
    infoRows.forEach(function(r) {
      summaryRows.push(new TR({ children:[ ihc(r[0],IBW[0]), ivc(r[1],IBW[1]), ihc(r[2],IBW[2]), ivc(r[3],IBW[3]) ] }));
    });

    if (STATE.client.injuries) {
      summaryRows.push(new TR({ children:[ C([
        P([ RB('INJURIES / RESTRICTIONS: ', { size:17, color:Y }), R(STATE.client.injuries, { size:17, color:'888888' }) ]),
      ], TW, { fill:D4, borders:{ top:{ style:BS.SINGLE,size:4,color:Y }, bottom:yb, right:yb, left:yThk }, mt:110, mb:110, ml:180, mr:180, span:4 }) ]}));
    }

    var summaryTable = new Tbl({ width:{ size:TW, type:WT.DXA }, columnWidths:IBW, rows:summaryRows });

    /* ══════════════════════════════════════════════════════════
       3. VOLUME ANALYTICS TABLE
    ══════════════════════════════════════════════════════════ */
    var vol = calcVolume();
    var VOL_COLS = [2520, 1680, 1680, 4200]; // muscle | sets | target | status
    var volRows = [];

    volRows.push(new TR({ children:[ C([
      P([ RB('WEEKLY VOLUME SUMMARY', { size:20, font:'Arial Black', color:Y, allCaps:true }) ])
    ], TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yb, left:yThk }, mt:120, mb:120, ml:200, mr:200, span:4 }) ]}));

    volRows.push(new TR({ tableHeader:true, children:[
      C([ P([ RB('MUSCLE GROUP', { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[0], { fill:Y, borders:nbs, mt:100, mb:100 }),
      C([ PC([ RB('SETS/WK',    { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[1], { fill:Y, borders:nbs, mt:100, mb:100 }),
      C([ PC([ RB('TARGET',     { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[2], { fill:Y, borders:nbs, mt:100, mb:100 }),
      C([ PC([ RB('STATUS',     { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[3], { fill:Y, borders:nbs, mt:100, mb:100 }),
    ]}));

    var statusColors = { none:'555555', low:RE, optimal:GR, high:OR };
    var statusText   = { none:'Not Trained', low:'Under-Trained', optimal:'Optimal \u2713', high:'Over-Trained' };

    Object.keys(VOL_OPT).forEach(function(mg, mi) {
      var sets   = vol[mg] || 0;
      var rng    = VOL_OPT[mg];
      var status = volumeStatus(mg, sets);
      var scol   = statusColors[status];
      var stxt   = statusText[status];
      var bg     = mi % 2 === 0 ? D3 : D2;
      volRows.push(new TR({ children:[
        C([ P([ RB(mg, { size:18, color:WH }) ]) ], VOL_COLS[0], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ PC([ RB(String(sets), { size:22, color: sets===0?'444444':(status==='optimal'?GR:(status==='low'?RE:OR)) }) ]) ], VOL_COLS[1], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ PC([ R(rng[0]+'\u2013'+rng[1], { size:17, color:'777777' }) ]) ], VOL_COLS[2], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ P([ R(stxt, { size:17, color:scol }) ]) ], VOL_COLS[3], { fill:bg, borders:thns, mt:90, mb:90 }),
      ]}));
    });

    var volTable = new Tbl({ width:{ size:TW, type:WT.DXA }, columnWidths:VOL_COLS, rows:volRows });

    /* ══════════════════════════════════════════════════════════
       4. TRAINING DAY TABLES  (one per day)
    ══════════════════════════════════════════════════════════ */
    var WA = 4100, WB = 860, WC = 860, WD = 660, WE = 360; // name | reps | rest | rpe | sets
    // Extra columns for trainee: carry-from-last-week, actual-weight, actual-reps
    var WL = 1100, WF = 1100, WG = 1040; // from last week | actual weight | actual reps
    // Total = 4100+860+860+660+360+1100+1100+1040 = 10080
    var EX_COLS = [WA, WB, WC, WD, WE, WL, WF, WG];

    var dayBlocks = [];

    STATE.days.forEach(function(day, di) {
      var exRows = [];

      // Day header row - span all 7 cols
      var loadStr = day.loadStatus ? (' \u2014 Load: ' + day.loadStatus) : '';
      var loadNote = day.loadNote || '';
      exRows.push(new TR({ children:[ C([
        AP([ AR(day.label + loadStr, { bold:true, size:28, color:Y }) ]),
        P([ R(day.muscle || '', { size:18, color:'888888' }) ], { before:40 }),
        loadNote ? P([ R('\uD83D\uDCCB ' + loadNote, { size:16, color:'666633', italics:true }) ], { before:30 }) : null,
      ].filter(Boolean), TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yThk, left:yb }, mt:130, mb:130, ml:180, mr:200, span:8 }) ]}));

      // Column headers
      exRows.push(new TR({ tableHeader:true, children:[
        C([ AP([ AR('\u0627\u0633\u0645 \u0627\u0644\u062a\u0645\u0631\u064a\u0646', { bold:true, size:17, color:BK, allCaps:true }) ]) ], WA, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('REPS', { size:17, color:BK, allCaps:true }) ]) ], WB, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('REST', { size:17, color:BK, allCaps:true }) ]) ], WC, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('RPE',  { size:17, color:BK, allCaps:true }) ]) ], WD, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('SETS', { size:17, color:BK, allCaps:true }) ]) ], WE, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('ACTUAL\nWEIGHT (kg)', { size:14, color:'333300', allCaps:true }) ]) ], WF, { fill:'CCCC00', borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('ACTUAL\nREPS DONE', { size:14, color:'333300', allCaps:true }) ]) ], WG, { fill:'CCCC00', borders:nbs, mt:90, mb:90 }),
      ]}));

      // Exercise rows
      day.exercises.forEach(function(e, ei) {
        var bg  = ei % 2 === 0 ? D3 : D2;
        var num = ei + 1;
        var ytRow = e.ytLink ? P([ R('\u25B6 Form Video: ', { size:15, color:'555555', italics:true }), R(e.ytLink, { size:14, color:'4488CC', italics:true }) ], { before:20 }) : null;
        exRows.push(new TR({ children:[
          C([
            AP([ AR((num+'. ') + (e.name || '\u2014'), { size:19, color:'DDDDDD' }) ]),
            e.note ? P([ R(e.note, { size:16, color:'555555', italics:true }) ], { before:30 }) : null,
            e.muscle ? P([ R(e.muscle, { size:15, color:Y }) ], { before:20 }) : null,
            ytRow,
          ].filter(Boolean), WA, { fill:bg, borders:thns, mt:100, mb:100 }),
          C([ PC([ RB(e.reps  || '\u2014', { size:19, color:'CCCCCC' }) ]) ], WB, { fill:bg, borders:thns, mt:100, mb:100 }),
          C([ PC([ R(e.rest   || '\u2014', { size:18, color:'888888' }) ]) ], WC, { fill:bg, borders:thns, mt:100, mb:100 }),
          C([ PC([ RB(e.rpe   || '\u2014', { size:19, color:Y }) ]) ],        WD, { fill:bg, borders:thns, mt:100, mb:100 }),
          C([ PC([ RB(String(e.sets || 0), { size:22, color:Y }) ]) ],    WE, { fill:bg, borders:thns, mt:100, mb:100 }),
          C([ P([ R('', { size:18 }) ]) ], WF, { fill:'111100', borders:{ top:thn, bottom:thn, left:{ style:BS.SINGLE,size:4,color:'CCCC00' }, right:thn }, mt:100, mb:100 }),
          C([ P([ R('', { size:18 }) ]) ], WG, { fill:'111100', borders:{ top:thn, bottom:thn, left:thn, right:{ style:BS.SINGLE,size:4,color:'CCCC00' } }, mt:100, mb:100 }),
        ]}));
      });

      // Totals row
      var totalSets = day.exercises.reduce(function(a,e){ return a+(parseInt(e.sets)||0); }, 0);
      exRows.push(new TR({ children:[
        C([ P([ RB(day.exercises.length+' EXERCISES', { size:17, color:Y, allCaps:true }) ]) ], WA+WB+WC, { fill:D4, borders:{ top:{ style:BS.SINGLE,size:4,color:Y }, bottom:yb, left:yThk, right:thn }, mt:100, mb:100, span:3 }),
        C([ PC([ RB('SETS', { size:15, color:'666633', allCaps:true }) ]) ], WD, { fill:D4, borders:{ top:{ style:BS.SINGLE,size:4,color:Y }, bottom:yb, left:thn, right:thn }, mt:100, mb:100 }),
        C([ PC([ RB(String(totalSets), { size:22, color:Y }) ]) ], WE, { fill:D4, borders:{ top:{ style:BS.SINGLE,size:4,color:Y }, bottom:yb, left:thn, right:thn }, mt:100, mb:100 }),
        C([ P([ R('', { size:14 }) ]) ], WF+WG, { fill:'0D0D00', borders:{ top:{ style:BS.SINGLE,size:4,color:'CCCC00' }, bottom:yb, left:thn, right:yb }, mt:100, mb:100, span:2 }),
      ]}));

      dayBlocks.push(new Tbl({
        width:{ size:TW, type:WT.DXA },
        columnWidths: EX_COLS,
        visuallyRightToLeft: true,
        rows: exRows
      }));

      if (di < STATE.days.length - 1) dayBlocks.push(SP(180));
    });


    /* ══════════════════════════════════════════════════════════
       5. PROGRESSIVE OVERLOAD NOTES TABLE
    ══════════════════════════════════════════════════════════ */
    var progMap = {
      linear: 'Add 2.5\u20135 kg to main compound lifts each week. For accessory exercises, add reps before weight (e.g. 3\u00D78 \u2192 3\u00D710 \u2192 3\u00D712, then increase load).',
      wave:   'Week 1: 3\u00D78 @70% | Week 2: 4\u00D76 @75% | Week 3: 5\u00D74 @80% | Week 4: Deload \u2014 then repeat with increased loads.',
      dup:    'Rotate daily: Strength day (3\u20135 reps) \u2192 Hypertrophy day (8\u201312 reps) \u2192 Endurance day (15\u201320 reps). Track all loads.',
      block:  'Block 1 (Wks 1\u20134): Accumulation \u2014 high volume. Block 2 (Wks 5\u20138): Intensification \u2014 heavy loads. Block 3 (Wks 9\u201312): Realization \u2014 peak.',
    };
    var progNote = progMap[STATE.program.periodization] || 'Track every set. Add weight or reps each session.';

    var progTable = new Tbl({
      width:{ size:TW, type:WT.DXA }, columnWidths:[TW],
      rows:[ new TR({ children:[ C([
        P([ RB('PROGRESSIVE OVERLOAD PROTOCOL', { size:18, font:'Arial Black', color:Y, allCaps:true }) ], { after:80 }),
        P([ R(progNote, { size:18, color:'888888', italics:true }) ]),
      ], TW, { fill:D4, borders:{ top:yb, bottom:yb, right:yb, left:yThk }, mt:160, mb:160, ml:200, mr:200 }) ]}) ]
    });

    /* ══════════════════════════════════════════════════════════
       6. WEEKLY SCHEDULE TABLE
    ══════════════════════════════════════════════════════════ */
    var wkCols = [840, TW-840];
    var wkRows = [];
    wkRows.push(new TR({ children:[
      C([ P([ RB('WEEKLY TRAINING SCHEDULE', { size:20, font:'Arial Black', color:Y, allCaps:true }) ]) ],
        TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yb, left:yThk }, mt:120, mb:120, ml:200, mr:200, span:2 })
    ]}));
    wkRows.push(new TR({ tableHeader:true, children:[
      C([ PC([ RB('DAY', { size:16, color:BK, allCaps:true }) ]) ], wkCols[0], { fill:Y, borders:nbs, mt:90, mb:90 }),
      C([ P([ RB('SESSION', { size:16, color:BK, allCaps:true }) ]) ], wkCols[1], { fill:Y, borders:nbs, mt:90, mb:90 }),
    ]}));
    STATE.days.forEach(function(d, i) {
      var bg = i%2===0 ? D3 : D2;
      wkRows.push(new TR({ children:[
        C([ PC([ RB('Day '+(i+1), { size:18, color:Y }) ]) ], wkCols[0], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ P([ RB(d.label, { size:18, color:WH }) ]), P([ R(d.muscle||'', { size:16, color:'555555' }) ], { before:30 }) ], wkCols[1], { fill:bg, borders:thns, mt:90, mb:90 }),
      ]}));
    });
    var schedTable = new Tbl({ width:{ size:TW, type:WT.DXA }, columnWidths:wkCols, rows:wkRows });

    /* ══════════════════════════════════════════════════════════
       7. ASSEMBLE DOCUMENT
    ══════════════════════════════════════════════════════════ */
    var bodyChildren = [
      pageHdr, RULE(),
      LBL('PROGRAM OVERVIEW  ——————————————————————————————————————————————'),
      summaryTable, SP(180),
      LBL('WEEKLY SCHEDULE  ——————————————————————————————————————————————'),
      schedTable, SP(180),
      LBL('VOLUME ANALYTICS  ——————————————————————————————————————————————'),
      volTable, SP(180),
      LBL('TRAINING DAYS  ——————————————————————————————————————————————'),
    ];
    dayBlocks.forEach(function(b) { bodyChildren.push(b); });
    bodyChildren.push(SP(180));
    bodyChildren.push(progTable);
    bodyChildren.push(SP(160));
    bodyChildren.push(PC([ new ImgR({ data:logoBytes, transformation:{ width:100, height:77 }, type:'png' }) ]));
    bodyChildren.push(PC([ R('OLYMPIC GYM  |  Performance Training  |  Coach Loai Hassan', { size:16, color:'333333', allCaps:true }) ], { before:60 }));

    var doc = new Doc({
      background: { color: BK },
      sections:[{
        properties:{
          page:{ size:{ width:PW, height:PH }, margin:{ top:MAR, right:MAR, bottom:MAR, left:MAR } }
        },
        headers:{ default: new Hdr({ children:[
          new Par({ border:{ bottom:{ style:BS.SINGLE, size:8, color:Y, space:6 } }, spacing:{ after:0 }, children:[ new TxR('') ] })
        ]})},
        footers:{ default: new Ftr({ children:[
          new Par({ border:{ top:{ style:BS.SINGLE, size:8, color:Y, space:6 } }, alignment:AT.CENTER, spacing:{ before:80 }, children:[
            new TxR({ text:'OLYMPIC GYM  |  Coach Loai Hassan  |  Training Program  |  '+(STATE.client.name||'Athlete'), size:15, font:'Arial', color:'555555', allCaps:true })
          ] })
        ]})},
        children: bodyChildren
      }]
    });

    /* ── save ── */
    var fname = (STATE.client.name||'Athlete').replace(/\s+/g,'_') + '_Training_Program.docx';
    var b64   = await Pkr.toBase64String(doc);
    _dlB64 = b64; _dlFile = fname;

    var isIOS    = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);

    if (!isIOS && !isSafari) {
      var bytes = Uint8Array.from(atob(b64), function(c) { return c.charCodeAt(0); });
      var blob  = new Blob([bytes], { type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      var url   = URL.createObjectURL(blob);
      var a     = document.createElement('a');
      a.href = url; a.download = fname;
      document.body.appendChild(a); a.click();
      setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 2000);
      showToast('Exported: ' + fname + ' \u2713');
    } else {
      openDocxSheet();
    }

  } catch(err) {
    console.error('Export error:', err);
    showToast('Error: ' + err.message.substring(0, 60));
  }
  document.getElementById('loading').classList.remove('show');
}

/* ── iOS sheet for docx ── */
function openDocxSheet() {
  var dataUri = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + _dlB64;
  var el = document.getElementById;
  el('dl-fname').textContent = _dlFile;
  var link = document.getElementById('dl-link');
  link.href = dataUri;
  link.setAttribute('download', _dlFile);
  document.getElementById('dl-sheet').classList.add('show');
}
function closeDocxSheet() { document.getElementById('dl-sheet').classList.remove('show'); }
function altDocxDownload() {
  var dataUri = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + _dlB64;
  var w = window.open('', '_blank');
  if (w) {
    w.document.open();
    w.document.write('<html><head><meta name="viewport" content="width=device-width"/><title>' + _dlFile + '</title></head>');
    w.document.write('<body style="margin:0;background:#000;color:#F5FF00;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:16px;padding:24px;box-sizing:border-box;">');
    w.document.write('<p style="font-size:10px;color:#444;letter-spacing:3px;text-transform:uppercase;">Olympic Gym Training Program</p>');
    w.document.write('<a href="' + dataUri + '" download="' + _dlFile + '" style="background:#F5FF00;color:#000;padding:16px 28px;text-decoration:none;font-weight:800;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Save ' + _dlFile + '</a>');
    w.document.write('<p style="font-size:11px;color:#333;text-align:center;">Tap &amp; hold &rarr; Download Linked File</p>');
    w.document.write('</body></html>');
    w.document.close();
  } else {
    window.location.href = dataUri;
  }
}
