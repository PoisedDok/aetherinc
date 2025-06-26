/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Colors } from '../colors.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { LoadedSettings, SettingScope } from '../../config/settings.js';
import { AuthType } from '@google/gemini-cli-core';
import { validateAuthMethod } from '../../config/auth.js';

interface AuthDialogProps {
  onSelect: (authMethod: string | undefined, scope: SettingScope) => void;
  onHighlight: (authMethod: string | undefined) => void;
  settings: LoadedSettings;
  initialErrorMessage?: string | null;
}

export function AuthDialog({
  onSelect,
  onHighlight,
  settings,
  initialErrorMessage,
}: AuthDialogProps): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialErrorMessage || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const allAuthItems = [
    {
      label: 'Login with Google',
      value: AuthType.LOGIN_WITH_GOOGLE_PERSONAL,
    },
    { label: 'Local LLM (llama.cpp)', value: AuthType.USE_LLAMACPP },
    { label: 'Gemini API Key', value: AuthType.USE_GEMINI },
    {
      label: 'Login with Google Workspace',
      value: AuthType.LOGIN_WITH_GOOGLE_ENTERPRISE,
    },
    { label: 'Vertex AI', value: AuthType.USE_VERTEX_AI },
  ];

  const isSelectedAuthInMore = allAuthItems
    .slice(3)
    .some((item) => item.value === settings.merged.selectedAuthType);

  const [showAll, setShowAll] = useState(isSelectedAuthInMore);

  const initialAuthItems = [
    ...allAuthItems.slice(0, 3),
    { label: 'More...', value: 'more' },
  ];

  const items = showAll ? allAuthItems : initialAuthItems;

  let initialAuthIndex = items.findIndex(
    (item) => item.value === settings.merged.selectedAuthType,
  );

  if (initialAuthIndex === -1) {
    initialAuthIndex = 0;
  }

  const handleAuthSelect = async (authMethod: string) => {
    if (authMethod === 'more') {
      setShowAll(true);
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('Validating...');
    
    try {
      const error = await validateAuthMethod(authMethod);
      if (error) {
        setErrorMessage(error);
      } else {
        setErrorMessage(null);
        onSelect(authMethod, SettingScope.User);
      }
    } catch (err) {
      setErrorMessage(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthHighlight = (authMethod: string | undefined) => {
    onHighlight(authMethod);
  };

  useInput((input, key) => {
    if (key.escape) {
      // On escape, revert to the original auth method (or none if not set)
      onSelect(settings.merged.selectedAuthType, SettingScope.User);
    }
  });

  return (
    <Box flexDirection="column">
      <Box flexDirection="column" marginY={1}>
        <Text>Select your authentication method:</Text>
        <Text color={Colors.Gray}>
          (Use arrow keys to navigate, Enter to select)
        </Text>
      </Box>

      <RadioButtonSelect
        items={items}
        initialIndex={initialAuthIndex}
        onSelect={handleAuthSelect}
        onHighlight={handleAuthHighlight}
      />

      {errorMessage && (
        <Box flexDirection="column" marginTop={1}>
          <Text color={isLoading ? Colors.Gray : Colors.AccentRed}>
            {errorMessage}
          </Text>
        </Box>
      )}

      <Box marginTop={1} flexDirection="column">
        <Text color={Colors.Gray}>Press Escape to cancel</Text>
      </Box>
    </Box>
  );
}
