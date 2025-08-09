export const getAuthConfig = () => {
  const token = localStorage.getItem("token") || null;
  return {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};
