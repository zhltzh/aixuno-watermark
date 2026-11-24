import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const SUPPORT = [
  {
    slug: 'about',
    en: {
      title: 'About Aixuno Watermark',
      desc: 'Aixuno Watermark removes watermarks from videos you own with server-side ffmpeg. Free, no sign-up.',
      body: `<p>Aixuno Watermark helps creators clean their own footage. Mark any watermark area, choose heal, blur or crop, and download a cleaned video processed with server-side ffmpeg.</p><h2>Built for ownership</h2><p>We only process video files you upload directly and have the right to edit. There is deliberately no third-party link extraction — the tool is for your own exports, screen recordings, client deliverables and family videos.</p><h2>Part of the Aixuno family</h2><p>Aixuno builds free, privacy-friendly browser tools: Markdown conversion, image tools, file compression, PDF utilities, background removal, document scanning, photo restoration and video watermark removal.</p>`,
    },
    zh: {
      title: '关于 Aixuno 视频去水印',
      desc: 'Aixuno 视频去水印通过服务端 ffmpeg 去除你自有视频的水印。免费，无需注册。',
      body: `<p>Aixuno 视频去水印帮助创作者清理自己的素材。框选任意水印区域，选择修复、模糊或裁剪，下载由服务端 ffmpeg 处理后的干净视频。</p><h2>为版权而生</h2><p>我们只处理你直接上传且有权编辑的视频文件。特意不提供第三方链接解析——本工具面向你自己的导出视频、屏幕录制、客户交付与家庭录像。</p><h2>Aixuno 工具家族</h2><p>Aixuno 提供免费、注重隐私的浏览器工具：Markdown 转换、图片工具、文件压缩、PDF 工具、AI 抠图、文档扫描、老照片修复与视频去水印。</p>`,
    },
  },
  {
    slug: 'contact',
    en: {
      title: 'Contact Us',
      desc: 'Contact the Aixuno Watermark team with questions or feedback.',
      body: `<p>We read every message and usually reply within a few days.</p><h2>Email</h2><p><a href="mailto:hello@aixuno.com">hello@aixuno.com</a></p><h2>Feedback</h2><p>Tell us your browser, video format and which removal method you used. Please do not send private videos — a short description is usually enough.</p>`,
    },
    zh: {
      title: '联系我们',
      desc: '联系 Aixuno 视频去水印团队，反馈问题或建议。',
      body: `<p>我们会阅读每一条消息，通常在几天内回复。</p><h2>邮箱</h2><p><a href="mailto:hello@aixuno.com">hello@aixuno.com</a></p><h2>问题反馈</h2><p>请告诉我们你的浏览器、视频格式与使用的去除方式。请勿发送私密视频——简短描述通常就足够。</p>`,
    },
  },
  {
    slug: 'changelog',
    en: {
      title: 'Changelog',
      desc: 'Release history of Aixuno Watermark.',
      body: `<h2>v1.0.0 — 2026-11-17</h2><ul><li>Initial release: heal (delogo), blur and crop removal methods.</li><li>Multiple watermark boxes per video with normalized coordinates.</li><li>Server-side ffmpeg processing with live progress and signed downloads.</li><li>English and Chinese versions, guides, FAQ and full policy pages.</li></ul>`,
    },
    zh: {
      title: '更新日志',
      desc: 'Aixuno 视频去水印的版本记录。',
      body: `<h2>v1.0.0 — 2026-11-17</h2><ul><li>首次发布：修复（delogo）、模糊与裁剪三种去除方式。</li><li>每个视频支持多个水印选区（归一化坐标）。</li><li>服务端 ffmpeg 处理，实时进度与签名下载。</li><li>中英文版本、教程、FAQ 与完整政策页面。</li></ul>`,
    },
  },
  {
    slug: 'privacy',
    en: {
      title: 'Privacy Policy',
      desc: 'How Aixuno Watermark handles your videos: uploads and results are deleted within 24 hours.',
      body: `<p class="updated">Last updated: 2026-11-17</p><h2>Cloud processing — temporary by design</h2><ul><li>Videos you upload are stored only to run the job you requested.</li><li>Uploads and results are deleted automatically within 24 hours.</li><li>No account is required and we do not sell or share your files.</li><li>Downloads use signed, expiring links so results cannot be browsed publicly.</li></ul><h2>What we store</h2><p>Only the files needed to run your job, plus the job status record. Both are removed within 24 hours. Your language preference is stored locally in your browser.</p><h2>Questions</h2><p>Contact privacy@aixuno.com for any question about this policy.</p>`,
    },
    zh: {
      title: '隐私政策',
      desc: 'Aixuno 视频去水印如何处理你的视频：上传与结果均在 24 小时内删除。',
      body: `<p class="updated">最后更新：2026-11-17</p><h2>云端处理——临时设计</h2><ul><li>你上传的视频只用于完成你请求的任务。</li><li>上传文件与结果都会在 24 小时内自动删除。</li><li>无需注册账号，我们不出售或共享你的文件。</li><li>下载使用签名限时链接，结果无法被公开浏览。</li></ul><h2>我们存储什么</h2><p>只保存完成任务所需的文件与任务状态记录，两者都会在 24 小时内删除。语言偏好只保存在你的浏览器本地。</p><h2>有疑问？</h2><p>如对本政策有任何疑问，请联系 privacy@aixuno.com。</p>`,
    },
  },
  {
    slug: 'terms',
    en: {
      title: 'Terms of Service',
      desc: 'Terms for using Aixuno Watermark.',
      body: `<p class="updated">Last updated: 2026-11-17</p><h2>The service</h2><p>Aixuno Watermark provides free online watermark removal for videos you own, processed with server-side ffmpeg. The service is provided "as is" without warranties of any kind.</p><h2>Acceptable use</h2><p>You may only upload videos you own or have explicit rights to edit. Removing watermarks from third-party content you do not own is prohibited. You must confirm ownership before each job.</p><h2>Fair use</h2><p>We may apply reasonable file-size, duration and daily quotas to keep the free service available for everyone.</p><h2>Liability</h2><p>We are not liable for indirect damages, data loss or processing results. Always keep a copy of your original videos.</p>`,
    },
    zh: {
      title: '服务条款',
      desc: 'Aixuno 视频去水印的使用条款。',
      body: `<p class="updated">最后更新：2026-11-17</p><h2>服务内容</h2><p>Aixuno 视频去水印为你拥有的视频提供免费在线去水印，由服务端 ffmpeg 处理。服务按"现状"提供，不作任何形式的保证。</p><h2>可接受使用</h2><p>你只能上传自己拥有或明确有权编辑的视频。禁止去除你不拥有的第三方内容的水印。每次任务前都需要确认版权归属。</p><h2>公平使用</h2><p>为保证免费服务对所有人可用，我们可能设置合理的文件大小、时长与每日配额限制。</p><h2>责任限制</h2><p>我们不对间接损失、数据丢失或处理结果承担责任。请始终保留原始视频的副本。</p>`,
    },
  },
  {
    slug: 'disclaimer',
    en: {
      title: 'Disclaimer',
      desc: 'Disclaimer for Aixuno Watermark results and copyright responsibility.',
      body: `<h2>Processing results</h2><p>Watermark removal is automated. Heal (delogo) works best on static, semi-transparent marks; blur and crop are fallbacks for harder cases. Moving or complex watermarks may leave visible artifacts.</p><h2>Your responsibility</h2><p>You are responsible for the videos you upload and for having the right to edit them. Do not use this tool to strip attribution or copyright notices from content you do not own.</p><h2>No legal advice</h2><p>Nothing on this site constitutes legal advice about copyright or fair use.</p>`,
    },
    zh: {
      title: '免责声明',
      desc: 'Aixuno 视频去水印关于处理效果与版权责任的声明。',
      body: `<h2>处理效果</h2><p>去水印是自动化过程。修复（delogo）最适合静态半透明水印；模糊与裁剪是更复杂情况的备选。动态或复杂水印可能留下可见痕迹。</p><h2>你的责任</h2><p>你需对上传的视频负责，并确保拥有编辑它们的权利。请勿使用本工具去除你不拥有的内容的署名或版权信息。</p><h2>非法律建议</h2><p>本站内容不构成关于版权或合理使用的法律建议。</p>`,
    },
  },
];

const GUIDES = [
  {
    slug: 'choose-watermark-removal-method',
    en: {
      title: 'Heal, Blur or Crop? Choosing a Watermark Removal Method',
      desc: 'Compare the three removal methods and learn which watermark each handles best.',
      body: `<p>The best method depends on the watermark itself: where it sits, how opaque it is, and whether it moves.</p><h2>Heal (delogo)</h2><p>The delogo filter interpolates surrounding pixels across the marked area. It produces the most natural result on static, semi-transparent logos in quiet backgrounds. On busy textures or moving marks it can smear.</p><h2>Blur</h2><p>Blur replaces the area with a softened copy of itself. It never invents detail, so it is the safest choice for moving watermarks, busy backgrounds and opaque logos. The trade-off is a visible blurred patch.</p><h2>Crop</h2><p>Crop cuts the marked edges off the frame entirely. If a watermark hugs a corner or an edge and you can spare the picture, this is the only method that leaves zero traces. If the region is not near an edge, the tool falls back to heal automatically.</p><h2>A quick rule of thumb</h2><p>Static corner logo → heal. Moving or opaque mark → blur. Edge watermark and spare pixels → crop.</p>`,
    },
    zh: {
      title: '修复、模糊还是裁剪？去水印方式怎么选',
      desc: '对比三种去除方式，了解每种水印最适合的处理方法。',
      body: `<p>最佳方式取决于水印本身：位置、透明度，以及是否移动。</p><h2>修复（delogo）</h2><p>delogo 滤镜用周边像素在选区内插值。对静态、半透明、背景干净的 Logo 效果最自然；在复杂纹理或动态水印上可能产生涂抹。</p><h2>模糊</h2><p>模糊把区域替换为柔化后的自身。它不编造细节，因此是动态水印、复杂背景与不透明 Logo 最稳妥的选择，代价是可见的模糊块。</p><h2>裁剪</h2><p>裁剪直接把选区所在边缘裁出画面。水印紧贴角落或边缘、且可以舍弃部分画面时，这是唯一完全无痕的方式。若选区不靠边，工具会自动回退为修复。</p><h2>速记原则</h2><p>静态角落 Logo → 修复；动态或不透明水印 → 模糊；边缘水印且有多余像素 → 裁剪。</p>`,
    },
  },
  {
    slug: 'watermark-box-selection-tips',
    en: {
      title: 'Box Selection Tips for Cleaner Watermark Removal',
      desc: 'Tighter boxes, multiple areas and common selection mistakes to avoid.',
      body: `<p>The boxes you draw decide which pixels get processed. A little care here improves every method.</p><h2>Fit the watermark, not the whole corner</h2><p>Smaller boxes mean more original detail survives, especially for heal and crop. Draw just around the mark with a small margin.</p><h2>Use several boxes instead of one big one</h2><p>If there are two or three marks, mark them separately. Each box gets its own filter chain, which is cleaner than processing a large empty area between marks.</p><h2>Check the frame before submitting</h2><p>We use a frame near the start of the video. If a watermark fades in later, seek a frame where it is visible so your boxes cover it fully.</p><h2>Common mistakes</h2><p>Boxes that are too large (heal smears), boxes that miss the mark's edges (visible leftovers), and forgetting the ownership confirmation checkbox.</p>`,
    },
    zh: {
      title: '框选技巧，让去水印更干净',
      desc: '更紧贴的选区、多区域处理，以及需要避免的常见框选错误。',
      body: `<p>你画的选区决定了哪些像素被处理。在这里多用心一点，每种方式的效果都会更好。</p><h2>贴合水印，而不是整个角落</h2><p>选区越小，保留的原始细节越多，对修复和裁剪尤其重要。刚好框住水印并留一点边距即可。</p><h2>用多个小框代替一个大框</h2><p>有两三个水印时分别框选。每个选区有独立滤镜链，比处理水印之间的大片空白区域更干净。</p><h2>提交前检查画面</h2><p>我们使用视频开头附近的一帧。如果水印稍后才出现，请到水印可见的画面确认选区覆盖完整。</p><h2>常见错误</h2><p>选区过大（修复涂抹）、选区没盖住水印边缘（残留明显），以及忘记勾选版权确认框。</p>`,
    },
  },
  {
    slug: 'static-vs-moving-watermarks',
    en: {
      title: 'Static vs Moving Watermarks: What to Expect',
      desc: 'Why moving watermarks are harder and which method to use for each case.',
      body: `<p>Not all watermarks behave the same. Understanding the difference sets realistic expectations.</p><h2>Static watermarks</h2><p>A logo that stays in one place is the best case. Heal can interpolate it away convincingly, and crop removes it entirely if it sits near an edge.</p><h2>Moving watermarks</h2><p>A mark that drifts, pulses or changes size crosses many pixels over time. Because heal works spatially, it may leave trails or smears. Blur is usually the better choice: the area stays consistently softened for the whole video.</p><h2>Full-screen or tiled watermarks</h2><p>Repeated watermarks across the whole frame cannot be healed or cropped meaningfully. Use blur on the worst areas, or accept that this content is not suitable for automated removal.</p><h2>When to stop</h2><p>If a watermark is large, central and moving, no automated method will produce a clean result — manual editing or a cleaner source is the honest answer.</p>`,
    },
    zh: {
      title: '静态与动态水印：效果预期',
      desc: '为什么动态水印更难处理，以及每种情况该用哪种方式。',
      body: `<p>不同水印的行为不一样。了解差异可以建立合理预期。</p><h2>静态水印</h2><p>固定在一个位置的 Logo 是最佳情况。修复可以令人信服地插值去除；若靠近边缘，裁剪可以完全移除。</p><h2>动态水印</h2><p>漂移、脉动或变大小的水印会随时间跨过许多像素。修复在空间上插值，可能留下拖影或涂抹。模糊通常是更好的选择：整个视频期间该区域保持一致的柔化。</p><h2>全屏或平铺水印</h2><p>遍布全屏的重复水印无法有效修复或裁剪。可以对最明显的区域使用模糊，或接受这类内容不适合自动去除。</p><h2>什么时候该停手</h2><p>如果水印很大、居中且移动，没有任何自动方式能产生干净结果——人工剪辑或寻找更干净的素材才是诚实的答案。</p>`,
    },
  },
  {
    slug: 'video-watermark-copyright',
    en: {
      title: 'Copyright and Watermark Removal: The Rules We Follow',
      desc: 'Why we only process videos you own, and what is not allowed.',
      body: `<p>Watermarks often exist to signal ownership. That is why Aixuno Watermark is built around a simple rule: only videos you own or have explicit rights to edit.</p><h2>What is allowed</h2><p>Your own exports, screen recordings, client footage you delivered or are licensed to edit, and personal home videos. You confirm this with the ownership checkbox before each job.</p><h2>What is not allowed</h2><p>Removing watermarks, logos or attribution from third-party content you do not own — including downloading videos from platforms to strip their marks. We do not offer link extraction for this reason.</p><h2>Why it matters</h2><p>Removing copyright management information can be illegal in many jurisdictions and unfair to creators. Keeping the tool ownership-first protects you and protects the people who made the original work.</p><h2>If you are unsure</h2><p>Ask the rights holder for a clean master or written permission. That is always safer than removing a watermark.</p>`,
    },
    zh: {
      title: '去水印与版权：我们遵守的规则',
      desc: '为什么我们只处理你拥有的视频，以及哪些行为不被允许。',
      body: `<p>水印往往用于标示所有权。因此 Aixuno 视频去水印围绕一条简单规则构建：只处理你拥有或明确有权编辑的视频。</p><h2>允许的用途</h2><p>你自己的导出视频、屏幕录制、你交付或获授权编辑的客户素材，以及个人家庭录像。每次任务前都需要通过版权勾选确认。</p><h2>不允许的用途</h2><p>去除你不拥有的第三方内容的水印、Logo 或署名——包括从平台下载视频后去除其标记。我们不提供链接解析正是出于这个原因。</p><h2>为什么重要</h2><p>去除版权管理信息在许多司法辖区可能违法，也对创作者不公平。坚持"所有权优先"既保护你，也保护原创作者。</p><h2>不确定时</h2><p>向版权方索取干净母版或书面授权，这永远比去除水印更安全。</p>`,
    },
  },
];

function layout({ lang, title, desc, path, body, isGuide }) {
  const prefix = lang === 'zh' ? '/zh' : '';
  const canonical = `https://watermark.aixuno.com${prefix}${path}`;
  const enUrl = `https://watermark.aixuno.com${path}`;
  const zhUrl = `https://watermark.aixuno.com/zh${path}`;
  const homeHref = '../index.html';
  const cssHref = '/src/site.css';
  const brandSite = lang === 'zh' ? '视频去水印' : 'Watermark';
  const navGuides = lang === 'zh' ? '教程' : 'Guides';
  const navTool = lang === 'zh' ? '去水印工具' : 'Removal tool';
  const footerAbout = lang === 'zh' ? '关于' : 'About';
  const footerContact = lang === 'zh' ? '联系我们' : 'Contact';
  const footerPrivacy = lang === 'zh' ? '隐私' : 'Privacy';
  const footerTerms = lang === 'zh' ? '条款' : 'Terms';
  const footerDisclaimer = lang === 'zh' ? '免责声明' : 'Disclaimer';
  const footerChangelog = lang === 'zh' ? '更新日志' : 'Changelog';
  // 结构化数据：指南页 Article、指南索引 CollectionPage、其余 WebPage，统一附 BreadcrumbList
  const siteName = 'Aixuno Watermark';
  const homeUrl = `https://watermark.aixuno.com/${lang === 'zh' ? 'zh/' : ''}`;
  const isGuideIndex = path === '/guides/index.html';
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: lang === 'zh' ? '首页' : 'Home', item: homeUrl },
  ];
  if (isGuide || isGuideIndex) {
    crumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: lang === 'zh' ? '去水印教程' : 'Guides',
      item: `https://watermark.aixuno.com/${lang === 'zh' ? 'zh/' : ''}guides/`,
    });
    crumbs.push({ '@type': 'ListItem', position: 3, name: title, item: canonical });
  } else {
    crumbs.push({ '@type': 'ListItem', position: 2, name: title, item: canonical });
  }
  const ldGraph = [];
  if (isGuide && !isGuideIndex) {
    ldGraph.push({
      '@type': 'Article',
      headline: title,
      description: desc,
      url: canonical,
      image: 'https://watermark.aixuno.com/og-image.png',
      inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
      author: { '@type': 'Organization', name: 'Aixuno', url: 'https://aixuno.com/' },
      publisher: { '@type': 'Organization', name: siteName, url: 'https://watermark.aixuno.com/' },
      datePublished: '2026-11-01',
      dateModified: '2026-11-22',
      mainEntityOfPage: canonical,
      isAccessibleForFree: true,
    });
  } else if (isGuideIndex) {
    ldGraph.push({
      '@type': 'CollectionPage',
      name: title,
      description: desc,
      url: canonical,
      inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
      isPartOf: { '@type': 'WebSite', name: siteName, url: 'https://watermark.aixuno.com/' },
    });
  } else {
    ldGraph.push({
      '@type': 'WebPage',
      name: title,
      description: desc,
      url: canonical,
      inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
      isPartOf: { '@type': 'WebSite', name: siteName, url: 'https://watermark.aixuno.com/' },
      publisher: { '@type': 'Organization', name: siteName, url: 'https://watermark.aixuno.com/' },
    });
  }
  ldGraph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs });
  const structuredData = JSON.stringify({ '@context': 'https://schema.org', '@graph': ldGraph });
  const homeLink = path.startsWith('/guides') ? '../index.html' : './index.html';
  const guidesLink = path.startsWith('/guides') ? './index.html' : './guides/index.html';
  return `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} | Aixuno Watermark</title>
    <meta name="description" content="${desc}" />
    <meta name="theme-color" content="#2563eb" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <meta property="og:type" content="${isGuide ? 'article' : 'website'}" />
    <meta property="og:site_name" content="Aixuno Watermark" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%232563eb'/%3E%3Cpath fill='%23fff' d='M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm2.5 3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM10 8.5v2h9v-2h-9Zm-4 5v2h5v-2H6Zm7 0v2h6v-2h-6Z'/%3E%3C/svg%3E" />
    <link rel="stylesheet" href="${cssHref}" />
    <link rel="preconnect" href="https://hm.baidu.com">
    <link rel="dns-prefetch" href="https://hm.baidu.com">
  <script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ef887868142b18a0c32bd9e20da7d91f";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
<script type="application/ld+json">${structuredData}</script>
</head>
  <body>
    <div id="network" class="network"></div>
    <header class="site-header">
      <div class="site-header__inner container">
        <a class="brand" href="${homeLink}"><span class="brand__mark">A</span>Aixuno <span class="brand__site">${brandSite}</span></a>
        <nav class="mini-nav">
          <a href="${homeLink}#workspace">${navTool}</a>
          <a href="${guidesLink}">${navGuides}</a>
        </nav>
        <div class="lang-switch" id="lang-switch" role="group" aria-label="Language"></div>
      </div>
    </header>
    <main id="main-content">
      <section class="section">
        <div class="container prose">
          <h1>${title}</h1>
          ${body}
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <span>© 2026 Aixuno</span>
        <span class="footer-links">
          <a href="${homeLink.replace('index.html', 'about.html')}">${footerAbout}</a>
          <a href="${homeLink.replace('index.html', 'contact.html')}">${footerContact}</a>
          <a href="${homeLink.replace('index.html', 'privacy.html')}">${footerPrivacy}</a>
          <a href="${homeLink.replace('index.html', 'terms.html')}">${footerTerms}</a>
          <a href="${homeLink.replace('index.html', 'disclaimer.html')}">${footerDisclaimer}</a>
          <a href="${homeLink.replace('index.html', 'changelog.html')}">${footerChangelog}</a>
        </span>
      </div>
    </footer>
    <script type="module">
      import { initPage } from '/src/main.js';
      initPage('watermark');
    </script>
  </body>
</html>
`;
}

function writePage(lang, slug, data, isGuide) {
  const path = `${isGuide ? '/guides' : ''}/${slug}.html`;
  const html = layout({ lang, title: data.title, desc: data.desc, path, body: data.body, isGuide });
  const file = join(root, lang === 'zh' ? 'zh' : '', isGuide ? 'guides' : '', `${slug}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return path;
}

const written = [];

for (const page of SUPPORT) {
  for (const lang of ['en', 'zh']) {
    written.push(writePage(lang, page.slug, page[lang], false));
  }
}

for (const guide of GUIDES) {
  for (const lang of ['en', 'zh']) {
    written.push(writePage(lang, guide.slug, guide[lang], true));
  }
}

for (const lang of ['en', 'zh']) {
  const data = {
    en: {
      title: 'Watermark Removal Guides',
      desc: 'Guides for removing video watermarks: method choice, box selection, moving watermarks and copyright rules.',
      body: `<p>Get better results with the right method and selection technique.</p><ul>${GUIDES.map((g) => `<li><a href="./${g.slug}.html">${g.en.title}</a> — ${g.en.desc}</li>`).join('')}</ul>`,
    },
    zh: {
      title: '去水印教程',
      desc: '视频去水印指南：方式选择、框选技巧、动态水印与版权规则。',
      body: `<p>用对方法和框选技巧，获得更好的效果。</p><ul>${GUIDES.map((g) => `<li><a href="./${g.slug}.html">${g.zh.title}</a> — ${g.zh.desc}</li>`).join('')}</ul>`,
    },
  }[lang];
  written.push(writePage(lang, 'index', data, true));
}

const home = readFileSync(join(root, 'index.html'), 'utf8');
const zhHome = home
  .replace('<html lang="en">', '<html lang="zh-CN">')
  .replace(/<title>[^<]*<\/title>/, '<title>视频去水印在线免费 — 修复、模糊、裁剪 | Aixuno 视频去水印</title>')
  .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="免费去除你自有视频的水印。框选水印区域，选择修复、模糊或裁剪，服务端 ffmpeg 处理。无需注册，文件 24 小时自动删除。" />')
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://watermark.aixuno.com/zh/" />')
  .replace(/content="Video Watermark Remover Online Free \| Aixuno Watermark"/, 'content="视频去水印在线免费 | Aixuno 视频去水印"')
  .replace(/content="Mark the watermark area, pick heal, blur or crop — server-side ffmpeg does the rest\. Free, no sign-up\."/, 'content="框选水印区域，选择修复、模糊或裁剪——服务端 ffmpeg 完成其余工作。免费无需注册。"')
  .replace(/<meta property="og:url" content="[^"]*" \/>/, '<meta property="og:url" content="https://watermark.aixuno.com/zh/" />');
mkdirSync(join(root, 'zh'), { recursive: true });
writeFileSync(join(root, 'zh', 'index.html'), zhHome);

const allPaths = ['/', '/parse', ...written.filter((p, i) => i % 2 === 0).map((p) => p.replace(/\.html$/, '').replace(/\/index$/, '/'))];

// lastmod 取页面对应 HTML 文件的最后一次 git 提交日期（yyyy-MM-dd）。
// 页面每次构建都会重新生成，用 mtime 会让 lastmod 天天刷新，降低搜索引擎信任度。
const gitDateCache = new Map();
function gitLastCommitDate(relFile) {
  if (gitDateCache.has(relFile)) return gitDateCache.get(relFile);
  let date = '';
  try {
    const out = execSync(`git log -1 --format=%cs -- "${relFile}"`, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) date = out;
  } catch {
    // 不在 git 环境或 git 不可用，交给 mtime 兜底
  }
  gitDateCache.set(relFile, date);
  return date;
}

function lastmod(relFile) {
  const gitDate = gitLastCommitDate(relFile);
  if (gitDate) return gitDate;
  const d = statSync(join(root, relFile)).mtime;
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const urls = [];
for (const p of allPaths) {
  const clean = p.endsWith('/') ? p : `${p}.html`;
  const rel = clean === '/' ? 'index.html' : clean.endsWith('/') ? `${clean.slice(1)}index.html` : clean.slice(1);
  const enUrl = `https://watermark.aixuno.com${clean}`;
  const zhUrl = `https://watermark.aixuno.com/zh${clean}`;
  // 每个页面都有中英双语版本，因此两条 URL 都附带完整的 hreflang 交替标注
  for (const [loc, relFile] of [[enUrl, rel], [zhUrl, `zh/${rel}`]]) {
    urls.push(
      [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod(relFile)}</lastmod>`,
        `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhUrl}"/>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`,
        '  </url>',
      ].join('\n')
    );
  }
}
writeFileSync(
  join(root, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
);

// 国内搜索引擎与通用搜索蜘蛛：显式允许抓取，仅屏蔽 API 与跟踪参数。
const SEO_BOTS = [
  'Baiduspider',
  'Baiduspider-mobile',
  'Baiduspider-image',
  'Baiduspider-video',
  'Baiduspider-news',
  '360Spider',
  'HaosouSpider',
  'Sogou web spider',
  'Sogou inst spider',
  'Sogou Pic Spider',
  'YisouSpider',
  'Bytespider',
  'Bingbot',
  'msnbot',
  'Googlebot',
  'Googlebot-Image',
];

const robotGroup = (ua) =>
  `User-agent: ${ua}\nAllow: /\nDisallow: /api/\nDisallow: /*?*utm_\nDisallow: /*?*from=\n`;

writeFileSync(
  join(root, 'public', 'robots.txt'),
  [
    robotGroup('*'),
    '# 国内搜索引擎\n',
    ...SEO_BOTS.map(robotGroup),
    'Sitemap: https://watermark.aixuno.com/sitemap.xml\n',
  ].join('\n')
);

writeFileSync(
  join(root, 'public', 'llms.txt'),
  `# Aixuno Watermark\n\nFree online video watermark removal for videos you own. Heal (delogo), blur and crop methods with multiple boxes per video, processed by server-side ffmpeg. No sign-up. Uploads and results auto-deleted within 24 hours.\n\n## Pages\n- Home: https://watermark.aixuno.com/\n- Chinese home: https://watermark.aixuno.com/zh/\n- Guides: https://watermark.aixuno.com/guides/\n- Privacy: https://watermark.aixuno.com/privacy.html\n- Terms: https://watermark.aixuno.com/terms.html\n\n## Aixuno tool ecosystem\n- Markdown conversion: https://aixuno.com/\n- Image tools: https://image.aixuno.com/\n- File compression: https://compress.aixuno.com/\n- PDF tools: https://pdf.aixuno.com/\n- AI background removal: https://bg.aixuno.com/\n- Document scanner: https://scan.aixuno.com/\n- Old photo restoration: https://restore.aixuno.com/\n`
);

console.log(`generated ${written.length + 1} pages + sitemap/robots/llms`);
