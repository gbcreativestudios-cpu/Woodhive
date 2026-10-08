/**
 * All FAQ copy lives in content/faq/groups.json (one Decap file, a list of
 * groups each with its own list of Q&A items) so questions/answers/groups
 * are all editable without touching code. The "General" group doubles as
 * the home page's FAQ teaser, matching the site's original structure.
 */
import faqData from "../../content/faq/groups.json";

export const FAQ_GROUPS = faqData.groups;
export const HOME_FAQS = FAQ_GROUPS[0]?.items ?? [];
