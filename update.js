const fs = require('fs');
let content = fs.readFileSync('src/data/projects.ts', 'utf8');

content = content.replace(/liveLink:\s*"(.*?)"/g, (match, url) => {
  let type = 'live';
  let label = 'Visit Live Site';
  
  if (url.includes('github.com')) {
    type = 'github';
    label = 'View Source Code';
  } else if (url.includes('f-droid.org')) {
    type = 'fdroid';
    label = 'Download from F-Droid';
  }
  
  return `links: [{ url: "${url}", label: "${label}", type: "${type}" }]`;
});

content = content.replace(/\s*liveLinkLabel:.*?,\n/g, '\n');

content = content.replace(
  /links: \[\{ url: "https:\/\/agnel-forms\.vercel\.app\/", label: "Visit Live Site", type: "live" \}\]/,
  'links: [{ url: "https://agnel-forms.vercel.app/", label: "Visit Live Site", type: "live" }, { url: "https://github.com/agnelfranciso/Personal-Form-Creator-Template", label: "View Source Code", type: "github" }]'
);

content = content.replace(
  /links: \[\{ url: "https:\/\/velurwiki\.vercel\.app\/", label: "Visit Live Site", type: "live" \}\]/,
  'links: [{ url: "https://velurwiki.vercel.app/", label: "Visit Live Site", type: "live" }, { url: "https://github.com/agnelfranciso/velur-wiki", label: "View Source Code", type: "github" }]'
);

content = content.replace(
  /isMobileApp\?: boolean;\n/,
  "isMobileApp?: boolean;\n  links?: { url: string, label: string, type: 'live' | 'github' | 'fdroid' | 'playstore' }[];\n"
);

fs.writeFileSync('src/data/projects.ts', content);
console.log('Done replacing links');
