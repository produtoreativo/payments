import http from "k6/http";
import { check, sleep, group } from "k6";
import uuid from './uuid';
export const options = {
  vus: 1000,
  duration: "300s"
};

const url = `http://${__ENV.URL}/invoice`;

export default function() {
  group(`Genereate invoice at ${url}`, function() {

    const payload = JSON.stringify({
        "amount": 1560,
        "taxId": "295.171.830-62",
        "name": "Christiano Milfont",
        "orderId":  uuid.v4(),
    });
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const res = http.post(url, payload, params);
    check(res, {
      "success": (r) => r.body.includes('providerId')
    });
    sleep(1);
  })
};
// https://k6.io/docs/examples/generating-uuids/
// k6 run -e URL=test.k6.io script.js