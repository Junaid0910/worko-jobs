const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'src/app/about/page.tsx', name: 'About Us' },
  { path: 'src/app/careers/page.tsx', name: 'Careers' },
  { path: 'src/app/privacy/page.tsx', name: 'Privacy Policy' },
  { path: 'src/app/terms/page.tsx', name: 'Terms of Service' },
  { path: 'src/app/verification/page.tsx', name: 'Verification Center' },
  { path: 'src/app/dashboard/worker/profile/page.tsx', name: 'Worker Profile' },
  { path: 'src/app/dashboard/worker/notifications/page.tsx', name: 'Notifications' },
  { path: 'src/app/dashboard/worker/settings/page.tsx', name: 'Settings' },
  { path: 'src/app/dashboard/worker/applications/page.tsx', name: 'My Applications' },
  { path: 'src/app/dashboard/hirer/jobs/[id]/page.tsx', name: 'Job Applicants' },
];

pages.forEach(({ path: filePath, name }) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import UnderConstruction from "@/components/UnderConstruction";

export default function Page() {
  return <UnderConstruction pageName="${name}" />;
}
`;
  
  fs.writeFileSync(filePath, content);
  console.log('Created: ', filePath);
});
