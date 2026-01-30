export const dynamic = 'force-dynamic';
export default function FAQPage() {
  const faqs = [
    {
      q: "Is shipping really free?",
      a: "Yes! We offer free shipping worldwide for all products during our launch period."
    },
    {
      q: "How long does delivery take?",
      a: "Standard shipping takes 3-7 business days depending on your location."
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day money-back guarantee. If you're not satisfied, send it back for a full refund."
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can be cancelled within 24 hours of purchase before they are shipped."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-white mb-4">Frequently Asked <span className="text-revou-yellow">Questions</span></h1>
        <p className="text-slate-400">Everything you need to know about RevoFun.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-revou-yellow mb-2 tracking-tight">{faq.q}</h3>
            <p className="text-slate-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}