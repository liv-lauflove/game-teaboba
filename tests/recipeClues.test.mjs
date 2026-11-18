import test from 'node:test';
import assert from 'node:assert/strict';

// Import getOrderTitle logic contract
function getOrderTitle(order) {
  const parts = [];

  if (order.drink) {
    if (order.drink.base === 'MATCHA') {
      if (order.drink.foam === 'STRAWBERRY_FOAM') parts.push('Strawberry Matcha');
      else if (order.drink.foam === 'UBE_FOAM') parts.push('Ube Matcha');
      else if (order.drink.foam === 'ORIGINAL_FOAM') parts.push('Creamy Matcha');
      else parts.push('Matcha Latte');
    } else {
      if (order.drink.topping === 'BOBA') parts.push('Boba Milk Tea');
      else if (order.drink.topping === 'JELLY') parts.push('Jelly Milk Tea');
      else parts.push('Classic Milk Tea');
    }
  }

  if (order.snack && order.snack !== 'NONE') {
    if (order.snack === 'CHEESECAKE') parts.push('Cheesecake');
    else if (order.snack === 'CHOCO_COOKIE') parts.push('Choco Cookie');
    else if (order.snack === 'MATCHA_COOKIE') parts.push('Matcha Cookie');
  }

  return parts.length > 0 ? parts.join(' + ') : 'Pesanan Spesial';
}

test('Recipe Clues Title Contract: Generates accurate combination titles for matcha foams', () => {
  const strawberryMatcha = {
    drink: { base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'STRAWBERRY_FOAM', topping: 'NONE' },
    snack: 'NONE'
  };
  assert.equal(getOrderTitle(strawberryMatcha), 'Strawberry Matcha');

  const ubeMatcha = {
    drink: { base: 'MATCHA', ice: 'NO_ICE', foam: 'UBE_FOAM', topping: 'NONE' },
    snack: 'NONE'
  };
  assert.equal(getOrderTitle(ubeMatcha), 'Ube Matcha');

  const creamyMatcha = {
    drink: { base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'ORIGINAL_FOAM', topping: 'NONE' },
    snack: 'NONE'
  };
  assert.equal(getOrderTitle(creamyMatcha), 'Creamy Matcha');
});

test('Recipe Clues Title Contract: Generates accurate combo titles with boba and bakery snacks', () => {
  const bobaAndCheesecake = {
    drink: { base: 'MILK_TEA', ice: 'NORMAL_ICE', topping: 'BOBA', foam: 'NONE' },
    snack: 'CHEESECAKE'
  };
  assert.equal(getOrderTitle(bobaAndCheesecake), 'Boba Milk Tea + Cheesecake');

  const ubeMatchaAndMatchaCookie = {
    drink: { base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'UBE_FOAM', topping: 'NONE' },
    snack: 'MATCHA_COOKIE'
  };
  assert.equal(getOrderTitle(ubeMatchaAndMatchaCookie), 'Ube Matcha + Matcha Cookie');
});
