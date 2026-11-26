/* Arcanum: offline-first DW2 Beta v3 Wizard keeper with optional Drive sync. */
(()=>{'use strict';
const STORAGE='arcanum_dw2_v3_v1';
const REFERENCE = window.ARCANUM_RULES || {};
const tableReference = window.ARCANUM_REFERENCE || [];
const referenceById = new Map(tableReference.map(entry => [entry.id, entry]));
const CLASS_RULES = REFERENCE.RULES || {Wizard:{name:'Wizard',hp:6,startingDescription:'Prepare three schools and weave the arcane.',paths:[]}};
const SCHOOLS=[
{id:'Abjuration',sub:'Magic itself',verbs:['Temporarily disable','Protect from'],desc:'Wards, suppression and protection'},
{id:'Conjuration',sub:'Objects or outsiders',verbs:['Briefly create','Momentarily summon'],desc:'Temporary objects and summoned outsiders'},
{id:'Divination',sub:'Past, present and future visions',verbs:['Convey','Discern'],desc:'Information, foresight and visions'},
{id:'Enchantment',sub:'Sapient beings',verbs:['Modify emotions','Temporarily charm'],desc:'Charm and influence'},
{id:'Evocation',sub:'Elemental energies',verbs:['Lesser sculpt','Minor channel'],desc:'Fire, ice, lightning, wind and other elements'},
{id:'Illusion',sub:'Sights and/or sounds',verbs:['Cloak','Disguise'],desc:'Sensory deception and concealment'},
{id:'Necromancy',sub:'Unlife',verbs:['Briefly bestow','Radiate'],desc:'Undead and unlife'},
{id:'Transmutation',sub:'Matter',verbs:['Momentarily alter','Repair'],desc:'Physical alterations and restoration'}
];
const PATHS=[
{id:'Illusionist',school:'Illusion',extra:['Make permanent','Substantiate'],tag:'Master deception and perception',starting:'Illusion Magic + Trickster',startingDesc:'Always prepare Illusion in addition to your normal three schools; add Make permanent and Substantiate. Once per scene, clear a Condition when someone believes a lie caused by your illusion.',moves:[
{id:'Alter Perception',desc:'Touch a person or object to alter one perceptible aspect without Cast a Spell; mark a Condition if unwilling. Lasts until dismissed or scene end.'},
{id:'Fool Me Once…',desc:'After someone falls for your illusion, gain advantage and use INT instead of CHA for your next Pull Strings on them. You can share this benefit with involved allies.'},
{id:'Mirror Image',desc:'When you would suffer damage, mark a Condition to prevent it all and reveal your actual position somewhere #near.'},
{id:'The Mirror Stares Back',desc:'Ask a question as if you Sensed Motive the first time an NPC falls for your illusion. Overcharge illusory copies into independent, lasting imitations by marking a Condition.'}]},
{id:'Evoker',school:'Evocation',extra:['Detonate','Magnify'],tag:'Shape devastating elemental magic',starting:'Evocation Magic + Mental Reserves',startingDesc:'Always prepare Evocation in addition to your normal three schools; add Detonate and Magnify. Mark a Condition to instantly prepare a school within your normal limit.',moves:[
{id:'Contingency',desc:'Mark 1–3 Conditions to prepare a spell or Move for a specific trigger, then resolve with a roll modified by Conditions marked.'},
{id:'Elemental Cloak',desc:'Mark 1–3 Conditions for fiery retaliation, icy protection, rock armor, or wild-gale mobility.'},
{id:'Instant Fireball!',desc:'Mark 1–3 Conditions; a #near target and creatures #close to them suffer that many d6 piercing damage.'},
{id:'Power Weapon',desc:'Mark 1–3 Conditions and roll to shape an elemental weapon (1d6, three uses). Trade Blows with it using INT.'}]},
{id:'Necromancer',school:'Necromancy',extra:['Corrupt','Drain'],tag:'Command unlife and forbidden powers',starting:'Necromantic Magic + Rise and Serve',startingDesc:'Always prepare Necromancy in addition to your normal three schools; add Corrupt and Drain. Create a loyal skeleton, zombie or ghoul when your spell kills a living creature.',moves:[
{id:'A Ghost at the Feast',desc:'Create a ghost, shade or shadow instead of a physical undead. Mark a Condition to create both.'},
{id:'Lifeforce Is a Resource',desc:'Gain a special 7–9 spell option: suffer 1 piercing damage. Mark a Condition to redistribute HP between yourself and nearby undead.'},
{id:'Sanctum to Unlife',desc:'Perform a special ritual that imbues a location with unholy power and grants defined benefits.'},
{id:'Shed this Mortal Coil',desc:'Gain a phylactery and the secrets of lichdom.'}]}
];
const CONDITIONS=[{name:'Angry',stat:'INT',desc:'Disadvantage on INT rolls'},{name:'Distracted',stat:'WIS',desc:'Disadvantage on WIS rolls'},{name:'Exhausted',stat:'STR',desc:'Disadvantage on STR rolls'},{name:'Frightened',stat:'DEX',desc:'Disadvantage on DEX rolls'},{name:'Insecure',stat:'CHA',desc:'Disadvantage on CHA rolls'}];
const STARTER_SPELLS=[
{name:'Brief Invisibility',verb:'Cloak',sub:'Sights and/or sounds',category:'Defense',mag:'0',effect:'Hide yourself from view for a few seconds; longer duration raises magnitude.',note:'Concept only; GM approves exact effect.'},
{name:'Windstep',verb:'Minor channel',sub:'Elemental energies',category:'Mobility',mag:'?',effect:'Channel a small gust to assist a jump or make space during a retreat.',note:'Whether it can propel a character needs GM approval.'},
{name:'False Wall',verb:'Disguise',sub:'Sights and/or sounds',category:'Control',mag:'?',effect:'Make a real opening appear blocked to misdirect pursuers.',note:'Visual deception does not create a solid obstacle.'},
{name:'Fire Ward',verb:'Protect from',sub:'Elemental energies',category:'Defense',mag:'?',effect:'Ward yourself against a specified elemental threat such as fire.',note:'Armor, shield or resistance benefits depend on GM ruling.'},
{name:'Temporary Rope',verb:'Briefly create',sub:'Objects or outsiders',category:'Utility',mag:'?',effect:'Create a temporary rope to negotiate a dangerous obstacle.',note:'Size, duration, and strength are GM decisions.'},
{name:'Arcane Suppression',verb:'Temporarily disable',sub:'Magic itself',category:'Control',mag:'?',effect:'Attempt to interrupt an active magical ward or trap briefly.',note:'The ward’s power determines the magnitude.'},
{name:'Spectral Staircase',verb:'Substantiate',sub:'Sights and/or sounds',category:'Mobility',mag:'?',effect:'Attempt to make illusory steps tangible enough to climb.',note:'Ambitious Path concept, requires explicit GM approval.'},
{name:'Arcane Dart',verb:'Minor channel',sub:'Elemental energies',category:'Damage',mag:'0',effect:'A small magical projectile; the rules list a MAG 0 magical dart as 1d4 damage.',note:'GM confirms the specific Evocation implementation.'}
];
const FOCI = [
  {id: 'skull', name: 'Bejeweled skull cap', details: 'Arcane focus.', equipped: true, bonuses: {armor: 1}},
  {id: 'grimoire', name: 'Delicate grimoire', details: 'Arcane focus. Once per session, prepare a school instantly.', equipped: true, maxUses: 1},
  {id: 'staff', name: 'Unwieldy staff', details: 'Arcane focus.', equipped: true, weapon: true, damage: '1d6', keywords: ['#close', '#hand', '#two-handed']},
];
const EQUIPMENT = [
  {id: 'gear', name: 'Adventuring gear', maxUses: 3, details: 'Mark a use for a useful mundane item.'},
  {id: 'books', name: 'Bag of books', maxUses: 3, details: 'Mark a use to find useful information.'},
  {id: 'dagger', name: 'Razor dagger', equipped: true, weapon: true, damage: '1d4', keywords: ['#precise', '#piercing', '#thrown']},
  {id: 'potion', name: 'Potion of healing', maxUses: 1, details: 'Heal half max HP or clear a locked Condition.'},
  {id: 'provisions', name: 'Provisions', maxUses: 3, details: 'Mark once while you Comfort or Support.'},
];
const attributes = ['STR', 'DEX', 'INT', 'WIS', 'CHA'];
const itemBonusLabels = {armor: 'Armor', hp: 'Max HP', STR: 'STR', DEX: 'DEX', INT: 'INT', WIS: 'WIS', CHA: 'CHA'};
const diceCountMax = 5;
const diceBonusMin = -1;
const diceBonusMax = 5;
const NAV=[
  {id:'sheet',label:'Sheet',icon:'user'},
  {id:'play',label:'Play tools',icon:'dice'},
  {id:'magic',label:'Spellbook',icon:'sparkles'},
  {id:'paths',label:'Paths & growth',icon:'layers'},
  {id:'equipment',label:'Equipment',icon:'shield'},
  {id:'notes',label:'Campaign journal',icon:'book'},
  {id:'rules',label:'Rules & reference',icon:'book'},
  {id:'characters',label:'Character library',icon:'user'},
  {id:'saves',label:'App & saves',icon:'save'}
];
const SYMBOLS={
'user':'<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',
'sparkles':'<path d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z"/><path d="m19 19 1 2 1-2 2-1-2-1-1-2-1 2-2 1z"/>',
'layers':'<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
'dice':'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
'book':'<path d="M4 19V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2Z"/><path d="M4 17c0-1 1-2 3-2h12"/>',
'download':'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
'upload':'<path d="M12 17V5m-5 5 5-5 5 5M4 17v4h16v-4"/>',
'moon':'<path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z"/>',
'plus':'<path d="M12 5v14M5 12h14"/>',
'x':'<path d="m18 6-12 12M6 6l12 12"/>',
'check':'<path d="m5 12 4 4L19 6"/>',
'shield':'<path d="m12 22 8-5V6l-8-4-8 4v11l8 5Z"/>',
'heart':'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
'chevron':'<path d="m9 18 6-6-6-6"/>',
'save':'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M7 3v7h10V3M7 21v-8h10v8"/>',
'refresh':'<path d="M3 12a9 9 0 0 1 15-6l3 3M21 3v6h-6M21 12a9 9 0 0 1-15 6l-3-3M3 21v-6h6"/>',
'printer':'<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
'copy':'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
'flame':'<path d="M12 22c5 0 8-3.6 8-8 0-3-1-5-4-8-.5 3-2 4-3 5 0-4-1-6-4-9 0 4-4 7-4 12 0 4.4 3 8 7 8Z"/>',
'arrow':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
'warning':'<path d="m12 2 10 18H2L12 2Z"/><path d="M12 9v4m0 4h.01"/>',
'edit':'<path d="m16 5 3 3M4 20l4-.8L20 7a2.1 2.1 0 0 0-3-3L5 16l-1 4Z"/>',
'check-circle':'<circle cx="12" cy="12" r="10"/><path d="m7 12 3 3 6-6"/>',
'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4 4l2 2m12 12 2 2M2 12h2m16 0h2M4 20l2-2M18 6l2-2"/>',
'delete':'<path d="M4 7h16m-10 4v6m4-6v6M7 7l1 14h8l1-14M9 7V4h6v3"/>'
};
const ico=(name,cls='')=>`<svg class="${cls}" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SYMBOLS[name]||SYMBOLS.sparkles}</svg>`;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const uid=()=>('c'+Date.now().toString(36)+Math.random().toString(36).slice(2,8));
const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
function fresh(name='Unnamed Wizard') {return {id:uid(),name,pronouns:'',player:'',level:2,stats:{STR:-1,DEX:1,INT:2,WIS:0,CHA:0},hp:7,hpBonus:0,armorBonus:0,xp:0,className:'Wizard',permanentConditions:[],conditions:{Angry:'clear',Distracted:'clear',Exhausted:'clear',Frightened:'clear',Insecure:'clear'},origins:{ancestry:'',community:'',background:'',look:'',portrait:''},relationships:[],prepared:['Abjuration','Conjuration','Evocation'],forgotten:[],paths:['Illusionist'],moves:[],focus:'skull',equipment:['gear','potion'],used:{gear:0,books:0,potion:0,provisions:0,grimoire:0},wealth:'Modest',treasure:0,spells:STARTER_SPELLS.map(x=>({...x,id:uid(),example:true})),notes:'',inventory:[],journalEntries:[],backstory:{},sessionNotes:'',advancements:[],createdAt:Date.now(),updatedAt:Date.now()};}
let volatile=false;
let db;
try{const raw=localStorage.getItem(STORAGE);db=raw?JSON.parse(raw):{version:1,activeId:null,characters:[],theme:'dark'};if(!db||!Array.isArray(db.characters))throw Error('Invalid backup');}catch(e){db={version:1,activeId:null,characters:[],theme:'dark'};volatile=true;}
if(!db.characters.length){const c=fresh();db.characters.push(c);db.activeId=c.id;}
if(!db.characters.some(c=>c.id===db.activeId))db.activeId=db.characters[0].id;
let screen='sheet',magicFilter='All',diceMode='cast',diceMag='0',diceExtra='normal',diceLast=null,toastTimer,saveTimer,searchTerm='';
let quickDice = {count: 1, sides: 6, modifier: 0, dice: [], total: 0};
let castTrigger;
let libraryTrigger;
let libraryReturn;
let hideUnavailable = false;
let playDamage = {}, playDamagePreset = '', rulesCategory = 'Core moves', rulesSearch = '', pathClassFilter = 'All';
const spellCategories = ['Defense', 'Mobility', 'Control', 'Attack', 'Utility', 'Other'];
const diceSides = [3, 4, 6, 8, 10, 12, 20];
const currentCharacter=()=>db.characters.find(c=>c.id===db.activeId)||db.characters[0];
const ages = [
  {id: 'prodigy', name: 'The Prodigy', years: '14–15', style: 'Wind Dancer', stat: 'DEX', schools: ['Illusion', 'Evocation', 'Divination']},
  {id: 'noble', name: 'The Noble', years: '25–30', style: 'Grand Illusionist', stat: 'CHA', schools: ['Illusion', 'Enchantment', 'Evocation']},
  {id: 'sage', name: 'The Sage', years: '60–70', style: 'Immovable Archmage', stat: 'WIS', schools: ['Illusion', 'Divination', 'Abjuration']},
];
const ageFields = ['name', 'stats', 'origins', 'prepared', 'paths', 'moves', 'conditions', 'permanentConditions', 'forgotten', 'notes', 'backstory', 'sessionNotes', 'advancements', 'advancementNotes'];
const activeAge = () => ages.find(age => age.id === db.age) || ages[0];
function characterName(c) {
  if (!c.alwyn) return c.name || 'Unnamed Wizard';
  const name = c.alwyn.name || 'Alwyn';
  return c.name?.endsWith(' (device copy)') ? name + ' (device copy)' : name;
}

function current() {
  const root = currentCharacter();
  const form = root.alwyn?.forms?.[activeAge().id];
  if (!form) return root;

  // Route shared sheet actions through the same character record used by saves and exports.
  const stats = new Proxy(form.stats, {
    get: (local, key) => (key === 'INT' ? root.stats : local)[key],
    set(local, key, value) {
      (key === 'INT' ? root.stats : local)[key] = value;
      return true;
    },
  });
  return new Proxy(root, {
    get: (character, key) => key === 'stats' ? stats : (ageFields.includes(key) ? form : character)[key],
    set(character, key, value) {
      (ageFields.includes(key) ? form : character)[key] = value;
      return true;
    },
  });
}

if (currentCharacter().alwyn) screen = 'alwyn';
const pageTitles={alwyn:'Alwyn overview',sheet:'Character sheet',magic:'Spellbook',paths:'Paths & growth',play:'Play tools',notes:'Campaign journal',equipment:'Equipment & inventory',rules:'Rules & reference',characters:'Character library',saves:'App & saves'};
function driveCharacters() {
  return db.characters.map(({updatedAt, ...character}) => character);
}

function isBlankCharacter() {
  function compare(character) {
    const {id, createdAt, updatedAt, spells, ...fields} = character;
    return JSON.stringify({...fields, spells: spells.map(({id, ...spell}) => spell)});
  }
  return db.characters.length === 1 && compare(db.characters[0]) === compare(migrateCharacter(fresh()));
}

function persist() {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(db));
    volatile = false;
  } catch {
    volatile = true;
    toast('Browser storage unavailable or full. Export a JSON backup.');
  }
  showSaveStatus();
}

function showSaveStatus() {
  updateStatus(volatile ? 'Local save failed' : db.drive ? driveSync?.headline() || 'Saved locally' : 'Saved locally');
  const message = document.getElementById('drive-status');
  const button = document.getElementById('drive-button');
  const disconnect = document.getElementById('drive-disconnect');
  if (message) message.textContent = driveSync.status();
  if (button) {
    button.textContent = driveSync.button();
    button.disabled = driveSync.disabled();
  }
  if (disconnect) {
    disconnect.parentElement.hidden = !db.drive;
    disconnect.disabled = driveSync.disabled();
  }
}

const driveSync = window.createArcanumDriveSync?.({
  characters: driveCharacters,
  isBlank: isBlankCharacter,
  canApply: () => !document.activeElement?.matches('input, textarea, select, [contenteditable]')
    && document.getElementById('modal-scrim').classList.contains('hidden'),
  link: () => db.drive,
  setLink(link) {
    db.drive = link;
    persist();
  },
  apply(characters, link) {
    const wasGrouped = Boolean(currentCharacter().alwyn);
    db.characters = characters.map(migrateCharacter);
    db.drive = link;
    if (!characters.some(character => character.id === db.activeId)) db.activeId = characters[0].id;
    if (!wasGrouped && currentCharacter().alwyn) screen = 'alwyn';
    render();
    persist();
  },
  newId: uid,
  showStatus: showSaveStatus,
});

const save=()=>{clearTimeout(saveTimer);saveTimer=null;current().updatedAt=Date.now();persist();driveSync?.queue();};
const scheduleSave=()=>{updateStatus('Saving…');clearTimeout(saveTimer);saveTimer=setTimeout(save,360)};
function updateStatus(t){const e=document.getElementById('save-status');if(e)e.textContent=t;}
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3500)}
const equipmentBonus = (c, stat) => c.inventory.reduce((total, item) => total + (item.equipped ? item.bonuses?.[stat] || 0 : 0), 0);
const effectiveStat = (c, stat) => (Number(c.stats[stat]) || 0) + equipmentBonus(c, stat);
const maxHp=c=>Math.max(1,(CLASS_RULES[c.className || 'Wizard']?.hp || 6)+Math.min(10,Math.max(0,(Number(c.level)||1)-1))+(Number(c.hpBonus)||0)+equipmentBonus(c,'hp'));
const armor=c=>Math.max(0,(Number(c.armorBonus)||0)+equipmentBonus(c,'armor'));
const hasPath=(c,id)=>c.paths.includes(id);
const bonusSchools=c=>PATHS.filter(p=>hasPath(c,p.id)).map(p=>p.school);
const allPrepared=c=>[...new Set([...c.prepared,...bonusSchools(c)])].filter(id=>!c.forgotten.includes(id));
const availableVerbs=c=>[...new Set(SCHOOLS.filter(s=>allPrepared(c).includes(s.id)).flatMap(s=>[...s.verbs,...((c.className || 'Wizard') === 'Wizard' ? PATHS.find(p=>p.school===s.id&&hasPath(c,p.id))?.extra||[] : [])]))];
const availableSubs=c=>SCHOOLS.filter(s=>allPrepared(c).includes(s.id)).map(s=>s.sub);
const conditionStat=c=>Object.fromEntries(CONDITIONS.map(x=>[x.stat,c.conditions[x.name]!== 'clear']));
const conditionCount=c=>Object.values(c.conditions).filter(v=>v==='marked'||v==='locked').length;
const fmtSign=n=>n>0?'+'+n:String(n);
function renderNav() {
  const button = (entry, mobile = false) => `<button class="${mobile ? 'mobile-tab' : 'nav-item'} ${screen === entry.id ? 'active' : ''}" data-action="nav" data-screen="${entry.id}" aria-current="${screen === entry.id ? 'page' : 'false'}">${ico(entry.icon)}<span>${entry.label}</span></button>`;
  document.getElementById('nav-desktop').innerHTML = NAV.map(entry => button(entry)).join('');
  document.getElementById('nav-mobile').innerHTML = NAV.slice(0,4).map(entry => button(entry,true)).join('') + `<button class="mobile-tab ${NAV.slice(4).some(entry => entry.id === screen) ? 'active' : ''}" data-action="more-nav" aria-haspopup="dialog">${ico('layers')}<span>More</span></button>`;
}
function render() {
  const root = currentCharacter();
  if (screen === 'alwyn' && !root.alwyn) screen = 'sheet';
  document.documentElement.dataset.theme = db.theme === 'light' ? 'light' : 'dark';
  document.getElementById('page-title').textContent = pageTitles[screen];
  document.getElementById('page-eyebrow').textContent = (
    root.alwyn && screen !== 'alwyn' ? characterName(root) + ' · ' + activeAge().name : characterName(root)
  ).toUpperCase();
  renderNav();
  const target = document.getElementById('screen');
  target.dataset.age = root.alwyn && screen !== 'alwyn' ? activeAge().id : '';
  const pages = {alwyn: renderAlwyn, sheet: renderSheet, magic: renderMagic, paths: renderClassPaths, play: renderPlay, notes: renderNotes, equipment:renderEquipment, rules:renderRules, characters:renderCharacterLibrary, saves:renderSaves};
  target.innerHTML = (root.alwyn ? renderAgeNav() : '') + pages[screen]();
}
const pagehead=(title,desc,actions='')=>`<div class="pagehead"><div><div class="eyebrow">DW2 BETA V3 · ${esc(current().className || 'Wizard')}</div><h1>${title}</h1><p>${desc}</p></div>${actions}</div>`;
const field=(label,path,v,placeholder='',type='text')=>`<label class="input-wrap"><span class="field-label">${label}</span><input class="input" data-bind="${path}" type="${type}" placeholder="${esc(placeholder)}" value="${esc(v)}" ${type==='number'?'step="1"':''}/></label>`;
const select=(label,path,val,options)=>`<label class="input-wrap"><span class="field-label">${label}</span><select data-bind="${path}">${options.map(o=>{const value=typeof o==='object'?o.id:o,label=typeof o==='object'?o.name:o;return `<option value="${esc(value)}" ${val===value?'selected':''}>${esc(label)}</option>`}).join('')}</select></label>`;
const pill=(label,type='')=>`<span class="pill ${type}">${esc(label)}</span>`;
const infoCard=(title,body)=>`<section class="card"><div class="card-title"><h2>${title}</h2></div>${body}</section>`;

function renderAgeNav() {
  return `<nav class="age-nav" aria-label="Alwyn's ages">
    <button class="age-tab" data-action="alwyn-overview" aria-pressed="${screen === 'alwyn'}">
      <strong>Alwyn</strong><span>Overview</span>
    </button>
    ${ages.map(age => `<button class="age-tab" data-action="alwyn-age" data-age="${age.id}"
      aria-pressed="${screen !== 'alwyn' && activeAge().id === age.id}">
      <strong>${age.name}</strong><span>Age ${age.years}</span>
    </button>`).join('')}
  </nav>`;
}

function renderAlwyn() {
  const root = currentCharacter();
  const {alwyn} = root;
  return pagehead(esc(characterName(root)), 'The Fractured Archmage',
    `<div class="flex-row overview-actions"><button class="btn" data-action="nav" data-screen="notes">${ico('book')} Campaign journal</button>
      <button class="btn" data-action="alwyn-edit">${ico('edit')} Edit profile</button></div>`)
    + `<section class="card age-overview">
      ${alwyn.overview ? `<p class="age-summary">${esc(alwyn.overview)}</p>` : ''}
      <dl class="age-resources" aria-label="Shared resources">
        <div><dt>Level</dt><dd>${esc(root.level)}</dd></div>
        <div><dt>HP</dt><dd>${esc(root.hp)} / ${maxHp(root)}</dd></div>
        <div><dt>XP</dt><dd>${esc(root.xp)} / 5</dd></div>
        <div><dt>${esc(activeAge().name)} Conditions</dt><dd>${conditionCount(current()) || 'Clear'}</dd></div>
      </dl>
    </section>
    ${morningRollCard(alwyn.morningRoll)}
    <section aria-labelledby="ages-title">
      <div class="age-section-head"><h2 id="ages-title">The three ages</h2></div>
      <div class="age-grid">${ages.map(age => {
        const sheet = alwyn.forms[age.id] || root;
        const portrait = sheet.origins.portrait;
        return `<article class="card age-preview" data-age="${age.id}">
          <div class="age-preview-head">
            ${portrait ? `<img src="${esc(portrait)}" alt="" loading="lazy">` : ''}
            <div><p class="micro muted">Age ${age.years}</p><h3>${age.name}</h3><p class="small">${age.style}</p></div>
          </div>
          ${alwyn.personality[age.id] ? `<p class="age-personality">${esc(alwyn.personality[age.id])}</p>` : ''}
          <p class="small muted">${conditionCount(sheet)} active Conditions</p><p class="small muted">${sheet.prepared.length ? esc(sheet.prepared.join(' · ')) : 'No prepared schools'}</p>
          <button class="btn age-open" data-action="alwyn-age" data-age="${age.id}">Open ${age.name.toLowerCase()} sheet</button>
        </article>`;
      }).join('')}</div>
    </section>
    ${infoCard('Character backstory', `<div class="age-backstories">${ages.map(age => {
      const story = (alwyn.forms[age.id] || root).backstory;
      const entries = storyFields.filter(([key]) => story?.[key]);
      return `<details class="reference-entry"><summary><strong>${age.name}</strong></summary>
        ${entries.length ? entries.map(([key, label]) => `<h3>${label}</h3><p class="age-summary">${esc(story[key])}</p>`).join('') : '<p class="muted">No backstory recorded.</p>'}
      </details>`;
    }).join('')}</div>`)}
    <div class="flex-row overview-actions"><button class="btn" data-action="nav" data-screen="equipment">Equipment</button><button class="btn" data-action="nav" data-screen="notes">Campaign journal</button></div>`;
}

function morningRollCard(value) {
  const age = ages[value - 1];
  return `<div class="morning-roll">${infoCard('Morning age roll', `
    <div class="block-stack">
      <p class="small muted">${ages.map((entry, i) => `${i + 1} · ${entry.name}`).join(' &nbsp; / &nbsp; ')}</p>
      <div class="flex-row morning-actions">
        <button class="btn primary" data-action="morning-roll">${ico('dice')} ${age ? 'Roll again (d3)' : 'Roll morning d3'}</button>
        <div class="morning-result" role="status">${age ? `<strong>${value} · ${age.name}</strong>` : ''}</div>
        ${age ? `<button class="btn" data-action="alwyn-age" data-age="${age.id}">Play as ${age.name.toLowerCase()}</button>` : ''}
      </div>
    </div>`)}</div>`;
}

function ageRoleplay() {
  const {alwyn} = currentCharacter();
  if (!alwyn) return '';
  const age = activeAge();
  return infoCard(`${age.name} · Roleplay`, `<div class="block-stack">
    <p class="small muted">${age.style} · Age ${age.years}</p>
    ${alwyn.personality[age.id] ? `<p class="age-summary">${esc(alwyn.personality[age.id])}</p>` : ''}
    <div><button class="btn" data-action="alwyn-edit">Edit profile</button></div>
  </div>`);
}

function alwynModal() {
  const root = currentCharacter();
  const profile = root.alwyn;
  const choices = db.characters.filter(entry => entry.id !== root.id && !entry.alwyn);
  const options = choices.map(entry => `<option value="${esc(entry.id)}">${esc(characterName(entry))}</option>`).join('');
  modal(profile ? 'Edit Alwyn’s profile' : 'Set up Alwyn’s three ages', `<form id="alwyn-form">
    <div class="block-stack">
      ${!profile ? `<p class="para small">This sheet becomes the Prodigy. Use an existing sheet for each remaining age or create it. The Prodigy’s progress becomes shared, and carried items from selected sheets come with you.</p>
        ${options ? `<div class="field-grid">${ages.slice(1).map(age => `<label><span class="field-label">${age.name} sheet</span>
          <select name="sheet-${age.id}"><option value="">Create an age sheet</option>${options}</select></label>`).join('')}</div>` : ''}` : ''}
      <label><span class="field-label">Alwyn overview</span><textarea name="overview" maxlength="3500" placeholder="What connects Alwyn’s three ages?">${esc(profile?.overview || '')}</textarea></label>
      ${ages.map(age => `<label><span class="field-label">${age.name} · Personality &amp; memories</span>
        <textarea name="${age.id}" maxlength="3500" placeholder="How does Alwyn act, fight, and remember his past at this age?">${esc(profile?.personality[age.id] || '')}</textarea></label>`).join('')}
      ${profile ? ages.map(age => `<details class="reference-entry"><summary><strong>${age.name} backstory</strong></summary>
        <div class="block-stack backstory-fields">${backstoryFields(profile.forms[age.id] || root, age.id)}</div></details>`).join('') : ''}
    </div>
    <div class="modal-actions"><button type="button" class="btn" data-action="close-modal">Cancel</button>
      <button type="submit" class="btn primary">${profile ? 'Save profile' : 'Create Alwyn profile'}</button></div>
  </form>`);
}

function copyAgeFields(character) {
  return structuredClone(Object.fromEntries(ageFields.map(key => [key, character[key]])));
}

function newAgeSheet(root, age) {
  const form = fresh('Alwyn · ' + age.name);
  form.stats = {STR: -1, DEX: 0, INT: root.stats.INT, WIS: 0, CHA: 0, [age.stat]: 1};
  form.origins = {...root.origins, look: '', portrait: ''};
  form.prepared = age.schools.slice();
  form.paths = [];
  form.spells = [];
  return form;
}

function createAlwyn(root, selection) {
  const forms = {};
  const mergedIds = new Set();
  for (const age of ages.slice(1)) {
    const id = selection.get('sheet-' + age.id);
    const source = db.characters.find(entry => entry.id === id && entry.id !== root.id && !entry.alwyn);
    if (source && mergedIds.has(source.id)) throw new Error('Choose a different sheet for each age.');
    if (source) mergedIds.add(source.id);
    forms[age.id] = {...copyAgeFields(source || newAgeSheet(root, age)), spells: structuredClone(source?.spells || [])};
  }

  const merged = db.characters.filter(entry => mergedIds.has(entry.id));
  for (const key of ['inventory', 'journalEntries']) {
    const records = new Map((root[key] || []).map(record => [record.id, record]));
    for (const record of merged.flatMap(source => source[key] || [])) {
      const existing = records.get(record.id);
      if (!existing) records.set(record.id, record);
      else if (key === 'inventory' && record.id.startsWith('starter-') && record.name === existing.name) {
        records.set(record.id, {...existing, uses: Math.min(existing.uses, record.uses)});
      }
      else if (JSON.stringify(existing) !== JSON.stringify(record)) {
        const id = uid();
        records.set(id, {...record, id});
      }
    }
    root[key] = [...records.values()];
  }
  const relationships = new Map(root.relationships.map(rel => [JSON.stringify(rel), rel]));
  for (const source of merged) {
    for (const rel of source.relationships) relationships.set(JSON.stringify(rel), rel);
  }
  root.relationships = [...relationships.values()];
  db.characters = db.characters.filter(entry => !mergedIds.has(entry.id));
  return {name: 'Alwyn', forms, overview: '', personality: {}};
}

function saveAlwynProfile(form) {
  const root = currentCharacter();
  const data = new FormData(form);
  try {
    root.alwyn ||= createAlwyn(root, data);
  } catch (error) {
    toast(error.message);
    return;
  }
  migrateCharacter(root);
  root.alwyn.overview = String(data.get('overview') || '').trim().slice(0, 3500);
  root.alwyn.personality = Object.fromEntries(ages.map(age => [age.id, String(data.get(age.id) || '').trim().slice(0, 3500)]));
  for (const age of ages) {
    const sheet = root.alwyn.forms[age.id] || root;
    for (const [key] of storyFields) {
      const name = `story-${age.id}-${key}`;
      if (data.has(name)) {
        sheet.backstory ||= {};
        sheet.backstory[key] = String(data.get(name)).trim();
      }
    }
  }
  if (!db.age) db.age = 'prodigy';
  save();
  closeModal();
  screen = 'alwyn';
  render();
}

const storyFields = [
  ['history', 'Personal history', 'Where did you come from?'],
  ['goals', 'Goals & motivations', 'What do you want, and why?'],
  ['events', 'Defining events', 'What moments shaped you?']
];

function backstoryCard(c) {
  return infoCard('Character backstory', `<div class="block-stack">${backstoryFields(c)}</div>`);
}

function backstoryFields(c, ageId) {
  return storyFields.map(([key, label, prompt]) => {
    const binding = ageId ? `name="story-${ageId}-${key}"` : `data-bind="backstory.${key}"`;
    return `<label><span class="field-label">${label}</span><textarea ${binding} placeholder="${prompt}">${esc(c.backstory?.[key] || '')}</textarea></label>`;
  }).join('');
}

function recordCard(c, key) {
  const inventory = key === 'inventory';
  const sharedJournal = !inventory && Boolean(c.alwyn);
  const rows = (c[key] || []).map(record => {
    const summary = inventory ? [
      record.equipped ? 'Equipped' : 'In bag', `Qty ${record.quantity}`, record.location,
      record.maxUses ? `${record.uses}/${record.maxUses} uses` : '',
    ].filter(Boolean).join(' · ') : record.date;
    const tags = inventory ? [
      record.weapon ? ['Weapon', record.damage].filter(Boolean).join(' · ') : '',
      ...record.keywords, ...Object.entries(record.bonuses).map(([stat, value]) => `${fmtSign(value)} ${itemBonusLabels[stat]}`),
    ].filter(Boolean) : [];
    return `<div class="group-item"><div class="record-content"><strong>${esc(record.name)}</strong>
      <div class="micro muted">${esc(summary)}</div>${tags.length ? `<div class="pillbar inventory-tags">${tags.map(tag => pill(tag)).join('')}</div>` : ''}
      <div class="small record-details">${esc(record.details)}</div></div><div class="record-actions">
      ${inventory && record.maxUses ? `<button class="btn tiny" data-action="inventory-use" data-id="${esc(record.id)}" aria-label="Use ${esc(record.name)}" ${record.uses ? '' : 'disabled'}>Use</button>` : ''}
      <button class="btn tiny" data-action="record-edit" data-key="${key}" data-id="${esc(record.id)}" aria-label="Edit ${esc(record.name)}">Edit</button></div></div>`;
  }).join('');
  const earlier = !inventory && !sharedJournal && c.notes
    ? `<details><summary>Earlier campaign notes</summary><label><span class="field-label">Notes</span><textarea data-bind="notes">${esc(c.notes)}</textarea></label></details>`
    : '';
  const title = inventory ? (c.alwyn ? 'Shared inventory' : 'Inventory') : (sharedJournal ? 'Shared campaign journal' : 'Campaign journal');
  return infoCard(title, `<div class="block-stack">${earlier}
    ${sharedJournal ? '<p class="small muted">One journal for all three ages.</p>' : ''}
    <div class="group-list">${rows || `<div class="empty">${inventory ? 'No carried items yet' : 'No journal entries yet'}</div>`}</div>
    <div><button class="btn" data-action="record-edit" data-key="${key}">${ico('plus')} Add ${inventory ? 'item' : 'entry'}</button></div></div>`);
}

function itemNumberField(label, name, value, min, max) {
  return `<label><span class="field-label">${label}</span><input class="input" type="number" name="${name}" min="${min}" max="${max}" value="${value ?? ''}"></label>`;
}

function itemFields(record) {
  return `<label><span class="field-label">Quantity</span><input class="input" name="quantity" type="number" required min="1" max="999999" step="1" value="${record?.quantity ?? 1}"></label>
    <label><span class="field-label">Location (optional)</span><input class="input" name="location" maxlength="100" placeholder="Backpack, belt, worn" value="${esc(record?.location || '')}"></label>
    <label><span class="field-label">Status</span><select name="equipped">
      ${diceOption('false', Boolean(record?.equipped), 'In bag')}${diceOption('true', Boolean(record?.equipped), 'Equipped')}</select></label>
    <label><span class="field-label">Item type</span><select name="weapon" id="inventory-type">
      ${diceOption('false', Boolean(record?.weapon), 'Item')}${diceOption('true', Boolean(record?.weapon), 'Weapon')}</select></label>
    ${itemNumberField('Uses remaining', 'uses', record?.maxUses ? record.uses : '', 0, 999)}
    ${itemNumberField('Maximum uses', 'maxUses', record?.maxUses || '', 0, 999)}
    <label class="full"><span class="field-label">Keywords</span><input class="input" name="keywords" maxlength="240" placeholder="#precise, #thrown" value="${esc(record?.keywords.join(', ') || '')}"></label>
    <div id="inventory-damage" class="full" ${record?.weapon ? '' : 'hidden'}>${damageDiceControls('damage', record?.damage, 'Has damage dice')}</div>
    <details class="reference-entry full" ${Object.keys(record?.bonuses || {}).length ? 'open' : ''}><summary><strong>Stat bonuses when equipped</strong></summary>
      <div class="field-grid item-fields">${Object.entries(itemBonusLabels).map(([stat, label]) => itemNumberField(label, 'bonus-' + stat, record?.bonuses[stat], -20, 20)).join('')}</div>
    </details>`;
}

function openRecord(key, id) {
  const inventory = key === 'inventory';
  const noun = inventory ? 'item' : 'entry';
  const record = (current()[key] || []).find(entry => entry.id === id);
  modal(`${record ? 'Edit' : 'Add'} ${noun}`, `<form id="character-record-form" data-key="${key}" data-id="${esc(record?.id || '')}">
    <div class="field-grid"><label class="full"><span class="field-label">${inventory ? 'Item name' : 'Entry title'}</span>
    <input class="input" name="name" required maxlength="120" value="${esc(record?.name || '')}"></label>
    ${inventory ? itemFields(record) : `<label><span class="field-label">Session date</span><input class="input" name="date" type="date" value="${esc(record?.date || '')}"></label>`}
    <label class="full"><span class="field-label">${inventory ? 'Notes' : 'Entry'}</span><textarea name="details">${esc(record?.details || '')}</textarea></label></div>
    <div class="modal-actions">${record ? `<button type="button" class="btn danger" data-action="record-delete" data-key="${key}" data-id="${esc(record.id)}">Delete</button>` : ''}
    <button type="button" class="btn" data-action="close-modal">Cancel</button><button type="submit" class="btn primary">Save ${noun}</button></div></form>`);
}

function itemInteger(value, min, max) {
  const number = Number(value);
  return Number.isInteger(number) ? clamp(number, min, max) : 0;
}

function cleanRecord(key, record, id) {
  const name = typeof record?.name === 'string' ? record.name.trim().slice(0, 120) : '';
  if (!name) return null;
  const details = typeof record.details === 'string' ? record.details : '';
  if (key === 'inventory') {
    const location = typeof record.location === 'string' ? record.location.trim().slice(0, 100) : '';
    const equipped = record.equipped === true || record.equipped === 'true';
    const weapon = record.weapon === true || record.weapon === 'true';
    const remaining = itemInteger(record.uses, 0, 999);
    const maxUses = record.maxUses === '' || record.maxUses == null ? remaining : itemInteger(record.maxUses, 0, 999);
    const uses = record.uses === '' || record.uses == null ? maxUses : Math.min(remaining, maxUses);
    const keywords = [...new Set((Array.isArray(record.keywords) ? record.keywords.join(' ') : String(record.keywords ?? ''))
      .split(/[\s,]+/).map(word => word.replace(/^#+/, '').slice(0, 40)).filter(Boolean).map(word => '#' + word))].slice(0, 20);
    const bonuses = Object.fromEntries(Object.keys(itemBonusLabels).map(stat =>
      [stat, itemInteger(record.bonuses?.[stat] ?? record['bonus-' + stat], -20, 20)]).filter(([, value]) => value));
    return {
      id, name, details, location, quantity: itemInteger(record.quantity, 1, 999999) || 1,
      equipped, weapon, maxUses, uses, keywords, bonuses, damage: weapon ? parseDamageFormula(record.damage)?.formula || '' : '',
    };
  }
  const date = typeof record.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(record.date) ? record.date : '';
  return {id, name, details, date};
}

function startingGearRecord(item, used = 0) {
  const uses = item.maxUses ? item.maxUses - itemInteger(used, 0, item.maxUses) : 0;
  return {...item, uses, id: 'starter-' + item.id};
}

function isNeedleItem(record) {
  return /\bacu(?:pu|po)ncture needles\b/i.test(record?.name);
}

function migrateInventory(character) {
  const records = Array.isArray(character.inventory) ? [...character.inventory] : [];
  const version = Number(character.inventoryVersion) || 0;
  const dagger = EQUIPMENT.find(item => item.id === 'dagger');
  const needles = {...dagger, name: 'Small acupuncture needles', keywords: []};
  if (version < 1) {
    const selected = [FOCI.find(item => item.id === character.focus),
      ...EQUIPMENT.filter(item => character.equipment?.includes?.(item.id))].filter(Boolean);
    const alwyn = character.alwyn || /\balwyn\b/i.test(character.name);
    for (const item of selected) {
      // Alwyn's needles replace the legacy dagger slot and inherit its damage dice.
      const template = alwyn && item.id === 'dagger' ? needles : item;
      const starter = startingGearRecord(template, character.used?.[item.id]);
      const index = records.findIndex(record => String(record?.name ?? '').trim().toLowerCase() === starter.name.toLowerCase()
        || (alwyn && item.id === 'dagger' && isNeedleItem(record)));
      if (index < 0) records.push(starter);
      else records[index] = {...starter, ...records[index]};
    }
  }
  if (version < 2 && character.alwyn && !records.some(isNeedleItem)) {
    const index = records.findIndex(record => record?.id === 'starter-dagger');
    if (index < 0) records.push(startingGearRecord(needles));
    else if (records[index].name === dagger.name) records[index] = {...records[index], name: needles.name, keywords: needles.keywords};
    else records.push(startingGearRecord({...needles, id: 'alwyn-needles'}));
  }
  if (version < 2) character.inventoryVersion = 2;
  character.inventory = records.map((record, index) => cleanRecord('inventory', record,
    typeof record?.id === 'string' && record.id ? record.id : 'inventory-' + index)).filter(Boolean);
}

function renderSheet(){const c=current(),mx=maxHp(c),count=conditionCount(c),stats=CONDITIONS.reduce((a,x)=>(a[x.stat]=x.name,a),{});return pagehead(c.alwyn ? activeAge().name : 'Your character',c.alwyn ? esc(characterName(currentCharacter())) + ' · Age ' + activeAge().years : 'Your central character sheet. Changes save automatically on this device.',`<button class="btn hide-mobile" data-action="print">${ico('printer')} Print</button>`)+
`<section class="card hero"><div class="hero-inner"><div class="hero-top"><button class="avatar" data-action="portrait" title="Change character portrait" aria-label="Change character portrait">${c.origins.portrait?`<img src="${esc(c.origins.portrait)}" alt="Character portrait" style="width:100%;height:100%;border-radius:inherit;object-fit:cover"/>`:'✦'}</button><div><h2 class="hero-name">${esc(c.name||'Unnamed Wizard')}</h2><div class="hero-meta">${pill(`Level ${c.level} ${c.className || 'Wizard'}`,'accent')}${c.paths.length?c.paths.map(p=>pill(p,'mint')).join(''):pill('No Path acquired')}${pill(`${armor(c)} Armor`)}</div></div></div><div class="hero-controls">${field('Character name','name',c.name,'Your Wizard')}${field('Pronouns','pronouns',c.pronouns,'they/them')}${field('Player name','player',c.player,'Optional')}</div>${c.level<2&&c.paths.length?'<div class="hero-sub">Rules check: Wizard Paths are normally gained through advancements after level 1.</div>':''}</div></section>`+
`<div class="cols-2" style="margin-top:18px"><div class="block-stack">
${ageRoleplay()}${!c.alwyn ? backstoryCard(c) : ''}${CLASS_RULES[c.className || 'Wizard'] ? infoCard(CLASS_RULES[c.className || 'Wizard'].startingMove || 'Starting move', '<p class="para">' + esc(CLASS_RULES[c.className || 'Wizard'].startingDescription) + '</p>') : ''}
${infoCard('Attributes',`<div class="stats-grid">${attributes.map(stat=>`<div class="stat"><div class="stat-name">${stat}</div><div class="stat-value"><button data-action="stat" data-stat="${stat}" data-delta="-1" aria-label="Decrease ${stat}">−</button><span>${fmtSign(effectiveStat(c, stat))}</span><button data-action="stat" data-stat="${stat}" data-delta="1" aria-label="Increase ${stat}">+</button></div>${equipmentBonus(c, stat) ? `<div class="micro muted">Gear ${fmtSign(equipmentBonus(c, stat))}</div>` : ''}${c.conditions[stats[stat]]!=='clear'?'<div class="stat-penalty">Disadvantage</div>':'<div class="micro subtle">&nbsp;</div>'}</div>`).join('')}</div><div class="footnote" style="margin-top:11px">The level-1 starting spread is +2, +1, 0, 0, −1. Adjust values when you gain stat advancements; allocation is not enforced automatically.</div>`)}
${infoCard('Character background',`<div class="field-grid">${field('Ancestry','origins.ancestry',c.origins.ancestry,'Elf, dwarf, human…')}${field('Community','origins.community',c.origins.community,'Arcane academy…')}${field('Background','origins.background',c.origins.background,'Former occupation…')}<label class="input-wrap full"><span class="field-label">Appearance / look</span><textarea data-bind="origins.look" placeholder="Outfit, eyes, markings, focus, demeanor…">${esc(c.origins.look)}</textarea></label></div>`)}
</div><div class="block-stack">
${infoCard('Hit points & armor',`<div class="meter-row"><div><div class="field-label">Current HP</div><div class="meter-value">${clamp(c.hp,0,mx)} <span>/ ${mx}</span></div></div><div class="hp-ctrl"><button class="step-btn" data-action="hp" data-delta="-1" aria-label="Lose one HP">−</button><button class="step-btn" data-action="hp" data-delta="1" aria-label="Gain one HP">+</button></div></div><div class="progress"><div class="progress-fill" style="width:${clamp(c.hp/mx*100,0,100)}%"></div></div><div class="flex-spread"><span class="micro muted">Armor: <strong style="color:var(--text)">${armor(c)}</strong></span><span class="micro muted">Max HP: ${mx}</span></div><div class="field-grid" style="margin-top:15px">${field('Extra max HP modifier','hpBonus',c.hpBonus,'0','number')}${field('Extra Armor modifier','armorBonus',c.armorBonus,'0','number')}</div><div class="flex-row" style="margin-top:12px"><button class="btn" data-action="heal-full">${ico('heart')} Full heal</button><button class="btn" data-action="make-camp">${ico('refresh')} Make Camp</button></div>`)}
${conditionsPanel(c)}
${infoCard('Experience & level',`<div class="flex-spread"><div><div class="field-label">Level</div><div class="meter-value">${c.level}</div></div><div class="hp-ctrl"><button class="step-btn" data-action="level" data-delta="-1">−</button><button class="step-btn" data-action="level" data-delta="1">+</button></div></div><div class="separator"></div><div class="field-label">XP · Five XP to level up</div><div class="pips">${[1,2,3,4,5].map(i=>`<button class="pip ${c.xp>=i?'filled':''}" data-action="xp" data-value="${i}" aria-label="Set XP to ${i}">${c.xp>=i?'✦':'·'}</button>`).join('')}</div><div class="flex-row" style="margin-top:14px"><button class="btn tiny" data-action="xp-minus">−1 XP</button><button class="btn tiny" data-action="xp-plus">+1 XP</button><div class="spacer"></div>${c.xp>=5?`<button class="btn primary tiny" data-action="level-up">Level up</button>`:''}</div><div class="footnote" style="margin-top:14px">Leveling increases maximum and current HP by 1 (up to +10 from levels), resets XP, and gives one Advancement to choose. Track advancements on Paths.</div>`)}
</div></div>`;
}
function schoolBlock(s,c){const owned=bonusSchools(c).includes(s.id),active=allPrepared(c).includes(s.id),checked=c.prepared.includes(s.id),forgotten=c.forgotten.includes(s.id),availability=owned?'Path bonus':checked?'Prepared':'Not prepared';const ext=PATHS.find(p=>p.school===s.id&&hasPath(c,p.id));return `<div class="group-item"><label class="school-card ${active?'active':''} ${owned?'disabled':''}" style="flex:1"><input hidden type="checkbox" data-school="${s.id}" ${checked||owned?'checked':''} ${owned?'disabled':''}/><div class="school-check">✓</div><div><div class="school-name">${s.id} ${owned?pill('Path bonus','accent'):''}</div><div class="school-desc">Substance: ${esc(s.sub)}</div><div class="school-verbs">Verbs: ${esc([...s.verbs,...(ext?.extra||[])].join(' · '))}</div>${forgotten?'<div class="school-lock">Forgotten until Make Camp</div>':''}</div></label>${forgotten?`<button class="btn tiny" data-action="remember" data-school="${s.id}">Restore</button>`:active?`<button class="btn tiny" data-action="forget" data-school="${s.id}">Forget</button>`:pill(availability)}</div>`}
const workspaceSections = {
  magic: [['spells', 'Spells'], ['schools', 'Schools']],
  play: [['roll', 'Roll'], ['damage', 'Damage'], ['status', 'Status'], ['rules', 'Rules']],
};
const selectedSection = {magic: 'spells', play: 'roll'};
const playDamageMoves = ['cast', 'melee', 'ranged'];

function workspaceNav(page) {
  return `<div class="workspace-start mobile-workspace" data-workspace-start></div>
  <nav class="workspace-nav mobile-workspace" aria-label="${pageTitles[page]} sections" data-workspace-nav>
    ${workspaceSections[page].map(([id, label]) => `<button type="button" data-action="workspace-section"
      data-section="${id}" aria-pressed="${selectedSection[page] === id}">${label}</button>`).join('')}
  </nav>`;
}

function workspacePanel(page, id, content) {
  const inactive = selectedSection[page] === id ? '' : ' workspace-inactive';
  return `<div class="block-stack workspace-panel${inactive}">${content}</div>`;
}

function selectWorkspaceSection(id, trigger) {
  if (!workspaceSections[screen]?.some(([section]) => section === id) || selectedSection[screen] === id) return;
  const nav = document.querySelector('[data-workspace-nav]');
  const wasPinned = nav && nav.getBoundingClientRect().top <= (document.querySelector('.topbar')?.getBoundingClientRect().bottom ?? 0);
  selectedSection[screen] = id;
  render();
  const nextNav = document.querySelector('[data-workspace-nav]');
  if (wasPinned || (trigger && !trigger.matches('[data-workspace-nav] button'))) {
    document.querySelector('[data-workspace-start]')?.scrollIntoView({block: 'start', behavior: 'instant'});
  }
  if (trigger) nextNav?.querySelector('[aria-pressed="true"]')?.focus({preventScroll: true});
}

function swipeSection(page, section, {dx, dy, elapsed, scrollDelta}) {
  if (Math.abs(dx) < 72 || Math.abs(dy) > 36 || Math.abs(dx) < 2 * Math.abs(dy)
      || Math.abs(scrollDelta) > 12 || elapsed > 850) return;
  const sections = workspaceSections[page];
  const index = sections.findIndex(([id]) => id === section);
  if (index >= 0) return sections[index + (dx < 0 ? 1 : -1)]?.[0];
}

let workspaceTouch;
document.addEventListener('touchstart', event => {
  workspaceTouch = undefined;
  if (event.touches.length !== 1 || !workspaceSections[screen] || !window.matchMedia('(max-width: 720px)').matches
      || !event.target.closest('.magic-layout, .play-layout, [data-workspace-nav]')
      || event.target.closest('input, select, textarea, [contenteditable]')) return;
  const touch = event.touches[0];
  if (touch.clientX < 24 || touch.clientX > window.innerWidth - 24) return;
  workspaceTouch = {page: screen, section: selectedSection[screen], id: touch.identifier,
    x: touch.clientX, y: touch.clientY, scrollY: window.scrollY, time: event.timeStamp};
}, {passive: true});
document.addEventListener('touchcancel', () => { workspaceTouch = undefined; }, {passive: true});
document.addEventListener('touchend', event => {
  const start = workspaceTouch;
  workspaceTouch = undefined;
  if (!start || event.touches.length || start.page !== screen || start.section !== selectedSection[screen]) return;
  const end = Array.from(event.changedTouches).find(touch => touch.identifier === start.id);
  if (!end) return;
  const next = swipeSection(screen, start.section, {dx: end.clientX - start.x, dy: end.clientY - start.y,
    elapsed: event.timeStamp - start.time, scrollDelta: window.scrollY - start.scrollY});
  if (!next) return;
  if (event.cancelable) event.preventDefault();
  selectWorkspaceSection(next);
}, {passive: false});

function renderMagic(){const c=current();return `<div class="workspace-intro">` + pagehead('Shape the impossible','Create custom spells from prepared-school verbs and substances. Your concepts save to your spellbook.',`<button class="btn primary" data-action="spell-new">${ico('plus')} New spell</button>`) + `</div>` + workspaceNav('magic') + `<div class="cols-2 magic-layout">${workspacePanel('magic', 'schools', `${infoCard('Prepared schools',`<div class="flex-spread" style="margin-bottom:13px"><span class="small muted">Choose up to 3 standard schools. Your owned Paths add bonus prepared schools.</span>${pill(`${c.prepared.length}/3 normal`,'accent')}</div><div class="group-list">${SCHOOLS.map(s=>schoolBlock(s,c)).join('')}</div><div class="flex-row" style="margin-top:13px"><button class="btn tiny" data-action="make-camp">${ico('refresh')} Make Camp</button><span class="micro muted">Changing schools normally happens when you Make Camp.</span></div>`)}
${infoCard('Available combinations',`<div class="cols-3" style="grid-template-columns:repeat(3,1fr);gap:9px"><div class="stat" style="padding:13px 4px"><div class="stat-name">Verbs</div><div class="stat-value">${availableVerbs(c).length}</div></div><div class="stat" style="padding:13px 4px"><div class="stat-name">Substances</div><div class="stat-value">${availableSubs(c).length}</div></div><div class="stat" style="padding:13px 4px"><div class="stat-name">Pairings</div><div class="stat-value">${availableVerbs(c).length*availableSubs(c).length}</div></div></div><div class="separator"></div><p class="small muted">All pairings are concepts, not automatically permitted spells. The GM approves feasibility, range, duration, and Magnitude.</p><button class="btn btn-wide" data-action="spell-new">${ico('sparkles')} Open spell builder</button>`)}
`)}${workspacePanel('magic', 'spells', `<section class="card spellbook-panel">
  <div class="card-title spellbook-header"><h2>Spellbook</h2>
    <button class="btn tiny workspace-desktop" data-action="spell-library" aria-haspopup="dialog">Expand spellbook</button>
    <button class="btn primary mobile-workspace" data-action="spell-new">${ico('plus')} New spell</button></div>
  <div class="spellbook-scroll" tabindex="0" role="region" aria-label="Saved spells">${renderSpellList(c)}</div>
</section>`)}</div>`;}
function renderPaths(){const c=current();return pagehead('Path of the arcane','Acquire Paths, unlock verbs, and track individual Path Moves as you level up.')+`<div class="cols-2"><div class="block-stack">${infoCard('Your advancement plan',`<div class="flex-spread"><div><div class="field-label">Current level</div><div class="meter-value">${c.level}</div></div>${pill(`${c.paths.length} Paths owned`,'accent')}</div><div class="separator"></div><p class="small muted">Gaining a Path grants only its Starting Move. Other Path Moves require separate advancements. Your first Path is normally gained by leveling up from level 1.</p><label class="field-label" for="advances">Advancement history / choices</label><textarea id="advances" data-bind="advancementNotes" placeholder="Level 2 — Illusionist Path\nLevel 3 — Mirror Image…">${esc(c.advancementNotes||'')}</textarea>`)}
${infoCard('Spellcasting rules',`<p class="small muted">Prepare 3 schools. An owned Path’s school can be prepared in addition to the normal three. Cast a Spell uses +INT and the GM sets the spell’s Magnitude.</p><div class="group-list"><div class="group-item"><span>MAG below INT</span>${pill('Normal roll','mint')}</div><div class="group-item"><span>MAG equal to INT</span>${pill('Disadvantage','amber')}</div><div class="group-item"><span>MAG above INT</span>${pill('Too powerful','danger')}</div></div><div class="separator"></div><p class="footnote">For a 7–9, your Wizard may mark a Condition, accept a GM twist, or forget a prepared school until Make Camp. Casting requires your focus, both hands otherwise free, and the ability to speak aloud.</p>`)}
</div><div class="block-stack">${PATHS.map(p=>`<section class="path-panel"><div class="path-panel-head"><div><h3>${p.id}</h3><div class="small muted">${esc(p.tag)}</div></div><button class="btn ${hasPath(c,p.id)?'primary':''}" data-action="path" data-path="${p.id}">${hasPath(c,p.id)?ico('check')+' Acquired':'Acquire'}</button></div><div class="separator"></div><div class="pillbar">${pill(p.school,'accent')}${p.extra.map(s=>pill(s)).join('')}</div><p class="small muted" style="margin-top:12px"><strong style="color:var(--text)">${esc(p.starting)}:</strong> ${esc(p.startingDesc)}</p><div style="margin-top:17px"><div class="field-label">Path Moves — gained separately</div>${p.moves.map(m=>`<div class="path-move"><div class="path-move-head"><strong>${esc(m.id)}</strong><button class="btn tiny ${c.moves.includes(m.id)?'primary':''}" data-action="move" data-move="${esc(m.id)}" data-path="${p.id}" ${!hasPath(c,p.id)?'disabled':''}>${c.moves.includes(m.id)?'Learned':'Learn'}</button></div><p>${esc(m.desc)}</p></div>`).join('')}</div></section>`).join('')}</div></div>`;}
const playRollTypes = [
  ...attributes.map(stat => ({id: stat.toLowerCase(), name: stat, stat})),
  {id: 'cast', name: 'Cast a Spell'},
  {id: 'melee', name: 'Trade Blows (STR)', stat: 'STR'},
  {id: 'ranged', name: 'Trade Blows (DEX)', stat: 'DEX'},
];

function playRollCard() {
  const {stat, modifier, condition, atLimit, tooHigh} = playRollSpec();
  const penalties = [condition?.name, atLimit ? 'MAG equals ' + stat : ''].filter(Boolean);
  const formula = `2d6 + ${stat} (${fmtSign(modifier)})`;
  return `<section class="card play-roll-card">
    <div class="card-title"><h2>Dice roller</h2></div>
    <div class="play-roll-fields">
      ${select('Roll type', '__diceMode', diceMode, playRollTypes)}
      <div class="field-grid">
        ${diceMode === 'cast' ? magnitudeSelect('id="dice-mag"', diceMag, '?') : ''}
        ${rollModifierSelect('id="dice-extra"', diceExtra)}
      </div>
    </div>
    ${penalties.length ? `<p class="micro muted play-roll-penalty">${esc(penalties.join(' · '))} — disadvantage</p>` : ''}
    <div class="dice-area play-roll-result" aria-live="polite">
      ${diceLast ? rollResult(diceLast, false) : `<div class="dice-minor">${formula}</div>`}
    </div>
    <div class="play-roll-actions">
      <button class="btn primary" data-action="roll" ${tooHigh ? 'disabled' : ''}>${ico('dice')} Roll dice</button>
      ${playDamageMoves.includes(diceMode) ? `<button class="btn mobile-workspace" data-action="workspace-section" data-section="damage">${ico('dice')} Roll damage</button>` : ''}
    </div>
    ${tooHigh ? `<p class="micro muted play-roll-penalty">MAG exceeds ${stat}. Use a ritual.</p>` : ''}
  </section>`;
}

function renderPlay() {
  const c = current();
  return `<div class="workspace-intro">${pagehead('At the table','Combat, checks, and session upkeep.')}</div>`
    + workspaceNav('play') + `<div class="cols-2 play-layout"><div class="block-stack play-column">
${workspacePanel('play', 'roll', playRollCard())}
${workspacePanel('play', 'damage', playDamageCard(c))}
${workspacePanel('play', 'rules', infoCard('Move reference',`<div class="group-list"><div class="group-item" style="display:block"><strong>Cast a Spell +INT</strong><div class="small muted">10+: effect works · 7–9: effect works with Condition, GM twist or forget a school · 6−: trouble +1 XP.</div></div><div class="group-item" style="display:block"><strong>Trade Blows +STR/+DEX</strong><div class="small muted">Typically exchange damage. On 10+ gain a benefit; on 7–9 accept complication; on 6− choose minimum dealt or maximum suffered.</div></div><div class="group-item" style="display:block"><strong>Defy Danger +appropriate stat</strong><div class="small muted">10+: overcome obstacle · 7–9: succeed with drawback · 6−: things go wrong.</div></div><div class="group-item" style="display:block"><strong>Mirror Image · Illusionist Move</strong><div class="small muted">If learned, mark a Condition when taking damage to prevent all of it and reveal a #near position.</div></div></div>`))}
</div><div class="block-stack play-column">${workspacePanel('play', 'status', infoCard('Quick combat tracker', hitPointControls(c) + `<button class="btn btn-wide" style="margin-top:15px" data-action="make-camp">${ico('refresh')} Make Camp</button>`) + conditionsPanel(c))}
${workspacePanel('play', 'rules', infoCard('Spellcasting checklist',`<div class="group-list"><div class="group-item">${ico('check-circle')} Arcane focus available</div><div class="group-item">${ico('check-circle')} Both hands otherwise free</div><div class="group-item">${ico('check-circle')} Able to speak aloud</div><div class="group-item">${ico('check-circle')} Verb + substance from currently available schools</div></div><p class="footnote" style="margin-top:14px">For your mobility/illusion build, remember that ranged spell attacks use Cast a Spell +INT, while a physical bow uses Trade Blows +DEX.</p>`))}
</div></div>`;}
// Alwyn's shared library and independent age state, migrated once from earlier saves.
function migrateCharacter(character) {
  migrateInventory(character);
  character.className = CLASS_RULES[character.className] ? character.className : 'Wizard';
  character.permanentConditions = validPermanent(character.permanentConditions);
  if (character.alwyn && character.alwyn.schemaVersion !== 2) {
    const spells = [], seen = new Set(), ids = new Set();
    for (const sheet of [character, ...Object.values(character.alwyn.forms || {})]) {
      for (const spell of sheet.spells || []) {
        const fingerprint = JSON.stringify(Object.fromEntries(Object.entries(spell).filter(([key]) => !['id', 'example'].includes(key)).sort(([a], [b]) => a.localeCompare(b))));
        if (seen.has(fingerprint)) continue;
        seen.add(fingerprint);
        const entry = structuredClone(spell);
        if (!entry.id || ids.has(entry.id)) entry.id = uid();
        ids.add(entry.id);
        spells.push(entry);
      }
      sheet.conditions = {...character.conditions, ...sheet.conditions};
      sheet.permanentConditions = validPermanent(sheet.permanentConditions);
      sheet.forgotten = Array.isArray(sheet.forgotten) ? sheet.forgotten : [...(character.forgotten || [])];
    }
    character.spells = spells;
    for (const form of Object.values(character.alwyn.forms || {})) delete form.spells;
    character.alwyn.schemaVersion = 2;
  }
  for (const sheet of [character, ...Object.values(character.alwyn?.forms || {})]) {
    sheet.conditions = Object.fromEntries(CONDITIONS.map(({name}) => [name, ['clear', 'marked', 'locked'].includes(sheet.conditions?.[name]) ? sheet.conditions[name] : 'clear']));
    sheet.permanentConditions = validPermanent(sheet.permanentConditions);
    for (const name of sheet.permanentConditions) sheet.conditions[name] = 'locked';
  }
  return character;
}

function validPermanent(value) {
  return [...new Set(Array.isArray(value) ? value.filter(name => CONDITIONS.some(condition => condition.name === name)) : [])];
}

function hitPointControls(c) {
  return `<div class="meter-row">
    <div><div class="field-label">Current HP</div><div class="meter-value" aria-live="polite">${c.hp}<span> / ${maxHp(c)}</span></div></div>
    <div class="hp-ctrl">
      <button class="step-btn" data-action="hp" data-delta="-1" aria-label="Lose one HP">−</button>
      <button class="step-btn" data-action="hp" data-delta="1" aria-label="Gain one HP">+</button>
      <button class="btn" data-action="heal-full">Full heal</button>
    </div>
  </div>`;
}

function quickStatusContent() {
  const c = current();
  return `<div class="block-stack quick-status">
    ${c.alwyn ? `<div class="small muted">${esc(activeAge().name)}</div>` : ''}
    ${hitPointControls(c)}
    ${conditionsPanel(c, true)}
  </div>`;
}

function updateCombatStatus(trigger) {
  save();
  render();
  if (document.getElementById('modal').dataset.view !== 'quick-status') return;
  document.getElementById('modal-content').innerHTML = quickStatusContent();
  const {action, delta, condition, state} = trigger.dataset;
  const buttons = document.querySelectorAll('#modal-content button[data-action]');
  Array.from(buttons).find(button => button.dataset.action === action && button.dataset.delta === delta
    && button.dataset.condition === condition && button.dataset.state === state)?.focus({preventScroll: true});
}

function conditionsPanel(c, quick = false) {
  return infoCard('Conditions', `${quick ? '' : `<p class="small muted">${c.alwyn ? esc(activeAge().name) + ' only. ' : ''}Marked, locked, and permanent Conditions impose disadvantage on their associated stat.</p>`}
    <div class="condition-list">${CONDITIONS.map(condition => {
      const fixed = c.permanentConditions?.includes(condition.name);
      return `<div class="condition ${c.conditions[condition.name]}"><div class="condition-top"><strong>${condition.name}</strong>${pill(fixed ? 'Permanent' : condition.stat, fixed ? 'danger' : '')}</div>
        ${quick ? '' : `<p class="condition-sub">${condition.desc}</p>`}${quick && fixed ? '' : `<div class="condition-actions">${['clear', 'marked', 'locked'].map(state =>
          `<button class="choice-btn ${c.conditions[condition.name] === state ? 'selected' : ''}" data-action="condition" data-condition="${condition.name}" data-state="${state}" aria-pressed="${c.conditions[condition.name] === state}" aria-label="${state === 'clear' ? 'Clear' : state === 'marked' ? 'Mark' : 'Lock'} ${condition.name}" ${fixed ? 'disabled' : ''}>${state === 'clear' ? 'Clear' : state === 'marked' ? 'Mark' : 'Lock'}</button>`).join('')}</div>`}</div>`;
    }).join('')}</div>${quick ? '' : `<div class="flex-row" style="margin-top:14px">${pill(`${conditionCount(c)} / 5 active`)}
      <button class="btn tiny" data-action="permanent-conditions">Permanent conditions</button>
      <button class="btn tiny" data-action="reach-limit" ${conditionCount(c) < 5 ? 'disabled' : ''}>Reach Your Limit</button></div>`}`);
}

function permanentConditionsModal() {
  const c = current();
  modal('Permanent conditions', `<form id="permanent-conditions-form" class="block-stack"><p class="small muted">${c.alwyn ? esc(activeAge().name) + ' only. ' : ''}Choose the Conditions your GM made permanent. They remain active through camp and outbursts. Unchecking makes a Condition removable again.</p>
    ${CONDITIONS.map(({name, stat}) => `<label class="spell-availability"><input type="checkbox" name="${name}" ${c.permanentConditions?.includes(name) ? 'checked' : ''}>${name} (${stat})</label>`).join('')}
    <div class="modal-actions"><button class="btn" type="button" data-action="close-modal">Cancel</button><button class="btn primary">Save conditions</button></div></form>`);
}

function diceOption(value, selected, label = value) {
  return `<option value="${esc(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${esc(label)}</option>`;
}

function numberOptions(first, last, selected, label = value => value) {
  return Array.from({length: last - first + 1}, (_, i) => {
    const value = first + i;
    return diceOption(value, selected, label(value));
  }).join('');
}

function diceRange(first, last, selected, label) {
  const outsideRange = selected < first || selected > last;
  return (outsideRange ? '<option value="" selected disabled>Choose</option>' : '') + numberOptions(first, last, selected, label);
}

function dicePoolControls({count, sides, modifier}, damage = false) {
  const controls = damage
    ? ['data-damage-count', 'data-damage-sides', 'data-damage-modifier']
    : ['name="count"', 'name="sides"', 'name="modifier"'];
  // Display a saved die without offering it as a choice for new rolls.
  const savedSide = damage && !diceSides.includes(sides)
    ? `<option value="${sides}" selected disabled hidden>d${sides} (preset)</option>` : '';
  return `<div class="dice-controls">
    <label><span class="field-label">Dice</span><select ${controls[0]}>${diceRange(1, diceCountMax, count)}</select></label>
    <label><span class="field-label">Sides</span><select ${controls[1]}>
      ${savedSide}${diceSides.map(value => diceOption(value, sides, `d${value}`)).join('')}
    </select></label>
    <label><span class="field-label">Bonus</span><select ${controls[2]}>${diceRange(diceBonusMin, diceBonusMax, modifier, fmtSign)}</select></label>
  </div>`;
}

function magnitudeSelect(attributes, selected, undecided = '') {
  const saved = Number(selected);
  const options = numberOptions(0, 5, selected);
  return `<label><span class="field-label">Spell magnitude</span><select ${attributes}>
    ${diceOption(undecided, selected, 'GM to decide')}${options}
    ${Number.isInteger(saved) && saved > 5 ? diceOption(saved, selected) : ''}
  </select></label>`;
}

function rollModifierSelect(attributes, selected = 'normal') {
  return `<label><span class="field-label">Roll modifier</span><select ${attributes}>
    ${[['normal', 'Normal'], ['advantage', 'Advantage'], ['disadvantage', 'Disadvantage']]
      .map(([value, label]) => diceOption(value, selected, label)).join('')}
  </select></label>`;
}

function damageDiceControls(name, value = '', optional = '') {
  const parsed = parseDamageFormula(value) || {count:1, sides:6, modifier:0};
  return `<fieldset class="dice-builder" data-dice-builder><legend>Damage dice</legend>
    ${optional ? `<label class="spell-availability"><input type="checkbox" data-damage-enabled ${value ? 'checked' : ''}>${optional}</label>` : ''}
    ${dicePoolControls(parsed, true)}
    <input type="hidden" name="${name}" value="${esc(value || (optional ? '' : '1d6'))}"><output class="small muted" data-damage-preview>${esc(value || (optional ? 'No damage selected' : '1d6'))}</output></fieldset>`;
}

function updateDamageDice(input) {
  const builder = input.closest('[data-dice-builder]');
  if (!builder) return;
  const enabled = builder.querySelector('[data-damage-enabled]');
  const count = Number(builder.querySelector('[data-damage-count]').value);
  const sides = Number(builder.querySelector('[data-damage-sides]').value);
  const bonus = builder.querySelector('[data-damage-modifier]').value;
  const modifier = Number(bonus);
  if (enabled && input !== enabled) enabled.checked = true;
  let value = '';
  if (!enabled || enabled.checked) {
    const formula = parseDamageFormula(`${count}d${sides}${modifier ? fmtSign(modifier) : ''}`);
    if (!formula || !bonus) return;
    value = formula.formula;
  }
  builder.querySelector('input[type="hidden"]').value = value;
  builder.querySelector('[data-damage-preview]').textContent = value || 'No damage selected';
  if (input.form?.id === 'play-damage-form') playDamage = {formula:value, mode:input.form.elements.mode.value, result:null};
  const output = document.getElementById(input.form?.id + '-result');
  if (output) output.textContent = '';
}

function spellDamageFormula(spell) {
  return parseDamageFormula(spell.damage)?.formula || parseDamageFormula((`${spell.effect || ''} ${spell.note || ''}`).match(/\b\d{1,2}d\d{1,3}(?:\s*[+-]\s*\d{1,2})?\b/i)?.[0])?.formula || '';
}

function damagePresets(c) {
  return [
    ['Attack spells', c.spells.filter(spell => spellCategory(spell) === 'Attack' && canCastSpell(c, spell)).map(spell => ({
      id: 'spell:' + spell.id, name: spell.name, formula: spellDamageFormula(spell),
    })).filter(preset => preset.formula)],
    ['Equipped weapons', c.inventory.filter(item => item.equipped && item.weapon && item.damage).map(item => ({
      id: 'weapon:' + item.id, name: item.name, formula: item.damage,
    }))],
  ];
}

function playDamageCard(c) {
  const groups = damagePresets(c);
  const preset = groups.flatMap(([, presets]) => presets).find(entry => entry.id === playDamagePreset);
  if (playDamagePreset && !preset) {
    playDamagePreset = '';
    playDamage = {};
  }
  const values = {formula: preset?.formula, ...playDamage};
  return infoCard('Damage roll', `<div class="block-stack">
    <label><span class="field-label">Damage preset</span><select id="play-damage-preset"><option value="">Choose dice manually</option>
      ${groups.filter(([, entries]) => entries.length).map(([label, entries]) => `<optgroup label="${label}">${entries.map(entry =>
        diceOption(entry.id, playDamagePreset, `${entry.name} · ${entry.formula}`)).join('')}</optgroup>`).join('')}
    </select></label>${damageRoller('play-damage-form', values)}</div>`);
}

const referenceTabs = ['All', 'Core moves', 'Classes', 'Paths', 'Equipment', 'Keywords', 'Struggles', 'GM'];
const equipmentFamilies = ['Armor', 'Weapons', 'Gear', 'Starting gear', 'Magic items', 'Artifacts', 'Services'];
let rulesFamily = 'All';

function renderRules() {
  const families = rulesCategory === 'Equipment' ? equipmentFamilies
    : rulesCategory === 'Paths' ? Object.keys(CLASS_RULES) : [];
  const familyLabel = rulesCategory === 'Equipment' ? 'Equipment type' : 'Path class';
  return pagehead('Rules & reference', 'Dungeon World 2 Beta v3 by Helena Real and Spencer Moore.') +
    `<section class="card rules-page">
      <nav class="tabset rules-tabs" aria-label="Reference categories">${referenceTabs.map(category =>
        `<button class="tab ${rulesCategory === category ? 'active' : ''}" aria-pressed="${rulesCategory === category}"
          data-action="rules-category" data-category="${category}">${category}</button>`).join('')}</nav>
      <div class="rules-controls">
        <label class="rules-search"><span class="field-label">Search reference</span><input class="input" type="search" data-rules-search value="${esc(rulesSearch)}" placeholder="Move, Path, item, keyword, or Struggle"></label>
        ${families.length ? `<label><span class="field-label">${familyLabel}</span><select id="rules-family">${opts(['All', ...families], rulesFamily)}</select></label>` : ''}
      </div>
      <div id="rules-results">${rulesResults()}</div>
    </section>`;
}

function rulesResults() {
  const query = rulesSearch.toLowerCase().trim();
  const matches = tableReference.filter(entry =>
    (rulesCategory === 'All' || entry.category === rulesCategory) &&
    (rulesFamily === 'All' || entry.family === rulesFamily) &&
    (!query || [entry.name, entry.group, entry.body, entry.notes, entry.cost].some(value => value?.toLowerCase().includes(query))));
  return `<p class="small muted">${matches.length} matching entries</p><div class="reference-grid">${matches.map(entry =>
    `<button class="reference-entry reference-open" data-action="reference-open" data-id="${esc(entry.id)}" aria-haspopup="dialog">
      <span><strong>${esc(entry.name)}</strong><small class="muted">${esc(entry.ability ? entry.group + ' · ' + entry.ability : entry.group)}</small></span>
      ${ico('chevron')}
    </button>`).join('') || '<div class="empty">No matching rules. Try another term.</div>'}</div>`;
}

function referenceText(body) {
  const isOutcome = /^[✷✶✴🟎]\s*on\s+(?:a\s+)?(\d+\s*(?:\+|[-–]\s*\d+|[-−]))\s*[,.:]?\s*/iu;
  return body.split(/(?=[✷✶✴🟎])|\n\n+/u).filter(part => part.trim()).map(part => {
    const outcome = part.match(isOutcome);
    if (!outcome) return `<p class="record-details">${esc(part.replace(/^[✷✶✴🟎]/u, '').trim())}</p>`;
    const range = outcome[1].replace(/\s/g, '').replace(/[–−]/g, '-');
    const label = {'10+': 'Full success', '7-9': 'Partial success', '6-': 'Miss'}[range];
    const type = {'10+': 'hit', '7-9': 'partial', '6-': 'miss'}[range] || '';
    return `<section class="reference-outcome ${type}"><h3>${esc(range)}${label ? ' · ' + label : ''}</h3>
      <p class="record-details">${esc(part.slice(outcome[0].length).trim())}</p></section>`;
  }).join('');
}

function openReference(id, trigger) {
  const entry = referenceById.get(id);
  if (!entry) return;
  if (trigger && !trigger.closest('#modal')) castTrigger = trigger;
  const chips = entry.item ? [
    entry.cost ? 'Cost ' + entry.cost : '',
    entry.item.uses ? entry.item.uses + (entry.item.uses === 1 ? ' use' : ' uses') : '',
    entry.item.damage ? entry.item.damage + ' damage' : '',
    entry.item.armor ? '+' + entry.item.armor + ' Armor' : '',
    ...entry.item.tags,
  ].filter(Boolean) : [];
  modal(entry.name, `<div class="reference-dialog">
    <p class="small muted">${esc(entry.ability ? entry.group + ' · ' + entry.ability : entry.group)}</p>
    ${chips.length ? `<div class="pillbar">${chips.map(chip => pill(chip)).join('')}</div>` : ''}
    <div class="reference-body">${referenceText(entry.body)}</div>
    ${entry.notes ? `<section class="reference-body reference-notes"><h3>At the table</h3>${referenceText(entry.notes)}</section>` : ''}
    ${entry.links ? `<div class="group-list">${entry.links.map(([target, name]) =>
      `<button class="btn reference-open" data-action="reference-open" data-id="${esc(target)}">${esc(name)}${ico('chevron')}</button>`).join('')}</div>` : ''}
    ${entry.item ? `<button class="btn primary btn-wide" data-action="reference-add-item" data-id="${esc(id)}">${ico('plus')} Add to inventory</button>` : ''}
    ${entry.group === 'Struggle' ? `<button class="btn primary btn-wide" data-action="reference-track-struggle" data-id="${esc(id)}">Track in Campaign journal</button>` : ''}
  </div>`, 'reference');
  document.querySelector('#modal .modal-head button')?.focus();
}

function addReferenceItem(id, button) {
  const entry = referenceById.get(id);
  if (!entry?.item || button.disabled) return;
  const toRecord = source => {
    const {weapon, damage, uses, tags, armor} = source.item;
    return cleanRecord('inventory', {name: source.name, details: source.body.replace(/[✷✶✴🟎]/gu, ''),
      weapon, damage, maxUses: uses, keywords: tags, bonuses: {armor}}, uid());
  };
  const items = [entry, ...(entry.bundle || []).map(id => referenceById.get(id)).filter(source => source?.item)];
  current().inventory.unshift(...items.map(toRecord));
  save();
  button.disabled = true;
  button.textContent = items.length === 1 ? 'Added to inventory' : `Added ${items.length} items to inventory`;
}

function currentStruggle(c) {
  if (c.struggle !== undefined) return c.struggle;
  return /\balwyn\b/i.test(c.alwyn?.name || c.name) && referenceById.has('struggle-amnesia')
    ? {id: 'struggle-amnesia', progress: 0, notes: '', prompts: '', used: false, resolved: false} : null;
}

function journalStruggle(c) {
  const struggle = currentStruggle(c);
  const entry = referenceById.get(struggle?.id);
  if (!entry) return infoCard('Struggle', `<button class="btn" data-action="journal-struggles">Browse Struggles</button>`);
  const amnesia = entry.id === 'struggle-amnesia';
  return infoCard('Struggle · ' + esc(entry.name), `<div class="block-stack">
    ${struggle.resolved ? pill('Resolved', 'mint') : entry.capacity ? pill(`${entry.track} ${struggle.progress} / ${entry.capacity}`, 'accent') : ''}
    ${amnesia && !struggle.resolved ? `<p class="small muted">${struggle.used ? 'Shards used this session.' : 'Shards available this session.'}</p>` : ''}
    <div class="reference-body">${referenceText(entry.body)}</div>
    ${struggle.prompts ? `<div><strong>Answers to the prompts</strong><p class="record-details">${esc(struggle.prompts)}</p></div>` : ''}
    ${struggle.notes ? `<div><strong>${amnesia ? 'Flashbacks & clues' : 'Struggle notes'}</strong><p class="record-details">${esc(struggle.notes)}</p></div>` : ''}
    ${amnesia ? `<p class="small muted">On the fifth Memory, confess a truth and resolve the Struggle. Level Up while keeping marked XP, then lose the Struggle’s benefits and drawbacks and clear its advancement box if marked.</p>` : ''}
    <div class="flex-row"><button class="btn" data-action="edit-struggle">${ico('edit')} Edit tracker</button>
      <button class="btn" data-action="journal-struggles">Browse Struggles</button>
      <button class="btn" data-action="reference-open" data-id="struggle-rules">Reveal & resolve rules</button></div>
  </div>`);
}

function editStruggle(trigger) {
  const struggle = currentStruggle(current());
  const entry = referenceById.get(struggle?.id);
  if (!entry) return;
  const amnesia = entry.id === 'struggle-amnesia';
  castTrigger = trigger;
  modal('Track ' + entry.name, `<form id="struggle-form" class="block-stack">
    ${entry.capacity ? `<label><span class="field-label">${esc(entry.track)}</span>
      <select name="progress">${numberOptions(0, entry.capacity, struggle.progress)}</select></label>` : ''}
    ${amnesia ? `<label class="spell-availability"><input type="checkbox" name="used"${struggle.used ? ' checked' : ''}>Shards used this session</label>` : ''}
    <label><span class="field-label">Answers to the prompts</span><textarea name="prompts" maxlength="12000">${esc(struggle.prompts)}</textarea></label>
    <label><span class="field-label">${amnesia ? 'Flashbacks & clues' : 'Struggle notes'}</span><textarea name="notes" maxlength="12000">${esc(struggle.notes)}</textarea></label>
    <label class="spell-availability"><input type="checkbox" name="resolved"${struggle.resolved ? ' checked' : ''}>Resolved</label>
    <div class="modal-actions"><button type="button" class="btn" data-action="close-modal">Cancel</button><button class="btn primary">Save tracker</button></div>
  </form>`, 'reference');
}

function trackStruggle(id) {
  const entry = referenceById.get(id);
  if (entry?.group !== 'Struggle') return;
  const c = current();
  const old = currentStruggle(c);
  if (old?.id !== id) {
    if (old && !confirm('Replace the current Struggle and its tracker?')) return;
    c.struggle = {id, progress: entry.initial || 0, notes: '', prompts: '', used: false, resolved: false};
    save();
  }
  closeModal();
  screen = 'notes';
  render();
  window.scrollTo({top: 0});
}


function renderClassPaths() {
  const c = current();
  const ownClass = c.className || 'Wizard';
  const paths = Object.values(CLASS_RULES).flatMap(rule => rule.paths.map(path => ({...path, className:rule.name, key:rule.name === 'Wizard' ? path.name : rule.name + '::' + path.id})));
  return pagehead('Paths & growth','Choose your class Paths or a multiclass Path, then learn its moves separately.') +
    infoCard('Advancement plan', `<p class="small muted">Level ${c.level} · ${esc(ownClass)}. Choose Paths through level-up advancements or GM approval.</p><label><span class="field-label">Advancement history / choices</span><textarea data-bind="advancementNotes">${esc(c.advancementNotes || '')}</textarea></label>`) +
    `<div class="tabset path-filters">${['All', ...Object.keys(CLASS_RULES)].map(name => `<button class="tab ${pathClassFilter === name ? 'active' : ''}" data-action="path-class" data-class="${name}">${name}</button>`).join('')}</div><div class="reference-grid">${paths.filter(path => pathClassFilter === 'All' || path.className === pathClassFilter).map(path => {
      const owned = c.paths.includes(path.key);
      const wizard = path.className === 'Wizard' ? PATHS.find(entry => entry.id === path.name) : null;
      return `<section class="card"><div class="flex-spread"><div><span class="small muted">${path.className === ownClass ? esc(path.className) : 'Multiclass · ' + esc(path.className)}</span><h2>${esc(path.name)}</h2></div><button class="btn ${owned ? 'primary' : ''}" data-action="class-path" data-path="${esc(path.key)}">${owned ? 'Acquired' : 'Acquire'}</button></div>
        <p class="small muted"><strong>${esc(ownClass === 'Wizard' ? wizard?.starting || path.starter.name : path.starter.name)}</strong> · ${esc(ownClass === 'Wizard' ? wizard?.startingDesc || path.starter.hint : path.starter.hint)}</p>
        <button class="btn tiny" data-action="reference-open" data-id="path-${esc(path.className.toLowerCase() + '-' + path.id)}" aria-haspopup="dialog">Full Path rules</button>
        ${path.moves.map(move => {
          const id = wizard ? wizard.moves.find(entry => entry.id.replace(/[^a-z]/gi,'').toLowerCase() === move.name.replace(/[^a-z]/gi,'').toLowerCase())?.id || move.name : path.key + '::' + move.id;
          const description = wizard?.moves.find(entry => entry.id === id)?.desc || move.hint;
          return `<div class="path-move"><div class="flex-spread"><strong>${esc(move.name)}</strong><button class="btn tiny ${c.moves.includes(id) ? 'primary' : ''}" data-action="class-move" data-move="${esc(id)}" data-path="${esc(path.key)}" ${owned ? '' : 'disabled'}>${c.moves.includes(id) ? 'Learned' : 'Learn'}</button></div><p>${esc(description)}</p></div>`;
        }).join('')}</section>`;
    }).join('')}</div>`;
}

function classPathByKey(key) {
  for (const rule of Object.values(CLASS_RULES)) {
    const path = rule.paths.find(path => (rule.name === 'Wizard' ? path.name : rule.name + '::' + path.id) === key);
    if (path) return {...path, className:rule.name, key};
  }
  return null;
}

function classPathToggle(key) {
  const c = current(), path = classPathByKey(key);
  if (!path) return;
  if (c.paths.includes(key)) {
    if (!confirm(`Remove ${path.name} and its learned moves?`)) return;
    c.paths = c.paths.filter(id => id !== key);
    const wizard = PATHS.find(entry => entry.id === key);
    c.moves = c.moves.filter(id => !id.startsWith(key + '::') && !wizard?.moves.some(move => move.id === id));
  } else {
    c.paths.push(key);
    const wizard = PATHS.find(entry => entry.id === key);
    if (wizard) c.prepared = c.prepared.filter(school => school !== wizard.school);
  }
  save(); render();
}

function renderCharacterLibrary() {
  return pagehead('Character library','Your saved characters and Alwyn’s three age sheets.',`<button class="btn primary" data-action="character-new">${ico('plus')} New character</button>`) +
    `<div class="reference-grid">${db.characters.map(character => `<article class="card ${character.id === db.activeId ? 'current-character' : ''}"><h2>${esc(characterName(character))}</h2><p class="small muted">Level ${character.level} · ${esc(character.className || 'Wizard')}${character.alwyn ? ' · Three ages' : ''}</p><div class="pillbar">${character.paths.map(path => pill(classPathByKey(path)?.name || path)).join('')}</div><div class="flex-row" style="margin-top:18px"><button class="btn primary" data-action="character-switch" data-id="${esc(character.id)}">${character.id === db.activeId ? 'Open current' : 'Open character'}</button>${character.id === db.activeId ? `<button class="btn" data-action="character-duplicate">Duplicate</button><button class="btn danger" data-action="character-delete">Delete</button>${!character.alwyn && /\balwyn\b/i.test(character.name) ? '<button class="btn" data-action="alwyn-edit">Set up Alwyn’s three ages</button>' : ''}` : ''}</div></article>`).join('')}</div>`;
}

function classStartingGear(className) {
  if (className === 'Wizard') return [FOCI, EQUIPMENT];
  const catalog = (REFERENCE.NR_CATALOG || []).filter(item => item.class === className);
  const options = category => catalog.filter(item => item.category === category).map(item => {
    const damage = item.damage || item.name.match(/\b\d{1,2}d\d{1,3}(?:[+-]\d{1,2})?\b/i)?.[0] || '';
    const weapon = item.kind === 'Weapon' || Boolean(damage);
    return {
      id: item.id, name: item.name.replace(/\s*\([^)]*\)$/, ''), details: item.description,
      equipped: weapon || Boolean(item.armor), weapon, damage, maxUses: item.uses,
      keywords: item.tags, bonuses: {armor: item.armor},
    };
  });
  return [options('Starting weapon/focus'), options('Starting equipment')];
}

function startingGearFields(className) {
  const [main, extras] = classStartingGear(className);
  const options = (items, selected) => diceOption('', selected, 'None')
    + items.map(item => diceOption(item.id, selected, item.name)).join('');
  const wizard = className === 'Wizard';
  return `<label><span class="field-label">${wizard ? 'Arcane focus' : 'Starting weapon'}</span>
    <select name="starter-main">${options(main, wizard ? 'skull' : '')}</select></label>
    <div class="field-grid"><label><span class="field-label">Starting item 1</span>
      <select name="starter-first">${options(extras, wizard ? 'gear' : '')}</select></label>
    <label><span class="field-label">Starting item 2</span>
      <select name="starter-second">${options(extras, wizard ? 'potion' : '')}</select></label></div>`;
}

function characterNewModal() {
  modal('New character', `<form id="new-character-form" class="block-stack"><label><span class="field-label">Character name</span><input class="input" name="name" required maxlength="100" placeholder="Character name"></label>
    <label><span class="field-label">Class</span><select name="className" id="new-character-class">${opts(Object.keys(CLASS_RULES), 'Wizard')}</select></label>
    <div id="new-class-summary" class="small muted">${esc(CLASS_RULES.Wizard.startingDescription)}</div>
    <details><summary>Starting equipment</summary><div id="new-character-gear" class="block-stack item-fields">${startingGearFields("Wizard")}</div></details>
    <details><summary>Multiclass (optional)</summary><p class="small muted">Select a starting Path from another class if your GM allows it. You can also acquire a multiclass Path later in Paths & growth.</p><label><span class="field-label">Additional Path</span><select name="multiclassPath"><option value="">None</option>${Object.values(CLASS_RULES).map(rule => `<optgroup label="${rule.name}">${rule.paths.map(path => `<option value="${esc(rule.name === 'Wizard' ? path.name : rule.name + '::' + path.id)}">${esc(rule.name + ' · ' + path.name)}</option>`).join('')}</optgroup>`).join('')}</select></label></details>
    <div class="modal-actions"><button class="btn" type="button" data-action="close-modal">Cancel</button><button class="btn primary">Create character</button></div></form>`);
}

function createCharacter(data) {
  const className = CLASS_RULES[data.get('className')] ? data.get('className') : 'Wizard';
  const rule = CLASS_RULES[className], character = fresh(String(data.get('name') || 'New character').trim().slice(0,100));
  character.className = className;
  character.level = 1; character.paths = []; character.hp = rule.hp;
  const path = classPathByKey(data.get('multiclassPath'));
  if (path) character.paths.push(path.key);
  const spread = rule.statsRule, stats = {...spread.locked}, primary = spread.choose[0];
  stats[primary] = spread.chosen;
  if (spread.other !== undefined) for (const stat of spread.choose) if (stat !== primary) stats[stat] = spread.other;
  const remaining = [...spread.remaining];
  for (const stat of ['STR','DEX','INT','WIS','CHA']) if (!(stat in stats)) stats[stat] = remaining.shift() ?? 0;
  character.stats = stats;
  character.prepared = className === 'Wizard' ? ['Abjuration','Evocation','Illusion'] : [];
  const [main, extras] = classStartingGear(className);
  const wizard = className === 'Wizard';
  const startingItem = (field, fallback) => data.get(field) ?? (wizard ? fallback : '');
  character.focus = startingItem('starter-main', 'skull');
  character.equipment = [...new Set([startingItem('starter-first', 'gear'), startingItem('starter-second', 'potion')])].filter(Boolean);
  character.inventory = [
    ...main.filter(item => item.id === character.focus),
    ...extras.filter(item => character.equipment.includes(item.id)),
  ].map(item => startingGearRecord(item));
  character.inventoryVersion = 2;
  if (className !== 'Wizard') character.spells = [];
  return migrateCharacter(character);
}

function resetCharacterTools() {
  diceLast = null; playDamagePreset = ''; playDamage = {};
}

function renderNotes(){const c=current();return pagehead('Campaign journal','Session notes, discoveries, and relationships.')+`<div class="cols-2"><div class="block-stack">
${journalStruggle(c)}
${recordCard(c,'journalEntries')}
${c.notes ? infoCard('Earlier notes for this age', '<textarea data-bind="notes">'+esc(c.notes)+'</textarea>') : ''}</div><div class="block-stack">
${infoCard('Relationships',`<p class="para small">Record PCs, relationship descriptions, and Depth (0–3).</p><div class="group-list">${c.relationships.length?c.relationships.map((rel,i)=>`<div class="group-item"><div style="flex:1"><strong>${esc(rel.name)}</strong><div class="micro muted">${esc(rel.description)}</div><div class="micro muted">Depth: ${clamp(rel.depth||0,0,3)}</div></div><button class="icon-btn" data-action="relationship-edit" data-index="${i}" aria-label="Edit relationship">${ico('edit')}</button></div>`).join(''):'<div class="empty">No relationships yet</div>'}</div><button class="btn" style="margin-top:13px" data-action="relationship-new">${ico('plus')} Add relationship</button>`)}
</div></div>`;}
function renderEquipment() {
  const c = current();
  return pagehead('Equipment & inventory', c.alwyn ? 'Shared inventory for all three ages.' : 'Manage what you carry and equip.') + recordCard(c, 'inventory');
}
function renderSaves(){const c=current();return pagehead('App & saves','Drive sync, backups, and appearance.')+`<div class="cols-2"><div class="block-stack">${driveSync?.configured ? infoCard('Google Drive', `<div class="group-list"><p class="para small">Sync your characters in the Drive folder you choose. <a href="./privacy.html" target="_blank" rel="noopener">Privacy</a></p><p id="drive-status" class="para small" role="status">${esc(driveSync.status())}</p><button id="drive-button" class="btn btn-wide" data-action="drive-sync" ${driveSync.disabled()?'disabled':''}>${esc(driveSync.button())}</button><div id="drive-disconnect-row" ${db.drive?'':'hidden'}><button id="drive-disconnect" class="btn btn-wide" data-action="drive-disconnect" ${driveSync.disabled()?'disabled':''}>Disconnect this device</button></div></div>`) : ''}
${infoCard('Export & restore',`<div class="alert info" style="margin-bottom:17px">Your edits are saved automatically <strong>in this browser</strong>. Export a backup to keep a separate copy or move your characters to another device.</div><div class="group-list"><button class="btn btn-wide primary" data-action="export">${ico('download')} Export ALL characters · JSON</button><button class="btn btn-wide" data-action="import">${ico('upload')} Import a JSON backup</button><button class="btn btn-wide" data-action="export-character">${ico('download')} Export current character only</button><button class="btn btn-wide" data-action="print">${ico('printer')} Print character sheet</button></div><p class="footnote" style="margin-top:14px">Import adds characters from a saved backup without overwriting existing ones. Backups include stats, notes, spells, and portrait data. Keep a copy somewhere you control (e.g., Files, Google Drive, or another cloud folder).</p>`)}
</div><div class="block-stack">${infoCard('App information',`<div class="group-list"><div class="group-item"><span>Theme</span><button class="btn tiny" data-action="theme">${db.theme==='dark'?'Dark':'Light'} · change</button></div><div class="group-item"><span>Rule source</span>${pill('Dungeon World 2 Beta v3')}</div><div class="group-item"><span>Storage</span>${pill(volatile?'Needs backup':'Local browser','accent')}</div></div><p class="footnote" style="margin-top:13px">Built from your DW2 Beta v3 Character Keeper export. This is an unofficial character tool. Spell examples are proposals requiring GM approval. For offline phone installation, use the hosted PWA version over HTTPS; a downloaded local HTML file may have different browser storage behavior.</p>`)}
</div></div>`;}
function modal(title, content, view = '') {
  const dialog = document.getElementById('modal');
  dialog.dataset.view = view;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-content').innerHTML = content;
  document.getElementById('modal-scrim').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  dialog.scrollTop = 0;
}

function closeModal() {
  if (libraryReturn) {
    const {id, action, scrollTop} = libraryReturn;
    libraryReturn = undefined;
    castTrigger = undefined;
    showSpellLibrary();
    document.getElementById('modal').scrollTop = scrollTop;
    [...document.querySelectorAll('#spell-library [data-action]')]
      .find(button => button.dataset.id === id && button.dataset.action === action)?.focus({preventScroll: true});
    return;
  }
  document.getElementById('modal-scrim').classList.add('hidden');
  document.getElementById('modal').dataset.view = '';
  document.body.style.overflow = '';
  const returnFocus = libraryTrigger && !libraryTrigger.isConnected
    ? document.querySelector('[data-action="spell-library"]') : libraryTrigger || castTrigger;
  returnFocus?.focus?.();
  libraryTrigger = castTrigger = undefined;
}
function opts(arr,value){return arr.map(x=>`<option value="${esc(x)}" ${x===value?'selected':''}>${esc(x)}</option>`).join('')}

function canCastSpell(c, spell) {
  return availableVerbs(c).includes(spell.verb) && availableSubs(c).includes(spell.sub);
}

function spellCategory(spell) {
  const category = spell.category === 'Damage' ? 'Attack' : spell.category;
  return spellCategories.includes(category) ? category : 'Other';
}

function spellCards(c) {
  const verbs = availableVerbs(c);
  const substances = availableSubs(c);
  const query = searchTerm.trim().toLowerCase();
  const cards = [];
  for (const spell of c.spells) {
    const category = spellCategory(spell);
    if (magicFilter !== 'All' && magicFilter !== category) continue;
    if (query && ![spell.name, spell.effect, spell.verb, spell.sub]
      .some(value => String(value ?? '').toLowerCase().includes(query))) continue;
    const available = verbs.includes(spell.verb) && substances.includes(spell.sub);
    if (hideUnavailable && !available) continue;
    const damage = parseDamageFormula(spell.damage);
    cards.push(`<article class="spell-card ${available ? '' : 'unavailable'}">
      <div class="spell-head"><div>
        <h3><button class="spell-cast-link" data-action="spell-cast" data-id="${esc(spell.id)}"
          aria-label="Cast ${esc(spell.name)}">${esc(spell.name)}</button></h3>
        <div class="spell-meta">${pill(category, 'accent')}${pill('MAG ' + (spell.mag === '?' ? 'GM' : spell.mag))}
          ${damage ? pill(damage.formula + ' damage') : ''}
          ${available ? pill('Available', 'mint') : pill('School unavailable', 'amber')}</div>
      </div><button class="icon-btn" data-action="spell-edit" data-id="${esc(spell.id)}"
        aria-label="Edit ${esc(spell.name)}">${ico('edit')}</button></div>
      <div class="spell-formula">${esc(spell.verb)} + ${esc(spell.sub)}</div>
      <p>${esc(spell.effect)}</p>${spell.note ? `<div class="micro subtle">${esc(spell.note)}</div>` : ''}
    </article>`);
  }
  return cards.join('') || '<div class="empty spell-list-empty">No spells match these filters.</div>';
}

function renderSpellList(c) {
  return `<div class="spell-filters">
    <input class="input" data-spell-search type="search" value="${esc(searchTerm)}" placeholder="Search spells…" aria-label="Search spells">
    <div class="tabset spell-category-tabs" aria-label="Spell categories">${['All', ...spellCategories].map(category =>
      `<button class="tab ${magicFilter === category ? 'active' : ''}" aria-pressed="${magicFilter === category}"
        data-action="magic-filter" data-filter="${category}">${category}</button>`).join('')}</div>
    <label class="spell-availability"><input type="checkbox" data-hide-unavailable ${hideUnavailable ? 'checked' : ''}>
      Hide unavailable spells</label>
  </div><div class="spell-grid" data-spell-cards>${spellCards(c)}</div>`;
}

function refreshSpellLists() {
  const cards = spellCards(current());
  document.querySelectorAll('[data-spell-cards]').forEach(list => { list.innerHTML = cards; });
  document.querySelectorAll('[data-spell-search]').forEach(input => {
    if (input.value !== searchTerm) input.value = searchTerm;
  });
  document.querySelectorAll('[data-hide-unavailable]').forEach(input => { input.checked = hideUnavailable; });
  document.querySelectorAll('[data-action="magic-filter"]').forEach(button => {
    const selected = button.dataset.filter === magicFilter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function showSpellLibrary(trigger) {
  if (trigger) libraryTrigger = trigger;
  modal('Full spellbook', `<div id="spell-library">${renderSpellList(current())}</div>`, 'spell-library');
  document.querySelector('#spell-library [data-spell-search]')?.focus({preventScroll: true});
}

function rememberLibrary(trigger) {
  if (trigger?.closest?.('#spell-library')) {
    libraryReturn = {id: trigger.dataset.id, action: trigger.dataset.action, scrollTop: document.getElementById('modal').scrollTop};
  }
}

function rollDice(count, sides) {
  return Array.from({length: count}, () => Math.floor(Math.random() * sides) + 1);
}

function parseDamageFormula(value) {
  const match = /^(\d{0,2})d(\d{1,3})([+-]\d{1,2})?$/i.exec(String(value ?? '').replace(/\s+/g, ''));
  if (!match) return null;
  const count = Number(match[1] || '1');
  const sides = Number(match[2]);
  const modifier = Number(match[3] || '0');
  if (count < 1 || count > 20 || sides < 2 || sides > 100) return null;
  return {count, sides, modifier, formula: `${count}d${sides}${modifier ? fmtSign(modifier) : ''}`};
}

const damageModes = [
  ['normal', 'Normal'],
  ['higher', 'Roll twice, keep higher'],
  ['lower', 'Roll twice, keep lower'],
  ['minimum', 'Minimum'],
  ['maximum', 'Maximum'],
];

function damageRoll({count, sides, modifier, formula}, mode) {
  const pool = () => {
    const dice = mode === 'minimum' || mode === 'maximum'
      ? Array(count).fill(mode === 'minimum' ? 1 : sides) : rollDice(count, sides);
    return {dice, total: Math.max(0, dice.reduce((sum, die) => sum + die, modifier))};
  };
  const first = pool();
  const second = mode === 'higher' || mode === 'lower' ? pool() : null;
  const chooseSecond = second && (mode === 'higher' ? second.total > first.total : second.total < first.total);
  return {formula, modifier, mode, kept: chooseSecond ? second : first, dropped: chooseSecond ? first : second};
}

function renderDamageResult(result) {
  if (!result) return '';
  const {formula, modifier, mode, kept, dropped} = result;
  const detail = group => group.dice.join(' + ') + (modifier ? ' ' + fmtSign(modifier) : '');
  const label = damageModes.find(([value]) => value === mode)[1];
  return `<strong>${kept.total} damage</strong><span class="small muted">${formula} · ${label} · ${detail(kept)}
    ${dropped ? ` · Dropped ${dropped.total} (${detail(dropped)})` : ''}</span>`;
}

function damageRoller(id, {formula = '', mode = 'normal', result = null} = {}, spellId = '') {
  return `<form id="${id}" class="damage-roller" data-damage-form data-spell-id="${esc(spellId || '')}">
    ${damageDiceControls('formula', formula)}
    <label><span class="field-label">Damage roll</span><select name="mode">${damageModes.map(([value,label])=>`<option value="${value}" ${mode === value ? 'selected' : ''}>${label}</option>`).join('')}</select></label>
    <button class="btn primary" type="submit">${ico('dice')} Roll damage</button>
    <div id="${id}-result" class="quick-dice-result damage-result" role="status">${renderDamageResult(result)}</div></form>`;
}

function rollDamage(form) {
  const data = new FormData(form);
  const formula = parseDamageFormula(data.get('formula'));
  const mode = data.get('mode');
  const output = document.getElementById(form.id + '-result');
  if (!formula || !damageModes.some(([value]) => value === mode)) {
    output.textContent = 'Choose the damage dice and roll mode.';
    return;
  }
  if (formula.count > diceCountMax || formula.modifier < diceBonusMin || formula.modifier > diceBonusMax) {
    output.textContent = 'Choose up to 5 dice and a bonus from −1 to +5.';
    return;
  }
  const result = damageRoll(formula, mode);
  if (form.id === 'play-damage-form') playDamage = {formula: formula.formula, mode, result};
  const spell = current().spells.find(spell => spell.id === form.dataset?.spellId);
  if (spell && spell.damage !== formula.formula) { spell.damage = formula.formula; save(); }
  output.innerHTML = renderDamageResult(result);
}

const spellcastingStat = c => ['Cleric', 'Druid'].includes(c.className) ? 'WIS' : 'INT';

function moveRollSpec(c, stat, extra, mag) {
  const modifier = effectiveStat(c, stat);
  const condition = CONDITIONS.find(entry => entry.stat === stat && c.conditions[entry.name] !== 'clear');
  const atLimit = mag !== null && mag === modifier;
  const tooHigh = mag !== null && mag > modifier;
  const balance = (extra === 'advantage' ? 1 : extra === 'disadvantage' ? -1 : 0)
    - Number(atLimit) - Number(Boolean(condition));
  const mode = balance > 0 ? 'advantage' : balance < 0 ? 'disadvantage' : 'normal';
  return {stat, modifier, condition, atLimit, tooHigh, mode};
}

function resolveMoveRoll({stat, modifier, mode}) {
  const dice = rollDice(mode === 'normal' ? 2 : 3, 6);
  const omitted = mode === 'normal' ? null : dice.indexOf(mode === 'advantage' ? Math.min(...dice) : Math.max(...dice));
  const total = dice.reduce((sum, die, i) => i === omitted ? sum : sum + die, modifier);
  return {
    dice, omitted, mod: modifier, total,
    outcome: total >= 10 ? '10+ · Success' : total >= 7 ? '7–9 · Success with complication' : '6− · Trouble',
    mode: [stat, mode === 'normal' ? '' : mode].filter(Boolean).join(' · '),
  };
}

function rollResult(result, showOutcome = true) {
  return `<div class="rolling-number">${result.dice.map((die, i) =>
    `<div class="roll-die" ${result.omitted === i ? 'aria-label="Discarded die" style="opacity:.35;text-decoration:line-through"' : ''}>${die}</div>`).join('')}
    <span class="muted">${fmtSign(result.mod)}</span></div>
    <div class="dice-result">${result.total}</div>
    ${showOutcome ? `<div class="dice-summary">${esc(result.outcome)} · ${esc(result.mode)}</div>` : ''}`;
}

function castCheck(c, spell, magnitude, extra) {
  const mag = /^\d+$/.test(String(magnitude ?? '')) ? Number(magnitude) : null;
  const spec = moveRollSpec(c, spellcastingStat(c), extra, mag);
  const problem = !canCastSpell(c, spell) ? 'This spell needs a verb and substance from currently available schools.'
    : mag === null ? 'Choose the MAG approved by your GM.'
    : spec.tooHigh ? `MAG exceeds your ${spec.stat}. Use a ritual or ask your GM about a lower-MAG effect.` : '';
  return {...spec, problem};
}

function castSummary({mode, modifier, condition, atLimit, problem, stat}) {
  const reasons = [condition && `${condition.name} gives disadvantage on ${stat} rolls.`,
    atLimit && `MAG equals ${stat} and gives disadvantage.`].filter(Boolean);
  return `${problem ? `<p class="alert">${esc(problem)}</p>` : `<div class="flex-row">
    ${pill(`${mode[0].toUpperCase() + mode.slice(1)} cast`, mode === 'disadvantage' ? 'amber' : 'mint')}
    <span class="small muted">Cast a Spell · ${stat} ${fmtSign(modifier)}</span></div>`}
    ${reasons.length ? `<p class="small muted">${reasons.join(' ')}</p>` : ''}`;
}

function castSpellModal(id, trigger) {
  const c = current();
  const spell = c.spells.find(entry => entry.id === id);
  if (!spell) return;
  const mag = spell.mag === '5+' ? '5' : /^\d+$/.test(String(spell.mag)) ? spell.mag : '';
  const check = castCheck(c, spell, mag, 'normal');
  const canRollDamage = canCastSpell(c, spell) && (spellCategory(spell) === 'Attack' || parseDamageFormula(spell.damage));
  rememberLibrary(trigger);
  castTrigger = trigger;
  modal(`Cast ${spell.name}`, `<div class="block-stack"><form id="spell-cast-form" data-id="${esc(spell.id)}" class="block-stack">
    <div><p class="small muted">${esc(spell.verb)} + ${esc(spell.sub)}</p><p class="para">${esc(spell.effect)}</p>
      ${spell.note ? `<p class="small muted">${esc(spell.note)}</p>` : ''}</div>
    <div class="field-grid">
      ${magnitudeSelect('id="cast-magnitude" name="mag"', mag)}
      ${rollModifierSelect('name="extra"')}
    </div>
    <div id="cast-summary" role="status">${castSummary(check)}</div>
    <div id="cast-result" class="dice-area cast-result" role="status" hidden></div>
    <div class="modal-actions"><button type="button" class="btn" data-action="close-modal">Close</button>
      <button type="submit" class="btn primary" id="cast-roll" ${check.problem ? 'disabled' : ''}>${ico('dice')} Roll cast</button></div>
  </form>${canRollDamage ? infoCard('Spell damage', damageRoller('spell-damage-form', {formula: spellDamageFormula(spell)}, spell.id)) : ''}</div>`);
  document.getElementById(check.problem ? 'cast-magnitude' : 'cast-roll')?.focus?.({preventScroll: true});
}

function updateSpellCast(form, roll = false) {
  const c = current();
  const spell = c.spells.find(entry => entry.id === form.dataset.id);
  if (!spell) return;
  const fields = new FormData(form);
  const check = castCheck(c, spell, fields.get('mag'), fields.get('extra'));
  document.getElementById('cast-roll').disabled = Boolean(check.problem);
  document.getElementById('cast-summary').innerHTML = castSummary(check);
  const result = document.getElementById('cast-result');
  result.hidden = !roll || Boolean(check.problem);
  result.innerHTML = result.hidden ? '' : rollResult(resolveMoveRoll(check));
}

function quickDiceResult({count, sides, modifier, dice, total}) {
  return dice.length ? `<strong>${total}</strong><span class="small muted">${count}d${sides} · ${dice.join(' + ')}
    ${modifier ? fmtSign(modifier) : ''}</span>` : '';
}

function quickDiceCard() {
  return `<form id="quick-dice-form" class="quick-dice-form">
    ${dicePoolControls(quickDice)}
    <button type="submit" class="btn primary btn-wide">${ico('dice')} Roll dice</button>
    <div id="quick-dice-result" class="quick-dice-result" role="status">${quickDiceResult(quickDice)}</div>
  </form>`;
}

function rollQuickDice(form) {
  const data = new FormData(form);
  const count = Number(data.get('count'));
  const sides = Number(data.get('sides'));
  const modifier = Number(data.get('modifier'));
  if (!Number.isInteger(count) || count < 1 || count > diceCountMax || !diceSides.includes(sides)
      || !Number.isInteger(modifier) || modifier < diceBonusMin || modifier > diceBonusMax) return;
  const dice = rollDice(count, sides);
  const total = dice.reduce((sum, die) => sum + die, modifier);
  quickDice = {count, sides, modifier, dice, total};
  document.getElementById('quick-dice-result').innerHTML = quickDiceResult(quickDice);
}
function spellModal(id){const c=current(),sp=c.spells.find(x=>x.id===id)||{id:'',name:'',verb:availableVerbs(c)[0]||'Cloak',sub:availableSubs(c)[0]||'Sights and/or sounds',category:'Utility',mag:'?',effect:'',note:''};const verbs=[...new Set([...SCHOOLS.flatMap(s=>s.verbs),...PATHS.flatMap(p=>p.extra)])];const subs=SCHOOLS.map(s=>s.sub);modal(id?'Edit spell':'Create a spell',`<form id="spell-form" data-id="${esc(sp.id)}"><div class="field-grid"><label class="full"><span class="field-label">Spell name</span><input name="name" class="input" required maxlength="100" value="${esc(sp.name)}" placeholder="e.g. Windstep"/></label><label><span class="field-label">Verb</span><select name="verb">${opts(verbs,sp.verb)}</select></label><label><span class="field-label">Substance</span><select name="sub">${opts(subs,sp.sub)}</select></label><label><span class="field-label">Category</span><select name="category">${opts(spellCategories,spellCategory(sp))}</select></label><label><span class="field-label">Magnitude (GM-approved)</span><select name="mag">${opts(['?','0','1','2','3','4','5+'],sp.mag)}</select></label><div class="full">${damageDiceControls('damage', spellDamageFormula(sp), 'This spell deals damage')}</div><label class="full"><span class="field-label">Desired effect</span><textarea name="effect" required placeholder="Describe what you want this spell to do...">${esc(sp.effect)}</textarea></label><label class="full"><span class="field-label">GM ruling / limits</span><textarea name="note" placeholder="Range, duration, narrative limits, approvals...">${esc(sp.note)}</textarea></label></div><div class="modal-actions">${id?`<button type="button" class="btn danger" data-action="spell-delete" data-id="${esc(id)}">${ico('delete')} Delete</button>`:''}<button type="button" class="btn" data-action="close-modal">Cancel</button><button type="submit" class="btn primary">${ico('save')} Save spell</button></div></form><p class="footnote">You can draft a future spell even if its school is not currently prepared. Unavailable spells are labeled in the spellbook.</p>`);}
function relationshipModal(index){const r=index===null?{name:'',description:'',depth:0}:current().relationships[index];modal(index===null?'Add relationship':'Edit relationship',`<form id="relationship-form" data-index="${index===null?'':index}"><div class="field-grid"><label class="full"><span class="field-label">Character name</span><input class="input" name="name" required value="${esc(r.name)}"/></label><label class="full"><span class="field-label">Relationship</span><textarea name="description">${esc(r.description)}</textarea></label><label><span class="field-label">Depth</span><select name="depth">${opts(['0','1','2','3'],String(r.depth))}</select></label></div><div class="modal-actions">${index!==null?`<button type="button" class="btn danger" data-action="relationship-delete" data-index="${index}">Delete</button>`:''}<button type="button" class="btn" data-action="close-modal">Cancel</button><button type="submit" class="btn primary">Save relationship</button></div></form>`);}
function campModal(){const c=current(),marked=CONDITIONS.filter(x=>c.conditions[x.name]==='marked');modal('Make Camp',`<p class="para">Once per session, recover all HP and clear <strong>one marked Condition</strong>. Forgotten prepared schools are restored. Your normal three prepared schools can be changed on the Magic page.</p><label><span class="field-label">Condition to clear</span><select id="camp-condition">${opts(['None',...marked.map(x=>x.name)],marked.length?marked[0].name:'None')}</select></label><div class="alert info" style="margin-top:14px">The world advances while you rest. Your GM may make threats progress.</div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="camp-confirm">Finish Make Camp</button></div>`);}
function limitModal(){const c=current();modal('Reach Your Limit',`<p class="para">When all five Conditions are marked or locked, clear marked Conditions, then choose and roleplay an outburst. Lock the associated Condition.</p><label><span class="field-label">Condition to lock after the outburst</span><select id="limit-condition">${opts(CONDITIONS.map(x=>x.name),'Angry')}</select></label><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="limit-confirm">Resolve limit</button></div>`);}
function portraitModal(){modal('Character portrait',`<p class="para">Add a personal portrait. It will be stored in your character backup and resized for mobile use.</p><input id="portrait-input" type="file" accept="image/png,image/jpeg,image/webp" class="input"/><div class="modal-actions"><button class="btn danger" data-action="portrait-remove">Remove portrait</button><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="portrait-save">Save portrait</button></div>`);}

function pathToggle(id){const c=current(),p=PATHS.find(x=>x.id===id);if(!p)return;if(hasPath(c,id)){if(!confirm(`Remove ${id} Path? Its unlocked moves will also be removed.`))return;c.paths=c.paths.filter(v=>v!==id);c.moves=c.moves.filter(m=>!p.moves.some(x=>x.id===m));c.prepared=[...new Set(c.prepared)].slice(0,3);}else{if(c.paths.length>=2){toast('This Wizard sheet tracks up to two Wizard Paths.');return}c.paths.push(id);if(c.prepared.includes(p.school))c.prepared=c.prepared.filter(x=>x!==p.school);if(c.level===1)toast('Rules note: Paths normally require a level-up advancement.');}save();render();}
function exportJSON(data,filename){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('JSON backup created. Keep a copy outside this browser.');}
function exportAll(){save();exportJSON({format:'Arcanum DW2 Wizard Keeper',version:1,exportedAt:new Date().toISOString(),characters:db.characters},'Arcanum-DW2-all-characters.json')}
function exportChar(){save();exportJSON({format:'Arcanum DW2 Wizard Keeper',version:1,exportedAt:new Date().toISOString(),characters:[currentCharacter()]},`Arcanum-${characterName(currentCharacter()).replace(/[^a-z0-9-]+/gi,'-')}.json`)}
function normalizeImported(x, includeAlwyn = true){if(!x||typeof x!=='object'||Array.isArray(x))return null;x=migrateCharacter(structuredClone(x));const d=fresh(String(x.name||'Imported wizard').slice(0,120));const safe=(key,defaultVal)=>Array.isArray(x[key])?x[key]:defaultVal;
Object.assign(d,{...x,id:uid(),name:String(x.name||'Imported wizard').slice(0,120),level:clamp(Number(x.level)||1,1,99),stats:{...d.stats,...(x.stats||{})},origins:{...d.origins,...(x.origins||{})},conditions:{...d.conditions,...(x.conditions||{})},hp:Math.max(0,Number(x.hp)||0),paths:safe('paths',[]).filter(p=>PATHS.some(q=>q.id===p)||classPathByKey(p)),moves:safe('moves',[]).filter(m=>PATHS.some(q=>q.moves.some(v=>v.id===m))||Object.values(CLASS_RULES).some(rule=>rule.paths.some(path=>path.moves.some(move=>m===rule.name+'::'+path.id+'::'+move.id)))),prepared:safe('prepared',[]).filter(p=>SCHOOLS.some(q=>q.id===p)).slice(0,3),forgotten:safe('forgotten',[]),equipment:safe('equipment',[]).filter(e=>EQUIPMENT.some(q=>q.id===e)),used:{...d.used,...(x.used||{})},spells:safe('spells',[]).slice(0,300).filter(sp=>sp&&typeof sp==='object').map(sp=>({...sp,id:uid()})),relationships:safe('relationships',[]).slice(0,40).filter(r=>r&&typeof r==='object'),createdAt:Date.now(),updatedAt:Date.now()});
  d.backstory = Object.fromEntries(storyFields.map(([key]) => [key, typeof x.backstory?.[key] === "string" ? x.backstory[key] : ""]));
  for (const key of ["inventory", "journalEntries"]) {
    d[key] = safe(key, []).map(record => cleanRecord(key, record, uid())).filter(Boolean);
  }
  delete d.alwyn;
  if (includeAlwyn && x.alwyn) {
    const {forms, name, overview, personality} = x.alwyn;
    if (!forms?.noble || !forms?.sage) throw new Error('Alwyn backup is missing an age sheet.');
    const text = (value, limit = 3500) => typeof value === 'string' ? value.slice(0, limit) : '';
    d.alwyn = {
      schemaVersion: 2,
      name: text(name, 120) || 'Alwyn',
      overview: text(overview),
      ...(Number.isInteger(x.alwyn.morningRoll) && ages[x.alwyn.morningRoll - 1] ? {morningRoll: x.alwyn.morningRoll} : {}),
      forms: Object.fromEntries(ages.slice(1).map(age =>
        [age.id, copyAgeFields(normalizeImported({...d, ...forms[age.id]}, false))])),
      personality: Object.fromEntries(ages.map(age => [age.id, text(personality?.[age.id])])),
    };
  }
  return d;
}
function handleImport(file){if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.format!=='Arcanum DW2 Wizard Keeper'||!Array.isArray(data.characters))throw Error('Invalid Arcanum backup');if(data.characters.length>100)throw Error('Too many characters in one backup');const imported=data.characters.map(character => normalizeImported(character)).filter(Boolean);if(!imported.length)throw Error('No usable characters');db.characters.push(...imported);db.activeId=imported[0].id;screen='sheet';save();render();toast(`Imported ${imported.length} character${imported.length!==1?'s':''}. Existing characters were preserved.`)}catch(e){toast('Could not import backup: '+e.message)}};reader.readAsText(file);}
function playRollSpec() {
  const c = current();
  const mag = diceMode === 'cast' && diceMag !== '?' ? Number(diceMag) : null;
  const stat = diceMode === 'cast' ? spellcastingStat(c) : playRollTypes.find(type => type.id === diceMode)?.stat || 'INT';
  return moveRollSpec(c, stat, diceExtra, mag);
}

function roll() {
  const spec = playRollSpec();
  if (spec.tooHigh) {
    toast('Spell Magnitude is above your INT. Try a lesser effect or Ritual.');
    return;
  }
  diceLast = resolveMoveRoll(spec);
  render();
}
function changeBind(path,val){if(path==='__diceMode'){diceMode=val;diceLast=null;render();return;}const c=current(),segments=path.split('.');let cur=c;for(let i=0;i<segments.length-1;i++)cur=cur[segments[i]]||(cur[segments[i]]={});const last=segments.at(-1);if(['hpBonus','armorBonus','level','treasure'].includes(path))val=Number(val)||0;cur[last]=val;scheduleSave();if(path==='name'&&!c.alwyn){document.getElementById('page-eyebrow').textContent=String(val).slice(0,24).toUpperCase();}}
function refreshAfterChange(path){if(['level','hpBonus','armorBonus','wealth','name','origins.portrait'].includes(path))render();}
function refreshInventoryEffects(c) {
  c.hp = Math.min(c.hp, maxHp(c));
  diceLast = null;
  playDamage = {};
}
function handleAction(a){const c=current(),kind=a.dataset.action;switch(kind){
case 'record-edit':
  openRecord(a.dataset.key, a.dataset.id);
  break;
case 'record-delete': {
  const {key, id} = a.dataset;
  if (!confirm('Delete this ' + (key === 'inventory' ? 'item' : 'entry') + '?')) break;
  c[key] = c[key].filter(record => record.id !== id);
  if (key === 'inventory') refreshInventoryEffects(c);
  save();
  closeModal();
  render();
  break;
}
case 'inventory-use': {
  const item = c.inventory.find(record => record.id === a.dataset.id);
  if (!item?.uses) break;
  item.uses--;
  save();
  render();
  break;
}
case 'nav':if(!NAV.some(entry=>entry.id===a.dataset.screen))break;closeModal();screen=a.dataset.screen;searchTerm='';render();window.scrollTo({top:0,behavior:'smooth'});break;
case 'workspace-section': selectWorkspaceSection(a.dataset.section, a); break;
case 'quick-status':
  castTrigger = a;
  modal('Quick status', quickStatusContent(), 'quick-status');
  document.querySelector('#modal [data-action="close-modal"]')?.focus({preventScroll: true});
  break;
case 'quick-roll': libraryReturn=undefined; libraryTrigger=undefined; castTrigger=a; modal('Roll dice',quickDiceCard()); break;
case 'more-nav': modal('Navigate', '<div class="group-list">'+NAV.map(entry=>`<button class="btn" data-action="nav" data-screen="${entry.id}">${ico(entry.icon)} ${entry.label}</button>`).join('')+'</div>'); break;
case 'rules-category': rulesCategory=a.dataset.category; rulesFamily='All'; render(); break;
case 'reference-open': openReference(a.dataset.id, a); break;
case 'reference-add-item': addReferenceItem(a.dataset.id, a); break;
case 'reference-track-struggle': trackStruggle(a.dataset.id); break;
case 'edit-struggle': editStruggle(a); break;
case 'journal-struggles': rulesCategory='Struggles'; rulesFamily='All'; rulesSearch=''; screen='rules'; render(); window.scrollTo({top:0}); break;
case 'path-class': pathClassFilter=a.dataset.class; render(); break;
case 'class-path': classPathToggle(a.dataset.path); break;
case 'class-move': { if(!c.paths.includes(a.dataset.path))break; const id=a.dataset.move; c.moves=c.moves.includes(id)?c.moves.filter(move=>move!==id):[...c.moves,id];save();render();break; }
case 'permanent-conditions':permanentConditionsModal();break;
case 'alwyn-edit':alwynModal();break;
case 'morning-roll': {
  if (!c.alwyn) break;
  c.alwyn.morningRoll = rollDice(1, 3)[0];
  save();
  render();
  document.querySelector('[data-action="morning-roll"]')?.focus();
  break;
}
case 'alwyn-overview':screen='alwyn';render();document.querySelector('[data-action="alwyn-overview"]')?.focus();break;
case 'alwyn-age': {
  const age = ages.find(entry => entry.id === a.dataset.age);
  if (!age || !c.alwyn) break;
  db.age = age.id;
  if (screen === 'alwyn') screen = 'sheet';
  searchTerm = '';
  magicFilter = 'All';
  resetCharacterTools();
  persist();
  render();
  document.querySelector(`.age-tab[data-age="${age.id}"]`)?.focus();
  window.scrollTo({top: 0});
  break;
}
case 'theme':db.theme=db.theme==='dark'?'light':'dark';save();render();break;
case 'drive-sync':driveSync?.activate();break;
case 'drive-disconnect':driveSync?.disconnect();break;
case 'export':exportAll();break;
case 'export-character':exportChar();break;
case 'import':document.getElementById('import-file').click();break;
case 'print':screen='sheet';render();requestAnimationFrame(()=>window.print());break;
case 'portrait':portraitModal();break;
case 'portrait-remove':c.origins.portrait='';save();closeModal();render();break;
case 'portrait-save':{const f=document.getElementById('portrait-input').files?.[0];if(!f){toast('Choose an image first.');break}if(f.size>8*1024*1024){toast('Portrait must be smaller than 8 MB.');break}const rd=new FileReader();rd.onload=()=>{const img=new Image();img.onload=()=>{const canvas=document.createElement('canvas'),scale=Math.min(1,360/Math.max(img.width,img.height));canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);c.origins.portrait=canvas.toDataURL('image/jpeg',.78);save();closeModal();render();toast('Portrait saved.');};img.onerror=()=>toast('Could not read this image.');img.src=rd.result;};rd.readAsDataURL(f);break}
case 'close-modal':closeModal();break;
case 'stat':{const stat=a.dataset.stat;const limit=c.level>=10?3:2;c.stats[stat]=clamp(Number(c.stats[stat])+Number(a.dataset.delta),-3,limit);save();render();break}
case 'hp':c.hp=clamp(Number(c.hp)+Number(a.dataset.delta),0,maxHp(c));updateCombatStatus(a);break;
case 'heal-full':c.hp=maxHp(c);updateCombatStatus(a);break;
case 'xp':c.xp=c.xp===Number(a.dataset.value)?Number(a.dataset.value)-1:Number(a.dataset.value);save();render();break;
case 'xp-minus':c.xp=clamp(c.xp-1,0,5);save();render();break;
case 'xp-plus':c.xp=clamp(c.xp+1,0,5);save();render();break;
case 'level':{const old=maxHp(c);c.level=clamp(c.level+Number(a.dataset.delta),1,99);c.hp=clamp(c.hp+(maxHp(c)-old),0,maxHp(c));save();render();break}
case 'level-up':if(c.xp<5)return;{const old=maxHp(c);c.level++;c.xp=0;c.hp=clamp(c.hp+(maxHp(c)-old),0,maxHp(c));screen='paths';save();render();toast('Level gained. Record your advancement on the Paths page.');break}
case 'condition':if(!CONDITIONS.some(entry=>entry.name===a.dataset.condition)||!['clear','marked','locked'].includes(a.dataset.state)||c.permanentConditions?.includes(a.dataset.condition))break;c.conditions[a.dataset.condition]=a.dataset.state;updateCombatStatus(a);break;
case 'cycle-condition':{if(c.permanentConditions?.includes(a.dataset.condition))break;let prev=c.conditions[a.dataset.condition];c.conditions[a.dataset.condition]=prev==='clear'?'marked':prev==='marked'?'locked':'clear';save();render();break}
case 'reach-limit':limitModal();break;
case 'limit-confirm':{const locked=document.getElementById('limit-condition').value;for(const key of Object.keys(c.conditions)){if(c.conditions[key]==='marked'&&!c.permanentConditions?.includes(key))c.conditions[key]='clear';}c.conditions[locked]='locked';save();closeModal();render();toast('Reach Your Limit resolved. Roleplay the outburst.');break}
case 'make-camp':campModal();break;
case 'camp-confirm':{const k=document.getElementById('camp-condition').value;c.hp=maxHp(c);if(k!=='None'&&c.conditions[k]==='marked'&&!c.permanentConditions?.includes(k))c.conditions[k]='clear';c.forgotten=[];save();closeModal();render();toast('Made Camp: HP recovered and one marked Condition cleared.');break}

case 'remember':c.forgotten=c.forgotten.filter(x=>x!==a.dataset.school);save();render();break;
case 'forget':if(!c.forgotten.includes(a.dataset.school))c.forgotten.push(a.dataset.school);save();render();break;
case 'magic-filter':magicFilter=a.dataset.filter;refreshSpellLists();break;
case 'spell-library':showSpellLibrary(a);break;
case 'spell-new':spellModal(null);break;
case 'spell-cast':castSpellModal(a.dataset.id,a);break;
case 'spell-edit':rememberLibrary(a);spellModal(a.dataset.id);break;
case 'spell-delete':if(confirm('Delete this spell from your spellbook?')){c.spells=c.spells.filter(s=>s.id!==a.dataset.id);save();closeModal();render();}break;
case 'path':pathToggle(a.dataset.path);break;
case 'move':{const p=PATHS.find(p=>p.id===a.dataset.path);if(!p||!hasPath(c,p.id))return;const id=a.dataset.move;if(c.moves.includes(id))c.moves=c.moves.filter(x=>x!==id);else c.moves.push(id);save();render();break;}
case 'roll':roll();break;
case 'relationship-new':relationshipModal(null);break;
case 'relationship-edit':relationshipModal(Number(a.dataset.index));break;
case 'relationship-delete':if(confirm('Delete this relationship?')){c.relationships.splice(Number(a.dataset.index),1);save();closeModal();render();}break;
case 'character-new':characterNewModal();break;
case 'character-duplicate':{const x=normalizeImported(currentCharacter());x.name+=' (copy)';if(x.alwyn)x.alwyn.name+=' (copy)';db.characters.push(x);db.activeId=x.id;resetCharacterTools();save();render();toast('Duplicate character created.');break;}
case 'character-switch':if(!db.characters.some(character=>character.id===a.dataset.id))break;save();db.activeId=a.dataset.id;resetCharacterTools();screen=currentCharacter().alwyn?'alwyn':'sheet';save();render();toast('Character opened.');break;
case 'character-delete':if(db.characters.length<=1){toast('Create another character before deleting the last one.');break;}if(confirm(`Delete ${characterName(currentCharacter())}${c.alwyn?' and all three age sheets':''} ${db.drive?'from this device and your next Drive sync':'from this browser'}? Export a backup first if you want to keep a copy.`)){db.characters=db.characters.filter(x=>x.id!==c.id);db.activeId=db.characters[0].id;save();render();}break;
default:break;
}}
document.addEventListener('click',e=>{const a=e.target.closest('[data-action]');if(a){e.preventDefault();handleAction(a)}});
document.addEventListener('change',e=>{const a=e.target;
if(a.id==='rules-family'){rulesFamily=a.value;document.getElementById('rules-results').innerHTML=rulesResults();}
if(a.closest?.('[data-dice-builder]'))updateDamageDice(a);
if(a.id==='new-character-class'){
  document.getElementById('new-class-summary').textContent=CLASS_RULES[a.value]?.startingDescription||'';
  document.getElementById('new-character-gear').innerHTML=startingGearFields(a.value);
}
if(a.id==='inventory-type')document.getElementById('inventory-damage').hidden=a.value!=='true';
if(a.id==='play-damage-preset'){playDamagePreset=a.value;playDamage={};render();
  document.getElementById('play-damage-preset').focus?.({preventScroll:true});}
if(a.form?.id==='play-damage-form' && a.name==='mode'){
  playDamage = {...playDamage, mode: a.value, result: null};
  document.getElementById('play-damage-form-result').textContent = '';
}
if(a.matches('[data-hide-unavailable]')){hideUnavailable=a.checked;refreshSpellLists();}if(a.form?.id==='spell-cast-form')updateSpellCast(a.form);if(a.matches('[data-bind]')){changeBind(a.dataset.bind,a.value);refreshAfterChange(a.dataset.bind)}if(a.matches('[data-school]')){const c=current(),s=a.dataset.school;if(a.checked){if(c.prepared.length>=3){toast('Maximum three normal Prepared Schools. Owned Paths grant their schools separately.');render();return}c.prepared.push(s);}else c.prepared=c.prepared.filter(x=>x!==s);save();render();}if(a.id==='dice-mag'){diceMag=a.value;diceLast=null;render();}if(a.id==='dice-extra'){diceExtra=a.value;diceLast=null;render();}});
document.addEventListener('input', e => {
  const input = e.target;
  if(input.matches('[data-rules-search]')){rulesSearch=input.value;document.getElementById('rules-results').innerHTML=rulesResults();}
  if (input.matches('[data-bind]') && !input.matches('select')) changeBind(input.dataset.bind, input.value);
  if (input.matches('[data-spell-search]')) {
    searchTerm = input.value;
    refreshSpellLists();
  }
});
document.addEventListener('submit',e=>{
if (e.target.id === 'struggle-form') {
  e.preventDefault();
  const c = current();
  const struggle = currentStruggle(c);
  const entry = referenceById.get(struggle?.id);
  if (!entry) return;
  const data = new FormData(e.target);
  c.struggle = {...struggle, progress: itemInteger(data.get('progress'), 0, entry.capacity || 0),
    prompts: String(data.get('prompts') || '').slice(0, 12000), notes: String(data.get('notes') || '').slice(0, 12000),
    used: data.has('used'), resolved: data.has('resolved')};
  save();
  closeModal();
  render();
  document.querySelector('[data-action="edit-struggle"]')?.focus({preventScroll: true});
  return;
}
if (['spell-damage-form','play-damage-form'].includes(e.target.id)) {
  e.preventDefault();
  rollDamage(e.target);
  return;
}
if (e.target.id === 'spell-cast-form' || e.target.id === 'quick-dice-form') {
  e.preventDefault();
  if (e.target.id === 'spell-cast-form') updateSpellCast(e.target, true);
  else rollQuickDice(e.target);
  return;
}
if(e.target.id==='permanent-conditions-form'){
  e.preventDefault();const c=current(),data=new FormData(e.target);
  c.permanentConditions=CONDITIONS.filter(({name})=>data.has(name)).map(({name})=>name);
  for(const name of c.permanentConditions)c.conditions[name]='locked';save();closeModal();render();return;
}
if (e.target.id === 'alwyn-form') {
  e.preventDefault();
  saveAlwynProfile(e.target);
  return;
}
if(e.target.id === 'character-record-form') {
  e.preventDefault();
  const {key, id} = e.target.dataset;
  const record = cleanRecord(key, Object.fromEntries(new FormData(e.target)), id || uid());
  if (!record) { toast('Enter a name or title.'); return; }
  const records = current()[key] ||= [];
  const index = records.findIndex(entry => entry.id === id);
  if (index < 0) records.unshift(record);
  else records[index] = record;
  if (key === 'inventory') refreshInventoryEffects(current());
  save();
  closeModal();
  render();
  return;
}
if(e.target.id==='spell-form'){e.preventDefault();const f=e.target,form=new FormData(f),c=current(),id=f.dataset.id;const damageRaw=String(form.get('damage') ?? '').trim();const damage=parseDamageFormula(damageRaw);if(damageRaw&&!damage){toast('Enter damage dice like 1d6 or 2d8+1.');return;}const sp={id:id||uid(),...(damage?{damage:damage.formula}:{}),name:String(form.get('name')).trim().slice(0,110),verb:String(form.get('verb')),sub:String(form.get('sub')),category:spellCategory({category:form.get('category')}),mag:String(form.get('mag')),effect:String(form.get('effect')).trim().slice(0,2000),note:String(form.get('note')).trim().slice(0,2000),example:false};if(!sp.name||!sp.effect){toast('Enter a spell name and desired effect.');return;}const i=c.spells.findIndex(x=>x.id===id);if(i>=0)c.spells[i]=sp;else c.spells.unshift(sp);save();closeModal();render();toast('Spell saved.');}else if(e.target.id==='relationship-form'){e.preventDefault();const f=e.target,d=new FormData(f),r={name:String(d.get('name')).slice(0,100),description:String(d.get('description')).slice(0,800),depth:Number(d.get('depth'))};let i=f.dataset.index===''?-1:Number(f.dataset.index);if(i<0)current().relationships.push(r);else current().relationships[i]=r;save();closeModal();render();}else if(e.target.id==='new-character-form'){e.preventDefault();const c=createCharacter(new FormData(e.target));db.characters.push(c);db.activeId=c.id;resetCharacterTools();screen='sheet';save();closeModal();render();toast('New character created.');}});
document.getElementById('import-file').addEventListener('change',e=>{handleImport(e.target.files?.[0]);e.target.value='';});
document.getElementById('modal-scrim').addEventListener('click',e=>{if(e.target.id==='modal-scrim')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
// Initial data and offline registration
window.addEventListener('pagehide', () => { if (saveTimer) save(); });
document.addEventListener('visibilitychange', () => { if (document.hidden && saveTimer) save(); });
db.characters.forEach(migrateCharacter);
render();if(!volatile)persist();else updateStatus('Storage unavailable — export backup');document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=ico(el.dataset.icon));if('serviceWorker'in navigator&&/^https?:$/.test(location.protocol)){navigator.serviceWorker.register('./sw.js').catch(()=>{});} 
})();

