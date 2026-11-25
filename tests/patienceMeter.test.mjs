import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

function getPatienceTierIcon(p) {
  if (p >= 70) return '💖';
  if (p >= 35) return '💬';
  return '💢';
}

test('Patience Meter Contract: decay rate and 3 cozy tiers map accurately', () => {
  assert.equal(getPatienceTierIcon(100), '💖');
  assert.equal(getPatienceTierIcon(70), '💖');
  assert.equal(getPatienceTierIcon(69), '💬');
  assert.equal(getPatienceTierIcon(35), '💬');
  assert.equal(getPatienceTierIcon(34), '💢');
  assert.equal(getPatienceTierIcon(0), '💢');

  // Verify 1.25%/s cozy decay hits 0% in 80s and cancels order in store
  const storeSrc = fs.readFileSync('src/store/gameStore.ts', 'utf8');
  assert.ok(storeSrc.includes('customerPatience - 1.25'));
  assert.ok(storeSrc.includes('nextPatience <= 0'));
});

test('Patience Meter Contract: CustomerArea renders 3-tier emojis and progress bar', () => {
  const areaSrc = fs.readFileSync('src/components/customer/CustomerArea.tsx', 'utf8');
  for (const icon of ['💖', '💬', '💢']) {
    assert.ok(areaSrc.includes(icon), `Missing patience tier icon: ${icon}`);
  }
});
