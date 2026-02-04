
import { Page, Widget } from './types';

export const THEME_COLORS = {
  primary: '#1e3a8a',
  gold: '#d4af37',
  surface: '#1f2937',
  accent: '#d4af37',
};

const getIcon = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${url}&sz=128`;
  }
};

const firmWidgets: Widget[] = [
  {
    id: 'firm-essentials',
    title: 'Firm Essentials',
    layout: 'icons-grid',
    columnSpan: 2,
    backgroundColor: '#d4af37',
    titleColor: '#ffffff',
    items: [
      { id: 'fe-1', title: 'Clio Manage', url: 'https://account.clio.com/', iconUrl: getIcon('https://account.clio.com/'), iconSize: 'lg' },
      { id: 'fe-2', title: 'Box Storage', url: 'https://app.box.com/folder/0', iconUrl: getIcon('https://app.box.com/folder/0'), iconSize: 'lg' },
      { id: 'fe-3', title: 'eFile Texas', url: 'https://www.efiletexas.gov/', iconUrl: getIcon('https://www.efiletexas.gov/'), iconSize: 'md' },
      { id: 'fe-4', title: 'ProofServe', url: 'https://app.proofserve.com/', iconUrl: getIcon('https://app.proofserve.com/'), iconSize: 'md' },
      { id: 'fe-5', title: 'Lexis Plus AI', url: 'https://plusai.lexis.com/', iconUrl: getIcon('https://plusai.lexis.com/'), iconSize: 'md' },
      { id: 'fe-6', title: 'Letterstream', url: 'https://www.letterstream.com/', iconUrl: getIcon('https://www.letterstream.com/'), iconSize: 'md' },
      { id: 'fe-7', title: 'PublicData', url: 'https://www.publicdata.com/', iconUrl: getIcon('https://www.publicdata.com/'), iconSize: 'md' },
      { id: 'fe-8', title: 'TylerTech Cloud', url: 'https://texas.tylertech.cloud/OfsWeb', iconUrl: getIcon('https://texas.tylertech.cloud/OfsWeb'), iconSize: 'md' },
      { id: 'fe-9', title: 'Court Records', url: 'https://research.txcourts.gov/CourtRecordsSearch/#!/dashboard', iconUrl: getIcon('https://research.txcourts.gov/'), iconSize: 'md' },
      { id: 'fe-10', title: 'CRIS DOT', url: 'https://cris.dot.state.tx.us/public/Purchase/app/home', iconUrl: getIcon('https://cris.dot.state.tx.us/'), iconSize: 'md' },
      { id: 'fe-11', title: 'Houston GovQA', url: 'https://houstontx.govqa.us/WEBAPP/_rs/(S(x1znyclu25l1jq31hgycgwrs))/SupportHome.aspx', iconUrl: getIcon('https://houstontx.govqa.us/'), iconSize: 'md' },
    ]
  },
  {
    id: 'government-offices',
    title: 'Government Offices',
    layout: 'icons-list',
    columnSpan: 1,
    items: [
      { id: 'go-1', title: 'Montgomery Dist Clerk', url: 'https://www.mctx.org/departments/departments_d_-_f/district_clerk/index.php' },
      { id: 'go-2', title: 'Odyssey MCTX', url: 'https://odyssey.mctx.org/Secured/Login.aspx' },
      { id: 'go-3', title: 'Harris Dist Clerk', url: 'https://www.hcdistrictclerk.com/Common/Default.aspx' },
      { id: 'go-4', title: 'Harris Co Clerk', url: 'https://cclerk.hctx.net/' },
      { id: 'go-5', title: 'SOS Corp DA', url: 'https://www.sos.state.tx.us/corp/sosda/index.shtml' },
      { id: 'go-6', title: 'PACER', url: 'https://pacer.login.uscourts.gov/csologin/login.jsf' },
      { id: 'go-7', title: 'Harris JP', url: 'http://www.jp.hctx.net/#gsc.tab=0' },
      { id: 'go-8', title: 'Harris JP Portal', url: 'https://jpodysseyportal.harriscountytx.gov/OdysseyPortalJP' },
      { id: 'go-9', title: 'Jefferson Dist Clerk', url: 'https://co.jefferson.tx.us/dclerk/index.html' },
      { id: 'go-10', title: 'Harris Probate', url: 'https://www.cclerk.hctx.net/applications/websearch/CourtSearch.aspx?CaseType=Probate' },
      { id: 'go-11', title: 'Montgomery Fusion', url: 'https://countyfusion1.kofiletech.us/countyweb/loginDisplay.action?countyname=MontgomeryTX' },
      { id: 'go-12', title: 'Galveston Dist Clerk', url: 'https://www.galvestoncountytx.gov/our-county/district-clerk' },
      { id: 'go-13', title: 'Odyssey Default', url: 'https://odyssey.mctx.org/County/default.aspx' },
    ]
  },
  {
    id: 'associations',
    title: 'Associations',
    layout: 'icons-list',
    columnSpan: 1,
    items: [
      { id: 'as-1', title: 'HBA MyHBA', url: 'https://www.hba.org/?pg=myhba' },
      { id: 'as-2', title: 'Woodlands Bar', url: 'https://www.woodlandsbarassociation.com/' },
      { id: 'as-3', title: 'FedSoc', url: 'https://fedsoc.org/' },
      { id: 'as-4', title: 'MCBATX', url: 'https://mcbatx.com/' },
    ]
  },
  {
    id: 'woodlands-law-firm',
    title: 'Woodlands Law Firm',
    layout: 'icons-list',
    columnSpan: 1,
    backgroundColor: '#1e40af',
    titleColor: '#ffffff',
    items: [
      { id: 'wl-1', title: 'Woodlands Law Estate', url: 'https://woodlandslawestate.com' },
      { id: 'wl-2', title: 'Woodlands.law', url: 'https://Woodlands.law' },
      { id: 'wl-3', title: 'Woodlands Law Info', url: 'https://woodlandslaw.info/wp/' },
      { id: 'wl-4', title: 'N8N Automation', url: 'https://n8n.twlf.dev/' },
      { id: 'wl-5', title: 'Cal.com Booking', url: 'https://app.cal.com/' },
    ]
  },
  {
    id: 'reference',
    title: 'Reference',
    layout: 'text-list',
    columnSpan: 2,
    items: [
      { id: 'ref-1', title: 'Texas Law Help', url: 'https://texaslawhelp.org/' },
      { id: 'ref-2', title: 'Free Legal Answers', url: 'https://texas.freelegalanswers.org/' },
      { id: 'ref-3', title: 'Interest/Loan Calc', url: 'http://www.csgnetwork.com/interestloancalc.html' },
      { id: 'ref-4', title: 'Post-Judge Calc', url: 'https://www.webwinder.com/calculators/post_judge_calc.html' },
      { id: 'ref-5', title: 'DMWilson Info', url: 'https://dmwilson.info/' },
      { id: 'ref-6', title: 'SOS Debt Collectors', url: 'https://direct.sos.state.tx.us/debtcollectors/DCSearch.asp' },
      { id: 'ref-7', title: 'Time/Date Duration', url: 'https://www.timeanddate.com/date/duration.html' },
      { id: 'ref-8', title: 'SCRA Login', url: 'https://scra.dmdc.osd.mil/scra/#/login' },
      { id: 'ref-9', title: 'STCL Clinics', url: 'https://www.stcl.edu/academics/legal-clinics/request-legal-assistance/' },
      { id: 'ref-10', title: 'Bloomberg Law News', url: 'https://news.bloomberglaw.com/' },
      { id: 'ref-11', title: 'RIA Checkpoint', url: 'https://checkpoint.riag.com/app/login' },
      { id: 'ref-12', title: 'Court Deadlines', url: 'https://courtdeadlines.com/' },
      { id: 'ref-13', title: 'Clio University', url: 'https://cliouniversity.learnupon.com/dashboard' },
    ]
  },
  {
    id: 'ai-resources',
    title: 'AI Resources',
    layout: 'icons-grid',
    columnSpan: 1,
    backgroundColor: '#4f46e5',
    titleColor: '#ffffff',
    items: [
      { id: 'ai-1', title: 'ChatGPT', url: 'https://chat.openai.com/', iconUrl: getIcon('https://chat.openai.com/'), iconSize: 'md' },
      { id: 'ai-2', title: 'Gemini', url: 'https://deepmind.google/technologies/gemini/', iconUrl: getIcon('https://deepmind.google/'), iconSize: 'md' },
      { id: 'ai-3', title: 'Claude', url: 'https://claude.ai/new', iconUrl: getIcon('https://claude.ai/'), iconSize: 'md' },
      { id: 'ai-4', title: 'Grammarly', url: 'https://app.grammarly.com/', iconUrl: getIcon('https://grammarly.com/'), iconSize: 'md' },
      { id: 'ai-5', title: 'Groq', url: 'https://chat.groq.com/', iconUrl: getIcon('https://groq.com/'), iconSize: 'md' },
      { id: 'ai-6', title: 'Quillbot', url: 'https://quillbot.com', iconUrl: getIcon('https://quillbot.com'), iconSize: 'md' },
      { id: 'ai-7', title: 'Anthropic Prompts', url: 'https://docs.anthropic.com/en/resources/prompt-library/library', iconUrl: getIcon('https://anthropic.com'), iconSize: 'md' },
      { id: 'ai-8', title: 'Perplexity', url: 'https://www.perplexity.ai/', iconUrl: getIcon('https://perplexity.ai/'), iconSize: 'md' },
      { id: 'ai-9', title: 'NotebookLM', url: 'https://notebooklm.google.com/', iconUrl: getIcon('https://notebooklm.google.com/'), iconSize: 'md' },
      { id: 'ai-10', title: 'OpenAI Academy', url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/resources/chatgpt-for-any-role', iconUrl: getIcon('https://openai.com'), iconSize: 'md' },
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media',
    layout: 'icons-grid',
    columnSpan: 1,
    items: [
      { id: 'sm-1', title: 'Facebook', url: 'https://www.facebook.com/', iconUrl: getIcon('https://facebook.com/'), iconSize: 'sm' },
      { id: 'sm-2', title: 'Instagram', url: 'https://www.instagram.com/', iconUrl: getIcon('https://instagram.com/'), iconSize: 'sm' },
      { id: 'sm-3', title: 'X', url: 'https://x.com', iconUrl: getIcon('https://x.com'), iconSize: 'sm' },
      { id: 'sm-4', title: 'TikTok', url: 'http://tiktok.com', iconUrl: getIcon('http://tiktok.com'), iconSize: 'sm' },
      { id: 'sm-5', title: 'LinkedIn', url: 'https://linkedin.com', iconUrl: getIcon('https://linkedin.com'), iconSize: 'sm' },
      { id: 'sm-6', title: 'Admin', url: 'https://woodlandslaw.info/wp/admin', iconUrl: getIcon('https://woodlandslaw.info/'), iconSize: 'sm' },
    ]
  },
  {
    id: 'law-books',
    title: 'Law Books',
    layout: 'text-list',
    columnSpan: 1,
    items: [
      { id: 'lb-1', title: 'West Academic', url: 'https://eproducts.westacademic.com/MyBookshelf' },
      { id: 'lb-2', title: 'CasebookConnect', url: 'https://www.casebookconnect.com/login' },
    ]
  },
  {
    id: 'texas-state-bar',
    title: 'Texas State Bar',
    layout: 'icons-list',
    columnSpan: 1,
    items: [
      { id: 'tsb-1', title: 'Member Benefits', url: 'https://texasbar.memberbenefits.com/' },
      { id: 'tsb-2', title: 'Lawyers Home', url: 'https://www.texasbar.com/AM/Template.cfm?Section=Lawyers_Home' },
      { id: 'tsb-3', title: 'LRIS Account', url: 'https://www.texasbar.com/AM/Template.cfm?Section=Join_or_Manage_Your_LRIS_Account' },
      { id: 'tsb-4', title: 'Career Network', url: 'https://l.tx.bar.associationcareernetwork.com/' },
      { id: 'tsb-5', title: 'TLAP Helps', url: 'https://www.tlaphelps.org/' },
      { id: 'tsb-6', title: 'Texas Bar CLE', url: 'http://www.texasbarcle.com/CLE/Home.asp' },
      { id: 'tsb-7', title: 'Bar Practice', url: 'https://www.texasbarpractice.com/' },
    ]
  },
  {
    id: 'experts',
    title: 'Experts',
    layout: 'text-list',
    columnSpan: 1,
    items: [
      { id: 'ex-1', title: 'JurisPro', url: 'https://www.jurispro.com/' },
      { id: 'ex-2', title: 'SEAK Experts', url: 'https://www.seakexperts.com/' },
    ]
  }
];

export const INITIAL_DATA: Page[] = [
  {
    id: 'firm-page',
    name: 'Firm Page',
    type: 'firm',
    widgets: firmWidgets
  }
];
