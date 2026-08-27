export async function validateEntityExist<TEntity, TArgs>(
  findUnique: (args: any) => Promise<TEntity | null>,
  args: TArgs,
  message: string = 'Сущность не существует'
) {
  const entityExists = await findUnique(args);

  if (!entityExists) {
    throw createError({
      status: 409,
      message: message,
    });
  }

  return entityExists;
}
