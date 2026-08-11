export function createFormData<T extends object>(data: T) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof FileList) {
      Array.from(value).forEach((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
}
