const STRINGS = {
  en: {
    brand_site: 'Watermark',
    nav_tool: 'Removal tool',
    nav_guides: 'Guides',
    nav_faq: 'FAQ',
    lang_label: 'Language',

    hero_eyebrow: 'Free · No sign-up · Server-side ffmpeg',
    hero_title: 'Remove Watermarks from Your Videos',
    hero_lead: 'Mark the watermark area, pick heal, blur or crop, and let server-side ffmpeg do the work. For videos you own — fast, private and free.',
    hero_cta_primary: 'Remove a watermark now',
    hero_cta_secondary: 'Read the guides',
    hero_badge_1: 'Free to use',
    hero_badge_2: 'No account needed',
    hero_badge_3: 'Files auto-deleted in 24h',

    ws_eyebrow: 'Online video watermark removal',
    ws_title: 'Upload your video',
    ws_sub: 'MP4 or MOV up to 200MB and 5 minutes. Draw boxes over the watermarks, choose a method, and download the cleaned video.',
    w_dz_main_strong: 'Drop your video here',
    w_dz_main_rest: 'or click to browse',
    w_dz_hint: 'MP4 · MOV · up to 200MB and 5 minutes',
    w_stage_hint: 'Drag on the video to mark a watermark area — add as many boxes as you need.',
    w_boxes_title: 'Selected areas',
    w_box_item: 'Area {n}',
    w_box_remove: 'Remove',
    w_boxes_empty: 'No areas marked yet',
    w_method_title: 'Processing method',
    w_m_delogo_t: 'Heal (recommended)',
    w_m_delogo_d: 'Interpolates surrounding pixels over the logo — best for static, semi-transparent marks.',
    w_m_blur_t: 'Blur',
    w_m_blur_d: 'Strongly blurs the marked area — safest for busy or moving watermarks.',
    w_m_crop_t: 'Crop out',
    w_m_crop_d: 'Cuts off the marked edges — loses some picture, leaves zero traces.',
    w_disclaimer: 'I own this video or have the right to edit it.',
    w_submit: 'Remove watermark',
    w_progress_queued: 'Queued…',
    w_progress_processing: 'Processing… {n}%',
    w_result_title: 'Done — preview & download',
    w_result_download: 'Download video',
    w_result_expires: 'Result available for 24 hours',
    w_result_replay: 'Process another video',
    w_toast_too_large: 'Video is larger than 200MB',
    w_toast_not_video: 'Please choose an MP4 or MOV file',
    w_toast_no_boxes: 'Mark at least one watermark area',
    w_toast_no_disclaimer: 'Please confirm you own the rights',
    w_toast_service: 'Service is not online yet — coming soon',
    w_toast_failed: 'Processing failed — please try again',
    w_toast_too_long: 'Video is longer than 5 minutes',
    badge_cloud: 'Cloud processing · files auto-deleted in 24h',

    ex_eyebrow: 'Before / after',
    ex_title: 'What watermark removal looks like',
    ex_sub: 'Demo frames showing how the heal method blends surrounding pixels over a logo area.',
    ex1_title: 'Corner logo, healed',
    ex1_desc: 'A semi-transparent logo in the corner is interpolated away with the delogo filter.',
    ex_before: 'Before',
    ex_after: 'After',

    steps_eyebrow: 'How it works',
    steps_title: 'Clean videos in three steps',
    steps_sub: 'No software to install. Everything runs on our server with ffmpeg.',
    step1_title: 'Upload & mark',
    step1_desc: 'Drop your video and draw boxes over every watermark you want to remove.',
    step2_title: 'Pick a method',
    step2_desc: 'Heal interpolates surrounding pixels, blur hides the area, and crop cuts the marked edges off entirely.',
    step3_title: 'Preview & download',
    step3_desc: 'Watch the progress bar, preview the cleaned video and download it. Files are deleted within 24 hours.',

    feat_eyebrow: 'Why Aixuno Watermark',
    feat_title: 'Precise removal, honest processing',
    feat1_title: 'Three removal methods',
    feat1_desc: 'Heal, blur and crop cover different watermark types — from faint corner logos to busy moving marks.',
    feat2_title: 'Multiple boxes',
    feat2_desc: 'Mark several watermark areas in one pass. Each box is processed independently with its own filter chain.',
    feat3_title: 'Server-side ffmpeg',
    feat3_desc: 'Real video processing with x264 CRF 18 keeps quality high and handles files that would crash a browser tab.',
    feat4_title: 'Progress you can see',
    feat4_desc: 'Live progress from queued to done, with an in-page preview and a signed download link.',
    feat5_title: 'Private by default',
    feat5_desc: 'Uploads and results are automatically deleted within 24 hours. No account, no tracking of your videos.',
    feat6_title: 'Copyright-first design',
    feat6_desc: 'We only process videos you upload and own — no third-party link ripping, by design.',

    use_eyebrow: 'Use cases',
    use_title: 'For creators cleaning their own footage',
    use1_title: 'Old project exports',
    use1_desc: 'Remove an outdated logo or watermark from videos you exported from an old editor.',
    use2_title: 'Screen recordings',
    use2_desc: 'Clean status bars, app badges and overlay marks from your own tutorial recordings.',
    use3_title: 'Client deliverables',
    use3_desc: 'Produce a clean master from footage that carries a draft or review watermark you own.',
    use4_title: 'Family videos',
    use4_desc: 'Remove date stamps and camera overlays from personal home videos before sharing.',

    guides_eyebrow: 'Learn',
    guides_title: 'Watermark removal guides',
    guides_sub: 'Get better results with the right method and selection technique.',
    guide1_title: 'Heal, blur or crop?',
    guide1_desc: 'How to choose the right removal method for each watermark.',
    guide2_title: 'Box selection tips',
    guide2_desc: 'Tighter boxes, multiple areas and common selection mistakes.',
    guide3_title: 'Static vs moving watermarks',
    guide3_desc: 'What each method can and cannot handle.',
    guides_all: 'Browse all watermark guides',

    faq_eyebrow: 'FAQ',
    faq_title: 'Frequently asked questions',
    faq1_q: 'Is the service free?',
    faq1_a: 'Yes, free at launch with fair-use limits: up to 200MB and 5 minutes per video.',
    faq2_q: 'Do you remove watermarks from TikTok or Douyin links?',
    faq2_a: 'No. We only process video files you upload directly and own the rights to. Link-based extraction raises copyright issues we do not support.',
    faq3_q: 'Which method gives the best result?',
    faq3_a: 'Heal works best for static, semi-transparent logos. Blur is safest for busy or moving marks. Crop is perfect when the watermark sits at an edge and you can spare the picture.',
    faq4_q: 'How long does processing take?',
    faq4_a: 'Usually about the length of your video or less, depending on resolution and server load. A live progress bar shows each stage.',
    faq5_q: 'What happens to my video?',
    faq5_a: 'It is processed once on our server, then both the upload and the result are automatically deleted within 24 hours. We never sell or share your files.',
    faq6_q: 'Can it remove moving watermarks?',
    faq6_a: 'Partially. Blur handles moving marks best; heal and delogo are designed for static areas and may leave artifacts on moving logos.',
    faq7_q: 'Does it work on mobile?',
    faq7_a: 'Yes. Uploading, box selection and download all work in modern mobile browsers.',

    eco_eyebrow: 'Aixuno ecosystem',
    eco_title: 'More free tools from Aixuno',

    footer_rights: 'Your videos, cleaned with care.',
    footer_about: 'About',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
    footer_disclaimer: 'Disclaimer',
    footer_changelog: 'Changelog',
  },
  zh: {
    brand_site: '视频去水印',
    nav_tool: '去水印工具',
    nav_guides: '教程',
    nav_faq: '常见问题',
    lang_label: '语言',

    hero_eyebrow: '免费 · 无需注册 · 服务端 ffmpeg',
    hero_title: '去除你自己视频里的水印',
    hero_lead: '框选水印区域，选择修复、模糊或裁剪，剩下的交给服务端 ffmpeg。只处理你拥有版权的视频——快速、私密、免费。',
    hero_cta_primary: '立即去水印',
    hero_cta_secondary: '查看教程',
    hero_badge_1: '免费使用',
    hero_badge_2: '无需账号',
    hero_badge_3: '文件 24 小时自动删除',

    ws_eyebrow: '在线视频去水印',
    ws_title: '上传你的视频',
    ws_sub: '支持 MP4、MOV，最大 200MB、5 分钟。在画面上框选水印，选择处理方式，下载清理后的视频。',
    w_dz_main_strong: '拖拽视频到此处',
    w_dz_main_rest: '或点击选择文件',
    w_dz_hint: 'MP4 · MOV · 最大 200MB、5 分钟以内',
    w_stage_hint: '在视频画面上拖拽框选水印区域，可添加多个选区。',
    w_boxes_title: '已选区域',
    w_box_item: '区域 {n}',
    w_box_remove: '删除',
    w_boxes_empty: '尚未框选区域',
    w_method_title: '处理方式',
    w_m_delogo_t: '修复（推荐）',
    w_m_delogo_d: '用周边像素插值覆盖水印——适合静态半透明水印。',
    w_m_blur_t: '模糊',
    w_m_blur_d: '强力模糊所选区域——适合复杂或动态水印。',
    w_m_crop_t: '裁剪去除',
    w_m_crop_d: '直接裁掉所在边缘区域——损失部分画面，但完全无痕。',
    w_disclaimer: '我拥有该视频的版权，或已获得编辑授权。',
    w_submit: '开始去水印',
    w_progress_queued: '排队中…',
    w_progress_processing: '处理中… {n}%',
    w_result_title: '完成——预览与下载',
    w_result_download: '下载视频',
    w_result_expires: '结果保留 24 小时',
    w_result_replay: '再处理一个视频',
    w_toast_too_large: '视频超过 200MB',
    w_toast_not_video: '请选择 MP4 或 MOV 文件',
    w_toast_no_boxes: '请至少框选一个水印区域',
    w_toast_no_disclaimer: '请确认你拥有该视频的版权',
    w_toast_service: '服务尚未上线，敬请期待',
    w_toast_failed: '处理失败——请重试',
    w_toast_too_long: '视频超过 5 分钟',
    badge_cloud: '云端处理 · 文件 24 小时后自动删除',

    ex_eyebrow: '处理前后',
    ex_title: '去水印效果一览',
    ex_sub: '演示帧展示修复算法如何用周边像素覆盖水印区域。',
    ex1_title: '角落 Logo 修复',
    ex1_desc: '角落半透明 Logo 通过 delogo 滤镜插值去除。',
    ex_before: '处理前',
    ex_after: '处理后',

    steps_eyebrow: '使用流程',
    steps_title: '三步清理视频水印',
    steps_sub: '无需安装软件，全部由服务端 ffmpeg 完成。',
    step1_title: '上传并框选',
    step1_desc: '拖入视频，在每个想去除的水印上画出选区。',
    step2_title: '选择处理方式',
    step2_desc: '修复用周边像素插值，模糊隐藏区域，裁剪直接裁掉所在边缘。',
    step3_title: '预览并下载',
    step3_desc: '查看进度条，预览清理后的视频并下载。文件 24 小时内自动删除。',

    feat_eyebrow: '为什么选择 Aixuno 去水印',
    feat_title: '精准去除，坦诚处理',
    feat1_title: '三种去除方式',
    feat1_desc: '修复、模糊、裁剪覆盖不同水印类型——从浅淡角落 Logo 到复杂动态水印。',
    feat2_title: '支持多个选区',
    feat2_desc: '一次标记多个水印区域，每个选区使用独立滤镜链处理。',
    feat3_title: '服务端 ffmpeg',
    feat3_desc: '真实视频处理，x264 CRF 18 保持高画质，可处理浏览器无法承受的大文件。',
    feat4_title: '进度清晰可见',
    feat4_desc: '从排队到完成的实时进度，页内预览与签名下载链接。',
    feat5_title: '默认保护隐私',
    feat5_desc: '上传与结果均在 24 小时内自动删除。无账号，不追踪你的视频。',
    feat6_title: '版权优先设计',
    feat6_desc: '只处理你上传且拥有版权的视频——不提供第三方链接解析。',

    use_eyebrow: '使用场景',
    use_title: '为创作者清理自己的素材',
    use1_title: '旧项目导出',
    use1_desc: '去除旧剪辑软件导出视频中过时的 Logo 或水印。',
    use2_title: '屏幕录制',
    use2_desc: '清理自己的教程录屏中的状态栏、应用角标与悬浮标记。',
    use3_title: '客户交付',
    use3_desc: '从带有草稿或审阅水印的自有素材生成干净的成片。',
    use4_title: '家庭视频',
    use4_desc: '分享前去除家庭录像中的日期戳与相机叠加信息。',

    guides_eyebrow: '学习',
    guides_title: '去水印教程',
    guides_sub: '用对方法和框选技巧，获得更好的效果。',
    guide1_title: '修复、模糊还是裁剪？',
    guide1_desc: '如何为每种水印选择合适的去除方式。',
    guide2_title: '框选技巧',
    guide2_desc: '更紧贴的选区、多区域与常见框选错误。',
    guide3_title: '静态与动态水印',
    guide3_desc: '每种方式能做什么、不能做什么。',
    guides_all: '浏览全部去水印教程',

    faq_eyebrow: '常见问题',
    faq_title: '你可能想问',
    faq1_q: '服务免费吗？',
    faq1_a: '上线阶段免费，带公平使用限制：单个视频最大 200MB、5 分钟。',
    faq2_q: '支持解析抖音或 TikTok 链接去水印吗？',
    faq2_a: '不支持。我们只处理你直接上传且拥有版权的视频文件，链接解析存在版权问题，我们不提供。',
    faq3_q: '哪种方式效果最好？',
    faq3_a: '静态半透明 Logo 用修复最好；复杂或动态水印用模糊最稳妥；水印在边缘且可以舍弃部分画面时，裁剪最干净。',
    faq4_q: '处理需要多久？',
    faq4_a: '通常不超过视频时长，取决于分辨率与服务器负载。进度条会实时显示各阶段。',
    faq5_q: '我的视频会怎样处理？',
    faq5_a: '在服务器上处理一次后，上传与结果都会在 24 小时内自动删除。我们从不出售或共享你的文件。',
    faq6_q: '动态水印能去除吗？',
    faq6_a: '部分可以。动态水印用模糊效果最好；修复（delogo）面向静态区域，处理动态 Logo 可能留下痕迹。',
    faq7_q: '手机上能用吗？',
    faq7_a: '可以。上传、框选与下载都支持现代手机浏览器。',

    eco_eyebrow: 'Aixuno 工具生态',
    eco_title: '更多 Aixuno 免费工具',

    footer_rights: '你的视频，用心清理。',
    footer_about: '关于',
    footer_contact: '联系我们',
    footer_privacy: '隐私',
    footer_terms: '条款',
    footer_disclaimer: '免责声明',
    footer_changelog: '更新日志',
  },
};

export const LANGUAGES = [
  { id: 'en', label: 'EN' },
  { id: 'zh', label: '中文' },
];

const STORAGE_KEY = 'aixuno-watermark-lang';
let current = detectLanguage();

function detectLanguage() {
  const fromPath = typeof location !== 'undefined' && location.pathname.startsWith('/zh/');
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && STRINGS[saved]) return saved;
  } catch (err) {
    // ignore
  }
  if (fromPath) return 'zh';
  const nav = (navigator.language || 'en').toLowerCase();
  return nav.startsWith('zh') ? 'zh' : 'en';
}

export function t(key, params) {
  let text = (STRINGS[current] && STRINGS[current][key]) || STRINGS.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
}

export function getLang() {
  return current;
}

export function setLang(lang) {
  if (!STRINGS[lang] || lang === current) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (err) {
    // ignore
  }
  applyStaticTexts();
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function applyStaticTexts() {
  document.documentElement.lang = current === 'zh' ? 'zh-CN' : 'en';
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const value = t(el.dataset.i18n);
    if (value != null) el.textContent = value;
  }
  for (const el of document.querySelectorAll('[data-i18n-aria]')) {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  }
}
