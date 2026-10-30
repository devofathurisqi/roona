import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {cleanCart, cartSummary, orderMessage} from '../src/commerce.ts';
import {initialProductPhoto, productPhotos} from '../src/product-photos.ts';

const products = JSON.parse(readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));
const audit = JSON.parse(readFileSync(new URL('../catalog/color-coverage.json', import.meta.url), 'utf8'));
const expected = {
  'modal-viscose': 33, 'airtech-ultrasoft': 24, 'printed-viscose': 30,
  'bamboo-spandex': 21, 'viscose-highlight': 14, 'paris-legend': 65,
  'motif-tryspan': 82, 'paris-japan': 21, 'gana-instan': 28,
  'zoya-instan': 13, 'bamboo-slip-on': 19, 'hawa-instan': 20,
  'zea-sport-instan': 25, 'aisha-khiban': 20, 'hayla-khiban': 27,
  'lea-oval-khiban': 10,
};

test('all sixteen requested collections expose every audited shade with genuine responsive assets', () => {
  assert.equal(Object.values(expected).reduce((n, count) => n + count, 0), 452);
  assert.deepEqual(Object.keys(audit.products).sort(), Object.keys(expected).sort());
  for (const [id, count] of Object.entries(expected)) {
    const p = products.find(p => p.id === id);
    assert.ok(p, id);
    assert.equal(p.variants.length, count, id);
    assert.equal(new Set(p.variants.map(v => v.id)).size, count, id);
    assert.equal(new Set(p.variants.map(v => v.name)).size, count, id);
    assert.deepEqual(p.variants.map(v => v.name), audit.products[id].colors, id);
    assert.ok(!p.variants.some(v => /sesuai foto|series$/i.test(v.name)), id);
    for (const v of p.variants) assert.match(v.hex, /^#[a-f0-9]{6}$/i, `${id}: ${v.name}`);
  }
  for (const p of products) {
    const images = new Set([...p.images, ...(p.modelImages || []), ...(p.referenceImages || []), ...p.variants.map(v => v.image), ...(p.legacyVariants || []).map(v => v.image)]);
    for (const image of images) for (const suffix of ['', '-360', '-640', '-960']) {
      assert.ok(existsSync(new URL('../public/assets/images/' + image.replace('.webp', suffix + '.webp'), import.meta.url)), `${p.id}: ${image}${suffix}`);
    }
  }
});

test('new Drive charts and each printed series are selectable without wrong-folder colors', () => {
  for (const [id, names] of Object.entries({
    'modal-viscose': ['Vanilla', 'White'],
    'bamboo-spandex': ['Roasted', 'Mahogany'],
    'airtech-ultrasoft': ['Khaki', 'Sheer Blue', 'Almond Tea', 'Misty Grey', 'Vanila'],
    'gana-instan': ['Biscuit', 'Wine', 'Blue Sky', 'Cookie', 'Ekspreso'],
    'hayla-khiban': ['Black', 'Milo', 'Sheer Blue', 'Cookie', 'Creamy Beige'],
    'lea-oval-khiban': ['Black', 'Mahogany', 'Tempered Blue', 'Creamy Latte', 'Vanila'],
    'zea-sport-instan': ['Autumn Wheat', 'Winter Mist', 'Firewood', 'Light Ivory', 'Baby Pink'],
    'printed-viscose': ['Cloudy — Pinky Malt', 'Cloudy — Blue Sky', 'Stormy — Sephia', 'Stormy — Scarlett', 'Windy — Sunset', 'Windy — Cherry Oak'],
    'paris-japan': ['Charcoal', 'Sheer Blue', 'Granola'],
    'motif-tryspan': ['Iliya — Tosca', 'Daisy — Lilac Grey', 'Nebula — Peach Galaxy'],
    'aisha-khiban': ['Coffee', 'Palm Sugar'],
  })) {
    const p = products.find(p => p.id === id);
    for (const name of names) assert.ok(p.variants.some(v => v.name === name), `${id}: ${name}`);
  }
  assert.ok(!products.find(p => p.id === 'hawa-instan').variants.some(v => /mustard/i.test(v.name)));
  for (const id of ['lea-oval-khiban', 'zea-sport-instan']) {
    const p = products.find(p => p.id === id);
    for (const v of p.variants) {
      assert.equal(v.reference, true);
      assert.equal(audit.assets[v.image].sourceFileId, audit.products[id].latestChart);
    }
  }
});

test('every new and existing shade reaches the bag and WhatsApp with ROONA prices', () => {
  for (const p of products) for (const v of p.variants) {
    const line = {productId: p.id, variantId: v.id, quantity: 2};
    assert.deepEqual(cleanCart([line], products), [line]);
    const summary = cartSummary([line], products);
    assert.equal(summary.lines[0].variant.name, v.name);
    assert.equal(summary.subtotal, p.retailPrice === null ? 0 : p.retailPrice * 2);
    const message = orderMessage([line], products);
    assert.ok(message.includes('Varian: ' + v.name), `${p.id}: ${v.id}`);
    assert.ok(message.startsWith('Halo ROONA,'));
  }
});

test('old saved shades retain their descriptions and quantities without becoming new generic choices', () => {
  for (const p of products) for (const v of p.legacyVariants || []) {
    assert.ok(!p.variants.some(choice => choice.id === v.id));
    const line = {productId: p.id, variantId: v.id, quantity: 3};
    assert.deepEqual(cleanCart([line], products), [line]);
    const summary = cartSummary([line], products);
    assert.equal(summary.lines[0].variant.name, v.name);
    assert.equal(summary.count, 3);
    assert.ok(orderMessage([line], products).includes('Varian: ' + v.name));
  }
});

test('model examples and full charts stay accessible while selecting the exact shade photo', () => {
  for (const p of products.filter(p => p.modelImages?.length)) for (const v of p.variants) {
    const gallery = productPhotos(p, v);
    assert.equal(new Set(gallery).size, gallery.length);
    for (const image of [...p.modelImages, ...p.images, ...(p.referenceImages || []), v.image]) assert.ok(gallery.includes(image), `${p.id}: ${image}`);
    assert.equal(initialProductPhoto(p, v), p.modelImages[0]);
    assert.equal(initialProductPhoto(p, v, true), v.image);
  }
  const inquiry = products.find(p => p.id === 'inner-tali');
  assert.equal(initialProductPhoto(inquiry), '');
  assert.deepEqual(productPhotos(inquiry), []);
});
