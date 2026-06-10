const http = require('http');

http.get('http://localhost:5000/api/services', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const services = JSON.parse(data);
      console.log('Total services in DB:', services.length);
      services.forEach((s, idx) => {
        console.log(`\n--- Service #${idx + 1}: ${s.title_en} (ID: ${s.id}) ---`);
        console.log('category:', s.category);
        console.log('detailSlug:', s.detailSlug);
        console.log('heroTitle:', s.heroTitle);
        console.log('heroTitleAr:', s.heroTitleAr);
        console.log('aboutSectionTitle:', s.aboutSectionTitle);
        console.log('capabilities (first item):', s.capabilities && s.capabilities[0]);
        console.log('aboutPillars (first item):', s.aboutPillars && s.aboutPillars[0]);
        console.log('whyChooseUs (first item):', s.whyChooseUs && s.whyChooseUs[0]);
        console.log('criticalCards (first item):', s.criticalCards && s.criticalCards[0]);
        console.log('faqs (first item):', s.faqs && s.faqs[0]);
      });
    } catch (e) {
      console.error(e.message);
    }
  });
});
