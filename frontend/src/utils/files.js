export function createStorageFileName(file) {
  const fileExt = file?.name?.split('.').pop()?.toLowerCase() || 'bin';
  const id = globalThis.crypto?.randomUUID?.() || createFallbackId();
  return `${id}.${fileExt}`;
}

function createFallbackId() {
  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(2);
    globalThis.crypto.getRandomValues(values);
    return `${Date.now()}-${values[0].toString(36)}-${values[1].toString(36)}`;
  }

  return `${Date.now()}-${String(globalThis.performance?.now?.() || 0).replace('.', '')}`;
}
