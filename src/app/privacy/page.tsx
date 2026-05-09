import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-s pb-24">
      <Link href="/">
        <span className="flex items-center gap-xs font-bold underline mb-s">
          <ArrowLeft className="size-6" />
          Back to Home
        </span>
      </Link>

      <h1 className="text-3xl font-bold mb-2">プライバシーポリシー</h1>
      <p className="text-sm text-gray-500 mb-8">最終更新日：2026年5月10日</p>

      <p className="mb-8 leading-relaxed">
        Splitter
        運営（以下「運営者」といいます）は、運営者が提供するアプリケーション（以下「本サービス」といいます）における利用者の個人情報および個人関連情報（以下併せて「個人情報等」といいます）の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">第1条（基本方針）</h2>
      <p className="leading-relaxed">
        運営者は、個人情報の保護に関する法律（以下「個人情報保護法」といいます）その他関連法令およびガイドラインを遵守し、本ポリシーに従って個人情報等を取り扱います。
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">第2条（取得する情報）</h2>
      <p className="leading-relaxed mb-4">
        運営者は、本サービスの提供にあたり、以下の情報を取得することがあります。
      </p>

      <h3 className="text-base font-bold mt-4 mb-2">1. 利用者が直接入力する情報</h3>
      <ul className="list-disc pl-6 space-y-1 leading-relaxed mb-4">
        <li>Trip（旅行）の名称</li>
        <li>メンバー名</li>
        <li>支出の内容、金額、日付、通貨</li>
        <li>その他利用者が本サービス上で入力する一切の情報</li>
      </ul>

      <h3 className="text-base font-bold mt-4 mb-2">2. 自動的に取得する情報</h3>
      <p className="leading-relaxed mb-2">
        利用者が本サービスにアクセスした際、運営者は以下の情報を自動的に取得することがあります。
      </p>
      <ul className="list-disc pl-6 space-y-1 leading-relaxed">
        <li>IP アドレス</li>
        <li>ブラウザの種類、バージョン、言語設定</li>
        <li>オペレーティングシステム、デバイスの種類</li>
        <li>参照元 URL（リファラ）</li>
        <li>本サービスへのアクセス日時、滞在時間、閲覧ページ</li>
        <li>Cookie、ローカルストレージその他のブラウザ機能を通じて記録される情報</li>
        <li>操作ログ、エラーログ</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">第3条（個人情報等の利用目的）</h2>
      <p className="leading-relaxed mb-2">運営者は、取得した個人情報等を以下の目的のために利用します。</p>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>本サービスの提供、運営、維持、保守</li>
        <li>本サービスの利用状況の分析、品質改善、新機能の開発</li>
        <li>不具合、エラー、障害の調査および対応</li>
        <li>不正利用、規約違反、その他不正行為の防止および対応</li>
        <li>利用者からのお問い合わせへの対応</li>
        <li>法令、裁判所、捜査機関、その他公的機関からの要請への対応</li>
        <li>その他、上記各号に付随する目的</li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第4条（第三者提供）</h2>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>
          運営者は、利用者の個人情報を、利用者本人の事前の同意なく第三者に提供しません。ただし、以下の場合はこの限りではありません。
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>法令に基づく場合</li>
            <li>
              人の生命、身体または財産の保護のために必要であって、利用者本人の同意を得ることが困難である場合
            </li>
            <li>
              公衆衛生の向上または児童の健全な育成の推進のために特に必要であって、利用者本人の同意を得ることが困難である場合
            </li>
            <li>
              国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
            </li>
            <li>個人情報保護法その他法令で認められる場合</li>
          </ul>
        </li>
        <li>
          運営者が利用目的の達成に必要な範囲内で個人情報の取扱いを業務委託先に委託する場合は、第三者提供にあたりません。
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第5条（業務委託先）</h2>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>
          運営者は、本サービスの提供および運営のため、以下の業務を外部の事業者に委託することがあります。
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>クラウドインフラ、サーバーホスティング</li>
            <li>データベースサービス</li>
            <li>アクセス解析、行動分析</li>
            <li>エラー監視、ログ収集</li>
            <li>その他本サービスの提供に必要な業務</li>
          </ul>
        </li>
        <li>
          運営者は、業務委託先に対して、個人情報の適切な取扱いに関する契約を締結し、または同等の管理体制を確認するなど、個人情報の安全管理が図られるよう必要かつ適切な監督を行います。
        </li>
        <li>
          業務委託先のサーバーまたはデータセンターが日本国外に所在する場合、利用者の個人情報等は当該国に移転されることがあります。利用者は、本サービスを利用することにより、当該越境移転に同意するものとします。
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第6条（Cookie および類似技術の利用）</h2>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>
          本サービスは、利用者の利便性向上、利用状況の分析、その他正当な業務目的のため、Cookie、ローカルストレージ、Web
          ビーコンその他の類似技術を使用することがあります。
        </li>
        <li>
          利用者は、ブラウザの設定により Cookie の受け入れを拒否し、または既存の Cookie
          を削除することができます。ただし、Cookie
          を無効化した場合、本サービスの一部または全部の機能が利用できなくなる可能性があります。
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第7条（アクセス解析ツールの利用）</h2>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>
          本サービスは、利用状況の分析および品質改善のため、Google LLC が提供する Google Analytics
          をはじめとするアクセス解析ツールを使用することがあります。
        </li>
        <li>
          Google Analytics は、Cookie
          その他の技術を使用して、個人を特定することなく利用者の本サービス利用状況に関する情報を収集します。当該情報は
          Google LLC によりそのプライバシーポリシーに従って管理されます。
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Google Analytics 利用規約：
              <a
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                https://marketingplatform.google.com/about/analytics/terms/jp/
              </a>
            </li>
            <li>
              Google プライバシーポリシー：
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                https://policies.google.com/privacy
              </a>
            </li>
          </ul>
        </li>
        <li>
          利用者は、Google が提供する{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Google アナリティクス オプトアウト アドオン
          </a>{" "}
          をインストールすることにより、Google Analytics による情報収集を拒否することができます。
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第8条（個人関連情報の取扱い）</h2>
      <p className="leading-relaxed">
        運営者は、Cookie ID、IP
        アドレスその他の個人関連情報（個人情報保護法第2条第7項に定めるものをいいます）を、第三者提供先において個人データとして取得することが想定される態様で第三者に提供する場合には、個人情報保護法その他関連法令に従って必要な手続を行います。
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">第9条（安全管理措置）</h2>
      <p className="leading-relaxed">
        運営者は、取り扱う個人情報の漏えい、滅失、毀損その他の事故を防止するため、合理的に必要かつ適切な安全管理措置を講じます。ただし、運営者は、個人情報等の安全性、完全性、保管の永続性について、明示的にも黙示的にも一切保証しません。本サービスにおいて発生した個人情報等の漏えい、滅失、毀損、不正アクセス、改ざんその他の事故に起因または関連して利用者または第三者に生じたいかなる損害についても、運営者の故意または重過失による場合を除き、運営者は一切の責任を負いません。
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">第10条（保有個人データに関する開示等の請求）</h2>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>
          利用者は、運営者が保有する自己の個人データについて、個人情報保護法に基づく利用目的の通知、開示、訂正、追加、削除、利用停止、消去または第三者提供の停止（以下「開示等の請求」といいます）を求めることができます。
        </li>
        <li>開示等の請求は、第13条に定めるお問い合わせフォームを通じて行うものとします。</li>
        <li>
          運営者は、開示等の請求を受けた場合、本人または正当な代理人であることを確認したうえ、合理的な範囲内で対応します。本人確認のため、運営者は追加情報の提供を求めることがあります。
        </li>
        <li>
          開示等の請求が法令に基づくものでない場合、または運営者の業務の適正な実施に著しい支障を及ぼすおそれがある場合、運営者は当該請求の全部または一部に応じないことがあります。
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第11条（免責）</h2>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>運営者は、利用者が本サービスに入力した情報の正確性について何ら検証する義務を負いません。</li>
        <li>
          利用者が第三者の同意を得ずに当該第三者の氏名等を本サービスに入力した結果、当該第三者と利用者または運営者との間で生じた紛争について、運営者は一切の責任を負いません。
        </li>
        <li>
          第三者サービス（業務委託先、解析ツール提供者を含みます）における個人情報等の取扱いに起因または関連して利用者または第三者に生じたいかなる損害についても、運営者の故意または重過失による場合を除き、運営者は一切の責任を負いません。
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第12条（プライバシーポリシーの変更）</h2>
      <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
        <li>運営者は、必要と判断した場合、利用者への事前の通知なく本ポリシーを変更することができます。</li>
        <li>変更後の本ポリシーは、本サービス上に掲載された時点から効力を生じるものとします。</li>
        <li>
          利用者は、本ポリシーの変更後に本サービスを継続して利用することにより、変更後の本ポリシーに同意したものとみなします。
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4">第13条（お問い合わせ）</h2>
      <p className="leading-relaxed mb-2">
        本ポリシーまたは個人情報等の取扱いに関するお問い合わせは、以下のフォームよりご連絡ください。
      </p>
      <ul className="list-disc pl-6 space-y-1 leading-relaxed">
        <li>運営者名：Splitter 運営</li>
        <li>
          お問い合わせフォーム：
          <a
            href="https://forms.gle/bEc1ywTJjz7z9K9U8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            https://forms.gle/bEc1ywTJjz7z9K9U8
          </a>
        </li>
      </ul>

      <p className="mt-8 leading-relaxed">以上</p>
    </div>
  );
}
