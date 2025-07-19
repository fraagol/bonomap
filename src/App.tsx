import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css'
import addresses from '../addresses.json'

// Fix for default marker icon issues in Leaflet + React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

function App() {
  // Only use locations with valid coordinates
  const [locations] = useState(
    (addresses as Array<any>).filter(a => typeof a.lat === 'number' && typeof a.lng === 'number' && a.lat !== null && a.lng !== null)
  );
  const [loading] = useState(false);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={[39.4795, -0.3279]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* Render markers for each geocoded location */}
        {locations.map(loc => (
          <Marker key={loc.name + loc.address} position={[loc.lat as number, loc.lng as number]}>
            <Popup>
              <strong>{loc.name}</strong><br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {loading && <div style={{position:'fixed',top:10,left:10,background:'#fff',padding:'8px',zIndex:1000}}>Loading locations...</div>}
    </div>
  )
}

export default App
