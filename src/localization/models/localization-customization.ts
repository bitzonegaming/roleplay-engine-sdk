export interface DefaultNameTranslationCustomization {
  name: string;
}

export interface DefaultNameDescriptionTranslationCustomization {
  name: string;
}

export interface TextTranslationCustomization {
  message: string;
}

export interface ErrorTranslationCustomization {
  message: string;
}

export interface LocalizationCustomization {
  [locale: string]: {
    errors?: {
      [key: string]: ErrorTranslationCustomization;
    };
    locales?: {
      [key: string]: DefaultNameTranslationCustomization;
    };
    metrics?: {
      definitions?: {
        [key: string]: DefaultNameDescriptionTranslationCustomization;
      };
      scopes?: {
        [key: string]: DefaultNameDescriptionTranslationCustomization;
      };
    };
    texts?: {
      [key: string]: TextTranslationCustomization;
    };
    character?: {
      nationalities?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
      genders: {
        [key: string]: DefaultNameTranslationCustomization;
      };
    };
    segment?: {
      definitions?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
      policy?: {
        accessPolicyGroups?: {
          [key: string]: DefaultNameDescriptionTranslationCustomization;
        };
        accessPolicies?: {
          [key: string]: DefaultNameDescriptionTranslationCustomization;
        };
        types?: {
          [key: string]: DefaultNameDescriptionTranslationCustomization;
        };
      };
    };
    reference?: {
      categories?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
    };
    blueprint?: {
      sections?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
      configs?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
      colors?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
      options?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
      categories?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
      configTypes?: {
        [key: string]: DefaultNameTranslationCustomization;
      };
    };
  };
}
