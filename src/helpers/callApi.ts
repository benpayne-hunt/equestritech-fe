import axios from 'axios';

interface Props {
  method: string;
  path: string;
  body?: object;
}

const callAPi = async (props: Props) => {
  const { method, path, body } = props;

  const url = `http://127.0.0.1:8001/api/${path}`;
  let data = null;

  if (method === 'GET') {
    const response = await axios.get(url);

    if (response.status === 200) {
      data = response.data;
    }
  }

  if (method === 'POST') {
    const response = await axios.post(url, body);

    if (response.status === 200) {
      data = response.data;
    }
  }

  return data;
};

export default callAPi;
