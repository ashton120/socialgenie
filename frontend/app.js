let USER_ID = localStorage.getItem('socialgenie_user_id');
if (!USER_ID) {
  USER_ID = 'user_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('socialgenie_user_id', USER_ID);
}

async function generate() {
  const platform = document.getElementById('platform').value;
  const input = document.getElementById('input').value.trim();
  const tone = document.getElementById('tone').value;

  if (input.length < 5) {
    alert('Please enter at least 5 characters.');
    return;
  }

  document.getElementById('result').classList.add('hidden');
  document.getElementById('upgrade').classList.add('hidden');

  // ⚠️ We’ll update this URL AFTER deploying backend
  const BACKEND_URL = 'https://socialgenie.onrender.com';

  try {
    const res = await fetch(BACKEND_URL + '/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': USER_ID
      },
      body: JSON.stringify({ platform, input, tone })
    });

    const data = await res.json();

    if (data.upgrade) {
      document.getElementById('upgrade').classList.remove('hidden');
      return;
    }

    if (data.error) {
      alert(data.error);
      return;
    }

    let output = '';
    if (data.caption) output += `Caption:\n${data.caption}\n\n`;
    if (data.headline) output += `Headline:\n${data.headline}\n\n`;
    if (data.tweet) output += `Tweet:\n${data.tweet}\n\n`;
    if (data.hashtags) output += `Hashtags:\n${data.hashtags}`;

    document.getElementById('output').textContent = output;
    document.getElementById('usage').textContent = `Uses today: ${data.usage}/${data.limit}`;
    document.getElementById('result').classList.remove('hidden');
  } catch (err) {
    alert('Failed to connect. Make sure backend is running!');
  }
}
