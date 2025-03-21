// ตั้งค่า Base URL สำหรับ API
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://run-server-service-by-prisma.vercel.app";
// ตั้งค่า prefix สำหรับ API (เผื่อกรณีที่ API มีการเปลี่ยนแปลงใน production)
const API_PREFIX = import.meta.env.VITE_API_PREFIX || "";

export { API_URL, API_PREFIX };
