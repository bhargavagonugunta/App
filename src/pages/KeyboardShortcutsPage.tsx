import React from 'react';
import {ScrollView, View} from 'react-native';
import {isEmpty, chain} from 'lodash';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import MenuItem from '@components/MenuItem';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import type {TranslationPaths} from '@src/languages/types';
import useThemeStyles from '@hooks/useThemeStyles';
import KeyboardShortcut from '@libs/KeyboardShortcut';
import CONST from '@src/CONST';

function KeyboardShortcutsPage() {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const shortcuts = chain(CONST.KEYBOARD_SHORTCUTS)
        .filter((shortcut) => !isEmpty(shortcut.descriptionKey))
        .map((shortcut) => {
            const platformAdjustedModifiers = KeyboardShortcut.getPlatformEquivalentForKeys(shortcut.modifiers);
            return {
                displayName: KeyboardShortcut.getDisplayName(shortcut.shortcutKey, platformAdjustedModifiers),
                descriptionKey: shortcut.descriptionKey,
            };
        })
        .value();

    type Shortcut = {
        displayName: string;
        descriptionKey: string | null; // Update the type to allow for null values
    };
    /**
     * Render the information of a single shortcut
     * @param shortcut - The shortcut to render
     */
    const renderShortcut = (shortcut: Shortcut) => (
        <MenuItem
            key={shortcut.displayName}
            title={shortcut.displayName}
            description={translate(`keyboardShortcutsPage.shortcuts.${shortcut.descriptionKey}` as TranslationPaths)}
            wrapperStyle={[styles.ph0, styles.cursorAuto]}
            interactive={false}
        />
    );

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            testID={KeyboardShortcutsPage.displayName}
        >
            <HeaderWithBackButton title={translate('keyboardShortcutsPage.title')} />
            <ScrollView contentContainerStyle={styles.flexGrow1}>
                <View style={[styles.ph5, styles.pv3]}>
                    <Text style={[styles.mb3, styles.webViewStyles.baseFontStyle]}>{translate('keyboardShortcutsPage.subtitle')}</Text>
                    {shortcuts.map(renderShortcut)}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

KeyboardShortcutsPage.displayName = 'KeyboardShortcutsPage';

export default KeyboardShortcutsPage;
