
import { useState, useEffect, useRef } from "react";

// ============================================================
// 📚 DATA: 150 асуулт (JP + EN) - Strategy 50, Management 50, Technology 50
// ✏️  Асуулт нэмэхдээ доорх массивуудад объект нэмнэ:
//   { id, termJP, termEN, descJP, descEN, category }
// ============================================================
const QUESTIONS = {
  strategy: [
    { id: "s1", termJP: "SWOT分析", termEN: "SWOT Analysis", descJP: "強み・弱み・機会・脅威の4つの視点から経営環境を分析する手法", descEN: "A framework analyzing Strengths, Weaknesses, Opportunities, and Threats", category: "strategy" },
    { id: "s2", termJP: "バランスト・スコアカード", termEN: "Balanced Scorecard", descJP: "財務・顧客・内部プロセス・学習と成長の4つの視点で業績を評価する", descEN: "Evaluates performance from four perspectives: Financial, Customer, Internal Process, Learning & Growth", category: "strategy" },
    { id: "s3", termJP: "コアコンピタンス", termEN: "Core Competence", descJP: "企業が持つ他社に真似できない中核的な強み・能力", descEN: "A company's unique strength or capability that competitors cannot easily imitate", category: "strategy" },
    { id: "s4", termJP: "ブルーオーシャン戦略", termEN: "Blue Ocean Strategy", descJP: "競争のない新たな市場空間を創出する戦略", descEN: "A strategy that creates uncontested new market spaces rather than competing", category: "strategy" },
    { id: "s5", termJP: "PPM", termEN: "Product Portfolio Management", descJP: "市場成長率と市場シェアで製品・事業を分類し資源配分を決める手法", descEN: "Classifies products by market growth rate and market share to allocate resources", category: "strategy" },
    { id: "s6", termJP: "CRM", termEN: "Customer Relationship Management", descJP: "顧客情報を管理・活用し、顧客との長期的関係を構築する手法", descEN: "Managing customer data to build long-term relationships and improve loyalty", category: "strategy" },
    { id: "s7", termJP: "SCM", termEN: "Supply Chain Management", descJP: "原材料の調達から製品の流通まで一連の供給連鎖を管理する手法", descEN: "Managing the entire flow from raw materials to product delivery", category: "strategy" },
    { id: "s8", termJP: "ERP", termEN: "Enterprise Resource Planning", descJP: "企業の基幹業務を統合管理するシステム（財務・人事・生産など）", descEN: "Integrated system managing core business processes like finance, HR, and production", category: "strategy" },
    { id: "s9", termJP: "ビジネスモデルキャンバス", termEN: "Business Model Canvas", descJP: "9つのブロックでビジネスモデルを可視化するフレームワーク", descEN: "A visual framework with 9 building blocks to describe a business model", category: "strategy" },
    { id: "s10", termJP: "KGI", termEN: "Key Goal Indicator", descJP: "最終的なゴール（目標）の達成度を測る指標", descEN: "An indicator measuring the achievement of the final business goal", category: "strategy" },
    { id: "s11", termJP: "KPI", termEN: "Key Performance Indicator", descJP: "KGI達成のための中間目標を測る業績評価指標", descEN: "A metric tracking progress toward achieving a KGI", category: "strategy" },
    { id: "s12", termJP: "CSR", termEN: "Corporate Social Responsibility", descJP: "企業が社会・環境に対して果たすべき責任", descEN: "A company's responsibility to society, environment, and stakeholders", category: "strategy" },
    { id: "s13", termJP: "グリーンIT", termEN: "Green IT", descJP: "ITを活用した省エネ・環境負荷低減の取り組み", descEN: "Using IT to reduce energy consumption and environmental impact", category: "strategy" },
    { id: "s14", termJP: "コンプライアンス", termEN: "Compliance", descJP: "法律・規則・社会規範を守ること", descEN: "Adhering to laws, regulations, and ethical standards", category: "strategy" },
    { id: "s15", termJP: "コーポレートガバナンス", termEN: "Corporate Governance", descJP: "企業を適切に統治・監督するための仕組み", descEN: "The system by which companies are directed and controlled", category: "strategy" },
    { id: "s16", termJP: "M&A", termEN: "Mergers and Acquisitions", descJP: "企業の合併・買収により経営資源を獲得する戦略", descEN: "Strategy of merging with or acquiring companies to gain resources", category: "strategy" },
    { id: "s17", termJP: "アライアンス", termEN: "Alliance", descJP: "複数の企業が協力関係を結ぶこと（資本提携・業務提携など）", descEN: "Cooperative agreements between companies, including capital and operational alliances", category: "strategy" },
    { id: "s18", termJP: "BPR", termEN: "Business Process Reengineering", descJP: "業務プロセスを根本から見直し、劇的な改善を図ること", descEN: "Fundamentally rethinking and redesigning business processes for dramatic improvement", category: "strategy" },
    { id: "s19", termJP: "アウトソーシング", termEN: "Outsourcing", descJP: "業務の一部を外部企業に委託すること", descEN: "Delegating part of a business process to an external provider", category: "strategy" },
    { id: "s20", termJP: "ベンチマーキング", termEN: "Benchmarking", descJP: "優れた他社の手法・指標を参考に自社改善を図る手法", descEN: "Comparing your processes against industry best practices for improvement", category: "strategy" },
    { id: "s21", termJP: "ニッチ戦略", termEN: "Niche Strategy", descJP: "特定の小さな市場に集中して競争優位を確立する戦略", descEN: "Focusing on a specific small market segment to gain competitive advantage", category: "strategy" },
    { id: "s22", termJP: "差別化戦略", termEN: "Differentiation Strategy", descJP: "他社と異なる独自の価値を提供することで競争優位を得る戦略", descEN: "Gaining competitive advantage by offering unique value not provided by competitors", category: "strategy" },
    { id: "s23", termJP: "コストリーダーシップ戦略", termEN: "Cost Leadership Strategy", descJP: "業界最低コストで製品・サービスを提供し競争優位を得る戦略", descEN: "Achieving competitive advantage by being the lowest-cost producer in the industry", category: "strategy" },
    { id: "s24", termJP: "マーケティングミックス", termEN: "Marketing Mix (4P)", descJP: "製品・価格・流通・プロモーションの4要素でマーケティング戦略を立てる", descEN: "Marketing strategy using 4 elements: Product, Price, Place, Promotion", category: "strategy" },
    { id: "s25", termJP: "プロダクトライフサイクル", termEN: "Product Life Cycle", descJP: "製品が導入・成長・成熟・衰退の4段階を経る概念", descEN: "The concept that products go through Introduction, Growth, Maturity, and Decline stages", category: "strategy" },
    { id: "s26", termJP: "ROI", termEN: "Return on Investment", descJP: "投資に対してどれだけの利益を得られたかを示す指標", descEN: "A metric showing how much profit was gained from an investment", category: "strategy" },
    { id: "s27", termJP: "TOB", termEN: "Takeover Bid", descJP: "株式公開買付けにより経営権を取得しようとすること", descEN: "Publicly offering to buy shares to gain control of a company", category: "strategy" },
    { id: "s28", termJP: "事業継続計画", termEN: "Business Continuity Plan (BCP)", descJP: "災害・事故など緊急時にも事業を継続するための計画", descEN: "A plan to continue operations during emergencies like disasters or accidents", category: "strategy" },
    { id: "s29", termJP: "ステークホルダー", termEN: "Stakeholder", descJP: "企業活動に関わる利害関係者（顧客・株主・従業員・地域社会など）", descEN: "Parties with an interest in a company's activities (customers, shareholders, employees, etc.)", category: "strategy" },
    { id: "s30", termJP: "ロングテール", termEN: "Long Tail", descJP: "売れ筋以外の多数のニッチ商品の合計売上が大きくなる現象", descEN: "The phenomenon where sales of many niche products collectively exceed those of top sellers", category: "strategy" },
    { id: "s31", termJP: "フリーミアム", termEN: "Freemium", descJP: "基本機能を無料提供し、高機能版を有料で提供するビジネスモデル", descEN: "A model where basic features are free and premium features are paid", category: "strategy" },
    { id: "s32", termJP: "プラットフォーム戦略", termEN: "Platform Strategy", descJP: "複数の利用者グループをつなぐ基盤（プラットフォーム）を提供する戦略", descEN: "A strategy of providing a platform connecting multiple user groups", category: "strategy" },
    { id: "s33", termJP: "サブスクリプション", termEN: "Subscription Model", descJP: "定額料金を定期的に支払うことでサービスを利用するモデル", descEN: "A model where users pay a recurring fee to access a service", category: "strategy" },
    { id: "s34", termJP: "DX（デジタルトランスフォーメーション）", termEN: "Digital Transformation (DX)", descJP: "デジタル技術で社会・ビジネスのあり方を根本から変革すること", descEN: "Using digital technology to fundamentally transform society and business", category: "strategy" },
    { id: "s35", termJP: "シェアリングエコノミー", termEN: "Sharing Economy", descJP: "個人が保有する資産・スキルをインターネット経由で共有する経済モデル", descEN: "An economic model where individuals share assets or skills via the internet", category: "strategy" },
    { id: "s36", termJP: "オープンイノベーション", termEN: "Open Innovation", descJP: "社内外の知識・技術を組み合わせて新たな価値を創出するアプローチ", descEN: "Combining internal and external knowledge to create new value", category: "strategy" },
    { id: "s37", termJP: "アジャイル経営", termEN: "Agile Management", descJP: "変化に素早く対応できる柔軟な組織・経営手法", descEN: "A flexible management approach that quickly adapts to change", category: "strategy" },
    { id: "s38", termJP: "OEM", termEN: "Original Equipment Manufacturer", descJP: "他社ブランドで販売される製品を製造すること", descEN: "Manufacturing products that are sold under another company's brand", category: "strategy" },
    { id: "s39", termJP: "SOA", termEN: "Service-Oriented Architecture", descJP: "サービスを部品として組み合わせてシステムを構築するアーキテクチャ", descEN: "An architecture that builds systems by combining services as components", category: "strategy" },
    { id: "s40", termJP: "RFP", termEN: "Request for Proposal", descJP: "システム開発などで発注者がベンダーに提案を求める文書", descEN: "A document where a client requests proposals from vendors for a project", category: "strategy" },
    { id: "s41", termJP: "SLA", termEN: "Service Level Agreement", descJP: "サービス提供者と利用者の間で合意されたサービス水準の契約", descEN: "A contract defining the agreed service level between a provider and customer", category: "strategy" },
    { id: "s42", termJP: "PoC", termEN: "Proof of Concept", descJP: "新技術・アイデアの実現可能性を検証する概念実証", descEN: "A verification step to test the feasibility of a new idea or technology", category: "strategy" },
    { id: "s43", termJP: "MVP", termEN: "Minimum Viable Product", descJP: "最低限の機能で市場に早期投入し検証するプロダクト", descEN: "A product with minimum features released early to test the market", category: "strategy" },
    { id: "s44", termJP: "リーンスタートアップ", termEN: "Lean Startup", descJP: "仮説→検証→改善のサイクルを高速で回すスタートアップ手法", descEN: "A startup methodology of rapid hypothesis, testing, and iteration cycles", category: "strategy" },
    { id: "s45", termJP: "ピボット", termEN: "Pivot", descJP: "事業の方向性を大きく転換すること", descEN: "A significant shift in a startup's business direction", category: "strategy" },
    { id: "s46", termJP: "エコシステム", termEN: "Ecosystem", descJP: "企業・製品・サービスが相互に依存し共生する経済的生態系", descEN: "An economic system where companies and services coexist and depend on each other", category: "strategy" },
    { id: "s47", termJP: "ポーターの5フォース", termEN: "Porter's Five Forces", descJP: "業界の競争環境を5つの力（脅威・交渉力など）で分析する手法", descEN: "Analyzes industry competition through 5 forces: rivalry, substitutes, new entrants, buyer and supplier power", category: "strategy" },
    { id: "s48", termJP: "バリューチェーン", termEN: "Value Chain", descJP: "企業活動を主活動と支援活動に分け付加価値を分析する手法", descEN: "Analyzes added value by dividing company activities into primary and support activities", category: "strategy" },
    { id: "s49", termJP: "クロスSWOT", termEN: "Cross SWOT", descJP: "SWOTの各要素を組み合わせ具体的な戦略を導出する手法", descEN: "Combines SWOT elements to derive concrete strategies", category: "strategy" },
    { id: "s50", termJP: "3C分析", termEN: "3C Analysis", descJP: "顧客・競合・自社の3つの視点で事業環境を分析する手法", descEN: "Analyzes business environment from three perspectives: Customer, Competitor, Company", category: "strategy" },
  ],
  management: [
    { id: "m1", termJP: "プロジェクトマネジメント", termEN: "Project Management", descJP: "目標達成のためにスコープ・コスト・スケジュールを管理する手法", descEN: "Managing scope, cost, and schedule to achieve project goals", category: "management" },
    { id: "m2", termJP: "WBS", termEN: "Work Breakdown Structure", descJP: "プロジェクトの作業を階層的に細分化した構造", descEN: "A hierarchical decomposition of project work into smaller components", category: "management" },
    { id: "m3", termJP: "ガントチャート", termEN: "Gantt Chart", descJP: "作業の開始・終了時期を棒グラフで表したスケジュール管理図", descEN: "A bar chart showing project tasks with their start and end dates", category: "management" },
    { id: "m4", termJP: "クリティカルパス法", termEN: "Critical Path Method (CPM)", descJP: "プロジェクト完了に必要な最長経路を特定する手法", descEN: "Identifying the longest sequence of dependent tasks that determines project duration", category: "management" },
    { id: "m5", termJP: "PERT", termEN: "Program Evaluation and Review Technique", descJP: "三点見積もりで作業時間を予測しスケジュールを管理する手法", descEN: "Uses three-point estimates to predict task durations and manage schedules", category: "management" },
    { id: "m6", termJP: "リスクマネジメント", termEN: "Risk Management", descJP: "プロジェクトのリスクを特定・評価・対応する一連のプロセス", descEN: "The process of identifying, assessing, and responding to project risks", category: "management" },
    { id: "m7", termJP: "品質マネジメント", termEN: "Quality Management", descJP: "製品・サービスの品質基準を設定し維持向上するプロセス", descEN: "Setting and maintaining quality standards for products and services", category: "management" },
    { id: "m8", termJP: "QC七つ道具", termEN: "Seven QC Tools", descJP: "品質管理に使われる7つの図表（パレート図・特性要因図など）", descEN: "Seven tools for quality control including Pareto chart and fishbone diagram", category: "management" },
    { id: "m9", termJP: "PDCAサイクル", termEN: "PDCA Cycle", descJP: "計画→実行→評価→改善を繰り返す継続的改善サイクル", descEN: "A continuous improvement cycle: Plan, Do, Check, Act", category: "management" },
    { id: "m10", termJP: "ITIL", termEN: "IT Infrastructure Library", descJP: "ITサービスマネジメントのベストプラクティス集", descEN: "A best practice framework for IT service management", category: "management" },
    { id: "m11", termJP: "SLA", termEN: "Service Level Agreement", descJP: "サービス品質の水準をITベンダーと顧客間で取り決めた合意書", descEN: "An agreement defining service quality standards between IT vendor and customer", category: "management" },
    { id: "m12", termJP: "情報セキュリティポリシー", termEN: "Information Security Policy", descJP: "組織の情報資産を守るための基本方針・規程", descEN: "A fundamental policy and rules to protect an organization's information assets", category: "management" },
    { id: "m13", termJP: "ISMS", termEN: "Information Security Management System", descJP: "情報セキュリティを継続的に管理する仕組み（ISO 27001準拠）", descEN: "A system to continuously manage information security, based on ISO 27001", category: "management" },
    { id: "m14", termJP: "内部統制", termEN: "Internal Control", descJP: "組織が法令遵守・業務適正化のために設ける管理の仕組み", descEN: "Mechanisms organizations establish to ensure legal compliance and operational integrity", category: "management" },
    { id: "m15", termJP: "IT統制", termEN: "IT Control", descJP: "ITシステムを活用した内部統制の仕組み", descEN: "Internal control mechanisms utilizing IT systems", category: "management" },
    { id: "m16", termJP: "システム監査", termEN: "System Audit", descJP: "情報システムが適正に整備・運用されているかを独立的に評価すること", descEN: "An independent assessment of whether IT systems are properly built and operated", category: "management" },
    { id: "m17", termJP: "ファシリティマネジメント", termEN: "Facility Management", descJP: "施設・設備を最適な状態で維持管理すること", descEN: "Managing facilities and equipment in an optimal condition", category: "management" },
    { id: "m18", termJP: "SLM", termEN: "Service Level Management", descJP: "SLAで定めたサービス水準を維持・改善するプロセス", descEN: "The process of maintaining and improving service levels defined in an SLA", category: "management" },
    { id: "m19", termJP: "インシデント管理", termEN: "Incident Management", descJP: "ITサービスの障害を迅速に解決しサービスを回復するプロセス", descEN: "Rapidly resolving IT service disruptions to restore normal service", category: "management" },
    { id: "m20", termJP: "変更管理", termEN: "Change Management", descJP: "ITシステムへの変更を適切に管理しリスクを最小化するプロセス", descEN: "Managing IT system changes to minimize risk", category: "management" },
    { id: "m21", termJP: "キャパシティ管理", termEN: "Capacity Management", descJP: "ITリソースの容量を適切に管理し需要に応える能力を確保するプロセス", descEN: "Managing IT resource capacity to meet demand effectively", category: "management" },
    { id: "m22", termJP: "可用性管理", termEN: "Availability Management", descJP: "ITサービスの稼働率を維持・向上するプロセス", descEN: "Maintaining and improving IT service uptime and availability", category: "management" },
    { id: "m23", termJP: "問題管理", termEN: "Problem Management", descJP: "インシデントの根本原因を特定し再発を防止するプロセス", descEN: "Identifying root causes of incidents to prevent recurrence", category: "management" },
    { id: "m24", termJP: "構成管理", termEN: "Configuration Management", descJP: "ITシステムの構成要素（CI）の情報を管理するプロセス", descEN: "Managing information about IT system components (Configuration Items)", category: "management" },
    { id: "m25", termJP: "事業影響度分析", termEN: "Business Impact Analysis (BIA)", descJP: "システム障害時の事業への影響度を分析・評価すること", descEN: "Analyzing and evaluating the business impact of system disruptions", category: "management" },
    { id: "m26", termJP: "DR（災害復旧）", termEN: "Disaster Recovery (DR)", descJP: "災害発生後にITシステムを復旧するための手順・計画", descEN: "Plans and procedures to restore IT systems after a disaster", category: "management" },
    { id: "m27", termJP: "RTO", termEN: "Recovery Time Objective", descJP: "システム障害から復旧するまでの目標時間", descEN: "The target time within which systems must be restored after a failure", category: "management" },
    { id: "m28", termJP: "RPO", termEN: "Recovery Point Objective", descJP: "障害発生時にどの時点まで遡ってデータを復旧するかの目標", descEN: "The target point in time to which data must be restored after a failure", category: "management" },
    { id: "m29", termJP: "コスト管理", termEN: "Cost Management", descJP: "プロジェクトのコストを計画・監視・制御するプロセス", descEN: "Planning, monitoring, and controlling project costs", category: "management" },
    { id: "m30", termJP: "EVM（アーンドバリュー）", termEN: "Earned Value Management (EVM)", descJP: "コスト・スケジュールの進捗を定量的に測定する管理手法", descEN: "A method to quantitatively measure cost and schedule performance", category: "management" },
    { id: "m31", termJP: "スコープマネジメント", termEN: "Scope Management", descJP: "プロジェクトの作業範囲を定義・管理するプロセス", descEN: "Defining and managing the work required for a project", category: "management" },
    { id: "m32", termJP: "ステークホルダー管理", termEN: "Stakeholder Management", descJP: "プロジェクトの利害関係者を特定し適切に関与させるプロセス", descEN: "Identifying stakeholders and engaging them appropriately in the project", category: "management" },
    { id: "m33", termJP: "コミュニケーション計画", termEN: "Communication Plan", descJP: "プロジェクト関係者への情報伝達方法を定めた計画", descEN: "A plan defining how information is shared among project stakeholders", category: "management" },
    { id: "m34", termJP: "調達管理", termEN: "Procurement Management", descJP: "外部からの製品・サービス調達を計画・実行・管理するプロセス", descEN: "Planning, executing, and managing procurement of external products and services", category: "management" },
    { id: "m35", termJP: "プロジェクト憲章", termEN: "Project Charter", descJP: "プロジェクトの目標・スコープ・責任者を正式に承認する文書", descEN: "A document formally authorizing a project's goals, scope, and manager", category: "management" },
    { id: "m36", termJP: "マイルストーン", termEN: "Milestone", descJP: "プロジェクトの重要な区切り・節目となる時点", descEN: "A significant checkpoint or event in a project timeline", category: "management" },
    { id: "m37", termJP: "デスマーチ", termEN: "Death March", descJP: "無理な納期・仕様によりチームが消耗する困難なプロジェクト状況", descEN: "A project situation where the team is overworked due to unrealistic deadlines or specs", category: "management" },
    { id: "m38", termJP: "ファンクションポイント法", termEN: "Function Point Method", descJP: "システムの機能量を基にソフトウェア規模を見積もる手法", descEN: "A technique estimating software size based on the amount of functionality", category: "management" },
    { id: "m39", termJP: "LOC法", termEN: "Lines of Code Method", descJP: "ソースコードの行数でソフトウェア規模を見積もる手法", descEN: "Estimating software size by counting the number of source code lines", category: "management" },
    { id: "m40", termJP: "テスト計画", termEN: "Test Plan", descJP: "テストの目的・範囲・スケジュールなどを定めた計画書", descEN: "A document defining test objectives, scope, and schedule", category: "management" },
    { id: "m41", termJP: "単体テスト", termEN: "Unit Test", descJP: "プログラムの最小単位（モジュール）を個別にテストする", descEN: "Testing the smallest individual units or modules of a program", category: "management" },
    { id: "m42", termJP: "結合テスト", termEN: "Integration Test", descJP: "複数のモジュールを組み合わせてテストする", descEN: "Testing multiple modules combined together", category: "management" },
    { id: "m43", termJP: "システムテスト", termEN: "System Test", descJP: "システム全体が要件を満たしているかテストする", descEN: "Testing whether the entire system meets requirements", category: "management" },
    { id: "m44", termJP: "受入テスト", termEN: "Acceptance Test", descJP: "発注者がシステムを要件通りかを確認するテスト", descEN: "Testing by the client to confirm the system meets agreed requirements", category: "management" },
    { id: "m45", termJP: "回帰テスト", termEN: "Regression Test", descJP: "修正後も既存機能が正常に動作するか確認するテスト", descEN: "Testing to confirm that changes haven't broken existing functionality", category: "management" },
    { id: "m46", termJP: "デバッグ", termEN: "Debugging", descJP: "プログラムの誤り（バグ）を発見・修正すること", descEnum: "Finding and fixing errors (bugs) in a program", descEN: "Finding and fixing errors (bugs) in a program", category: "management" },
    { id: "m47", termJP: "ブラックボックステスト", termEN: "Black Box Test", descJP: "内部構造を考慮せず入出力だけでテストする手法", descEN: "Testing based only on inputs and outputs without considering internal structure", category: "management" },
    { id: "m48", termJP: "ホワイトボックステスト", termEN: "White Box Test", descJP: "内部構造・ロジックを把握した上でテストする手法", descEN: "Testing with knowledge of the internal structure and logic", category: "management" },
    { id: "m49", termJP: "ウォーターフォールモデル", termEN: "Waterfall Model", descJP: "要件定義→設計→実装→テストを順番に進める開発モデル", descEN: "A development model proceeding sequentially: requirements → design → implementation → testing", category: "management" },
    { id: "m50", termJP: "スクラム", termEN: "Scrum", descJP: "スプリントを単位として反復的に開発するアジャイル手法", descEN: "An agile method developing iteratively in time-boxed sprints", category: "management" },
  ],
  technology: [
    { id: "t1", termJP: "CPU", termEN: "Central Processing Unit", descJP: "コンピュータの演算・制御を担う中央処理装置", descEN: "The core component that performs computation and controls a computer", category: "technology" },
    { id: "t2", termJP: "RAM", termEN: "Random Access Memory", descJP: "プログラム実行中にデータを一時的に格納する主記憶装置", descEN: "Primary memory that temporarily stores data while programs run", category: "technology" },
    { id: "t3", termJP: "OSI参照モデル", termEN: "OSI Reference Model", descJP: "ネットワーク通信を7層に分けて定義したモデル", descEN: "A model defining network communication in 7 layers", category: "technology" },
    { id: "t4", termJP: "TCP/IP", termEN: "TCP/IP", descJP: "インターネット通信の標準プロトコル群（TCP＋IP）", descEN: "The standard suite of protocols for internet communication (TCP + IP)", category: "technology" },
    { id: "t5", termJP: "IPアドレス", termEN: "IP Address", descJP: "ネットワーク上の機器を識別するための数値アドレス", descEN: "A numerical address identifying a device on a network", category: "technology" },
    { id: "t6", termJP: "DNS", termEN: "Domain Name System", descJP: "ドメイン名をIPアドレスに変換する仕組み", descEN: "A system that translates domain names into IP addresses", category: "technology" },
    { id: "t7", termJP: "HTTP/HTTPS", termEN: "HTTP/HTTPS", descJP: "Webコンテンツを送受信するためのプロトコル（Sは暗号化あり）", descEN: "Protocols for transmitting web content (S = encrypted)", category: "technology" },
    { id: "t8", termJP: "ファイアウォール", termEN: "Firewall", descJP: "不正な通信を遮断しネットワークを保護するセキュリティ機器・機能", descEN: "A security device/feature that blocks unauthorized network traffic", category: "technology" },
    { id: "t9", termJP: "VPN", termEN: "Virtual Private Network", descJP: "公衆回線上に仮想的な専用回線を構築する技術", descEN: "Technology creating a virtual private connection over a public network", category: "technology" },
    { id: "t10", termJP: "クラウドコンピューティング", termEN: "Cloud Computing", descJP: "インターネット経由でITリソースをオンデマンドで利用するサービス形態", descEN: "On-demand delivery of IT resources over the internet", category: "technology" },
    { id: "t11", termJP: "IaaS", termEN: "Infrastructure as a Service", descJP: "仮想サーバ・ストレージ・ネットワークをクラウドで提供するサービス", descEN: "Cloud service providing virtual servers, storage, and networking", category: "technology" },
    { id: "t12", termJP: "PaaS", termEN: "Platform as a Service", descJP: "アプリ開発・実行環境をクラウドで提供するサービス", descEN: "Cloud service providing a platform for developing and running applications", category: "technology" },
    { id: "t13", termJP: "SaaS", termEN: "Software as a Service", descJP: "ソフトウェアをクラウド経由で提供するサービス（GmailやSalesforceなど）", descEN: "Delivering software applications over the cloud (e.g., Gmail, Salesforce)", category: "technology" },
    { id: "t14", termJP: "仮想化技術", termEN: "Virtualization", descJP: "1台の物理サーバ上で複数の仮想環境を動作させる技術", descEN: "Technology running multiple virtual environments on one physical server", category: "technology" },
    { id: "t15", termJP: "コンテナ型仮想化", termEN: "Container Virtualization", descJP: "OSを共有しながらアプリを隔離して実行する軽量な仮想化技術（Dockerなど）", descEN: "Lightweight virtualization sharing the OS while isolating applications (e.g., Docker)", category: "technology" },
    { id: "t16", termJP: "データベース", termEN: "Database", descJP: "データを整理・蓄積し効率よく検索・更新できる仕組み", descEN: "A system for organizing and storing data for efficient retrieval and updates", category: "technology" },
    { id: "t17", termJP: "RDBMS", termEN: "Relational Database Management System", descJP: "テーブル形式でデータを管理する関係型データベース管理システム", descEN: "A database system managing data in table format with relationships", category: "technology" },
    { id: "t18", termJP: "SQL", termEN: "Structured Query Language", descJP: "リレーショナルDBを操作するための標準的な問い合わせ言語", descEN: "The standard language for querying and manipulating relational databases", category: "technology" },
    { id: "t19", termJP: "正規化", termEN: "Normalization", descJP: "データの冗長性・矛盾を排除するためにテーブルを分割・整理する操作", descEN: "Organizing tables to reduce redundancy and inconsistency in data", category: "technology" },
    { id: "t20", termJP: "トランザクション", termEN: "Transaction", descJP: "分割できない一連のDB操作の単位（ACID特性を持つ）", descEN: "An indivisible unit of database operations with ACID properties", category: "technology" },
    { id: "t21", termJP: "暗号化", termEN: "Encryption", descJP: "データを特定のアルゴリズムで変換し第三者に読めなくする技術", descEN: "Converting data using an algorithm so it cannot be read by unauthorized parties", category: "technology" },
    { id: "t22", termJP: "公開鍵暗号方式", termEN: "Public Key Cryptography", descJP: "公開鍵と秘密鍵のペアを使う暗号方式", descEN: "An encryption method using a pair of public and private keys", category: "technology" },
    { id: "t23", termJP: "デジタル署名", termEN: "Digital Signature", descJP: "電子データの作成者を証明し改ざんを検知する仕組み", descEN: "A mechanism to verify data authorship and detect tampering", category: "technology" },
    { id: "t24", termJP: "PKI", termEN: "Public Key Infrastructure", descJP: "公開鍵暗号を利用した認証基盤の仕組み全体", descEN: "The entire framework supporting public key cryptography for authentication", category: "technology" },
    { id: "t25", termJP: "SSL/TLS", termEN: "SSL/TLS", descJP: "インターネット通信を暗号化するプロトコル（HTTPSで使用）", descEN: "Protocols encrypting internet communication (used in HTTPS)", category: "technology" },
    { id: "t26", termJP: "マルウェア", termEN: "Malware", descJP: "ウイルス・ランサムウェアなど悪意のあるソフトウェアの総称", descEN: "Malicious software including viruses, ransomware, and spyware", category: "technology" },
    { id: "t27", termJP: "フィッシング", termEN: "Phishing", descJP: "偽サイト・偽メールで個人情報を騙し取るサイバー攻撃", descEN: "A cyber attack using fake sites or emails to steal personal information", category: "technology" },
    { id: "t28", termJP: "DoS攻撃", termEN: "Denial of Service Attack", descJP: "大量のリクエストを送りサービスを使用不能にする攻撃", descEN: "An attack sending massive requests to make a service unavailable", category: "technology" },
    { id: "t29", termJP: "SQLインジェクション", termEN: "SQL Injection", descJP: "悪意のあるSQL文を入力しDBを不正操作するサイバー攻撃", descEN: "An attack inserting malicious SQL to illegally manipulate a database", category: "technology" },
    { id: "t30", termJP: "XSS", termEN: "Cross-Site Scripting", descJP: "悪意のあるスクリプトをWebページに埋め込む攻撃", descEN: "An attack embedding malicious scripts into web pages", category: "technology" },
    { id: "t31", termJP: "二要素認証", termEN: "Two-Factor Authentication (2FA)", descJP: "パスワードに加え別の認証要素（SMSコードなど）を組み合わせる認証方式", descEN: "Authentication combining password with a second factor like an SMS code", category: "technology" },
    { id: "t32", termJP: "生体認証", termEN: "Biometric Authentication", descJP: "指紋・顔・虹彩などの生体情報を使って本人確認する認証方式", descEN: "Authentication using biological traits like fingerprints, face, or iris", category: "technology" },
    { id: "t33", termJP: "AI（人工知能）", termEN: "Artificial Intelligence (AI)", descJP: "人間の知的活動をコンピュータで再現する技術・研究分野", descEN: "Technology and research replicating human intelligence in computers", category: "technology" },
    { id: "t34", termJP: "機械学習", termEN: "Machine Learning", descJP: "データからルールをコンピュータが自動的に学習する技術", descEN: "Technology enabling computers to learn rules automatically from data", category: "technology" },
    { id: "t35", termJP: "深層学習（ディープラーニング）", termEN: "Deep Learning", descJP: "ニューラルネットワークの多層構造で複雑なパターンを学習する技術", descEN: "Learning complex patterns using multi-layered neural networks", category: "technology" },
    { id: "t36", termJP: "IoT", termEN: "Internet of Things", descJP: "様々なモノをインターネットに接続しデータを活用する仕組み", descEN: "Connecting various devices to the internet to collect and use data", category: "technology" },
    { id: "t37", termJP: "ビッグデータ", termEN: "Big Data", descJP: "従来の手法では処理困難な大量・多様・高速なデータの集合", descEN: "Massive, varied, and rapidly generated datasets beyond conventional processing", category: "technology" },
    { id: "t38", termJP: "ブロックチェーン", termEN: "Blockchain", descJP: "改ざんが困難な分散型台帳技術（仮想通貨に使われる）", descEN: "A tamper-resistant distributed ledger technology (used in cryptocurrency)", category: "technology" },
    { id: "t39", termJP: "API", termEN: "Application Programming Interface", descJP: "ソフトウェア間でデータや機能を連携するための接続仕様", descEN: "A specification enabling software systems to exchange data and functionality", category: "technology" },
    { id: "t40", termJP: "REST", termEN: "Representational State Transfer", descJP: "WebAPIの設計原則で、HTTPメソッドを使いリソースを操作する", descEN: "A web API design principle using HTTP methods to operate on resources", category: "technology" },
    { id: "t41", termJP: "ソースコード管理", termEN: "Source Code Management (SCM)", descJP: "ソースコードの変更履歴を管理するシステム（Gitなど）", descEN: "A system managing source code change history (e.g., Git)", category: "technology" },
    { id: "t42", termJP: "CI/CD", termEN: "Continuous Integration / Continuous Delivery", descJP: "コードの統合・テスト・リリースを自動化する開発手法", descEN: "Automating code integration, testing, and release in development", category: "technology" },
    { id: "t43", termJP: "DevOps", termEN: "DevOps", descJP: "開発と運用が連携して高速にシステムを改善する文化・手法", descEN: "A culture and practice where development and operations collaborate for rapid improvement", category: "technology" },
    { id: "t44", termJP: "マイクロサービス", termEN: "Microservices", descJP: "アプリを小さな独立したサービスに分割して構築するアーキテクチャ", descEN: "An architecture building applications as small, independent services", category: "technology" },
    { id: "t45", termJP: "サーバレスアーキテクチャ", termEN: "Serverless Architecture", descJP: "サーバの管理なしに関数単位でコードを実行するクラウド形態", descEN: "A cloud model running code as functions without managing servers", category: "technology" },
    { id: "t46", termJP: "ユニコード（Unicode）", termEN: "Unicode", descJP: "世界中の文字を統一的に扱う文字コード規格", descEN: "An international character encoding standard covering most of the world's writing systems", category: "technology" },
    { id: "t47", termJP: "2進数", termEN: "Binary Number", descJP: "0と1のみで表す数値体系（コンピュータの基本表現）", descEN: "A number system using only 0 and 1, the fundamental representation in computers", category: "technology" },
    { id: "t48", termJP: "フローチャート", termEN: "Flowchart", descJP: "処理の流れを図形と矢印で表した図（アルゴリズムの可視化）", descEN: "A diagram using shapes and arrows to represent process flow (algorithm visualization)", category: "technology" },
    { id: "t49", termJP: "オブジェクト指向", termEN: "Object-Oriented Programming", descJP: "現実世界をオブジェクトとして捉えプログラムを設計する手法", descEN: "A programming approach modeling real-world entities as objects", category: "technology" },
    { id: "t50", termJP: "UML", termEN: "Unified Modeling Language", descJP: "ソフトウェアの設計・構造を可視化する標準的な図法", descEN: "A standardized notation for visualizing software design and structure", category: "technology" },
  ],
};

const ALL_QUESTIONS = [
  ...QUESTIONS.strategy,
  ...QUESTIONS.management,
  ...QUESTIONS.technology,
];

// ============================================================
// 🌐 TRANSLATIONS
// ============================================================
const T = {
  JP: {
    appTitle: "IT Passport 学習アプリ",
    appSubtitle: "楽しく学んで合格を目指そう！",
    flashcards: "フラッシュカード",
    quiz: "クイズ",
    aiTutor: "AI チューター",
    strategy: "ストラテジ",
    management: "マネジメント",
    technology: "テクノロジ",
    tapToFlip: "タップして裏返す",
    prev: "前へ",
    next: "次へ",
    cardCount: (i, t) => `${i} / ${t}`,
    startQuiz: "クイズを始める",
    quizTitle: "クイズ",
    quizSubtitle: "10問ランダム出題",
    submit: "回答する",
    nextQ: "次の問題",
    showResult: "結果を見る",
    retryQuiz: "もう一度",
    resultTitle: "結果",
    score: (s, t) => `${s} / ${t} 問正解`,
    percent: (p) => `正答率: ${p}%`,
    rankS: "🏆 素晴らしい！合格圏内です！",
    rankA: "🎉 よくできました！もう少し！",
    rankB: "📚 もう少し頑張りましょう！",
    rankC: "💪 基礎から復習しましょう！",
    correct: "正解！",
    incorrect: "不正解",
    correctAnswer: "正解：",
    chatPlaceholder: "わからないことを質問してください...",
    send: "送信",
    aiGreeting: "こんにちは！IT Passport の学習をサポートします。わからないことを何でも聞いてください！😊",
    all: "全範囲",
    progress: "進捗",
    selectCategory: "カテゴリ選択",
  },
  EN: {
    appTitle: "IT Passport Study App",
    appSubtitle: "Study smart, pass with confidence!",
    flashcards: "Flashcards",
    quiz: "Quiz",
    aiTutor: "AI Tutor",
    strategy: "Strategy",
    management: "Management",
    technology: "Technology",
    tapToFlip: "Tap to flip",
    prev: "Prev",
    next: "Next",
    cardCount: (i, t) => `${i} / ${t}`,
    startQuiz: "Start Quiz",
    quizTitle: "Quiz",
    quizSubtitle: "10 random questions",
    submit: "Submit",
    nextQ: "Next",
    showResult: "See Results",
    retryQuiz: "Try Again",
    resultTitle: "Results",
    score: (s, t) => `${s} / ${t} correct`,
    percent: (p) => `Score: ${p}%`,
    rankS: "🏆 Excellent! You're in the passing zone!",
    rankA: "🎉 Great job! Almost there!",
    rankB: "📚 Keep studying!",
    rankC: "💪 Let's review the basics!",
    correct: "Correct!",
    incorrect: "Incorrect",
    correctAnswer: "Answer: ",
    chatPlaceholder: "Ask anything about IT Passport...",
    send: "Send",
    aiGreeting: "Hello! I'm here to help you study for IT Passport. Ask me anything! 😊",
    all: "All",
    progress: "Progress",
    selectCategory: "Select Category",
  },
};

// ============================================================
// 🎲 UTILITY
// ============================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuizQuestions(lang) {
  const pool = shuffle(ALL_QUESTIONS).slice(0, 10);
  return pool.map((q) => {
    const wrong = shuffle(
      ALL_QUESTIONS.filter((x) => x.id !== q.id)
    ).slice(0, 3);
    const options = shuffle([q, ...wrong]);
    return {
      q,
      options,
      correctId: q.id,
    };
  });
}

// ============================================================
// STARFIELD
// ============================================================
function Starfield({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.018 + 0.005,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.phase += s.twinkleSpeed;
        const alpha = dark
          ? 0.2 + Math.sin(s.phase) * 0.65
          : 0.08 + Math.sin(s.phase) * 0.18;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? `rgba(220,215,255,${alpha})` : `rgba(100,90,180,${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [dark]);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", width:"100%", height:"100%" }} />;
}

// ============================================================
// NAV BAR
// ============================================================
function NavBar({ module, setModule, lang, setLang, t, dark, setDark }) {
  const tabs = [
    { id: "flashcards", label: t.flashcards },
    { id: "quiz", label: t.quiz },
    { id: "ai", label: t.aiTutor },
  ];
  const D = {
    navBg: dark ? "rgba(8,6,22,0.75)" : "rgba(255,255,255,0.15)",
    border: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.3)",
    activeBg: dark ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.45)",
    activeColor: dark ? "#c4b5fd" : "#4338ca",
    inactiveColor: dark ? "#6b7280" : "#555",
    btnBg: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.4)",
    btnBorder: dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.6)",
    btnColor: dark ? "#a5b4fc" : "#4338ca",
  };
  return (
    <nav style={{
      position:"sticky", top:0, zIndex:100,
      background: D.navBg, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      borderBottom:`1px solid ${D.border}`, padding:"0 1.2rem",
      display:"flex", alignItems:"center", justifyContent:"space-between", height:52,
    }}>
      <div style={{ display:"flex", gap:3 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setModule(tab.id)} style={{
            background: module===tab.id ? D.activeBg : "transparent",
            border:"none", borderRadius:10, padding:"5px 14px", cursor:"pointer",
            fontFamily:"inherit", fontWeight: module===tab.id ? 700 : 500,
            fontSize:13, color: module===tab.id ? D.activeColor : D.inactiveColor,
            transition:"all 0.18s",
            boxShadow: module===tab.id && dark ? "0 0 14px rgba(139,92,246,0.35)" : "none",
          }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", gap:7 }}>
        <button onClick={() => setDark(d => !d)} style={{
          background: D.btnBg, border:`1.5px solid ${D.btnBorder}`,
          borderRadius:18, padding:"4px 13px", cursor:"pointer",
          fontWeight:700, fontSize:11, color: D.btnColor, fontFamily:"inherit",
          transition:"all 0.2s", letterSpacing:0.8,
        }}>
          {dark ? "LIGHT" : "DARK"}
        </button>
        <button onClick={() => setLang(lang==="JP" ? "EN" : "JP")} style={{
          background: D.btnBg, border:`1.5px solid ${D.btnBorder}`,
          borderRadius:18, padding:"4px 13px", cursor:"pointer",
          fontWeight:700, fontSize:11, color: D.btnColor, fontFamily:"inherit",
          transition:"all 0.2s", letterSpacing:0.8,
        }}>
          {lang==="JP" ? "JP / EN" : "EN / JP"}
        </button>
      </div>
    </nav>
  );
}

// ============================================================
// HERO — Landing with 3 module cards
// ============================================================
function HeroLanding({ setModule, lang, t, dark }) {
  const [hovered, setHovered] = useState(null);
  const modules = [
    {
      id: "flashcards",
      labelJP: "フラッシュカード", labelEN: "Flashcards",
      descJP: "用語を素早く暗記。カードを裏返して意味を確認しよう。",
      descEN: "Memorize terms fast. Flip cards to check definitions.",
      accent: "#6366f1",
      glow: "rgba(99,102,241,0.45)",
      borderLight: "rgba(99,102,241,0.25)",
      borderDark: "rgba(139,92,246,0.45)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="3" y="7" width="24" height="16" rx="4" fill="none" stroke={dark?"#a5b4fc":"#6366f1"} strokeWidth="2"/>
          <rect x="9" y="13" width="24" height="16" rx="4" fill={dark?"rgba(99,102,241,0.2)":"rgba(99,102,241,0.12)"} stroke={dark?"#818cf8":"#6366f1"} strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      id: "quiz",
      labelJP: "クイズ", labelEN: "Quiz",
      descJP: "10問のランダムテストで理解度をチェックしよう。",
      descEN: "Test your knowledge with 10 random questions.",
      accent: "#8b5cf6",
      glow: "rgba(139,92,246,0.45)",
      borderLight: "rgba(139,92,246,0.25)",
      borderDark: "rgba(167,139,250,0.45)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="6" y="4" width="24" height="28" rx="4" fill="none" stroke={dark?"#c4b5fd":"#8b5cf6"} strokeWidth="2"/>
          <line x1="11" y1="13" x2="25" y2="13" stroke={dark?"#a78bfa":"#8b5cf6"} strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="11" y1="18" x2="25" y2="18" stroke={dark?"#a78bfa":"#8b5cf6"} strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="11" y1="23" x2="19" y2="23" stroke={dark?"#a78bfa":"#8b5cf6"} strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="27" cy="25" r="5" fill={dark?"#7c3aed":"#8b5cf6"}/>
          <path d="M24.5 25l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "ai",
      labelJP: "AI チューター", labelEN: "AI Tutor",
      descJP: "わからないことを何でも聞ける。AIがわかりやすく解説。",
      descEN: "Ask anything. Your AI explains IT concepts clearly.",
      accent: "#06b6d4",
      glow: "rgba(6,182,212,0.4)",
      borderLight: "rgba(6,182,212,0.25)",
      borderDark: "rgba(34,211,238,0.4)",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="12" fill="none" stroke={dark?"#67e8f9":"#06b6d4"} strokeWidth="2"/>
          <circle cx="13" cy="15" r="2" fill={dark?"#67e8f9":"#06b6d4"}/>
          <circle cx="23" cy="15" r="2" fill={dark?"#67e8f9":"#06b6d4"}/>
          <path d="M13 22c1.3 2 8.7 2 10 0" stroke={dark?"#67e8f9":"#06b6d4"} strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 6l2-3" stroke={dark?"#a5f3fc":"#0891b2"} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M29 10l3-1" stroke={dark?"#a5f3fc":"#0891b2"} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  const titleColor = dark ? "#e2e8f0" : "#1e1b4b";
  const cardBg = dark ? "rgba(20,15,45,0.7)" : "rgba(255,255,255,0.45)";
  const cardBorder = (m) => hovered===m.id
    ? (dark ? m.borderDark : m.borderLight)
    : dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.55)";

  return (
    <div style={{ padding:"2.5rem 1.5rem 3rem", maxWidth:760, margin:"0 auto" }}>
      {/* Big hero title */}
      <div style={{ textAlign:"center", marginBottom:"3rem" }}>
        <h1 style={{
          margin:0,
          fontSize: "clamp(32px, 7vw, 62px)",
          fontWeight:900, letterSpacing:"-1.5px", lineHeight:1.08,
          color: titleColor,
        }}>
          {lang==="JP" ? "IT Passport" : "IT Passport"}
        </h1>
        <h1 style={{
          margin:"4px 0 0",
          fontSize: "clamp(28px, 6vw, 52px)",
          fontWeight:900, letterSpacing:"-1.5px", lineHeight:1.08,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        }}>
          {lang==="JP" ? "学習アプリ" : "Study App"}
        </h1>
        <p style={{ margin:"16px 0 0", fontSize:"clamp(14px,2.5vw,17px)", color: dark?"#6b7280":"#6366f1", fontWeight:600, letterSpacing:0.3 }}>
          {lang==="JP" ? "楽しく学んで合格を目指そう" : "Study smart · Pass with confidence"}
        </p>
      </div>

      {/* 3 Module cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:16 }}>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setModule(m.id)}
            onMouseEnter={() => setHovered(m.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: cardBg,
              backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
              border:`1.5px solid ${cardBorder(m)}`,
              borderRadius:22, padding:"2rem 1.5rem",
              cursor:"pointer", textAlign:"left", fontFamily:"inherit",
              display:"flex", flexDirection:"column", gap:14,
              transition:"all 0.22s cubic-bezier(0.4,0,0.2,1)",
              transform: hovered===m.id ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
              boxShadow: hovered===m.id
                ? `0 20px 50px ${m.glow}, 0 0 0 1px ${m.borderDark}`
                : dark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 16px rgba(99,102,241,0.08)",
            }}
          >
            {/* Icon */}
            <div style={{
              width:56, height:56, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center",
              background: dark ? `${m.accent}22` : `${m.accent}12`,
              border:`1px solid ${dark ? m.borderDark : m.borderLight}`,
              transition:"all 0.22s",
              boxShadow: hovered===m.id ? `0 0 20px ${m.glow}` : "none",
            }}>
              {m.icon}
            </div>
            {/* Label */}
            <div>
              <div style={{
                fontSize:"clamp(17px,3vw,22px)", fontWeight:800,
                color: hovered===m.id ? m.accent : (dark ? "#e2e8f0" : "#1e1b4b"),
                letterSpacing:"-0.3px", transition:"color 0.18s",
              }}>
                {lang==="JP" ? m.labelJP : m.labelEN}
              </div>
              <div style={{ fontSize:13, color: dark?"#6b7280":"#888", marginTop:6, lineHeight:1.5, fontWeight:500 }}>
                {lang==="JP" ? m.descJP : m.descEN}
              </div>
            </div>
            {/* Arrow */}
            <div style={{
              marginTop:"auto", fontSize:13, fontWeight:700,
              color: m.accent, letterSpacing:0.5, opacity: hovered===m.id ? 1 : 0.5,
              transition:"all 0.18s",
            }}>
              {lang==="JP" ? "開く" : "Open"} →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// FLASHCARD
// ============================================================
function FlashCard({ card, lang, t, dark }) {
  const [flipped, setFlipped] = useState(false);
  const term = lang==="JP" ? card.termJP : card.termEN;
  const desc = lang==="JP" ? card.descJP : card.descEN;
  useEffect(() => { setFlipped(false); }, [card.id]);

  const catColor = {
    strategy:   { bg: dark?"rgba(59,130,246,0.15)":"#dbeafe", accent:"#3b82f6", text: dark?"#93c5fd":"#1e40af" },
    management: { bg: dark?"rgba(139,92,246,0.15)":"#ede9fe", accent:"#8b5cf6", text: dark?"#c4b5fd":"#5b21b6" },
    technology: { bg: dark?"rgba(34,197,94,0.12)":"#dcfce7", accent:"#22c55e", text: dark?"#86efac":"#15803d" },
  }[card.category];

  const frontBg = dark ? "rgba(18,14,40,0.75)" : "rgba(255,255,255,0.55)";
  const frontBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)";
  const termColor = dark ? "#e2e8f0" : "#1e1b4b";
  const hintColor = dark ? "#4b5563" : "#aaa";

  return (
    <div onClick={() => setFlipped(!flipped)} style={{ perspective:1000, cursor:"pointer", width:"100%", maxWidth:520, margin:"0 auto", height:240 }}>
      <div style={{
        position:"relative", width:"100%", height:"100%", transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden",
          background: frontBg, backdropFilter:"blur(16px)",
          borderRadius:24, border:`1.5px solid ${frontBorder}`,
          boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(99,102,241,0.15)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          padding:"2rem", textAlign:"center", gap:16,
        }}>
          <span style={{ background:catColor.bg, color:catColor.text, borderRadius:20, padding:"4px 14px", fontSize:12, fontWeight:700 }}>
            {t[card.category]}
          </span>
          <div style={{ fontSize:26, fontWeight:800, color:termColor, lineHeight:1.2 }}>{term}</div>
          <div style={{ fontSize:12, color:hintColor, marginTop:4, letterSpacing:0.5 }}>— {t.tapToFlip} —</div>
        </div>
        <div style={{
          position:"absolute", inset:0, backfaceVisibility:"hidden", transform:"rotateY(180deg)",
          background:`linear-gradient(135deg, ${catColor.accent}dd, ${catColor.accent}99)`,
          borderRadius:24, border:`1.5px solid ${catColor.accent}66`,
          boxShadow:"0 8px 32px rgba(99,102,241,0.25)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          padding:"2rem", textAlign:"center", gap:12,
        }}>
          <div style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.7)" }}>{term}</div>
          <div style={{ fontSize:17, fontWeight:600, color:"#fff", lineHeight:1.6 }}>{desc}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FLASHCARDS MODULE
// ============================================================
function FlashcardsModule({ lang, t, dark }) {
  const [category, setCategory] = useState("strategy");
  const [index, setIndex] = useState(0);
  const cards = QUESTIONS[category];

  const catColors = {
    strategy:   { active:"#3b82f6", bg: dark?"rgba(59,130,246,0.18)":"#dbeafe" },
    management: { active:"#8b5cf6", bg: dark?"rgba(139,92,246,0.18)":"#ede9fe" },
    technology: { active:"#22c55e", bg: dark?"rgba(34,197,94,0.15)":"#dcfce7" },
  };
  const textMuted = dark ? "#6b7280" : "#666";
  const navBtnBg = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.5)";
  const navBtnBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.3)";
  const counterBg = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.5)";
  const counterColor = dark ? "#a5b4fc" : "#4338ca";

  return (
    <div style={{ padding:"1.5rem 1rem", maxWidth:600, margin:"0 auto" }}>
      <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:24 }}>
        {["strategy","management","technology"].map(cat => {
          const c = catColors[cat];
          return (
            <button key={cat} onClick={() => { setCategory(cat); setIndex(0); }} style={{
              padding:"7px 16px", borderRadius:20, border:"none", cursor:"pointer",
              fontFamily:"inherit", fontWeight:700, fontSize:13,
              background: category===cat ? c.active : c.bg,
              color: category===cat ? "#fff" : (dark ? c.active : c.active),
              transition:"all 0.2s", boxShadow: category===cat ? `0 3px 10px ${c.active}55` : "none",
            }}>{t[cat]}</button>
          );
        })}
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:13, color:textMuted }}>
          <span>{t.progress}</span><span>{t.cardCount(index+1, cards.length)}</span>
        </div>
        <div style={{ height:5, borderRadius:3, background: dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)", overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:3, background:"linear-gradient(90deg, #6366f1, #8b5cf6)", width:`${((index+1)/cards.length)*100}%`, transition:"width 0.3s" }} />
        </div>
      </div>
      <FlashCard card={cards[index]} lang={lang} t={t} dark={dark} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:24 }}>
        <button onClick={() => setIndex(Math.max(0,index-1))} disabled={index===0} style={{
          padding:"10px 22px", borderRadius:14, border:`1.5px solid ${navBtnBorder}`,
          background:navBtnBg, cursor:index===0?"not-allowed":"pointer",
          fontFamily:"inherit", fontWeight:700, fontSize:14,
          color: index===0 ? (dark?"#374151":"#bbb") : (dark?"#a5b4fc":"#6366f1"),
          transition:"all 0.2s",
        }}>← {t.prev}</button>
        <div style={{ background:counterBg, borderRadius:20, padding:"6px 20px", fontWeight:800, color:counterColor, fontSize:15 }}>
          {index+1} / {cards.length}
        </div>
        <button onClick={() => setIndex(Math.min(cards.length-1,index+1))} disabled={index===cards.length-1} style={{
          padding:"10px 22px", borderRadius:14, border:`1.5px solid ${navBtnBorder}`,
          background:navBtnBg, cursor:index===cards.length-1?"not-allowed":"pointer",
          fontFamily:"inherit", fontWeight:700, fontSize:14,
          color: index===cards.length-1 ? (dark?"#374151":"#bbb") : (dark?"#a5b4fc":"#6366f1"),
          transition:"all 0.2s",
        }}>{t.next} →</button>
      </div>
    </div>
  );
}

// ============================================================
// QUIZ MODULE
// ============================================================
function QuizModule({ lang, t, dark }) {
  const [phase, setPhase] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function startQuiz() {
    setQuestions(generateQuizQuestions());
    setCurrentQ(0); setSelected(null); setAnswers([]); setSubmitted(false);
    setPhase("playing");
  }
  function handleSubmit() {
    if (selected===null) return;
    setSubmitted(true);
    setAnswers(prev => [...prev, { isCorrect: selected===questions[currentQ].correctId }]);
  }
  function handleNext() {
    if (currentQ+1>=questions.length) { setPhase("result"); } else {
      setCurrentQ(p=>p+1); setSelected(null); setSubmitted(false);
    }
  }

  const cardBg = dark ? "rgba(18,14,40,0.75)" : "rgba(255,255,255,0.55)";
  const cardBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.1)";
  const textPrimary = dark ? "#e2e8f0" : "#1e1b4b";
  const textMuted = dark ? "#6b7280" : "#888";
  const optBase = dark ? "rgba(18,14,40,0.6)" : "rgba(255,255,255,0.5)";
  const optBorderBase = dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)";

  if (phase==="start") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"3rem 1rem", gap:28 }}>
      <div style={{ textAlign:"center" }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ display:"block", margin:"0 auto 16px" }}>
          <rect x="8" y="6" width="40" height="44" rx="6" fill="none" stroke={dark?"#a5b4fc":"#6366f1"} strokeWidth="2.5"/>
          <line x1="16" y1="20" x2="40" y2="20" stroke={dark?"#818cf8":"#6366f1"} strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="28" x2="40" y2="28" stroke={dark?"#818cf8":"#6366f1"} strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="36" x2="30" y2="36" stroke={dark?"#818cf8":"#6366f1"} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="42" cy="40" r="8" fill={dark?"#7c3aed":"#8b5cf6"}/>
          <path d="M39 40l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 style={{ fontSize:24, fontWeight:800, color:textPrimary, margin:0 }}>{t.quizTitle}</h2>
        <p style={{ color:textMuted, marginTop:8 }}>{t.quizSubtitle}</p>
      </div>
      <button onClick={startQuiz} style={{
        background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:20,
        padding:"14px 52px", fontSize:17, fontWeight:800, color:"#fff", cursor:"pointer",
        fontFamily:"inherit", boxShadow:"0 6px 24px rgba(99,102,241,0.4)", transition:"transform 0.1s",
      }}
        onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
        onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
      >{t.startQuiz}</button>
    </div>
  );

  if (phase==="result") {
    const score = answers.filter(a=>a.isCorrect).length;
    const pct = Math.round((score/10)*100);
    const rank = pct>=80?t.rankS:pct>=60?t.rankA:pct>=40?t.rankB:t.rankC;
    const arcColor = pct>=80?"#22c55e":pct>=60?"#f59e0b":pct>=40?"#f97316":"#ef4444";
    return (
      <div style={{ padding:"2rem 1rem", maxWidth:500, margin:"0 auto", textAlign:"center" }}>
        <h2 style={{ fontSize:22, fontWeight:800, color:textPrimary }}>{t.resultTitle}</h2>
        <div style={{ background:cardBg, backdropFilter:"blur(16px)", borderRadius:24, padding:"2rem", boxShadow: dark?"0 8px 32px rgba(0,0,0,0.5)":"0 8px 32px rgba(99,102,241,0.12)", margin:"1.5rem 0" }}>
          <div style={{ fontSize:60, fontWeight:900, color:arcColor }}>{pct}%</div>
          <div style={{ fontSize:17, fontWeight:700, color:textPrimary, marginTop:8 }}>{t.score(score,10)}</div>
          <div style={{ marginTop:14, fontSize:15, color:dark?"#9ca3af":"#555" }}>{rank}</div>
        </div>
        <div style={{ textAlign:"left", display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
          {questions.map((q,i) => {
            const ok = answers[i]?.isCorrect;
            const term = lang==="JP" ? q.q.termJP : q.q.termEN;
            return (
              <div key={i} style={{
                background: ok ? (dark?"rgba(34,197,94,0.1)":"rgba(34,197,94,0.08)") : (dark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.08)"),
                borderRadius:12, padding:"10px 14px",
                border:`1px solid ${ok?(dark?"#22c55e44":"#22c55e33"):(dark?"#ef444444":"#ef444433")}`,
                display:"flex", gap:10, alignItems:"center",
              }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{ok ? "✓" : "✗"}</span>
                <span style={{ fontSize:14, fontWeight:600, color:textPrimary }}>{term}</span>
              </div>
            );
          })}
        </div>
        <button onClick={startQuiz} style={{
          background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:20,
          padding:"12px 40px", fontSize:15, fontWeight:800, color:"#fff", cursor:"pointer", fontFamily:"inherit",
          boxShadow:"0 4px 16px rgba(99,102,241,0.3)",
        }}>{t.retryQuiz}</button>
      </div>
    );
  }

  const qData = questions[currentQ];
  const catColor = { strategy:"#3b82f6", management:"#8b5cf6", technology:"#22c55e" }[qData.q.category];

  return (
    <div style={{ padding:"1.5rem 1rem", maxWidth:560, margin:"0 auto" }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:textMuted, marginBottom:6 }}>
          <span>{t.quizTitle}</span><span>{currentQ+1} / {questions.length}</span>
        </div>
        <div style={{ height:5, borderRadius:3, background: dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)", overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:3, background:"linear-gradient(90deg, #6366f1, #8b5cf6)", width:`${((currentQ+1)/questions.length)*100}%`, transition:"width 0.3s" }} />
        </div>
      </div>
      <div style={{ background:cardBg, backdropFilter:"blur(14px)", borderRadius:20, padding:"1.5rem", border:`1px solid ${cardBorder}`, marginBottom:20, boxShadow: dark?"0 6px 24px rgba(0,0,0,0.4)":"0 6px 24px rgba(99,102,241,0.1)" }}>
        <div style={{ fontSize:12, color:catColor, fontWeight:700, marginBottom:8, letterSpacing:0.5 }}>{t[qData.q.category]}</div>
        <div style={{ fontSize:17, fontWeight:800, color:textPrimary, lineHeight:1.55 }}>{lang==="JP" ? qData.q.descJP : qData.q.descEN}</div>
        <div style={{ fontSize:12, color:textMuted, marginTop:10, letterSpacing:0.3 }}>{lang==="JP" ? "この説明に当てはまる用語はどれ？" : "Which term matches this description?"}</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:18 }}>
        {qData.options.map(opt => {
          const isSelected = selected===opt.id;
          const isCorrect = opt.id===qData.correctId;
          let bg = optBase, border = `1.5px solid ${optBorderBase}`, color = textPrimary;
          if (submitted) {
            if (isCorrect) { bg = dark?"rgba(34,197,94,0.15)":"rgba(34,197,94,0.12)"; border="1.5px solid #22c55e"; color="#22c55e"; }
            else if (isSelected&&!isCorrect) { bg = dark?"rgba(239,68,68,0.15)":"rgba(239,68,68,0.1)"; border="1.5px solid #ef4444"; color="#ef4444"; }
          } else if (isSelected) { bg=dark?"rgba(99,102,241,0.2)":"rgba(99,102,241,0.12)"; border="1.5px solid #6366f1"; color=dark?"#a5b4fc":"#4338ca"; }
          return (
            <button key={opt.id} onClick={() => !submitted&&setSelected(opt.id)} style={{
              background:bg, border, borderRadius:14, padding:"11px 16px",
              textAlign:"left", cursor:submitted?"default":"pointer",
              fontFamily:"inherit", fontWeight:700, fontSize:14, color,
              transition:"all 0.15s", display:"flex", alignItems:"center", gap:10,
            }}>
              <span style={{
                width:26, height:26, borderRadius:"50%", display:"inline-flex", alignItems:"center", justifyContent:"center",
                background: submitted&&isCorrect?"#22c55e" : submitted&&isSelected&&!isCorrect?"#ef4444" : isSelected?"#6366f1" : dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)",
                color: (submitted&&isCorrect)||(submitted&&isSelected&&!isCorrect)||isSelected ? "#fff" : textMuted,
                fontSize:12, fontWeight:800, flexShrink:0, transition:"all 0.15s",
              }}>
                {submitted&&isCorrect?"✓" : submitted&&isSelected&&!isCorrect?"✗" : ""}
              </span>
              {lang==="JP" ? opt.termJP : opt.termEN}
            </button>
          );
        })}
      </div>
      {submitted && (
        <div style={{
          background: answers[answers.length-1]?.isCorrect ? (dark?"rgba(34,197,94,0.12)":"rgba(34,197,94,0.1)") : (dark?"rgba(239,68,68,0.12)":"rgba(239,68,68,0.08)"),
          borderRadius:14, padding:"11px 16px", marginBottom:14,
          border:`1px solid ${answers[answers.length-1]?.isCorrect ? "#22c55e44":"#ef444444"}`,
        }}>
          <div style={{ fontWeight:800, color:answers[answers.length-1]?.isCorrect?"#22c55e":"#ef4444" }}>
            {answers[answers.length-1]?.isCorrect ? t.correct : t.incorrect}
          </div>
          {!answers[answers.length-1]?.isCorrect && (
            <div style={{ fontSize:13, color:textMuted, marginTop:4 }}>{t.correctAnswer}{lang==="JP"?qData.q.termJP:qData.q.termEN}</div>
          )}
        </div>
      )}
      <div style={{ display:"flex", gap:10 }}>
        {!submitted ? (
          <button onClick={handleSubmit} disabled={selected===null} style={{
            flex:1, background:selected!==null?"linear-gradient(135deg, #6366f1, #8b5cf6)":dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)",
            border:"none", borderRadius:14, padding:"13px", fontSize:15, fontWeight:800,
            color:selected!==null?"#fff":dark?"#374151":"#aaa",
            cursor:selected!==null?"pointer":"not-allowed", fontFamily:"inherit", transition:"all 0.2s",
          }}>{t.submit}</button>
        ) : (
          <button onClick={handleNext} style={{
            flex:1, background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:14,
            padding:"13px", fontSize:15, fontWeight:800, color:"#fff", cursor:"pointer", fontFamily:"inherit",
            boxShadow:"0 4px 16px rgba(99,102,241,0.3)",
          }}>{currentQ+1>=questions.length ? t.showResult : t.nextQ} →</button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// AI TUTOR MODULE
// ============================================================
function AiTutorModule({ lang, t, dark }) {
  const [messages, setMessages] = useState([{ role:"assistant", content:t.aiGreeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);
  useEffect(() => { setMessages([{ role:"assistant", content:t.aiGreeting }]); }, [lang, t]);

  async function sendMessage() {
    if (!input.trim()||loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role:"user", content:userMsg }]);
    setLoading(true);
    try {
      const systemPrompt = lang==="JP"
        ? "あなたはIT Passport試験のエキスパート家庭教師です。日本語で丁寧かつわかりやすく説明してください。技術用語は具体例を交えて解説してください。回答は300文字以内で簡潔にまとめてください。"
        : "You are an expert IT Passport exam tutor. Explain concepts clearly in English with concrete examples. Keep answers under 200 words.";
      const history = messages.map(m=>({role:m.role,content:m.content}));
      history.push({ role:"user", content:userMsg });
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:systemPrompt, messages:history }),
      });
      const data = await res.json();
      const reply = data.content?.map(b=>b.text||"").join("") || (lang==="JP"?"エラーが発生しました。":"An error occurred.");
      setMessages(prev => [...prev, { role:"assistant", content:reply }]);
    } catch { setMessages(prev => [...prev, { role:"assistant", content: lang==="JP"?"通信エラーが発生しました。":"Connection error." }]); }
    finally { setLoading(false); }
  }

  const userBubble = "linear-gradient(135deg, #6366f1, #8b5cf6)";
  const aiBubble = dark ? "rgba(30,22,60,0.8)" : "rgba(255,255,255,0.7)";
  const aiBubbleBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)";
  const textPrimary = dark ? "#e2e8f0" : "#1e1b4b";
  const inputBg = dark ? "rgba(20,15,45,0.8)" : "rgba(255,255,255,0.65)";
  const inputBorder = dark ? "rgba(139,92,246,0.35)" : "rgba(99,102,241,0.3)";
  const inputColor = dark ? "#e2e8f0" : "#333";

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)", padding:"1rem", maxWidth:620, margin:"0 auto" }}>
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:12, paddingBottom:12 }}>
        {messages.map((msg,i) => (
          <div key={i} style={{ display:"flex", justifyContent:msg.role==="user"?"flex-end":"flex-start", alignItems:"flex-end", gap:8 }}>
            {msg.role==="assistant" && (
              <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg, #6366f1, #06b6d4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5"/>
                  <circle cx="5.5" cy="7" r="1" fill="white"/>
                  <circle cx="10.5" cy="7" r="1" fill="white"/>
                  <path d="M5.5 10.5c.7 1 4.3 1 5 0" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            <div style={{
              maxWidth:"78%",
              background: msg.role==="user" ? userBubble : aiBubble,
              backdropFilter: msg.role!=="user" ? "blur(12px)" : "none",
              borderRadius: msg.role==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding:"11px 15px",
              border: msg.role!=="user" ? `1px solid ${aiBubbleBorder}` : "none",
              color: msg.role==="user" ? "#fff" : textPrimary,
              fontSize:14, lineHeight:1.6, fontWeight:500,
              boxShadow: msg.role==="user" ? "0 4px 12px rgba(99,102,241,0.35)" : dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.06)",
            }}>{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg, #6366f1, #06b6d4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5"/><circle cx="5.5" cy="7" r="1" fill="white"/><circle cx="10.5" cy="7" r="1" fill="white"/><path d="M5.5 10.5c.7 1 4.3 1 5 0" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </div>
            <div style={{ background:aiBubble, borderRadius:"18px 18px 18px 4px", padding:"14px 18px", display:"flex", gap:5, border:`1px solid ${aiBubbleBorder}` }}>
              {[0,1,2].map(d=>(
                <div key={d} style={{ width:7, height:7, borderRadius:"50%", background:"#6366f1", opacity:0.7, animation:"bounce 1.2s infinite", animationDelay:`${d*0.2}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
        {(lang==="JP" ? ["TCP/IPとは？","SCMを教えて","ディープラーニングとは？"] : ["Explain TCP/IP","What is SCM?","What is deep learning?"]).map(q=>(
          <button key={q} onClick={()=>setInput(q)} style={{
            background: dark?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.55)",
            border: dark?"1px solid rgba(99,102,241,0.3)":"1px solid rgba(99,102,241,0.25)",
            borderRadius:20, padding:"5px 12px", fontSize:12, cursor:"pointer",
            color: dark?"#a5b4fc":"#6366f1", fontFamily:"inherit", fontWeight:600, transition:"all 0.15s",
          }}>{q}</button>
        ))}
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
          placeholder={t.chatPlaceholder}
          style={{ flex:1, borderRadius:20, border:`1.5px solid ${inputBorder}`, padding:"11px 18px", fontSize:14, fontFamily:"inherit", background:inputBg, outline:"none", color:inputColor, backdropFilter:"blur(8px)" }}
        />
        <button onClick={sendMessage} disabled={loading||!input.trim()} style={{
          background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"none", borderRadius:20, padding:"11px 20px",
          color:"#fff", fontFamily:"inherit", fontWeight:700, fontSize:14,
          cursor:loading||!input.trim()?"not-allowed":"pointer", opacity:loading||!input.trim()?0.6:1, transition:"all 0.2s",
        }}>{t.send}</button>
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [lang, setLang] = useState("JP");
  const [module, setModule] = useState("home");
  const [dark, setDark] = useState(true);
  const t = T[lang];

  const bgLight = "linear-gradient(145deg, #e8e5ff 0%, #f0e8ff 35%, #ddeeff 70%, #ece8ff 100%)";
  const bgDark  = "linear-gradient(145deg, #05030f 0%, #0a0620 35%, #060418 65%, #0c0828 100%)";

  return (
    <div style={{ minHeight:"100vh", background: dark?bgDark:bgLight, fontFamily:"'Segoe UI','Hiragino Kaku Gothic ProN','Meiryo',sans-serif" }}>
      <Starfield dark={dark} />
      <div style={{ position:"relative", zIndex:1 }}>
        <NavBar module={module} setModule={setModule} lang={lang} setLang={setLang} t={t} dark={dark} setDark={setDark} />
        <main>
          {module==="home" && <HeroLanding setModule={setModule} lang={lang} t={t} dark={dark} />}
          {module==="flashcards" && <FlashcardsModule lang={lang} t={t} dark={dark} />}
          {module==="quiz" && <QuizModule lang={lang} t={t} dark={dark} />}
          {module==="ai" && <AiTutorModule lang={lang} t={t} dark={dark} />}
        </main>
      </div>
    </div>
  );
}
