// ---------------------------------------------------------------------------
// Email functionality disabled
// ---------------------------------------------------------------------------

/*
  The original implementation used Resend/Brevo to deliver notification and
  confirmation emails for contact-form submissions. Since the current project
  phase does not require an email layer, we short-circuit the helper while
  keeping the same function signature so that the rest of the codebase (API
  routes, components, etc.) can continue to call `sendContactEmail` without
  modification or runtime errors.
*/

export async function sendContactEmail(_data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  serviceType?: string;
}) {
  // eslint-disable-next-line no-console
  console.info('[mail-stub] sendContactEmail called – emails are disabled.');
  return { success: true } as const;
} 