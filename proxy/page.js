'use client';

import { useState } from 'react';

export default function ProxyPage() {
  const [inputUrl, setInputUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');

  const handleLoad = (e) => {
    e.preventDefault();
    if (inputUrl) {
      setTargetUrl(inputUrl);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <h1>Web Proxy Viewer</h1>
      
      <form onSubmit={handleLoad} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="url"
          placeholder="Enter https://example.com"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          required
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>
          Load in Iframe
        </button>
      </form>

      {targetUrl && (
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
          <iframe
            // Points to your exact folder-nested API route
            src={`https://jp.tames.online/proxy/api?url=${encodeURIComponent(targetUrl)}`}
            title="Proxied Content"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      )}
    </main>
  );
}
