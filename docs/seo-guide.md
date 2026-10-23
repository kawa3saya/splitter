# SEO対策ガイド

このドキュメントは、SeppaaanプロジェクトのSEO（検索エンジン最適化）実装について記述します。

## 概要

SEO対策は、検索エンジンでの可視性を向上させ、オーガニックトラフィックを増やすための重要な施策です。Seppaaan（グループ経費分割ツール）では、Next.js 16のメタデータ管理機能を活用して、検索エンジンと SNS での表示を最適化します。

## 実装内容

### 1. メタデータ設定

サイト共通の値は `src/constants/site.ts`、ルートごとの組み立ては
`src/utils/page-metadata.ts` に集約しています。URL は必ず `siteUrl()` から組んで
ください（canonical と sitemap は完全一致している必要があるため）。

#### ルートレイアウト（`src/app/layout.tsx`）

サイト全体の既定値だけを持ちます。

```typescript
import type { Metadata, Viewport } from 'next'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, TITLE_TEMPLATE } from '@/constants/site'
import { OPEN_GRAPH_BASE, TWITTER_BASE } from '@/utils/page-metadata'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // default は自前のタイトルを持たないルート用。他は短いタイトルを指定し、
  // template がサイト名を付ける
  title: { default: SITE_TITLE, template: TITLE_TEMPLATE },
  description: SITE_DESCRIPTION,
  openGraph: { ...OPEN_GRAPH_BASE, title: SITE_TITLE, description: SITE_DESCRIPTION, url: SITE_URL },
  twitter: { ...TWITTER_BASE, title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { /* ... */ } },
  // alternates.canonical はここに置かない（後述）
}

// viewport は metadata とは別の export（Next 14 以降）
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}
```

**`alternates.canonical` をルートレイアウトに置かないこと。** 全ページに継承され、
`/privacy` や `/terms` が「トップページの複製」と宣言することになり、インデックスから
落ちます。

**`generateMetadata` で `headers()` を呼ばないこと。** 全ルートが静的生成から外れます。
オリジンは `SITE_URL`（`NEXT_PUBLIC_SITE_URL` で上書き可）から組んでください。

#### 公開ページ（`src/app/*/page.tsx`）

各ページが自分の canonical・title・description を持ちます。

```typescript
import { pageMetadata } from '@/utils/page-metadata'

export const metadata = pageMetadata({
  path: '/privacy',
  title: 'プライバシーポリシー',   // 省略するとサイト既定のフルタイトル
  description: '…',               // 省略するとサイト既定
})
```

`pageMetadata()` が canonical / og / twitter をまとめて組み立てます。**Next の
メタデータは shallow merge** なので、ページ側で `openGraph` や `twitter` を宣言すると
レイアウトのオブジェクトごと置き換わります。共通フィールドが消えないよう
`OPEN_GRAPH_BASE` / `TWITTER_BASE` を spread している理由がこれです。

og:title には `title.template` が適用されない（document title にのみ適用される）ため、
`pageMetadata()` が同じ template から明示的に組み立てています。

#### 非公開ルート（`src/app/trips/[id]/layout.tsx`）

トリップの URL 自体がアクセストークンなので、`/trips/[id]` 配下はレイアウトで
まとめて noindex にしています。canonical と og:url も設定しません（URL が漏れるため）。

```typescript
import { PRIVATE_ROUTE_METADATA } from '@/utils/page-metadata'

export const metadata: Metadata = PRIVATE_ROUTE_METADATA
```

robots.txt の `Disallow` ではなく meta タグを使うこと。クロールを禁止すると
クローラーが noindex 自体を読めず、URL だけがインデックスに載り得ます。

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

`src/app/robots.ts` のみで定義します。`public/robots.txt` を置くと静的アセット側が
優先されてこのルートが死ぬので、両方作らないこと。

```
# src/app/robots.ts
import { MetadataRoute } from 'next'
import { siteUrl } from '@/constants/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: siteUrl('/sitemap.xml'),
  }
}
```

### 4. サイトマップ

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { LEGAL_LAST_UPDATED, siteUrl } from '@/constants/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl('/'),
      lastModified: new Date(),   // 静的ルートなのでビルド時刻
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: siteUrl('/privacy'),
      lastModified: new Date(LEGAL_LAST_UPDATED),   // 法務ページは実際の更新日
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
```

`<loc>` は各ページの canonical と完全一致している必要があるので、どちらも
`siteUrl()` から組みます。

法務ページだけ `lastModified` を分けているのは、ビルド時刻を報告すると
「規約がデプロイのたびに変わる」と主張することになるためです。表示日と sitemap が
ずれないよう、日付は `LEGAL_LAST_UPDATED` に一本化しています。

トリップ詳細（`/trips/[id]`）は URL 自体がアクセストークンなので、サイトマップには
含めません。

### 5. 構造化データ（Schema.org）

JSON-LDは必ず `<script type="application/ld+json">` として描画します。
`metadata.other` に入れると `<meta name="application/ld+json" content="...">` に
なってクローラーに読まれないので使わないこと。実装は
`src/app/_components/structured-data.tsx`。

```typescript
// src/app/_components/structured-data.tsx
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/site'

export function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

`offers` は「無料である」という事実の記述です。これだけでは Google の
software app リッチリザルトの対象にはなりません（`aggregateRating` または `review` が
必要）。実在しない評価を書くことは
[構造化データのガイドライン](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
で手動対策の対象とされているため、追加しないこと。

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
