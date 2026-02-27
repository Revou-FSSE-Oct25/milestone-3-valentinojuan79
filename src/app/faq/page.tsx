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
    <div className="max-w-3xl mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Frequently Asked <span className="text-orange-600">Questions</span></h1>
        <p className="text-gray-600">Find answers to common questions</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}