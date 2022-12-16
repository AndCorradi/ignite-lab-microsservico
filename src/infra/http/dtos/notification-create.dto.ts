import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  recipientId: z.string().uuid(),
  category: z
    .string({
      required_error: 'A Categoria é obrigatória!',
      invalid_type_error: "A Categoria deve ser 'SOCIAL' ou 'PROMOTIONAL'",
    })
    .refine((v) => ['SOCIAL', 'PROMOTIONAL'].includes(v), {
      message: "A Categoria deve ser 'SOCIAL' ou 'PROMOTIONAL'",
    }),
  content: z.string(),
});

export class NotificationCreateDTO extends createZodDto(schema) {}
