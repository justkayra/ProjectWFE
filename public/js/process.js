
function transformText(text) {
    const connectSession = axios.create({
        timeout: 100000,
        withCredentials: true,
        headers: {"Access-Control-Allow-Origin": "*", "Content-type": "application/json"}
    });
  const formData = {"sourceText": text, "emphasis": "RANDOM" };
  let URL = 'http://api.semantyca.com/service/transform/mood';
  connectSession.post(URL,formData)
        .then(response => {
            if (response.status == 200) {
                console.log('response', response.data.payloads.string)
                $('#textToTransform').text(response.data.payloads.string);
            }
        }).catch(error => console.error(error));
};



