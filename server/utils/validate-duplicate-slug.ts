export async function validateDuplicateSlug<TEntity, TArgs>(
  findFirst: (args: any) => Promise<TEntity | null>,
  args: TArgs,
  message: string = 'Сущность с таким слагом уже существует'
) {
  const duplicateSlug = await findFirst(args);

  if (duplicateSlug) {
    throw createError({
      status: 409,
      message,
    });
  }
}
