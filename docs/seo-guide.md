# SEO対策ガイド

このドキュメントは、SplitterプロジェクトのSEO（検索エンジン最適化）実装について記述します。

## 概要

SEO対策は、検索エンジンでの可視性を向上させ、オーガニックトラフィックを増やすための重要な施策です。Seppaaan（グループ経費分割ツール）では、Next.js 16のメタデータ管理機能を活用して、検索エンジンと SNS での表示を最適化します。

## 実装内容

### 1. メタデータ設定

#### 動的メタデータ（layout.tsx/page.tsx）

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seppaaan - Split expenses easily and fairly',
  description: 'Track group spending, split across currencies, and settle up in seconds — no sign-up required.',
  keywords: ['split expenses', 'group spending', 'currency converter', 'trip expenses', 'settle up'],
  openGraph: {
    title: 'Seppaaan - Split expenses easily and fairly',
    description: 'Track group spending, split across currencies, and settle up in seconds — no sign-up required.',
    url: 'https://seppaaan.com',
    siteName: 'Seppaaan',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Seppaaan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seppaaan - Split expenses easily and fairly',
    description: 'Track group spending, split across currencies, and settle up in seconds',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: 'https://splitter.seppaaan.workers.dev',
  },
}
```

### 2. OGP画像（動的生成）

`src/app/opengraph-image.png` または `src/app/opengraph-image.tsx` で動的OGP画像を生成します。

```typescript
// src/app/opengraph-image.tsx
// 現在は src/app/opengraph-image.png として静的ファイルを使用しています。
// 今後、動的OGP画像を生成する場合は以下のように実装します：

import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Seppaaan'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        fontSize: 48,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}>
        <h1>Seppaaan - Split expenses easily and fairly</h1>
      </div>
    ),
    {
      ...size,
    }
  )
}
```

### 3. robots.txt

```
# src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://splitter.seppaaan.workers.dev/sitemap.xml',
  }
}
```

### 4. サイトマップ

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://splitter.seppaaan.workers.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
```

### 5. 構造化データ（Schema.org）

JSON-LDで構造化データを埋め込みます。

```typescript
// components/StructuredData.tsx
export const StructuredData = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Splitter',
    description: '複数の通貨で金額を簡単に分割できるツール',
    url: 'https://splitter.seppaaan.workers.dev',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## キーワード戦略

### メインキーワード
- split expenses
- group spending
- expense splitter
- split bills
- currency converter

### ロングテールキーワード
- split trip expenses
- group travel costs
- split bills across currencies
- expense management for groups
- settle up between friends

## ベストプラクティス

### 1. メタデータの最適化
- タイトル：50〜60文字以内
- ディスクリプション：120〜160文字以内
- 各ページで一意な内容を記述

### 2. OGP画像
- サイズ：1200×630px（推奨）
- フォーマット：PNG/JPG
- ファイルサイズ：200KB以下

### 3. ページスピード
```bash
# Lighthouse スコア確認
npx lighthouse https://splitter.seppaaan.workers.dev --view
```

### 4. モバイル対応
- レスポンシブデザイン
- ビューポート設定の確認
- タッチ対応のUI

### 5. 内部リンク
- 関連ページへのリンク配置
- アンカーテキストの最適化
- パンくずナビゲーション

### 6. 非構造化データの回避
- テキストコンテンツは適切なHTMLタグで囲む
- 画像にはalt属性を必ず指定
- セマンティックHTMLの使用

## チェックリスト

### 実装時
- [ ] メタデータ（タイトル、説明）の設定
- [ ] OGP画像の準備
- [ ] Twitter Card設定
- [ ] robots.txtの作成
- [ ] sitemap.xmlの生成
- [ ] 構造化データの埋め込み
- [ ] Canonical URLの設定

### 公開前
- [ ] Google Search Consoleへの登録
- [ ] Bing Webmaster Toolsへの登録
- [ ] Lighthouseスコアの確認（90以上推奨）
- [ ] モバイル対応の確認
- [ ] OGP画像のプレビュー確認

### 公開後
- [ ] Search Consoleでのインデックス確認
- [ ] 検索順位の監視
- [ ] アクセス解析の確認（Google Analytics）
- [ ] 定期的なコンテンツ更新

## トラブルシューティング

### OGP画像が表示されない
1. 画像のURLが正しいか確認
2. 画像サイズが推奨サイズ（1200×630px）か確認
3. SNS側のキャッシュをクリア

### 検索に引っかからない
1. Google Search Consoleでインデックス状況を確認
2. robots.txtで検索エンジンを拒否していないか確認
3. サイトマップが正しく送信されているか確認

## 参考資料

- [Next.js メタデータ](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google検索セントラル](https://developers.google.com/search)
- [Open Graph](https://ogp.me/)
- [Schema.org](https://schema.org/)
