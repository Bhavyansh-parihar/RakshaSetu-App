require('dotenv').config();
const cloudinary = require('cloudinary').v2;

async function testUpload() {
  console.log('Testing Cloudinary upload...');
  
  // We don't need to configure it explicitly if CLOUDINARY_URL is in the environment
  // But just to be explicit:
  cloudinary.config({
    secure: true
  });

  try {
    // Upload a test image from a public URL
    const uploadResult = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      {
        folder: 'rakshasetu_tests',
        public_id: 'test_sos_image'
      }
    );

    console.log('✅ Upload Successful!');
    console.log('🔗 Secure URL:', uploadResult.secure_url);
  } catch (error) {
    console.error('❌ Upload Failed:', error.message);
  }
}

testUpload();
