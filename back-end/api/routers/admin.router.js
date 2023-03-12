'use strict'
const admin_controller = require('../controllers/admin.controller');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './files',
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
module.exports = (app) => {
    app.route('/admin/addfood')
        .post(upload.single('file'), admin_controller.addfood);
    app.route('/admin/updatefood')
        .post(upload.single('file'), admin_controller.updatefood);
    app.route('/admin/deletefood/:id')
        .get(admin_controller.deletefood);
    app.route('/admin/deletecategory/:id')
        .get(admin_controller.deletecategory);
    app.route('/admin/updateuser')
        .post(admin_controller.updateUser);
    app.route('/admin/deleteuser')
        .post(admin_controller.deleteUser);
    app.route('/admin/addcategory')
        .post(admin_controller.addCategory);
    app.route('/admin/updatecategory')
        .post(admin_controller.updateCategory);
    app.route('/admin/addauthor')
        .post(admin_controller.addAuthor);
    app.route('/admin/updateauthor')
        .post(admin_controller.updateAuthor);
    app.route('/admin/addrestaurant')
        .post(admin_controller.addRestaurant);
    app.route('/admin/updaterestaurant')
        .post(admin_controller.updateRestaurant);
    app.route('/admin/addpublisher')
       .post(admin_controller.addPublisher);
    app.route('/admin/updatepublisher')
       .post(admin_controller.updatePublisher);
    app.route('/admin/adduser')
       .post(admin_controller.addUser);
    app.route('/admin/getAllUser/:page')
       .get(admin_controller.getAllUser);
    app.route('/admin/login')
       .post(admin_controller.login);
   app.route('/admin/addarticle')
       .post(admin_controller.addArticle);
}