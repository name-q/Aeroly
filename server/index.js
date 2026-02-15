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

// ---- AutoComplete 搜索 API ----

const CITIES = [
  '北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '重庆', '武汉', '西安',
  '苏州', '天津', '长沙', '郑州', '东莞', '青岛', '沈阳', '宁波', '昆明', '大连',
  '厦门', '合肥', '佛山', '福州', '哈尔滨', '济南', '温州', '长春', '石家庄', '常州',
  '泉州', '南宁', '贵阳', '南昌', '太原', '烟台', '嘉兴', '南通', '金华', '珠海',
  '惠州', '徐州', '海口', '乌鲁木齐', '绍兴', '中山', '台州', '兰州', '潍坊', '保定',
];

router.get('/api/search/cities', async (ctx) => {
  const keyword = (ctx.query.keyword || '').toString().trim();
  // 模拟网络延迟 200-500ms
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));

  if (!keyword) {
    ctx.body = { success: true, data: CITIES.slice(0, 10) };
    return;
  }

  const results = CITIES.filter((c) => c.includes(keyword));
  ctx.body = { success: true, data: results };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Upload server running at http://localhost:${PORT}`);
  console.log(`Upload API: POST http://localhost:${PORT}/api/upload`);
  console.log(`Files dir: ${UPLOAD_DIR}`);
});
