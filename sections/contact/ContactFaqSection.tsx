'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';
import { useLanguage } from '@/context/LanguageContext';

export function ContactFaqSection() {
  const { t } = useLanguage();

  const CONTACT_FAQ = [
    {
      q: t("What's the best way to start a conversation with Corematrix?", "ما هي أفضل طريقة لبدء محادثة وتواصل مع كورماتريكس؟"),
      a: t(
        `The contact form on this page is the best starting point — it helps us understand your project before we respond, so our first message is actually useful. If you prefer, email us at ${siteConfig.email} or message us on LinkedIn. Whichever channel you choose, a real person responds — not a bot.`,
        `نموذج الاتصال الموجود في هذه الصفحة هو أفضل نقطة انطلاق — فهو يساعدنا على فهم مشروعك وتفاصيله قبل أن نرد عليك، بحيث تكون رسالتنا الأولى مفيدة وذات مغزى. إذا كنت تفضل ذلك، يمكنك مراسلتنا عبر البريد الإلكتروني على ${siteConfig.email} أو التواصل معنا على لينكد إن. أياً كانت القناة التي تختارها، فإن شخصاً حقيقياً سيرد عليك — وليس برمجية روبوتية.`
      ),
    },
    {
      q: t("Do you sign NDAs before discussing project details?", "هل توقعون اتفاقيات عدم الإفصاح (NDA) قبل مناقشة تفاصيل المشروع؟"),
      a: t(
        "Yes, absolutely — and we do it happily before any sensitive discussion begins. You can request an NDA directly in the contact form. We typically turn around a signed NDA within a few hours of receiving your request. All client information is treated as strictly confidential regardless.",
        "نعم، بكل تأكيد — ونقوم بذلك بكل سرور وتفهم قبل بدء أي مناقشة حساسة. يمكنك طلب اتفاقية عدم إفصاح مباشرة في نموذج الاتصال. نرسل عادةً اتفاقية موقعة في غضون بضع ساعات من تلقي طلبك. يتم التعامل مع جميع معلومات العملاء بسرية تامة وتدابير حماية مشددة على أي حال."
      ),
    },
    {
      q: t("How quickly will I hear back after submitting the form?", "ما هي السرعة التي سأتلقى بها رداً بعد إرسال النموذج؟"),
      a: t(
        `Within 24 hours on business days — usually much sooner. Our tech lead personally reviews every inquiry. If you submit over a weekend, expect a reply Monday morning (GMT). Urgent enquiries should be sent via WhatsApp at ${siteConfig.phone}.`,
        `في غضون 24 ساعة في أيام العمل — وغالباً قبل ذلك بكثير. يقوم رئيس القسم الهندسي لدينا بمراجعة كل استفسار شخصياً وبدقة. إذا قمت بالإرسال خلال عطلة نهاية الأسبوع، فتوقع رداً صباح يوم الاثنين (بتوقيت غرينتش). يجب إرسال الاستفسارات العاجلة للغاية عبر الواتساب على الرقم ${siteConfig.phone}.`
      ),
    },
    {
      q: t("Do you offer a free consultation before committing to a project?", "هل تقدمون استشارة مجانية قبل الالتزام والبدء بالعمل في المشروع؟"),
      a: t(
        "Yes. After reviewing your inquiry, we'll schedule a free 30-minute discovery call if there's a strong potential fit. This call is genuinely free and commitment-free — just an honest conversation about your project, your goals, and whether we're the right team for you.",
        "نعم. بعد مراجعة استفسارك، سنحدد موعداً لمكالمة استكشافية مجانية مدتها 30 دقيقة إذا كان هناك توافق محتمل وقوي. هذه المكالمة مجانية بالكامل وغير ملزمة على الإطلاق — مجرد محادثة صادقة وعميقة حول مشروعك وأهدافك وما إذا كنا الفريق الأنسب لمساعدتك."
      ),
    },
    {
      q: t("What information should I prepare before reaching out?", "ما هي المعلومات التي يجب أن أعدها وأجهزها قبل التواصل معكم؟"),
      a: t(
        "Don't worry about having everything figured out — we help with that. Helpful things to include: a brief description of the problem you're solving, your target users, any existing tech stack, your rough timeline, and an indicative budget range. A napkin sketch or bullet points are completely fine.",
        "لا تقلق بشأن تحديد وتفصيل كل شيء مسبقاً — نحن نساعدك في ذلك خطوة بخطوة. من المفيد تضمين: وصف بسيط للمشكلة التي تحلها، مستخدميك المستهدفين، أي بنية تقنية حالية، جدولك الزمني التقريبي، ونطاق الميزانية التقديرية. رسم تخطيطي بسيط أو نقاط موجزة تفي بالغرض تماماً."
      ),
    },
    {
      q: t("Can I contact you even if I'm not sure I have a project ready?", "هل يمكنني الاتصال بكم حتى لو لم أكن متأكداً من جهوزية مشروعي بالكامل؟"),
      a: t(
        "Absolutely. Some of our best client relationships started with \"I'm not sure if this is even feasible.\" We enjoy exploratory conversations. If you have a vague idea, a technical question, or want a second opinion on an architecture decision — just reach out.",
        "بالتأكيد. بعض من أفضل علاقاتنا مع عملائنا بدأت بعبارة \"لست متأكداً مما إذا كان هذا ممكناً من الناحية التقنية\". نحن نستمتع بالمحادثات الاستكشافية. إذا كانت لديك فكرة عامة، أو سؤال فني، أو ترغب في الحصول على رأي ثانٍ حول قرار يتعلق بالبنية البرمجية — فقط تواصل معنا."
      ),
    },
  ] as const;

  return (
    <TwoColumnFaqSection
      sectionId="contact-faq"
      headingId="contact-faq-heading"
      title={t("Common Questions Before Reaching Out", "أسئلة شائعة قبل التواصل معنا")}
      description={t("Everything you need to know before you send us a message.", "كل ما تحتاج إلى معرفته قبل أن ترسل لنا رسالتك واستفسارك.")}
      items={CONTACT_FAQ}
      cta={
        <Link
          href="#contact-form"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          {t("Send Us a Message →", "أرسل لنا رسالة ←")}
        </Link>
      }
    />
  );
}
