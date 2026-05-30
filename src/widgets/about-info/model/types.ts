export type CompanyStepVariant = 'one' | 'two' | 'three' | 'four';

export interface CompanyInfo {
  note: string;
  value: string;
}

export interface CompanyValues {
  title: string;
  text: string;
}

export interface CompanyQuality {
  title: string;
  text: string;
}

export interface CompanySteps {
  title: string;
  text: string;
  variant: CompanyStepVariant;
}

export interface CompanyContacts {
  title: string;
  email: string;
}
