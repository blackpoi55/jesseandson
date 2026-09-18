import { site } from "@/lib/site";

export const cookiePolicy = {
  title: "Cookies policy",
  effective: "Effective 7 July 2024 · Last updated 7 July 2024",
  html: `
<h2>What are cookies?</h2>
<p>This Cookie Policy explains what cookies are and how we use them, the types of cookies we use, the information we collect using cookies and how that information is used, and how to manage your cookie settings.</p>
<p>Cookies are small text files used to store small pieces of information. They are stored on your device when a website loads in your browser. They help the website function properly, make it more secure, provide a better user experience, and help us understand how the website performs and where it needs improvement.</p>
<h2>How do we use cookies?</h2>
<p>Like most online services, our website uses first-party and third-party cookies for several purposes. First-party cookies are mostly necessary for the website to function, and do not collect any personally identifiable data.</p>
<p>Third-party cookies on our website are mainly used to understand how the website performs and how you interact with it, keep our services secure, provide relevant advertising, and generally deliver a better, faster experience.</p>
<h2>Your theme preference</h2>
<p>This website stores your light or dark appearance choice in your browser's local storage. It contains no personal information and never leaves your device.</p>
<h2>Managing cookie preferences</h2>
<p>Different browsers provide different ways to block and delete cookies. You can change your browser settings to block or delete cookies at any time. Support documents for the major browsers:</p>
<ul>
<li>Chrome: <a href="https://support.google.com/accounts/answer/32050">support.google.com/accounts/answer/32050</a></li>
<li>Safari: <a href="https://support.apple.com/guide/safari/sfri11471/mac">support.apple.com/guide/safari/sfri11471</a></li>
<li>Firefox: <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox">support.mozilla.org — clear cookies and site data</a></li>
<li>Microsoft Edge: <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">support.microsoft.com — delete cookies in Edge</a></li>
</ul>
<p>If you use another browser, please visit its official support documents.</p>`,
};

export const privacyPolicy = {
  title: "Privacy policy",
  effective: "Effective 7 July 2024 · Last updated 7 July 2024",
  html: `
<p>This Privacy Policy describes the policies of ${site.legalName}, 1/15 Sukhumvit Soi 10, Asoke, Khlong Toei, Bangkok 10110, Thailand (email: <a href="mailto:${site.email}">${site.email}</a>, phone: ${site.phoneDisplay}) on the collection, use and disclosure of the information we collect when you use our website (the “Service”). By accessing or using the Service, you consent to the collection, use and disclosure of your information in accordance with this Privacy Policy. If you do not consent, please do not access or use the Service.</p>
<p>We may modify this Privacy Policy at any time without prior notice and will post the revised policy on the Service. The revised policy will be effective 180 days after it is posted, and your continued use of the Service after that time constitutes acceptance of it. We recommend that you review this page periodically.</p>
<h2>Information we collect</h2>
<p>We will collect and process the following personal information about you:</p>
<ul><li>Name</li><li>Email</li><li>Mobile number</li></ul>
<h2>How we use your information</h2>
<p>We use the information we collect about you for the following purposes:</p>
<ul><li>Responding to your enquiries and appointments</li><li>Marketing and promotional communication</li></ul>
<p>If we want to use your information for any other purpose, we will ask for your consent and use it only for the purposes you agree to, unless required otherwise by law.</p>
<h2>How we share your information</h2>
<p>We will not transfer your personal information to any third party without your consent, except in the limited circumstances below:</p>
<ul><li>Advertising services</li><li>Marketing agencies</li><li>Analytics</li></ul>
<p>We require such third parties to use the personal information we transfer only for the purpose for which it was transferred, and not to retain it longer than required to fulfil that purpose.</p>
<p>We may also disclose your personal information (1) to comply with applicable law, regulation, court order or other legal process; (2) to enforce your agreements with us, including this Privacy Policy; or (3) to respond to claims that your use of the Service violates third-party rights. If the Service or our company is merged with or acquired by another company, your information will be one of the assets transferred to the new owner.</p>
<h2>Retention of your information</h2>
<p>We retain your personal information for 90 days to 2 years after you terminate your account, or for as long as needed to fulfil the purposes described in this policy. We may retain certain information longer for record-keeping or reporting in accordance with applicable law, or for other legitimate reasons such as enforcing legal rights or preventing fraud. Anonymous and aggregate information that does not identify you may be stored indefinitely.</p>
<h2>Your rights</h2>
<p>Depending on the applicable law, you may have the right to access and rectify or erase your personal data, receive a copy of it, restrict or object to its processing, ask us to share it with another entity, withdraw any consent you have given, lodge a complaint with a statutory authority, and other rights under applicable laws. To exercise these rights, write to us at <a href="mailto:${site.email}">${site.email}</a>. We will respond in accordance with applicable law.</p>
<p>If you do not allow us to collect or process the required personal information, or withdraw your consent, you may not be able to access or use the services for which it was requested.</p>
<h2>Cookies</h2>
<p>To learn more about how we use cookies and your choices regarding these tracking technologies, please see our <a href="/cookie-policy">Cookies policy</a>.</p>
<h2>Security</h2>
<p>The security of your information is important to us, and we use reasonable security measures to prevent the loss, misuse or unauthorised alteration of information under our control. However, given the inherent risks, we cannot guarantee absolute security, and any information you transmit to us is at your own risk.</p>
<h2>Grievance / data protection officer</h2>
<p>If you have any questions or concerns about the processing of your information, please email our Grievance Officer at ${site.legalName}, 1/15 Sukhumvit Soi 10, Asoke, Khlong Toei, Bangkok: <a href="mailto:${site.email}">${site.email}</a>. We will address your concerns in accordance with applicable law.</p>`,
};
