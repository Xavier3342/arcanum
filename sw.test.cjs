const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function worker({online = true, cached = null} = {}) {
  const listeners = new Map(), deleted = [], stored = [], downloads = [];
  const response = {ok:true, source:'network', clone(){return this;}};
  const cache = {addAll:async requests=>downloads.push(...requests), put:async (request,result)=>stored.push({request,result})};
  const self = {location:{origin:'https://example.test'},addEventListener:(name,handler)=>listeners.set(name,handler),skipWaiting:async()=>{},clients:{claim:async()=>{}}};
  const caches = {open:async()=>cache,keys:async()=>['arcanum-old','other-app','arcanum-dw2-navigation-3'],delete:async key=>deleted.push(key),match:async request=>cached};
  class Request {constructor(input, options={}){Object.assign(this,typeof input==='string'?{url:input}:input,options);}}
  vm.runInNewContext(fs.readFileSync(require.resolve('./sw.js'),'utf8'),{self,caches,Request,URL,fetch:async()=>{if(!online)throw Error('Offline');return response;}});
  return {deleted,stored,downloads,async event(name,request){const pending=[];let result;listeners.get(name)({request,waitUntil:promise=>pending.push(promise),respondWith:promise=>{result=promise;}});const value=await result;await Promise.all(pending);return value;}};
}
test('offline installation bypasses stale HTTP assets and caches the versioned scripts',async()=>{
  const app=worker();await app.event('install');
  assert.ok(app.downloads.every(request=>request.cache==='reload'));
  for(const file of ['app.js','rules-data.js','styles.css'])assert.ok(app.downloads.some(request=>request.url.includes(file+'?v=20261123-3')));
});
test('activation removes only previous Arcanum caches',async()=>{
  const app=worker();await app.event('activate');assert.deepEqual(app.deleted,['arcanum-old']);
});
test('online navigation replaces a stale cached page',async()=>{
  const app=worker({cached:{source:'stale'}});
  const result=await app.event('fetch',{method:'GET',url:'https://example.test/arcanum/',mode:'navigate'});
  assert.equal(result.source,'network');assert.equal(app.stored.length,1);
});
test('offline navigation falls back to the cached application',async()=>{
  const app=worker({online:false,cached:{source:'offline'}});
  const result=await app.event('fetch',{method:'GET',url:'https://example.test/arcanum/',mode:'navigate'});
  assert.equal(result.source,'offline');assert.equal(app.stored.length,0);
});
