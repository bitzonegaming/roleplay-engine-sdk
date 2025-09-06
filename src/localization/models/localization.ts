import { TemplateCategory } from '../../template/models/template-category';

export interface DefaultNameTranslation {
  name: string;
}

export interface DefaultNameDescriptionTranslation {
  name: string;
  description: string;
}

export interface TextTranslation {
  message: string;
  description?: string;
  parameters: { key: string; description: string; example: string }[];
}

export interface ErrorTranslation {
  message: string;
  description: string;
  parameters: { key: string; description: string; example: string }[];
}

export interface TemplateTextTranslation {
  message: string;
  description: string;
  parameters: { key: string; description: string; example: string }[];
}

export interface TemplateConfigTranslation {
  message: string;
  description: string;
}

export interface LocalizationData {
  errors?: {
    [key: string]: ErrorTranslation;
  };
  locales?: {
    [key: string]: DefaultNameTranslation;
  };
  metrics?: {
    definitions?: {
      [key: string]: DefaultNameDescriptionTranslation;
    };
    scopes?: {
      [key: string]: DefaultNameDescriptionTranslation;
    };
  };
  texts?: {
    [key: string]: TextTranslation;
  };
  character?: {
    nationalities?: {
      [key: string]: DefaultNameTranslation;
    };
    genders: {
      [key: string]: DefaultNameTranslation;
    };
  };
  segment?: {
    definitions?: {
      [key: string]: DefaultNameTranslation;
    };
    policy?: {
      accessPolicyGroups?: {
        [key: string]: DefaultNameDescriptionTranslation;
      };
      accessPolicies?: {
        [key: string]: DefaultNameDescriptionTranslation;
      };
      types?: {
        [key: string]: DefaultNameDescriptionTranslation;
      };
    };
  };
  reference?: {
    categories?: {
      [key: string]: DefaultNameTranslation;
    };
  };
  blueprint?: {
    sections?: {
      [key: string]: DefaultNameTranslation;
    };
    configs?: {
      [key: string]: DefaultNameTranslation;
    };
    colors?: {
      [key: string]: DefaultNameTranslation;
    };
    options?: {
      [key: string]: DefaultNameTranslation;
    };
    categories?: {
      [key: string]: DefaultNameTranslation;
    };
    configTypes?: {
      [key: string]: DefaultNameTranslation;
    };
  };
  templates?: {
    [templateId: string]: {
      [category in TemplateCategory]: {
        TEXTS: {
          [key: string]: TemplateTextTranslation;
        };
        CONFIGURATION: {
          [key: string]: TemplateConfigTranslation;
        };
      };
    };
  };
}

export interface Localization {
  [locale: string]: LocalizationData;
}
