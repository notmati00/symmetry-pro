import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const zai = await ZAI.create();

const iconSizes = [
  { size: '72x72', output: 'icon-72x72.png' },
  { size: '96x96', output: 'icon-96x96.png' },
  { size: '128x128', output: 'icon-128x128.png' },
  { size: '144x144', output: 'icon-144x144.png' },
  { size: '152x152', output: 'icon-152x152.png' },
  { size: '192x192', output: 'icon-192x192.png' },
  { size: '384x384', output: 'icon-384x384.png' },
  { size: '512x512', output: 'icon-512x512.png' },
];

const iconPrompt = 'Minimalist app icon for fitness and symmetry training app, dark background with abstract face and body silhouette in white/light gray, modern and sleek design, professional look, simple geometric shapes, high contrast';

console.log('🎨 Generating app icons...');

for (const { size, output } of iconSizes) {
  try {
    console.log(`   Generating ${output} (${size})...`);

    const response = await zai.images.generations.create({
      prompt: iconPrompt,
      size: '1024x1024'
    });

    if (response.data && response.data[0]) {
      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');

      const outputPath = path.join(process.cwd(), 'public', output);
      fs.writeFileSync(outputPath, buffer);

      console.log(`   ✅ Created ${output} (${buffer.length} bytes)`);
    }
  } catch (error) {
    console.error(`   ❌ Error generating ${output}:`, error.message);
  }
}

console.log('✅ Icon generation complete!');
