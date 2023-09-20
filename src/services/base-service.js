import axios from 'axios';

const BaseService = axios.create({
    baseURL: 'https://api.dev.pastorsline.com/api',
    headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4',
        'Content-Type': 'application/json'
    },
    timeout: 600000
});

export default BaseService;