(function(){

/* ── 1. NEW SPLIT TEMPLATES ─────────────────────────────────────── */
SPLITS.arnold6 = {
  name:'Arnold Split (6 days)',
  days:[
    { label:'Chest & Back', muscle:'Chest + Back', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Incline Dumbbell Press',muscle:'Chest',sets:4,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Cable Crossover',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Squeeze at midline'},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Lat Pulldown',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Straight-Arm Pulldown',muscle:'Back',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Shoulders & Arms', muscle:'Shoulders + Biceps + Triceps', exercises:[
      {name:'Overhead Press',muscle:'Shoulders',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Lateral Raise (Dumbbell)',muscle:'Shoulders',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Incline Dumbbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Close-Grip Bench Press',muscle:'Triceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Overhead Triceps Extension',muscle:'Triceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Calf Raise (Standing)',muscle:'Calves',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Legs', muscle:'Quads + Hamstrings + Glutes', exercises:[
      {name:'Squat',muscle:'Quads',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:''},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Leg Press',muscle:'Quads',sets:3,reps:'10-12',rest:'2 min',rpe:'9',note:''},
      {name:'Leg Curl (Lying)',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Leg Extension',muscle:'Quads',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Calf Raise (Seated)',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Chest & Back (Round 2)', muscle:'Chest + Back', exercises:[
      {name:'Incline Bench Press',muscle:'Chest',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Dumbbell Fly',muscle:'Chest',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Dips (Chest)',muscle:'Chest',sets:3,reps:'8-12',rest:'90s',rpe:'8',note:'Lean forward'},
      {name:'T-Bar Row',muscle:'Back',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Seated Cable Row',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-10',rest:'90s',rpe:'8',note:'Bodyweight to failure'},
    ]},
    { label:'Shoulders & Arms (Round 2)', muscle:'Shoulders + Biceps + Triceps', exercises:[
      {name:'Seated Dumbbell Press',muscle:'Shoulders',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Face Pull',muscle:'Shoulders',sets:4,reps:'15-20',rest:'60s',rpe:'8',note:''},
      {name:'Preacher Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Cable Curl',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Skull Crusher',muscle:'Triceps',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Pushdown (Rope)',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Wrist Curl',muscle:'Forearms',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Legs (Round 2)', muscle:'Quads + Hamstrings + Glutes', exercises:[
      {name:'Front Squat',muscle:'Quads',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:''},
      {name:'Bulgarian Split Squat',muscle:'Glutes',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:'Each leg'},
      {name:'Deadlift',muscle:'Hamstrings',sets:3,reps:'5-6',rest:'3 min',rpe:'8',note:''},
      {name:'Hip Thrust',muscle:'Glutes',sets:4,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Leg Curl (Seated)',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Leg Extension',muscle:'Quads',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
  ]
};

SPLITS.ul3 = {
  name:'Upper / Lower / Full (3 days)',
  days:[
    { label:'Upper A', muscle:'Chest + Back + Shoulders', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Overhead Press',muscle:'Shoulders',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-10',rest:'90s',rpe:'8',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Pushdown (Rope)',muscle:'Triceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Lower A', muscle:'Quads + Hamstrings + Calves', exercises:[
      {name:'Squat',muscle:'Quads',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:''},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Leg Press',muscle:'Quads',sets:3,reps:'10-12',rest:'2 min',rpe:'9',note:''},
      {name:'Leg Curl (Lying)',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Calf Raise (Standing)',muscle:'Calves',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Plank',muscle:'Core',sets:3,reps:'60s',rest:'60s',rpe:'8',note:''},
    ]},
    { label:'Full Body B', muscle:'All Muscle Groups', exercises:[
      {name:'Deadlift',muscle:'Hamstrings',sets:3,reps:'5-6',rest:'3 min',rpe:'8',note:''},
      {name:'Incline Bench Press',muscle:'Chest',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Lat Pulldown',muscle:'Back',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Hip Thrust',muscle:'Glutes',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Lateral Raise (Dumbbell)',muscle:'Shoulders',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Hanging Knee Raise',muscle:'Core',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
  ]
};

SPLITS.bro5 = {
  name:'Body Part Split / Bro (5 days)',
  days:[
    { label:'Chest Day', muscle:'Chest', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Incline Dumbbell Press',muscle:'Chest',sets:4,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Machine Chest Press',muscle:'Chest',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Cable Crossover',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Pushdown (Rope)',muscle:'Triceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Back Day', muscle:'Back', exercises:[
      {name:'Deadlift',muscle:'Back',sets:4,reps:'5-6',rest:'3 min',rpe:'8',note:''},
      {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-10',rest:'90s',rpe:'8',note:''},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Seated Cable Row',muscle:'Back',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Barbell Shrug',muscle:'Traps',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Shoulder Day', muscle:'Shoulders', exercises:[
      {name:'Overhead Press',muscle:'Shoulders',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Lateral Raise (Dumbbell)',muscle:'Shoulders',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Face Pull',muscle:'Shoulders',sets:4,reps:'15-20',rest:'60s',rpe:'8',note:''},
      {name:'Front Raise',muscle:'Shoulders',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Shrug (Dumbbell)',muscle:'Traps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Arm Day', muscle:'Biceps + Triceps', exercises:[
      {name:'Close-Grip Bench Press',muscle:'Triceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Skull Crusher',muscle:'Triceps',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Overhead Triceps Extension',muscle:'Triceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:4,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Incline Dumbbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Wrist Curl',muscle:'Forearms',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Leg Day', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
      {name:'Squat',muscle:'Quads',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:''},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Leg Press',muscle:'Quads',sets:3,reps:'10-12',rest:'2 min',rpe:'9',note:''},
      {name:'Leg Extension',muscle:'Quads',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Leg Curl (Lying)',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Calf Raise (Seated)',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:''},
    ]},
  ]
};

/* Add new templates to the dropdown + card grid dynamically */
/* ── Arnold Split (3 days): the classic chest&back / shoulders&arms / legs rotation ── */
SPLITS.arnold3 = {
  name:'Arnold Split (3 days)',
  days:[
    { label:'Chest & Back', muscle:'Chest + Back', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:'Main compound — progress weekly'},
      {name:'Incline DB Press',muscle:'Chest',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'DB Flye',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Squeeze at the top'},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Lat Pulldown',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Straight-Arm Pulldown',muscle:'Back',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Feel the lats'},
    ]},
    { label:'Shoulders & Arms', muscle:'Shoulders + Biceps + Triceps', exercises:[
      {name:'Seated DB Press',muscle:'Shoulders',sets:4,reps:'6-8',rest:'2 min',rpe:'8',note:''},
      {name:'Lateral Raise',muscle:'Shoulders',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Rear Delt Fly',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Incline DB Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Close Grip Bench Press',muscle:'Triceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Overhead Tricep Extension',muscle:'Triceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Legs', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
      {name:'Back Squat',muscle:'Quads',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:'Main compound — progress weekly'},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:'Hip hinge'},
      {name:'Leg Press',muscle:'Quads',sets:3,reps:'10-12',rest:'2 min',rpe:'9',note:''},
      {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Hip Thrust',muscle:'Glutes',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Leg Extension',muscle:'Quads',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:'Full ROM'},
    ]},
  ]
};

/* ── PHUL 4-day: Power/Hypertrophy Upper Lower — each muscle 2×/week ── */
SPLITS.phul4 = {
  name:'PHUL — Power/Hypertrophy Upper Lower (4 days)',
  days:[
    { label:'Upper Power', muscle:'Chest + Back + Shoulders + Arms', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:4,reps:'3-5',rest:'3 min',rpe:'8',note:'Power — heavy, lower the bar slowly'},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'3-5',rest:'3 min',rpe:'8',note:'Power — brace the core'},
      {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:3,reps:'5-8',rest:'2 min',rpe:'8',note:''},
      {name:'Lat Pulldown',muscle:'Back',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'EZ Bar Skull Crusher',muscle:'Triceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
    ]},
    { label:'Lower Power', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
      {name:'Back Squat',muscle:'Quads',sets:4,reps:'3-5',rest:'3 min',rpe:'8',note:'Power — main lift'},
      {name:'Deadlift',muscle:'Hamstrings',sets:3,reps:'3-5',rest:'3 min',rpe:'8',note:'Power — flat back'},
      {name:'Leg Press',muscle:'Quads',sets:3,reps:'10-12',rest:'2 min',rpe:'9',note:''},
      {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'8-10',rest:'90s',rpe:'9',note:'Heavy — pause at the bottom'},
    ]},
    { label:'Upper Hypertrophy', muscle:'Chest + Back + Shoulders + Arms', exercises:[
      {name:'Incline Bench Press',muscle:'Chest',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:'Hypertrophy — controlled tempo'},
      {name:'Dumbbell Flye',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Big stretch at the bottom'},
      {name:'Seated Cable Row',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Straight Arm Pulldown',muscle:'Back',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Lateral Raise',muscle:'Shoulders',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Incline Dumbbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Tricep Pushdown Rope',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Lower Hypertrophy', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
      {name:'Front Squat',muscle:'Quads',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:'Hypertrophy — full depth'},
      {name:'Bulgarian Split Squat',muscle:'Quads',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:'Each leg'},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'2 min',rpe:'8',note:'Feel the hamstring stretch'},
      {name:'Hip Thrust',muscle:'Glutes',sets:3,reps:'12-15',rest:'90s',rpe:'9',note:'Squeeze at the top'},
      {name:'Leg Extension',muscle:'Quads',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Peak contraction'},
      {name:'Seated Calf Raise',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:'Slow tempo'},
    ]},
  ]
};

/* ── PHAT 5-day: Power Hypertrophy Adaptive Training (Layne Norton) ── */
SPLITS.phat5 = {
  name:'PHAT — Power Hypertrophy Adaptive Training (5 days)',
  days:[
    { label:'Upper Power', muscle:'Chest + Back + Shoulders + Arms', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:5,reps:'3-5',rest:'3 min',rpe:'8',note:'Power — heavy'},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'3-5',rest:'3 min',rpe:'8',note:'Power'},
      {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:3,reps:'5-8',rest:'2 min',rpe:'8',note:''},
      {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-8',rest:'2 min',rpe:'8',note:'Add weight when easy'},
      {name:'EZ Bar Skull Crusher',muscle:'Triceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
    ]},
    { label:'Lower Power', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
      {name:'Back Squat',muscle:'Quads',sets:4,reps:'3-5',rest:'3 min',rpe:'8',note:'Power — main lift'},
      {name:'Deadlift',muscle:'Hamstrings',sets:3,reps:'3-5',rest:'3 min',rpe:'8',note:'Power'},
      {name:'Leg Press',muscle:'Quads',sets:3,reps:'8-10',rest:'2 min',rpe:'9',note:''},
      {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'8-10',rest:'90s',rpe:'9',note:'Heavy'},
    ]},
    { label:'Back & Shoulders Hypertrophy', muscle:'Back + Shoulders', exercises:[
      {name:'Pull-Up',muscle:'Back',sets:4,reps:'8-12',rest:'2 min',rpe:'9',note:''},
      {name:'Seated Cable Row',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Single Arm Lat Pulldown',muscle:'Back',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:'Each arm'},
      {name:'Straight Arm Pulldown',muscle:'Back',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Lateral Raise',muscle:'Shoulders',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Rear Delt Dumbbell Fly',muscle:'Shoulders',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Face Pull',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'8',note:'Elbows high'},
    ]},
    { label:'Chest & Arms Hypertrophy', muscle:'Chest + Biceps + Triceps', exercises:[
      {name:'Incline Bench Press',muscle:'Chest',sets:4,reps:'8-12',rest:'90s',rpe:'8',note:''},
      {name:'Dumbbell Flye',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Cable Flye Low to High',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Close Grip Bench Press',muscle:'Triceps',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Overhead Tricep Extension DB',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:4,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Hammer Curl',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Legs Hypertrophy', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
      {name:'Front Squat',muscle:'Quads',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Leg Press',muscle:'Quads',sets:4,reps:'12-15',rest:'90s',rpe:'9',note:''},
      {name:'Bulgarian Split Squat',muscle:'Quads',sets:3,reps:'10-12',rest:'90s',rpe:'9',note:'Each leg'},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'2 min',rpe:'8',note:''},
      {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Hip Thrust',muscle:'Glutes',sets:3,reps:'12-15',rest:'90s',rpe:'9',note:''},
      {name:'Seated Calf Raise',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:''},
    ]},
  ]
};

/* ── 5/3/1: Wendler strength system — 4 days, AMRAP progression ── */
SPLITS.split531 = {
  name:'5/3/1 — Wendler Strength (4 days)',
  days:[
    { label:'Day 1 — Squat + Push', muscle:'Quads + Hamstrings + Core', exercises:[
      {name:'Back Squat',muscle:'Quads',sets:3,reps:'5 / 3 / 1',rest:'3 min',rpe:'9',note:'W1: 65%/75%/85% \u2022 W2: 70%/80%/90% \u2022 W3: 75%/85%/95% \u2014 last set AMRAP'},
      {name:'Back Squat',muscle:'Quads',sets:5,reps:'5',rest:'90s',rpe:'7',note:'FSL \u2014 5\u00D75 @ 65% of training max'},
      {name:'Leg Press',muscle:'Quads',sets:4,reps:'10-12',rest:'90s',rpe:'9',note:''},
      {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
      {name:'Hanging Knee Raise',muscle:'Core',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Day 2 — Bench + Pull', muscle:'Chest + Back + Shoulders', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:3,reps:'5 / 3 / 1',rest:'3 min',rpe:'9',note:'W1: 65%/75%/85% \u2022 W2: 70%/80%/90% \u2022 W3: 75%/85%/95% \u2014 last set AMRAP'},
      {name:'Bench Press',muscle:'Chest',sets:5,reps:'5',rest:'90s',rpe:'7',note:'FSL \u2014 5\u00D75 @ 65% of training max'},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Seated Cable Row',muscle:'Back',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Lateral Raise',muscle:'Shoulders',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Day 3 — Deadlift + Legs', muscle:'Hamstrings + Back + Calves', exercises:[
      {name:'Deadlift',muscle:'Hamstrings',sets:3,reps:'5 / 3 / 1',rest:'3 min',rpe:'9',note:'W1: 65%/75%/85% \u2022 W2: 70%/80%/90% \u2022 W3: 75%/85%/95% \u2014 last set AMRAP'},
      {name:'Deadlift',muscle:'Hamstrings',sets:5,reps:'5',rest:'90s',rpe:'7',note:'FSL \u2014 5\u00D75 @ 65% of training max'},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'2 min',rpe:'8',note:''},
      {name:'Leg Extension',muscle:'Quads',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Day 4 — Overhead Press + Arms', muscle:'Shoulders + Back + Arms', exercises:[
      {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:3,reps:'5 / 3 / 1',rest:'3 min',rpe:'9',note:'W1: 65%/75%/85% \u2022 W2: 70%/80%/90% \u2022 W3: 75%/85%/95% \u2014 last set AMRAP'},
      {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:5,reps:'5',rest:'90s',rpe:'7',note:'FSL \u2014 5\u00D75 @ 65% of training max'},
      {name:'Pull-Up',muscle:'Back',sets:5,reps:'8-10',rest:'90s',rpe:'8',note:'Add weight when easy'},
      {name:'Face Pull',muscle:'Shoulders',sets:4,reps:'15-20',rest:'60s',rpe:'8',note:'Shoulder health \u2014 elbows high'},
      {name:'Incline Dumbbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Tricep Pushdown Rope',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
  ]
};

/* ── BATMAN 5-day: trending upper-bias "superhero physique" split ── */
SPLITS.batman5 = {
  name:'Batman Split — Upper-Bias Superhero Physique (5 days)',
  days:[
    { label:'Day 1 — Chest & Back', muscle:'Chest + Back (Superhero Frame)', exercises:[
      {name:'Bench Press',muscle:'Chest',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:'Main lift — progress weekly'},
      {name:'Incline Bench Press',muscle:'Chest',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:'Upper-chest shelf'},
      {name:'Barbell Row',muscle:'Back',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:'Thickness'},
      {name:'Lat Pulldown',muscle:'Back',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:'Width'},
      {name:'Cable Flye Low to High',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Straight Arm Pulldown',muscle:'Back',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Lat stretch'},
    ]},
    { label:'Day 2 — Legs', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
      {name:'Back Squat',muscle:'Quads',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:'Main lift — keep legs strong'},
      {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'2 min',rpe:'8',note:''},
      {name:'Leg Press',muscle:'Quads',sets:3,reps:'12-15',rest:'90s',rpe:'9',note:''},
      {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:'Full ROM'},
      {name:'Hanging Knee Raise',muscle:'Core',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Day 3 — Shoulders & Arms', muscle:'Shoulders + Biceps + Triceps', exercises:[
      {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:'Main lift'},
      {name:'Lateral Raise',muscle:'Shoulders',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:'Capped delts'},
      {name:'Rear Delt Dumbbell Fly',muscle:'Shoulders',sets:3,reps:'15',rest:'60s',rpe:'9',note:''},
      {name:'EZ Bar Skull Crusher',muscle:'Triceps',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Overhead Tricep Extension DB',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Long head'},
      {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Hammer Curl',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
    { label:'Day 4 — Chest & Back II', muscle:'Chest + Back (2nd Frequency)', exercises:[
      {name:'Incline Bench Press',muscle:'Chest',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
      {name:'Dumbbell Flye',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:'Stretch'},
      {name:'Pull-Up',muscle:'Back',sets:4,reps:'6-10',rest:'2 min',rpe:'8',note:'Add weight when easy'},
      {name:'Seated Cable Row',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
      {name:'Single Arm Lat Pulldown',muscle:'Back',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:'Each arm'},
      {name:'Face Pull',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'8',note:'Posture & health'},
    ]},
    { label:'Day 5 — Shoulders & Arms II', muscle:'Shoulders + Arms (2nd Frequency)', exercises:[
      {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:'Strict, lighter than Day 3'},
      {name:'Lateral Raise',muscle:'Shoulders',sets:4,reps:'15',rest:'45s',rpe:'9',note:'High reps'},
      {name:'Machine Lateral Raise',muscle:'Shoulders',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'Close Grip Bench Press',muscle:'Triceps',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
      {name:'Tricep Pushdown Rope',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
      {name:'EZ Bar Preacher Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'9',note:''},
      {name:'Cable Hammer Curl Rope',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
    ]},
  ]
};

/* expose maps for the Excel export cover sheet */
window.splitNames = { ul4:'Upper / Lower (4 days)', ppl3:'Push/Pull/Legs (3 days)', ppl6:'Push/Pull/Legs (6 days)', fb3:'Full Body (3 days)', arnold6:'Arnold Split (6 days)', arnold3:'Arnold Split (3 days)', bro5:'Body Part Split (5 days)', ul3:'Upper/Lower/Full (3 days)', phul4:'PHUL Power/Hypertrophy (4 days)', phat5:'PHAT Power/Hypertrophy (5 days)', split531:'5/3/1 Wendler Strength (4 days)', batman5:'Batman Split (5 days)' };
window.goalMap = { hypertrophy:'Muscle Hypertrophy', strength:'Strength', endurance:'Muscular Endurance', 'fat-loss':'Fat Loss' };
window.periodNames = { linear:'Linear Progression', wave:'Wave Loading', dup:'Daily Undulating (DUP)', block:'Block Periodization' };

var splitSel = document.getElementById('split-select');
if (splitSel) {
  [['arnold6','Arnold Split (6 days) \u2014 Advanced'],['arnold3','Arnold Split (3 days) \u2014 Intermediate\u2013Advanced'],['ul3','Upper / Lower / Full (3 days)'],['bro5','Body Part Split (5 days) \u2014 Intermediate\u2013Advanced'],['phul4','PHUL Power/Hypertrophy (4 days) \u2014 Science-Based'],['phat5','PHAT Power/Hypertrophy (5 days) \u2014 Science-Based'],['split531','5/3/1 Wendler Strength (4 days) \u2014 Strength'],['batman5','Batman Split (5 days) \u2014 Trending']].forEach(function(kv){
    var o = document.createElement('option');
    o.value = kv[0]; o.textContent = kv[1];
    splitSel.appendChild(o);
  });
  var grid = document.querySelector('.split-grid');
  if (grid) {
    grid.insertAdjacentHTML('beforeend',
      '<div class="split-card" data-key="arnold6" onclick="selectSplit(\'arnold6\')"><div class="sc-name">Arnold Split</div><div class="sc-days">6 days/week \u2022 Advanced</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(245,255,0,.15);color:var(--y)">Hypertrophy</span><span class="sc-tag" style="background:rgba(255,140,66,.15);color:var(--orange)">High Volume</span></div></div>' +
      '<div class="split-card" data-key="arnold3" onclick="selectSplit(\'arnold3\')"><div class="sc-name">Arnold Split</div><div class="sc-days">3 days/week \u2022 Intermediate\u2013Advanced</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(245,255,0,.15);color:var(--y)">Hypertrophy</span><span class="sc-tag" style="background:rgba(74,222,128,.15);color:var(--green)">Classic</span></div></div>' +
      '<div class="split-card" data-key="bro5" onclick="selectSplit(\'bro5\')"><div class="sc-name">Body Part Split</div><div class="sc-days">5 days/week \u2022 Intermediate\u2013Advanced</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(245,255,0,.15);color:var(--y)">Hypertrophy</span></div></div>' +
      '<div class="split-card" data-key="ul3" onclick="selectSplit(\'ul3\')"><div class="sc-name">Upper / Lower / Full</div><div class="sc-days">3 days/week \u2022 Beginner\u2013Intermediate</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(74,222,128,.15);color:var(--green)">Strength</span><span class="sc-tag" style="background:rgba(0,207,255,.15);color:var(--blue)">Time Efficient</span></div></div>' +
      '<div class="split-card" data-key="phul4" onclick="selectSplit(\'phul4\')"><div class="sc-name">PHUL</div><div class="sc-days">4 days/week \u2022 Power + Hypertrophy</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(74,222,128,.15);color:var(--green)">Science-Based</span><span class="sc-tag" style="background:rgba(245,255,0,.15);color:var(--y)">2\u00D7 Frequency</span></div></div>' +
      '<div class="split-card" data-key="phat5" onclick="selectSplit(\'phat5\')"><div class="sc-name">PHAT</div><div class="sc-days">5 days/week \u2022 Power + Hypertrophy</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(74,222,128,.15);color:var(--green)">Science-Based</span><span class="sc-tag" style="background:rgba(255,140,66,.15);color:var(--orange)">High Volume</span></div></div>' +
      '<div class="split-card" data-key="split531" onclick="selectSplit(\'split531\')"><div class="sc-name">5/3/1 Strength</div><div class="sc-days">4 days/week \u2022 Wendler System</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(74,222,128,.15);color:var(--green)">Strength</span><span class="sc-tag" style="background:rgba(245,255,0,.15);color:var(--y)">AMRAP</span></div><div class="sc-intro">The trending "Batman" upper-bias split: chest, back, shoulders &amp; arms 2\u00D7/week \u2022 legs 1\u00D7. Superhero frame.</div></div>' +
      '<div class="split-card" data-key="batman5" onclick="selectSplit(\'batman5\')"><div class="sc-name">Batman Split</div><div class="sc-days">5 days/week \u2022 Trending \u2022 Upper-Bias</div><div class="sc-tags"><span class="sc-tag" style="background:rgba(255,140,66,.15);color:var(--orange)">Superhero Physique</span><span class="sc-tag" style="background:rgba(245,255,0,.15);color:var(--y)">Upper 2\u00D7 Freq</span></div><div class="sc-intro">The trending "Batman" split: chest, back, shoulders &amp; arms trained 2\u00D7/week \u2022 legs once. Wide, capped-delt superhero look.</div></div>'
    );
  }
}

/* selectSplit v2 — uses data-key on cards (fixes the fixed map) */
window.selectSplit = function(key){
  document.querySelectorAll('.split-card').forEach(function(c){ c.classList.remove('selected'); });
  var card = document.querySelector('.split-card[data-key="'+key+'"]');
  if (card) card.classList.add('selected');
  else {
    document.querySelectorAll('.split-card').forEach(function(c){
      var oc = c.getAttribute('onclick');
      if (oc && oc.indexOf("selectSplit('"+key+"')") >= 0) c.classList.add('selected');
    });
  }
  var sel = document.getElementById('split-select');
  if (sel) sel.value = key;
  STATE.program.split = key;
};
window.highlightSplit = window.selectSplit;

/* ── SPLIT INTRODUCTIONS — shown on every card + in the intro panel ── */
window.SPLIT_INTRO = {
  ul4:      { text:'Upper/Lower — the best all-round split for busy gym-goers. Upper body one day, lower the next: every muscle gets trained 2× per week with plenty of recovery time. The perfect balance of strength and muscle for most clients.' },
  ppl3:     { text:'Push/Pull/Legs — all pushing muscles (chest, shoulders, triceps) one day, pulling muscles (back, biceps) the next, legs on the third. The classic flexible split: 3 days = every muscle 1×/week.' },
  ppl6:     { text:'Advanced PPL: every day trained twice per week — the A day is heavy/strength, the B day is lighter/hypertrophy. Maximum weekly volume for advanced clients with time to train 6 days.' },
  fb3:      { text:'Full Body — every session trains all the major muscles 3× per week. The most science-backed choice for beginners: fastest learning on the main lifts, high frequency, low time commitment.' },
  arnold6:  { text:'The classic Arnold golden-era split: chest+back, shoulders+arms, legs — each trained twice weekly. High-volume bodybuilding with antagonist pairing for advanced clients.' },
  arnold3:  { text:'Arnold pairing on 3 days (chest+back / shoulders+arms / legs). Training antagonists together gives a huge pump and balanced development — intermediate to advanced.' },
  bro5:     { text:'One muscle per day, Monday to Friday — the bodybuilding classic. Maximum focus and volume per muscle each session; each muscle 1×/week. Best for experienced clients who recover well.' },
  ul3:      { text:'Upper / Lower / Full — a forgiving 3-day layout mixing split days with a full-body day. Great for intermediate clients who train 3 days and want balanced recovery.' },
  phul4:    { text:'PHUL — Power/Hypertrophy Upper Lower. Science-based: every muscle 2×/week; two heavy POWER days (3-5 reps) build strength, two HYPERTROPHY days (8-15 reps) build size. The best "both worlds" split.' },
  phat5:    { text:'PHAT — Power Hypertrophy Adaptive Training (Layne Norton): 2 heavy power days + 3 hypertrophy days per week. Proven for simultaneous strength and size — for committed clients training 5 days.' },
  split531: { text:'5/3/1 — Jim Wendler\u2019s strength system: 4 main lifts progress by percentages week by week (W1: 65/75/85% \u2022 W2: 70/80/90% \u2022 W3: 75/85/95%) with AMRAP last sets. Slow, safe, long-term strength.' },
  batman5:  { text:'The trending "Batman" split — upper-bias superhero physique: chest, back, shoulders and arms 2×/week for the wide, capped-delt look; legs 1×/week. Choose it for clients chasing the classic superhero frame. Keep leg day heavy!' },
};
window.updateSplitIntro = function(key){
  var box = document.getElementById('split-intro');
  if (!box) return;
  var sp = SPLITS[key], it = window.SPLIT_INTRO[key];
  if (!sp) { box.innerHTML = ''; return; }
  box.innerHTML =
    '<div class="si-name">' + sp.name + '</div>' +
    (it ? '<div class="si-text">' + it.text + '</div>' : '') +
    '<div class="si-days">' + sp.days.length + ' training days \u2022 ' + sp.days.reduce(function(a,d){ return a + d.exercises.length; }, 0) + ' exercises auto-filled</div>';
};

/* wrap selectSplit so the intro panel updates on every selection */
var _ssWithIntro = window.selectSplit;
window.selectSplit = function(key){
  _ssWithIntro(key);
  window.updateSplitIntro(key);
};
window.highlightSplit = window.selectSplit;
window.updateSplitIntro(STATE.program.split && SPLITS[STATE.program.split] ? STATE.program.split : 'ul4');

/* inject intro text into every existing split card (covers old + new cards) */
(function(){
  document.querySelectorAll('.split-card').forEach(function(c){
    if (c.querySelector('.sc-intro')) return;
    var oc = c.getAttribute('onclick') || '';
    var m = oc.match(/selectSplit\('([a-z0-9]+)'\)/);
    if (m && window.SPLIT_INTRO[m[1]]) {
      var d = document.createElement('div');
      d.className = 'sc-intro';
      d.textContent = window.SPLIT_INTRO[m[1]].text;
      c.appendChild(d);
    }
  });
})();

/* ── 2. SAVE / RESTORE / BACKUP ─────────────────────────────────── */
var LS_KEY = 'olympic_gym_program_v2';

function saveState(silent) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(STATE));
    if (!silent) markSaved();
  } catch(e) {}
}

function restoreState(json) {
  var data = JSON.parse(json);
  if (data.client)   STATE.client   = data.client;
  if (data.program)  STATE.program  = data.program;
  if (data.days)     STATE.days     = data.days;
  if (data.coachVol) STATE.coachVol = data.coachVol;
  STATE.activeDay = Math.min(data.activeDay || 0, Math.max(0, STATE.days.length - 1));
  var maxId = 1;
  STATE.days.forEach(function(d){
    if (typeof d.id === 'number' && d.id >= maxId) maxId = d.id + 1;
    (d.exercises||[]).forEach(function(e){ if (typeof e.id === 'number' && e.id >= maxId) maxId = e.id + 1; });
  });
  _uid = maxId;
  syncUI();
}

function syncUI(){
  var s = function(id,v){ var e=document.getElementById(id); if(e && v!==undefined && v!==null) e.value=v; };
  s('c-name',STATE.client.name); s('c-age',STATE.client.age); s('c-weight',STATE.client.weight);
  s('c-height',STATE.client.height); s('c-goal',STATE.client.goal); s('c-level',STATE.client.level);
  s('c-injuries',STATE.client.injuries);
  s('p-name',STATE.program.name); s('p-weeks',STATE.program.weeks); s('p-days',STATE.program.daysPerWeek);
  s('p-period',STATE.program.periodization); s('split-select',STATE.program.split);
  window.selectSplit(STATE.program.split || 'ul4');
  if (STATE.coachVol && Object.keys(STATE.coachVol).length && typeof buildVolOverrideGrid === 'function') buildVolOverrideGrid();
  if (typeof renderDays === 'function') renderDays();
}

var _saveTimer = null;
function scheduleSave(){
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(function(){ saveState(true); }, 600);
}

function markSaved(){
  var ind = document.getElementById('save-indicator');
  if (!ind) return;
  var now = new Date();
  var hh = ('0'+now.getHours()).slice(-2), mm = ('0'+now.getMinutes()).slice(-2);
  ind.textContent = '\u2713 Saved ' + hh + ':' + mm;
  ind.style.opacity = 1;
  setTimeout(function(){ ind.style.opacity = .45; }, 1500);
}

/* auto-save on any input/change event (covers all inline-handler fields,
   with a short debounce so exercise-name typing doesn't restore mid-keystroke) */
document.addEventListener('input',  function(){ scheduleSave(); }, true);
document.addEventListener('change', function(){ scheduleSave(); }, true);
window.addEventListener('beforeunload', function(){ try { saveState(true); } catch(e){} });

/* Backup card on the Athlete page */
var clientPage = document.getElementById('page-client');
if (clientPage) {
  clientPage.insertAdjacentHTML('beforeend',
    '<div class="card">' +
      '<div class="ct">\uD83D\uDCBE Save &amp; Backup</div>' +
      '<div style="font-size:11px;color:var(--muted);margin-bottom:12px;line-height:1.6">' +
        '<span style="color:var(--y);font-weight:700">\u2713 AUTO-SAVE V2:</span> This program is now saved automatically in your browser as you type \u2014 closing or refreshing the page will not lose your work anymore. Use the buttons below for extra backups or to move the program between devices.</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">' +
        '<button class="btn btn-y btn-sm" onclick="v2ExportJSON()">\u2B07 Backup JSON</button>' +
        '<button class="btn btn-o btn-sm" onclick="document.getElementById(\'v2-import-file\').click()">\uD83D\uDCE5 Import Backup</button>' +
        '<button class="btn btn-red btn-sm" onclick="v2ResetAll()">\u26D4 Reset All</button>' +
        '<span id="save-indicator" style="font-size:10px;color:var(--green);letter-spacing:1px;font-weight:700;opacity:.45;transition:opacity .3s"></span>' +
      '</div>' +
      '<input type="file" id="v2-import-file" accept=".json,application/json" style="display:none" onchange="v2ImportJSON(this)">' +
    '</div>'
  );
}

window.v2ExportJSON = function(){
  var blob = new Blob([JSON.stringify(STATE, null, 2)], { type:'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = ((STATE.client.name||'Athlete').replace(/\s+/g,'_')) + '_Program_Backup.json';
  document.body.appendChild(a); a.click();
  setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
  showToast('Backup exported \u2713');
};

window.v2ImportJSON = function(inp){
  var f = inp.files && inp.files[0];
  if (!f) return;
  var reader = new FileReader();
  reader.onload = function(ev){
    try {
      restoreState(ev.target.result);
      saveState(true);
      showToast('Backup imported \u2713');
      showPage('builder');
    } catch(e) {
      showToast('Import failed \u2014 invalid file');
    }
  };
  reader.readAsText(f);
  inp.value = '';
};

window.v2ResetAll = function(){
  if (confirm('Delete this program and reset everything? This cannot be undone.')) {
    STATE.client = { name:'', age:'', weight:'', height:'', goal:'hypertrophy', level:'intermediate', injuries:'' };
    STATE.program = { name:'', weeks:8, daysPerWeek:4, split:'ul4', periodization:'linear', startDate:'' };
    STATE.days = []; STATE.activeDay = 0; STATE.coachVol = {};
    localStorage.removeItem(LS_KEY);
    syncUI();
    showPage('client');
    showToast('Reset complete');
  }
};

window.v2SaveNow = function(){ saveState(false); showToast('Program saved \u2713'); };

/* restore on load */
try {
  var saved = localStorage.getItem(LS_KEY);
  if (saved) restoreState(saved);
} catch(e) {}

/* ── 3. DUPLICATE DAY / DUPLICATE EXERCISE ─────────────────────── */
window.duplicateDay = function(dayId){
  var src = STATE.days.find(function(d){ return d.id===dayId; });
  if (!src) return;
  var copy = {
    id: uid(), label: src.label + ' (Copy)', muscle: src.muscle,
    loadStatus: src.loadStatus, loadNote: src.loadNote,
    exercises: src.exercises.map(function(e){
      return { id: uid(), name:e.name, muscle:e.muscle, sets:e.sets, reps:e.reps, rest:e.rest, rpe:e.rpe, note:e.note, ytLink:e.ytLink||'' };
    })
  };
  var idx = STATE.days.indexOf(src);
  STATE.days.splice(idx+1, 0, copy);
  STATE.activeDay = idx + 1;
  renderDays();
  showToast('Day duplicated \u2713');
};

window.duplicateExercise = function(dayId, exId){
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if (!d) return;
  var i = d.exercises.findIndex(function(e){ return e.id===exId; });
  if (i < 0) return;
  var copy = JSON.parse(JSON.stringify(d.exercises[i]));
  copy.id = uid();
  d.exercises.splice(i+1, 0, copy);
  renderDays();
};

/* Wrap renderDays to append the v2 toolbar + per-row copy buttons */
var _v2RenderDays = renderDays;
window.renderDays = function(){
  _v2RenderDays();
  var area = document.getElementById('day-content');
  if (!area || !STATE.days.length) return;
  var d = STATE.days[STATE.activeDay];
  if (!d) return;

  /* Duplicate Day button next to Delete Day */
  var dh = area.querySelector('.day-header');
  if (dh) {
    var del = dh.querySelector('.btn-red');
    if (del) {
      var dup = document.createElement('button');
      dup.className = 'btn btn-o btn-sm';
      dup.innerHTML = '\u29C9 Duplicate Day';
      dup.setAttribute('onclick', 'duplicateDay('+d.id+')');
      del.parentNode.insertBefore(dup, del);
    }
  }

  /* Copy button per exercise row */
  area.querySelectorAll('.ex-row').forEach(function(row){
    var exId = parseInt(row.getAttribute('data-exid'), 10);
    var act = row.querySelector('.ec8');
    if (!act || isNaN(exId)) return;
    var btn = document.createElement('button');
    btn.className = 'ic-btn';
    btn.title = 'Duplicate exercise';
    btn.innerHTML = '\u29C9';
    btn.setAttribute('onclick', 'duplicateExercise('+d.id+','+exId+')');
    var delB = act.querySelector('.del-btn');
    if (delB) act.insertBefore(btn, delB); else act.appendChild(btn);
  });
};

/* ── 4. 1RM: MULTI-FORMULA UPGRADE ─────────────────────────────── */
window.calc1RM = function(){
  var w = parseFloat(gv('rm-weight'));
  var r = parseFloat(gv('rm-reps'));
  var resEl = el('rm-result'), pillEl = el('rm-percentages');
  if (!resEl || !pillEl) return;
  if (!w || !r || r < 1 || r > 15) { resEl.textContent='\u2014'; pillEl.innerHTML=''; return; }
  if (r === 1) {
    resEl.textContent = Math.round(w) + ' kg';
    pillEl.innerHTML = '';
    return;
  }
  var epley   = w * (1 + r/30);
  var brzycki = w * 36 / (37 - r);
  var lander  = 100 * w / (101.3 - 2.67123 * r);
  var avg = (epley + brzycki + lander) / 3;
  resEl.innerHTML = Math.round(avg) + ' kg <span style="font-size:15px;color:#555">avg</span>';
  var sub = '<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:8px;font-size:11px;color:#666">' +
    '<span>EPLEY <b style="color:var(--y)">'+Math.round(epley)+'kg</b></span>' +
    '<span>BRZYCKI <b style="color:var(--y)">'+Math.round(brzycki)+'kg</b></span>' +
    '<span>LANDER <b style="color:var(--y)">'+Math.round(lander)+'kg</b></span>' +
  '</div>';
  pillEl.innerHTML = [100,95,90,85,80,75,70,65].map(function(p){
    return '<div class="rm-pill"><span style="color:var(--y);font-weight:800">'+p+'%</span><br><span style="font-size:13px">'+Math.round(avg*p/100)+' kg</span></div>';
  }).join('') + sub;
};

/* ── 5. NEW TOOL CARDS (Plate Loader / BMI & TDEE / Warm-Up) ───── */
var toolsPage = document.getElementById('page-tools');
if (toolsPage) {
  toolsPage.insertAdjacentHTML('beforeend',

    /* Plate Loader */
    '<div class="card"><div class="ct">\u2696 Plate Loader Calculator</div>' +
    '<div class="grid2" style="display:grid;gap:12px">' +
      '<div class="fg"><label class="fl">Target Weight (kg)</label><input class="fi" id="pl-target" type="number" step="2.5" placeholder="100" oninput="calcPlates()"></div>' +
      '<div class="fg"><label class="fl">Barbell</label><select class="fi" id="pl-bar" onchange="calcPlates()">' +
        '<option value="20" selected>Olympic Bar \u2014 20 kg</option>' +
        '<option value="15">Women\u2019s Bar \u2014 15 kg</option>' +
        '<option value="10">Technique / EZ Bar \u2014 10 kg</option>' +
      '</select></div>' +
    '</div>' +
    '<div style="text-align:center;margin-top:8px"><div style="font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">Load Per Side (each side)</div>' +
    '<div class="rm-result-big" id="pl-result" style="font-size:34px">\u2014</div></div>' +
    '<div class="rm-pills" id="pl-plates"></div>' +
    '<div style="font-size:11px;color:#444;margin-top:10px" id="pl-note"></div></div>' +

    /* BMI & TDEE */
    '<div class="card"><div class="ct">\uD83D\uDD25 BMI &amp; Daily Calories (TDEE)</div>' +
    '<div class="grid2" style="display:grid;gap:12px">' +
      '<div class="fg"><label class="fl">Sex</label><select class="fi" id="ca-sex" onchange="calcTDEE()"><option value="m" selected>Male</option><option value="f">Female</option></select></div>' +
      '<div class="fg"><label class="fl">Age</label><input class="fi" id="ca-age" type="number" placeholder="25" oninput="calcTDEE()"></div>' +
      '<div class="fg"><label class="fl">Weight (kg)</label><input class="fi" id="ca-weight" type="number" step="0.1" placeholder="80" oninput="calcTDEE()"></div>' +
      '<div class="fg"><label class="fl">Height (cm)</label><input class="fi" id="ca-height" type="number" placeholder="175" oninput="calcTDEE()"></div>' +
      '<div class="fg" style="grid-column:1/-1"><label class="fl">Activity Level</label><select class="fi" id="ca-act" onchange="calcTDEE()">' +
        '<option value="1.2" selected>Sedentary (desk job, no exercise)</option>' +
        '<option value="1.375">Lightly Active (training 3\u20134\u00D7/week)</option>' +
        '<option value="1.55">Moderately Active (training 4\u20135\u00D7/week)</option>' +
        '<option value="1.725">Very Active (training 5\u20136\u00D7/week)</option>' +
        '<option value="1.9">Athlete (2\u00D7/day or physical job)</option>' +
      '</select></div>' +
    '</div>' +
    '<div class="rm-pills" id="td-output" style="margin-top:14px"></div>' +
    '<button class="btn btn-o btn-sm" style="margin-top:12px" onclick="v2PullAthleteStats()">\u21BB Use Athlete Profile Data</button></div>' +

    /* Warm-Up Generator */
    '<div class="card"><div class="ct">\uD83D\uDE80 Warm-Up Generator</div>' +
    '<div class="grid2" style="display:grid;gap:12px">' +
      '<div class="fg"><label class="fl">First Working Weight (kg)</label><input class="fi" id="wu-weight" type="number" step="2.5" placeholder="80" oninput="calcWarmup()"></div>' +
      '<div class="fg"><label class="fl">Main Exercise</label><input class="fi" id="wu-ex" placeholder="e.g. Squat" oninput="calcWarmup()"></div>' +
    '</div>' +
    '<div id="wu-out" style="margin-top:12px"></div>' +
    '<div style="font-size:11px;color:#444">Ramp sets before your first working set \u2014 keeps reps crisp without fatiguing you.</div></div>'
  );
}

/* ── Plate loader logic ─────────────────────────────────────── */
window.calcPlates = function(){
  var t = parseFloat(gv('pl-target'));
  var bar = parseFloat(gv('pl-bar')) || 20;
  var resEl = el('pl-result'), pillEl = el('pl-plates'), noteEl = el('pl-note');
  if (!resEl || !pillEl) return;
  if (!t || t <= bar) { resEl.textContent='\u2014'; pillEl.innerHTML=''; if(noteEl) noteEl.textContent = t && t <= bar ? 'Target must be heavier than the bar ('+bar+' kg).' : ''; return; }
  var perSide = (t - bar) / 2;
  var remaining = perSide;
  var plates = [25,20,15,10,5,2.5,1.25];
  var rows = [];
  var added = 0;
  plates.forEach(function(p){
    var n = Math.floor(remaining / p + 1e-9);
    if (n > 0) { rows.push({p:p,n:n}); remaining -= n*p; added += n*p; }
    remaining = Math.round(remaining*100)/100;
  });
  var actual = bar + added*2;
  resEl.textContent = Math.round(perSide*100)/100 + ' kg';
  pillEl.innerHTML = rows.map(function(r){
    return '<div class="rm-pill"><span style="color:var(--y);font-weight:800">'+r.p+' kg</span><br><span style="font-size:13px">\u00D7'+(r.n*2)+' <span style="font-size:9px;color:#555">(both sides)</span></span></div>';
  }).join('') || '<span style="font-size:12px;color:#777">No standard plates fit \u2014 adjust target</span>';
  if (noteEl) {
    var diff = t - actual;
    noteEl.innerHTML = 'Actual load: <b style="color:var(--green)">'+Math.round(actual*100)/100+' kg</b>' +
      (diff > 0.01 ? ' &nbsp;\u2014 <span style="color:var(--orange)">'+Math.round(diff*100)/100+' kg</span> left over (add a smaller plate or chain)' : ' &nbsp;\u2713 Exact load');
  }
};

/* ── BMI & TDEE logic ───────────────────────────────────────── */
window.v2PullAthleteStats = function(){
  put('ca-age', STATE.client.age); put('ca-weight', STATE.client.weight); put('ca-height', STATE.client.height);
  calcTDEE(); showToast('Athlete data pulled \u2713');
};
function put(id,v){ var e=document.getElementById(id); if(e && v!=='' && v!==undefined && v!==null) e.value=v; }
window.calcTDEE = function(){
  var out = el('td-output');
  if (!out) return;
  var w = parseFloat(gv('ca-weight')), h = parseFloat(gv('ca-height')), a = parseFloat(gv('ca-age'));
  var sex = gv('ca-sex') || 'm';
  var act = parseFloat(gv('ca-act')) || 1.375;
  if (!w || !h || !a) { out.innerHTML=''; return; }
  var bmi = w / Math.pow(h/100, 2);
  var bmiCol = bmi < 18.5 ? 'var(--blue)' : bmi < 25 ? 'var(--green)' : bmi < 30 ? 'var(--orange)' : 'var(--red)';
  var bmiCat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese';
  var sexAdj = sex === 'f' ? -161 : 5;
  var bmr = 10*w + 6.25*h - 5*a + sexAdj;
  var tdee = bmr * act;
  var goal = STATE.client.goal;
  var protein = Math.round(w * (goal === 'fat-loss' ? 2.2 : 1.8));
  var html =
    '<div class="rm-pill" style="min-width:110px"><span style="color:'+bmiCol+';font-weight:800">BMI '+bmi.toFixed(1)+'</span><br><span style="font-size:13px">'+bmiCat+'</span></div>' +
    '<div class="rm-pill"><span style="color:var(--y);font-weight:800">'+Math.round(bmr)+' kcal</span><br><span style="font-size:13px">BMR (at rest)</span></div>' +
    '<div class="rm-pill"><span style="color:var(--green);font-weight:800">'+Math.round(tdee)+' kcal</span><br><span style="font-size:13px">TDEE (maintenance)</span></div>' +
    '<div class="rm-pill"><span style="color:var(--y);font-weight:800">'+protein+' g</span><br><span style="font-size:13px">Protein / day</span></div>';
  out.innerHTML = html;
  /* goal-based calorie targets displayed as a second row */
  var row2 = (goal === 'fat-loss') ? 'Fat Loss target: <b>'+Math.round(tdee*0.8)+' kcal</b> \u00B7 Recomp target: <b>'+Math.round(tdee*0.9)+' kcal</b>' :
             (goal === 'hypertrophy') ? 'Lean Bulk target: <b>'+Math.round(tdee*1.1)+' kcal</b> \u00B7 Aggressive Bulk: <b>'+Math.round(tdee*1.2)+' kcal</b>' :
             'Maintain: <b>'+Math.round(tdee)+' kcal</b> \u00B7 Lean Gain: <b>'+Math.round(tdee*1.05)+' kcal</b>';
  var goalRow = document.getElementById('td-goalrow');
  if (goalRow) goalRow.remove();
  out.insertAdjacentHTML('afterend', '<div id="td-goalrow" style="text-align:center;font-size:11px;color:#999;margin-top:10px">'+row2+'</div>');
};

/* ── Warm-up generator logic ────────────────────────────────── */
window.calcWarmup = function(){
  var out = el('wu-out');
  if (!out) return;
  var w = parseFloat(gv('wu-weight'));
  var ex = gv('wu-ex');
  if (!w) { out.innerHTML=''; return; }
  var rows = [
    [40, 8, 'Bar + movement practice'],
    [60, 5, 'Add load \u2014 stay crisp'],
    [75, 3, 'Near-work ramp'],
    [87, 1, 'Final priming single'],
  ];
  var exLabel = ex ? '<span style="color:var(--y)">'+escHtml(ex)+'</span> \u2014 ' : '';
  var html = '<div style="font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">'+exLabel+'Warm-Up Ramp</div>';
  rows.forEach(function(r){
    var kg = Math.round(w * r[0]/100 / 2.5) * 2.5;
    html += '<div style="display:grid;grid-template-columns:64px 64px 1fr;gap:10px;padding:7px 10px;border:1px solid var(--b2);background:var(--c2);margin-bottom:4px;align-items:center">' +
      '<span style="color:var(--y);font-weight:800;font-size:13px">'+kg+' kg</span>' +
      '<span style="font-size:13px;color:#ccc">\u00D7'+r[1]+'</span>' +
      '<span style="font-size:11px;color:#555">'+r[2]+'</span></div>';
  });
  html += '<div style="font-size:11px;color:var(--green);margin-top:8px;font-weight:700">Then start working sets at '+Math.round(w)+' kg \u2014 you\u2019re ready.</div>';
  out.innerHTML = html;
};

/* ── 6. FIX: detached getElementById in openDocxSheet (iOS sheet bug) ── */
window.openDocxSheet = function(){
  var dataUri = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + _dlB64;
  var fnEl = document.getElementById('dl-fname');
  if (fnEl) fnEl.textContent = _dlFile;
  var link = document.getElementById('dl-link');
  if (link) {
    link.href = dataUri;
    link.setAttribute('download', _dlFile);
  }
  document.getElementById('dl-sheet').classList.add('show');
};

/* ── 7. Shortcuts: Ctrl+S saves, Ctrl+E exports docx ───────────── */
document.addEventListener('keydown', function(e){
  if (!(e.ctrlKey || e.metaKey)) return;
  var k = e.key.toLowerCase();
  if (k === 's') { e.preventDefault(); v2SaveNow(); }
  if (k === 'e') { e.preventDefault(); exportDocx(); }
});

})();
