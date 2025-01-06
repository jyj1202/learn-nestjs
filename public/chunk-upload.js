export class ChunkUpload {
  tasks = [];
  constructor(file, chunkSize = 5 * 1024 * 1024, concurrency = 3) {
    this.file = file;
    this.chunkSize = chunkSize;
    this.concurrency = concurrency;
    this.chunks = this.createChunk(file, chunkSize);
  }

  async upload() {
    console.time('calculateHash');
    const fileHash = await this.calculateHash(this.chunks);
    this.fileHash = fileHash;
    console.timeEnd('calculateHash');
    console.log(fileHash);

    const tasks = this.chunks.map((c) => () => this.uploadChunk(c));
    const concurrentTask = new ConcurrentTask(tasks, this.concurrency);
    const res = await concurrentTask.runAll();
    console.log(res);
  }

  async uploadChunk(chunk) {
    const { blob, index, size } = chunk;
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('index', index);
    formData.append('hash', this.fileHash);
    formData.append('filename', this.file.name);
    formData.append('totalChunks', this.chunks.length);
    formData.append('chunkSize', size);
    const res = await fetch('http://localhost:3000/file/chunk', {
      method: 'POST',
      body: formData,
    });
    return res;
  }

  createChunk(file, chunkSize) {
    const chunks = [];
    let chunkIndex = 0;
    for (let i = 0; i < file.size; i += chunkSize) {
      const blob = file.slice(i, i + chunkSize);
      chunks.push(new Chunk(blob, chunkIndex));
      chunkIndex++;
    }
    return chunks;
  }

  calculateHash(chunks) {
    return new Promise((resolve) => {
      const spark = new SparkMD5.ArrayBuffer();
      function read(i) {
        if (i === chunks.length - 1) {
          return resolve(spark.end());
        }
        const chunk = chunks[i];
        const reader = new FileReader();
        reader.readAsArrayBuffer(chunk.blob);
        reader.onload = (e) => {
          spark.append(e.target.result);
          read(i + 1);
        };
      }
      read(0);
    });
  }
}

class Chunk {
  constructor(blob, index) {
    this.blob = blob;
    this.index = index;
    this.size = blob.size;
    // this.start = index * chunkSize;
    // this.end = this.start + chunkSize;
  }
}

class ConcurrentTask {
  constructor(tasks, concurrency) {
    this.tasks = tasks;
    this.concurrency = concurrency;
    this.runningNum = 0;
    this.finishNum = 0;
    this.result = [];
  }

  runAll() {
    return new Promise((resolve) => {
      this.resolve = resolve;
      if (this.tasks.length === 0) {
        this.resolve(this.result);
      }
      for (let i = 0; i < Math.min(this.concurrency, this.tasks.length); i++) {
        this.run();
      }
    });
  }

  async run() {
    this.runningNum++;
    const index = this.runningNum - 1;
    const task = this.tasks[index];
    try {
      const res = await task();
      this.result[index] = res;
    } catch (error) {
      this.result[index] = error;
    } finally {
      this.finishNum++;
      if (this.tasks.length === this.finishNum) {
        this.resolve(this.result);
      } else if (this.runningNum < this.tasks.length) {
        this.run();
      }
    }
  }
}

// function mockTask(num) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (num > 5) {
//         resolve(`${num} success`);
//       } else {
//         reject(`${num} error`);
//       }
//     }, 1000 * Math.random());
//   });
// }

// const tasks = Array.from({ length: 10 }, (_, i) => (() => mockTask(i)));
// const concurrentTask = new ConcurrentTask(tasks, 3);
// const res = await concurrentTask.runAll();
// console.log(res);
