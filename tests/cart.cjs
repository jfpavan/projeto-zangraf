const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(path, dependencies = {}) {
 const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 const exports = {}; new Function('require','exports',output)(name => dependencies[name] || require(name), exports); return exports;
}
const products = load('src/lib/products.ts');
const validation=load('src/lib/product-validation.ts');
const cart = load('src/lib/cart.ts', {'./products':products,'./product-validation':validation});
const selection = {size:'Quadrado',sheets:'15 lâminas',cover:'Linho',finish:'Fosco'};
function reset() { const store = new Map(); global.sessionStorage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value)}; }
test('Mesmo álbum e configuração acumulam quantidade; acabamento diferente cria item separado',()=>{reset();cart.addToCart('essencial',selection);cart.addToCart('essencial',selection);cart.addToCart('essencial',{...selection,finish:'Acetinado'});const items=cart.readCart();assert.equal(items.length,2);assert.equal(items[0].quantity,2);assert.equal(items[1].quantity,1);});
test('Opções incompatíveis não entram no carrinho',()=>{reset();assert.throws(()=>cart.addToCart('memoria',selection));assert.equal(cart.readCart().length,0);});
test('Carrinho corrompido ou com quantidades inválidas não gera itens utilizáveis',()=>{reset();sessionStorage.setItem(cart.CART_KEY,JSON.stringify([{id:'x',productId:'essencial',configuration:selection,quantity:0}]));assert.deepEqual(cart.readCart(),[]);sessionStorage.setItem(cart.CART_KEY,'{}');assert.deepEqual(cart.readCart(),[]);});
test('Quantidade tem limite e itens podem ser removidos',()=>{reset();cart.writeCart([{id:'x',productId:'essencial',configuration:selection,quantity:99}]);assert.throws(()=>cart.addToCart('essencial',selection));cart.writeCart([]);assert.deepEqual(cart.readCart(),[]);});

test('Configurações iguais agrupam mesmo com campos em outra ordem',()=>{reset();cart.addToCart('essencial',selection);cart.addToCart('essencial',{finish:'Fosco',cover:'Linho',sheets:'15 lâminas',size:'Quadrado'});assert.equal(cart.readCart().length,1);assert.equal(cart.readCart()[0].quantity,2);});
test('JSON quebrado pode ser recuperado ao adicionar um álbum válido',()=>{reset();sessionStorage.setItem(cart.CART_KEY,'{quebrado');assert.deepEqual(cart.readCart(),[]);cart.addToCart('essencial',selection);assert.equal(cart.readCart().length,1);});
test('Falha de armazenamento não confirma inclusão',()=>{reset();sessionStorage.setItem=()=>{throw new Error('Armazenamento indisponível')};assert.throws(()=>cart.addToCart('essencial',selection));assert.deepEqual(cart.readCart(),[]);});

test('Novos modelos cadastrados podem ser configurados sem depender do catálogo fixo',()=>{reset();const product={...products.products[0],id:'novo-modelo',name:'Novo modelo'};cart.addToCart(product,selection);const items=cart.readCart();assert.equal(items[0].productId,'novo-modelo');assert.equal(items[0].product.name,'Novo modelo');});
