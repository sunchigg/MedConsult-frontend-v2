import axios from "axios";

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date): string {
  return (
    [
      //   date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

async function validateApiKey(apiKey: string): Promise<boolean> {
  const chatgptModel = "gpt-3.5-turbo";
  const urlForChatgpt = "https://api.openai.com/v1/chat/completions";
  try {
    const headers = {
      "content-type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };
    const messages = [
      {"role": "user", "content": "Hello!"}
    ]
    const jsonData = {messages, model: chatgptModel}
    const response = await axios.post(urlForChatgpt, jsonData, { headers })
    return true;
  }
  catch(error) {
    console.log(error);
    return false;
  }
}

function disableButton(buttonRef: React.MutableRefObject<HTMLButtonElement | null>) {
  if(buttonRef.current) {
    buttonRef.current.style.cursor = "not-allowed";
    buttonRef.current.style.pointerEvents = "none";
    buttonRef.current.style.opacity = "0.6";
  }
}

function enableButton(buttonRef: React.MutableRefObject<HTMLButtonElement | null>) {
  if(buttonRef.current) {
    buttonRef.current.style.cursor = "pointer";
    buttonRef.current.style.pointerEvents = "auto";
    buttonRef.current.style.opacity = "1";
  }
}

const onRenderDocument = ({blob, filename}: {blob: Blob, filename: string}) => {
  const blobUrl = URL.createObjectURL(blob);
  saveDocument(blobUrl, filename);
};

const saveDocument = (() => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  return function (blob: string, fileName: string) {
    a.href = blob;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(blob);
  };
})();

export { formatDate, validateApiKey, disableButton, enableButton, onRenderDocument, saveDocument };
