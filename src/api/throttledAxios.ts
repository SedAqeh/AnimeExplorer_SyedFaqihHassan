import axios from 'axios';

const queue: (() => void)[] = [];
let activeRequests = 0;
const MAX_REQUESTS_PER_SECOND = 1;

const throttledAxios = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
});

function processQueue() {
  if (activeRequests >= MAX_REQUESTS_PER_SECOND || queue.length === 0) return;

  activeRequests++;
  const nextRequest = queue.shift();
  if (nextRequest) nextRequest();

  setTimeout(() => {
    activeRequests--;
    processQueue();
  }, 1000 / MAX_REQUESTS_PER_SECOND);
}

throttledAxios.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    queue.push(() => resolve(config));
    processQueue();
  });
});

export default throttledAxios;
