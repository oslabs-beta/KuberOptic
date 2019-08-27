const fetchLocal = require('./local/local').default
const fetchGCP = require('./gcp/getGCPdata').default

const GOOGLE_APPLICATION_CREDENTIALS:object = {
   "type": "service_account",
   "project_id": "rich-ripple-250618",
   "private_key_id": "593bb33b24f1f7c0aec67e3ade54945416bce88e",
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+ERA1lhvKzrpO\nleMj3ka3xGLl4Hi6yyw/QARyHS/FVBMn7KfbeNGuWJ7+Sll7VYj1bXfTfgpphSMm\n2LA1YGN/RWR0jGMMuucRb3LV4UUpqI+N+q/hUOUaTP2epri0gtCfp18HUUgLrkAV\nhTiWEWlUpwFtCVUz/9/63Ov6Q4E2K5qOtCa/Jq+zgegEXFJdkTfIgMNFnZH8J9HJ\nobD8Hg2LRsFoaRgPdlj+IzWdi1x7ie1k5/iqI3oOeOt02er/QUDUOgcvM540dEog\nh3V7tGGCWWnV3ktvusbtwh3DNMSgOQyhu0orTobJk9RUbEaVa5cDSKh2dnPx7fCT\nbR3XnJcvAgMBAAECggEACCk3ZvWhD948ha9N53Zd1vopvPEcffjHV5fqGPRD3tcz\nU12H/5Z6el/3w7dxjCgqD0+5+2zICavbzIk1V7Vh0E8sdwyoHB3SWh9M8P4ROC6y\nq0f+UVBl5fE0WqGSAL41MwW+wNOuokHDIqlrupXYzfe1yfbCn8720RC3WTGY1LiL\nlw1DJ0BQXc+IWULlaQHOrVvBVUuGb6iYR/TizxSs8UwGDIRS4lelMV2B3VTZsZZR\nJTDUrsi6gR46M8xO/Qk/1fJ5+gMjm2oZfdQzk9Wdf5ApWjwqruRFGngp+gaR6IMz\nqPueZdtSRgb+xqDc0O5YrX5Gp+pb6dOghEZpGbFYYQKBgQDsnRePPHmqAOKYoel6\nW2vq3ZQdWCwESyQpp1w3mpDHaNv0BwxpUJ0fARCEqPdX3fJNbLutK3F5vGGPQ+99\n9XPgsMdHRVbMRmNAPFRfR/wa+FhrWwNAIe2056SR9Hch4IHw2pFQ0NgBFx9SKDps\nGQL+sjZ6hrDEdxWWKDYZNqJoeQKBgQDNo6kgpu6O3++3YuGWsrS0KGIfjgZpMb0/\npVlrMTNjy1vCmKPg5wLAuDuzD/y5+jPZ35y/+e1hfpoPaC5nF/j2rpwPBCS5URKX\n/7OYeR1/vsyxHb4H7rzgph0kQyMrHGhPQJanKS5G/AdEWEJHfcImEXwPK4pi3PTj\nQI4LtyJi5wKBgF0ooJ0Bl3lKreygWveUxRGMugMvsuzh1NQdk55E2dnZPDiBCe7x\nEVuipKlGiVPsC7lWJTJSF3RxqgupGMMD/+KoV12FPF5jHDKvThzRj73ip5VlGQuI\nEDoYtd/NW5ZX+XEl7O7fuxv6yZckRZRH6Lj026Q0IabIqBQdsucMbrcpAoGAW+er\nLOauc7htwH426E0SKfpqcEPfZaBPPmS95ARnPVCjwALMKzXTqyIrvEmG3++MwPEJ\nc1tV1l7op74eDwFNyaIcKTHm39P2BWzIbXqjznYNsZLjXVQ7ogNbvtsqmpflnpX1\nPtxOzHbTIJ55cM4puS3TTkxdWvX5lJ9DXMUKXz0CgYB2LqRQYybnJx2RErqwvJch\nqYMcwTjzrZ1LZBdeDrsHSvILIPMRVNUGjWYSrydl9YIrH5ZlE0aGs4QweyGjk6nj\nm2J9C+LQvtifXj/UfvOz1rONGxmJgGCdJZ4EnSb+g2wiQvLx8ZbsgbrVw8089JTg\nOAJjMPGULs0bxL14CwGPzA==\n-----END PRIVATE KEY-----\n",
   "client_email": "234608770302-compute@developer.gserviceaccount.com",
   "client_id": "102504704420000835904",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/234608770302-compute%40developer.gserviceaccount.com"
}

async function getLocal() {
   const res = await fetchLocal();
   console.log(res)
   return res
}

async function getGcp(GOOGLE_APPLICATION_CREDENTIALS) {
   const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS);
   console.log(res)
   return res;
}

getLocal();
getGcp(GOOGLE_APPLICATION_CREDENTIALS);
