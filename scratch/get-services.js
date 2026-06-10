const http = require('http');

function getServices() {
  http.get('http://localhost:5000/api/services', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const services = JSON.parse(data);
        console.log('Number of services:', services.length);
        if (services.length > 0) {
          console.log('Keys of first service:', Object.keys(services[0]));
          console.log('First service basic properties:');
          const basicKeys = [
            'id', 'category', 'icon', 'title_en', 'title_ar', 'description_en', 'description_ar',
            'tags_en', 'tags_ar', 'detailSlug', 'badge_en', 'badge_ar', 'features_en', 'features_ar',
            'metaTitle_en', 'metaTitle_ar', 'metaKeywords_en', 'metaKeywords_ar', 'metaDescription_en', 'metaDescription_ar',
            'heroTitle', 'heroTitleAr', 'heroTagline', 'heroTaglineAr', 'heroIntroduction', 'heroIntroductionAr',
            'primaryCtaText', 'primaryCtaTextAr', 'primaryCtaLink', 'secondaryCtaText', 'secondaryCtaTextAr',
            'secondaryCtaLink', 'cardIcon'
          ];
          const first = services[0];
          const extracted = {};
          basicKeys.forEach(k => {
            extracted[k] = first[k];
          });
          console.log(JSON.stringify(extracted, null, 2));
        } else {
          console.log('No services found');
        }
      } catch (err) {
        console.error('Error parsing response:', err.message);
      }
    });
  }).on('error', (err) => {
    console.error('Request failed:', err.message);
  });
}

getServices();
