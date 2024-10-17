/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Haystack Software Inc. All rights reserved.
 *  Licensed under the PolyForm Strict License 1.0.0. See License.txt in the project root for
 *  license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See code-license.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { KeyboardLayoutContribution } from 'vs/workbench/services/keybinding/browser/keyboardLayouts/_.contribution';


KeyboardLayoutContribution.INSTANCE.registerKeyboardLayout({
	layout: { id: 'com.apple.keylayout.US', lang: 'en', localizedName: 'U.S.', isUSStandard: true },
	secondaryLayouts: [
		{ id: 'com.apple.keylayout.ABC', lang: 'en', localizedName: 'ABC' },
		{ id: 'com.sogou.inputmethod.sogou.pinyin', lang: 'zh-Hans', localizedName: 'Pinyin - Simplified' },
		{ id: 'com.apple.inputmethod.Kotoeri.Roman', lang: 'en', localizedName: 'Romaji' },
		{ id: 'com.apple.inputmethod.Kotoeri.Japanese', lang: 'ja', localizedName: 'Hiragana' },
		{ id: 'com.apple.keylayout.Australian', lang: 'en', localizedName: 'Australian' },
		{ id: 'com.apple.keylayout.Canadian', lang: 'en', localizedName: 'Canadian English' },
		{ id: 'com.apple.keylayout.Brazilian', lang: 'pt', localizedName: 'Brazilian' },
	],
	mapping: {
		KeyA: ['a', 'A', 'å', 'Å', 0],
		KeyB: ['b', 'B', '∫', 'ı', 0],
		KeyC: ['c', 'C', 'ç', 'Ç', 0],
		KeyD: ['d', 'D', '∂', 'Î', 0],
		KeyE: ['e', 'E', '´', '´', 4],
		KeyF: ['f', 'F', 'ƒ', 'Ï', 0],
		KeyG: ['g', 'G', '©', '˝', 0],
		KeyH: ['h', 'H', '˙', 'Ó', 0],
		KeyI: ['i', 'I', 'ˆ', 'ˆ', 4],
		KeyJ: ['j', 'J', '∆', 'Ô', 0],
		KeyK: ['k', 'K', '˚', '', 0],
		KeyL: ['l', 'L', '¬', 'Ò', 0],
		KeyM: ['m', 'M', 'µ', 'Â', 0],
		KeyN: ['n', 'N', '˜', '˜', 4],
		KeyO: ['o', 'O', 'ø', 'Ø', 0],
		KeyP: ['p', 'P', 'π', '∏', 0],
		KeyQ: ['q', 'Q', 'œ', 'Œ', 0],
		KeyR: ['r', 'R', '®', '‰', 0],
		KeyS: ['s', 'S', 'ß', 'Í', 0],
		KeyT: ['t', 'T', '†', 'ˇ', 0],
		KeyU: ['u', 'U', '¨', '¨', 4],
		KeyV: ['v', 'V', '√', '◊', 0],
		KeyW: ['w', 'W', '∑', '„', 0],
		KeyX: ['x', 'X', '≈', '˛', 0],
		KeyY: ['y', 'Y', '¥', 'Á', 0],
		KeyZ: ['z', 'Z', 'Ω', '¸', 0],
		Digit1: ['1', '!', '¡', '⁄', 0],
		Digit2: ['2', '@', '™', '€', 0],
		Digit3: ['3', '#', '£', '‹', 0],
		Digit4: ['4', '$', '¢', '›', 0],
		Digit5: ['5', '%', '∞', 'ﬁ', 0],
		Digit6: ['6', '^', '§', 'ﬂ', 0],
		Digit7: ['7', '&', '¶', '‡', 0],
		Digit8: ['8', '*', '•', '°', 0],
		Digit9: ['9', '(', 'ª', '·', 0],
		Digit0: ['0', ')', 'º', '‚', 0],
		Enter: [],
		Escape: [],
		Backspace: [],
		Tab: [],
		Space: [' ', ' ', ' ', ' ', 0],
		Minus: ['-', '_', '–', '—', 0],
		Equal: ['=', '+', '≠', '±', 0],
		BracketLeft: ['[', '{', '“', '”', 0],
		BracketRight: [']', '}', '‘', '’', 0],
		Backslash: ['\\', '|', '«', '»', 0],
		Semicolon: [';', ':', '…', 'Ú', 0],
		Quote: ['\'', '"', 'æ', 'Æ', 0],
		Backquote: ['`', '~', '`', '`', 4],
		Comma: [',', '<', '≤', '¯', 0],
		Period: ['.', '>', '≥', '˘', 0],
		Slash: ['/', '?', '÷', '¿', 0],
		CapsLock: [],
		F1: [],
		F2: [],
		F3: [],
		F4: [],
		F5: [],
		F6: [],
		F7: [],
		F8: [],
		F9: [],
		F10: [],
		F11: [],
		F12: [],
		Insert: [],
		Home: [],
		PageUp: [],
		Delete: [],
		End: [],
		PageDown: [],
		ArrowRight: [],
		ArrowLeft: [],
		ArrowDown: [],
		ArrowUp: [],
		NumLock: [],
		NumpadDivide: ['/', '/', '/', '/', 0],
		NumpadMultiply: ['*', '*', '*', '*', 0],
		NumpadSubtract: ['-', '-', '-', '-', 0],
		NumpadAdd: ['+', '+', '+', '+', 0],
		NumpadEnter: [],
		Numpad1: ['1', '1', '1', '1', 0],
		Numpad2: ['2', '2', '2', '2', 0],
		Numpad3: ['3', '3', '3', '3', 0],
		Numpad4: ['4', '4', '4', '4', 0],
		Numpad5: ['5', '5', '5', '5', 0],
		Numpad6: ['6', '6', '6', '6', 0],
		Numpad7: ['7', '7', '7', '7', 0],
		Numpad8: ['8', '8', '8', '8', 0],
		Numpad9: ['9', '9', '9', '9', 0],
		Numpad0: ['0', '0', '0', '0', 0],
		NumpadDecimal: ['.', '.', '.', '.', 0],
		IntlBackslash: ['§', '±', '§', '±', 0],
		ContextMenu: [],
		NumpadEqual: ['=', '=', '=', '=', 0],
		F13: [],
		F14: [],
		F15: [],
		F16: [],
		F17: [],
		F18: [],
		F19: [],
		F20: [],
		AudioVolumeMute: [],
		AudioVolumeUp: ['', '=', '', '=', 0],
		AudioVolumeDown: [],
		NumpadComma: [],
		IntlRo: [],
		KanaMode: [],
		IntlYen: [],
		ControlLeft: [],
		ShiftLeft: [],
		AltLeft: [],
		MetaLeft: [],
		ControlRight: [],
		ShiftRight: [],
		AltRight: [],
		MetaRight: []
	}
});