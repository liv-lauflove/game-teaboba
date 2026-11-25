import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Helper: Determine key from recipe components (logic contract)
function getRecipeCategoryKey(drink, snack) {
  if (drink) {
    if (drink.base === 'MATCHA') {
      if (drink.foam === 'STRAWBERRY_FOAM') return 'MATCHA_STRAWBERRY_FOAM';
      if (drink.foam === 'UBE_FOAM') return 'MATCHA_UBE_FOAM';
      if (drink.foam === 'ORIGINAL_FOAM') return 'MATCHA_ORIGINAL_FOAM';
      return 'MATCHA_PLAIN';
    } else {
      if (drink.topping === 'BOBA') return 'MILK_TEA_BOBA';
      if (drink.topping === 'JELLY') return 'MILK_TEA_JELLY';
      return 'MILK_TEA_PLAIN';
    }
  }

  if (snack === 'CHEESECAKE') return 'SNACK_CHEESECAKE_ONLY';
  return 'SNACK_COOKIE_ONLY';
}

function generateStructuredClarification(drink, snack) {
  const parts = [];

  if (drink) {
    const iceText = drink.ice === 'NO_ICE' ? 'tanpa es' : 'dingin';
    if (drink.base === 'MATCHA') {
      let foamText = '';
      if (drink.foam === 'STRAWBERRY_FOAM') foamText = ' + Strawberry Foam pink di atasnya';
      else if (drink.foam === 'UBE_FOAM') foamText = ' + Ube Foam ungu di atasnya';
      else if (drink.foam === 'ORIGINAL_FOAM') foamText = ' + Original Milk Foam lembut di atasnya';

      parts.push(`Matcha ${iceText}${foamText}`);
    } else {
      let toppingText = '';
      if (drink.topping === 'BOBA') toppingText = ' + topping Boba kenyal';
      else if (drink.topping === 'JELLY') toppingText = ' + Grass Jelly';

      parts.push(`Milk Tea ${iceText}${toppingText}`);
    }
  }

  if (snack !== 'NONE') {
    if (snack === 'CHEESECAKE') parts.push('sepotong Classic Cheesecake');
    else if (snack === 'CHOCO_COOKIE') parts.push('Choco Chip Cookie');
    else if (snack === 'MATCHA_COOKIE') parts.push('Matcha Cookie');
  }

  if (parts.length === 0) return 'Maksudku: apa saja yang manis dan lezat ya, terima kasih!';
  return `Maksudku: ${parts.join(' dan ')} ya, terima kasih!`;
}

test('Dialogue Database File Integrity: dialogueDatabase.ts exists and declares all 5 personas', () => {
  const filePath = path.resolve('src/data/dialogueDatabase.ts');
  assert.ok(fs.existsSync(filePath), 'dialogueDatabase.ts must exist');

  const content = fs.readFileSync(filePath, 'utf8');
  const expectedCharacters = ['Mimi', 'Luna', 'Chloë', 'Aoi', 'Bella'];
  for (const name of expectedCharacters) {
    assert.ok(content.includes(`${name}:`), `Database must contain entry for persona ${name}`);
  }

  assert.ok(content.includes('getCustomerDialogue'), 'Database must export getCustomerDialogue');
  assert.ok(content.includes('GENERAL_RECIPE_DIALOGUES'), 'Database must export GENERAL_RECIPE_DIALOGUES');
});

test('Dialogue Category Mapping Contract: Accurately maps recipe components to dialogue keys', () => {
  assert.equal(
    getRecipeCategoryKey({ base: 'MILK_TEA', ice: 'NORMAL_ICE', topping: 'BOBA' }, 'NONE'),
    'MILK_TEA_BOBA'
  );

  assert.equal(
    getRecipeCategoryKey({ base: 'MILK_TEA', ice: 'NO_ICE', topping: 'JELLY' }, 'NONE'),
    'MILK_TEA_JELLY'
  );

  assert.equal(
    getRecipeCategoryKey({ base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'STRAWBERRY_FOAM' }, 'NONE'),
    'MATCHA_STRAWBERRY_FOAM'
  );

  assert.equal(
    getRecipeCategoryKey({ base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'UBE_FOAM' }, 'NONE'),
    'MATCHA_UBE_FOAM'
  );

  assert.equal(
    getRecipeCategoryKey({ base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'ORIGINAL_FOAM' }, 'NONE'),
    'MATCHA_ORIGINAL_FOAM'
  );

  assert.equal(
    getRecipeCategoryKey(null, 'CHEESECAKE'),
    'SNACK_CHEESECAKE_ONLY'
  );
});

test('Structured Clarification Contract: Accurately formats combo and standalone orders', () => {
  const comboClarification = generateStructuredClarification(
    { base: 'MATCHA', ice: 'NORMAL_ICE', foam: 'UBE_FOAM' },
    'CHEESECAKE'
  );
  assert.equal(
    comboClarification,
    'Maksudku: Matcha dingin + Ube Foam ungu di atasnya dan sepotong Classic Cheesecake ya, terima kasih!'
  );

  const cookieClarification = generateStructuredClarification(
    null,
    'CHOCO_COOKIE'
  );
  assert.equal(
    cookieClarification,
    'Maksudku: Choco Chip Cookie ya, terima kasih!'
  );
});

