/* ═══════════════════════════════════════════════════════════════
   OLYMPIC GYM — TRAINING PROGRAM BUILDER
   State, Navigation, UI, Smart Features, XLSX Export
═══════════════════════════════════════════════════════════════ */

/* ── Exercise Database ─────────────────────────────────────── */
const EX_DB = {

  Chest: [
    {name:'Barbell Bench Press', yt:'https://www.youtube.com/watch?v=ejI1Nlsul9k'},
    {name:'Incline Barbell Bench Press', yt:'https://www.youtube.com/watch?v=7UB2HQg5FNY'},
    {name:'Decline Barbell Bench Press', yt:'https://www.youtube.com/watch?v=Kxt_5D2Rpgg'},
    {name:'Dumbbell Bench Press', yt:'https://www.youtube.com/watch?v=O7ECGhZj_Hc'},
    {name:'Incline Dumbbell Press', yt:'https://www.youtube.com/watch?v=6tW4LUaOxlE'},
    {name:'Decline Dumbbell Press', yt:'https://www.youtube.com/watch?v=4R_GwRhG0rY'},
    {name:'Dumbbell Flye', yt:'https://www.youtube.com/watch?v=UKwkChzThig'},
    {name:'Incline Dumbbell Flye', yt:'https://www.youtube.com/watch?v=8oR5hBwbIBc'},
    {name:'Cable Flye Low to High', yt:'https://www.youtube.com/watch?v=KFl3Re5UbPo'},
    {name:'Cable Flye High to Low', yt:'https://www.youtube.com/watch?v=cITkrjS-Lgw'},
    {name:'Cable Crossover', yt:'https://www.youtube.com/watch?v=hhruLxo9yZU'},
    {name:'Pec Deck Machine', yt:'https://www.youtube.com/watch?v=eGjt4lk6g34'},
    {name:'Chest Press Machine', yt:'https://www.youtube.com/watch?v=sqNwDkUU_Ps'},
    {name:'Push-Up', yt:'https://www.youtube.com/watch?v=WDIpL0pjun0'},
    {name:'Wide Push-Up', yt:'https://www.youtube.com/watch?v=m3FTgWtJsFE'},
    {name:'Diamond Push-Up', yt:'https://www.youtube.com/watch?v=XtU2VQVuLYs'},
    {name:'Chest Dips', yt:'https://www.youtube.com/watch?v=cz6IAayKzNA'},
    {name:'Landmine Press', yt:'https://www.youtube.com/watch?v=t9GuiNQo1O4'},
    {name:'Smith Machine Bench Press', yt:'https://www.youtube.com/watch?v=O5viuEPDXKY'},
    {name:'Floor Press', yt:'https://www.youtube.com/watch?v=9vYCwtHkWgI'},
    {name:'Svend Press', yt:'https://www.youtube.com/watch?v=HIfOPZ28elA'},
    {name:'Close Grip Bench Press', yt:'https://www.youtube.com/watch?v=XEFDMwmrLAM'},
    {name:'Paused Bench Press', yt:'https://www.youtube.com/watch?v=MJf5i-H3azU'},
    {name:'Dumbbell Pullover', yt:'https://www.youtube.com/watch?v=jQjWlIwG4sI'},
    {name:'Hex Press', yt:'https://www.youtube.com/watch?v=f7N_JpIOgOk'},,
    {name:'archer push up', yt:'https://www.youtube.com/watch?v=25t7UBYCMbE'},
    {name:'assisted chest dip (kneeling)', yt:'https://www.youtube.com/watch?v=x0ZEwvJkLqE'},
    {name:'assisted seated pectoralis major stretch with stability ball', yt:'https://www.youtube.com/watch?v=qgBno5x5ISI'},
    {name:'assisted wide-grip chest dip (kneeling)', yt:'https://www.youtube.com/watch?v=9IIEInyacFE'},
    {name:'band bench press', yt:'https://www.youtube.com/watch?v=9NGo4lZd65o'},
    {name:'band one arm twisting chest press', yt:'https://www.youtube.com/watch?v=2JdP-m3HgAM'},
    {name:'barbell decline bench press', yt:'https://www.youtube.com/watch?v=Kxt_5D2Rpgg'},
    {name:'barbell decline pullover', yt:'https://www.youtube.com/watch?v=oiaqAMEZ8QM'},
    {name:'barbell decline wide-grip press', yt:'https://www.youtube.com/watch?v=UH3w618WAAc'},
    {name:'barbell front raise and pullover', yt:'https://www.youtube.com/watch?v=X_eGLtiWZSs'},
    {name:'barbell guillotine bench press', yt:'https://www.youtube.com/watch?v=cqJ2jm_YkaU'},
    {name:'barbell incline bench press', yt:'https://www.youtube.com/watch?v=7UB2HQg5FNY'},
    {name:'barbell incline shoulder raise', yt:'https://www.youtube.com/watch?v=3Y_RFoYl-dk'},
    {name:'barbell reverse grip decline bench press', yt:'https://www.youtube.com/watch?v=buK2ovb0SL0'},
    {name:'barbell reverse grip incline bench press', yt:'https://www.youtube.com/watch?v=uBRFq6sBzlQ'},
    {name:'barbell wide bench press', yt:'https://www.youtube.com/watch?v=yVpUZ0Tbk2M'},
    {name:'barbell wide reverse grip bench press', yt:'https://www.youtube.com/watch?v=uBRFq6sBzlQ'},
    {name:'behind head chest stretch', yt:'https://www.youtube.com/watch?v=X023N-rOQf4'},
    {name:'cable bench press', yt:'https://www.youtube.com/watch?v=USAXajC6oUw'},
    {name:'cable cross-over variation', yt:'https://www.youtube.com/watch?v=hhruLxo9yZU'},
    {name:'cable decline fly', yt:'https://www.youtube.com/watch?v=1ojHAGGn1Ak'},
    {name:'cable decline one arm press', yt:'https://www.youtube.com/watch?v=-WUyklMx8BE'},
    {name:'cable decline press', yt:'https://www.youtube.com/watch?v=usCquSLSypU'},
    {name:'cable incline bench press', yt:'https://www.youtube.com/watch?v=CykW39MsXEg'},
    {name:'cable incline fly', yt:'https://www.youtube.com/watch?v=LGDCjwO-hFg'},
    {name:'cable incline fly (on stability ball)', yt:'https://www.youtube.com/watch?v=vID1feOJtOI'},
    {name:'cable low fly', yt:'https://www.youtube.com/watch?v=KFl3Re5UbPo'},
    {name:'cable lying fly', yt:'https://www.youtube.com/watch?v=lniL26nGgNI'},
    {name:'cable middle fly', yt:'https://www.youtube.com/watch?v=CT7vDnPJZ9w'},
    {name:'cable one arm decline chest fly', yt:'https://www.youtube.com/watch?v=T8xRdhQWKKo'},
    {name:'cable one arm fly on exercise ball', yt:'https://www.youtube.com/watch?v=wpHtpSJ9NBs'},
    {name:'cable one arm incline fly on exercise ball', yt:'https://www.youtube.com/watch?v=0ktZdU7re4o'},
    {name:'cable one arm incline press', yt:'https://www.youtube.com/watch?v=AOASZ8__KwQ'},
    {name:'cable one arm incline press on exercise ball', yt:'https://www.youtube.com/watch?v=yaJfDRjf69Y'},
    {name:'cable one arm lateral bent-over', yt:'https://www.youtube.com/watch?v=CmCGVns_yLw'},
    {name:'cable one arm press on exercise ball', yt:'https://www.youtube.com/watch?v=hlhdnuaUlPg'},
    {name:'cable press on exercise ball', yt:'https://www.youtube.com/watch?v=hlhdnuaUlPg'},
    {name:'cable seated chest press', yt:'https://www.youtube.com/watch?v=A3RepyBbWVI'},
    {name:'cable standing fly', yt:'https://www.youtube.com/watch?v=PRw7ieDBLl4'},
    {name:'cable standing up straight crossovers', yt:'https://www.youtube.com/watch?v=6n-kvfdYU9A'},
    {name:'cable upper chest crossovers', yt:'https://www.youtube.com/watch?v=t2C-xkBrLZM'},
    {name:'chest and front of shoulder stretch', yt:'https://www.youtube.com/watch?v=ICi4iiAn_n4'},
    {name:'chest dip', yt:'https://www.youtube.com/watch?v=cz6IAayKzNA'},
    {name:'chest dip (on dip-pull-up cage)', yt:'https://www.youtube.com/results?search_query=chest%20dip%20(on%20dip-pull-up%20cage)%20exercise%20form%20tutorial'},
    {name:'chest dip on straight bar', yt:'https://www.youtube.com/watch?v=oA8Sxv2WeOs'},
    {name:'chest stretch with exercise ball', yt:'https://www.youtube.com/watch?v=S-tvrRGnrv4'},
    {name:'chest tap push-up (male)', yt:'https://www.youtube.com/watch?v=GYEFeyp6gW0'},
    {name:'clap push up', yt:'https://www.youtube.com/watch?v=Z9psWZT0WuQ'},
    {name:'clock push-up', yt:'https://www.youtube.com/watch?v=7M-e8LMSE74'},
    {name:'decline push-up', yt:'https://www.youtube.com/watch?v=QBlYp-EwHlo'},
    {name:'deep push up', yt:'https://www.youtube.com/watch?v=5zs2clFmeqc'},
    {name:'drop push up', yt:'https://www.youtube.com/watch?v=hM93IjT_UqI'},
    {name:'dumbbell around pullover', yt:'https://www.youtube.com/watch?v=jQjWlIwG4sI'},
    {name:'dumbbell decline bench press', yt:'https://www.youtube.com/watch?v=Pf1nDoqx_1A'},
    {name:'dumbbell decline fly', yt:'https://www.youtube.com/watch?v=Mri8jOd5mKQ'},
    {name:'dumbbell decline hammer press', yt:'https://www.youtube.com/watch?v=ySeSg4lMgmE'},
    {name:'dumbbell decline one arm fly', yt:'https://www.youtube.com/watch?v=jTCZIyGgI2k'},
    {name:'dumbbell decline twist fly', yt:'https://www.youtube.com/watch?v=Xa_3nfDlRCs'},
    {name:'dumbbell fly', yt:'https://www.youtube.com/watch?v=Nhvz9EzdJ4U'},
    {name:'dumbbell fly on exercise ball', yt:'https://www.youtube.com/watch?v=blDE7baISUo'},
    {name:'dumbbell incline alternate press', yt:'https://www.youtube.com/watch?v=12zz4KCeGOQ'},
    {name:'dumbbell incline bench press', yt:'https://www.youtube.com/watch?v=LUxWvGRpwrk'},
    {name:'dumbbell incline breeding', yt:'https://www.youtube.com/watch?v=FdOfkCYBiCM'},
    {name:'dumbbell incline fly', yt:'https://www.youtube.com/watch?v=JSDpq14vCZ8'},
    {name:'dumbbell incline fly on exercise ball', yt:'https://www.youtube.com/watch?v=blDE7baISUo'},
    {name:'dumbbell incline hammer press', yt:'https://www.youtube.com/watch?v=0Wa9CfRXUkA'},
    {name:'dumbbell incline one arm fly', yt:'https://www.youtube.com/watch?v=JSDpq14vCZ8'},
    {name:'dumbbell incline one arm fly on exercise ball', yt:'https://www.youtube.com/watch?v=blDE7baISUo'},
    {name:'dumbbell incline one arm press', yt:'https://www.youtube.com/watch?v=d6Ba29xFBnw'},
    {name:'dumbbell incline one arm press on exercise ball', yt:'https://www.youtube.com/watch?v=0ktZdU7re4o'},
    {name:'dumbbell incline palm-in press', yt:'https://www.youtube.com/watch?v=QzPgxRMafWQ'},
    {name:'dumbbell incline press on exercise ball', yt:'https://www.youtube.com/watch?v=0ktZdU7re4o'},
    {name:'dumbbell incline shoulder raise', yt:'https://www.youtube.com/watch?v=tCG14rqdhUk'},
    {name:'dumbbell incline twisted flyes', yt:'https://www.youtube.com/watch?v=ssiFwHINCYk'},
    {name:'dumbbell lying hammer press', yt:'https://www.youtube.com/watch?v=ySeSg4lMgmE'},
    {name:'dumbbell lying one arm press', yt:'https://www.youtube.com/watch?v=XpSAXxDHkVw'},
    {name:'dumbbell lying one arm press v. 2', yt:'https://www.youtube.com/watch?v=XpSAXxDHkVw'},
    {name:'dumbbell lying pullover on exercise ball', yt:'https://www.youtube.com/watch?v=V06XlQStxi0'},
    {name:'dumbbell one arm bench fly', yt:'https://www.youtube.com/watch?v=7LnGW4ik3hU'},
    {name:'dumbbell one arm chest fly on exercise ball', yt:'https://www.youtube.com/watch?v=rOYnzZDhePo'},
    {name:'dumbbell one arm decline chest press', yt:'https://www.youtube.com/watch?v=Pf1nDoqx_1A'},
    {name:'dumbbell one arm fly on exercise ball', yt:'https://www.youtube.com/watch?v=rOYnzZDhePo'},
    {name:'dumbbell one arm incline chest press', yt:'https://www.youtube.com/watch?v=d6Ba29xFBnw'},
    {name:'dumbbell one arm press on exercise ball', yt:'https://www.youtube.com/watch?v=l7Gpjew2Psw'},
    {name:'dumbbell one arm pullover on exercise ball', yt:'https://www.youtube.com/watch?v=V06XlQStxi0'},
    {name:'dumbbell one arm reverse grip press', yt:'https://www.youtube.com/watch?v=uBRFq6sBzlQ'},
    {name:'dumbbell one leg fly on exercise ball', yt:'https://www.youtube.com/watch?v=Z85aeAVwXoM'},
    {name:'dumbbell press on exercise ball', yt:'https://www.youtube.com/watch?v=qxQz6voPBl8'},
    {name:'dumbbell pullover hip extension on exercise ball', yt:'https://www.youtube.com/watch?v=ckaMkuLDPXs'},
    {name:'dumbbell pullover on exercise ball', yt:'https://www.youtube.com/watch?v=4VpxTZExMxY'},
    {name:'dumbbell reverse bench press', yt:'https://www.youtube.com/watch?v=uBRFq6sBzlQ'},
    {name:'dumbbell straight arm pullover', yt:'https://www.youtube.com/watch?v=L7xj7VgGSlY'},
    {name:'dynamic chest stretch (male)', yt:'https://www.youtube.com/watch?v=VA73wlICf_g'},
    {name:'exercise ball pike push up', yt:'https://www.youtube.com/watch?v=hiIUR8HMDKY'},
    {name:'floor fly (with barbell)', yt:'https://www.youtube.com/watch?v=AM6pUVHLLd8'},
    {name:'full planche push-up', yt:'https://www.youtube.com/watch?v=CGeBvG5XP7U'},
    {name:'hands bike', yt:'https://www.youtube.com/watch?v=lAXk9H7eXqg'},
    {name:'hyght dumbbell fly', yt:'https://www.youtube.com/watch?v=paEjFeIxtzE'},
    {name:'incline push up depth jump', yt:'https://www.youtube.com/watch?v=x3UvaySw0ys'},
    {name:'incline push-up', yt:'https://www.youtube.com/watch?v=yAbg3_pJKvw'},
    {name:'incline push-up (on box)', yt:'https://www.youtube.com/watch?v=FxGKkZ9cZto'},
    {name:'incline reverse grip push-up', yt:'https://www.youtube.com/watch?v=yDxb2-4Fab4'},
    {name:'incline scapula push up', yt:'https://www.youtube.com/watch?v=rqHX-1ogNSE'},
    {name:'isometric chest squeeze', yt:'https://www.youtube.com/watch?v=2gSKebltFrI'},
    {name:'isometric wipers', yt:'https://www.youtube.com/watch?v=HwtOyxT6-jo'},
    {name:'kettlebell alternating press on floor', yt:'https://www.youtube.com/watch?v=Uf1jY-575lo'},
    {name:'kettlebell extended range one arm press on floor', yt:'https://www.youtube.com/watch?v=p_pf8S5vpTU'},
    {name:'kettlebell one arm floor press', yt:'https://www.youtube.com/watch?v=P_ijh09h23s'},
    {name:'kettlebell plyo push-up', yt:'https://www.youtube.com/watch?v=hw14FbggBy4'},
    {name:'kneeling push-up (male)', yt:'https://www.youtube.com/watch?v=bisvJ-SEoL8'},
    {name:'korean dips', yt:'https://www.youtube.com/watch?v=Faqsu1lTses'},
    {name:'lever chest press', yt:'https://www.youtube.com/watch?v=UoCIc9W6Mnw'},
    {name:'lever decline chest press', yt:'https://www.youtube.com/watch?v=_DsWm45BCqg'},
    {name:'lever incline chest press', yt:'https://www.youtube.com/watch?v=o5ZkpyJIUD8'},
    {name:'lever incline chest press v. 2', yt:'https://www.youtube.com/watch?v=6tW4LUaOxlE'},
    {name:'lever seated fly', yt:'https://www.youtube.com/watch?v=eGjt4lk6g34'},
    {name:'lever standing chest press', yt:'https://www.youtube.com/watch?v=Rdsw0fSpUxE'},
    {name:'machine inner chest press', yt:'https://www.youtube.com/watch?v=sqNwDkUU_Ps'},
    {name:'medicine ball chest pass', yt:'https://www.youtube.com/watch?v=Jo2on0-YBPM'},
    {name:'medicine ball chest push from 3 point stance', yt:'https://www.youtube.com/watch?v=GtpCF3n_3Qw'},
    {name:'medicine ball chest push multiple response', yt:'https://www.youtube.com/watch?v=3S_xNmK-QJQ'},
    {name:'medicine ball chest push single response', yt:'https://www.youtube.com/watch?v=8uEWEYahoXg'},
    {name:'medicine ball chest push with run release', yt:'https://www.youtube.com/watch?v=UZzTcPlsOHo'},
    {name:'modified hindu push-up (male)', yt:'https://www.youtube.com/watch?v=WYWPLwThE0g'},
    {name:'plyo push up', yt:'https://www.youtube.com/watch?v=6n3f98z0BOc'},
    {name:'push and pull bodyweight', yt:'https://www.youtube.com/watch?v=yXH_TVUepWc'},
    {name:'push up on bosu ball', yt:'https://www.youtube.com/watch?v=O9Y3SX3edKk'},
    {name:'push-up (bosu ball)', yt:'https://www.youtube.com/watch?v=EYpgYmcldn8'},
    {name:'push-up (on stability ball)', yt:'https://www.youtube.com/watch?v=yIlcHgMVvfU'},
    {name:'push-up (wall)', yt:'https://www.youtube.com/watch?v=3OM4y5rXM8c'},
    {name:'push-up (wall) v. 2', yt:'https://www.youtube.com/watch?v=3OM4y5rXM8c'},
    {name:'push-up medicine ball', yt:'https://www.youtube.com/watch?v=-cqo-oailwk'},
    {name:'push-up plus', yt:'https://www.youtube.com/watch?v=ibNtWB_Jz_E'},
    {name:'raise single arm push-up', yt:'https://www.youtube.com/watch?v=JiHkxqbhNuw'},
    {name:'resistance band seated chest press', yt:'https://www.youtube.com/watch?v=9NGo4lZd65o'},
    {name:'roller seated shoulder flexor depresor retractor', yt:'https://www.youtube.com/watch?v=A_uHg6ZpQQg'},
    {name:'roller seated single leg shoulder flexor depresor retractor', yt:'https://www.youtube.com/watch?v=A_uHg6ZpQQg'},
    {name:'scapula push-up', yt:'https://www.youtube.com/watch?v=huGj4aBk9C4'},
    {name:'shoulder tap push-up', yt:'https://www.youtube.com/watch?v=EvtbNQBLHHM'},
    {name:'single arm push-up', yt:'https://www.youtube.com/watch?v=JiHkxqbhNuw'},
    {name:'smith bench press', yt:'https://www.youtube.com/watch?v=O5viuEPDXKY'},
    {name:'smith decline bench press', yt:'https://www.youtube.com/watch?v=74TpXRT3zj8'},
    {name:'smith decline reverse-grip press', yt:'https://www.youtube.com/watch?v=fg3QlcAwGaY'},
    {name:'smith incline bench press', yt:'https://www.youtube.com/watch?v=Om51BfKRQJM'},
    {name:'smith incline reverse-grip press', yt:'https://www.youtube.com/watch?v=b-dpStaQc0k'},
    {name:'smith incline shoulder raises', yt:'https://www.youtube.com/watch?v=8urE8Z8AMQ4'},
    {name:'smith machine reverse decline close grip bench press', yt:'https://www.youtube.com/watch?v=bItVeAdZTxM'},
    {name:'smith reverse-grip press', yt:'https://www.youtube.com/watch?v=Zkl8oxjmQyY'},
    {name:'smith wide grip bench press', yt:'https://www.youtube.com/watch?v=AK0ycfB_kYo'},
    {name:'smith wide grip decline bench press', yt:'https://www.youtube.com/watch?v=RqxcpS7IJu0'},
    {name:'superman push-up', yt:'https://www.youtube.com/watch?v=BsYgGxETwgs'},
    {name:'suspended push-up', yt:'https://www.youtube.com/watch?v=LWGm1xC_fgU'},
    {name:'weighted drop push up', yt:'https://www.youtube.com/watch?v=xi4u8iFnjr8'},
    {name:'weighted straight bar dip', yt:'https://www.youtube.com/watch?v=gTyaLS1Xwh4'},
    {name:'weighted svend press', yt:'https://www.youtube.com/watch?v=imI1GNSNbis'},
    {name:'wide hand push up', yt:'https://www.youtube.com/watch?v=B78GwfC-87Y'},
    {name:'wide-grip chest dip on high parallel bars', yt:'https://www.youtube.com/watch?v=bd-eYgKJUdc'}
  ],

  Back: [
    {name:'Conventional Deadlift', yt:'https://www.youtube.com/watch?v=GxsLrTzyGUU'},
    {name:'Sumo Deadlift', yt:'https://www.youtube.com/watch?v=pfSMst14EFk'},
    {name:'Trap Bar Deadlift', yt:'https://www.youtube.com/watch?v=FYx76NSijfU'},
    {name:'Pull-Up', yt:'https://www.youtube.com/results?search_query=Pull-Up%20exercise%20form%20tutorial'},
    {name:'Chin-Up', yt:'https://www.youtube.com/watch?v=Ln3gAdHr8MM'},
    {name:'Wide Grip Pull-Up', yt:'https://www.youtube.com/results?search_query=Wide%20Grip%20Pull-Up%20exercise%20form%20tutorial'},
    {name:'Neutral Grip Pull-Up', yt:'https://www.youtube.com/watch?v=cd_38C6LuvY'},
    {name:'Lat Pulldown', yt:'https://www.youtube.com/watch?v=JGeRYIZdojU'},
    {name:'Wide Grip Lat Pulldown', yt:'https://www.youtube.com/watch?v=7JnP8dFbS14'},
    {name:'Close Grip Lat Pulldown', yt:'https://www.youtube.com/watch?v=IjoFCmLX7z0'},
    {name:'Single Arm Lat Pulldown', yt:'https://www.youtube.com/watch?v=XbZgoSNJXm4'},
    {name:'Barbell Row', yt:'https://www.youtube.com/watch?v=qXrTDQG1oUQ'},
    {name:'Pendlay Row', yt:'https://www.youtube.com/watch?v=nEj-WeCB5AI'},
    {name:'Dumbbell Row Single Arm', yt:'https://www.youtube.com/watch?v=ZRSGpBUVcNw'},
    {name:'Seated Cable Row', yt:'https://www.youtube.com/watch?v=lJoozxC0Rns'},
    {name:'T-Bar Row', yt:'https://www.youtube.com/watch?v=CRpez9nWVH0'},
    {name:'Chest Supported Row', yt:'https://www.youtube.com/watch?v=G6q02UC52xQ'},
    {name:'Rack Pull', yt:'https://www.youtube.com/watch?v=9vYBWV5OeKg'},
    {name:'Good Morning', yt:'https://www.youtube.com/watch?v=nczH_7m1TnI'},
    {name:'Face Pull', yt:'https://www.youtube.com/watch?v=0Po47vvj9g4'},
    {name:'Straight Arm Pulldown', yt:'https://www.youtube.com/watch?v=pp_n3XTFEOQ'},
    {name:'Inverted Row', yt:'https://www.youtube.com/watch?v=9fItzuh9Iok'},
    {name:'Cable Pullover', yt:'https://www.youtube.com/watch?v=Kjew7DbVAD8'},
    {name:'Scapular Pull-Up', yt:'https://www.youtube.com/watch?v=pE8PJsWEV7k'},
    {name:'Machine Row', yt:'https://www.youtube.com/watch?v=NYok5zjbDcw'},
    {name:'Banded Pull Apart', yt:'https://www.youtube.com/watch?v=stwYTTPXubo'},
    {name:'Underhand Barbell Row', yt:'https://www.youtube.com/watch?v=4XTcecic_Fg'},
    {name:'Meadows Row', yt:'https://www.youtube.com/watch?v=w1d_wD0v3gc'},
    {name:'Yates Row', yt:'https://www.youtube.com/watch?v=yrRYSKaeScE'},
    {name:'Jefferson Curl', yt:'https://www.youtube.com/watch?v=YGlAdtSKQaU'},
    {name:'Dumbbell Pullover Back', yt:'https://www.youtube.com/watch?v=jQjWlIwG4sI'},,
    {name:'alternate lateral pulldown', yt:'https://www.youtube.com/watch?v=QZ_UC5SjvK4'},
    {name:'archer pull up', yt:'https://www.youtube.com/watch?v=Z7GdTkOEe5Y'},
    {name:'assisted parallel close grip pull-up', yt:'https://www.youtube.com/watch?v=YrX1aBsRvv4'},
    {name:'assisted pull-up', yt:'https://www.youtube.com/watch?v=AsUBri1uYzo'},
    {name:'assisted standing chin-up', yt:'https://www.youtube.com/watch?v=bs02BThv4Lc'},
    {name:'assisted standing pull-up', yt:'https://www.youtube.com/watch?v=AsUBri1uYzo'},
    {name:'back extension on exercise ball', yt:'https://www.youtube.com/watch?v=7rCVujGXrJU'},
    {name:'back lever', yt:'https://www.youtube.com/watch?v=xdPazB-ljaQ'},
    {name:'back pec stretch', yt:'https://www.youtube.com/watch?v=vAaA_bqvHqo'},
    {name:'band assisted pull-up', yt:'https://www.youtube.com/watch?v=B_VkNQS5YLs'},
    {name:'band close-grip pulldown', yt:'https://www.youtube.com/watch?v=MnUX2L0JMRI'},
    {name:'band fixed back close grip pulldown', yt:'https://www.youtube.com/watch?v=8hzVLzu-RJk'},
    {name:'band fixed back underhand pulldown', yt:'https://www.youtube.com/watch?v=VprlTxpB1rk'},
    {name:'band kneeling one arm pulldown', yt:'https://www.youtube.com/watch?v=3dMHd_moIxE'},
    {name:'band one arm standing low row', yt:'https://www.youtube.com/watch?v=whSXi-EXbqI'},
    {name:'band one arm twisting seated row', yt:'https://www.youtube.com/watch?v=uaq94XvilhY'},
    {name:'band shrug', yt:'https://www.youtube.com/watch?v=qdyiGklM9QI'},
    {name:'band straight leg deadlift', yt:'https://www.youtube.com/watch?v=fkej6PUmvmc'},
    {name:'band underhand pulldown', yt:'https://www.youtube.com/watch?v=VprlTxpB1rk'},
    {name:'barbell bent arm pullover', yt:'https://www.youtube.com/watch?v=cZyygOeQek0'},
    {name:'barbell bent over row', yt:'https://www.youtube.com/watch?v=bm0_q9bR_HA'},
    {name:'barbell decline bent arm pullover', yt:'https://www.youtube.com/watch?v=cZyygOeQek0'},
    {name:'barbell decline wide-grip pullover', yt:'https://www.youtube.com/watch?v=oiaqAMEZ8QM'},
    {name:'barbell incline row', yt:'https://www.youtube.com/watch?v=mI9nGW2Pw1c'},
    {name:'barbell one arm bent over row', yt:'https://www.youtube.com/watch?v=bm0_q9bR_HA'},
    {name:'barbell pendlay row', yt:'https://www.youtube.com/watch?v=C98Kk_LMsQI'},
    {name:'barbell pullover', yt:'https://www.youtube.com/watch?v=E4NQ5DfqwbU'},
    {name:'barbell pullover to press', yt:'https://www.youtube.com/watch?v=sttAHDQt_mI'},
    {name:'barbell reverse grip bent over row', yt:'https://www.youtube.com/watch?v=bm0_q9bR_HA'},
    {name:'barbell reverse grip incline bench row', yt:'https://www.youtube.com/watch?v=Y0sUaF6Fn7g'},
    {name:'bench pull-ups', yt:'https://www.youtube.com/watch?v=AsUBri1uYzo'},
    {name:'bodyweight squatting row', yt:'https://www.youtube.com/watch?v=l83R5PblSMA'},
    {name:'bodyweight squatting row (with towel)', yt:'https://www.youtube.com/watch?v=SkFBcrHVGn4'},
    {name:'bodyweight standing close-grip one arm row', yt:'https://www.youtube.com/watch?v=ZRSGpBUVcNw'},
    {name:'bodyweight standing close-grip row', yt:'https://www.youtube.com/watch?v=2zZhL6zFk6I'},
    {name:'bodyweight standing one arm row', yt:'https://www.youtube.com/watch?v=tDgQx0W1JP0'},
    {name:'bodyweight standing one arm row (with towel)', yt:'https://www.youtube.com/watch?v=h-EQmciWNsc'},
    {name:'bodyweight standing row', yt:'https://www.youtube.com/watch?v=a7hcEMgr198'},
    {name:'bodyweight standing row (with towel)', yt:'https://www.youtube.com/watch?v=SkFBcrHVGn4'},
    {name:'cable bar lateral pulldown', yt:'https://www.youtube.com/watch?v=jYIWugY50nk'},
    {name:'cable cross-over lateral pulldown', yt:'https://www.youtube.com/watch?v=Onri9Orq88M'},
    {name:'cable decline seated wide-grip row', yt:'https://www.youtube.com/watch?v=G3if0R7tTgQ'},
    {name:'cable floor seated wide-grip row', yt:'https://www.youtube.com/watch?v=8rmtDQFlxpw'},
    {name:'cable high row (kneeling)', yt:'https://www.youtube.com/watch?v=589zMiUW390'},
    {name:'cable incline bench row', yt:'https://www.youtube.com/watch?v=tZUYS7X50so'},
    {name:'cable incline pushdown', yt:'https://www.youtube.com/watch?v=LXkCrxn3caQ'},
    {name:'cable lat pulldown full range of motion', yt:'https://www.youtube.com/watch?v=8Wv1l90lNIE'},
    {name:'cable lateral pulldown (with rope attachment)', yt:'https://www.youtube.com/watch?v=vU8JYklLV80'},
    {name:'cable lateral pulldown with v-bar', yt:'https://www.youtube.com/watch?v=gNFMkFL5yPQ'},
    {name:'cable low seated row', yt:'https://www.youtube.com/watch?v=NYok5zjbDcw'},
    {name:'cable lying extension pullover (with rope attachment)', yt:'https://www.youtube.com/watch?v=BFMOOiqkx0k'},
    {name:'cable one arm bent over row', yt:'https://www.youtube.com/watch?v=zu47Jx0yt1s'},
    {name:'cable one arm pulldown', yt:'https://www.youtube.com/watch?v=XbZgoSNJXm4'},
    {name:'cable one arm straight back high row (kneeling)', yt:'https://www.youtube.com/watch?v=589zMiUW390'},
    {name:'cable palm rotational row', yt:'https://www.youtube.com/watch?v=E1IQYCSGFhw'},
    {name:'cable pulldown', yt:'https://www.youtube.com/watch?v=jYIWugY50nk'},
    {name:'cable pulldown (pro lat bar)', yt:'https://www.youtube.com/watch?v=8VMYTXwhSuk'},
    {name:'cable pushdown (straight arm) v. 2', yt:'https://www.youtube.com/watch?v=pp_n3XTFEOQ'},
    {name:'cable rear pulldown', yt:'https://www.youtube.com/watch?v=jYIWugY50nk'},
    {name:'cable reverse-grip straight back seated high row', yt:'https://www.youtube.com/watch?v=jysda2iLBk0'},
    {name:'cable rope crossover seated row', yt:'https://www.youtube.com/watch?v=7KhA_TDJuyQ'},
    {name:'cable rope elevated seated row', yt:'https://www.youtube.com/watch?v=UCXxvVItLoM'},
    {name:'cable rope extension incline bench row', yt:'https://www.youtube.com/watch?v=yEO8OleI4fs'},
    {name:'cable rope seated row', yt:'https://www.youtube.com/watch?v=UCXxvVItLoM'},
    {name:'cable seated high row (v-bar)', yt:'https://www.youtube.com/watch?v=0FF7unGkIng'},
    {name:'cable seated one arm alternate row', yt:'https://www.youtube.com/watch?v=p4ktYrGfLjg'},
    {name:'cable seated row', yt:'https://www.youtube.com/watch?v=UCXxvVItLoM'},
    {name:'cable seated wide-grip row', yt:'https://www.youtube.com/watch?v=sjJ0z4R3w0M'},
    {name:'cable squat row (with rope attachment)', yt:'https://www.youtube.com/watch?v=4vsmdOenYl4'},
    {name:'cable standing row (v-bar)', yt:'https://www.youtube.com/watch?v=f6OpZidgi0c'},
    {name:'cable standing twist row (v-bar)', yt:'https://www.youtube.com/watch?v=ymphH79QO48'},
    {name:'cable straight arm pulldown', yt:'https://www.youtube.com/watch?v=pp_n3XTFEOQ'},
    {name:'cable straight arm pulldown (with rope)', yt:'https://www.youtube.com/watch?v=ziO3yQ3l1P4'},
    {name:'cable straight back seated row', yt:'https://www.youtube.com/watch?v=UCXxvVItLoM'},
    {name:'cable thibaudeau kayak row', yt:'https://www.youtube.com/watch?v=-QzTAIvx5Dk'},
    {name:'cable twisting pull', yt:'https://www.youtube.com/watch?v=u2MfrzcJFY0'},
    {name:'cable underhand pulldown', yt:'https://www.youtube.com/watch?v=RzGwl2byaTw'},
    {name:'cable upper row', yt:'https://www.youtube.com/watch?v=NYok5zjbDcw'},
    {name:'cable wide grip rear pulldown behind neck', yt:'https://www.youtube.com/watch?v=N12Nb5iBBh4'},
    {name:'cambered bar lying row', yt:'https://www.youtube.com/watch?v=aLIKEY-HQKs'},
    {name:'chin-ups (narrow parallel grip)', yt:'https://www.youtube.com/watch?v=sJAHK0TOmzk'},
    {name:'close grip chin-up', yt:'https://www.youtube.com/watch?v=qVztO-F-IwI'},
    {name:'dumbbell bent over row', yt:'https://www.youtube.com/watch?v=6gvmcqr226U'},
    {name:'dumbbell decline shrug', yt:'https://www.youtube.com/watch?v=L6ntfljSm4U'},
    {name:'dumbbell decline shrug v. 2', yt:'https://www.youtube.com/watch?v=L6ntfljSm4U'},
    {name:'dumbbell incline row', yt:'https://www.youtube.com/watch?v=tZUYS7X50so'},
    {name:'dumbbell incline shrug', yt:'https://www.youtube.com/watch?v=35wAsOWCyVM'},
    {name:'dumbbell incline y-raise', yt:'https://www.youtube.com/watch?v=tjCRkXxrDSc'},
    {name:'dumbbell lying rear delt row', yt:'https://www.youtube.com/watch?v=oNOXhdxXolE'},
    {name:'dumbbell one arm bent-over row', yt:'https://www.youtube.com/watch?v=6gvmcqr226U'},
    {name:'dumbbell palm rotational bent over row', yt:'https://www.youtube.com/watch?v=ZpI28mfvRsw'},
    {name:'dumbbell reverse grip incline bench one arm row', yt:'https://www.youtube.com/watch?v=ZRSGpBUVcNw'},
    {name:'dumbbell reverse grip incline bench two arm row', yt:'https://www.youtube.com/watch?v=QFVf5LGmxkI'},
    {name:'dumbbell reverse grip row (female)', yt:'https://www.youtube.com/watch?v=Prdsequ4UnU'},
    {name:'dumbbell side plank with rear fly', yt:'https://www.youtube.com/watch?v=roH0Kk3Z0DY'},
    {name:'elbow lift - reverse push-up', yt:'https://www.youtube.com/watch?v=0vhJ52ecZzo'},
    {name:'elevator', yt:'https://www.youtube.com/watch?v=yJIq8UU7YiA'},
    {name:'exercise ball alternating arm ups', yt:'https://www.youtube.com/watch?v=85mYXOgC_Do'},
    {name:'exercise ball back extension with arms extended', yt:'https://www.youtube.com/watch?v=G1NtifBs8aE'},
    {name:'exercise ball back extension with hands behind head', yt:'https://www.youtube.com/watch?v=7rCVujGXrJU'},
    {name:'exercise ball back extension with knees off ground', yt:'https://www.youtube.com/watch?v=ij44nvVsFuU'},
    {name:'exercise ball back extension with rotation', yt:'https://www.youtube.com/watch?v=hQ8Y6wg4y8c'},
    {name:'exercise ball hug', yt:'https://www.youtube.com/watch?v=k1v0lBdWbf4'},
    {name:'exercise ball lat stretch', yt:'https://www.youtube.com/watch?v=4E8GABTNyDM'},
    {name:'exercise ball lower back stretch (pyramid)', yt:'https://www.youtube.com/watch?v=56g_C5JbvJA'},
    {name:'exercise ball lying side lat stretch', yt:'https://www.youtube.com/watch?v=aU-8lGV9bQQ'},
    {name:'exercise ball prone leg raise', yt:'https://www.youtube.com/watch?v=ZaUTkqk8zEU'},
    {name:'ez bar lying bent arms pullover', yt:'https://www.youtube.com/watch?v=kTX8EGV7PNE'},
    {name:'ez bar reverse grip bent over row', yt:'https://www.youtube.com/watch?v=k5K5hBbh5GU'},
    {name:'front lever reps', yt:'https://www.youtube.com/watch?v=Nv5_gjD5VU4'},
    {name:'gironda sternum chin', yt:'https://www.youtube.com/watch?v=-JbVT4-m6b8'},
    {name:'hyperextension', yt:'https://www.youtube.com/watch?v=YGUOyLf6BUg'},
    {name:'hyperextension (on bench)', yt:'https://www.youtube.com/watch?v=81riMKjNBuA'},
    {name:'inverted row bent knees', yt:'https://www.youtube.com/watch?v=CbL9QSRB6ws'},
    {name:'inverted row on bench', yt:'https://www.youtube.com/watch?v=J6g8CLfh2c8'},
    {name:'inverted row v. 2', yt:'https://www.youtube.com/watch?v=9fItzuh9Iok'},
    {name:'inverted row with straps', yt:'https://www.youtube.com/watch?v=2Zsso20AyD8'},
    {name:'kettlebell alternating renegade row', yt:'https://www.youtube.com/watch?v=7l03NoMzGp4'},
    {name:'kettlebell alternating row', yt:'https://www.youtube.com/watch?v=doPA462HS9Y'},
    {name:'kettlebell one arm row', yt:'https://www.youtube.com/watch?v=Im27U7BKrII'},
    {name:'kettlebell sumo high pull', yt:'https://www.youtube.com/watch?v=CTZjFrs-7hQ'},
    {name:'kettlebell two arm row', yt:'https://www.youtube.com/watch?v=gN-HogMvE3I'},
    {name:'kipping muscle up', yt:'https://www.youtube.com/watch?v=G3MK-AAbkPw'},
    {name:'kneeling lat stretch', yt:'https://www.youtube.com/watch?v=6oe2EUn7cHk'},
    {name:'l-pull-up', yt:'https://www.youtube.com/watch?v=_ybHk6NIfOA'},
    {name:'lever alternating narrow grip seated row', yt:'https://www.youtube.com/watch?v=Oetp9u4_SJw'},
    {name:'lever assisted chin-up', yt:'https://www.youtube.com/watch?v=bs02BThv4Lc'},
    {name:'lever back extension', yt:'https://www.youtube.com/watch?v=bADOg7F5dKI'},
    {name:'lever bent over row', yt:'https://www.youtube.com/watch?v=bm0_q9bR_HA'},
    {name:'lever bent-over row with v-bar', yt:'https://www.youtube.com/watch?v=IaquCJTIKbo'},
    {name:'lever front pulldown', yt:'https://www.youtube.com/watch?v=fpanRKu05ok'},
    {name:'lever gripless shrug', yt:'https://www.youtube.com/watch?v=0-C7T82QvEw'},
    {name:'lever gripless shrug v. 2', yt:'https://www.youtube.com/watch?v=fUmJKuglXPc'},
    {name:'lever high row', yt:'https://www.youtube.com/watch?v=4KTMIysnrtI'},
    {name:'lever narrow grip seated row', yt:'https://www.youtube.com/watch?v=Oetp9u4_SJw'},
    {name:'lever one arm bent over row', yt:'https://www.youtube.com/watch?v=6gvmcqr226U'},
    {name:'lever one arm lateral high row', yt:'https://www.youtube.com/watch?v=gg5hwJuv6KI'},
    {name:'lever one arm lateral wide pulldown', yt:'https://www.youtube.com/watch?v=_wYQMO8shcw'},
    {name:'lever pullover', yt:'https://www.youtube.com/watch?v=oxpAl14EYyc'},
    {name:'lever reverse grip lateral pulldown', yt:'https://www.youtube.com/watch?v=SNiwpA13ZLU'},
    {name:'lever reverse grip vertical row', yt:'https://www.youtube.com/watch?v=jBlunMD5MZs'},
    {name:'lever reverse t-bar row', yt:'https://www.youtube.com/watch?v=rYZSuxY8xR0'},
    {name:'lever seated row', yt:'https://www.youtube.com/watch?v=lJoozxC0Rns'},
    {name:'lever shrug', yt:'https://www.youtube.com/watch?v=0-C7T82QvEw'},
    {name:'lever t bar row', yt:'https://www.youtube.com/watch?v=yPis7nlbqdY'},
    {name:'lever t-bar reverse grip row', yt:'https://www.youtube.com/watch?v=yPis7nlbqdY'},
    {name:'lever unilateral row', yt:'https://www.youtube.com/watch?v=F7lEQz517ME'},
    {name:'london bridge', yt:'https://www.youtube.com/watch?v=aqz4QMKlqNU'},
    {name:'lower back curl', yt:'https://www.youtube.com/watch?v=Ksue49eKOEY'},
    {name:'medicine ball catch and overhead throw', yt:'https://www.youtube.com/watch?v=h4SvwqKY-GM'},
    {name:'medicine ball overhead slam', yt:'https://www.youtube.com/watch?v=DMrxbUgoZTg'},
    {name:'mixed grip chin-up', yt:'https://www.youtube.com/watch?v=xjME35NboRA'},
    {name:'muscle up', yt:'https://www.youtube.com/watch?v=GEeJqBr5aFE'},
    {name:'muscle-up (on vertical bar)', yt:'https://www.youtube.com/watch?v=o69WaY_7k2c'},
    {name:'one arm against wall', yt:'https://www.youtube.com/watch?v=NDIg31duTKA'},
    {name:'one arm chin-up', yt:'https://www.youtube.com/results?search_query=one%20arm%20chin-up%20exercise%20form%20tutorial'},
    {name:'one arm towel row', yt:'https://www.youtube.com/watch?v=SkFBcrHVGn4'},
    {name:'pull up (neutral grip)', yt:'https://www.youtube.com/watch?v=AsUBri1uYzo'},
    {name:'rear pull-up', yt:'https://www.youtube.com/results?search_query=rear%20pull-up%20exercise%20form%20tutorial'},
    {name:'resistance band seated straight back row', yt:'https://www.youtube.com/watch?v=whSXi-EXbqI'},
    {name:'reverse grip machine lat pulldown', yt:'https://www.youtube.com/watch?v=SNiwpA13ZLU'},
    {name:'reverse grip pull-up', yt:'https://www.youtube.com/watch?v=si7pSqtxK9w'},
    {name:'rocky pull-up pulldown', yt:'https://www.youtube.com/watch?v=ozDV_q4FBts'},
    {name:'roller back stretch', yt:'https://www.youtube.com/watch?v=cqd2USvPuCA'},
    {name:'roller side lat stretch', yt:'https://www.youtube.com/watch?v=UgHcIuM_xSc'},
    {name:'rope climb', yt:'https://www.youtube.com/watch?v=zecFm2WICEI'},
    {name:'scapula dips', yt:'https://www.youtube.com/watch?v=kckT2Rp4yLE'},
    {name:'seated lower back stretch', yt:'https://www.youtube.com/watch?v=PUVTGBARpoo'},
    {name:'shoulder grip pull-up', yt:'https://www.youtube.com/watch?v=tSRo8ksP27I'},
    {name:'side lying floor stretch', yt:'https://www.youtube.com/watch?v=DMlSdmsHEeI'},
    {name:'side-to-side chin', yt:'https://www.youtube.com/watch?v=xFCpqC5H0tg'},
    {name:'skin the cat', yt:'https://www.youtube.com/watch?v=7IVqiJ12Pm0'},
    {name:'smith back shrug', yt:'https://www.youtube.com/watch?v=keNpoJVJCNk'},
    {name:'smith bent over row', yt:'https://www.youtube.com/watch?v=mmSXPN6Ig5A'},
    {name:'smith narrow row', yt:'https://www.youtube.com/watch?v=3QcJggd_L24'},
    {name:'smith one arm row', yt:'https://www.youtube.com/watch?v=w6ua5fqNws0'},
    {name:'smith reverse grip bent over row', yt:'https://www.youtube.com/watch?v=EZPdp0lNEpk'},
    {name:'smith shrug', yt:'https://www.youtube.com/watch?v=keNpoJVJCNk'},
    {name:'sphinx', yt:'https://www.youtube.com/watch?v=-6jVTuw02LE'},
    {name:'spine stretch', yt:'https://www.youtube.com/watch?v=LIVJZZyZ2qM'},
    {name:'standing archer', yt:'https://www.youtube.com/watch?v=tiPUTyQkLcQ'},
    {name:'standing lateral stretch', yt:'https://www.youtube.com/watch?v=xt7-316u0M4'},
    {name:'standing pelvic tilt', yt:'https://www.youtube.com/watch?v=jBr_2zNASlI'},
    {name:'suspended row', yt:'https://www.youtube.com/watch?v=X9ptLAm8fuE'},
    {name:'twin handle parallel grip lat pulldown', yt:'https://www.youtube.com/watch?v=pxbYQsDpDCA'},
    {name:'two toe touch (male)', yt:'https://www.youtube.com/watch?v=GawQ8fl2DaM'},
    {name:'upper back stretch', yt:'https://www.youtube.com/watch?v=X89JQvb2-TM'},
    {name:'upward facing dog', yt:'https://www.youtube.com/watch?v=JvmYXPgMmEc'},
    {name:'weighted close grip chin-up on dip cage', yt:'https://www.youtube.com/watch?v=S5ulL6sihqY'},
    {name:'weighted hyperextension (on stability ball)', yt:'https://www.youtube.com/watch?v=CA5S9BvzhZo'},
    {name:'weighted muscle up', yt:'https://www.youtube.com/watch?v=oM_Pa4CxFTQ'},
    {name:'weighted muscle up (on bar)', yt:'https://www.youtube.com/results?search_query=weighted%20muscle%20up%20(on%20bar)%20exercise%20form%20tutorial'},
    {name:'weighted one hand pull up', yt:'https://www.youtube.com/results?search_query=weighted%20one%20hand%20pull%20up%20exercise%20form%20tutorial'},
    {name:'weighted pull-up', yt:'https://www.youtube.com/watch?v=KOw6VhY8McQ'},
    {name:'wide grip rear pull-up', yt:'https://www.youtube.com/watch?v=FZNXMxkqamM'}
  ],

  Shoulders: [
    {name:'Barbell Overhead Press', yt:'https://www.youtube.com/watch?v=ZXpdJOLNoWw'},
    {name:'Seated Dumbbell Press', yt:'https://www.youtube.com/watch?v=poD_-zaG9hk'},
    {name:'Standing Dumbbell Press', yt:'https://www.youtube.com/watch?v=RW52pKHs0mw'},
    {name:'Arnold Press', yt:'https://www.youtube.com/watch?v=pQDrcNoDNVM'},
    {name:'Lateral Raise Dumbbell', yt:'https://www.youtube.com/watch?v=XPPfnSEATJA'},
    {name:'Cable Lateral Raise', yt:'https://www.youtube.com/watch?v=Z5FA9aq3L6A'},
    {name:'Machine Lateral Raise', yt:'https://www.youtube.com/watch?v=0o07iGKUarI'},
    {name:'Rear Delt Dumbbell Fly', yt:'https://www.youtube.com/watch?v=0GSu6Z-Oj7U'},
    {name:'Rear Delt Cable Fly', yt:'https://www.youtube.com/watch?v=er15V96hG5U'},
    {name:'Reverse Pec Deck', yt:'https://www.youtube.com/watch?v=v0rJuhEa59c'},
    {name:'Upright Row', yt:'https://www.youtube.com/watch?v=pNTPVN3FkSo'},
    {name:'Front Raise Dumbbell', yt:'https://www.youtube.com/watch?v=zkP0MsTcIVU'},
    {name:'Front Raise Plate', yt:'https://www.youtube.com/watch?v=HN8HYJTOl8c'},
    {name:'Cable Front Raise', yt:'https://www.youtube.com/watch?v=vtH93qBItdk'},
    {name:'Lean Away Lateral Raise', yt:'https://www.youtube.com/watch?v=Qc3v4fAdv9c'},
    {name:'Bradford Press', yt:'https://www.youtube.com/watch?v=VGEx3cEFI6s'},
    {name:'Machine OHP', yt:'https://www.youtube.com/watch?v=GcY6TZxfS0k'},
    {name:'Smith Machine OHP', yt:'https://www.youtube.com/watch?v=OLqZDUUD2b0'},
    {name:'Y-T-W Raises', yt:'https://www.youtube.com/watch?v=OFQduBFpDrY'},
    {name:'W-Raises', yt:'https://www.youtube.com/watch?v=nFLjNH4XKBo'},
    {name:'Band Pull Apart', yt:'https://www.youtube.com/watch?v=MnDpmNYUjbc'},
    {name:'Single Arm Cable Lateral Raise', yt:'https://www.youtube.com/watch?v=gjXX8g-VPXI'},
    {name:'Barbell Shrug', yt:'https://www.youtube.com/watch?v=M_MjF5Nm_h4'},
    {name:'Dumbbell Shrug', yt:'https://www.youtube.com/watch?v=SX1FE0URdv8'},,
    {name:'band front lateral raise', yt:'https://www.youtube.com/watch?v=idLSRyls5N8'},
    {name:'band front raise', yt:'https://www.youtube.com/watch?v=4tQ740AXShQ'},
    {name:'band reverse fly', yt:'https://www.youtube.com/watch?v=FGoKCNIno-Y'},
    {name:'band shoulder press', yt:'https://www.youtube.com/watch?v=8dYBb_oYxig'},
    {name:'band standing rear delt row', yt:'https://www.youtube.com/watch?v=9YuBpenty-o'},
    {name:'band twisting overhead press', yt:'https://www.youtube.com/watch?v=nwjQIADavj8'},
    {name:'band y-raise', yt:'https://www.youtube.com/watch?v=YltXFR_s1cE'},
    {name:'barbell front raise', yt:'https://www.youtube.com/watch?v=_ikCPws1mbE'},
    {name:'barbell one arm snatch', yt:'https://www.youtube.com/watch?v=9rpQnAlEkow'},
    {name:'barbell rear delt raise', yt:'https://www.youtube.com/watch?v=rO4gbhh52zY'},
    {name:'barbell rear delt row', yt:'https://www.youtube.com/watch?v=H6XtEta2S5A'},
    {name:'barbell seated behind head military press', yt:'https://www.youtube.com/watch?v=k0oeunL_yYw'},
    {name:'barbell seated bradford rocky press', yt:'https://www.youtube.com/watch?v=deW4TulGjVM'},
    {name:'barbell seated overhead press', yt:'https://www.youtube.com/watch?v=IuzRCN6eG6Y'},
    {name:'barbell skier', yt:'https://www.youtube.com/watch?v=e5kdcvTp8cs'},
    {name:'barbell standing bradford press', yt:'https://www.youtube.com/watch?v=b0PuidI8-Cw'},
    {name:'barbell standing close grip military press', yt:'https://www.youtube.com/watch?v=haCkOxk4nmU'},
    {name:'barbell standing front raise over head', yt:'https://www.youtube.com/watch?v=Ytffw4cHBh0'},
    {name:'barbell standing wide military press', yt:'https://www.youtube.com/watch?v=gYsDcqzQXTY'},
    {name:'barbell thruster', yt:'https://www.youtube.com/watch?v=-seu3IbP81k'},
    {name:'barbell upright row', yt:'https://www.youtube.com/watch?v=um3VVzqunPU'},
    {name:'barbell upright row v. 2', yt:'https://www.youtube.com/watch?v=um3VVzqunPU'},
    {name:'barbell upright row v. 3', yt:'https://www.youtube.com/watch?v=U5_3xFpIJ08'},
    {name:'barbell wide-grip upright row', yt:'https://www.youtube.com/watch?v=Xpu0C50pD-U'},
    {name:'battling ropes', yt:'https://www.youtube.com/watch?v=DfuvSn73Up4'},
    {name:'cable alternate shoulder press', yt:'https://www.youtube.com/watch?v=bREeDArAsOw'},
    {name:'cable cross-over revers fly', yt:'https://www.youtube.com/watch?v=jAnkS4u8mN0'},
    {name:'cable forward raise', yt:'https://www.youtube.com/watch?v=vtH93qBItdk'},
    {name:'cable front shoulder raise', yt:'https://www.youtube.com/watch?v=vtH93qBItdk'},
    {name:'cable kneeling rear delt row (with rope) (male)', yt:'https://www.youtube.com/watch?v=OPmSZ6g29a4'},
    {name:'cable one arm lateral raise', yt:'https://www.youtube.com/watch?v=gjXX8g-VPXI'},
    {name:'cable rear delt row (stirrups)', yt:'https://www.youtube.com/watch?v=MdrZzJYPgOs'},
    {name:'cable rear delt row (with rope)', yt:'https://www.youtube.com/watch?v=VT-O6YIP-II'},
    {name:'cable seated rear lateral raise', yt:'https://www.youtube.com/watch?v=Z0HTsZEMedA'},
    {name:'cable seated shoulder internal rotation', yt:'https://www.youtube.com/watch?v=IUFSfKV8dZk'},
    {name:'cable shoulder press', yt:'https://www.youtube.com/watch?v=G1qWo8YjDPE'},
    {name:'cable standing cross-over high reverse fly', yt:'https://www.youtube.com/watch?v=jAnkS4u8mN0'},
    {name:'cable standing rear delt row (with rope)', yt:'https://www.youtube.com/watch?v=MdrZzJYPgOs'},
    {name:'cable standing shoulder external rotation', yt:'https://www.youtube.com/watch?v=yyRk-8C8ZwE'},
    {name:'cable supine reverse fly', yt:'https://www.youtube.com/watch?v=pZKDZUBYN0M'},
    {name:'cable upright row', yt:'https://www.youtube.com/watch?v=WNz7O59GORA'},
    {name:'dumbbell alternate side press', yt:'https://www.youtube.com/watch?v=V_ewCzhycyQ'},
    {name:'dumbbell arnold press', yt:'https://www.youtube.com/watch?v=pQDrcNoDNVM'},
    {name:'dumbbell arnold press v. 2', yt:'https://www.youtube.com/watch?v=pQDrcNoDNVM'},
    {name:'dumbbell bench seated press', yt:'https://www.youtube.com/watch?v=RgkzQ008m3I'},
    {name:'dumbbell cuban press', yt:'https://www.youtube.com/watch?v=SKYSpcIptK8'},
    {name:'dumbbell cuban press v. 2', yt:'https://www.youtube.com/watch?v=SKYSpcIptK8'},
    {name:'dumbbell front raise', yt:'https://www.youtube.com/watch?v=zkP0MsTcIVU'},
    {name:'dumbbell front raise v. 2', yt:'https://www.youtube.com/watch?v=zkP0MsTcIVU'},
    {name:'dumbbell full can lateral raise', yt:'https://www.youtube.com/watch?v=XPPfnSEATJA'},
    {name:'dumbbell incline one arm lateral raise', yt:'https://www.youtube.com/watch?v=lqlVtXHcg4I'},
    {name:'dumbbell incline raise', yt:'https://www.youtube.com/watch?v=tjCRkXxrDSc'},
    {name:'dumbbell incline rear lateral raise', yt:'https://www.youtube.com/watch?v=z3PRz2aVA10'},
    {name:'dumbbell incline t-raise', yt:'https://www.youtube.com/watch?v=snotDonEScc'},
    {name:'dumbbell iron cross', yt:'https://www.youtube.com/watch?v=J3nO7Pp2kxw'},
    {name:'dumbbell lateral raise', yt:'https://www.youtube.com/watch?v=XPPfnSEATJA'},
    {name:'dumbbell lateral to front raise', yt:'https://www.youtube.com/watch?v=whB-LMshj4Y'},
    {name:'dumbbell lying external shoulder rotation', yt:'https://www.youtube.com/watch?v=K8WqtiHJ3iQ'},
    {name:'dumbbell lying on floor rear delt raise', yt:'https://www.youtube.com/watch?v=p1yQnTNE808'},
    {name:'dumbbell lying one arm deltoid rear', yt:'https://www.youtube.com/watch?v=WtC-HSDKPHM'},
    {name:'dumbbell lying one arm rear lateral raise', yt:'https://www.youtube.com/watch?v=wXjpoFWMCEY'},
    {name:'dumbbell lying rear lateral raise', yt:'https://www.youtube.com/watch?v=FGuZ-Y5YQFU'},
    {name:'dumbbell one arm lateral raise', yt:'https://www.youtube.com/watch?v=CAkjKSKWAi0'},
    {name:'dumbbell one arm lateral raise with support', yt:'https://www.youtube.com/watch?v=5c6o7O6KMXk'},
    {name:'dumbbell one arm reverse fly (with support)', yt:'https://www.youtube.com/watch?v=E3jRXZNsIx4'},
    {name:'dumbbell one arm shoulder press', yt:'https://www.youtube.com/watch?v=lcaWpewC3Wg'},
    {name:'dumbbell one arm shoulder press v. 2', yt:'https://www.youtube.com/watch?v=3ytyD-jpa1c'},
    {name:'dumbbell one arm upright row', yt:'https://www.youtube.com/watch?v=VtCGdQti7c0'},
    {name:'dumbbell push press', yt:'https://www.youtube.com/watch?v=sElIkjcfyNY'},
    {name:'dumbbell raise', yt:'https://www.youtube.com/watch?v=XPPfnSEATJA'},
    {name:'dumbbell rear delt raise', yt:'https://www.youtube.com/watch?v=WPaVyXi03Rk'},
    {name:'dumbbell rear delt row_shoulder', yt:'https://www.youtube.com/watch?v=oNOXhdxXolE'},
    {name:'dumbbell rear fly', yt:'https://www.youtube.com/watch?v=3gJXpfwg_go'},
    {name:'dumbbell rear lateral raise', yt:'https://www.youtube.com/watch?v=Z0HTsZEMedA'},
    {name:'dumbbell rear lateral raise (support head)', yt:'https://www.youtube.com/watch?v=Z0HTsZEMedA'},
    {name:'dumbbell reverse fly', yt:'https://www.youtube.com/watch?v=evXOlgLTPCw'},
    {name:'dumbbell rotation reverse fly', yt:'https://www.youtube.com/watch?v=evXOlgLTPCw'},
    {name:'dumbbell scott press', yt:'https://www.youtube.com/watch?v=drSfptNrQy4'},
    {name:'dumbbell seated alternate front raise', yt:'https://www.youtube.com/watch?v=vMfLbnc-xhs'},
    {name:'dumbbell seated alternate press', yt:'https://www.youtube.com/watch?v=MnNcE8ZI3WE'},
    {name:'dumbbell seated alternate shoulder', yt:'https://www.youtube.com/watch?v=hOTABpGvhBc'},
    {name:'dumbbell seated bent arm lateral raise', yt:'https://www.youtube.com/watch?v=KSZYwDmx9cc'},
    {name:'dumbbell seated front raise', yt:'https://www.youtube.com/watch?v=544cc62VKGE'},
    {name:'dumbbell seated lateral raise', yt:'https://www.youtube.com/watch?v=XPPfnSEATJA'},
    {name:'dumbbell seated lateral raise v. 2', yt:'https://www.youtube.com/watch?v=P_k_h5AIJXw'},
    {name:'dumbbell seated shoulder press', yt:'https://www.youtube.com/watch?v=poD_-zaG9hk'},
    {name:'dumbbell seated shoulder press (parallel grip)', yt:'https://www.youtube.com/watch?v=7oH0algsdww'},
    {name:'dumbbell side lying one hand raise', yt:'https://www.youtube.com/watch?v=Px1TR_30UH0'},
    {name:'dumbbell single arm overhead carry', yt:'https://www.youtube.com/watch?v=VBy9GT2MNpw'},
    {name:'dumbbell standing alternate overhead press', yt:'https://www.youtube.com/watch?v=C7tFlxDYozg'},
    {name:'dumbbell standing alternate raise', yt:'https://www.youtube.com/watch?v=c4EhnuYZQI8'},
    {name:'dumbbell standing around world', yt:'https://www.youtube.com/watch?v=_91Uo7ev_f8'},
    {name:'dumbbell standing front raise above head', yt:'https://www.youtube.com/watch?v=cDsUceSxfCk'},
    {name:'dumbbell standing one arm palm in press', yt:'https://www.youtube.com/watch?v=WDVkcfXPUuA'},
    {name:'dumbbell standing overhead press', yt:'https://www.youtube.com/watch?v=Did01dFR3Lk'},
    {name:'dumbbell standing palms in press', yt:'https://www.youtube.com/watch?v=d2TdOcXPi2E'},
    {name:'dumbbell upright row', yt:'https://www.youtube.com/watch?v=Rd5AsxOGqss'},
    {name:'dumbbell upright row (back pov)', yt:'https://www.youtube.com/watch?v=Rd5AsxOGqss'},
    {name:'dumbbell upright shoulder external rotation', yt:'https://www.youtube.com/watch?v=IEnhviv4fcM'},
    {name:'dumbbell w-press', yt:'https://www.youtube.com/watch?v=Did01dFR3Lk'},
    {name:'ez barbell anti gravity press', yt:'https://www.youtube.com/watch?v=9B4z0Bftfzw'},
    {name:'kettlebell alternating press', yt:'https://www.youtube.com/watch?v=v_3p8C7FIaU'},
    {name:'kettlebell arnold press', yt:'https://www.youtube.com/watch?v=5FgPTl_QWvQ'},
    {name:'kettlebell double jerk', yt:'https://www.youtube.com/watch?v=ye8zPleqJpQ'},
    {name:'kettlebell double push press', yt:'https://www.youtube.com/watch?v=nCNmFdiuqBc'},
    {name:'kettlebell double snatch', yt:'https://www.youtube.com/watch?v=UUvsaallP1E'},
    {name:'kettlebell one arm clean and jerk', yt:'https://www.youtube.com/watch?v=JP3edR2-xEQ'},
    {name:'kettlebell one arm jerk', yt:'https://www.youtube.com/watch?v=lmhvF6tr_cU'},
    {name:'kettlebell one arm military press to the side', yt:'https://www.youtube.com/watch?v=QQBZuMOqgEw'},
    {name:'kettlebell one arm push press', yt:'https://www.youtube.com/watch?v=FWTX94EOVVA'},
    {name:'kettlebell one arm snatch', yt:'https://www.youtube.com/watch?v=77MVqLqc51g'},
    {name:'kettlebell pirate supper legs', yt:'https://www.youtube.com/watch?v=TMS5xaMBFcU'},
    {name:'kettlebell seated press', yt:'https://www.youtube.com/watch?v=Bp5mx-cqacc'},
    {name:'kettlebell seated two arm military press', yt:'https://www.youtube.com/watch?v=CHbFj5kJLgE'},
    {name:'kettlebell seesaw press', yt:'https://www.youtube.com/watch?v=pGrvN6W_Tio'},
    {name:'kettlebell thruster', yt:'https://www.youtube.com/watch?v=ZvwloquB53I'},
    {name:'kettlebell two arm clean', yt:'https://www.youtube.com/watch?v=DBkipxAMdGQ'},
    {name:'kettlebell two arm military press', yt:'https://www.youtube.com/watch?v=tFmuxMe1sd0'},
    {name:'landmine lateral raise', yt:'https://www.youtube.com/watch?v=H2nLupIGwXA'},
    {name:'left hook. boxing', yt:'https://www.youtube.com/results?search_query=left%20hook.%20boxing%20exercise%20form%20tutorial'},
    {name:'lever lateral raise', yt:'https://www.youtube.com/watch?v=N9qUF2O7_e4'},
    {name:'lever military press', yt:'https://www.youtube.com/watch?v=0h09E_yjhTM'},
    {name:'lever one arm shoulder press', yt:'https://www.youtube.com/watch?v=3ytyD-jpa1c'},
    {name:'lever seated reverse fly', yt:'https://www.youtube.com/watch?v=ZVw9z6eXkJQ'},
    {name:'lever seated reverse fly (parallel grip)', yt:'https://www.youtube.com/watch?v=Ce4ifnVg7yg'},
    {name:'lever shoulder press', yt:'https://www.youtube.com/watch?v=GcY6TZxfS0k'},
    {name:'lever shoulder press v. 2', yt:'https://www.youtube.com/watch?v=qeHtqtNtngo'},
    {name:'lever shoulder press v. 3', yt:'https://www.youtube.com/watch?v=WvLMauqrnK8'},
    {name:'rear deltoid stretch', yt:'https://www.youtube.com/watch?v=C5pbKkESTtA'},
    {name:'resistance band seated shoulder press', yt:'https://www.youtube.com/watch?v=mpiduE3C-Hc'},
    {name:'smith behind neck press', yt:'https://www.youtube.com/watch?v=pRtVU1UfC98'},
    {name:'smith rear delt row', yt:'https://www.youtube.com/watch?v=Q1ltHbVnMTQ'},
    {name:'smith seated shoulder press', yt:'https://www.youtube.com/watch?v=OLqZDUUD2b0'},
    {name:'smith shoulder press', yt:'https://www.youtube.com/watch?v=evtRb6cPF-Q'},
    {name:'smith standing behind head military press', yt:'https://www.youtube.com/watch?v=Wvb-lmNcS44'},
    {name:'smith standing military press', yt:'https://www.youtube.com/watch?v=Wvb-lmNcS44'},
    {name:'smith upright row', yt:'https://www.youtube.com/watch?v=QIpa-9dtkgA'},
    {name:'standing behind neck press', yt:'https://www.youtube.com/watch?v=QOrIAbGFjx8'},
    {name:'weighted front raise', yt:'https://www.youtube.com/watch?v=zkP0MsTcIVU'},
    {name:'weighted kneeling step with swing', yt:'https://www.youtube.com/watch?v=SxLyVF0zl_4'},
    {name:'weighted round arm', yt:'https://www.youtube.com/watch?v=XysJEXeLOHw'}
  ],

  Quads: [
    {name:'Back Squat', yt:'https://www.youtube.com/watch?v=rrJIyZGlK8c'},
    {name:'Front Squat', yt:'https://www.youtube.com/watch?v=CE0uSrr4SYQ'},
    {name:'Hack Squat Machine', yt:'https://www.youtube.com/watch?v=MDFUHJxIomA'},
    {name:'Leg Press', yt:'https://www.youtube.com/watch?v=qCR9bN3G1t4'},
    {name:'Leg Extension', yt:'https://www.youtube.com/watch?v=qYxo9ZFvHQE'},
    {name:'Bulgarian Split Squat', yt:'https://www.youtube.com/watch?v=vgn7bSXkgkA'},
    {name:'Walking Lunges', yt:'https://www.youtube.com/watch?v=mAgbXQdd4LM'},
    {name:'Reverse Lunge', yt:'https://www.youtube.com/watch?v=xrPteyQLGAo'},
    {name:'Lateral Lunge', yt:'https://www.youtube.com/watch?v=MvpBUsQrt_4'},
    {name:'Goblet Squat', yt:'https://www.youtube.com/watch?v=xRTMjjZ76GI'},
    {name:'Sissy Squat', yt:'https://www.youtube.com/watch?v=JGD_aMeKBJY'},
    {name:'Box Step-Up', yt:'https://www.youtube.com/watch?v=PHGUzLhhsbQ'},
    {name:'Paused Squat', yt:'https://www.youtube.com/watch?v=H45ttTOGyEM'},
    {name:'Box Squat', yt:'https://www.youtube.com/watch?v=rMEPHwNhQfo'},
    {name:'Zercher Squat', yt:'https://www.youtube.com/watch?v=eDf49a4Vx5k'},
    {name:'Overhead Squat', yt:'https://www.youtube.com/watch?v=BYi-TBOtNTo'},
    {name:'Pendulum Squat', yt:'https://www.youtube.com/watch?v=3_rUY4K8v5s'},
    {name:'Smith Machine Squat', yt:'https://www.youtube.com/watch?v=-eO_VydErV0'},
    {name:'Cyclist Squat', yt:'https://www.youtube.com/watch?v=AdfMPEDpUHI'},
    {name:'Single Leg Press', yt:'https://www.youtube.com/watch?v=BsOg0iBKs6A'},
    {name:'Terminal Knee Extension', yt:'https://www.youtube.com/watch?v=guRzp6o0N6M'},
    {name:'Dumbbell Squat', yt:'https://www.youtube.com/watch?v=meJSJEG_sT0'},,
    {name:'all fours squad stretch', yt:'https://www.youtube.com/watch?v=7ry5HllBdmk'},
    {name:'assisted prone lying quads stretch', yt:'https://www.youtube.com/watch?v=WHus78ycgFM'},
    {name:'assisted side lying adductor stretch', yt:'https://www.youtube.com/watch?v=OzkHJSPm2q8'},
    {name:'backward jump', yt:'https://www.youtube.com/watch?v=j0nl5dWuqN4'},
    {name:'balance board', yt:'https://www.youtube.com/watch?v=Lx5ykCjizpk'},
    {name:'band one arm single leg split squat', yt:'https://www.youtube.com/watch?v=uitEX7zzTu4'},
    {name:'band single leg split squat', yt:'https://www.youtube.com/watch?v=Wl0tJmZ1ulo'},
    {name:'barbell bench front squat', yt:'https://www.youtube.com/watch?v=2K_DrX3xiRA'},
    {name:'barbell bench squat', yt:'https://www.youtube.com/watch?v=RH4NoRq7pDs'},
    {name:'barbell clean and press', yt:'https://www.youtube.com/watch?v=K1QPQBVbTKM'},
    {name:'barbell one leg squat', yt:'https://www.youtube.com/watch?v=vgn7bSXkgkA'},
    {name:'barbell overhead squat', yt:'https://www.youtube.com/watch?v=BYi-TBOtNTo'},
    {name:'barbell side split squat', yt:'https://www.youtube.com/watch?v=VnWGhQgFbSM'},
    {name:'barbell side split squat v. 2', yt:'https://www.youtube.com/watch?v=8tN3Dljp7MI'},
    {name:'barbell single leg split squat', yt:'https://www.youtube.com/watch?v=sZgMPlnwZYo'},
    {name:'barbell split squat v. 2', yt:'https://www.youtube.com/watch?v=8nW4ZwKi4gk'},
    {name:'barbell squat (on knees)', yt:'https://www.youtube.com/watch?v=xqvCmoLULNY'},
    {name:'barbell squat jump step rear lunge', yt:'https://www.youtube.com/watch?v=0pTBkUPuMkk'},
    {name:'barbell wide squat', yt:'https://www.youtube.com/watch?v=rrJIyZGlK8c'},
    {name:'butterfly yoga pose', yt:'https://www.youtube.com/watch?v=4J7kbCmPScQ'},
    {name:'cable hip adduction', yt:'https://www.youtube.com/watch?v=P1pLE1jmnI0'},
    {name:'chair leg extended stretch', yt:'https://www.youtube.com/watch?v=8_zQcRf9wEk'},
    {name:'dumbbell goblet squat', yt:'https://www.youtube.com/watch?v=gWK1XmvQzYE'},
    {name:'dumbbell single leg split squat', yt:'https://www.youtube.com/watch?v=Fmjj7wFJWRE'},
    {name:'dumbbell step-up lunge', yt:'https://www.youtube.com/watch?v=l356oYQoz-4'},
    {name:'dumbbell step-up split squat', yt:'https://www.youtube.com/watch?v=Fmjj7wFJWRE'},
    {name:'dumbbell supported squat', yt:'https://www.youtube.com/watch?v=MJao9o7ROs0'},
    {name:'farmers walk', yt:'https://www.youtube.com/watch?v=8OtwXwrJizk'},
    {name:'forward jump', yt:'https://www.youtube.com/watch?v=NRxiu6ERegA'},
    {name:'intermediate hip flexor and quad stretch', yt:'https://www.youtube.com/watch?v=NKgF-ILjmCg'},
    {name:'lever alternate leg press', yt:'https://www.youtube.com/watch?v=dhRz1Ns60Zg'},
    {name:'lever leg extension', yt:'https://www.youtube.com/watch?v=qYxo9ZFvHQE'},
    {name:'lever seated hip adduction', yt:'https://www.youtube.com/watch?v=CjAVezAggkI'},
    {name:'lying (side) quads stretch', yt:'https://www.youtube.com/watch?v=Ql3ZxIgLl4U'},
    {name:'quads', yt:'https://www.youtube.com/results?search_query=quads%20exercise%20form%20tutorial'},
    {name:'quick feet v. 2', yt:'https://www.youtube.com/watch?v=tnR_6qtYSho'},
    {name:'resistance band leg extension', yt:'https://www.youtube.com/watch?v=lwmgRyEjWvs'},
    {name:'side lying hip adduction (male)', yt:'https://www.youtube.com/watch?v=lhwT35sshrI'},
    {name:'side plank hip adduction', yt:'https://www.youtube.com/watch?v=lTxjunEIPpk'},
    {name:'smith chair squat', yt:'https://www.youtube.com/watch?v=AHPWTuNa8J0'},
    {name:'smith single leg split squat', yt:'https://www.youtube.com/watch?v=sZgMPlnwZYo'},
    {name:'split squats', yt:'https://www.youtube.com/watch?v=hXpGSa5HYqY'},
    {name:'squat jerk', yt:'https://www.youtube.com/watch?v=N5JcuERvwAA'},
    {name:'squat on bosu ball', yt:'https://www.youtube.com/watch?v=2fV6yTWHZyM'},
    {name:'squat to overhead reach', yt:'https://www.youtube.com/watch?v=2zqGivvCHn8'},
    {name:'squat to overhead reach with twist', yt:'https://www.youtube.com/watch?v=B0qMq_v6ryA'},
    {name:'suspended split squat', yt:'https://www.youtube.com/watch?v=hXpGSa5HYqY'},
    {name:'weighted sissy squat', yt:'https://www.youtube.com/watch?v=RKPQCiJkKjE'}
  ],

  Hamstrings: [
    {name:'Romanian Deadlift', yt:'https://www.youtube.com/watch?v=xgusDooVfKU'},
    {name:'Stiff-Leg Deadlift', yt:'https://www.youtube.com/watch?v=CN_7cz3P-1U'},
    {name:'Lying Leg Curl', yt:'https://www.youtube.com/watch?v=jxctD6fL_FQ'},
    {name:'Seated Leg Curl', yt:'https://www.youtube.com/watch?v=Orxowest56U'},
    {name:'Standing Leg Curl', yt:'https://www.youtube.com/watch?v=i6zmbXp4Ico'},
    {name:'Nordic Curl', yt:'https://www.youtube.com/watch?v=Lgibr8od0yA'},
    {name:'Glute-Ham Raise', yt:'https://www.youtube.com/watch?v=SBGYSfoqyfU'},
    {name:'Dumbbell Romanian Deadlift', yt:'https://www.youtube.com/watch?v=xAL7lHwj30E'},
    {name:'Single Leg Romanian Deadlift', yt:'https://www.youtube.com/watch?v=JQZqPsmeesc'},
    {name:'Cable Pull Through', yt:'https://www.youtube.com/watch?v=YJgLYPw7TKw'},
    {name:'Kettlebell Swing', yt:'https://www.youtube.com/watch?v=1cVT3ee9mgU'},
    {name:'Banded Leg Curl', yt:'https://www.youtube.com/watch?v=yJMdgnhtKgI'},
    {name:'Nordic Hamstring Curl', yt:'https://www.youtube.com/watch?v=Lgibr8od0yA'},
    {name:'Snatch Grip Deadlift', yt:'https://www.youtube.com/watch?v=0Ah-ol5EGlo'},
    {name:'Good Morning Hamstrings', yt:'https://www.youtube.com/watch?v=WXD7lqv4Y0k'},,
    {name:'assisted prone hamstring', yt:'https://www.youtube.com/watch?v=LtTcXXgeRYo'},
    {name:'barbell good morning', yt:'https://www.youtube.com/watch?v=nWyx81AfTos'},
    {name:'barbell straight leg deadlift', yt:'https://www.youtube.com/watch?v=fkej6PUmvmc'},
    {name:'cable assisted inverse leg curl', yt:'https://www.youtube.com/watch?v=2Pw1S_oDij0'},
    {name:'dumbbell lying femoral', yt:'https://www.youtube.com/watch?v=QWhO51VnzOU'},
    {name:'exercise ball seated hamstring stretch', yt:'https://www.youtube.com/watch?v=wdTzBXb0izA'},
    {name:'inverse leg curl (bench support)', yt:'https://www.youtube.com/watch?v=mtQ4zly_LBs'},
    {name:'inverse leg curl (on pull-up cable machine)', yt:'https://www.youtube.com/watch?v=F6FKTmYnJbk'},
    {name:'kettlebell hang clean', yt:'https://www.youtube.com/watch?v=LbOMTmg3qkI'},
    {name:'kick out sit', yt:'https://www.youtube.com/watch?v=qHxL8y6xaRE'},
    {name:'leg up hamstring stretch', yt:'https://www.youtube.com/watch?v=5P3E8Pec_L8'},
    {name:'lever kneeling leg curl', yt:'https://www.youtube.com/watch?v=Ky0f47H0zGs'},
    {name:'lever lying leg curl', yt:'https://www.youtube.com/watch?v=5xR8tvg4-yM'},
    {name:'lever lying two-one leg curl', yt:'https://www.youtube.com/watch?v=kCSE7LayOV0'},
    {name:'lever seated leg curl', yt:'https://www.youtube.com/watch?v=Orxowest56U'},
    {name:'reclining big toe pose with rope', yt:'https://www.youtube.com/watch?v=x3oMtkcmUz0'},
    {name:'runners stretch', yt:'https://www.youtube.com/watch?v=A6pO5wL-Oco'},
    {name:'seated wide angle pose sequence', yt:'https://www.youtube.com/watch?v=BjAikn9JlbQ'},
    {name:'self assisted inverse leg curl', yt:'https://www.youtube.com/watch?v=2Pw1S_oDij0'},
    {name:'self assisted inverse leg curl (on floor)', yt:'https://www.youtube.com/watch?v=wkre-DIahjI'},
    {name:'single leg platform slide', yt:'https://www.youtube.com/watch?v=SLRv1VZIpQs'},
    {name:'standing hamstring and calf stretch with strap', yt:'https://www.youtube.com/watch?v=n7BflPmjxtU'},
    {name:'standing single leg curl', yt:'https://www.youtube.com/watch?v=gQQzEAynDx0'}
  ],

  Glutes: [
    {name:'Barbell Hip Thrust', yt:'https://www.youtube.com/watch?v=5S8SApGU_Lk'},
    {name:'Dumbbell Hip Thrust', yt:'https://www.youtube.com/watch?v=Q2PMzlxGRFU'},
    {name:'Hip Thrust Machine', yt:'https://www.youtube.com/watch?v=pF17m_CXfL0'},
    {name:'Banded Hip Thrust', yt:'https://www.youtube.com/watch?v=0XXUdRSTBxA'},
    {name:'Glute Bridge', yt:'https://www.youtube.com/watch?v=tqp5XQPpTxY'},
    {name:'Single Leg Glute Bridge', yt:'https://www.youtube.com/watch?v=sVfp4LN9niA'},
    {name:'Cable Kickback', yt:'https://www.youtube.com/watch?v=dU1R-AHW4IM'},
    {name:'Donkey Kickback Machine', yt:'https://www.youtube.com/watch?v=BNDw4ciQoQI'},
    {name:'Abduction Machine', yt:'https://www.youtube.com/watch?v=_ARUxqrII3Y'},
    {name:'Cable Abduction', yt:'https://www.youtube.com/watch?v=EHq78mQYLbI'},
    {name:'Banded Glute Walk', yt:'https://www.youtube.com/watch?v=5VtGyiddPh4'},
    {name:'Reverse Hyper', yt:'https://www.youtube.com/watch?v=MT0U96RqkhM'},
    {name:'Frog Pump', yt:'https://www.youtube.com/watch?v=wklI-e2WpFQ'},
    {name:'45-Degree Hyperextension', yt:'https://www.youtube.com/watch?v=G67phY3O-yk'},
    {name:'Back Extension', yt:'https://www.youtube.com/watch?v=9ceFn3bH5ls'},
    {name:'Sumo Deadlift Glute Focus', yt:'https://www.youtube.com/watch?v=h9R4PRJGFTI'},
    {name:'Clamshell Glutes', yt:'https://www.youtube.com/watch?v=gFyIjunfbbg'},
    {name:'Fire Hydrant', yt:'https://www.youtube.com/watch?v=12whZWUANRY'},,
    {name:'arms apart circular toe touch (male)', yt:'https://www.youtube.com/watch?v=TOseXxRQwdI'},
    {name:'assisted lying glutes stretch', yt:'https://www.youtube.com/watch?v=YBV6d5TluFA'},
    {name:'assisted lying gluteus and piriformis stretch', yt:'https://www.youtube.com/watch?v=q3VG_Hk8LaU'},
    {name:'band bent-over hip extension', yt:'https://www.youtube.com/watch?v=wrQixJxbh3o'},
    {name:'band hip lift', yt:'https://www.youtube.com/watch?v=2OaqZ-QAiYw'},
    {name:'band lying hip internal rotation', yt:'https://www.youtube.com/watch?v=RpPK1N1fsSI'},
    {name:'band pull through', yt:'https://www.youtube.com/watch?v=Hro0lCFQTxo'},
    {name:'band seated hip internal rotation', yt:'https://www.youtube.com/watch?v=_5ZNeQgPTqo'},
    {name:'band squat', yt:'https://www.youtube.com/watch?v=QF0TKq-5Ngg'},
    {name:'band squat row', yt:'https://www.youtube.com/watch?v=zxB8Je5BrTA'},
    {name:'band step-up', yt:'https://www.youtube.com/watch?v=hvxGZBZlOxg'},
    {name:'band stiff leg deadlift', yt:'https://www.youtube.com/watch?v=NokTkbeeL4M'},
    {name:'band straight back stiff leg deadlift', yt:'https://www.youtube.com/watch?v=CN_7cz3P-1U'},
    {name:'barbell clean-grip front squat', yt:'https://www.youtube.com/watch?v=HEtCKJjacXw'},
    {name:'barbell deadlift', yt:'https://www.youtube.com/watch?v=yPqv3ejnZvc'},
    {name:'barbell front chest squat', yt:'https://www.youtube.com/watch?v=Q1Ypb8ZNzI4'},
    {name:'barbell front squat', yt:'https://www.youtube.com/watch?v=Q1Ypb8ZNzI4'},
    {name:'barbell full squat', yt:'https://www.youtube.com/watch?v=rrJIyZGlK8c'},
    {name:'barbell full squat (back pov)', yt:'https://www.youtube.com/watch?v=2WWFeEplsJY'},
    {name:'barbell full squat (side pov)', yt:'https://www.youtube.com/watch?v=wknMoOzj9ZQ'},
    {name:'barbell full zercher squat', yt:'https://www.youtube.com/watch?v=eDf49a4Vx5k'},
    {name:'barbell glute bridge', yt:'https://www.youtube.com/watch?v=cirBJ4FrxXQ'},
    {name:'barbell glute bridge two legs on bench (male)', yt:'https://www.youtube.com/watch?v=cirBJ4FrxXQ'},
    {name:'barbell hack squat', yt:'https://www.youtube.com/watch?v=xGdM4WYOfzM'},
    {name:'barbell high bar squat', yt:'https://www.youtube.com/watch?v=rrJIyZGlK8c'},
    {name:'barbell jefferson squat', yt:'https://www.youtube.com/watch?v=GCaXhOr_ir4'},
    {name:'barbell jump squat', yt:'https://www.youtube.com/watch?v=0pTBkUPuMkk'},
    {name:'barbell lateral lunge', yt:'https://www.youtube.com/watch?v=-ggTGE8A-6w'},
    {name:'barbell low bar squat', yt:'https://www.youtube.com/watch?v=kuEmpSXXgvw'},
    {name:'barbell lunge', yt:'https://www.youtube.com/watch?v=Z6i2IQqTuU0'},
    {name:'barbell lying lifting (on hip)', yt:'https://www.youtube.com/watch?v=5S8SApGU_Lk'},
    {name:'barbell narrow stance squat', yt:'https://www.youtube.com/watch?v=sMVyjUCp-XI'},
    {name:'barbell one arm side deadlift', yt:'https://www.youtube.com/watch?v=_olwv2xGbuA'},
    {name:'barbell rack pull', yt:'https://www.youtube.com/watch?v=zXgmdk-cnMA'},
    {name:'barbell rear lunge', yt:'https://www.youtube.com/watch?v=sb1GbA4Dp04'},
    {name:'barbell rear lunge v. 2', yt:'https://www.youtube.com/watch?v=cmBDwc83hIk'},
    {name:'barbell romanian deadlift', yt:'https://www.youtube.com/watch?v=xgusDooVfKU'},
    {name:'barbell seated good morning', yt:'https://www.youtube.com/watch?v=ZPeJ0s8X6Gs'},
    {name:'barbell single leg deadlift', yt:'https://www.youtube.com/watch?v=fkej6PUmvmc'},
    {name:'barbell speed squat', yt:'https://www.youtube.com/watch?v=xqvCmoLULNY'},
    {name:'barbell step-up', yt:'https://www.youtube.com/watch?v=eRORoA6n_QQ'},
    {name:'barbell stiff leg good morning', yt:'https://www.youtube.com/watch?v=nHlQimZZzRM'},
    {name:'barbell sumo deadlift', yt:'https://www.youtube.com/watch?v=sVzt89-iXoM'},
    {name:'barbell zercher squat', yt:'https://www.youtube.com/watch?v=eDf49a4Vx5k'},
    {name:'basic toe touch (male)', yt:'https://www.youtube.com/watch?v=5ni_U8LRr1g'},
    {name:'bench hip extension', yt:'https://www.youtube.com/watch?v=YGUOyLf6BUg'},
    {name:'bent knee lying twist (male)', yt:'https://www.youtube.com/watch?v=NSZ6YAm9L2w'},
    {name:'bodyweight drop jump squat', yt:'https://www.youtube.com/watch?v=dkS9j0GJw5E'},
    {name:'cable deadlift', yt:'https://www.youtube.com/watch?v=9wWvRL9AKjs'},
    {name:'cable pull through (with rope)', yt:'https://www.youtube.com/watch?v=YJgLYPw7TKw'},
    {name:'cable standing hip extension', yt:'https://www.youtube.com/watch?v=puxhZ_PJjfU'},
    {name:'curtsey squat', yt:'https://www.youtube.com/watch?v=Ttxk27hcJe8'},
    {name:'dumbbell bench squat', yt:'https://www.youtube.com/watch?v=GDBbonl725s'},
    {name:'dumbbell clean', yt:'https://www.youtube.com/watch?v=uCeNCZFk34c'},
    {name:'dumbbell contralateral forward lunge', yt:'https://www.youtube.com/watch?v=domw9ktlGTU'},
    {name:'dumbbell deadlift', yt:'https://www.youtube.com/watch?v=plb5jEO4Unw'},
    {name:'dumbbell lunge', yt:'https://www.youtube.com/watch?v=BvnVtpQkrHE'},
    {name:'dumbbell one arm snatch', yt:'https://www.youtube.com/watch?v=lY5eC9lqe-w'},
    {name:'dumbbell plyo squat', yt:'https://www.youtube.com/watch?v=X_iYMhn0jyQ'},
    {name:'dumbbell rear lunge', yt:'https://www.youtube.com/watch?v=MpfeGnBFEo8'},
    {name:'dumbbell single leg deadlift', yt:'https://www.youtube.com/watch?v=pJewPISyHjw'},
    {name:'dumbbell single leg deadlift with stepbox support', yt:'https://www.youtube.com/watch?v=zBgP-S0Tf8s'},
    {name:'dumbbell single leg squat', yt:'https://www.youtube.com/watch?v=BTbZE2UEfMM'},
    {name:'dumbbell step-up', yt:'https://www.youtube.com/watch?v=9ZknEYboBOQ'},
    {name:'dumbbell stiff leg deadlift', yt:'https://www.youtube.com/watch?v=cYKYGwcg0U8'},
    {name:'dumbbell straight leg deadlift', yt:'https://www.youtube.com/watch?v=R6KXyhU4nTY'},
    {name:'dumbbell sumo pull through', yt:'https://www.youtube.com/watch?v=3eS9s7GBzRw'},
    {name:'exercise ball hip flexor stretch', yt:'https://www.youtube.com/watch?v=ZkCsxbd_M4I'},
    {name:'exercise ball one leg prone lower body rotation', yt:'https://www.youtube.com/watch?v=Px1gLVjhweQ'},
    {name:'exercise ball one legged diagonal kick hamstring curl', yt:'https://www.youtube.com/watch?v=cIr8me2mf7k'},
    {name:'flutter kicks', yt:'https://www.youtube.com/watch?v=ZB1SwBRVLCc'},
    {name:'forward lunge (male)', yt:'https://www.youtube.com/watch?v=O0l2LZZj6AI'},
    {name:'frankenstein squat', yt:'https://www.youtube.com/watch?v=I2GGUsy3gp4'},
    {name:'glute bridge march', yt:'https://www.youtube.com/watch?v=dVjj5RMCg4Y'},
    {name:'glute bridge two legs on bench (male)', yt:'https://www.youtube.com/watch?v=QTlSAiAGGfQ'},
    {name:'hands clasped circular toe touch (male)', yt:'https://www.youtube.com/watch?v=rfj8IxmsR-U'},
    {name:'hands reversed clasped circular toe touch (male)', yt:'https://www.youtube.com/watch?v=M9xe-dKCcn0'},
    {name:'hug keens to chest', yt:'https://www.youtube.com/watch?v=eYKsxsfcq1s'},
    {name:'iron cross stretch', yt:'https://www.youtube.com/watch?v=7ussK9oVJhk'},
    {name:'jump squat', yt:'https://www.youtube.com/watch?v=5xv0DKqe5XQ'},
    {name:'jump squat v. 2', yt:'https://www.youtube.com/watch?v=5xv0DKqe5XQ'},
    {name:'kettlebell front squat', yt:'https://www.youtube.com/watch?v=SlPwjU6I9gk'},
    {name:'kettlebell goblet squat', yt:'https://www.youtube.com/watch?v=MWHIs0zxkCU'},
    {name:'kettlebell lunge pass through', yt:'https://www.youtube.com/watch?v=Umwubfl7Brs'},
    {name:'kettlebell pistol squat', yt:'https://www.youtube.com/watch?v=3dMMJMSpFV0'},
    {name:'kettlebell turkish get up (squat style)', yt:'https://www.youtube.com/watch?v=eez_eneSDsw'},
    {name:'kneeling jump squat', yt:'https://www.youtube.com/watch?v=BsZnGeTL1Sc'},
    {name:'lever deadlift', yt:'https://www.youtube.com/watch?v=Rk_8MmbYJYU'},
    {name:'lever hip extension v. 2', yt:'https://www.youtube.com/watch?v=4IKwD22wIGY'},
    {name:'lever horizontal one leg press', yt:'https://www.youtube.com/watch?v=gv28KVQFLag'},
    {name:'lever reverse hyperextension', yt:'https://www.youtube.com/watch?v=AHjM_HRnSAs'},
    {name:'lever seated good morning', yt:'https://www.youtube.com/watch?v=RGcNDV8d0Wc'},
    {name:'lever seated hip abduction', yt:'https://www.youtube.com/watch?v=G_8LItOiZ0Q'},
    {name:'low glute bridge on floor', yt:'https://www.youtube.com/watch?v=FEpc_Zgw9UY'},
    {name:'lunge with jump', yt:'https://www.youtube.com/watch?v=cIkkHg8YZQU'},
    {name:'march sit (wall)', yt:'https://www.youtube.com/watch?v=oewbBNdYMFw'},
    {name:'monster walk', yt:'https://www.youtube.com/watch?v=snbNxUIUQPc'},
    {name:'one leg squat', yt:'https://www.youtube.com/watch?v=u_vJD-fiGWA'},
    {name:'outside leg kick push-up', yt:'https://www.youtube.com/watch?v=zQZeZfYG0MU'},
    {name:'pelvic tilt into bridge', yt:'https://www.youtube.com/watch?v=syoirIxumiY'},
    {name:'pike-to-cobra push-up', yt:'https://www.youtube.com/watch?v=XckEEwa1BPI'},
    {name:'potty squat with support', yt:'https://www.youtube.com/watch?v=uy5D-xYviAE'},
    {name:'push-up inside leg kick', yt:'https://www.youtube.com/watch?v=Vjy8Uu2ILZ0'},
    {name:'rear decline bridge', yt:'https://www.youtube.com/watch?v=tqp5XQPpTxY'},
    {name:'resistance band hip thrusts on knees (female)', yt:'https://www.youtube.com/watch?v=HZ0vjMAmpfI'},
    {name:'resistance band seated hip abduction', yt:'https://www.youtube.com/watch?v=Jze-SKrqUuU'},
    {name:'reverse hyper extension (on stability ball)', yt:'https://www.youtube.com/watch?v=zaUq4jvsWO0'},
    {name:'reverse hyper on flat bench', yt:'https://www.youtube.com/watch?v=6suVoGBjZGs'},
    {name:'rocking frog stretch', yt:'https://www.youtube.com/watch?v=JIsBynDwSx4'},
    {name:'roller hip lat stretch', yt:'https://www.youtube.com/watch?v=nNm2dM7wEWM'},
    {name:'roller hip stretch', yt:'https://www.youtube.com/watch?v=eI9qLfSlCuI'},
    {name:'seated glute stretch', yt:'https://www.youtube.com/watch?v=FcHu8mjKVV4'},
    {name:'seated piriformis stretch', yt:'https://www.youtube.com/watch?v=2E8WWX4cOc4'},
    {name:'side bridge hip abduction', yt:'https://www.youtube.com/watch?v=pHuMlGkcvPI'},
    {name:'side hip abduction', yt:'https://www.youtube.com/watch?v=oss3i2nRgY4'},
    {name:'single leg bridge with outstretched leg', yt:'https://www.youtube.com/watch?v=TVCditGLwyw'},
    {name:'single leg squat (pistol) male', yt:'https://www.youtube.com/watch?v=PmbWwwdyZ7M'},
    {name:'sled 45 degrees one leg press', yt:'https://www.youtube.com/watch?v=q4W4_VJbKW0'},
    {name:'sled 45в° leg press', yt:'https://www.youtube.com/watch?v=40FfCtdzh9s'},
    {name:'sled 45в° leg press (back pov)', yt:'https://www.youtube.com/watch?v=n9m_uLBIkWA'},
    {name:'sled 45° leg press (side pov)', yt:'https://www.youtube.com/watch?v=ueIS6jEfBeo'},
    {name:'sled 45в° leg wide press', yt:'https://www.youtube.com/watch?v=WyvKYtcFiz4'},
    {name:'sled closer hack squat', yt:'https://www.youtube.com/watch?v=eVexZxVN6kc'},
    {name:'sled hack squat', yt:'https://www.youtube.com/watch?v=eVexZxVN6kc'},
    {name:'sled lying squat', yt:'https://www.youtube.com/watch?v=ocOPqVDOCUk'},
    {name:'smith bent knee good morning', yt:'https://www.youtube.com/watch?v=35nVFonWPbA'},
    {name:'smith deadlift', yt:'https://www.youtube.com/watch?v=7Ksm-p5kMTs'},
    {name:'smith front squat (clean grip)', yt:'https://www.youtube.com/watch?v=gIMeUBDVDZk'},
    {name:'smith full squat', yt:'https://www.youtube.com/watch?v=-eO_VydErV0'},
    {name:'smith hack squat', yt:'https://www.youtube.com/watch?v=zZj-ibOLJHs'},
    {name:'smith leg press', yt:'https://www.youtube.com/watch?v=00f60YNxIgg'},
    {name:'smith low bar squat', yt:'https://www.youtube.com/watch?v=ECnGnHe8cVs'},
    {name:'smith sprint lunge', yt:'https://www.youtube.com/watch?v=MZF1JD6O9cg'},
    {name:'smith squat', yt:'https://www.youtube.com/watch?v=-eO_VydErV0'},
    {name:'smith sumo squat', yt:'https://www.youtube.com/watch?v=_4Mxm3RAboU'},
    {name:'spider crawl push up', yt:'https://www.youtube.com/watch?v=7xb2i7VbDQ4'},
    {name:'straight leg outer hip abductor', yt:'https://www.youtube.com/watch?v=G_8LItOiZ0Q'},
    {name:'swimmer kicks v. 2 (male)', yt:'https://www.youtube.com/watch?v=Vxlf9_eE1JI'},
    {name:'tire flip', yt:'https://www.youtube.com/watch?v=44E5KRVFWVQ'},
    {name:'twist hip lift', yt:'https://www.youtube.com/watch?v=OQUpxjdSuSM'},
    {name:'walking lunge', yt:'https://www.youtube.com/watch?v=mAgbXQdd4LM'},
    {name:'weighted cossack squats (male)', yt:'https://www.youtube.com/watch?v=iPZNB5GsOnM'},
    {name:'weighted lunge with swing', yt:'https://www.youtube.com/watch?v=wwPXUujfwWI'},
    {name:'weighted squat', yt:'https://www.youtube.com/watch?v=rrJIyZGlK8c'},
    {name:'weighted stretch lunge', yt:'https://www.youtube.com/watch?v=x5M-swTOTFg'}
  ],

  Calves: [
    {name:'Standing Calf Raise', yt:'https://www.youtube.com/watch?v=nnPGrBLNlaw'},
    {name:'Seated Calf Raise', yt:'https://www.youtube.com/watch?v=3ZRe_QpvRPg'},
    {name:'Leg Press Calf Raise', yt:'https://www.youtube.com/watch?v=shquCR3VVp4'},
    {name:'Donkey Calf Raise', yt:'https://www.youtube.com/watch?v=IMXwPWfCeGU'},
    {name:'Single Leg Calf Raise', yt:'https://www.youtube.com/watch?v=qPd73snQfUs'},
    {name:'Calf Raise Machine', yt:'https://www.youtube.com/watch?v=shquCR3VVp4'},
    {name:'Eccentric Calf Raise', yt:'https://www.youtube.com/watch?v=aD2NhWvuL8Y'},
    {name:'Tibialis Raise', yt:'https://www.youtube.com/watch?v=VzIcGAgBiaM'},
    {name:'Explosive Calf Raise', yt:'https://www.youtube.com/watch?v=LNUkGmFwryY'},
    {name:'Banded Calf Raise', yt:'https://www.youtube.com/watch?v=a2xjbhP4MkY'},,
    {name:'ankle circles', yt:'https://www.youtube.com/watch?v=mzTQGYGI0Ng'},
    {name:'assisted lying calves stretch', yt:'https://www.youtube.com/watch?v=spQfbrgbMY8'},
    {name:'band single leg calf raise', yt:'https://www.youtube.com/watch?v=3uhlWefDhds'},
    {name:'band single leg reverse calf raise', yt:'https://www.youtube.com/watch?v=V71szkppQpY'},
    {name:'band two legs calf raise - (band under both legs) v. 2', yt:'https://www.youtube.com/watch?v=Af2Q7RaUJt4'},
    {name:'barbell floor calf raise', yt:'https://www.youtube.com/watch?v=81dfL05QKuI'},
    {name:'barbell seated calf raise', yt:'https://www.youtube.com/watch?v=PMYBu2wyczo'},
    {name:'barbell standing calf raise', yt:'https://www.youtube.com/watch?v=4vK3pLd4Akg'},
    {name:'barbell standing leg calf raise', yt:'https://www.youtube.com/watch?v=HfK9uB78g78'},
    {name:'barbell standing rocking leg calf raise', yt:'https://www.youtube.com/watch?v=Gu4I8EaTy1I'},
    {name:'bodyweight standing calf raise', yt:'https://www.youtube.com/watch?v=Uyg2QR1WAq8'},
    {name:'box jump down with one leg stabilization', yt:'https://www.youtube.com/watch?v=5QTEZcusGyk'},
    {name:'cable standing calf raise', yt:'https://www.youtube.com/watch?v=Kx5fAImDxeQ'},
    {name:'cable standing one leg calf raise', yt:'https://www.youtube.com/watch?v=QEILIo9Kzlw'},
    {name:'calf push stretch with hands against wall', yt:'https://www.youtube.com/watch?v=m-P-qMLK2wU'},
    {name:'calf stretch with hands against wall', yt:'https://www.youtube.com/watch?v=doJjmXBDIvs'},
    {name:'calf stretch with rope', yt:'https://www.youtube.com/watch?v=g0TLI5Uv4_s'},
    {name:'circles knee stretch', yt:'https://www.youtube.com/watch?v=auEyQlRXesI'},
    {name:'dumbbell seated calf raise', yt:'https://www.youtube.com/watch?v=UnBXxegoaCI'},
    {name:'dumbbell seated one leg calf raise', yt:'https://www.youtube.com/watch?v=pYWQCNBZSeo'},
    {name:'dumbbell seated one leg calf raise - hammer grip', yt:'https://www.youtube.com/watch?v=VZSgIfD4LsY'},
    {name:'dumbbell seated one leg calf raise - palm up', yt:'https://www.youtube.com/watch?v=hetDEamcsV0'},
    {name:'dumbbell single leg calf raise', yt:'https://www.youtube.com/watch?v=hP6ntc92ASk'},
    {name:'dumbbell standing calf raise', yt:'https://www.youtube.com/watch?v=GyWw_Q_aIbE'},
    {name:'exercise ball on the wall calf raise', yt:'https://www.youtube.com/watch?v=lOE-sPrCrQg'},
    {name:'exercise ball on the wall calf raise (tennis ball between ankles)', yt:'https://www.youtube.com/watch?v=shYBAMJiQW0'},
    {name:'exercise ball on the wall calf raise (tennis ball between knees)', yt:'https://www.youtube.com/watch?v=shYBAMJiQW0'},
    {name:'hack calf raise', yt:'https://www.youtube.com/watch?v=Cce8LrfoheY'},
    {name:'hack one leg calf raise', yt:'https://www.youtube.com/watch?v=QEILIo9Kzlw'},
    {name:'lever calf press', yt:'https://www.youtube.com/watch?v=shquCR3VVp4'},
    {name:'lever donkey calf raise', yt:'https://www.youtube.com/watch?v=IMXwPWfCeGU'},
    {name:'lever rotary calf', yt:'https://www.youtube.com/watch?v=jXy5nuTMvAg'},
    {name:'lever seated calf press', yt:'https://www.youtube.com/watch?v=LB1C1Lhpz3c'},
    {name:'lever seated calf raise', yt:'https://www.youtube.com/watch?v=3ZRe_QpvRPg'},
    {name:'lever seated squat calf raise on leg press machine', yt:'https://www.youtube.com/watch?v=LB1C1Lhpz3c'},
    {name:'lever standing calf raise', yt:'https://www.youtube.com/watch?v=g_E7_q1z2bo'},
    {name:'one leg donkey calf raise', yt:'https://www.youtube.com/watch?v=IW8ALIumVlw'},
    {name:'one leg floor calf raise', yt:'https://www.youtube.com/watch?v=QEILIo9Kzlw'},
    {name:'peroneals stretch', yt:'https://www.youtube.com/watch?v=Ck3I82N5Gag'},
    {name:'posterior tibialis stretch', yt:'https://www.youtube.com/watch?v=Sf2YSfCGSC4'},
    {name:'seated calf stretch (male)', yt:'https://www.youtube.com/watch?v=83G00Fwlqqw'},
    {name:'single leg calf raise (on a dumbbell)', yt:'https://www.youtube.com/watch?v=ElcvJ0kjt6c'},
    {name:'sled 45в° calf press', yt:'https://www.youtube.com/watch?v=tV0iVATVTQg'},
    {name:'sled calf press on leg press', yt:'https://www.youtube.com/watch?v=shquCR3VVp4'},
    {name:'sled forward angled calf raise', yt:'https://www.youtube.com/watch?v=0eaICNl7y_Y'},
    {name:'sled lying calf press', yt:'https://www.youtube.com/watch?v=6rb8cUqFuJs'},
    {name:'sled one leg calf press on leg press', yt:'https://www.youtube.com/watch?v=shquCR3VVp4'},
    {name:'smith one leg floor calf raise', yt:'https://www.youtube.com/watch?v=Nd25-BniuGQ'},
    {name:'smith reverse calf raises', yt:'https://www.youtube.com/watch?v=sO1z-zhWG_E'},
    {name:'smith seated one leg calf raise', yt:'https://www.youtube.com/watch?v=Nd25-BniuGQ'},
    {name:'smith standing leg calf raise', yt:'https://www.youtube.com/watch?v=FNdI5TynYxs'},
    {name:'smith toe raise', yt:'https://www.youtube.com/watch?v=enJ6yYJerVw'},
    {name:'standing calf raise (on a staircase)', yt:'https://www.youtube.com/watch?v=jfKTT_hr8bk'},
    {name:'standing calves', yt:'https://www.youtube.com/watch?v=Km0QS46bTEA'},
    {name:'standing calves calf stretch', yt:'https://www.youtube.com/watch?v=GTOBvb45lgg'},
    {name:'weighted donkey calf raise', yt:'https://www.youtube.com/watch?v=IMXwPWfCeGU'}
  ],

  Biceps: [
    {name:'Barbell Curl', yt:'https://www.youtube.com/watch?v=dDI8ClxRS04'},
    {name:'Dumbbell Curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'Hammer Curl', yt:'https://www.youtube.com/watch?v=OPqe0kCxmR8'},
    {name:'Incline Dumbbell Curl', yt:'https://www.youtube.com/watch?v=aTYlqC_JacQ'},
    {name:'Cable Curl', yt:'https://www.youtube.com/watch?v=rfRdD5PKrko'},
    {name:'EZ Bar Preacher Curl', yt:'https://www.youtube.com/watch?v=sxA__DoLsgo'},
    {name:'Dumbbell Preacher Curl', yt:'https://www.youtube.com/watch?v=9WDQqgiwQEY'},
    {name:'Concentration Curl', yt:'https://www.youtube.com/watch?v=VMbDQ8PZazY'},
    {name:'EZ-Bar Curl', yt:'https://www.youtube.com/watch?v=-gSM-kqNlUw'},
    {name:'Cross Body Hammer Curl', yt:'https://www.youtube.com/watch?v=lgOuK76wuiE'},
    {name:'Spider Curl', yt:'https://www.youtube.com/watch?v=ke2shAeQ0O8'},
    {name:'Zottman Curl', yt:'https://www.youtube.com/watch?v=ZXbOOIOPOi8'},
    {name:'Cable Hammer Curl Rope', yt:'https://www.youtube.com/watch?v=-6ZgZZJTqZA'},
    {name:'Reverse Curl', yt:'https://www.youtube.com/watch?v=hUA-fIpM7nA'},
    {name:'21s Barbell Curl', yt:'https://www.youtube.com/watch?v=xbwabcVL3Jw'},
    {name:'Drag Curl', yt:'https://www.youtube.com/watch?v=5PdEraHkF1A'},
    {name:'Cable Curl High Pulley', yt:'https://www.youtube.com/watch?v=WNoVCYCof9E'},
    {name:'Machine Curl', yt:'https://www.youtube.com/watch?v=kfE9Plm8Hks'},
    {name:'Waiter Curl', yt:'https://www.youtube.com/watch?v=s2nkByScgi4'},
    {name:'Bayesian Cable Curl', yt:'https://www.youtube.com/watch?v=S6HnE1fDlaI'},
    {name:'Banded Curl', yt:'https://www.youtube.com/watch?v=cSvDe6oMFlU'},,
    {name:'band alternating biceps curl', yt:'https://www.youtube.com/watch?v=Fg828B79-DA'},
    {name:'band concentration curl', yt:'https://www.youtube.com/watch?v=VMbDQ8PZazY'},
    {name:'band one arm overhead biceps curl', yt:'https://www.youtube.com/watch?v=KhPOS_ZwcV8'},
    {name:'barbell alternate biceps curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'barbell biceps curl (with arm blaster)', yt:'https://www.youtube.com/watch?v=R0oQJSgkyDY'},
    {name:'barbell drag curl', yt:'https://www.youtube.com/watch?v=ZHa0OAcn7Bc'},
    {name:'barbell lying preacher curl', yt:'https://www.youtube.com/watch?v=sxA__DoLsgo'},
    {name:'barbell preacher curl', yt:'https://www.youtube.com/watch?v=sxA__DoLsgo'},
    {name:'barbell prone incline curl', yt:'https://www.youtube.com/watch?v=lfb9Vp3qBiM'},
    {name:'barbell reverse curl', yt:'https://www.youtube.com/watch?v=Zv0-vIhlDIk'},
    {name:'barbell reverse preacher curl', yt:'https://www.youtube.com/watch?v=XmLcuGfGPAg'},
    {name:'barbell seated close-grip concentration curl', yt:'https://www.youtube.com/watch?v=OSrrtY4S6z4'},
    {name:'barbell standing close grip curl', yt:'https://www.youtube.com/watch?v=1bGHpNt0vhU'},
    {name:'barbell standing concentration curl', yt:'https://www.youtube.com/watch?v=N_3UdhgnE44'},
    {name:'barbell standing reverse grip curl', yt:'https://www.youtube.com/watch?v=Zv0-vIhlDIk'},
    {name:'barbell standing wide grip biceps curl', yt:'https://www.youtube.com/watch?v=dDI8ClxRS04'},
    {name:'barbell standing wide-grip curl', yt:'https://www.youtube.com/watch?v=HBSYsbgRbOo'},
    {name:'biceps leg concentration curl', yt:'https://www.youtube.com/watch?v=VMbDQ8PZazY'},
    {name:'biceps narrow pull-ups', yt:'https://www.youtube.com/results?search_query=biceps%20narrow%20pull-ups%20exercise%20form%20tutorial'},
    {name:'biceps pull-up', yt:'https://www.youtube.com/watch?v=7Lcekje9nbs'},
    {name:'bodyweight side lying biceps curl', yt:'https://www.youtube.com/watch?v=77A-EhcOC5A'},
    {name:'cable close grip curl', yt:'https://www.youtube.com/watch?v=evbrPkbmIcY'},
    {name:'cable concentration curl', yt:'https://www.youtube.com/watch?v=VMbDQ8PZazY'},
    {name:'cable drag curl', yt:'https://www.youtube.com/watch?v=3ib-M9kKSvU'},
    {name:'cable hammer curl (with rope)', yt:'https://www.youtube.com/watch?v=-6ZgZZJTqZA'},
    {name:'cable lying bicep curl', yt:'https://www.youtube.com/watch?v=2MUEL4nL6hA'},
    {name:'cable lying close-grip curl', yt:'https://www.youtube.com/watch?v=xVyZIa4dxng'},
    {name:'cable one arm curl', yt:'https://www.youtube.com/watch?v=6uEmkzHIIPg'},
    {name:'cable one arm preacher curl', yt:'https://www.youtube.com/watch?v=ZmtYshzv0FE'},
    {name:'cable one arm reverse preacher curl', yt:'https://www.youtube.com/watch?v=ZmtYshzv0FE'},
    {name:'cable overhead curl', yt:'https://www.youtube.com/watch?v=S7IBBKqWqog'},
    {name:'cable overhead curl on exercise ball', yt:'https://www.youtube.com/watch?v=S7IBBKqWqog'},
    {name:'cable preacher curl', yt:'https://www.youtube.com/watch?v=P33oQtDURjs'},
    {name:'cable pulldown bicep curl', yt:'https://www.youtube.com/watch?v=o2A6j4lQ_-4'},
    {name:'cable reverse curl', yt:'https://www.youtube.com/watch?v=BW6JwixlJYs'},
    {name:'cable reverse one arm curl', yt:'https://www.youtube.com/watch?v=6uEmkzHIIPg'},
    {name:'cable reverse preacher curl', yt:'https://www.youtube.com/watch?v=HwB-DevuJjU'},
    {name:'cable rope hammer preacher curl', yt:'https://www.youtube.com/watch?v=-6ZgZZJTqZA'},
    {name:'cable rope one arm hammer preacher curl', yt:'https://www.youtube.com/watch?v=V8AR3SGzboU'},
    {name:'cable seated curl', yt:'https://www.youtube.com/watch?v=3xY7m0ZSoVY'},
    {name:'cable seated one arm concentration curl', yt:'https://www.youtube.com/watch?v=VMbDQ8PZazY'},
    {name:'cable seated overhead curl', yt:'https://www.youtube.com/watch?v=S7IBBKqWqog'},
    {name:'cable squatting curl', yt:'https://www.youtube.com/watch?v=jvKYabgB6HQ'},
    {name:'cable standing inner curl', yt:'https://www.youtube.com/watch?v=YpHIK9WDeY4'},
    {name:'cable standing pulldown (with rope)', yt:'https://www.youtube.com/watch?v=Z70mhrz9LIc'},
    {name:'cable two arm curl on incline bench', yt:'https://www.youtube.com/watch?v=YmrlN_wJso4'},
    {name:'dumbbell alternate biceps curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell alternate biceps curl (with arm blaster)', yt:'https://www.youtube.com/watch?v=dJMM5j6pqZ8'},
    {name:'dumbbell alternate hammer preacher curl', yt:'https://www.youtube.com/watch?v=32W1sB5DkHY'},
    {name:'dumbbell alternate preacher curl', yt:'https://www.youtube.com/watch?v=fuK3nFvwgXk'},
    {name:'dumbbell alternate seated hammer curl', yt:'https://www.youtube.com/watch?v=BbxA1QF3TxY'},
    {name:'dumbbell alternating bicep curl with leg raised on exercise ball', yt:'https://www.youtube.com/watch?v=5-PP5KieWqo'},
    {name:'dumbbell alternating seated bicep curl on exercise ball', yt:'https://www.youtube.com/watch?v=eZAvPxEB5Dw'},
    {name:'dumbbell bicep curl lunge with bowling motion', yt:'https://www.youtube.com/watch?v=HfviHo9LBQc'},
    {name:'dumbbell bicep curl on exercise ball with leg raised', yt:'https://www.youtube.com/watch?v=5-PP5KieWqo'},
    {name:'dumbbell bicep curl with stork stance', yt:'https://www.youtube.com/watch?v=O0ItzcgJZvs'},
    {name:'dumbbell biceps curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell biceps curl (with arm blaster)', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell biceps curl reverse', yt:'https://www.youtube.com/watch?v=hUA-fIpM7nA'},
    {name:'dumbbell biceps curl squat', yt:'https://www.youtube.com/watch?v=zcNl9Fo4BKs'},
    {name:'dumbbell biceps curl v sit on bosu ball', yt:'https://www.youtube.com/watch?v=5_u42ekpfiM'},
    {name:'dumbbell concentration curl', yt:'https://www.youtube.com/watch?v=VMbDQ8PZazY'},
    {name:'dumbbell cross body hammer curl', yt:'https://www.youtube.com/watch?v=pBxlCWm0ydc'},
    {name:'dumbbell cross body hammer curl v. 2', yt:'https://www.youtube.com/watch?v=hnWiO5v0HzE'},
    {name:'dumbbell hammer curl', yt:'https://www.youtube.com/watch?v=go4y5WBl8Ws'},
    {name:'dumbbell hammer curl on exercise ball', yt:'https://www.youtube.com/watch?v=c0yhUfC9hDc'},
    {name:'dumbbell hammer curl v. 2', yt:'https://www.youtube.com/watch?v=RIEMoYL_h1Y'},
    {name:'dumbbell hammer curls (with arm blaster)', yt:'https://www.youtube.com/watch?v=OPqe0kCxmR8'},
    {name:'dumbbell high curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell incline biceps curl', yt:'https://www.youtube.com/watch?v=aTYlqC_JacQ'},
    {name:'dumbbell incline curl', yt:'https://www.youtube.com/watch?v=aTYlqC_JacQ'},
    {name:'dumbbell incline curl v. 2', yt:'https://www.youtube.com/watch?v=aTYlqC_JacQ'},
    {name:'dumbbell incline hammer curl', yt:'https://www.youtube.com/watch?v=1Z6XiaBxwHQ'},
    {name:'dumbbell incline inner biceps curl', yt:'https://www.youtube.com/watch?v=-vZbnOSZqfc'},
    {name:'dumbbell kneeling bicep curl exercise ball', yt:'https://www.youtube.com/watch?v=BKjsipndQ6o'},
    {name:'dumbbell lunge with bicep curl', yt:'https://www.youtube.com/watch?v=hgR-0CSDu68'},
    {name:'dumbbell lying supine biceps curl', yt:'https://www.youtube.com/watch?v=vEqviI34-dM'},
    {name:'dumbbell lying supine curl', yt:'https://www.youtube.com/watch?v=vEqviI34-dM'},
    {name:'dumbbell lying wide curl', yt:'https://www.youtube.com/watch?v=hB_aZSSi7mA'},
    {name:'dumbbell one arm concentration curl (on stability ball)', yt:'https://www.youtube.com/watch?v=q7xsadXmnfU'},
    {name:'dumbbell one arm hammer preacher curl', yt:'https://www.youtube.com/watch?v=fuK3nFvwgXk'},
    {name:'dumbbell one arm prone curl', yt:'https://www.youtube.com/watch?v=tMEGqKuOa-M'},
    {name:'dumbbell one arm prone hammer curl', yt:'https://www.youtube.com/watch?v=sbDv6hSmUQY'},
    {name:'dumbbell one arm reverse preacher curl', yt:'https://www.youtube.com/watch?v=O5AtkfcoDWc'},
    {name:'dumbbell one arm reverse spider curl', yt:'https://www.youtube.com/watch?v=0gMCpgHFMnM'},
    {name:'dumbbell one arm seated bicep curl on exercise ball', yt:'https://www.youtube.com/watch?v=rWmc4x7GcrQ'},
    {name:'dumbbell one arm seated hammer curl', yt:'https://www.youtube.com/watch?v=AHy25gTY5j0'},
    {name:'dumbbell one arm standing curl', yt:'https://www.youtube.com/watch?v=74qC_TVP8yo'},
    {name:'dumbbell one arm standing hammer curl', yt:'https://www.youtube.com/watch?v=vLnosC7Qi7M'},
    {name:'dumbbell one arm zottman preacher curl', yt:'https://www.youtube.com/watch?v=fRwFF8ZBTy8'},
    {name:'dumbbell over bench neutral wrist curl', yt:'https://www.youtube.com/watch?v=VqN3IEJJ33A'},
    {name:'dumbbell over bench one arm neutral wrist curl', yt:'https://www.youtube.com/watch?v=Q7dTbE4kRUY'},
    {name:'dumbbell peacher hammer curl', yt:'https://www.youtube.com/watch?v=_37keawAZlg'},
    {name:'dumbbell preacher curl over exercise ball', yt:'https://www.youtube.com/watch?v=Std6nlem2LU'},
    {name:'dumbbell prone incline curl', yt:'https://www.youtube.com/watch?v=S8qF0hsx4EA'},
    {name:'dumbbell prone incline hammer curl', yt:'https://www.youtube.com/watch?v=1Z6XiaBxwHQ'},
    {name:'dumbbell revers grip biceps curl', yt:'https://www.youtube.com/watch?v=hUA-fIpM7nA'},
    {name:'dumbbell reverse preacher curl', yt:'https://www.youtube.com/watch?v=u9KUEWe9Zgo'},
    {name:'dumbbell reverse spider curl', yt:'https://www.youtube.com/watch?v=ke2shAeQ0O8'},
    {name:'dumbbell seated alternate hammer curl on exercise ball', yt:'https://www.youtube.com/watch?v=GAWwpYa-CBs'},
    {name:'dumbbell seated bicep curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell seated biceps curl (on stability ball)', yt:'https://www.youtube.com/watch?v=R_exmHAJ8Uk'},
    {name:'dumbbell seated biceps curl to shoulder press', yt:'https://www.youtube.com/watch?v=0qER1IjPNbU'},
    {name:'dumbbell seated curl', yt:'https://www.youtube.com/watch?v=BsULGO70tcU'},
    {name:'dumbbell seated hammer curl', yt:'https://www.youtube.com/watch?v=BbxA1QF3TxY'},
    {name:'dumbbell seated inner biceps curl', yt:'https://www.youtube.com/watch?v=kIcFg-R2fBg'},
    {name:'dumbbell seated neutral wrist curl', yt:'https://www.youtube.com/watch?v=HcDQPcuUlFU'},
    {name:'dumbbell seated one arm bicep curl on exercise ball with leg raised', yt:'https://www.youtube.com/watch?v=tMEGqKuOa-M'},
    {name:'dumbbell seated preacher curl', yt:'https://www.youtube.com/watch?v=fuK3nFvwgXk'},
    {name:'dumbbell seated revers grip concentration curl', yt:'https://www.youtube.com/watch?v=_BpuoWrUxKg'},
    {name:'dumbbell standing alternate hammer curl and press', yt:'https://www.youtube.com/watch?v=uYYc5GK4-eM'},
    {name:'dumbbell standing biceps curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell standing concentration curl', yt:'https://www.youtube.com/watch?v=N_3UdhgnE44'},
    {name:'dumbbell standing inner biceps curl v. 2', yt:'https://www.youtube.com/watch?v=KlguKtIXetQ'},
    {name:'dumbbell standing one arm concentration curl', yt:'https://www.youtube.com/watch?v=nSK-93SoySk'},
    {name:'dumbbell standing one arm curl (over incline bench)', yt:'https://www.youtube.com/watch?v=THwJoKZ5_uY'},
    {name:'dumbbell standing one arm reverse curl', yt:'https://www.youtube.com/watch?v=5DJMpAwYQb8'},
    {name:'dumbbell standing preacher curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell standing reverse curl', yt:'https://www.youtube.com/watch?v=11Asv2qyJ-0'},
    {name:'dumbbell standing zottman preacher curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'dumbbell step up single leg balance with bicep curl', yt:'https://www.youtube.com/watch?v=4dRMCRD0OSM'},
    {name:'dumbbell waiter biceps curl', yt:'https://www.youtube.com/watch?v=FWyQkQDp-oM'},
    {name:'dumbbell zottman curl', yt:'https://www.youtube.com/watch?v=ZXbOOIOPOi8'},
    {name:'dumbbell zottman preacher curl', yt:'https://www.youtube.com/watch?v=fRwFF8ZBTy8'},
    {name:'ez bar seated close grip concentration curl', yt:'https://www.youtube.com/watch?v=6CW6_9yfPJY'},
    {name:'ez barbell close grip preacher curl', yt:'https://www.youtube.com/watch?v=sxA__DoLsgo'},
    {name:'ez barbell close-grip curl', yt:'https://www.youtube.com/watch?v=NjEM-1o5wvI'},
    {name:'ez barbell curl', yt:'https://www.youtube.com/watch?v=ZQWL7omZh94'},
    {name:'ez barbell reverse grip curl', yt:'https://www.youtube.com/watch?v=kPXvDlFNb3s'},
    {name:'ez barbell reverse grip preacher curl', yt:'https://www.youtube.com/watch?v=XmLcuGfGPAg'},
    {name:'ez barbell seated curls', yt:'https://www.youtube.com/watch?v=UNR_5BUYpLg'},
    {name:'ez barbell spider curl', yt:'https://www.youtube.com/watch?v=WG3vdcq__I0'},
    {name:'ez-bar biceps curl (with arm blaster)', yt:'https://www.youtube.com/watch?v=dJMM5j6pqZ8'},
    {name:'ez-barbell standing wide grip biceps curl', yt:'https://www.youtube.com/watch?v=8Mzuf0gLqig'},
    {name:'kettlebell bottoms up clean from the hang position', yt:'https://www.youtube.com/watch?v=If7VfmUPzgA'},
    {name:'kettlebell double alternating hang clean', yt:'https://www.youtube.com/watch?v=nbnaD8-SVfU'},
    {name:'lever bicep curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'},
    {name:'lever hammer grip preacher curl', yt:'https://www.youtube.com/watch?v=32W1sB5DkHY'},
    {name:'lever preacher curl', yt:'https://www.youtube.com/watch?v=sxA__DoLsgo'},
    {name:'lever preacher curl v. 2', yt:'https://www.youtube.com/watch?v=g7hiWfUH6i8'},
    {name:'lever reverse grip preacher curl', yt:'https://www.youtube.com/watch?v=XmLcuGfGPAg'},
    {name:'olympic barbell hammer curl', yt:'https://www.youtube.com/watch?v=G75--M0D8KY'},
    {name:'resistance band seated biceps curl', yt:'https://www.youtube.com/watch?v=mm0jGw3KKi8'},
    {name:'smith machine bicep curl', yt:'https://www.youtube.com/watch?v=kFhrpD-HbPo'},
    {name:'weighted seated bicep curl (on stability ball)', yt:'https://www.youtube.com/watch?v=_B1C_IjcNw0'},
    {name:'weighted standing curl', yt:'https://www.youtube.com/watch?v=6DeLZ6cbgWQ'}
  ],

  Triceps: [
    {name:'Close Grip Bench Press', yt:'https://www.youtube.com/watch?v=XEFDMwmrLAM'},
    {name:'EZ Bar Skull Crusher', yt:'https://www.youtube.com/watch?v=l3rHYPtMUo8'},
    {name:'Dumbbell Skull Crusher', yt:'https://www.youtube.com/watch?v=1BDGIcMTSXc'},
    {name:'Overhead Tricep Extension DB', yt:'https://www.youtube.com/watch?v=Mdm-OiHEy8Q'},
    {name:'Overhead Tricep Extension Cable', yt:'https://www.youtube.com/watch?v=1u18yJELsh0'},
    {name:'Tricep Pushdown Bar', yt:'https://www.youtube.com/watch?v=LXkCrxn3caQ'},
    {name:'Tricep Pushdown Rope', yt:'https://www.youtube.com/watch?v=LXkCrxn3caQ'},
    {name:'Tricep Dips', yt:'https://www.youtube.com/watch?v=89_spgcdQlw'},
    {name:'Bench Dips', yt:'https://www.youtube.com/watch?v=larQGD02ndE'},
    {name:'Dumbbell Kickback', yt:'https://www.youtube.com/watch?v=m_UlDFNX4mk'},
    {name:'Cable Kickback Tricep', yt:'https://www.youtube.com/watch?v=ZvF4Oi_6Vtg'},
    {name:'JM Press', yt:'https://www.youtube.com/watch?v=sQJzzZVqV3k'},
    {name:'Tate Press', yt:'https://www.youtube.com/watch?v=c86r5KVF7Xo'},
    {name:'Single Arm Pushdown', yt:'https://www.youtube.com/watch?v=Cp_bShvMY4c'},
    {name:'EZ Bar Overhead Extension', yt:'https://www.youtube.com/watch?v=gcRZqG8t44c'},
    {name:'Rolling Tricep Extension', yt:'https://www.youtube.com/watch?v=rD5Mz2262fU'},
    {name:'California Press', yt:'https://www.youtube.com/watch?v=vW3kbiiJxjE'},
    {name:'Banded Pushdown', yt:'https://www.youtube.com/watch?v=qjPN6ElNqpc'},,
    {name:'assisted standing triceps extension (with towel)', yt:'https://www.youtube.com/watch?v=fpmhCrrnP0M'},
    {name:'assisted triceps dip (kneeling)', yt:'https://www.youtube.com/watch?v=yZ83t4mrPrI'},
    {name:'band close-grip push-up', yt:'https://www.youtube.com/watch?v=2cdIRe5tcqI'},
    {name:'band side triceps extension', yt:'https://www.youtube.com/watch?v=8-q04odgg4M'},
    {name:'barbell close-grip bench press', yt:'https://www.youtube.com/watch?v=DzA2xZhDGeo'},
    {name:'barbell decline close grip to skull press', yt:'https://www.youtube.com/watch?v=WaYp8DA8-Kc'},
    {name:'barbell incline close grip bench press', yt:'https://www.youtube.com/watch?v=qW10VpXDkjw'},
    {name:'barbell incline reverse-grip press', yt:'https://www.youtube.com/watch?v=BCAjAAJKtzE'},
    {name:'barbell jm bench press', yt:'https://www.youtube.com/watch?v=rZcWkXEOKGI'},
    {name:'barbell lying back of the head tricep extension', yt:'https://www.youtube.com/watch?v=Ma_SNy-WjwU'},
    {name:'barbell lying close-grip press', yt:'https://www.youtube.com/watch?v=DzA2xZhDGeo'},
    {name:'barbell lying close-grip triceps extension', yt:'https://www.youtube.com/watch?v=XPQziBbJVnI'},
    {name:'barbell lying extension', yt:'https://www.youtube.com/watch?v=0EMXo0-INX4'},
    {name:'barbell lying triceps extension', yt:'https://www.youtube.com/watch?v=0EMXo0-INX4'},
    {name:'barbell lying triceps extension skull crusher', yt:'https://www.youtube.com/watch?v=tj81tVq3wLo'},
    {name:'barbell one arm floor press', yt:'https://www.youtube.com/watch?v=0S0pPgQXWNk'},
    {name:'barbell pin presses', yt:'https://www.youtube.com/watch?v=uIue67cL2S4'},
    {name:'barbell reverse close-grip bench press', yt:'https://www.youtube.com/watch?v=DzA2xZhDGeo'},
    {name:'barbell reverse grip skullcrusher', yt:'https://www.youtube.com/watch?v=UlO6PAsNrFM'},
    {name:'barbell seated close grip behind neck triceps extension', yt:'https://www.youtube.com/watch?v=Ma_SNy-WjwU'},
    {name:'barbell seated overhead triceps extension', yt:'https://www.youtube.com/watch?v=ktU2H0DDmwk'},
    {name:'barbell standing overhead triceps extension', yt:'https://www.youtube.com/watch?v=q5X9thiKofE'},
    {name:'bench dip (knees bent)', yt:'https://www.youtube.com/watch?v=ZxlJzAw36mw'},
    {name:'bench dip on floor', yt:'https://www.youtube.com/watch?v=EIw9t0mTnsc'},
    {name:'body-up', yt:'https://www.youtube.com/results?search_query=body-up%20exercise%20form%20tutorial'},
    {name:'bodyweight kneeling triceps extension', yt:'https://www.youtube.com/watch?v=wBwDIJT17rc'},
    {name:'cable alternate triceps extension', yt:'https://www.youtube.com/watch?v=1u18yJELsh0'},
    {name:'cable concentration extension (on knee)', yt:'https://www.youtube.com/watch?v=m8ITxhKnJrY'},
    {name:'cable high pulley overhead tricep extension', yt:'https://www.youtube.com/watch?v=ns-RGsbzqok'},
    {name:'cable incline triceps extension', yt:'https://www.youtube.com/watch?v=DBiWdDx99ms'},
    {name:'cable kneeling triceps extension', yt:'https://www.youtube.com/watch?v=h9udmN7RfKk'},
    {name:'cable lying triceps extension v. 2', yt:'https://www.youtube.com/watch?v=MwfWEn04I8I'},
    {name:'cable one arm tricep pushdown', yt:'https://www.youtube.com/watch?v=Cp_bShvMY4c'},
    {name:'cable overhead triceps extension (rope attachment)', yt:'https://www.youtube.com/watch?v=WVKZDEdA-Ko'},
    {name:'cable pushdown', yt:'https://www.youtube.com/watch?v=LXkCrxn3caQ'},
    {name:'cable pushdown (with rope attachment)', yt:'https://www.youtube.com/watch?v=-xa-6cQaZKY'},
    {name:'cable rear drive', yt:'https://www.youtube.com/watch?v=er15V96hG5U'},
    {name:'cable reverse grip triceps pushdown (sz-bar) (with arm blaster)', yt:'https://www.youtube.com/watch?v=2668NKYmls4'},
    {name:'cable reverse-grip pushdown', yt:'https://www.youtube.com/watch?v=GqK6WrZEyEk'},
    {name:'cable rope high pulley overhead tricep extension', yt:'https://www.youtube.com/watch?v=jioCqlKKrJc'},
    {name:'cable rope incline tricep extension', yt:'https://www.youtube.com/watch?v=yMpUbdgr6P8'},
    {name:'cable rope lying on floor tricep extension', yt:'https://www.youtube.com/watch?v=n_A8IufKmGQ'},
    {name:'cable standing one arm triceps extension', yt:'https://www.youtube.com/watch?v=8rl4ioij6lc'},
    {name:'cable standing reverse grip one arm overhead tricep extension', yt:'https://www.youtube.com/watch?v=8EmiPnxZS4M'},
    {name:'cable triceps pushdown (v-bar)', yt:'https://www.youtube.com/watch?v=PqrWgK5gduo'},
    {name:'cable triceps pushdown (v-bar) (with arm blaster)', yt:'https://www.youtube.com/watch?v=WJD82PDO4XI'},
    {name:'cable two arm tricep kickback', yt:'https://www.youtube.com/watch?v=2p-l82IDxjE'},
    {name:'close-grip push-up', yt:'https://www.youtube.com/watch?v=2cdIRe5tcqI'},
    {name:'close-grip push-up (on knees)', yt:'https://www.youtube.com/watch?v=3mltBGSdVes'},
    {name:'dumbbell close grip press', yt:'https://www.youtube.com/watch?v=s3fgYe-UhJ8'},
    {name:'dumbbell decline one arm hammer press', yt:'https://www.youtube.com/watch?v=ySeSg4lMgmE'},
    {name:'dumbbell decline triceps extension', yt:'https://www.youtube.com/watch?v=8IXB2dE1IJA'},
    {name:'dumbbell forward lunge triceps extension', yt:'https://www.youtube.com/watch?v=V_96KgJbRqs'},
    {name:'dumbbell incline hammer press on exercise ball', yt:'https://www.youtube.com/watch?v=qxQz6voPBl8'},
    {name:'dumbbell incline one arm hammer press', yt:'https://www.youtube.com/watch?v=d6Ba29xFBnw'},
    {name:'dumbbell incline one arm hammer press on exercise ball', yt:'https://www.youtube.com/watch?v=0ktZdU7re4o'},
    {name:'dumbbell incline triceps extension', yt:'https://www.youtube.com/watch?v=b8wtrSulDGI'},
    {name:'dumbbell incline two arm extension', yt:'https://www.youtube.com/watch?v=IJ6J7EKprsc'},
    {name:'dumbbell kickbacks on exercise ball', yt:'https://www.youtube.com/watch?v=EHqjfzLeDEw'},
    {name:'dumbbell lying extension (across face)', yt:'https://www.youtube.com/watch?v=7ZIg6jnmJkc'},
    {name:'dumbbell lying alternate extension', yt:'https://www.youtube.com/watch?v=JVNKujQMbps'},
    {name:'dumbbell lying elbow press', yt:'https://www.youtube.com/watch?v=LX7VB8xY90E'},
    {name:'dumbbell lying one arm pronated triceps extension', yt:'https://www.youtube.com/watch?v=Zxw93FzHTpw'},
    {name:'dumbbell lying one arm supinated triceps extension', yt:'https://www.youtube.com/watch?v=0SfJvAJMc70'},
    {name:'dumbbell lying single extension', yt:'https://www.youtube.com/watch?v=ernSa92jYKc'},
    {name:'dumbbell lying triceps extension', yt:'https://www.youtube.com/watch?v=ernSa92jYKc'},
    {name:'dumbbell neutral grip bench press', yt:'https://www.youtube.com/watch?v=_Yl2rghq8oM'},
    {name:'dumbbell one arm french press on exercise ball', yt:'https://www.youtube.com/watch?v=vyGgfJUNO4M'},
    {name:'dumbbell one arm hammer press on exercise ball', yt:'https://www.youtube.com/watch?v=HQrz92zvxJU'},
    {name:'dumbbell one arm kickback', yt:'https://www.youtube.com/watch?v=MQOnCts9N9c'},
    {name:'dumbbell one arm triceps extension (on bench)', yt:'https://www.youtube.com/watch?v=kZ-ReOdn2qk'},
    {name:'dumbbell palms in incline bench press', yt:'https://www.youtube.com/watch?v=qSmo-8QapTg'},
    {name:'dumbbell pronate-grip triceps extension', yt:'https://www.youtube.com/watch?v=8H8f08hZKzg'},
    {name:'dumbbell seated bench extension', yt:'https://www.youtube.com/watch?v=dxdr8iSRLA8'},
    {name:'dumbbell seated bent over alternate kickback', yt:'https://www.youtube.com/watch?v=CF3YNxzBUoA'},
    {name:'dumbbell seated bent over triceps extension', yt:'https://www.youtube.com/watch?v=dSdryrEnoSo'},
    {name:'dumbbell seated kickback', yt:'https://www.youtube.com/watch?v=CF3YNxzBUoA'},
    {name:'dumbbell seated one arm kickback', yt:'https://www.youtube.com/watch?v=m_UlDFNX4mk'},
    {name:'dumbbell seated reverse grip one arm overhead tricep extension', yt:'https://www.youtube.com/watch?v=kZ-ReOdn2qk'},
    {name:'dumbbell seated triceps extension', yt:'https://www.youtube.com/watch?v=dxdr8iSRLA8'},
    {name:'dumbbell standing alternating tricep kickback', yt:'https://www.youtube.com/watch?v=noKoND5ghI4'},
    {name:'dumbbell standing bent over one arm triceps extension', yt:'https://www.youtube.com/watch?v=_TfW7qk8mbU'},
    {name:'dumbbell standing bent over two arm triceps extension', yt:'https://www.youtube.com/watch?v=CA2EIb3ooRs'},
    {name:'dumbbell standing kickback', yt:'https://www.youtube.com/watch?v=noKoND5ghI4'},
    {name:'dumbbell standing one arm extension', yt:'https://www.youtube.com/watch?v=F3w6m0aENVQ'},
    {name:'dumbbell standing triceps extension', yt:'https://www.youtube.com/watch?v=dsRbS_em7D8'},
    {name:'dumbbell tate press', yt:'https://www.youtube.com/watch?v=NkzL1n1a7Vo'},
    {name:'dumbbell tricep kickback with stork stance', yt:'https://www.youtube.com/watch?v=m_UlDFNX4mk'},
    {name:'dumbbell twisting bench press', yt:'https://www.youtube.com/watch?v=eAaM0fkfgyk'},
    {name:'dumbbells seated triceps extension', yt:'https://www.youtube.com/watch?v=dsRbS_em7D8'},
    {name:'elbow dips', yt:'https://www.youtube.com/watch?v=CZynYud4gNk'},
    {name:'exercise ball dip', yt:'https://www.youtube.com/watch?v=dsYixCcZg4s'},
    {name:'exercise ball seated triceps stretch', yt:'https://www.youtube.com/watch?v=9R1VIyyyZGQ'},
    {name:'exercise ball supine triceps extension', yt:'https://www.youtube.com/watch?v=XH4cgNhuwg0'},
    {name:'ez bar french press on exercise ball', yt:'https://www.youtube.com/watch?v=HtVsCD_j6Z4'},
    {name:'ez bar lying close grip triceps extension behind head', yt:'https://www.youtube.com/watch?v=XPQziBbJVnI'},
    {name:'ez bar standing french press', yt:'https://www.youtube.com/watch?v=QNMZAsTpiac'},
    {name:'ez barbell decline close grip face press', yt:'https://www.youtube.com/watch?v=WaYp8DA8-Kc'},
    {name:'ez barbell decline triceps extension', yt:'https://www.youtube.com/watch?v=ITlhgneqDLo'},
    {name:'ez barbell incline triceps extension', yt:'https://www.youtube.com/watch?v=Uc5a-SxWPWQ'},
    {name:'ez barbell jm bench press', yt:'https://www.youtube.com/watch?v=negYaQIOqjk'},
    {name:'ez barbell seated triceps extension', yt:'https://www.youtube.com/watch?v=q5X9thiKofE'},
    {name:'ez-bar close-grip bench press', yt:'https://www.youtube.com/watch?v=3U94_ZiAwfM'},
    {name:'handstand', yt:'https://www.youtube.com/results?search_query=handstand%20exercise%20form%20tutorial'},
    {name:'handstand push-up', yt:'https://www.youtube.com/watch?v=qbRbM6d5ddM'},
    {name:'impossible dips', yt:'https://www.youtube.com/watch?v=QSW0ttMP3Yw'},
    {name:'incline close-grip push-up', yt:'https://www.youtube.com/watch?v=OQeSehTeKDE'},
    {name:'lever overhand triceps dip', yt:'https://www.youtube.com/watch?v=xAjzkYXqTjc'},
    {name:'lever seated dip', yt:'https://www.youtube.com/watch?v=maj5I6j0xZg'},
    {name:'lever triceps extension', yt:'https://www.youtube.com/watch?v=o70V8YYCwD0'},
    {name:'medicine ball close grip push up', yt:'https://www.youtube.com/watch?v=JvSX3EjMQGw'},
    {name:'medicine ball supine chest throw', yt:'https://www.youtube.com/watch?v=Qwz67a7S9BQ'},
    {name:'narrow push-up on exercise ball', yt:'https://www.youtube.com/watch?v=yIlcHgMVvfU'},
    {name:'olympic barbell triceps extension', yt:'https://www.youtube.com/watch?v=q5X9thiKofE'},
    {name:'one arm dip', yt:'https://www.youtube.com/watch?v=8DdFeZxJW2o'},
    {name:'overhead triceps stretch', yt:'https://www.youtube.com/watch?v=nbHOmIYMazk'},
    {name:'push-up close-grip off dumbbell', yt:'https://www.youtube.com/watch?v=VuFktcebmok'},
    {name:'push-up on lower arms', yt:'https://www.youtube.com/watch?v=WDIpL0pjun0'},
    {name:'reverse dip', yt:'https://www.youtube.com/watch?v=bhG02zNNJas'},
    {name:'ring dips', yt:'https://www.youtube.com/watch?v=EznLCDBAPIU'},
    {name:'side push-up', yt:'https://www.youtube.com/watch?v=WDIpL0pjun0'},
    {name:'ski ergometer', yt:'https://www.youtube.com/watch?v=44YUR_dln0k'},
    {name:'smith close-grip bench press', yt:'https://www.youtube.com/watch?v=r1jOnCkvSqU'},
    {name:'smith machine decline close grip bench press', yt:'https://www.youtube.com/watch?v=G8FlztZvfJ8'},
    {name:'smith machine incline tricep extension', yt:'https://www.youtube.com/watch?v=KQ0cvbAvZho'},
    {name:'stalder press', yt:'https://www.youtube.com/watch?v=TbmZJ7pzKYw'},
    {name:'three bench dip', yt:'https://www.youtube.com/watch?v=uf-GMNCPOCE'},
    {name:'triceps dip', yt:'https://www.youtube.com/watch?v=89_spgcdQlw'},
    {name:'triceps dip (bench leg)', yt:'https://www.youtube.com/watch?v=S8vL5DK04fU'},
    {name:'triceps dip (between benches)', yt:'https://www.youtube.com/watch?v=IExSaQUjyIw'},
    {name:'triceps dips floor', yt:'https://www.youtube.com/watch?v=geNkbcZ6qDo'},
    {name:'triceps press', yt:'https://www.youtube.com/watch?v=4W31U8tTVAg'},
    {name:'triceps stretch', yt:'https://www.youtube.com/watch?v=ohmRImmdo8I'},
    {name:'weighted bench dip', yt:'https://www.youtube.com/watch?v=HEXGNzlnw5o'},
    {name:'weighted three bench dips', yt:'https://www.youtube.com/watch?v=HEXGNzlnw5o'},
    {name:'weighted tricep dips', yt:'https://www.youtube.com/watch?v=fjcbsSnrjKc'},
    {name:'weighted triceps dip on high parallel bars', yt:'https://www.youtube.com/watch?v=_wUdg_4wCCk'}
  ],

  Core: [
    {name:'Plank', yt:'https://www.youtube.com/watch?v=pvIjsG5Svck'},
    {name:'Side Plank', yt:'https://www.youtube.com/watch?v=Oe9Tp9SvTCE'},
    {name:'Hollow Hold', yt:'https://www.youtube.com/watch?v=Gkh7ZF_lcGw'},
    {name:'Dead Bug', yt:'https://www.youtube.com/watch?v=o4GKiEoYClI'},
    {name:'Cable Crunch', yt:'https://www.youtube.com/watch?v=ToJeyhydUxU'},
    {name:'Hanging Leg Raise', yt:'https://www.youtube.com/watch?v=_jLskVdzS4o'},
    {name:'Hanging Knee Raise', yt:'https://www.youtube.com/watch?v=l7OroezzX9k'},
    {name:'Ab Wheel Rollout', yt:'https://www.youtube.com/watch?v=3C1TRMJveXo'},
    {name:'Russian Twist', yt:'https://www.youtube.com/watch?v=DJQGX2J4IVw'},
    {name:'Pallof Press', yt:'https://www.youtube.com/watch?v=nFspBRHke4w'},
    {name:'V-Up', yt:'https://www.youtube.com/results?search_query=V-Up%20exercise%20form%20tutorial'},
    {name:'Bicycle Crunch', yt:'https://www.youtube.com/watch?v=wnuLak2onoA'},
    {name:'Lying Leg Raise', yt:'https://www.youtube.com/watch?v=Wp4BlxcFTkE'},
    {name:'Dragon Flag', yt:'https://www.youtube.com/watch?v=U5pviWt7sMo'},
    {name:'Crunches', yt:'https://www.youtube.com/watch?v=9T4WQGlKCRk'},
    {name:'Reverse Crunch', yt:'https://www.youtube.com/watch?v=TJO19eOmax0'},
    {name:'Woodchop Cable', yt:'https://www.youtube.com/watch?v=mvvu8imyMFs'},
    {name:'Landmine Rotation', yt:'https://www.youtube.com/watch?v=e5DP6961WEk'},
    {name:'Farmer Carry', yt:'https://www.youtube.com/watch?v=lLAw6fUccKA'},
    {name:'Suitcase Carry', yt:'https://www.youtube.com/watch?v=3RKKnZhhelE'},
    {name:'Overhead Carry', yt:'https://www.youtube.com/watch?v=54POVWkWjEs'},
    {name:'Turkish Get-Up', yt:'https://www.youtube.com/watch?v=sgd8n917Zv0'},
    {name:'Toes to Bar', yt:'https://www.youtube.com/watch?v=sAB9hAQnCew'},
    {name:'Bird Dog', yt:'https://www.youtube.com/watch?v=HtMI17DGuTk'},
    {name:'Mountain Climber', yt:'https://www.youtube.com/watch?v=ruQ4ZwncXBg'},
    {name:'McGill Curl-Up', yt:'https://www.youtube.com/watch?v=I_drRVYlHbc'},
    {name:'GHD Sit-Up', yt:'https://www.youtube.com/watch?v=1pbZ8mX2D1U'},
    {name:'Ab Machine Crunch', yt:'https://www.youtube.com/watch?v=V7p_DmkYLZw'},,
    {name:'3/4 sit-up', yt:'https://www.youtube.com/watch?v=wm47Swzn_98'},
    {name:'45° side bend', yt:'https://www.youtube.com/watch?v=1oSwA0uwBbo'},
    {name:'air bike', yt:'https://www.youtube.com/watch?v=KC-ZSfOmXgE'},
    {name:'alternate heel touchers', yt:'https://www.youtube.com/watch?v=J9eSDQh3P1o'},
    {name:'arm slingers hanging bent knee legs', yt:'https://www.youtube.com/watch?v=l7OroezzX9k'},
    {name:'arm slingers hanging straight legs', yt:'https://www.youtube.com/watch?v=7FwGZ8qY5OU'},
    {name:'arms overhead full sit-up (male)', yt:'https://www.youtube.com/watch?v=NrjghPVYzEk'},
    {name:'assisted hanging knee raise', yt:'https://www.youtube.com/watch?v=BGt7lMbUeRk'},
    {name:'assisted hanging knee raise with throw down', yt:'https://www.youtube.com/watch?v=1ltUyaCTdWI'},
    {name:'assisted lying leg raise with lateral throw down', yt:'https://www.youtube.com/watch?v=lx7qt7WNhIo'},
    {name:'assisted lying leg raise with throw down', yt:'https://www.youtube.com/watch?v=lx7qt7WNhIo'},
    {name:'assisted motion russian twist', yt:'https://www.youtube.com/watch?v=4eYnL7MDvj8'},
    {name:'assisted prone rectus femoris stretch', yt:'https://www.youtube.com/watch?v=g5sTOVQsTmI'},
    {name:'assisted sit-up', yt:'https://www.youtube.com/watch?v=q4ap_8wpaF8'},
    {name:'band alternating v-up', yt:'https://www.youtube.com/watch?v=dFVjNxRREKk'},
    {name:'band assisted wheel rollerout', yt:'https://www.youtube.com/watch?v=gZIDvlDogsY'},
    {name:'band bicycle crunch', yt:'https://www.youtube.com/watch?v=8ISFMEEZLmo'},
    {name:'band horizontal pallof press', yt:'https://www.youtube.com/watch?v=MpNe1ZN2-9E'},
    {name:'band jack knife sit-up', yt:'https://www.youtube.com/watch?v=TReuF1KyLtY'},
    {name:'band kneeling twisting crunch', yt:'https://www.youtube.com/watch?v=z09UFehZBeo'},
    {name:'band lying straight leg raise', yt:'https://www.youtube.com/watch?v=c8LUpX3MdSs'},
    {name:'band push sit-up', yt:'https://www.youtube.com/watch?v=A12yEMLObHA'},
    {name:'band seated twist', yt:'https://www.youtube.com/watch?v=m9WmQJDixZg'},
    {name:'band standing crunch', yt:'https://www.youtube.com/watch?v=6_LTYmLRimU'},
    {name:'band standing twisting crunch', yt:'https://www.youtube.com/watch?v=S5D8P7FkRps'},
    {name:'band v-up', yt:'https://www.youtube.com/watch?v=ycMq2yGJuig'},
    {name:'band vertical pallof press', yt:'https://www.youtube.com/watch?v=1CnGtWXfQ8w'},
    {name:'barbell press sit-up', yt:'https://www.youtube.com/watch?v=CrM9fcsUbI0'},
    {name:'barbell rollerout', yt:'https://www.youtube.com/watch?v=3C1TRMJveXo'},
    {name:'barbell rollerout from bench', yt:'https://www.youtube.com/watch?v=RVGYevyytlc'},
    {name:'barbell seated twist', yt:'https://www.youtube.com/watch?v=dDqOeyGRHXE'},
    {name:'barbell side bent v. 2', yt:'https://www.youtube.com/watch?v=06Vv7GrblPQ'},
    {name:'barbell sitted alternate leg raise', yt:'https://www.youtube.com/watch?v=JszVKPkp2wU'},
    {name:'barbell sitted alternate leg raise (female)', yt:'https://www.youtube.com/watch?v=gB9bRfuk8no'},
    {name:'barbell standing ab rollerout', yt:'https://www.youtube.com/watch?v=5tmHNSBAILI'},
    {name:'barbell standing twist', yt:'https://www.youtube.com/watch?v=qZeW619iKPI'},
    {name:'bodyweight incline side plank', yt:'https://www.youtube.com/watch?v=_R389Jk0tIo'},
    {name:'bottoms-up', yt:'https://www.youtube.com/watch?v=XzLXh2RxJlM'},
    {name:'bridge - mountain climber (cross body)', yt:'https://www.youtube.com/watch?v=9p-8sXwh-7k'},
    {name:'butt-ups', yt:'https://www.youtube.com/watch?v=m9QWYs2CXMo'},
    {name:'cable judo flip', yt:'https://www.youtube.com/watch?v=dfB2MPXzjYc'},
    {name:'cable kneeling crunch', yt:'https://www.youtube.com/watch?v=ToJeyhydUxU'},
    {name:'cable reverse crunch', yt:'https://www.youtube.com/watch?v=hLxgz9ODWv8'},
    {name:'cable russian twists (on stability ball)', yt:'https://www.youtube.com/watch?v=M3qA79xn4VE'},
    {name:'cable seated crunch', yt:'https://www.youtube.com/watch?v=3qjoXDTuyOE'},
    {name:'cable seated twist', yt:'https://www.youtube.com/watch?v=zeGN3YsOYsg'},
    {name:'cable side bend', yt:'https://www.youtube.com/watch?v=ykbAuxIDFiU'},
    {name:'cable side bend crunch (bosu ball)', yt:'https://www.youtube.com/watch?v=B1knh5GGXgc'},
    {name:'cable side crunch', yt:'https://www.youtube.com/watch?v=Hwp4cBv-ImY'},
    {name:'cable standing crunch', yt:'https://www.youtube.com/watch?v=8cK_QRp_MKc'},
    {name:'cable standing crunch (with rope attachment)', yt:'https://www.youtube.com/watch?v=BHINEbPdpwE'},
    {name:'cable standing lift', yt:'https://www.youtube.com/watch?v=dDYLiE2tOFM'},
    {name:'cable tuck reverse crunch', yt:'https://www.youtube.com/watch?v=hLxgz9ODWv8'},
    {name:'cable twist', yt:'https://www.youtube.com/watch?v=IHIEp_2D_Dg'},
    {name:'cable twist (up-down)', yt:'https://www.youtube.com/watch?v=tQznClkP0GE'},
    {name:'captains chair straight leg raise', yt:'https://www.youtube.com/watch?v=Wl8ZyCrAnxs'},
    {name:'cocoons', yt:'https://www.youtube.com/watch?v=_epVveGVTz8'},
    {name:'crab twist toe touch', yt:'https://www.youtube.com/watch?v=sk5U04gNFeE'},
    {name:'cross body crunch', yt:'https://www.youtube.com/watch?v=W5KuaUwDe0M'},
    {name:'crunch (hands overhead)', yt:'https://www.youtube.com/watch?v=ey5fxii7i9U'},
    {name:'crunch (on stability ball)', yt:'https://www.youtube.com/watch?v=3oRdW4v34L4'},
    {name:'crunch (on stability ball, arms straight)', yt:'https://www.youtube.com/watch?v=pmfa--PN8Yw'},
    {name:'crunch floor', yt:'https://www.youtube.com/watch?v=7zp7LUbt2s0'},
    {name:'curl-up', yt:'https://www.youtube.com/watch?v=4lSNbp1ud-A'},
    {name:'decline crunch', yt:'https://www.youtube.com/watch?v=4TyLQJsIDY4'},
    {name:'decline sit-up', yt:'https://www.youtube.com/watch?v=N7hf1_vcX5w'},
    {name:'dumbbell side bend', yt:'https://www.youtube.com/watch?v=BDXhn8ta3Vo'},
    {name:'elbow-to-knee', yt:'https://www.youtube.com/watch?v=z1fwSujYhX8'},
    {name:'flag', yt:'https://www.youtube.com/watch?v=U5pviWt7sMo'},
    {name:'flexion leg sit up (bent knee)', yt:'https://www.youtube.com/watch?v=BP-6Bsae1AE'},
    {name:'flexion leg sit up (straight arm)', yt:'https://www.youtube.com/watch?v=1GhHig-HcDQ'},
    {name:'frog crunch', yt:'https://www.youtube.com/watch?v=dbQ7HLrqdpY'},
    {name:'frog planche', yt:'https://www.youtube.com/watch?v=aBtvwFueB9Q'},
    {name:'front lever', yt:'https://www.youtube.com/results?search_query=front%20lever%20exercise%20form%20tutorial'},
    {name:'front plank with twist', yt:'https://www.youtube.com/watch?v=5IOr9dmHlKI'},
    {name:'full maltese', yt:'https://www.youtube.com/watch?v=k_FGe7H7U14'},
    {name:'full planche', yt:'https://www.youtube.com/results?search_query=full%20planche%20exercise%20form%20tutorial'},
    {name:'gorilla chin', yt:'https://www.youtube.com/watch?v=kEYEU1j2zXM'},
    {name:'groin crunch', yt:'https://www.youtube.com/watch?v=Gel3XhniSto'},
    {name:'half sit-up (male)', yt:'https://www.youtube.com/watch?v=onaQ0v_J5uU'},
    {name:'hanging leg hip raise', yt:'https://www.youtube.com/watch?v=_jLskVdzS4o'},
    {name:'hanging oblique knee raise', yt:'https://www.youtube.com/watch?v=L1rt7qr5LCk'},
    {name:'hanging pike', yt:'https://www.youtube.com/watch?v=wVRlRmGsZ2w'},
    {name:'hanging straight leg hip raise', yt:'https://www.youtube.com/watch?v=YPHwSAk0tPM'},
    {name:'hanging straight leg raise', yt:'https://www.youtube.com/watch?v=7FwGZ8qY5OU'},
    {name:'hanging straight twisting leg hip raise', yt:'https://www.youtube.com/watch?v=T-XN-RpGMEw'},
    {name:'hip raise (bent knee)', yt:'https://www.youtube.com/watch?v=yii9rlQ6924'},
    {name:'inchworm v. 2', yt:'https://www.youtube.com/watch?v=0HFXsIMKqUg'},
    {name:'incline leg hip raise (leg straight)', yt:'https://www.youtube.com/watch?v=QgPx4bQGL5Q'},
    {name:'incline twisting sit-up', yt:'https://www.youtube.com/watch?v=FyG4vxGHfvk'},
    {name:'jackknife sit-up', yt:'https://www.youtube.com/watch?v=oBahbD0Xh0k'},
    {name:'janda sit-up', yt:'https://www.youtube.com/watch?v=Zyqgtb6zTFM'},
    {name:'kettlebell advanced windmill', yt:'https://www.youtube.com/watch?v=ITSmgn_BQgY'},
    {name:'kettlebell bent press', yt:'https://www.youtube.com/watch?v=howdO1cZb-o'},
    {name:'kettlebell double windmill', yt:'https://www.youtube.com/watch?v=ITSmgn_BQgY'},
    {name:'kettlebell figure 8', yt:'https://www.youtube.com/watch?v=xpHWMC2_e3c'},
    {name:'kettlebell windmill', yt:'https://www.youtube.com/watch?v=ITSmgn_BQgY'},
    {name:'knee touch crunch', yt:'https://www.youtube.com/watch?v=1rZSsi2V7uM'},
    {name:'kneeling plank tap shoulder (male)', yt:'https://www.youtube.com/watch?v=JHSabkcwjyY'},
    {name:'l-sit on floor', yt:'https://www.youtube.com/watch?v=BGiozcgSt_Q'},
    {name:'landmine 180', yt:'https://www.youtube.com/watch?v=AEhQK1bqlME'},
    {name:'lean planche', yt:'https://www.youtube.com/watch?v=9R4OxINluw0'},
    {name:'leg pull in flat bench', yt:'https://www.youtube.com/watch?v=8K5gY06FX1I'},
    {name:'lever kneeling twist', yt:'https://www.youtube.com/watch?v=vvmN97j97sM'},
    {name:'lever seated crunch', yt:'https://www.youtube.com/watch?v=DKKFDV3Isho'},
    {name:'lever seated crunch (chest pad)', yt:'https://www.youtube.com/watch?v=pc8w5oaB5YI'},
    {name:'lever seated crunch v. 2', yt:'https://www.youtube.com/watch?v=V7p_DmkYLZw'},
    {name:'lever seated leg raise crunch', yt:'https://www.youtube.com/watch?v=l9Bx_RoaHVE'},
    {name:'lunge with twist', yt:'https://www.youtube.com/watch?v=7yrkGWJHSP0'},
    {name:'lying elbow to knee', yt:'https://www.youtube.com/watch?v=Qqn4cRVpn9Q'},
    {name:'lying leg raise flat bench', yt:'https://www.youtube.com/watch?v=3WbEUWavHtE'},
    {name:'lying leg-hip raise', yt:'https://www.youtube.com/watch?v=xJJu-WiROM8'},
    {name:'negative crunch', yt:'https://www.youtube.com/watch?v=i4VA1bczfGg'},
    {name:'oblique crunch v. 2', yt:'https://www.youtube.com/watch?v=ABWPCPgquWw'},
    {name:'oblique crunches floor', yt:'https://www.youtube.com/watch?v=ABWPCPgquWw'},
    {name:'one arm slam (with medicine ball)', yt:'https://www.youtube.com/watch?v=q73brYHsUgw'},
    {name:'otis up', yt:'https://www.youtube.com/watch?v=f7BpJbN0Y7I'},
    {name:'pelvic tilt', yt:'https://www.youtube.com/watch?v=ZIQjHtghzqw'},
    {name:'posterior step to overhead reach', yt:'https://www.youtube.com/watch?v=eL12SgJr5Ug'},
    {name:'potty squat', yt:'https://www.youtube.com/watch?v=uy5D-xYviAE'},
    {name:'power point plank', yt:'https://www.youtube.com/watch?v=uJHipV0SxRk'},
    {name:'prisoner half sit-up (male)', yt:'https://www.youtube.com/watch?v=obY5nasxnR8'},
    {name:'prone twist on stability ball', yt:'https://www.youtube.com/watch?v=qZZphKdhjd0'},
    {name:'pull-in (on stability ball)', yt:'https://www.youtube.com/watch?v=jNd3G9Mog3s'},
    {name:'push-up to side plank', yt:'https://www.youtube.com/watch?v=FdtLu2lBt9I'},
    {name:'quarter sit-up', yt:'https://www.youtube.com/watch?v=uV8agoxk8P0'},
    {name:'reverse plank with leg lift', yt:'https://www.youtube.com/watch?v=AmQ_4SXxDKk'},
    {name:'roller body saw', yt:'https://www.youtube.com/watch?v=df5kBlkmUmQ'},
    {name:'roller reverse crunch', yt:'https://www.youtube.com/watch?v=itKj8MfdiMU'},
    {name:'seated leg raise', yt:'https://www.youtube.com/watch?v=uBo1PuTE1ZY'},
    {name:'seated side crunch (wall)', yt:'https://www.youtube.com/watch?v=dFba_OHZ8vc'},
    {name:'shoulder tap', yt:'https://www.youtube.com/watch?v=8rgurWd-PB8'},
    {name:'side bridge v. 2', yt:'https://www.youtube.com/watch?v=JMBi9Hkzkug'},
    {name:'side hip (on parallel bars)', yt:'https://www.youtube.com/watch?v=pujNPt15qcg'},
    {name:'side-to-side toe touch (male)', yt:'https://www.youtube.com/watch?v=HaLkCnJ2w8Y'},
    {name:'sit-up v. 2', yt:'https://www.youtube.com/watch?v=onaQ0v_J5uU'},
    {name:'sit-up with arms on chest', yt:'https://www.youtube.com/watch?v=XSsthrLZjEw'},
    {name:'sledge hammer', yt:'https://www.youtube.com/watch?v=LuimD6DBoYo'},
    {name:'smith hip raise', yt:'https://www.youtube.com/watch?v=CXGJ36cQyWo'},
    {name:'spell caster', yt:'https://www.youtube.com/watch?v=RP09o5x2jAk'},
    {name:'spine twist', yt:'https://www.youtube.com/watch?v=qEVNj4tcr0Y'},
    {name:'stability ball crunch (full range hands behind head)', yt:'https://www.youtube.com/watch?v=7QUhvTQTqyw'},
    {name:'standing wheel rollerout', yt:'https://www.youtube.com/watch?v=L_2k97JeyzY'},
    {name:'straddle maltese', yt:'https://www.youtube.com/watch?v=VeJPYghCdxQ'},
    {name:'straddle planche', yt:'https://www.youtube.com/results?search_query=straddle%20planche%20exercise%20form%20tutorial'},
    {name:'suspended abdominal fallout', yt:'https://www.youtube.com/watch?v=9JfJSPhH-0U'},
    {name:'suspended reverse crunch', yt:'https://www.youtube.com/watch?v=hCt7npR4bDM'},
    {name:'tuck crunch', yt:'https://www.youtube.com/watch?v=uAVwnCOuGuM'},
    {name:'twisted leg raise', yt:'https://www.youtube.com/watch?v=T-XN-RpGMEw'},
    {name:'twisted leg raise (female)', yt:'https://www.youtube.com/watch?v=T-XN-RpGMEw'},
    {name:'v-sit on floor', yt:'https://www.youtube.com/watch?v=YbFm_9pqQUw'},
    {name:'vertical leg raise (on parallel bars)', yt:'https://www.youtube.com/watch?v=Xg6lP1zsq_E'},
    {name:'weighted crunch', yt:'https://www.youtube.com/watch?v=1YSxi0qv3wg'},
    {name:'weighted decline sit-up', yt:'https://www.youtube.com/watch?v=PhvG-BQgnBU'},
    {name:'weighted front plank', yt:'https://www.youtube.com/watch?v=H88Ip-MUWn0'},
    {name:'weighted hanging leg-hip raise', yt:'https://www.youtube.com/watch?v=9poOh1gztc8'},
    {name:'weighted overhead crunch (on stability ball)', yt:'https://www.youtube.com/watch?v=3oRdW4v34L4'},
    {name:'weighted russian twist', yt:'https://www.youtube.com/watch?v=Yg47UxxV9Vc'},
    {name:'weighted russian twist (legs up)', yt:'https://www.youtube.com/watch?v=qSIPnuOZ0Jo'},
    {name:'weighted russian twist v. 2', yt:'https://www.youtube.com/watch?v=99T1EfpMwPA'},
    {name:'weighted seated twist (on stability ball)', yt:'https://www.youtube.com/watch?v=tewcOyXyOsY'},
    {name:'weighted side bend (on stability ball)', yt:'https://www.youtube.com/watch?v=JAv1GHZpGEM'},
    {name:'wheel rollerout', yt:'https://www.youtube.com/watch?v=_BHKT60P6bc'},
    {name:'wind sprints', yt:'https://www.youtube.com/watch?v=ZecmRJ3xuF0'}
  ],

  Traps: [
    {name:'Barbell Shrug', yt:'https://www.youtube.com/watch?v=M_MjF5Nm_h4'},
    {name:'Dumbbell Shrug', yt:'https://www.youtube.com/watch?v=SX1FE0URdv8'},
    {name:'Behind Back Barbell Shrug', yt:'https://www.youtube.com/watch?v=OoUQRw91D94'},
    {name:'Trap Bar Shrug', yt:'https://www.youtube.com/watch?v=Ke5OmublmUU'},
    {name:'Cable Shrug', yt:'https://www.youtube.com/watch?v=YykmcX2b-LY'},
    {name:'Power Shrug', yt:'https://www.youtube.com/watch?v=rG-Uw5op_Rw'},
    {name:'Rack Pull Trap Focus', yt:'https://www.youtube.com/watch?v=p-EfiGOK7XQ'},
    {name:'Snatch Grip High Pull', yt:'https://www.youtube.com/watch?v=KnafbIXVr2Q'},
    {name:'Farmer Walk Trap Focus', yt:'https://www.youtube.com/watch?v=8OtwXwrJizk'},,
    {name:'neck side stretch', yt:'https://www.youtube.com/watch?v=4q3GJU1F7yM'},
    {name:'side push neck stretch', yt:'https://www.youtube.com/watch?v=54y0JAT46vE'}
  ],

  Forearms: [
    {name:'Wrist Curl Barbell', yt:'https://www.youtube.com/watch?v=lfQR7oVS8eo'},
    {name:'Reverse Wrist Curl', yt:'https://www.youtube.com/watch?v=osYPwlBiCRM'},
    {name:'Dumbbell Wrist Curl', yt:'https://www.youtube.com/watch?v=3VLTzIrnb5g'},
    {name:'Wrist Roller', yt:'https://www.youtube.com/watch?v=qb0A0pHGhyA'},
    {name:'Dead Hang', yt:'https://www.youtube.com/watch?v=0Bx_Ap7-EwU'},
    {name:'Plate Pinch', yt:'https://www.youtube.com/watch?v=jFTV3DQf3HE'},
    {name:'Reverse Curl Forearm', yt:'https://www.youtube.com/watch?v=pXx38ZWRYjo'},
    {name:'Towel Pull-Up', yt:'https://www.youtube.com/watch?v=GO7aJNPqHKA'},
    {name:'Grip Squeezer', yt:'https://www.youtube.com/watch?v=zQE5W6aZjeI'},
    {name:'Radial Deviation', yt:'https://www.youtube.com/watch?v=w7Eou1HvtKI'},,
    {name:'band reverse wrist curl', yt:'https://www.youtube.com/watch?v=JR1K02b0O2s'},
    {name:'band wrist curl', yt:'https://www.youtube.com/watch?v=3VLTzIrnb5g'},
    {name:'barbell palms down wrist curl over a bench', yt:'https://www.youtube.com/watch?v=MLWTUEtjow8'},
    {name:'barbell palms up wrist curl over a bench', yt:'https://www.youtube.com/watch?v=q3p0HDQU_zk'},
    {name:'barbell revers wrist curl v. 2', yt:'https://www.youtube.com/watch?v=3MkQ2VbZu5o'},
    {name:'barbell reverse wrist curl', yt:'https://www.youtube.com/watch?v=lfQR7oVS8eo'},
    {name:'barbell standing back wrist curl', yt:'https://www.youtube.com/watch?v=lfQR7oVS8eo'},
    {name:'barbell wrist curl', yt:'https://www.youtube.com/watch?v=lfQR7oVS8eo'},
    {name:'barbell wrist curl v. 2', yt:'https://www.youtube.com/watch?v=3VLTzIrnb5g'},
    {name:'cable reverse wrist curl', yt:'https://www.youtube.com/watch?v=WVAaKJvToe0'},
    {name:'cable standing back wrist curl', yt:'https://www.youtube.com/watch?v=JGG3JCqaf78'},
    {name:'cable wrist curl', yt:'https://www.youtube.com/watch?v=WVAaKJvToe0'},
    {name:'dumbbell finger curls', yt:'https://www.youtube.com/watch?v=3VLTzIrnb5g'},
    {name:'dumbbell lying pronation', yt:'https://www.youtube.com/watch?v=M_pkj9o2cnM'},
    {name:'dumbbell lying pronation on floor', yt:'https://www.youtube.com/watch?v=M_pkj9o2cnM'},
    {name:'dumbbell lying supination', yt:'https://www.youtube.com/watch?v=T6XUHDFySZw'},
    {name:'dumbbell lying supination on floor', yt:'https://www.youtube.com/watch?v=T6XUHDFySZw'},
    {name:'dumbbell one arm reverse wrist curl', yt:'https://www.youtube.com/watch?v=6Ps7UnxqRgA'},
    {name:'dumbbell one arm seated neutral wrist curl', yt:'https://www.youtube.com/watch?v=2NAqNYIUN7o'},
    {name:'dumbbell one arm wrist curl', yt:'https://www.youtube.com/watch?v=Q7dTbE4kRUY'},
    {name:'dumbbell over bench one arm reverse wrist curl', yt:'https://www.youtube.com/watch?v=wdsxuB3xdak'},
    {name:'dumbbell over bench one arm wrist curl', yt:'https://www.youtube.com/watch?v=Q7dTbE4kRUY'},
    {name:'dumbbell over bench revers wrist curl', yt:'https://www.youtube.com/watch?v=U74X4lJ0xI8'},
    {name:'dumbbell over bench wrist curl', yt:'https://www.youtube.com/watch?v=VqN3IEJJ33A'},
    {name:'dumbbell reverse wrist curl', yt:'https://www.youtube.com/watch?v=osYPwlBiCRM'},
    {name:'dumbbell seated one arm rotate', yt:'https://www.youtube.com/watch?v=cofTpElgR_g'},
    {name:'dumbbell seated palms up wrist curl', yt:'https://www.youtube.com/watch?v=Q7dTbE4kRUY'},
    {name:'finger curls', yt:'https://www.youtube.com/watch?v=3VLTzIrnb5g'},
    {name:'kettlebell alternating hang clean', yt:'https://www.youtube.com/watch?v=nbnaD8-SVfU'},
    {name:'lever gripper hands', yt:'https://www.youtube.com/results?search_query=lever%20gripper%20hands%20exercise%20form%20tutorial'},
    {name:'modified push up to lower arms', yt:'https://www.youtube.com/watch?v=PDr5B2jLUOw'},
    {name:'side wrist pull stretch', yt:'https://www.youtube.com/watch?v=e9lKk5Lz8jo'},
    {name:'smith seated wrist curl', yt:'https://www.youtube.com/watch?v=g09CAamwJKo'},
    {name:'smith standing back wrist curl', yt:'https://www.youtube.com/watch?v=g09CAamwJKo'},
    {name:'weighted standing hand squeeze', yt:'https://www.youtube.com/watch?v=UNxM_LJhpjk'},
    {name:'wrist circles', yt:'https://www.youtube.com/watch?v=20Y-W5fHPEM'},
    {name:'wrist rollerer', yt:'https://www.youtube.com/watch?v=qb0A0pHGhyA'}
  ],

  Olympic: [
    {name:'Power Clean', yt:'https://www.youtube.com/watch?v=e8TpDdMYq4Y'},
    {name:'Hang Power Clean',                 yt:'https://www.youtube.com/watch?v=0aP3tgKZcHQ'},
    {name:'Squat Clean',                      yt:'https://www.youtube.com/watch?v=YZUdVyVV3uI'},
    {name:'Clean Pull', yt:'https://www.youtube.com/watch?v=oD-vky21IfM'},
    {name:'Clean and Jerk',                   yt:'https://www.youtube.com/watch?v=oVAJkyyVj3o'},
    {name:'Split Jerk',                       yt:'https://www.youtube.com/watch?v=W41fIOOhUI8'},
    {name:'Push Jerk', yt:'https://www.youtube.com/watch?v=Q8NK4eOe_74'},
    {name:'Push Press', yt:'https://www.youtube.com/watch?v=sElIkjcfyNY'},
    {name:'Power Snatch', yt:'https://www.youtube.com/watch?v=z1j2QMBJF6c'},
    {name:'Hang Power Snatch', yt:'https://www.youtube.com/watch?v=z1j2QMBJF6c'},
    {name:'Squat Snatch', yt:'https://www.youtube.com/watch?v=Iy0vPROslAA'},
    {name:'Muscle Snatch', yt:'https://www.youtube.com/watch?v=55ZpUhfkPfg'},
    {name:'Snatch Pull', yt:'https://www.youtube.com/watch?v=KnafbIXVr2Q'},
    {name:'High Hang Clean',                  yt:'https://www.youtube.com/watch?v=g3fj757-XSA'},
    {name:'Snatch Balance', yt:'https://www.youtube.com/watch?v=YImVVL8Sizw'},
  ],

  Cardio: [
    {name:'Treadmill Run', yt:'https://www.youtube.com/watch?v=LsswRe8_I3g'},
    {name:'Incline Treadmill Walk', yt:'https://www.youtube.com/watch?v=9ccVxEvWtpA'},
    {name:'Stationary Bike', yt:'https://www.youtube.com/watch?v=NwwDBARCGgo'},
    {name:'Rowing Machine', yt:'https://www.youtube.com/watch?v=6_eLpWiNijE'},
    {name:'Jump Rope', yt:'https://www.youtube.com/watch?v=Nssl3QZL6L8'},
    {name:'Box Jump', yt:'https://www.youtube.com/watch?v=LeiLzSU3OXE'},
    {name:'Burpees', yt:'https://www.youtube.com/watch?v=xQdyIrSSFnE'},
    {name:'Battle Ropes', yt:'https://www.youtube.com/watch?v=zw0OMi00X5g'},
    {name:'Sled Push', yt:'https://www.youtube.com/watch?v=QwscR2BhdEg'},
    {name:'Sled Pull', yt:'https://www.youtube.com/watch?v=gdtO9qeaiCE'},
    {name:'Assault Bike', yt:'https://www.youtube.com/watch?v=sug_ss2Fqa0'},
    {name:'StairMaster', yt:'https://www.youtube.com/watch?v=V2EQYdMw4Do'},
    {name:'Sprint Intervals', yt:'https://www.youtube.com/watch?v=GxkWIKuH21U'},
    {name:'Elliptical', yt:'https://www.youtube.com/watch?v=3pCdU1XkNm8'},
    {name:'Ski Erg', yt:'https://www.youtube.com/watch?v=s_aU9NNVwP0'},,
    {name:'astride jumps (male)', yt:'https://www.youtube.com/watch?v=cJbxCWD7WeU'},
    {name:'back and forth step', yt:'https://www.youtube.com/watch?v=DM_MiqLcEWI'},
    {name:'burpee', yt:'https://www.youtube.com/watch?v=Qe9aeEfgQTM'},
    {name:'cycle cross trainer', yt:'https://www.youtube.com/watch?v=yISC2qwdh9I'},
    {name:'dumbbell burpee', yt:'https://www.youtube.com/watch?v=AUmrtIzF4IE'},
    {name:'half knee bends (male)', yt:'https://www.youtube.com/watch?v=j9MuCSE-JWM'},
    {name:'high knee against wall', yt:'https://www.youtube.com/watch?v=24SQ2buYwbI'},
    {name:'jack burpee', yt:'https://www.youtube.com/watch?v=AOxWO_8gpTA'},
    {name:'jack jump (male)', yt:'https://www.youtube.com/watch?v=CWpmIW6l-YA'},
    {name:'push to run', yt:'https://www.youtube.com/watch?v=FZ0XlQzvyww'},
    {name:'run', yt:'https://www.youtube.com/watch?v=xm91wOZq_4E'},
    {name:'run (equipment)', yt:'https://www.youtube.com/results?search_query=run%20(equipment)%20exercise%20form%20tutorial'},
    {name:'scissor jumps (male)', yt:'https://www.youtube.com/watch?v=oodMwphArkc'},
    {name:'semi squat jump (male)', yt:'https://www.youtube.com/watch?v=0pTBkUPuMkk'},
    {name:'short stride run', yt:'https://www.youtube.com/watch?v=-2J1RpyfV0o'},
    {name:'skater hops', yt:'https://www.youtube.com/watch?v=IIfU9N1zFQc'},
    {name:'ski step', yt:'https://www.youtube.com/watch?v=-Cz5692avKE'},
    {name:'star jump (male)', yt:'https://www.youtube.com/watch?v=VVEO_J1tIXU'},
    {name:'stationary bike run v. 3', yt:'https://www.youtube.com/watch?v=t82OzzigBAg'},
    {name:'stationary bike walk', yt:'https://www.youtube.com/watch?v=NwwDBARCGgo'},
    {name:'swing 360', yt:'https://www.youtube.com/watch?v=EGtIhymW2qg'},
    {name:'walk elliptical cross trainer', yt:'https://www.youtube.com/watch?v=RakIFxUmSpA'},
    {name:'walking high knees lunge', yt:'https://www.youtube.com/watch?v=YZ9gECfHBj4'},
    {name:'walking on incline treadmill', yt:'https://www.youtube.com/watch?v=9ccVxEvWtpA'},
    {name:'walking on stepmill', yt:'https://www.youtube.com/watch?v=EQT4PI8EQ7M'},
    {name:'wheel run', yt:'https://www.youtube.com/results?search_query=wheel%20run%20exercise%20form%20tutorial'}
  ],

  Corrective: [
    {name:'Wall Slide',                       yt:'https://www.youtube.com/watch?v=HXZQzLVyn5Q'},
    {name:'Thoracic Extension Foam Roller',   yt:'https://www.youtube.com/watch?v=7CQc5JpyZso'},
    {name:'Cat-Cow', yt:'https://www.youtube.com/watch?v=LIVJZZyZ2qM'},
    {name:'Hip Flexor Stretch',               yt:'https://www.youtube.com/watch?v=NvL0Q7FqhoY'},
    {name:'Doorway Chest Stretch', yt:'https://www.youtube.com/watch?v=lbiXod5Zx8U'},
    {name:'90-90 Hip Stretch',                yt:'https://www.youtube.com/watch?v=F1XdXdCjERk'},
    {name:'World Greatest Stretch',           yt:'https://www.youtube.com/watch?v=-CiWQ2IvY34'},
    {name:'Ankle Dorsiflexion Drill',         yt:'https://www.youtube.com/watch?v=gUYxO2arXG0'},
    {name:'Shoulder Dislocates',              yt:'https://www.youtube.com/watch?v=SL8VAYpmpCQ'},
    {name:'Prone Cobra', yt:'https://www.youtube.com/watch?v=YhtUM6KYIGY'},
    {name:'Glute Activation Banded Walk',     yt:'https://www.youtube.com/watch?v=kXNMDwZRb_c'},
    {name:'IT Band Foam Roll', yt:'https://www.youtube.com/watch?v=eI9qLfSlCuI'},
    {name:'Lat Stretch', yt:'https://www.youtube.com/watch?v=Ca6cJdBeB0s'},
    {name:'Piriformis Stretch',               yt:'https://www.youtube.com/watch?v=NNuqDoXsc30'},
    {name:'Hamstring Stretch', yt:'https://www.youtube.com/watch?v=dgerF9P-m7M'},
    {name:'Hip Internal Rotation Drill',      yt:'https://www.youtube.com/watch?v=6wlpDkwTdbU'},
    {name:'Scapular Wall Slide',              yt:'https://www.youtube.com/watch?v=AXcRFBFuo-c'},
    {name:'Wrist Flexor Stretch',             yt:'https://www.youtube.com/watch?v=R7dI2ZcbiMI'},
    {name:'Wrist Extensor Stretch',           yt:'https://www.youtube.com/watch?v=80Y3HHMgo6w'},
    {name:'Deep Squat Hold', yt:'https://www.youtube.com/watch?v=D3zYzIlbjXM'},
    {name:'Pigeon Pose',                      yt:'https://www.youtube.com/watch?v=KUclDkITsS8'},
    {name:'Couch Stretch',                    yt:'https://www.youtube.com/watch?v=QiKl5UoiG5c'},
    {name:'Thread the Needle',                yt:'https://www.youtube.com/watch?v=rlac1t_QQJM'},
    {name:'Quadruped Hip Extension', yt:'https://www.youtube.com/watch?v=MEV_gOua-Bc'},
    {name:'Side-Lying Hip Abduction',         yt:'https://www.youtube.com/watch?v=s6lDpy4AO6w'},
    {name:'Prone Hip Extension', yt:'https://www.youtube.com/watch?v=WqrRjESYjcE'},
    {name:'Thoracic Rotation Drill',          yt:'https://www.youtube.com/watch?v=il1rrMe73YE'},
    {name:'Serratus Wall Slide',              yt:'https://www.youtube.com/watch?v=oMSVe7PWJ3o'},
    {name:'Half-Kneeling Hip Flexor',         yt:'https://www.youtube.com/watch?v=vIDzsqJiAIo'},
    {name:'Bear Crawl', yt:'https://www.youtube.com/watch?v=w4LRV1S7u_U'},
    {name:'Inchworm',                         yt:'https://www.youtube.com/watch?v=0HFXsIMKqUg'},
    {name:'Spiderman Lunge',                  yt:'https://www.youtube.com/watch?v=Y5rud0xMjgo'},
    {name:'Single Leg Balance', yt:'https://www.youtube.com/watch?v=Dtgh2_LFkBQ'},
    {name:'Neck Half Circles', yt:'https://www.youtube.com/watch?v=QIt8mzszdzU'},
    {name:'Standing Quad Stretch', yt:'https://www.youtube.com/watch?v=Ztwz8rrDShk'},
    {name:'Standing Calf Stretch', yt:'https://www.youtube.com/watch?v=GTOBvb45lgg'},
    {name:'Clamshell Corrective',             yt:'https://www.youtube.com/watch?v=39vuP5xozsI'},
    {name:'Banded Clamshell',                 yt:'https://www.youtube.com/watch?v=InAOx0qA9EE'},
    {name:'Bosu Ball Balance', yt:'https://www.youtube.com/watch?v=9Hzn4aohiDc'},
  ],

};
/* ── YouTube link lookup by exercise name ────────────────────── */
const YT_LINKS = (function() {
  var map = {};
  Object.keys(EX_DB).forEach(function(mg) {
    EX_DB[mg].forEach(function(ex) { map[ex.name] = ex.yt || ''; });
  });
  return map;
}());


/* Muscle → colour */
const MG_COLOR = {
  Chest:'#FF6B6B', Back:'#4ECDC4', Shoulders:'#45B7D1',
  Quads:'#96CEB4', Hamstrings:'#FFEAA7', Glutes:'#DDA0DD',
  Calves:'#98D8C8', Biceps:'#F7DC6F', Triceps:'#F0A500',
  Core:'#B0C4DE', Forearms:'#C8A2C8', Traps:'#7FDBFF',
  Cardio:'#01FF70', Olympic:'#FF851B', Rest:'#2A2A2A'
};

/* Optimal weekly sets per muscle group */
const VOL_OPT = { Chest:[10,20], Back:[10,20], Shoulders:[8,16], Quads:[10,20], Hamstrings:[8,16], Glutes:[8,16], Calves:[6,12], Biceps:[8,16], Triceps:[8,14], Core:[6,12], Forearms:[4,10], Traps:[4,10], Cardio:[0,0], Olympic:[4,10], Corrective:[0,0] };

/* ── Smart Split Templates ─────────────────────────────────── */
const SPLITS = {
  ppl3: {
    name:'Push / Pull / Legs (3 days)',
    days:[
      { label:'Push Day', muscle:'Chest + Shoulders + Triceps', exercises:[
        {name:'Bench Press',muscle:'Chest',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:'Main compound — progress weekly'},
        {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
        {name:'Incline DB Press',muscle:'Chest',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
        {name:'Lateral Raise',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
        {name:'Pushdown (Rope)',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Overhead Tricep Extension',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Pull Day', muscle:'Back + Biceps + Rear Delts', exercises:[
        {name:'Deadlift',muscle:'Back',sets:3,reps:'5',rest:'3 min',rpe:'8',note:'Main compound — alternate with Pull-Ups'},
        {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-10',rest:'2 min',rpe:'8',note:'Add weight when 10 reps is easy'},
        {name:'Seated Cable Row',muscle:'Back',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
        {name:'Face Pull',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'8',note:'Keep elbows high'},
        {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'10-12',rest:'60s',rpe:'8',note:''},
        {name:'Hammer Curl',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Legs Day', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
        {name:'Back Squat',muscle:'Quads',sets:4,reps:'6-8',rest:'3 min',rpe:'8',note:'Main compound — progress weekly'},
        {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'2 min',rpe:'8',note:'Hip hinge — feel hamstring stretch'},
        {name:'Leg Press',muscle:'Quads',sets:3,reps:'12-15',rest:'90s',rpe:'9',note:''},
        {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Hip Thrust',muscle:'Glutes',sets:3,reps:'12-15',rest:'90s',rpe:'9',note:''},
        {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:'Full ROM'},
      ]},
    ]
  },
  ppl6: {
    name:'Push / Pull / Legs (6 days)',
    days:[
      { label:'Push A (Strength)', muscle:'Chest + Shoulders + Triceps', exercises:[
        {name:'Bench Press',muscle:'Chest',sets:5,reps:'3-5',rest:'3 min',rpe:'8',note:'Heavy — strength focus'},
        {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:4,reps:'5-6',rest:'3 min',rpe:'8',note:''},
        {name:'Incline DB Press',muscle:'Chest',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
        {name:'Pushdown (Bar)',muscle:'Triceps',sets:3,reps:'10-12',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Pull A (Strength)', muscle:'Back + Biceps', exercises:[
        {name:'Deadlift',muscle:'Back',sets:4,reps:'3-5',rest:'3 min',rpe:'8',note:'Heavy — strength focus'},
        {name:'Barbell Row',muscle:'Back',sets:4,reps:'5-6',rest:'2 min',rpe:'8',note:''},
        {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-8',rest:'2 min',rpe:'8',note:''},
        {name:'Barbell Curl',muscle:'Biceps',sets:3,reps:'8-10',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Legs A (Strength)', muscle:'Quads + Hamstrings', exercises:[
        {name:'Back Squat',muscle:'Quads',sets:5,reps:'3-5',rest:'3 min',rpe:'8',note:'Heavy — strength focus'},
        {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
        {name:'Leg Extension',muscle:'Quads',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
        {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Push B (Hypertrophy)', muscle:'Chest + Shoulders + Triceps', exercises:[
        {name:'Incline Bench Press',muscle:'Chest',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:'Hypertrophy focus'},
        {name:'DB Flye',muscle:'Chest',sets:3,reps:'12-15',rest:'60s',rpe:'9',note:''},
        {name:'Seated DB Press',muscle:'Shoulders',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
        {name:'Lateral Raise',muscle:'Shoulders',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:''},
        {name:'Skull Crusher',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Cable Crossover',muscle:'Chest',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
      ]},
      { label:'Pull B (Hypertrophy)', muscle:'Back + Biceps + Rear Delts', exercises:[
        {name:'Lat Pulldown',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:'Hypertrophy focus'},
        {name:'Seated Cable Row',muscle:'Back',sets:3,reps:'12-15',rest:'90s',rpe:'8',note:''},
        {name:'Face Pull',muscle:'Shoulders',sets:4,reps:'15-20',rest:'60s',rpe:'8',note:''},
        {name:'Incline DB Curl',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Hammer Curl',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Rear Delt Fly',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
      ]},
      { label:'Legs B (Hypertrophy)', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
        {name:'Front Squat',muscle:'Quads',sets:4,reps:'8-10',rest:'2 min',rpe:'8',note:''},
        {name:'Bulgarian Split Squat',muscle:'Quads',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:'Each leg'},
        {name:'Leg Press',muscle:'Quads',sets:3,reps:'15-20',rest:'90s',rpe:'9',note:''},
        {name:'Hip Thrust',muscle:'Glutes',sets:4,reps:'12-15',rest:'90s',rpe:'9',note:''},
        {name:'Seated Leg Curl',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Standing Calf Raise',muscle:'Calves',sets:5,reps:'15-20',rest:'60s',rpe:'9',note:''},
      ]},
    ]
  },
  ul4: {
    name:'Upper / Lower (4 days)',
    days:[
      { label:'Upper A (Strength)', muscle:'Chest + Back + Shoulders + Arms', exercises:[
        {name:'Bench Press',muscle:'Chest',sets:4,reps:'4-6',rest:'3 min',rpe:'8',note:'Strength focus'},
        {name:'Barbell Row',muscle:'Back',sets:4,reps:'4-6',rest:'3 min',rpe:'8',note:''},
        {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:3,reps:'5-7',rest:'2 min',rpe:'8',note:''},
        {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-8',rest:'2 min',rpe:'8',note:''},
        {name:'Barbell Curl',muscle:'Biceps',sets:2,reps:'10-12',rest:'60s',rpe:'8',note:''},
        {name:'Skull Crusher',muscle:'Triceps',sets:2,reps:'10-12',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Lower A (Strength)', muscle:'Quads + Hamstrings + Glutes', exercises:[
        {name:'Back Squat',muscle:'Quads',sets:4,reps:'4-6',rest:'3 min',rpe:'8',note:'Strength focus'},
        {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
        {name:'Leg Press',muscle:'Quads',sets:3,reps:'8-10',rest:'90s',rpe:'8',note:''},
        {name:'Lying Leg Curl',muscle:'Hamstrings',sets:3,reps:'10-12',rest:'60s',rpe:'8',note:''},
        {name:'Standing Calf Raise',muscle:'Calves',sets:4,reps:'12-15',rest:'60s',rpe:'9',note:''},
      ]},
      { label:'Upper B (Hypertrophy)', muscle:'Chest + Back + Shoulders + Arms', exercises:[
        {name:'Incline DB Press',muscle:'Chest',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:'Hypertrophy focus'},
        {name:'Lat Pulldown',muscle:'Back',sets:4,reps:'10-12',rest:'90s',rpe:'8',note:''},
        {name:'Seated DB Press',muscle:'Shoulders',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
        {name:'Cable Row',muscle:'Back',sets:3,reps:'12-15',rest:'90s',rpe:'8',note:''},
        {name:'Lateral Raise',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
        {name:'DB Curl',muscle:'Biceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Pushdown (Rope)',muscle:'Triceps',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Face Pull',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Lower B (Hypertrophy)', muscle:'Quads + Hamstrings + Glutes + Calves', exercises:[
        {name:'Front Squat',muscle:'Quads',sets:4,reps:'8-12',rest:'2 min',rpe:'8',note:''},
        {name:'Bulgarian Split Squat',muscle:'Quads',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:'Each leg'},
        {name:'Hip Thrust',muscle:'Glutes',sets:4,reps:'12-15',rest:'90s',rpe:'9',note:''},
        {name:'Leg Extension',muscle:'Quads',sets:3,reps:'15-20',rest:'60s',rpe:'9',note:''},
        {name:'Seated Leg Curl',muscle:'Hamstrings',sets:3,reps:'12-15',rest:'60s',rpe:'8',note:''},
        {name:'Seated Calf Raise',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:''},
      ]},
    ]
  },
  fb3: {
    name:'Full Body (3 days)',
    days:[
      { label:'Full Body A', muscle:'All Muscle Groups', exercises:[
        {name:'Back Squat',muscle:'Quads',sets:3,reps:'5',rest:'3 min',rpe:'8',note:'Heavy — add weight weekly'},
        {name:'Bench Press',muscle:'Chest',sets:3,reps:'5',rest:'3 min',rpe:'8',note:''},
        {name:'Barbell Row',muscle:'Back',sets:3,reps:'5',rest:'2 min',rpe:'8',note:''},
        {name:'Overhead Press (Bar)',muscle:'Shoulders',sets:3,reps:'5',rest:'2 min',rpe:'8',note:''},
        {name:'Romanian Deadlift',muscle:'Hamstrings',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
        {name:'Plank',muscle:'Core',sets:3,reps:'45s',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Full Body B', muscle:'All Muscle Groups', exercises:[
        {name:'Deadlift',muscle:'Back',sets:3,reps:'5',rest:'3 min',rpe:'8',note:'Alternate Squat/DL each session'},
        {name:'Incline DB Press',muscle:'Chest',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
        {name:'Pull-Up',muscle:'Back',sets:3,reps:'6-8',rest:'2 min',rpe:'8',note:''},
        {name:'Lateral Raise',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'8',note:''},
        {name:'Leg Press',muscle:'Quads',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
        {name:'Barbell Curl',muscle:'Biceps',sets:2,reps:'10-12',rest:'60s',rpe:'8',note:''},
        {name:'Pushdown (Rope)',muscle:'Triceps',sets:2,reps:'10-12',rest:'60s',rpe:'8',note:''},
      ]},
      { label:'Full Body C', muscle:'All Muscle Groups', exercises:[
        {name:'Bulgarian Split Squat',muscle:'Quads',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:'Each leg'},
        {name:'Incline Bench Press',muscle:'Chest',sets:3,reps:'8-10',rest:'2 min',rpe:'8',note:''},
        {name:'Lat Pulldown',muscle:'Back',sets:3,reps:'10-12',rest:'90s',rpe:'8',note:''},
        {name:'Hip Thrust',muscle:'Glutes',sets:3,reps:'12-15',rest:'90s',rpe:'9',note:''},
        {name:'Face Pull',muscle:'Shoulders',sets:3,reps:'15-20',rest:'60s',rpe:'8',note:''},
        {name:'Seated Calf Raise',muscle:'Calves',sets:4,reps:'15-20',rest:'60s',rpe:'9',note:''},
        {name:'Plank',muscle:'Core',sets:3,reps:'60s',rest:'60s',rpe:'8',note:''},
      ]},
    ]
  },
};

/* ── App State ─────────────────────────────────────────────── */
var STATE = {
  client: { name:'', age:'', weight:'', height:'', goal:'hypertrophy', level:'intermediate', injuries:'' },
  program: { name:'', weeks:8, daysPerWeek:4, split:'ul4', periodization:'linear', startDate:'' },
  days: [],
  activeDay: 0,
  coachVol: {}, // coach-set volume targets { Chest:[10,20], ... }
};

/* ── Volume Preset Templates ─────────────────────────────────── */
var VOL_PRESETS = {
  hypertrophy: { Chest:[6,12], Back:[6,12], Shoulders:[6,12], Quads:[6,12], Hamstrings:[6,12], Glutes:[6,12], Calves:[6,12], Biceps:[6,12], Triceps:[6,12], Core:[6,12], Traps:[6,12], Forearms:[6,12] },
  strength:    { Chest:[6,12],  Back:[8,14],  Shoulders:[6,10],  Quads:[8,14],  Hamstrings:[6,12],  Glutes:[6,12],  Calves:[4,8],  Biceps:[6,10],  Triceps:[6,10],  Core:[4,8],  Traps:[4,8],  Forearms:[2,6]  },
  endurance:   { Chest:[10,16], Back:[12,18], Shoulders:[10,14], Quads:[12,18], Hamstrings:[10,14], Glutes:[8,14],  Calves:[10,16],Biceps:[8,12],  Triceps:[8,12],  Core:[10,16],Traps:[4,8],  Forearms:[4,8]  },
  fatloss:     { Chest:[10,16], Back:[12,18], Shoulders:[10,14], Quads:[10,18], Hamstrings:[8,14],  Glutes:[8,14],  Calves:[6,10], Biceps:[8,12],  Triceps:[8,12],  Core:[8,14], Traps:[4,8],  Forearms:[2,6]  },
  beginner:    { Chest:[6,10],  Back:[8,12],  Shoulders:[6,8],   Quads:[6,10],  Hamstrings:[4,8],   Glutes:[4,8],   Calves:[4,8],  Biceps:[4,8],   Triceps:[4,8],   Core:[4,8],  Traps:[2,6],  Forearms:[2,4]  },
};

function applyVolPreset(preset) {
  var p = VOL_PRESETS[preset];
  if(!p) return;
  Object.keys(p).forEach(function(mg){ STATE.coachVol[mg] = p[mg].slice(); });
  buildAnalytics();
  showToast('Volume preset applied: ' + preset + ' ✓');
}

function getVolTarget(mg) {
  return STATE.coachVol[mg] || VOL_OPT[mg] || null;
}

function setCoachVol(mg, idx, val) {
  if(!STATE.coachVol[mg]) STATE.coachVol[mg] = (VOL_OPT[mg]||[10,20]).slice();
  STATE.coachVol[mg][idx] = parseInt(val)||0;
  // re-render just the override grid (not full analytics to avoid losing focus)
  buildVolOverrideGrid();
}

function buildVolOverrideGrid() {
  var el2 = document.getElementById('vol-coach-overrides');
  if(!el2) return;
  var mainMGs = ['Chest','Back','Shoulders','Quads','Hamstrings','Glutes','Calves','Biceps','Triceps','Core','Traps','Forearms'];
  var html = '<div style="display:grid;gap:6px">';
  mainMGs.forEach(function(mg) {
    var rng = STATE.coachVol[mg] || VOL_OPT[mg] || [10,20];
    var col = MG_COLOR[mg]||'#888';
    var customized = !!STATE.coachVol[mg];
    html += '<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:'+(customized?'rgba(245,255,0,.04)':'#0a0a0a')+';border:1px solid '+(customized?'rgba(245,255,0,.15)':'#111')+';border-radius:2px">';
    html += '<div style="width:8px;height:8px;border-radius:50%;background:'+col+';flex-shrink:0"></div>';
    html += '<span style="font-size:12px;font-weight:700;color:#ccc;width:90px;flex-shrink:0">'+mg+'</span>';
    html += '<span style="font-size:10px;color:#444;flex-shrink:0">MIN</span>';
    html += '<input type="number" min="0" max="60" value="'+rng[0]+'" style="width:48px;background:#0f0f0f;border:1px solid #222;color:'+col+';padding:4px 6px;font-size:12px;font-weight:700;text-align:center;outline:none;border-radius:1px" oninput="setCoachVol(\'' + mg + '\',0,this.value)" />';
    html += '<span style="font-size:10px;color:#444;flex-shrink:0">MAX</span>';
    html += '<input type="number" min="0" max="60" value="'+rng[1]+'" style="width:48px;background:#0f0f0f;border:1px solid #222;color:'+col+';padding:4px 6px;font-size:12px;font-weight:700;text-align:center;outline:none;border-radius:1px" oninput="setCoachVol(\'' + mg + '\',1,this.value)" />';
    html += '<span style="font-size:9px;font-weight:700;color:'+(customized?'var(--y)':'#333')+';margin-left:auto;letter-spacing:2px;text-transform:uppercase">'+(customized?'CUSTOM':'AUTO')+'</span>';
    html += '<button onclick="resetCoachVol(\'' + mg + '\')"  style="background:transparent;border:none;color:#333;cursor:pointer;font-size:11px;padding:2px 4px" title="Reset to auto">&#x21BA;</button>';
    html += '</div>';
  });
  html += '</div>';
  el2.innerHTML = html;
}

function resetCoachVol(mg) {
  delete STATE.coachVol[mg];
  buildVolOverrideGrid();
  buildAnalytics();
}

var _uid = 1;
function uid() { return _uid++; }

/* ── Helpers ───────────────────────────────────────────────── */
function gv(id) { var el=document.getElementById(id); return el ? el.value : ''; }
function sv(id,v){ var el=document.getElementById(id); if(el) el.value=v; }
function el(id) { return document.getElementById(id); }

/* ── Navigation ────────────────────────────────────────────── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.ni,.bi').forEach(function(n){ n.classList.remove('active'); });
  var pg = document.getElementById('page-'+id);
  if(pg) pg.classList.add('active');
  document.querySelectorAll('[data-page="'+id+'"]').forEach(function(n){ n.classList.add('active'); });
  if(id==='analytics') buildAnalytics();
  if(id==='builder') renderDays();
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ── Smart Fill ────────────────────────────────────────────── */
function applySplit() {
  var key = gv('split-select') || STATE.program.split;
  var split = SPLITS[key];
  if(!split) return;
  STATE.days = split.days.map(function(d) {
    return {
      id: uid(),
      label: d.label,
      muscle: d.muscle,
      exercises: d.exercises.map(function(e) {
        return { id:uid(), name:e.name, muscle:e.muscle, sets:e.sets, reps:e.reps, rest:e.rest, rpe:e.rpe, note:e.note, ytLink:e.ytLink||'' };
      })
    };
  });
  STATE.activeDay = 0;
  renderDays();
  showToast('Split applied: '+split.name+' \u2713');
  showPage('builder');
}

/* ── Day Management ────────────────────────────────────────── */
function addDay() {
  var d = { id:uid(), label:'New Training Day', muscle:'', exercises:[] };
  STATE.days.push(d);
  STATE.activeDay = STATE.days.length-1;
  renderDays();
  showToast('Day added');
}

function deleteDay(dayId) {
  STATE.days = STATE.days.filter(function(d){ return d.id!==dayId; });
  STATE.activeDay = Math.min(STATE.activeDay, STATE.days.length-1);
  renderDays();
}

function selectDay(idx) {
  STATE.activeDay = idx;
  renderDays();
}

/* ── Exercise Management ───────────────────────────────────── */
function addExercise(dayId) {
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(!d) return;
  d.exercises.push({ id:uid(), name:'', muscle:'', sets:3, reps:'8-12', rest:'90s', rpe:'8', note:'', ytLink:'' });
  renderDays();
}

function deleteExercise(dayId, exId) {
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(!d) return;
  d.exercises = d.exercises.filter(function(e){ return e.id!==exId; });
  renderDays();
}

function moveExercise(dayId, exId, dir) {
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(!d) return;
  var i = d.exercises.findIndex(function(e){ return e.id===exId; });
  var ni = i+dir;
  if(ni<0||ni>=d.exercises.length) return;
  var tmp = d.exercises[i]; d.exercises[i]=d.exercises[ni]; d.exercises[ni]=tmp;
  renderDays();
}

function updateEx(dayId, exId, field, value) {
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(!d) return;
  var e = d.exercises.find(function(e){ return e.id===exId; });
  if(!e) return;
  e[field] = value;
  if(field==='name') {
    // auto-detect muscle group
    for(var mg in EX_DB) {
      if(EX_DB[mg].some(function(ex){ return ex.name===value; })) { e.muscle=mg; break; }
    }
    // Auto-attach YouTube link if available
    if(YT_LINKS[value] && !e.ytLink) { e.ytLink = YT_LINKS[value]; }
  }
}

/* Fix: update exercise name without full re-render (prevents deselection bug) */
function setExMuscle(dayId, exId, selectEl) {
  var mg = selectEl.value;
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(!d) return;
  var e = d.exercises.find(function(e){ return e.id===exId; });
  if(!e) return;
  e.muscle = mg;
  // update dropdown color in-place
  var col = MG_COLOR[mg] || '#333';
  selectEl.style.background   = col + '22';
  selectEl.style.color        = col;
  selectEl.style.borderColor  = col + '44';
}

function updateExName(dayId, exId, inputEl) {
  var val = inputEl.value;
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(!d) return;
  var e = d.exercises.find(function(e){ return e.id===exId; });
  if(!e) return;
  e.name = val;
  // auto-detect muscle group
  var detectedMg = '';
  for(var mg in EX_DB) {
    if(EX_DB[mg].some(function(ex){ return ex.name===val; })) { detectedMg=mg; break; }
  }
  e.muscle = detectedMg;
  // Auto-attach YouTube link when name is recognized
  if(YT_LINKS[val] && !e.ytLink) {
    e.ytLink = YT_LINKS[val];
    var ytInp = document.getElementById('yt-'+exId);
    if(ytInp) ytInp.value = YT_LINKS[val];
  }
  // update muscle dropdown in-place
  var sel = document.getElementById('badge-'+exId);
  if(sel) {
    var col = MG_COLOR[detectedMg]||'#333';
    sel.style.background  = col+'22';
    sel.style.color       = col;
    sel.style.borderColor = col+'44';
    sel.value = detectedMg;
  }
}

function updateDayField(dayId, field, value) {
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(d) d[field]=value;
}

function setDayLoad(dayId, status) {
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if(!d) return;
  d.loadStatus = status;
  renderDays();
}

/* ── Volume Calculator ─────────────────────────────────────── */
function calcVolume() {
  var vol = {};
  Object.keys(EX_DB).forEach(function(mg){ vol[mg]=0; });
  STATE.days.forEach(function(d) {
    d.exercises.forEach(function(e) {
      if(e.muscle && vol[e.muscle]!==undefined) {
        vol[e.muscle] += parseInt(e.sets)||0;
      }
    });
  });
  return vol;
}

function volumeStatus(mg, sets) {
  var rng = getVolTarget(mg);
  if(!rng) return 'ok';
  if(sets===0) return 'none';
  if(sets<rng[0]) return 'low';
  if(sets>rng[1]) return 'high';
  return 'optimal';
}

/* ── 1RM Calculator (Epley) ────────────────────────────────── */
function calc1RM() {
  var w = parseFloat(gv('rm-weight'));
  var r = parseFloat(gv('rm-reps'));
  if(!w||!r) { el('rm-result').textContent='—'; return; }
  if(r===1) { el('rm-result').textContent=w+' kg'; return; }
  var rm = w*(1+r/30);
  el('rm-result').textContent = Math.round(rm)+' kg';
  el('rm-percentages').innerHTML = [100,95,90,85,80,75,70].map(function(p){
    return '<div class="rm-pill"><span style="color:var(--y);font-weight:800">'+p+'%</span><br><span style="font-size:13px">'+Math.round(rm*p/100)+' kg</span></div>';
  }).join('');
}

/* ── Analytics ─────────────────────────────────────────────── */
function buildAnalytics() {
  buildVolOverrideGrid();
  var vol = calcVolume();
  var html = '';
  Object.keys(EX_DB).forEach(function(mg) {
    if(mg==='Cardio'||mg==='Corrective') return; // skip non-volume groups from estimator
    var sets = vol[mg]||0;
    var rng = getVolTarget(mg);
    var coachCustom = !!STATE.coachVol[mg];
    // Determine status vs coach target
    var status = 'none';
    if(sets>0 && rng) {
      if(sets < rng[0]) status = 'low';
      else if(sets > rng[1]) status = 'high';
      else status = 'optimal';
    } else if(sets>0) status = 'optimal';
    var statusColor = {none:'#333',low:'#F87171',optimal:'#4ADE80',high:'#F59E0B'}[status];
    var statusText  = {none:'Not Trained',low:'Under Volume',optimal:'On Target',high:'Over Volume'}[status];
    var pct = rng ? Math.min(100, Math.round(sets/(rng[1]||1)*100)) : 0;
    var col = MG_COLOR[mg]||'#888';
    html += '<div class="vol-card" style="position:relative">';
    if(coachCustom) html += '<div style="position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;color:var(--y);letter-spacing:2px;text-transform:uppercase">COACH SET</div>';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">';
    html += '<div style="display:flex;align-items:center;gap:8px;"><div style="width:10px;height:10px;border-radius:50%;background:'+col+';flex-shrink:0"></div>';
    html += '<span style="font-weight:700;font-size:13px;color:#fff">'+mg+'</span></div>';
    html += '<span style="font-size:11px;font-weight:700;color:'+statusColor+'">'+statusText+'</span></div>';
    html += '<div style="display:flex;align-items:baseline;gap:6px;margin-bottom:8px;">';
    html += '<span style="font-size:28px;font-weight:900;color:'+col+';line-height:1">'+sets+'</span>';
    html += '<span style="font-size:11px;color:#555">sets / week</span>';
    if(rng) html += '<span style="font-size:11px;color:#444;margin-left:auto">target: '+rng[0]+'–'+rng[1]+'</span>';
    html += '</div>';
    html += '<div style="height:6px;background:#111;border-radius:3px;overflow:hidden;">';
    html += '<div style="height:100%;width:'+pct+'%;background:'+col+';border-radius:3px;transition:width .5s"></div></div>';
    html += '</div>';
  });
  el('vol-grid').innerHTML = html;

  // Day summary
  var ds = '';
  STATE.days.forEach(function(d,i) {
    var totalSets = d.exercises.reduce(function(a,e){ return a+(parseInt(e.sets)||0); }, 0);
    var mgs = [...new Set(d.exercises.map(function(e){return e.muscle;}).filter(Boolean))];
    ds += '<div style="background:#111;border:1px solid #1a1a1a;padding:14px;border-left:3px solid var(--y);">';
    ds += '<div style="font-weight:800;font-size:13px;color:#fff;margin-bottom:4px;">'+d.label+'</div>';
    ds += '<div style="font-size:11px;color:#555;margin-bottom:8px;">'+d.exercises.length+' exercises &nbsp;|&nbsp; '+totalSets+' total sets</div>';
    ds += '<div style="display:flex;flex-wrap:wrap;gap:4px;">';
    mgs.forEach(function(mg){
      var col = MG_COLOR[mg]||'#555';
      ds += '<span style="background:'+col+'22;color:'+col+';font-size:10px;font-weight:700;padding:2px 8px;border-radius:2px">'+mg+'</span>';
    });
    ds += '</div></div>';
  });
  el('day-summary').innerHTML = ds || '<div style="color:#333;font-size:13px;font-style:italic;padding:20px">No training days yet. Apply a split or add days manually.</div>';
}

/* ── Render Days (Builder) ─────────────────────────────────── */
function renderDays() {
  // Day tabs
  var tabsEl = el('day-tabs');
  var tabs = STATE.days.map(function(d,i) {
    return '<div class="dtab'+(i===STATE.activeDay?' active':'')+'" onclick="selectDay('+i+')">' + (d.label||'Day '+(i+1)) + '</div>';
  }).join('');
  tabs += '<button class="dtab-add" onclick="addDay()">+ Day</button>';
  tabsEl.innerHTML = tabs;

  // Active day content
  var area = el('day-content');
  if(!STATE.days.length) {
    area.innerHTML = '<div style="text-align:center;padding:60px 20px;color:#333;"><div style="font-size:32px;margin-bottom:12px">🏋️</div><div style="font-size:14px">Apply a split template or add a day manually</div></div>';
    return;
  }
  var d = STATE.days[STATE.activeDay];
  if(!d) return;

  var html = '';
  html += '<div class="day-header">';
  html += '<div class="dh-left">';
  html += '<input class="fi day-name-input" value="'+escHtml(d.label)+'" placeholder="Day name..." oninput="updateDayField('+d.id+',\'label\',this.value);renderTabs()" />';
  html += '<input class="fi day-muscle-input" value="'+escHtml(d.muscle)+'" placeholder="Muscle groups (e.g. Chest + Triceps)" oninput="updateDayField('+d.id+',\'muscle\',this.value)" />';
  html += '</div>';
  html += '<button class="btn btn-red btn-sm" onclick="deleteDay('+d.id+')">&#x1F5D1; Delete Day</button>';
  html += '</div>';

  // Column headers
  html += '<div class="ex-header">';
  html += '<span class="ec0">#</span><span class="ec1">Exercise</span><span class="ec2">Muscle</span>';
  html += '<span class="ec3">Sets</span><span class="ec4">Reps</span><span class="ec5">Rest</span>';
  html += '<span class="ec6">RPE</span><span class="ec7">Notes + YouTube Link</span><span class="ec8"></span>';
  html += '</div>';

  // Exercises
  html += '<div class="ex-list" id="exlist-'+d.id+'">';
  d.exercises.forEach(function(e,ei) {
    var col = MG_COLOR[e.muscle]||'#333';
    html += '<div class="ex-row" data-exid="'+e.id+'">';
    html += '<span class="ec0 ex-num">'+( ei+1)+'</span>';

    // Exercise name with datalist + DB button (FIX: updateExName avoids deselection bug)
    html += '<span class="ec1" style="display:flex;gap:4px;align-items:center">';
    html += '<input class="fi-ex" id="exname-'+e.id+'" value="'+escHtml(e.name)+'" placeholder="Exercise..." list="ex-list-all" oninput="updateExName('+d.id+','+e.id+',this)" />';
    html += '<button class="ic-btn" title="Browse Exercise Database" onclick="openExDB('+d.id+','+e.id+')" style="color:var(--y);font-size:16px;flex-shrink:0">&#x1F4DA;</button>';
    html += '</span>';

    // Muscle group selector dropdown (replaces static badge)
    html += '<span class="ec2">';
    html += '<select class="fi-ex mg-sel" id="badge-'+e.id+'" style="background:'+col+'22;color:'+col+';font-size:11px;font-weight:700;padding:4px 6px;border:1px solid '+col+'44;border-radius:2px;cursor:pointer;-webkit-appearance:none;appearance:none;text-align:center" oninput="setExMuscle('+d.id+','+e.id+',this)">';
    html += '<option value="" '+(e.muscle?'':'selected')+'>— Muscle —</option>';
    Object.keys(MG_COLOR).forEach(function(mg) {
      if(mg==='Rest') return;
      html += '<option value="'+mg+'" '+(e.muscle===mg?'selected':'')+'>'+mg+'</option>';
    });
    html += '</select>';
    html += '</span>';

    html += '<span class="ec3"><input class="fi-ex num-in" type="number" value="'+e.sets+'" min="1" max="20" oninput="updateEx('+d.id+','+e.id+',\'sets\',this.value)" /></span>';
    html += '<span class="ec4"><input class="fi-ex" value="'+escHtml(e.reps)+'" placeholder="8-12" oninput="updateEx('+d.id+','+e.id+',\'reps\',this.value)" /></span>';
    html += '<span class="ec5"><input class="fi-ex" value="'+escHtml(e.rest)+'" placeholder="90s" oninput="updateEx('+d.id+','+e.id+',\'rest\',this.value)" /></span>';
    html += '<span class="ec6"><input class="fi-ex num-in" value="'+escHtml(e.rpe)+'" placeholder="8" style="color:var(--y)" oninput="updateEx('+d.id+','+e.id+',\'rpe\',this.value)" /></span>';
    html += '<span class="ec7" style="display:flex;flex-direction:column;gap:3px">';
    html += '<input class="fi-ex notes-in" value="'+escHtml(e.note)+'" placeholder="Coaching notes / cues..." oninput="updateEx('+d.id+','+e.id+',\'note\',this.value)" />';
    html += '<div style="display:flex;gap:4px;align-items:center">';
    html += '<span style="font-size:10px;color:#555;white-space:nowrap;letter-spacing:1px">YT LINK:</span>';
    html += '<input id="yt-'+e.id+'" class="fi-ex" value="'+escHtml(e.ytLink||'')+'" placeholder="Auto-filled from DB ✓" style="font-size:11px;color:#aaa" oninput="updateEx('+d.id+','+e.id+',\'ytLink\',this.value)" />';
    if(e.ytLink) { html += '<a href="'+escHtml(e.ytLink)+'" target="_blank" style="color:#ff3333;font-size:16px;text-decoration:none;flex-shrink:0;line-height:1" title="Open form video">&#x25B6;</a>'; }
    html += '</div>';
    html += '</span>';

    html += '<span class="ec8 ex-actions">';
    html += '<button class="ic-btn" title="Move up" onclick="moveExercise('+d.id+','+e.id+',-1)">&#x25B2;</button>';
    html += '<button class="ic-btn" title="Move down" onclick="moveExercise('+d.id+','+e.id+',1)">&#x25BC;</button>';
    html += '<button class="ic-btn del-btn" title="Delete" onclick="deleteExercise('+d.id+','+e.id+')">&#x2715;</button>';
    html += '</span>';
    html += '</div>';
  });
  html += '</div>';

  // Volume summary for this day
  var dayVol = {};
  d.exercises.forEach(function(e){ if(e.muscle){ dayVol[e.muscle]=(dayVol[e.muscle]||0)+(parseInt(e.sets)||0); }});
  html += '<div class="day-vol">';
  Object.keys(dayVol).forEach(function(mg){
    var col = MG_COLOR[mg]||'#555';
    html += '<span style="background:'+col+'22;color:'+col+';font-size:11px;font-weight:700;padding:4px 10px;border-radius:2px">'+mg+': '+dayVol[mg]+' sets</span>';
  });
  html += '</div>';

  // Training Load Assessment - Coach Decision
  html += '<div style="background:rgba(245,255,0,.04);border:1px solid rgba(245,255,0,.12);padding:12px 14px;margin-top:10px">';
  html += '<div style="font-size:10px;color:var(--y);letter-spacing:3px;text-transform:uppercase;font-weight:700;margin-bottom:8px">Training Load Assessment</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">';
  var loadOpts = ['Optimal','Sub-Optimal','Overloaded','Deload Week','Introductory'];
  loadOpts.forEach(function(opt) {
    var selected = d.loadStatus === opt;
    var bg = selected ? 'var(--y)' : 'transparent';
    var col2 = selected ? '#000' : '#555';
    var bdr = selected ? 'var(--y)' : 'rgba(255,255,255,.1)';
    html += '<button onclick="setDayLoad('+d.id+',\''+opt+'\')" style="background:'+bg+';color:'+col2+';border:1px solid '+bdr+';padding:5px 12px;font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .15s">'+opt+'</button>';
  });
  html += '</div>';
  html += '<input class="fi" value="'+escHtml(d.loadNote||'')+'" placeholder="Coach note on training load (e.g. increase load next week)..." style="font-size:12px" oninput="updateDayField('+d.id+',\'loadNote\',this.value)" />';
  html += '</div>';

  html += '<button class="btn btn-o" style="margin-top:10px;width:100%" onclick="addExercise('+d.id+')">+ Add Exercise</button>';

  // Total sets for day
  var totalSets = d.exercises.reduce(function(a,e){return a+(parseInt(e.sets)||0);},0);
  var totalEx = d.exercises.length;
  html += '<div style="margin-top:10px;font-size:11px;color:#444;text-align:right">'+totalEx+' exercises &nbsp;·&nbsp; '+totalSets+' total sets</div>';

  area.innerHTML = html;
}

function renderTabs() {
  var d = STATE.days[STATE.activeDay];
  var tabsEl = el('day-tabs');
  var tabs = STATE.days.map(function(dd,i) {
    return '<div class="dtab'+(i===STATE.activeDay?' active':'')+'" onclick="selectDay('+i+')">' + (dd.label||'Day '+(i+1)) + '</div>';
  }).join('');
  tabs += '<button class="dtab-add" onclick="addDay()">+ Day</button>';
  tabsEl.innerHTML = tabs;
}

function escHtml(s) {
  if(!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── Toast ─────────────────────────────────────────────────── */
function showToast(msg) {
  var t = el('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2600);
}

/* ── Exercise Database Modal ────────────────────────────────── */
var _exdbTargetDay = null;
var _exdbTargetEx  = null;
var _exdbActiveMG  = 'All';

function openExDB(dayId, exId) {
  _exdbTargetDay = dayId;
  _exdbTargetEx  = exId;
  _exdbActiveMG  = 'All';
  document.getElementById('exdb-search').value = '';
  buildExDBFilter();
  renderExDBList('');
  document.getElementById('exdb-modal').classList.add('show');
  setTimeout(function(){ document.getElementById('exdb-search').focus(); }, 100);
}

function closeExDB() {
  document.getElementById('exdb-modal').classList.remove('show');
}

function buildExDBFilter() {
  var mgs = ['All'].concat(Object.keys(EX_DB));
  var fEl = document.getElementById('exdb-filter');
  fEl.innerHTML = mgs.map(function(mg) {
    var col = MG_COLOR[mg] || 'var(--y)';
    var active = mg === _exdbActiveMG;
    var count = mg === 'All'
      ? Object.keys(EX_DB).reduce(function(a,k){return a+EX_DB[k].length;},0)
      : (EX_DB[mg]||[]).length;
    var activeStyle = active ? 'background:'+col+';border-color:'+col+';color:#000' : '';
    return '<button class="exdb-tag'+(active?' active':'')+'" onclick="setExDBFilter(\'' + mg + '\')" style="'+activeStyle+'">' + mg + ' <small style="opacity:.55">('+count+')</small></button>';
  }).join('');
}

function setExDBFilter(mg) {
  _exdbActiveMG = mg;
  buildExDBFilter();
  renderExDBList(document.getElementById('exdb-search').value);
}

function filterExDB() {
  renderExDBList(document.getElementById('exdb-search').value);
}

function renderExDBList(query) {
  var listEl = document.getElementById('exdb-list');
  var q = query.toLowerCase().trim();
  var html = '';
  var mgs = _exdbActiveMG === 'All' ? Object.keys(EX_DB) : [_exdbActiveMG];
  var count = 0;
  mgs.forEach(function(mg) {
    var exs = EX_DB[mg];
    exs.forEach(function(ex) {
      var name = ex.name;
      var yt   = ex.yt || '';
      if(q && name.toLowerCase().indexOf(q) === -1) return;
      var col = MG_COLOR[mg] || '#555';
      html += '<div class="exdb-item" onclick="selectExFromDB(\'' + escHtml(name) + '\',\'' + mg + '\',\'' + escHtml(yt) + '\')">';
      html += '<span class="exdb-item-name">'+escHtml(name)+'</span>';
      if(yt) html += '<a href="'+escHtml(yt)+'" target="_blank" onclick="event.stopPropagation()" style="color:#ff4444;font-size:13px;text-decoration:none;flex-shrink:0;padding:2px 6px;border:1px solid #ff444433;border-radius:2px;font-family:Barlow Condensed,sans-serif;font-size:11px;letter-spacing:1px" title="Preview form video">&#x25B6; FORM</a>';
      html += '<span class="exdb-item-mg" style="background:'+col+'22;color:'+col+'">'+mg+'</span>';
      html += '</div>';
      count++;
    });
  });
  if(!count) html = '<div style="text-align:center;padding:40px;color:#333;font-size:13px">No exercises found</div>';
  listEl.innerHTML = html;
}

function selectExFromDB(name, mg, yt) {
  // Update state
  var d = STATE.days.find(function(d){ return d.id===_exdbTargetDay; });
  if(!d) { closeExDB(); return; }
  var e = d.exercises.find(function(e){ return e.id===_exdbTargetEx; });
  if(!e) { closeExDB(); return; }
  e.name   = name;
  e.muscle = mg;
  if(yt) e.ytLink = yt;
  // Update input in DOM
  var inp = document.getElementById('exname-'+_exdbTargetEx);
  if(inp) inp.value = name;
  // Update YouTube input in DOM
  var ytInp2 = document.getElementById('yt-'+_exdbTargetEx);
  if(ytInp2 && yt) ytInp2.value = yt;
  // Update muscle dropdown in DOM
  var sel2 = document.getElementById('badge-'+_exdbTargetEx);
  if(sel2) {
    var col = MG_COLOR[mg]||'#333';
    sel2.style.background  = col+'22';
    sel2.style.color       = col;
    sel2.style.borderColor = col+'44';
    sel2.value = mg;
  }
  closeExDB();
  showToast(name + ' selected ✓');
}
