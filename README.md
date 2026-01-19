# Symmetry Pro - Professional Facial & Body Symmetry Training

Una aplicación profesional de entrenamiento de simetría facial y corporal con ejercicios guiados, seguimiento de progreso y diseño futurista.

## ✨ Características

- 🎯 **27 Ejercicios Completos** - Entrenamiento de simetría facial y corporal
- 🌍 **Bilingüe** - Soporte completo en inglés y español
- 📊 **Seguimiento de Progreso** - Rachas, puntuaciones y estadísticas
- 🎨 **Diseño Futurista** - Interfaz oscura minimalista de alta calidad
- 💾 **Persistencia Local** - Todos los datos guardados en localStorage
- 🎬 **Animaciones SVG** - Demostraciones visuales de todos los ejercicios
- 📱 **Responsive** - Funciona en móvil, tablet y escritorio

## 🚀 Cómo Ejecutar

### Instalación

```bash
# Instalar dependencias
bun install
# o
npm install
```

### Modo Desarrollo

```bash
bun run dev
# o
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

### Construir para Producción

```bash
bun run build
# o
npm run build
```

### Ejecutar en Producción

```bash
bun start
# o
npm start
```

## 📁 Estructura del Proyecto

```
symmetry-pro/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal y metadata
│   │   ├── page.tsx            # Aplicación completa
│   │   └── globals.css          # Estilos globales
│   ├── components/
│   │   └── ExerciseAnimation.tsx  # Animaciones visuales
│   └── lib/
│       ├── language.tsx         # Sistema de idiomas
│       ├── exercises.ts          # Base de datos de ejercicios
│       └── progress.ts          # Seguimiento de progreso
├── public/                    # Archivos estáticos
└── package.json
```

## 🛠️ Tecnologías

- **Framework**: Next.js 16 con App Router
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui
- **Estado**: Zustand
- **Íconos**: Lucide React

## 📱 Características de la Aplicación

### Módulos de Ejercicios
- **Simetría Facial**: 15 ejercicios
  - Mandíbula: Tensión, Resistencia, Postura de Lengua (Mewing)
  - Mejillas: Elevación, Inflado, Resistencia
  - Ojos: Enfoque, Movimientos Circulares, Elevación de Cejas
  - Cuello: Inclinaciones, Rotaciones, Retracción de Mentón
  - Postura de Cabeza: Alineación, Nivelación, Conciencia en Espejo

- **Simetría Corporal**: 12 ejercicios
  - Hombros: Rodillos, Compresión, Elevación Unilateral
  - Espalda: Ángulos de Pared, Estiramiento Gato-Vaca, Retracciones Escapulares
  - Postura: Alineación, Distribución de Peso, Verificación Espinal
  - Desequilibrio: Estiramiento Lateral a Lado, Fortalecimiento Unilateral, Conciencia de Equilibrio

### Seguimiento de Progreso
- Rachas diarias y mejores rachas
- Puntuación de simetría (0-100)
- Puntuación de consistencia
- Progreso semanal y mensual
- Historial de ejercicios
- Metas diarias con duración objetivo

### Configuración
- Cambio de idioma (Inglés/Español)
- Tema oscuro/claro
- Nivel de dificultad
- Gestión de datos
- Preferencias de sonido

## 🌍 Soporte de Idiomas

- 🇺🇸 **English** - Completo
- 🇪🇸 **Español** - Completo

El idioma se puede cambiar instantáneamente desde la configuración y se guarda automáticamente.

## 🎨 Diseño

- Paleta de colores: Negro, gris oscuro, blanco con acentos sutiles
- Efectos: Glassmorphism, desenfoque, sombras, gradientes
- Animaciones: Transiciones suaves, efectos hover, microinteracciones
- Diseño: Responsive y accesible

## 📄 Licencia

Este proyecto es para uso educativo. Consulta siempre a profesionales de la salud antes de comenzar cualquier programa de ejercicios.

## ⚠️ Descargo de Responsabilidad

Los resultados dependen de la consistencia, genética, postura y factores individuales. Esta aplicación proporciona orientación e información educativa solamente. No es consejo médico, diagnóstico o tratamiento. Siempre consulta con profesionales de la salud antes de comenzar cualquier programa de ejercicios.

---

**¡Disfruta mejorando tu simetría!** 💪✨
