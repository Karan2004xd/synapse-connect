const mainEndPoint = 'http://localhost:8080';

const checkRequestEndPoint = (requestEndPoint) => {
  requestEndPoint = requestEndPoint.trim();
  if (!requestEndPoint.startsWith('/')) {
    requestEndPoint = '/' + requestEndPoint;
  }
  return requestEndPoint;
};

export const fetchPostData = async (requestEndPoint, requestData = null) => {
  requestEndPoint = checkRequestEndPoint(requestEndPoint);
  const requestUrl = mainEndPoint + requestEndPoint;

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
};
