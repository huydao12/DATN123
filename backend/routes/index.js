var express = require('express');
var router = express.Router();

//Imort model
const connectDb=require('../model/db');
const { ObjectId } = require('mongodb');

//Lấy tất cả sản phẩm dạng json
router.get('/products', async(req, res, next)=> {
  const db=await connectDb();
  const productCollection=db.collection('products');
  const products=await productCollection.find().toArray();
  if(products){
    res.status(200).json(products);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
});
//Lấy danh sách sản phẩm theo idcate
router.get('/productbycate/:idcate', async(req, res, next)=> {
  const db=await connectDb();
  const productCollection=db.collection('products');
  const products=await productCollection.find({categoryId:req.params.idcate}).toArray();
  if(products){
    res.status(200).json(products);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);

//Tìm kiếm theo sản phẩm
router.get('/search/:keyword', async(req, res, next)=> {
  const db=await connectDb();
  const productCollection=db.collection('products');
  const products=await productCollection.find({name: new RegExp(req.params.keyword, 'i')}).toArray();
  if(products){
    res.status(200).json(products);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);


//lấy chi tiết 1 sản phẩm
router.get('/productdetail/:id', async(req, res, next)=> {
  let id = new ObjectId(req.params.id);
  const db=await connectDb();
  const productCollection=db.collection('products');
  const product=await productCollection.findOne({_id:id});
  if(product){
    res.status(200).json(product);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);
///////////////////////////////////////////////////////////////
//Lấy danh mục sản phẩm
router.get('/categories', async(req, res, next)=> {
  const db=await connectDb();
  const categoryCollection=db.collection('categories');
  const categories=await categoryCollection.find().toArray();
  if(categories){
    res.status(200).json(categories);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);

const multer = require('multer');
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb){
if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
  return cb(new Error('Bạn chỉ được upload file ảnh'));
}
cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

//Thêm sản phẩm
router.post('/addproduct', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const { name, price, description, categoryId } = req.body;
  const image = req.file.originalname;
  const newProduct = { name, price, description, categoryId, image };

  try {
    const result = await productCollection.insertOne(newProduct);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});


//Xóa sản phẩm
router.delete('/deleteproduct/:id', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const id = new ObjectId(req.params.id);
  try {
    const result = await productCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

//Sửa sản phẩm
router.put('/updateproduct/:id', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const id = new ObjectId(req.params.id);
  const { name, price, description, categoryId } = req.body;
  let updatedProduct = { name, price, description, categoryId }; 

  if (req.file) {
    const image = req.file.originalname;
    updatedProduct.image = image; //
  }

  try {
    const result = await productCollection.updateOne({ _id: id }, { $set: updatedProduct });
    if (result.matchedCount) {
      res.status(200).json({ message: "Sửa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
// Thêm danh mục
router.post('/addcategory', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  const { name, description } = req.body;
  const newCategory = { name, description };

  try {
    const result = await categoryCollection.insertOne(newCategory);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      const insertedCategory = await categoryCollection.findOne({ _id: result.insertedId });
      res.status(200).json({ message: "Thêm danh mục thành công", category: insertedCategory });
    } else {
      res.status(500).json({ message: "Thêm danh mục thất bại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});


//xóa danh mục
router.delete('/deletecategory/:id', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  const id = new ObjectId(req.params.id);
  try {
    const result = await categoryCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa danh mục thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
//sửa danh mục
router.put('/updatecategory/:id', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  const id = new ObjectId(req.params.id);
  const { name, description } = req.body;
  let updatedCategory = { name, description };

  try {
    const result = await categoryCollection.updateOne({ _id: id }, { $set: updatedCategory });
    if (result.matchedCount) {
      res.status(200).json({ message: "Sửa danh mục thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
////Lấy danh sách người dùng
router.get('/users', async(req, res, next)=> {
  const db=await connectDb();
  const usersCollection=db.collection('users');
  const users=await usersCollection.find().toArray();
  if(users){
    res.status(200).json(users);
  }else{
    res.status(404).json({message : "Không tìm thấy người dùng"})
  }
}
);

//Đăng ký tài khoản với mã hóa mật khẩu bcrypt
const bcrypt = require('bcryptjs');
router.post('/register', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const { email, password, username, address} = req.body;
  const user = await userCollection.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  }else
  {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashPassword , username, address, role: 'user' };
    try {
      const result = await userCollection.insertOne(newUser);
      if (result.insertedId) {
        res.status(200).json({ message: "Đăng ký thành công" });
      } else {
        res.status(500).json({ message: "Đăng ký thất bại" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
  }
});
// Đăng nhập
const jwt = require('jsonwebtoken');
router.post('/login', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const { email, password } = req.body;
  const user = await userCollection.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Mật khẩu không chính xác" });
  }
  const token = jwt.sign({ email: user.email, role: user.role }, 'secret', { expiresIn: '1h' });
  res.status(200).json({ token });
});
// 

//Kiểm tra token qua Bearer
router.get('/checktoken', async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    res.status(200).json({ message: "Token hợp lệ" });
  }
  );
}
);

//lấy thông tin chi tiết user qua token
router.get('/detailuser', async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret', async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    const db = await connectDb();
    const userCollection = db.collection('users');
    const userInfo = await userCollection.findOne({ email: user.email });
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "Không tìm thấy user" });
    }
  });
});
module.exports = router;
