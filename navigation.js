// navigation.js
function renderNavigation(prevLabel, prevUrl, centerLabel, nextLabel, nextUrl) {
  const navHtml = `
    <div class="apple-card flex justify-between items-center mt-8 px-8 py-4 rounded-2xl shadow-lg bg-gradient-to-br from-blue-900/60 to-blue-700/40">
      ${prevUrl ? `<a href="${prevUrl}" class="apple-nav-btn rounded-full px-8 py-2 text-lg font-semibold bg-gradient-to-l from-blue-400 to-blue-600 text-white shadow-md hover:opacity-90 transition">← ${prevLabel}</a>` : `<button class="apple-nav-btn rounded-full px-8 py-2 text-lg font-semibold opacity-50 cursor-not-allowed" disabled>← ${prevLabel}</button>`}
      <span class="text-gray-300 text-lg font-bold">${centerLabel}</span>
      ${nextUrl ? `<a href="${nextUrl}" class="apple-nav-btn rounded-full px-8 py-2 text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:opacity-90 transition">${nextLabel} →</a>` : `<button class="apple-nav-btn rounded-full px-8 py-2 text-lg font-semibold opacity-50 cursor-not-allowed" disabled>${nextLabel} →</button>`}
    </div>
  `;
  document.getElementById('nav-placeholder').innerHTML = navHtml;
} 

