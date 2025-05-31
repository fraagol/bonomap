import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

async function fetchAddressesAndGeocode() {
  try {
    console.log('Fetching HTML...');
    const res = await fetch('https://bonocompramalvarrosa.com/comercios-adheridos/?f=a');
    const html = await res.text();
    console.log('Parsing HTML...');
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const rows = Array.from(doc.querySelectorAll('tr'));
    const parsed = [];
    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 3) {
        const name = cells[1].textContent?.trim() || '';
        const address = cells[2].textContent?.trim() || '';
        if (name && address) {
          parsed.push({ name, address });
        }
      }
    }
    console.log(`Parsed ${parsed.length} locations. Geocoding...`);
    const geocoded = [];
    for (const entry of parsed) {
      try {
        // Add postal code 46011 to all geocoding queries
        const q = encodeURIComponent(`${entry.address}, 46011 Valencia, Spain`);
        const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`);
        const data = await resp.json();
        if (data[0]) {
          geocoded.push({
            name: entry.name,
            address: entry.address,
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          });
        } else {
          geocoded.push({
            name: entry.name,
            address: entry.address,
            lat: null,
            lng: null
          });
        }
      } catch (geoErr) {
        console.error('Geocoding error for', entry, geoErr);
      }
      await new Promise(r => setTimeout(r, 1000));
    }
    const outPath = path.join(process.cwd(), 'addresses.json');
    fs.writeFileSync(outPath, JSON.stringify(geocoded, null, 2), 'utf-8');
    console.log(`Wrote ${geocoded.length} locations to addresses.json`);
  } catch (err) {
    console.error('Script error:', err);
  }
}

fetchAddressesAndGeocode();
