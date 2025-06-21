# Introduction

**Voomap** is a comprehensive Google Maps component library for Vue 3. Built with TypeScript and the Composition API, it provides a type-safe, reactive, and intuitive way to integrate Google Maps into your Vue applications.

## Why Choose Voomap?

Voomap provides the most complete Google Maps integration solution for Vue 3 applications, with two core advantages:

### 1. Complete Compatibility with @types/google.maps

Voomap directly imports and extends `@types/google.maps`, ensuring **100% type coverage** without redefining types. This means:

- **Complete IntelliSense support** for all Google Maps APIs
- **Type safety** for all options and events
- **No learning curve** - use familiar Google Maps APIs with Vue 3's reactive system

```typescript
// Full support for all Google Maps types
const markerOptions: google.maps.MarkerOptions = {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: 'My Marker',
  draggable: true,
  animation: google.maps.Animation.BOUNCE
}
```

### 2. Provides Both Composable and Component Usage Methods

Voomap offers flexible usage patterns, allowing you to choose the most suitable approach for your needs:

- **Composable approach** (`@voomap/core`): Provides maximum control and flexibility, suitable for complex applications
- **Component approach** (`@voomap/map`): Provides declarative Vue syntax, suitable for rapid prototyping and simple implementations

## Getting Started

Ready to add maps to your Vue application? Check out the [Getting Started](./getting-started.md) guide to set up your first map with Voomap.

## Prerequisites

- Vue 3.3 or higher
- A Google Maps API key ([Get one here](https://developers.google.com/maps/documentation/javascript/get-api-key))
