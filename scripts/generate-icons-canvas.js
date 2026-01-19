import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fondo oscuro con gradiente
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size
  );
  gradient.addColorStop(0, '#2a2a2a');
  gradient.addColorStop(1, '#1a1a1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Silueta de cara simplificada
  ctx.fillStyle = '#4a4a4a';
  ctx.strokeStyle = '#6a6a6a';
  ctx.lineWidth = Math.max(2, size / 80);

  // Círculo de cara
  const faceSize = size * 0.5;
  const faceX = size / 2;
  const faceY = size * 0.35;

  ctx.beginPath();
  ctx.arc(faceX, faceY, faceSize / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Ojos
  const eyeSize = faceSize * 0.12;
  const eyeOffsetX = faceSize * 0.25;
  const eyeY = faceY;

  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.arc(faceX - eyeOffsetX, eyeY, eyeSize / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(faceX + eyeOffsetX, eyeY, eyeSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Sombra de silueta corporal
  ctx.fillStyle = 'rgba(74, 74, 74, 0.3)';
  ctx.beginPath();
  ctx.ellipse(
    size / 2,
    size * 0.75,
    size * 0.35,
    size * 0.15,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Texto "SP" en el centro
  ctx.fillStyle = '#ffffff';
  const fontSize = Math.max(12, size * 0.15);
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SP', size / 2, size * 0.85);

  return canvas.toBuffer('image/png');
}

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const publicDir = path.join(process.cwd(), 'public');

console.log('🎨 Generating app icons...\n');

iconSizes.forEach(size => {
  try {
    console.log(`   Generating icon-${size}x${size}.png...`);

    const buffer = generateIcon(size);
    const filename = `icon-${size}x${size}.png`;
    const outputPath = path.join(publicDir, filename);

    fs.writeFileSync(outputPath, buffer);

    console.log(`   ✅ Created ${filename} (${buffer.length} bytes)\n`);
  } catch (error) {
    console.error(`   ❌ Error generating icon-${size}x${size}.png:`, error.message);
  }
});

// Generar versiones maskable
console.log('🎨 Generating maskable icons...\n');

[192, 512].forEach(size => {
  try {
    console.log(`   Generating icon-maskable-${size}x${size}.png...`);

    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Fondo con gradiente
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size);
    gradient.addColorStop(0, '#4a4a4a');
    gradient.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Forma cuadrada con esquinas redondeadas para maskable
    const padding = size * 0.1;
    const iconSize = size - padding * 2;

    ctx.fillStyle = '#1a1a1a';
    roundRect(ctx, padding, padding, iconSize, iconSize, size * 0.15);

    // Texto "S"
    ctx.fillStyle = '#ffffff';
    const fontSize = Math.max(24, size * 0.3);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', size / 2, size / 2);

    const buffer = canvas.toBuffer('image/png');
    const filename = `icon-maskable-${size}x${size}.png`;
    const outputPath = path.join(publicDir, filename);

    fs.writeFileSync(outputPath, buffer);

    console.log(`   ✅ Created ${filename} (${buffer.length} bytes)\n`);
  } catch (error) {
    console.error(`   ❌ Error generating icon-maskable-${size}x${size}.png:`, error.message);
  }
});

console.log('✅ All icons generated successfully!');
console.log('📁 Icons are in the /public folder');

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}
