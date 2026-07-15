import { PrismaClient } from '@prisma/client';
import { seedComments, seedTickets, seedUsers } from './seed-data.js';

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const userByEmail = new Map<string, string>();

    for (const user of seedUsers) {
      const record = await tx.user.upsert({
        where: { email: user.email },
        update: { name: user.name, role: user.role },
        create: user,
      });
      userByEmail.set(user.email, record.id);
    }

    const ticketByTitle = new Map<string, string>();

    for (const ticket of seedTickets) {
      const createdById = userByEmail.get(ticket.createdByEmail);
      if (!createdById) {
        throw new Error(`Seed user not found: ${ticket.createdByEmail}`);
      }

      const assignedToId = ticket.assignedToEmail
        ? userByEmail.get(ticket.assignedToEmail)
        : undefined;

      const existing = await tx.ticket.findFirst({
        where: { title: ticket.title },
      });

      const record = existing
        ? await tx.ticket.update({
            where: { id: existing.id },
            data: {
              description: ticket.description,
              priority: ticket.priority,
              status: ticket.status,
              assignedToId: assignedToId ?? null,
              createdById,
            },
          })
        : await tx.ticket.create({
            data: {
              title: ticket.title,
              description: ticket.description,
              priority: ticket.priority,
              status: ticket.status,
              assignedToId,
              createdById,
            },
          });

      ticketByTitle.set(ticket.title, record.id);
    }

    for (const comment of seedComments) {
      const ticketId = ticketByTitle.get(comment.ticketTitle);
      const createdById = userByEmail.get(comment.createdByEmail);

      if (!ticketId || !createdById) {
        throw new Error(`Seed reference missing for comment on: ${comment.ticketTitle}`);
      }

      const existing = await tx.comment.findFirst({
        where: { ticketId, message: comment.message },
      });

      if (!existing) {
        await tx.comment.create({
          data: { ticketId, message: comment.message, createdById },
        });
      }
    }
  });

  const [userCount, ticketCount, commentCount] = await Promise.all([
    prisma.user.count(),
    prisma.ticket.count(),
    prisma.comment.count(),
  ]);

  console.log(`Seed complete: ${userCount} users, ${ticketCount} tickets, ${commentCount} comments`);
}

seed()
  .catch((err: unknown) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
