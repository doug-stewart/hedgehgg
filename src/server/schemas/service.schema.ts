import { z } from "zod";

// Body accepted by both create (POST) and update (PUT). Unknown keys such as
// `id`/`user_id` sent by the client are stripped — the id comes from the URL
// and the user_id from the authenticated session.
export const serviceBodySchema = z.object({
  name: z.string().min(1),
  href: z.string().min(1),
  abbr: z.string().min(1),
  icon: z.string().nullish(),
});

export type ServiceBody = z.infer<typeof serviceBodySchema>;
