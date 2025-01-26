import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const payload = await req.json();
  const headerList = await headers();
  const svixId = headerList.get('svix-id');
  const svixTimestamp = headerList.get('svix-timestamp');
  const svixSignature = headerList.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let evt;

  try {
    evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as any;
  } catch (err) {
    return new NextResponse('Error occurred -- invalid signature', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses, image_url } = evt.data;

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
        image: image_url,
      },
      create: {
        clerkId: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
        image: image_url,
      },
    });
  }

  return new NextResponse('Webhook received', { status: 200 });
}