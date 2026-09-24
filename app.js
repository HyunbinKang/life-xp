const experiences=[
  ['🍜','혼밥','Solo',100],['🎬','혼영','Solo',100],['🍷','혼술','Solo',200],
  ['✈️','해외 혼자 여행','Travel',500],['🏕️','캠핑','Adventure',200],
  ['🤿','스노클링','Adventure',300],['🏄','서핑','Adventure',500],
  ['🎿','스키','Adventure',300],['🏺','도예','Creative',200],
  ['📷','사진','Creative',100],['🎤','콘서트','Culture',200],['🍣','오마카세','Food',200]
];
let selected=new Set(JSON.parse(localStorage.getItem('lifexp')||'[]'));
let currentExperience='surf';
const app=document.querySelector('#app');

const homeExperiences={
  snorkel:{icon:'🤿',name:'스노클링',status:'완료 · Lv.2',title:'첫 스노클링 완료!',meta:'제주 · +500 XP',sceneLeft:'🌊',sceneRight:'🤿🐠',quest:'Sea Explorer',questText:'다음 바다 경험을 찾아보세요.',reward:'+500 XP',done:true},
  camp:{icon:'🏕️',name:'캠핑',status:'완료 · Lv.3',title:'캠핑의 밤',meta:'가평 · +350 XP',sceneLeft:'🌙',sceneRight:'🏕️',quest:'Camp Night',questText:'새로운 캠핑 장소를 기록해보세요.',reward:'+350 XP',done:true},
  pottery:{icon:'🏺',name:'도예',status:'완료 · Lv.1',title:'도예 첫 경험 완료!',meta:'성수 · +400 XP',sceneLeft:'✨',sceneRight:'🏺',quest:'Clay Maker',questText:'다음 작품을 직접 만들어보세요.',reward:'+400 XP',done:true},
  surf:{icon:'🏄',name:'서핑',status:'WANT · +700 XP',title:'다음 도전: 첫 서핑',meta:'아직 경험하지 않았어요 · +700 XP',sceneLeft:'🌊',sceneRight:'🏄🐠',quest:'First Wave',questText:'처음으로 서핑에 도전해보세요.',reward:'+700 XP',done:false}
};


function logo(){
  return `<div class="brand-logo" aria-label="LIFE XP">
    <span class="brand-mark"><i class="ear ear-l"></i><i class="ear ear-r"></i><i class="face"><b></b><b></b></i></span>
    <span class="brand-word"><strong>LIFE</strong><em>XP</em></span>
  </div>`;
}
function bunny(key='surf'){
  const e=homeExperiences[key]||homeExperiences.surf;
  return `<div class="rabbit-scene clean-scene">
    <span class="scene-left">${e.sceneLeft}</span>
    <span class="scene-right">${e.sceneRight}</span>
    <img class="rabbit-clean-img" src="assets/rabbit-clean.png" alt="LIFE XP 토끼">
    <div class="scene-waves">〰　〰　〰</div>
  </div>`;
}
function landing(){app.innerHTML=`<div class="shell"><section class="hero">${logo()}<div class="eyebrow logo-gap">LIFE XP</div><h1>PLAY YOUR LIFE.</h1><p class="muted">지금까지 얼마나 많은 걸 경험했나요?</p>${bunny('surf')}<p>현실에서 경험하고, 작은 토끼와 함께<br><b>나의 인생 레벨을 올려보세요.</b></p><div class="space"></div><button class="primary" onclick="test()">내 Life Level 알아보기</button></section></div>`}
function test(){app.innerHTML=`<div class="shell">${logo()}<div class="eyebrow logo-gap">EXPERIENCE TEST</div><h1 class="title">해본 걸 골라봐 🐰</h1><p class="muted">정답은 없어. 네가 직접 해봤다면 체크!</p><div class="grid">${experiences.map((e,i)=>`<button class="exp ${selected.has(i)?'selected':''}" onclick="toggle(${i})"><span style="font-size:28px">${e[0]}</span><b>${e[1]}</b><small class="muted">${e[2]} · +${e[3]} XP</small></button>`).join('')}</div><div class="space"></div><button class="primary" onclick="home()">내 결과 보기</button></div>`}
function toggle(i){selected.has(i)?selected.delete(i):selected.add(i);localStorage.setItem('lifexp',JSON.stringify([...selected]));test()}
function stats(){let xp=[...selected].reduce((s,i)=>s+experiences[i][3],0);return {xp,count:selected.size,lv:Math.max(1,Math.floor(xp/400)+1)}}
function selectHomeExperience(key){currentExperience=key;home(key)}
function home(key=currentExperience){
  currentExperience=key;
  const s=stats(), e=homeExperiences[key];
  app.innerHTML=`<div class="shell">${logo()}<div class="card logo-card-gap"><div class="top"><div><div class="eyebrow">MY LIFE</div><h1 class="title">Life Lv. ${s.lv}</h1><span class="muted">${s.count} experiences · ${Math.floor(s.count/3)} badges</span></div><div class="xp">${s.xp.toLocaleString()} XP</div></div>
  ${bunny(key)}
  <div class="center"><h3>${e.title}</h3><p class="muted">${e.meta}</p><div class="chips" style="justify-content:center"><span class="chip">🏆 ${e.done?'Experience Complete':'Next Challenge'}</span><span class="chip">${e.done?'ITEM':'REWARD'} ${e.icon}</span></div></div>
  <div class="space"></div><div class="top"><b style="font-size:12px">다음 레벨까지</b><b style="font-size:12px">340 / 500 XP</b></div><div class="progress"><i></i></div></div>
  <h2>What's next?</h2><div class="grid">${Object.entries(homeExperiences).map(([k,x])=>`<button class="exp home-exp ${k===key?'active':''}" onclick="selectHomeExperience('${k}')"><span class="home-icon">${x.icon}</span><b>${x.name}</b><small>${x.status}</small></button>`).join('')}</div>
  <div class="card quest-card"><div class="top"><div class="eyebrow">NEXT QUEST</div><b>${e.reward}</b></div><h3>${e.icon} ${e.quest}</h3><p class="muted">${e.questText}</p></div>${nav('home')}</div>`
}
function passport(){app.innerHTML=`<div class="shell">${logo()}<div class="eyebrow logo-gap">MY LIFE PASSPORT</div><h1 class="title">2026의 경험들</h1><p class="muted">해본 순간들이 작은 도장처럼 쌓여요.</p>${[['🤿','SNORKELING','2026.08.18'],['🏕️','CAMPING','2026.07.04'],['🏺','POTTERY','2026.06.21'],['🎤','CONCERT','2026.05.17']].map(x=>`<div class="stamp"><span class="mini">${x[0]}</span><div><b>${x[1]}</b><div class="muted">${x[2]}</div></div><span style="margin-left:auto">🐰 ✓</span></div>`).join('')}${nav('passport')}</div>`}
function nav(active){return `<nav class="nav"><button onclick="home()">${active==='home'?'● ':''}🏠 Home</button><button onclick="test()">✨ Explore</button><button onclick="passport()">${active==='passport'?'● ':''}📖 Passport</button></nav>`}
landing();
