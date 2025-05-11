function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent.trim();
    if (text && text !== 'Loading...') {
      navigator.clipboard.writeText(text).catch((err) => {
        console.error('Error copying text: ', err);
      });
    }
  }

  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      const fields = [
        "ip", "version", "org", "asn", "city", "region", "postal",
        "latitude", "longitude", "timezone", "utc_offset",
        "country_calling_code", "currency", "in_eu"
      ];

      fields.forEach(field => {
        const el = document.getElementById(field);
        if (el) {
          el.textContent = field === "in_eu"
            ? (data[field] ? "Yes" : "No")
            : (data[field] || "N/A");
        }
      });

      const countryEl = document.getElementById("country");
      if (countryEl) countryEl.textContent = data.country_name || "N/A";
    })
    .catch(error => {
      document.body.innerHTML = `
        <p style="color: red; font-size: 1.1rem;">
          ⚠️ Failed to fetch IP info. Check your internet or try again later.
        </p>
      `;
      console.error(error);
    });
