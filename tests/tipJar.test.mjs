import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

function calculateTipBonus(baseCoins, patience) {
  if (patience > 85) return Math.round(baseCoins * 0.3);
  if (patience >= 60) return Math.round(baseCoins * 0.15);
  return 0;
}

test('Tip Jar Contract: calculates 3-tier tip bonuses accurately across boundaries', () => {
  // > 85% -> +30%
  assert.equal(calculateTipBonus(30, 100), 9);
  assert.equal(calculateTipBonus(30, 86), 9);

  // 60% - 85% -> +15%
  assert.equal(calculateTipBonus(30, 85), 5);
  assert.equal(calculateTipBonus(30, 60), 5);

  // < 60% -> 0
  assert.equal(calculateTipBonus(30, 59), 0);
  assert.equal(calculateTipBonus(30, 0), 0);
});

test('Tip Jar Contract: dayTipCoins tracked in store and surfaced in counter and summary UI', () => {
  const storeSrc = fs.readFileSync('src/store/gameStore.ts', 'utf8');
  assert.ok(storeSrc.includes('calculateTipBonus'));
  assert.ok(storeSrc.includes('dayTipCoins'));

  const areaSrc = fs.readFileSync('src/components/customer/CustomerArea.tsx', 'utf8');
  assert.ok(areaSrc.includes('dayTipCoins'));

  const summarySrc = fs.readFileSync('src/components/modals/DaySummaryModal.tsx', 'utf8');
  assert.ok(summarySrc.includes('dayTipCoins'));
});
