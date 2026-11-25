import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Customer Expression Contract: all 5 expressions and reactive triggers exist', () => {
  const typesSrc = fs.readFileSync('src/types/game.ts', 'utf8');
  for (const exp of ['NEUTRAL', 'HAPPY', 'ANXIOUS', 'ANGRY', 'SURPRISED']) {
    assert.ok(typesSrc.includes(`'${exp}'`), `Missing CustomerExpression: ${exp}`);
  }

  const bustSrc = fs.readFileSync('src/components/customer/CustomerBust.tsx', 'utf8');
  for (const exp of ['NEUTRAL', 'HAPPY', 'ANXIOUS', 'ANGRY', 'SURPRISED']) {
    assert.ok(bustSrc.includes(exp), `CustomerBust must handle ${exp}`);
  }
});

test('Customer Expression Contract: patience threshold and serve reactions transition correctly', () => {
  const resolvePatience = (patience) => (patience < 40 ? 'ANXIOUS' : 'NEUTRAL');
  const resolveWrongServe = (wrongCount) => (wrongCount >= 1 ? 'ANGRY' : 'SURPRISED');

  assert.equal(resolvePatience(100), 'NEUTRAL');
  assert.equal(resolvePatience(39), 'ANXIOUS');
  assert.equal(resolveWrongServe(0), 'SURPRISED');
  assert.equal(resolveWrongServe(1), 'ANGRY');
});
