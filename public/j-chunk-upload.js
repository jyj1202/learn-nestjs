// 在 web 应用程序中使用文件: https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications
import { ChunkUpload } from './chunk-upload.js';

const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const progressBar = document.getElementById('progressBar');
const progressInfo = document.getElementById('progressInfo');
const chunkProgress = document.getElementById('chunkProgress');

fileInput.addEventListener('change', handleFileChange);
function handleFileChange(e) {
  const files = this.files;
  const chunkUpload = new ChunkUpload(files[0]);
  chunkUpload.upload();
}

// uploadButton.addEventListener('click', uploadFile);


const fileInput2 = document.getElementById('fileInput2');
fileInput2.addEventListener('change', handleFileChange2);
function handleFileChange2(e) {
  const files = this.files;
  const formData = new FormData();
  formData.append('file', files[0]);
  fetch('http://localhost:3000/file/upload', {
    method: 'POST',
    body: formData
  });
}
