export function publicKeyCredentialToJSON(pubKeyCred) {
    if(pubKeyCred instanceof Array) {
        let arr = [];
        for(let i of pubKeyCred)
            arr.push(publicKeyCredentialToJSON(i));

        return arr
    }

    if(pubKeyCred instanceof ArrayBuffer) { 
        return  btoa(String.fromCharCode(...new Uint8Array(pubKeyCred)));
    }

    if(pubKeyCred instanceof Object) {
        let obj = {};

        for (let key in pubKeyCred) {
            obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
        }

        return obj
    }

    return pubKeyCred
}

export function preFormatAttestationResultReq(reqBody) {
    return {
      id: str2ab(reqBody.id),
      rawId: str2ab(reqBody.rawId),
      response: reqBody.response,
      type: reqBody.type
    };
  }

  function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }