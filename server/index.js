const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const serve = require('koa-static');
const mount = require('koa-mount');
const cors = require('@koa/cors');
const path = require('path');
const fs = require('fs');

const app = new Koa();
const router = new Router();

const UPLOAD_DIR = path.join(__dirname, 'uploads');

// 确保上传目录存在
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// CORS
app.use(cors());

// 静态文件服务（访问已上传的文件）
app.use(mount('/uploads', serve(UPLOAD_DIR)));

// 文件上传
router.post('/api/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB
  },
}), async (ctx) => {
  const file = ctx.request.files?.file;
  if (!file) {
    ctx.status = 400;
    ctx.body = { success: false, message: '未收到文件' };
    return;
  }

  const f = Array.isArray(file) ? file[0] : file;
  const filename = path.basename(f.filepath || f.newFilename);
  const url = `http://localhost:3001/uploads/${filename}`;

  ctx.body = {
    success: true,
    data: {
      url,
      name: f.originalFilename,
      size: f.size,
    },
  };
});

// 文件列表
router.get('/api/files', async (ctx) => {
  const files = fs.readdirSync(UPLOAD_DIR).filter((f) => !f.startsWith('.'));
  ctx.body = {
    success: true,
    data: files.map((f) => ({
      name: f,
      url: `http://localhost:3001/uploads/${f}`,
    })),
  };
});

// 删除文件
router.delete('/api/upload/:filename', async (ctx) => {
  const filepath = path.join(UPLOAD_DIR, ctx.params.filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
  ctx.body = { success: true };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Upload server running at http://localhost:${PORT}`);
  console.log(`Upload API: POST http://localhost:${PORT}/api/upload`);
  console.log(`Files dir: ${UPLOAD_DIR}`);
});
