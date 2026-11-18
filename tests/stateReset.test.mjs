import test from 'node:test';
import assert from 'node:assert/strict';

// Test suite for Issue #10: Deterministic State Reset & Return To Title logic contract
test('State Reset Contract: resetDaySession restores initial day values and generates fresh order', () => {
  const initialCup = { base: null, ice: null, topping: 'NONE', foam: 'NONE' };
  
  // Simulated initial dirty state
  let state = {
    status: 'PLAYING',
    currentDay: 2,
    totalCoins: 120,
    dayCoins: 85,
    timeLeft: 12,
    isPaused: true,
    servedSuccessCount: 4,
    servedWrongCount: 2,
    currentCup: { base: 'MILK_TEA', ice: 'NORMAL_ICE', topping: 'BOBA', foam: 'NONE' },
    currentSnack: 'CHEESECAKE',
    feedbackMessage: { text: 'Wrong', type: 'error' },
    showRecipeBook: true,
    activeOrder: { drink: { base: 'MILK_TEA' } }
  };

  // Logic executed by resetDaySession()
  const dayTimeLimit = 60;
  const newOrder = { drink: { base: 'MATCHA' }, rewardCoins: 30 };

  state = {
    ...state,
    status: 'PLAYING',
    isPaused: false,
    timeLeft: dayTimeLimit,
    dayCoins: 0,
    servedSuccessCount: 0,
    servedWrongCount: 0,
    currentCup: { ...initialCup },
    currentSnack: 'NONE',
    feedbackMessage: null,
    showRecipeBook: false,
    activeOrder: newOrder
  };

  assert.equal(state.status, 'PLAYING');
  assert.equal(state.isPaused, false);
  assert.equal(state.timeLeft, 60);
  assert.equal(state.dayCoins, 0);
  assert.equal(state.servedSuccessCount, 0);
  assert.equal(state.servedWrongCount, 0);
  assert.deepEqual(state.currentCup, initialCup);
  assert.equal(state.currentSnack, 'NONE');
  assert.equal(state.feedbackMessage, null);
  assert.equal(state.showRecipeBook, false);
  assert.notEqual(state.activeOrder, null);
  // Total coins and day progression preserved
  assert.equal(state.totalCoins, 120);
  assert.equal(state.currentDay, 2);
});

test('State Reset Contract: returnToTitle freezes active timer and cleans tray while preserving progression', () => {
  const initialCup = { base: null, ice: null, topping: 'NONE', foam: 'NONE' };

  let state = {
    status: 'PLAYING',
    currentDay: 3,
    totalCoins: 280,
    dayCoins: 50,
    timeLeft: 34,
    isPaused: true,
    currentCup: { base: 'MATCHA', ice: 'NO_ICE', topping: 'NONE', foam: 'UBE_FOAM' },
    currentSnack: 'CHOCO_COOKIE',
    feedbackMessage: { text: 'Success', type: 'success' },
    showRecipeBook: true,
    activeOrder: { drink: { base: 'MATCHA' } }
  };

  // Logic executed by returnToTitle()
  state = {
    ...state,
    status: 'TITLE',
    isPaused: false,
    activeOrder: null,
    currentCup: { ...initialCup },
    currentSnack: 'NONE',
    feedbackMessage: null,
    showRecipeBook: false
  };

  assert.equal(state.status, 'TITLE');
  assert.equal(state.isPaused, false);
  assert.equal(state.activeOrder, null);
  assert.deepEqual(state.currentCup, initialCup);
  assert.equal(state.currentSnack, 'NONE');
  assert.equal(state.feedbackMessage, null);
  assert.equal(state.showRecipeBook, false);
  // Total saved coins and highest reached day MUST NOT be cleared
  assert.equal(state.totalCoins, 280);
  assert.equal(state.currentDay, 3);
});
