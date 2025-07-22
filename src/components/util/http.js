export async function callParseFunction(
  functionName,
  method,
  parseClass,
  data,
) {
  const response = await fetch(
    `https://parseapi.back4app.com/functions/${functionName}`,
    {
      method,
      headers: {
        'X-Parse-Application-Id': import.meta.env
          .VITE_REACT_APP_PARSE_APPLICATION_ID,
        'X-Parse-REST-API-Key': import.meta.env
          .VITE_REACT_APP_PARSE_REST_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [parseClass]: data,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'An error occured');
  }

  return await response.json();
}
