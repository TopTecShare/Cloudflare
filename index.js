const LOG_URL = "https://blockchain-764049413.development.catalystserverless.com/server/blockchain/"


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  // console.log(JSON.stringify([...request.headers]))
  // const headers = [...request.headers];
  // const [...formData] = await request.formData();
  // console.log(JSON.stringify(formData));
  // console.log(JSON.stringify(request.cf));
  const headers = {...Object.fromEntries(request.headers)};
  const x_filename = headers['x-filename'];
  const x_hash = headers['x-hash'];

  let response =
    await fetch(LOG_URL, {
      method: "POST",
      headers: {
        'Y-api': 'It is y-api',
        'X-Text': x_filename + '-' + x_hash,
        'X-Chain': 'cosmos'
      }
    })

  response = new Response(JSON.stringify({ ...await response.json(), 'X-Filename':x_filename, 'X-Hash':x_hash }), response)
  return response;
}
