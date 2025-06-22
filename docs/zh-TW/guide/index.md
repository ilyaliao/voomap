# 介紹

**Voomap** 是一個為 Vue 3 打造的完整 Google Maps 組件庫。使用 TypeScript 和 Composition API 構建，提供類型安全、響應式且直覺的方式將 Google Maps 整合到您的 Vue 應用程式中。

## 為什麼選擇 Voomap？

Voomap 為 Vue 3 應用程式提供了最完整的 Google Maps 整合解決方案，具有兩個核心優勢：

### 1. 完全兼容 @types/google.maps

Voomap 直接導入並擴展 `@types/google.maps`，確保 **100% 類型覆蓋率**而無需重新定義類型。這意味著：

- **完整的 IntelliSense 支援**，適用於所有 Google Maps API
- 所有選項和事件的**類型安全**
- **無學習曲線** - 使用熟悉的 Google Maps API 搭配 Vue 3 響應式系統

```typescript
// 完全支援所有 Google Maps 類型
const markerOptions: google.maps.MarkerOptions = {
  position: { lat: 25.0855388, lng: 121.4791004 },
  title: '我的標記',
  draggable: true,
  animation: google.maps.Animation.BOUNCE
}
```

### 2. 提供 Composable 和 Component 兩種使用方法

Voomap 提供靈活的使用模式，讓您可以根據需求選擇最適合的方式：

- **Composable 方式** (`@voomap/core`)：提供最大的控制權和靈活性，適合複雜的應用程式
- **Component 方式** (`@voomap/map`)：提供宣告式的 Vue 語法，適合快速原型設計和簡單實現

## 開始使用

準備好為您的 Vue 應用程式添加地圖了嗎？查看[開始使用](./getting-started.md)指南，使用 Voomap 設定您的第一個地圖。

## 先決條件

- Vue 3.3 或更高版本
- Google Maps API 金鑰（[在此取得](https://developers.google.com/maps/documentation/javascript/get-api-key)）
