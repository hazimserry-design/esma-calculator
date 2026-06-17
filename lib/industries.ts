import type { IndustryId, LocalizedText } from "./types";

/**
 * Per-industry vocabulary used to personalize content ideas, the calendar,
 * and the PDF. Each fragment is written so it reads naturally when dropped
 * into the idea templates in both English and Egyptian Arabic.
 */
export interface IndustryVocab {
  id: IndustryId;
  label: LocalizedText;
  /** the kind of business, e.g. "a clinic" / "عيادة" */
  business: LocalizedText;
  /** what they deliver, e.g. "treatment" / "العلاج" */
  service: LocalizedText;
  /** who buys, e.g. "patient" / "المريض" */
  customer: LocalizedText;
  /** the outcome customers want */
  result: LocalizedText;
  /** the pain point customers face */
  problem: LocalizedText;
  /** the conversion action / offer */
  offer: LocalizedText;
}

export const INDUSTRIES: IndustryVocab[] = [
  {
    id: "consultant",
    label: { en: "Consultant / Coach", ar: "مستشار / كوتش" },
    business: { en: "a coach", ar: "كوتش" },
    service: { en: "coaching", ar: "الكوتشينج" },
    customer: { en: "client", ar: "العميل" },
    result: { en: "a real change in their life", ar: "تغيير حقيقي في حياتهم" },
    problem: { en: "feeling stuck", ar: "الإحساس إنه واقف مكانه" },
    offer: { en: "your coaching program", ar: "البرنامج بتاعك" },
  },
  {
    id: "agency",
    label: { en: "Agency", ar: "وكالة / إيجنسي" },
    business: { en: "an agency", ar: "إيجنسي" },
    service: { en: "marketing", ar: "التسويق" },
    customer: { en: "client", ar: "العميل" },
    result: { en: "more leads and sales", ar: "عملاء ومبيعات أكتر" },
    problem: { en: "wasting money on ads", ar: "ضياع فلوس الإعلانات" },
    offer: { en: "a free strategy call", ar: "جلسة استشارة مجانية" },
  },
  {
    id: "ecommerce",
    label: { en: "E-commerce", ar: "متجر إلكتروني" },
    business: { en: "an online store", ar: "متجر أونلاين" },
    service: { en: "our products", ar: "المنتجات بتاعتنا" },
    customer: { en: "customer", ar: "العميل" },
    result: { en: "products they'll love", ar: "منتجات هتعجبهم" },
    problem: { en: "buying low-quality products", ar: "شراء منتجات وحشة" },
    offer: { en: "our best-selling product", ar: "المنتج الأكتر مبيعًا" },
  },
  {
    id: "restaurant",
    label: { en: "Restaurant / Cafe", ar: "مطعم / كافيه" },
    business: { en: "a restaurant", ar: "مطعم" },
    service: { en: "our food", ar: "الأكل بتاعنا" },
    customer: { en: "guest", ar: "الزبون" },
    result: { en: "an amazing meal", ar: "أكلة تحفة" },
    problem: { en: "ordering food that disappoints", ar: "طلب أكل بيخيب الأمل" },
    offer: { en: "your next visit", ar: "زيارتك الجاية" },
  },
  {
    id: "gym",
    label: { en: "Gym / Fitness", ar: "جيم / لياقة" },
    business: { en: "a gym", ar: "جيم" },
    service: { en: "training", ar: "التمرين" },
    customer: { en: "member", ar: "المتمرن" },
    result: { en: "the body they want", ar: "الجسم اللي نفسهم فيه" },
    problem: { en: "training with no results", ar: "التمرين من غير نتيجة" },
    offer: { en: "a free trial session", ar: "حصة تجريبية مجانية" },
  },
  {
    id: "realestate",
    label: { en: "Real Estate", ar: "عقارات" },
    business: { en: "a real estate expert", ar: "خبير عقارات" },
    service: { en: "property advice", ar: "الاستشارة العقارية" },
    customer: { en: "buyer", ar: "المشتري" },
    result: { en: "the right property", ar: "العقار المناسب" },
    problem: { en: "overpaying for the wrong unit", ar: "دفع زيادة في وحدة غلط" },
    offer: { en: "a property consultation", ar: "استشارة عقارية" },
  },
  {
    id: "clinic",
    label: { en: "Clinic / Dentist", ar: "عيادة / دكتور أسنان" },
    business: { en: "a clinic", ar: "عيادة" },
    service: { en: "treatment", ar: "العلاج" },
    customer: { en: "patient", ar: "المريض" },
    result: { en: "a healthy, confident smile", ar: "ابتسامة صحية وواثقة" },
    problem: { en: "ignoring a health problem", ar: "إهمال مشكلة صحية" },
    offer: { en: "your first visit", ar: "كشف أول مرة" },
  },
  {
    id: "course",
    label: { en: "Online Course / Education", ar: "كورس أونلاين / تعليم" },
    business: { en: "an online course", ar: "كورس أونلاين" },
    service: { en: "the course", ar: "الكورس" },
    customer: { en: "student", ar: "الطالب" },
    result: { en: "a new skill they can use", ar: "مهارة جديدة يقدر يشتغل بيها" },
    problem: { en: "wasting time on the wrong courses", ar: "ضياع وقت في كورسات مش مفيدة" },
    offer: { en: "joining the course", ar: "الاشتراك في الكورس" },
  },
  {
    id: "localservice",
    label: { en: "Local Service Business", ar: "خدمة محلية" },
    business: { en: "a local service", ar: "خدمة محلية" },
    service: { en: "the service", ar: "الخدمة" },
    customer: { en: "customer", ar: "العميل" },
    result: { en: "the job done right", ar: "الشغل يتعمل صح" },
    problem: { en: "hiring the wrong people", ar: "التعامل مع ناس مش كويسة" },
    offer: { en: "a free quote", ar: "عرض سعر مجاني" },
  },
  {
    id: "other",
    label: { en: "Other", ar: "حاجة تانية" },
    business: { en: "a business like yours", ar: "بيزنس زي بتاعك" },
    service: { en: "your service", ar: "الخدمة بتاعتك" },
    customer: { en: "customer", ar: "العميل" },
    result: { en: "the result they want", ar: "النتيجة اللي عايزينها" },
    problem: { en: "choosing the wrong option", ar: "اختيار حاجة غلط" },
    offer: { en: "what you offer", ar: "اللي بتقدمه" },
  },
];

export function getIndustry(id: IndustryId | undefined): IndustryVocab {
  return INDUSTRIES.find((i) => i.id === id) ?? INDUSTRIES[INDUSTRIES.length - 1];
}
