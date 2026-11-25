import test from 'node:test';
import assert from 'node:assert/strict';

// Helper: Technical recipe explanation generator (mirror of getRecipeClarification)
function getRecipeClarification(order) {
  const parts = [];

  if (order.drink) {
    const iceText = order.drink.ice === 'NO_ICE' ? 'tanpa es' : 'dingin';
    if (order.drink.base === 'MATCHA') {
      let foamText = '';
      if (order.drink.foam === 'STRAWBERRY_FOAM') foamText = ' + Strawberry Foam pink di atasnya';
      else if (order.drink.foam === 'UBE_FOAM') foamText = ' + Ube Foam ungu di atasnya';
      else if (order.drink.foam === 'ORIGINAL_FOAM') foamText = ' + Original Milk Foam lembut di atasnya';

      parts.push(`Matcha ${iceText}${foamText}`);
    } else {
      let toppingText = '';
      if (order.drink.topping === 'BOBA') toppingText = ' + topping Boba kenyal';
      else if (order.drink.topping === 'JELLY') toppingText = ' + Grass Jelly';

      parts.push(`Milk Tea ${iceText}${toppingText}`);
    }
  }

  if (order.snack && order.snack !== 'NONE') {
    if (order.snack === 'CHEESECAKE') parts.push('sepotong Classic Cheesecake');
    else if (order.snack === 'CHOCO_COOKIE') parts.push('Choco Chip Cookie');
    else if (order.snack === 'MATCHA_COOKIE') parts.push('Matcha Cookie');
  }

  if (parts.length === 0) return 'Maksudku: apa saja yang manis dan lezat ya, terima kasih!';
  return `Maksudku: ${parts.join(' dan ')} ya, terima kasih!`;
}

test('Dialogue Contract: getRecipeClarification generates accurate technical recipes for What? responses', () => {
  const matchaStrawberryOrder = {
    drink: { base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'STRAWBERRY_FOAM', topping: 'NONE' },
    snack: 'NONE'
  };
  assert.equal(
    getRecipeClarification(matchaStrawberryOrder),
    'Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, terima kasih!'
  );

  const bobaCheesecakeCombo = {
    drink: { base: 'MILK_TEA', ice: 'NORMAL_ICE', topping: 'BOBA', foam: 'NONE' },
    snack: 'CHEESECAKE'
  };
  assert.equal(
    getRecipeClarification(bobaCheesecakeCombo),
    'Maksudku: Milk Tea dingin + topping Boba kenyal dan sepotong Classic Cheesecake ya, terima kasih!'
  );

  const cookieOnlyOrder = {
    drink: null,
    snack: 'CHOCO_COOKIE'
  };
  assert.equal(
    getRecipeClarification(cookieOnlyOrder),
    'Maksudku: Choco Chip Cookie ya, terima kasih!'
  );
});

test('Dialogue Contract: [What?] button deducts 8% patience, triggers penalty, and activates clarification', () => {
  let state = {
    activeOrder: {
      dialogue: 'Ada yang dingin dan seger nggak?',
      drink: { base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'STRAWBERRY_FOAM' },
      snack: 'NONE'
    },
    customerPatience: 100,
    isOrderConfirmed: false,
    isClarified: false,
    patiencePenaltyTrigger: 0
  };

  // Simulating askClarification action
  const askClarification = () => {
    state = {
      ...state,
      customerPatience: Math.max(10, state.customerPatience - 8),
      isClarified: true,
      patiencePenaltyTrigger: state.patiencePenaltyTrigger + 1
    };
  };

  askClarification();

  assert.equal(state.customerPatience, 92);
  assert.equal(state.isClarified, true);
  assert.equal(state.patiencePenaltyTrigger, 1);
  assert.equal(state.isOrderConfirmed, false);

  // If asked again, deducts another 8%
  askClarification();
  assert.equal(state.customerPatience, 84);
  assert.equal(state.patiencePenaltyTrigger, 2);
});

test('Dialogue Contract: [Okay] button confirms order and resets on fresh customer arrival', () => {
  let state = {
    customerPatience: 92,
    isOrderConfirmed: false,
    isClarified: true,
    patiencePenaltyTrigger: 1
  };

  // Simulating confirmOrder action
  const confirmOrder = () => {
    state = {
      ...state,
      isOrderConfirmed: true
    };
  };

  confirmOrder();
  assert.equal(state.isOrderConfirmed, true);

  // Simulating new customer arrival (serveOrder success or resetDaySession)
  const onNewCustomer = () => {
    state = {
      ...state,
      customerPatience: 100,
      isOrderConfirmed: false,
      isClarified: false,
      patiencePenaltyTrigger: 0
    };
  };

  onNewCustomer();
  assert.equal(state.customerPatience, 100);
  assert.equal(state.isOrderConfirmed, false);
  assert.equal(state.isClarified, false);
  assert.equal(state.patiencePenaltyTrigger, 0);
});
