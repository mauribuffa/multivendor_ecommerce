import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { Role, type User } from "@prisma/client";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type;

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const data = JSON.parse(body).data;

      const user: Partial<User> = {
        id: data.id,
        name: data.first_name + " " + data.last_name,
        email: data.email_addresses[0].email_address,
        picture: data.image_url,
      };

      const dbUser = await db.user.upsert({
        where: { email: user.email },
        update: user,
        create: {
          ...(user as User),
          role: user.role || Role.USER,
        },
      });

      const client = await clerkClient();

      await client.users.updateUserMetadata(dbUser.id, {
        privateMetadata: {
          role: dbUser.role,
        },
      });
    }

    if (eventType === "user.deleted") {
      const data = JSON.parse(body).data;

      if (!data?.id) return;

      await db.user.delete({ where: { id: data.id } });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Error: Could not verify webhook:", error);

    return new Response("Error: Verification error", {
      status: 400,
    });
  }
}
