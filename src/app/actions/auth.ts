"use server";

export async function verifyAdminCredentials(username?: string, password?: string) {
  // Use environment variables for secure authentication
  // Default fallbacks are provided just for development/testing if env vars are missing
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "lumi123";

  if (username === adminUsername && password === adminPassword) {
    return { success: true };
  }
  
  return { success: false, error: "Invalid credentials." };
}
