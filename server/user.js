async function getProfile(code) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${code}` },
  });
  return await result.json();
}

async function getTopItems(code, type) {
  const queryParams = new URLSearchParams({
    time_range: "short_term",
    limit: 9,
  });
  const result = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?${queryParams}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${code}` },
    }
  );
  return await result.json();
}

module.exports = {
  getProfile,
  getTopItems,
};
