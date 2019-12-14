
const postLogin: (body: {name: string, password: string}) => Promise<any> = async (body: {name: string, password: string}) => {

  const res = await fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: {
      'Content-Type' : `application/json`
    },
    body: JSON.stringify(body)
  });

  if (res.status.toString().match(/[2].{2}/g)) {
    return res.json()
  } else if (!res.status) {
    return {status:false, data:'not found'}
  } else {
    return {status:false, data:'critical error'}
  }
};

export default postLogin;
