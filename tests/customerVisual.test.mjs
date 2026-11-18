import test from 'node:test';
import assert from 'node:assert/strict';

test('Customer Visual Data Contract: Presets have complete anime bust metadata', () => {
  const PRESETS = [
    {
      name: "Mimi",
      avatar: "🎀",
      visual: {
        id: 'mimi',
        hairColor: '#E098A5',
        hairStyle: 'TWIN_BUNS',
        shirtColor: '#F7DAD9',
        accessory: 'RIBBON',
        skinTone: '#FFF0E5'
      }
    },
    {
      name: "Luna",
      avatar: "🌸",
      visual: {
        id: 'luna',
        hairColor: '#A899C2',
        hairStyle: 'LONG_WAVY',
        shirtColor: '#E8DFF5',
        accessory: 'BERET',
        skinTone: '#FFF5EB'
      }
    },
    {
      name: "Chloë",
      avatar: "🍰",
      visual: {
        id: 'chloe',
        hairColor: '#F3D296',
        hairStyle: 'BLONDE_CURLS',
        shirtColor: '#FBF2C0',
        accessory: 'APRON',
        skinTone: '#FFF2E8'
      }
    },
    {
      name: "Aoi",
      avatar: "🍵",
      visual: {
        id: 'aoi',
        hairColor: '#3A3F47',
        hairStyle: 'STRAIGHT_DARK',
        shirtColor: '#D4E5D4',
        accessory: 'GLASSES',
        skinTone: '#FFF0EA'
      }
    },
    {
      name: "Bella",
      avatar: "✨",
      visual: {
        id: 'bella',
        hairColor: '#C4815E',
        hairStyle: 'BOB_CUT',
        shirtColor: '#FFD0CD',
        accessory: 'FLOWER',
        skinTone: '#FFF3EB'
      }
    }
  ];

  assert.equal(PRESETS.length, 5);

  const allowedHairStyles = ['TWIN_BUNS', 'LONG_WAVY', 'BLONDE_CURLS', 'STRAIGHT_DARK', 'BOB_CUT'];
  const allowedAccessories = ['RIBBON', 'BERET', 'APRON', 'FLOWER', 'GLASSES'];

  for (const preset of PRESETS) {
    assert.ok(preset.name, 'Customer must have name');
    assert.ok(preset.visual, `${preset.name} must have visual data`);
    assert.ok(preset.visual.id, 'Visual must have ID');
    assert.ok(preset.visual.hairColor.startsWith('#'), 'Hair color must be hex');
    assert.ok(preset.visual.shirtColor.startsWith('#'), 'Shirt color must be hex');
    assert.ok(preset.visual.skinTone.startsWith('#'), 'Skin tone must be hex');
    assert.ok(allowedHairStyles.includes(preset.visual.hairStyle), `Invalid hair style for ${preset.name}`);
    if (preset.visual.accessory) {
      assert.ok(allowedAccessories.includes(preset.visual.accessory), `Invalid accessory for ${preset.name}`);
    }
  }
});
