export function mapContactFormToDTO(entry) {
  if (!entry) return null;
  return {
    id: entry.id,
    name: entry.name,
    email: entry.email,
    phone: entry.phone,
    service_interest: entry.service_interest,
    message: entry.message,
    processed: entry.processed,
    processed_at: entry.processed_at,
    processed_by: entry.processed_by,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt,
  };
}
