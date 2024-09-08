import { Option } from '@/components/CustomDropdown';

export const contactMediaTypes: Array<Option> = [
  { title: 'لقاء شخصي', value: 0 },
  { title: 'إتصال فردي', value: 1 },
  { title: 'محاضرة جماعية', value: 2 },
  { title: 'رسائل واتساب', value: 3 },
  { title: 'غير ذلك', value: 4 },
];

export const relationShipTypes: Array<Option> = [
  { title: 'قريب', value: 0 },
  { title: 'صديق', value: 1 },
  { title: 'جار', value: 2 },
  { title: 'عن طريق الانترنت', value: 3 },
];

export const groupContactMediaTypes: Array<Option> = [
  { title: 'مجموعات الواتساب', value: 0 },
  { title: 'مجموعات الفيسبوك', value: 1 },
  { title: 'اصدقاء الفيسبوك', value: 2 },
  { title: 'محاضرة عامة', value: 3 },
  { title: 'اخرى', value: 4 },
];

export const countryCodeList: Array<Option> = [
  {title: "لبنان +961", value: "+961"},
  {title: "تركيا +90", value: "+90"},
];