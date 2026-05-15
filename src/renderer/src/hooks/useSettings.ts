import { useState, useEffect } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    window.api.getSettings().then((data) => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveChanges = async () => {
    if (!settings) return;
    await window.api.saveAllSettings(settings);
    setHasChanges(false);
    // Optional: add a notification or toast here
  };

  return { settings, updateSetting, saveChanges, hasChanges, isLoading };
};

