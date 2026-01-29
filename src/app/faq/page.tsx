export default function FAQPage() {
  const faqs = [
    { q: "Bagaimana cara melacak pesanan?", a: "Kamu bisa cek di menu pesanan saya." },
    { q: "Apakah bisa retur barang?", a: "Bisa, maksimal 3 hari setelah barang diterima." },
    { q: "Metode pembayaran apa saja?", a: "Kami mendukung semua bank nasional dan e-wallet." }
  ];

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">FAQ RevoShop</h1>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div key={index} className="p-5 bg-white border rounded-lg">
            <h3 className="font-bold text-gray-800">Q: {item.q}</h3>
            <p className="mt-2 text-gray-600 italic">A: {item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}